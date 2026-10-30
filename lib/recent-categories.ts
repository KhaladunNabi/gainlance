import type { Category } from '@/lib/types';

const STORAGE_KEY = 'gainlance_recent_categories';
const MAX_ITEMS = 5;

export function getRecentCategories(): Category[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Category[];
  } catch {
    return [];
  }
}

export function addRecentCategory(category: Category) {
  if (typeof window === 'undefined') return;

  try {
    const current = getRecentCategories();
    const filtered = current.filter((c) => c.slug !== category.slug);
    const updated = [category, ...filtered].slice(0, MAX_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Dispatch a custom event to notify listeners that the recent categories have been updated
    window.dispatchEvent(new Event('recent-categories-updated'));
  } catch {
    // ignore
  }
}