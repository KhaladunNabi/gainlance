'use client';

import { useEffect } from 'react';
import { addRecentCategory } from '@/lib/recent-categories';
import type { Category } from '@/lib/types';

export function TrackRecentCategory({ category }: { category: Category }) {
  useEffect(() => {
    addRecentCategory(category);
  }, [category]);

  return null;
}