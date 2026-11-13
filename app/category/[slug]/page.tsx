// app/category/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SearchX } from 'lucide-react';
import { BlogCard } from '@/components/site/BlogCard';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { BreadcrumbJsonLd } from '@/components/site/JsonLd';
import { BlogFilters } from '@/components/site/BlogFilters';
import {
  getCategoryBySlug,
  getPostsByCategory,
  getAllCategorySlugs,
} from '@/lib/data';
import { SITE_CONFIG } from '@/lib/site';
import { TrackRecentCategory } from '@/components/site/TrackRecentCategory';
import NewsletterSection from '@/components/site/NewsLetter';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    minRating?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
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

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const filterParams = await searchParams;

  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const allPosts = await getPostsByCategory(category.id);

  // ---- Filters ----
  const minRating = filterParams.minRating ? parseFloat(filterParams.minRating) : null;
  const minPrice = filterParams.minPrice ? parseFloat(filterParams.minPrice) : null;
  const maxPrice = filterParams.maxPrice ? parseFloat(filterParams.maxPrice) : null;

  const hasFilters = minRating !== null || minPrice !== null || maxPrice !== null;

  const posts = allPosts.filter((p) => {
    // Rating filter
    if (minRating !== null && (p.rating ?? 0) < minRating) return false;

    // Price filter (price is string | null)
    if (minPrice !== null || maxPrice !== null) {
      if (!p.price) return false;

      // Handles "$29.99", "29.99", "1,299.00" etc.
      const numericPrice = parseFloat(p.price.replace(/[^0-9.]/g, ''));

      if (Number.isNaN(numericPrice)) return false;
      if (minPrice !== null && numericPrice < minPrice) return false;
      if (maxPrice !== null && numericPrice > maxPrice) return false;
    }

    return true;
  });

  const breadcrumbItems = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Categories', url: `${SITE_CONFIG.url}/blog` },
    { name: category.name, url: `${SITE_CONFIG.url}/category/${category.slug}` },
  ];

  return (
    <>
      <TrackRecentCategory category={category} />
      <BreadcrumbJsonLd items={breadcrumbItems} />
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

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
          {/* Header: heading on the left, dropdown filters on the right */}
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
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
                {hasFilters && ` (of ${allPosts.length})`}
              </p>
            </div>

            {allPosts.length > 0 && <BlogFilters />}
          </div>

          {posts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : hasFilters ? (
            <div className="text-center py-20">
              <div className="flex justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
                  <SearchX className="h-6 w-6" />
                </div>
              </div>
              <p className="text-muted-foreground text-lg mb-2">
                No reviews match the selected filters
              </p>
              <p className="text-sm text-muted-foreground">
                Try adjusting the filters.
              </p>
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
      <NewsletterSection />
    </>
  );
}
