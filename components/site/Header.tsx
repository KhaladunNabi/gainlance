'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import { Menu, X, ChevronDown, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LiveSearch, type SearchPost } from '@/components/site/LiveSearch';
import { cn } from '@/lib/utils';
import type { Category } from '@/lib/types';

interface HeaderProps {
  categories: Category[];
  posts: SearchPost[];
}

export function Header({ categories, posts }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openMega = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setMegaOpen(true);
  };

  const closeMega = () => {
    timeoutRef.current = setTimeout(() => {
      setMegaOpen(false);
    }, 150);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <img
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
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md"
            >
              All Reviews
            </Link>

            {/* Mega menu (Categories) */}
            {categories.length > 0 && (
              <div className="relative" onMouseEnter={openMega} onMouseLeave={closeMega}>
                <button
                  className={cn(
                    'flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    megaOpen ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  Categories
                  <ChevronDown
                    className={cn('h-4 w-4 transition-transform duration-200', megaOpen && 'rotate-180')}
                  />
                </button>

                <div
                  className={cn(
                    'absolute left-1/2 -translate-x-1/2 top-full z-50 mt-1 w-[1024px] max-w-[calc(100vw-2rem)] rounded border bg-popover p-6 shadow-xl transition-all duration-200 origin-top',
                    megaOpen
                      ? 'opacity-100 scale-100 visible pointer-events-auto'
                      : 'opacity-0 scale-95 invisible pointer-events-none'
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
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        className="flex items-center gap-2 rounded px-3 py-2.5 text-sm font-medium text-foreground hover:bg-orange-200 transition-colors"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary/80 shrink-0" />
                        {cat.name}
                      </Link>
                    ))}
                  </div>

                  <div className="mt-4 border-t pt-4">
                    <Link
                      href="/blog"
                      className="flex items-center justify-between rounded px-3 py-2 text-sm font-medium text-primary hover:bg-orange-200 transition-colors"
                    >
                      View all reviews
                      <span className="text-xs">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
              <Link
              href="/about"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md"
              >
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
              {mobileSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
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
            'lg:hidden overflow-hidden transition-all duration-300 ease-in-out',
            mobileOpen ? 'max-h-[400px] pb-4' : 'max-h-0'
          )}
        >
          <nav className="flex flex-col gap-1 pt-2">
            <Link
              href="/"
              className="px-3 py-2.5 text-sm font-medium hover:bg-secondary rounded-md transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="px-3 py-2.5 text-sm font-medium hover:bg-secondary rounded-md transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              All Reviews
            </Link>
            <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
              Categories
            </div>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="px-3 py-2.5 text-sm font-medium hover:bg-secondary rounded-md transition-colors pl-6"
                onClick={() => setMobileOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}