"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type Category = {
  slug: string;
  name: string;
};

export function CategoryNav({ categories }: { categories: Category[] }) {
  const pathname = usePathname();

  if (categories.length === 0) return null;

  return (
    <nav
      aria-label="Categories"
      className="border-b border-border bg-background"
    >
      <div className="container mx-auto px-4">
        <ul className="flex items-center gap-1 overflow-x-auto whitespace-nowrap py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((cat) => {
            const href = `/category/${cat.slug}`;
            const isActive = pathname === href;

            return (
              <li key={cat.slug} className="shrink-0">
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {cat.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}