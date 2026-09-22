'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { StarRating } from '@/components/site/StarRating';
import type { PostWithCategory } from '@/lib/types';

interface SearchDialogProps {
  posts: PostWithCategory[];
}

export function SearchDialog({ posts }: SearchDialogProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return posts
      .filter((p) => {
        const haystack = [
          p.title,
          p.excerpt,
          p.product_name,
          p.category.name,
          ...p.tags,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return haystack.includes(q);
      })
      .slice(0, 6);
  }, [query, posts]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/blog?q=${encodeURIComponent(query.trim())}`);
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        aria-label="Search reviews"
      >
        <Search className="h-5 w-5" />
      </button>

      <DialogContent className="max-w-xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Search Reviews</DialogTitle>
          <DialogDescription>
            Search for product reviews by name, category, or keyword.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex items-center border-b border-border">
          <Search className="h-5 w-5 text-muted-foreground ml-4 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reviews, products, categories..."
            className="flex-1 bg-transparent px-3 py-4 text-base outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            className="mr-10 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:brightness-110 transition-all"
          >
            Search
          </button>
        </form>

        <div className="max-h-[400px] overflow-y-auto">
          {query.trim() === '' ? (
            <div className="p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Start typing to search across all our product reviews.
              </p>
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-secondary transition-colors group"
                >
                  <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={post.featured_image}
                      alt={post.featured_image_alt || post.title}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate group-hover:text-primary transition-colors">
                      {post.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-muted-foreground">
                        {post.category.name}
                      </span>
                      {post.rating > 0 && (
                        <StarRating rating={post.rating} size={11} />
                      )}
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0" />
                </Link>
              ))}
              <button
                onClick={() => {
                  router.push(`/blog?q=${encodeURIComponent(query.trim())}`);
                  setOpen(false);
                }}
                className="w-full text-center py-2.5 text-sm font-semibold text-primary hover:bg-secondary transition-colors border-t border-border mt-1"
              >
                See all results for &ldquo;{query}&rdquo;
              </button>
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-sm text-muted-foreground">
                No reviews found for &ldquo;{query}&rdquo;. Try a different search term.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
