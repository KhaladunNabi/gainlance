import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  size?: number;
  className?: string;
  showNumber?: boolean;
}

export function StarRating({ rating, size = 16, className, showNumber = false }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const totalFull = rating - fullStars >= 0.75 ? fullStars + 1 : fullStars;
  const emptyStars = 5 - totalFull - (hasHalf ? 1 : 0);

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {Array.from({ length: totalFull }).map((_, i) => (
        <Star
          key={`full-${i}`}
          className="fill-accent text-accent"
          style={{ width: size, height: size }}
        />
      ))}
      {hasHalf && (
        <div className="relative" style={{ width: size, height: size }}>
          <Star
            className="absolute inset-0 text-accent"
            style={{ width: size, height: size }}
          />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: size / 2 }}
          >
            <Star
              className="fill-accent text-accent"
              style={{ width: size, height: size }}
            />
          </div>
        </div>
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star
          key={`empty-${i}`}
          className="text-muted-foreground/30"
          style={{ width: size, height: size }}
        />
      ))}
      {showNumber && (
        <span className="ml-1.5 text-sm font-semibold text-foreground">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
