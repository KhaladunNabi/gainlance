'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import { StarRating } from '@/components/site/StarRating';
import type { PostWithCategory } from '@/lib/types';

export function HeroCarousel({ posts }: { posts: PostWithCategory[] }) {
  if (posts.length === 0) return null;

  return (
    <div className="relative">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {posts.map((post) => (
            <CarouselItem key={post.id} className="pl-3 basis-full">
              <Link
                href={`/blog/${post.slug}`}
                className="group relative block overflow-hidden rounded-2xl h-[60vh] min-h-[400px]"
              >
                <Image
                  src={post.featured_image}
                  alt={post.featured_image_alt || post.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-contain transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    {post.category.name}
                  </span>
                  {post.is_featured && (
                    <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                      Popular
                    </span>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent-80">
                  {post.rating > 0 && (
                    <div className="flex items-center gap-2 mb-2">
                      <StarRating rating={post.rating} size={16} />
                      <span className="text-white text-sm font-bold">
                        {post.rating.toFixed(1)}
                      </span>
                    </div>
                  )}
                  <h3 className="font-heading text-white text-lg lg:text-xl font-bold leading-snug line-clamp-2 mb-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    {post.price ? (
                      <span className="text-white/90 text-sm font-semibold">
                        {post.price}
                      </span>
                    ) : (
                      <span className="text-white/60 text-xs">{post.author_name}</span>
                    )}
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent group-hover:gap-2 transition-all">
                      Read Review
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-2 lg:left-3 h-9 w-9 bg-white/90 border-0 hover:bg-white text-foreground shadow-lg" />
        <CarouselNext className="right-2 lg:right-3 h-9 w-9 bg-white/90 border-0 hover:bg-white text-foreground shadow-lg" />
      </Carousel>

      {/* Dots indicator */}
      <div className="flex justify-center gap-1.5 mt-4">
        {posts.map((_, i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30"
          />
        ))}
      </div>
    </div>
  );
}
