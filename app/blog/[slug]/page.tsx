import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Calendar, ArrowLeft, Tag } from 'lucide-react';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { ArticleContent } from '@/components/site/ArticleContent';
import { ProductReview } from '@/components/site/ProductReview';
import { ShareButton } from '@/components/site/ShareButton';
import { StarRating } from '@/components/site/StarRating';
import { BlogCard } from '@/components/site/BlogCard';
import {
  ReviewJsonLd,
  BreadcrumbJsonLd,
} from '@/components/site/JsonLd';
import {
  getCategories,
  getPosts,
  getPostBySlug,
  getRelatedPosts,
  getAllPostSlugs,
} from '@/lib/data';
import { SITE_CONFIG, formatDate } from '@/lib/site';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: { slug: string };
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
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

export default async function BlogPostPage({ params }: PageProps) {
  const [categories, posts, post] = await Promise.all([
    getCategories(),
    getPosts(),
    getPostBySlug(params.slug),
  ]);

  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post, 3);

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
      <Header categories={categories} posts={posts} />

      <main className="flex-1">
        {/* Hero */}
        <article>
          <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-8">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Reviews', href: '/blog' },
                { label: post.category.name, href: `/category/${post.category.slug}` },
                { label: post.title },
              ]}
            />
          </div>

          <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-6">
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

              {post.rating > 0 && (
                <div className="flex items-center gap-2">
                  <StarRating rating={post.rating} size={18} />
                  <span className="text-sm font-bold">{post.rating.toFixed(1)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Featured image */}
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-6">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
              <Image
                src={post.featured_image}
                alt={post.featured_image_alt || post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-10">
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

            {/* Back link */}
            <div className="mt-8 flex items-center justify-between">
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

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 mt-8 border-t border-border">
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

      <Footer categories={categories} />
    </>
  );
}
