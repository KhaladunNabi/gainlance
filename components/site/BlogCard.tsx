import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/site';
import { StarRating } from './StarRating';
import type { PostWithCategory } from '@/lib/types';

interface BlogCardProps {
  post: PostWithCategory;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <article
      className={cnCard(featured)}
    >
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <div className={cnImageWrapper(featured)}>
          <Image
            src={post.featured_image}
            alt={post.featured_image_alt || post.title}
            fill
            sizes={featured ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
            className="object-contain transition-transform duration-500 group-hover:scale-105"
            priority={featured}
          />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              {post.category.name}
            </span>
            {post.is_featured && (
              <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                Editor&apos;s Pick
              </span>
            )}
          </div>
        </div>

        <div className={cnContent(featured)}>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
            <span>{formatDate(post.published_at)}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.reading_time} min read
            </span>
          </div>

          <h3 className={cnTitle(featured)}>
            {post.title}
          </h3>

          <p className={cnExcerpt(featured)}>
            {post.excerpt}
          </p>

          {post.rating > 0 && (
            <div className="flex items-center gap-2 mb-3">
              <StarRating rating={post.rating} size={14} />
              <span className="text-xs font-semibold text-foreground">
                {post.rating.toFixed(1)}
              </span>
            </div>
          )}

          <div className={cnFooter(featured)}>
            <div className="flex items-center gap-2">
              {post.author_avatar && (
                <Image
                  src={post.author_avatar}
                  alt={post.author_name}
                  width={28}
                  height={28}
                  className="rounded-full"
                />
              )}
              <span className="text-xs font-medium text-muted-foreground">
                {post.author_name}
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
              Read More
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function cnCard(featured: boolean) {
  return featured
    ? 'group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-xl transition-all duration-300 lg:grid lg:grid-cols-2'
    : 'group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full';
}

function cnImageWrapper(featured: boolean) {
  return featured
    ? 'relative aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden'
    : 'relative aspect-[16/10] overflow-hidden';
}

function cnContent(featured: boolean) {
  return featured
    ? 'p-6 lg:p-8 flex flex-col justify-center'
    : 'p-5 flex flex-col flex-1';
}

function cnTitle(featured: boolean) {
  return featured
    ? 'font-heading text-xl lg:text-2xl font-bold tracking-tight mb-3 group-hover:text-primary transition-colors'
    : 'font-heading text-lg font-bold tracking-tight mb-2 group-hover:text-primary transition-colors line-clamp-2';
}

function cnExcerpt(featured: boolean) {
  return featured
    ? 'text-muted-foreground text-sm lg:text-base leading-relaxed mb-4 line-clamp-3'
    : 'text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2 flex-1';
}

function cnFooter(featured: boolean) {
  return featured
    ? 'flex items-center justify-between mt-auto'
    : 'flex items-center justify-between mt-auto pt-3 border-t border-border/60';
}
