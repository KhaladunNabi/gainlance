// app/blog/[slug]/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Calendar, ArrowLeft, Tag } from 'lucide-react';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { ArticleContent } from '@/components/site/ArticleContent';
import { ProductReview } from '@/components/site/ProductReview';
import { ShareButton } from '@/components/site/ShareButton';
import { StarRating } from '@/components/site/StarRating';
import { BlogCard } from '@/components/site/BlogCard';
import { ReviewJsonLd, BreadcrumbJsonLd } from '@/components/site/JsonLd';
import {
  getPostBySlug,
  getRelatedPosts,
  getAllPostSlugs,
} from '@/lib/data';
import { SITE_CONFIG, formatDate } from '@/lib/site';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const title = post.meta_title || post.title;
  const description = post.meta_description || post.excerpt;
  const url = `${SITE_CONFIG.url}/blog/${post.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      authors: [post.author_name],
      tags: post.tags,
      images: [
        {
          url: post.featured_image,
          width: 1200,
          height: 630,
          alt: post.featured_image_alt || post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [post.featured_image],
    },
    keywords: post.tags,
  };
}

/* ---------- Recommended sidebar item ---------- */
function RecommendedItem({ post }: { post: any }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex gap-3 rounded-xl p-2 -mx-2 hover:bg-secondary/60 transition-colors"
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-secondary">
        <Image
          src={post.featured_image}
          alt={post.featured_image_alt || post.title}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">
          {post.category?.name}
        </p>
        <h3 className="mt-0.5 line-clamp-2 text-sm font-semibold leading-snug group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <div className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
          {post.rating > 0 && (
            <span className="flex items-center gap-1">
              <StarRating rating={post.rating} size={12} />
              <span className="font-semibold text-foreground">
                {post.rating.toFixed(1)}
              </span>
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.reading_time} min
          </span>
        </div>
      </div>
    </Link>
  );
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const allRelated = await getRelatedPosts(post, 8);
  // Sidebar gets the first 5, bottom section gets the rest (no duplicates)
  const recommendedPosts = allRelated.slice(0, 5);
  const relatedPosts = allRelated.slice(5, 8);
  const rating = post.rating ?? 0;

  const breadcrumbItems = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Reviews', url: `${SITE_CONFIG.url}/blog` },
    { name: post.category.name, url: `${SITE_CONFIG.url}/category/${post.category.slug}` },
    { name: post.title, url: `${SITE_CONFIG.url}/blog/${post.slug}` },
  ];

  return (
    <>
      <ReviewJsonLd post={post} />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <main className="flex-1">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Two-column layout: article (left) + Recommended (right) */}
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_340px]">
            {/* ---------- LEFT: article ---------- */}
            <article className="min-w-0">
              {/* Breadcrumbs */}
              <div className="pt-8">
                <Breadcrumbs
                  items={[
                    { label: 'Home', href: '/' },
                    { label: 'Reviews', href: '/blog' },
                    { label: post.category.name, href: `/category/${post.category.slug}` },
                    { label: post.title },
                  ]}
                />
              </div>

              {/* Header */}
              <div className="pt-6">
                <Link
                  href={`/category/${post.category.slug}`}
                  className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-4 hover:bg-primary/20 transition-colors"
                >
                  {post.category.name}
                </Link>

                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance mb-4">
                  {post.title}
                </h1>

                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-border">
                  <div className="flex items-center gap-3">
                    {post.author_avatar && (
                      <Image
                        src={post.author_avatar}
                        alt={post.author_name}
                        width={44}
                        height={44}
                        className="rounded-full"
                      />
                    )}
                    <div>
                      <p className="text-sm font-semibold">{post.author_name}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(post.published_at)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.reading_time} min read
                        </span>
                      </div>
                    </div>
                  </div>

                  {rating > 0 && (
                    <div className="flex items-center gap-2">
                      <StarRating rating={rating} size={18} />
                      <span className="text-sm font-bold">{rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Featured image */}
              <div className="mt-6">
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                  <Image
                    src={post.featured_image}
                    alt={post.featured_image_alt || post.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Content */}
              <div className="mt-10">
                <ArticleContent blocks={post.content} />

                {/* Product review box */}
                <ProductReview post={post} />

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="flex items-center flex-wrap gap-2 mt-10 pt-6 border-t border-border">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Affiliate disclosure */}
                {post.amazon_url && (
                  <div className="mt-8 rounded-xl bg-secondary/50 border border-border p-4">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Affiliate Disclosure:</strong> As an Amazon
                      Associate, we earn from qualifying purchases. Links in this article may be
                      affiliate links that generate revenue for our site at no additional cost to you.
                      This does not influence our editorial content or product ratings.
                    </p>
                  </div>
                )}

                {/* Back link & share */}
                <div className="mt-8 mb-12 flex items-center justify-between">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to All Reviews
                  </Link>
                  <ShareButton />
                </div>
              </div>
            </article>

            {/* ---------- RIGHT: Recommended (sticky on desktop) ---------- */}
            {recommendedPosts.length > 0 && (
              <aside className="lg:pt-8 pb-12 lg:pb-0">
                <div className="lg:sticky lg:top-24">
                  <div className="rounded-2xl border border-border bg-card p-5">
                    <h2 className="font-heading text-lg font-bold tracking-tight mb-4 pb-3 border-b border-border">
                      Recommended
                    </h2>
                    <div className="flex flex-col gap-3">
                      {recommendedPosts.map((rp) => (
                        <RecommendedItem key={rp.id} post={rp} />
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>

        {/* Related posts (bottom, full width) */}
        {relatedPosts.length > 0 && (
          <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 border-t border-border">
            <h2 className="font-heading text-2xl font-bold tracking-tight mb-8">
              More from {post.category.name}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <BlogCard key={rp.id} post={rp} />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
