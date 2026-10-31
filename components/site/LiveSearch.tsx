'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SearchPost = {
  id: string | number;
  slug: string;
  title: string;
  excerpt?: string | null;
  product_name?: string | null;
  tags?: string[] | null;
  featured_image?: string | null;
  category: { name: string };
};

function searchPosts(posts: SearchPost[], query: string, limit = 6): SearchPost[] {
  if (query.length < 2) return [];
  const q = query.toLowerCase();
  const words = q.split(/\s+/).filter(Boolean);

  const scored: { post: SearchPost; score: number }[] = [];
  for (const p of posts) {
    const title = p.title.toLowerCase();
    const haystack = [p.title, p.excerpt, p.product_name, p.category.name, ...(p.tags ?? [])]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    if (!words.every((w) => haystack.includes(w))) continue;

    // শিরোনামে মিললে আগে দেখাবে
    let score = 1;
    if (title.includes(q)) score = 3;
    else if (words.every((w) => title.includes(w))) score = 2;

    scored.push({ post: p, score });
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.post);
}

interface LiveSearchProps {
  posts: SearchPost[];
  className?: string;
  autoFocus?: boolean;
  onNavigate?: () => void;
}

export function LiveSearch({ posts, className, autoFocus, onNavigate }: LiveSearchProps) {
  const router = useRouter();
  const listId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  const trimmed = query.trim();
  const results = useMemo(() => searchPosts(posts, trimmed), [posts, trimmed]);
  const showPanel = open && trimmed.length >= 2;

  // বাইরে ক্লিক করলে ড্রপডাউন বন্ধ
  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  const go = (href: string) => {
    router.push(href);
    setOpen(false);
    setQuery('');
    setActive(-1);
    inputRef.current?.blur();
    onNavigate?.();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (active >= 0 && results[active]) {
        go(`/blog/${results[active].slug}`);
      } else if (trimmed) {
        go(`/blog?q=${encodeURIComponent(trimmed)}`);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={wrapRef} className={cn('relative', className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

      <input
        ref={inputRef}
        type="text"
        role="combobox"
        aria-expanded={showPanel}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={active >= 0 ? `${listId}-opt-${active}` : undefined}
        aria-label="Search reviews"
        placeholder="Search reviews..."
        autoFocus={autoFocus}
        autoComplete="off"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActive(-1);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        className="h-10 w-full rounded-full border border-border bg-secondary/50 pl-9 pr-9 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20"
      />

      {query && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            setQuery('');
            setActive(-1);
            inputRef.current?.focus();
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      {showPanel && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[70vh] min-w-[18rem] overflow-y-auto rounded-xl border border-border bg-popover shadow-xl md:left-auto md:w-[26rem]">
          {results.length > 0 ? (
            <>
              <ul id={listId} role="listbox" className="p-1.5">
                {results.map((post, i) => (
                  <li key={post.id} id={`${listId}-opt-${i}`} role="option" aria-selected={i === active}>
                    <Link
                      href={`/blog/${post.slug}`}
                      onClick={() => go(`/blog/${post.slug}`)}
                      onMouseEnter={() => setActive(i)}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-2.5 py-2 transition-colors',
                        i === active ? 'bg-secondary' : 'hover:bg-secondary'
                      )}
                    >
                      {post.featured_image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={post.featured_image}
                          alt=""
                          loading="lazy"
                          className="h-10 w-10 shrink-0 rounded-md bg-muted object-cover"
                        />
                      )}
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium text-foreground">
                          {post.title}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {post.category.name}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="border-t border-border p-1.5">
                <Link
                  href={`/blog?q=${encodeURIComponent(trimmed)}`}
                  onClick={() => go(`/blog?q=${encodeURIComponent(trimmed)}`)}
                  className="flex items-center justify-between rounded-lg px-2.5 py-2 text-sm font-medium text-primary hover:bg-secondary"
                >
                  See all results for &ldquo;{trimmed}&rdquo;
                  <span className="text-xs">→</span>
                </Link>
              </div>
            </>
          ) : (
            <p className="px-4 py-6 text-center text-sm text-muted-foreground">
              No reviews found for &ldquo;{trimmed}&rdquo;
            </p>
          )}
        </div>
      )}
    </div>
  );
}