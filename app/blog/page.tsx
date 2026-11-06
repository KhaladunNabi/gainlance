import type { Metadata } from 'next';
import { BlogCard } from '@/components/site/BlogCard';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { Pagination } from '@/components/site/Pagination';
import { WebsiteJsonLd } from '@/components/site/JsonLd';
import { BlogFilters } from '@/components/site/BlogFilters';
import { getPosts } from '@/lib/data';
import { SITE_CONFIG } from '@/lib/site';
import { SearchX } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const POSTS_PER_PAGE = 21;

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
  searchParams: Promise<{
    q?: string;
    page?: string;
    minRating?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const allPosts = await getPosts();

  const params = await searchParams;
  const query = params.q?.trim() || '';
  const minRating = params.minRating ? parseFloat(params.minRating) : null;
  const minPrice = params.minPrice ? parseFloat(params.minPrice) : null;
  const maxPrice = params.maxPrice ? parseFloat(params.maxPrice) : null;

  // 1. Filter
  const filteredPosts = allPosts.filter((p) => {
    // Search
    if (query) {
      const haystack = [
        p.title,
        p.excerpt,
        p.product_name,
        p.category.name,
        ...p.tags,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      if (!haystack.includes(query.toLowerCase())) return false;
    }

    // Rating filter
    if (minRating !== null) {
      if ((p.rating ?? 0) < minRating) return false;
    }

    // Price filter (price is string | null)
    if (minPrice !== null || maxPrice !== null) {
      const rawPrice = p.price;
      if (!rawPrice) return false;

      // Handles "$29.99", "29.99", "1,299.00" etc.
      const numericPrice = parseFloat(rawPrice.replace(/[^0-9.]/g, ''));

      if (Number.isNaN(numericPrice)) return false;
      if (minPrice !== null && numericPrice < minPrice) return false;
      if (maxPrice !== null && numericPrice > maxPrice) return false;
    }

    return true;
  });

  // 2. Pagination
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const requestedPage = parseInt(params.page ?? '1', 10);
  const currentPage = Number.isNaN(requestedPage)
    ? 1
    : Math.min(Math.max(requestedPage, 1), totalPages);

  // 3. Slice current page
  const posts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <>
      <WebsiteJsonLd />
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
          {/* Header: heading on the left, dropdown filters on the right */}
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              {query ? (
                <>
                  <h1 className="font-heading text-3xl lg:text-4xl font-bold tracking-tight mb-3">
                    Search Results
                  </h1>
                  <p className="text-muted-foreground text-lg max-w-2xl">
                    {filteredPosts.length}{' '}
                    {filteredPosts.length === 1 ? 'result' : 'results'} for{' '}
                    <span className="font-semibold text-foreground">
                      &ldquo;{query}&rdquo;
                    </span>
                  </p>
                </>
              ) : (
                <>
                  <h1 className="font-heading text-3xl lg:text-4xl font-bold tracking-tight mb-3">
                    All Product Reviews
                  </h1>
                  <p className="text-muted-foreground text-lg max-w-2xl">
                    Every product we&apos;ve tested, ranked, and reviewed.{' '}
                    {filteredPosts.length} reviews and counting.
                  </p>
                </>
              )}
            </div>

            <BlogFilters />
          </div>

          {posts.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                query={query}
              />
            </>
          ) : (
            <div className="text-center py-20">
              <div className="flex justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
                  <SearchX className="h-6 w-6" />
                </div>
              </div>
              <p className="text-muted-foreground text-lg mb-2">
                {query ? (
                  <>No reviews found for &ldquo;{query}&rdquo;</>
                ) : (
                  <>No reviews match the selected filters</>
                )}
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Try adjusting the filters or search term.
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
