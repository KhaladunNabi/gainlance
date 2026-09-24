import Image from 'next/image';
import { Check, X, ThumbsUp, ThumbsDown } from 'lucide-react';
import { StarRating } from './StarRating';
import { AffiliateLink } from './AffiliateLink';
import type { Post } from '@/lib/types';

export function ProductReview({ post }: { post: Post }) {
  if (!post.product_name) return null;

  return (
    <div className="my-8 rounded-2xl border-2 border-primary/20 bg-primary/5 overflow-hidden">
      <div className="grid md:grid-cols-[200px_1fr] gap-6 p-6">
        {post.product_image && (
          <div className="relative aspect-square rounded-xl overflow-hidden bg-white">
            <Image
              src={post.product_image}
              alt={post.product_image_alt || post.product_name}
              fill
              sizes="200px"
              className="object-contain p-2"
            />
          </div>
        )}

        <div className="flex flex-col">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                Product Review
              </p>
              <h3 className="font-heading text-xl font-bold">{post.product_name}</h3>
            </div>
            {post.rating > 0 && (
              <div className="text-right shrink-0">
                <div className="flex items-center gap-1.5 justify-end">
                  <StarRating rating={post.rating} size={18} />
                </div>
                <p className="text-2xl font-bold mt-1">{post.rating.toFixed(1)}</p>
                <p className="text-xs text-muted-foreground">out of 5</p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 mt-3">
            {post.price && (
              <span className="text-2xl font-bold text-foreground">{post.price}</span>
            )}
            {post.original_price && (
              <span className="text-sm text-muted-foreground line-through">
                {post.original_price}
              </span>
            )}
          </div>

          {post.verdict && (
            <p className="mt-3 text-sm text-muted-foreground italic leading-relaxed border-l-2 border-primary/40 pl-3">
              {post.verdict}
            </p>
          )}

          {post.amazon_url && (
            <div className="mt-4">
              <AffiliateLink asin={post.amazon_url} size="lg">
                Check Price on Amazon
              </AffiliateLink>
            </div>
          )}
        </div>
      </div>

      {(post.pros.length > 0 || post.cons.length > 0) && (
        <div className="grid sm:grid-cols-2 gap-px bg-border/60 border-t border-border/60">
          {post.pros.length > 0 && (
            <div className="bg-card p-6">
              <h4 className="flex items-center gap-2 font-heading font-semibold text-sm uppercase tracking-wider text-success mb-4">
                <ThumbsUp className="h-4 w-4" />
                Pros
              </h4>
              <ul className="space-y-2.5">
                {post.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {post.cons.length > 0 && (
            <div className="bg-card p-6">
              <h4 className="flex items-center gap-2 font-heading font-semibold text-sm uppercase tracking-wider text-destructive mb-4">
                <ThumbsDown className="h-4 w-4" />
                Cons
              </h4>
              <ul className="space-y-2.5">
                {post.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <X className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {post.key_features.length > 0 && (
        <div className="border-t border-border/60 p-6">
          <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">
            Key Specs
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
            {post.key_features.map((feature, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4 py-2 border-b border-border/40 text-sm last:border-0"
              >
                <span className="text-muted-foreground">{feature.label}</span>
                <span className="font-medium text-right">{feature.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
