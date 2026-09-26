import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Trophy } from 'lucide-react';
import { StarRating } from '@/components/site/StarRating';
import { AffiliateLink } from '@/components/site/AffiliateLink';
import type { PostWithCategory } from '@/lib/types';

export function TopRatedSection({ posts }: { posts: PostWithCategory[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="border-b border-border bg-gradient-to-b from-primary/5 to-transparent">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="flex items-end justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <Trophy className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-heading text-2xl lg:text-3xl font-bold tracking-tight">
                Top-Rated Products
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                Our highest-scoring reviews, rated 4.0 and above
              </p>
            </div>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {posts.map((post, i) => (
            <div
              key={post.id}
              className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <Link href={`/blog/${post.slug}`} className="relative block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={post.product_image || post.featured_image}
                    alt={post.product_image_alt || post.featured_image_alt || post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-foreground/80 backdrop-blur text-white text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-primary/90 backdrop-blur px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
                      {post.category.name}
                    </span>
                  </div>
                </div>
              </Link>

              <div className="flex flex-col flex-1 p-4">
                {post.rating > 0 && (
                  <div className="flex items-center gap-2 mb-2">
                    <StarRating rating={post.rating} size={15} />
                    <span className="text-sm font-bold text-foreground">
                      {post.rating.toFixed(1)}
                    </span>
                  </div>
                )}

                {post.product_name && (
                  <h3 className="font-heading font-bold text-base leading-snug mb-1 line-clamp-1">
                    {post.product_name}
                  </h3>
                )}

                <Link href={`/blog/${post.slug}`} className="block">
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3 group-hover:text-foreground transition-colors">
                    {post.excerpt}
                  </p>
                </Link>

                <div className="mt-auto flex items-center justify-between gap-3 pt-3 border-t border-border/60">
                  {post.price && (
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-heading text-lg font-bold text-foreground">
                        {post.price}
                      </span>
                      {post.original_price && (
                        <span className="text-xs text-muted-foreground line-through">
                          {post.original_price}
                        </span>
                      )}
                    </div>
                  )}
                  {post.amazon_url ? (
                    <AffiliateLink href={post.amazon_url} className="text-xs px-3 py-2">
                      Buy
                    </AffiliateLink>
                  ) : (
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all"
                    >
                      Read <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
