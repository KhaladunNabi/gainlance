import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import type { Category } from '@/lib/types';

interface CategoryCardProps {
  category: Category;
  postCount: number;
}

export function CategoryCard({ category, postCount }: CategoryCardProps) {
  const Icon = (Icons as any)[category.icon_name || 'Package'] || Icons.Package;

  return (
    <Link
      href={`/category/${category.slug}`}
      className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
        <Icon className="h-6 w-6" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-heading font-semibold text-base group-hover:text-primary transition-colors">
          {category.name}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          {postCount} {postCount === 1 ? 'review' : 'reviews'}
        </p>
      </div>
      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
    </Link>
  );
}
