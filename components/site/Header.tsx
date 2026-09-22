'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { SearchDialog } from '@/components/site/SearchDialog';
import { cn } from '@/lib/utils';
import type { Category, PostWithCategory } from '@/lib/types';

interface HeaderProps {
  categories: Category[];
  posts: PostWithCategory[];
}

export function Header({ categories, posts }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-heading font-bold text-lg">
              G
            </div>
            <span className="font-heading text-xl font-bold tracking-tight hidden sm:block">
              GainLance
            </span>
          </Link>

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
            {categories.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md">
                    Categories
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-52">
                  {categories.map((cat) => (
                    <DropdownMenuItem key={cat.slug} asChild>
                      <Link href={`/category/${cat.slug}`} className="cursor-pointer">
                        {cat.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>

          <div className="flex items-center gap-2">
            <SearchDialog posts={posts} />
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

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
