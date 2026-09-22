import type { Metadata } from 'next';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { BlogCard } from '@/components/site/BlogCard';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { WebsiteJsonLd } from '@/components/site/JsonLd';
import { getCategories, getPosts } from '@/lib/data';
import { SITE_CONFIG } from '@/lib/site';
import { SearchX } from 'lucide-react';

export const metadata: Metadata = {
  title: 'All Product Reviews',
  description:
    'Browse all our in-depth product reviews. From headphones to drones, we test every product hands-on before publishing our verdict.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: `All Product Reviews | ${SITE_CONFIG.name}`,
    description:
      'Browse all our in-depth product reviews. From headphones to drones, we test every product hands-on before publishing our verdict.',
    url: `${SITE_CONFIG.url}/blog`,
  },
};

interface BlogPageProps {
  searchParams: { q?: string };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const [categories, allPosts] = await Promise.all([getCategories(), getPosts()]);

  const query = searchParams.q?.trim() || '';

  const posts = query
    ? allPosts.filter((p) => {
        const haystack = [p.title, p.excerpt, p.product_name, p.category.name, ...p.tags]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return haystack.includes(query.toLowerCase());
      })
    : allPosts;

  return (
    <>
      <WebsiteJsonLd />
      <Header categories={categories} posts={allPosts} />

      <main className="flex-1">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'All Reviews' },
            ]}
          />
        </div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
          <div className="mb-10">
            {query ? (
              <>
                <h1 className="font-heading text-3xl lg:text-4xl font-bold tracking-tight mb-3">
                  Search Results
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl">
                  {posts.length} {posts.length === 1 ? 'result' : 'results'} for{' '}
                  <span className="font-semibold text-foreground">&ldquo;{query}&rdquo;</span>
                </p>
              </>
            ) : (
              <>
                <h1 className="font-heading text-3xl lg:text-4xl font-bold tracking-tight mb-3">
                  All Product Reviews
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl">
                  Every product we&apos;ve tested, ranked, and reviewed. {posts.length} reviews and counting.
                </p>
              </>
            )}
          </div>

          {posts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="flex justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
                  <SearchX className="h-6 w-6" />
                </div>
              </div>
              <p className="text-muted-foreground text-lg mb-2">
                No reviews found for &ldquo;{query}&rdquo;
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Try a different search term or browse all reviews.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer categories={categories} />
    </>
  );
}
