'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ChevronDown, X } from 'lucide-react';

const RATING_OPTIONS = [
  { label: '4.5★ & up', value: '4.5' },
  { label: '4.0★ & up', value: '4' },
  { label: '3.5★ & up', value: '3.5' },
  { label: '3.0★ & up', value: '3' },
];

const PRICE_OPTIONS = [
  { label: 'Under $50', min: '', max: '50' },
  { label: '$50 – $100', min: '50', max: '100' },
  { label: '$100 – $250', min: '100', max: '250' },
  { label: '$250 – $500', min: '250', max: '500' },
  { label: '$500 & above', min: '500', max: '' },
];

const selectClass =
  'h-10 w-full appearance-none rounded-lg border border-border bg-background pl-3 pr-9 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer';

export function BlogFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const minRating = searchParams.get('minRating') ?? '';
  const minPrice = searchParams.get('minPrice') ?? '';
  const maxPrice = searchParams.get('maxPrice') ?? '';

  // বর্তমান URL থেকে প্রাইস অপশন বের করা
  const priceIndex = PRICE_OPTIONS.findIndex(
    (o) => o.min === minPrice && o.max === maxPrice
  );
  const priceValue = priceIndex >= 0 ? String(priceIndex) : '';

  const update = (changes: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(changes).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    params.delete('page'); // ফিল্টার বদলালে ১ম পেজে ফিরবে
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  const hasFilters = !!(minRating || minPrice || maxPrice);

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Price dropdown */}
      <div className="relative w-full sm:w-44">
        <select
          aria-label="Filter by price"
          value={priceValue}
          onChange={(e) => {
            const opt = PRICE_OPTIONS[Number(e.target.value)];
            update({
              minPrice: opt?.min ?? '',
              maxPrice: opt?.max ?? '',
            });
          }}
          className={selectClass}
        >
          <option value="">All Prices</option>
          {PRICE_OPTIONS.map((o, i) => (
            <option key={o.label} value={i}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>

      {/* Rating dropdown */}
      {/* <div className="relative w-full sm:w-40">
        <select
          aria-label="Filter by rating"
          value={minRating}
          onChange={(e) => update({ minRating: e.target.value })}
          className={selectClass}
        >
          <option value="">All Ratings</option>
          {RATING_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div> */}

      {hasFilters && (
        <button
          type="button"
          onClick={() => update({ minRating: '', minPrice: '', maxPrice: '' })}
          className="inline-flex h-10 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
          Clear
        </button>
      )}
    </div>
  );
}