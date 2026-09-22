import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { BlogCard } from '@/components/site/BlogCard';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { BreadcrumbJsonLd } from '@/components/site/JsonLd';
import {
  getCategories,
  getPosts,
  getCategoryBySlug,
  getPostsByCategory,
  getAllCategorySlugs,
} from '@/lib/data';
import { SITE_CONFIG } from '@/lib/site';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: { slug: string };
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  if (!category) return {};

  const title = `${category.name} Reviews`;
  const description =
    category.description ||
    `In-depth ${category.name.toLowerCase()} reviews and buying guides.`;
  const url = `${SITE_CONFIG.url}/category/${category.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/category/${category.slug}`,
    },
    openGraph: {
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
      url,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const [categories, allPosts, category] = await Promise.all([
    getCategories(),
    getPosts(),
    getCategoryBySlug(params.slug),
  ]);

  if (!category) notFound();

  const posts = await getPostsByCategory(category.id);

  const breadcrumbItems = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Categories', url: `${SITE_CONFIG.url}/blog` },
    { name: category.name, url: `${SITE_CONFIG.url}/category/${category.slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <Header categories={categories} posts={allPosts} />

      <main className="flex-1">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Reviews', href: '/blog' },
              { label: category.name },
            ]}
          />
        </div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-4">
          <h1 className="font-heading text-3xl lg:text-4xl font-bold tracking-tight mb-3">
            {category.name} Reviews
          </h1>
          {category.description && (
            <p className="text-muted-foreground text-lg max-w-2xl">
              {category.description}
            </p>
          )}
          <p className="text-sm text-muted-foreground mt-2">
            {posts.length} {posts.length === 1 ? 'review' : 'reviews'}
          </p>
        </div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
          {posts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                No reviews in this category yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer categories={categories} />
    </>
  );
}
