'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Menu, X, ChevronDown, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LiveSearch, type SearchPost } from '@/components/site/LiveSearch';
import { cn } from '@/lib/utils';
import type { Category } from '@/lib/types';

interface PostCount {
  categoryId: string;
  count: number;
}

interface HeaderProps {
  categories: Category[];
  posts: SearchPost[];
  postCountByCategory?: PostCount[];
}

const navLinkClass =
  'px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md';

const mobileLinkClass =
  'px-3 py-2.5 text-sm font-medium hover:bg-secondary rounded-md transition-colors';

function CountBadge({ count }: { count: number }) {
  return (
    <span className="flex h-8 min-w-8 shrink-0 items-center justify-center rounded-sm bg-orange-400 px-1.5 text-[12px] font-semibold leading-none text-white">
      {count}
    </span>
  );
}

export function Header({
  categories,
  posts,
  postCountByCategory = [],
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const countMap = useMemo(
    () => new Map(postCountByCategory.map((c) => [c.categoryId, c.count])),
    [postCountByCategory]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const openMega = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setMegaOpen(true);
  };

  const closeMega = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setMegaOpen(false), 150);
  };

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Image
              src="/favicon.ico"
              alt="GainLance logo"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="hidden font-heading text-xl font-bold tracking-tight sm:block">
              GainLance
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            <Link href="/" className={navLinkClass}>
              Home
            </Link>
            <Link href="/blog" className={navLinkClass}>
              All Reviews
            </Link>

            {/* Mega menu (Categories) */}
            {categories.length > 0 && (
              <div
                className="relative"
                onMouseEnter={openMega}
                onMouseLeave={closeMega}
              >
                <button
                  type="button"
                  aria-expanded={megaOpen}
                  aria-haspopup="true"
                  className={cn(
                    'flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    megaOpen
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  Categories
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 transition-transform duration-200',
                      megaOpen && 'rotate-180'
                    )}
                  />
                </button>

                <div
                  className={cn(
                    'absolute left-1/2 top-full z-50 mt-1 w-[1024px] max-w-[calc(100vw-2rem)] origin-top -translate-x-1/2 rounded border bg-popover p-6 shadow-xl transition-all duration-200',
                    megaOpen
                      ? 'pointer-events-auto visible scale-100 opacity-100'
                      : 'pointer-events-none invisible scale-95 opacity-0'
                  )}
                  onMouseEnter={openMega}
                  onMouseLeave={closeMega}
                >
                  <div className="mb-4 px-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Browse by Category
                    </p>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {categories.map((cat) => {
                      const count = countMap.get(cat.id) ?? 0;

                      return (
                        <Link
                          key={cat.slug}
                          href={`/category/${cat.slug}`}
                          className="flex items-center gap-2 rounded px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
                          onClick={() => setMegaOpen(false)}
                        >
                          <CountBadge count={count} />
                          {cat.name}
                        </Link>
                      );
                    })}
                  </div>

                  <div className="mt-4 border-t pt-4">
                    <Link
                      href="/blog"
                      className="flex items-center justify-between rounded px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-foreground/5"
                      onClick={() => setMegaOpen(false)}
                    >
                      View all reviews
                      <span className="text-xs">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <Link href="/about" className={navLinkClass}>
              About
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Desktop/tablet: সরাসরি সার্চ বক্স */}
            <LiveSearch posts={posts} className="hidden md:block md:w-56 lg:w-72" />

            {/* Mobile: সার্চ আইকন */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => {
                setMobileSearchOpen(!mobileSearchOpen);
                setMobileOpen(false);
              }}
              aria-label="Toggle search"
            >
              {mobileSearchOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => {
                setMobileOpen(!mobileOpen);
                setMobileSearchOpen(false);
              }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile search row */}
        {mobileSearchOpen && (
          <div className="pb-3 md:hidden">
            <LiveSearch
              posts={posts}
              autoFocus
              className="w-full"
              onNavigate={() => setMobileSearchOpen(false)}
            />
          </div>
        )}

        {/* Mobile Menu */}
        <div
          className={cn(
            'overflow-hidden transition-all duration-300 ease-in-out lg:hidden',
            mobileOpen ? 'max-h-[70vh] overflow-y-auto pb-4' : 'max-h-0'
          )}
        >
          <nav className="flex flex-col gap-1 pt-2">
            <Link href="/" className={mobileLinkClass} onClick={closeMobileMenu}>
              Home
            </Link>
            <Link href="/blog" className={mobileLinkClass} onClick={closeMobileMenu}>
              All Reviews
            </Link>
            <Link href="/about" className={mobileLinkClass} onClick={closeMobileMenu}>
              About
            </Link>

            <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
              Categories
            </div>
            {categories.map((cat) => {
              const count = countMap.get(cat.id) ?? 0;

              return (
                <div className="grid grid-cols-2" key={cat.slug}>
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className={cn(mobileLinkClass, 'flex items-center gap-2 pl-6')}
                  onClick={closeMobileMenu}
                >
                  <CountBadge count={count} />
                  {cat.name}
                </Link>
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}