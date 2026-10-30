'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getRecentCategories } from '@/lib/recent-categories';
import type { Category } from '@/lib/types';

export function FooterCategories({ categories }: { categories: Category[] }) {
  const [recent, setRecent] = useState<Category[]>([]);

  const loadRecent = () => {
    setRecent(getRecentCategories());
  };

  useEffect(() => {
    // Load recent categories on mount
    loadRecent();

    // "recent-categories-updated" event to listen for updates to recent categories
    window.addEventListener('recent-categories-updated', loadRecent);

    return () => {
      window.removeEventListener('recent-categories-updated', loadRecent);
    };
  }, []);

  const displayList = recent.length > 0 ? recent : categories.slice(0, 5);

  return (
    <div>
      <h3 className="font-heading text-sm font-semibold mb-4 uppercase tracking-wider text-muted-foreground">
        {recent.length > 0 ? 'Recently Browsed' : 'Categories'}
      </h3>
      <ul className="space-y-2.5">
        {displayList.map((cat) => (
          <li key={cat.slug}>
            <Link
              href={`/category/${cat.slug}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}