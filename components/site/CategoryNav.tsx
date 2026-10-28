// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { cn } from "@/lib/utils";

// type Category = {
//   slug: string;
//   name: string;
// };

// export function CategoryNav({ categories }: { categories: Category[] }) {
//   const pathname = usePathname();

//   if (categories.length === 0) return null;

//   return (
//     <nav
//       aria-label="Categories"
//       className="border-b border-border bg-background"
//     >
//       <div className="container mx-auto px-4">
//         <ul className="flex items-center gap-1 overflow-x-auto whitespace-nowrap py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
//           {categories.map((cat) => {
//             const href = `/category/${cat.slug}`;
//             const isActive = pathname === href;

//             return (
//               <li key={cat.slug} className="shrink-0">
//                 <Link
//                   href={href}
//                   aria-current={isActive ? "page" : undefined}
//                   className={cn(
//                     "inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
//                     isActive
//                       ? "bg-primary/10 text-primary"
//                       : "text-muted-foreground hover:bg-muted hover:text-foreground"
//                   )}
//                 >
//                   {cat.name}
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </nav>
//   );
// }

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = {
  slug: string;
  name: string;
};

export function CategoryNav({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const listRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  // স্ক্রল ও স্ক্রিন সাইজ বদলালে বাটনের অবস্থা আপডেট
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows, categories]);

  // বর্তমান ক্যাটাগরি মাঝখানে নিয়ে আসা
  useEffect(() => {
    const el = listRef.current;
    const active = el?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!el || !active) return;
    el.scrollTo({
      left: active.offsetLeft - el.clientWidth / 2 + active.clientWidth / 2,
      behavior: "smooth",
    });
  }, [pathname]);

  const scrollByDirection = (direction: -1 | 1) => {
    const el = listRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.7, behavior: "smooth" });
  };

  if (categories.length === 0) return null;

  const arrowClass =
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40";

  return (
    <nav
      aria-label="Categories"
      className="sticky top-16 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
    >
      <div className="container mx-auto flex items-center gap-2 px-4 py-2">
        <button
          type="button"
          onClick={() => scrollByDirection(-1)}
          disabled={!canScrollLeft}
          aria-label="Scroll categories left"
          className={arrowClass}
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>

        <ul
          ref={listRef}
          className="relative flex flex-1 items-center gap-1 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
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

        <button
          type="button"
          onClick={() => scrollByDirection(1)}
          disabled={!canScrollRight}
          aria-label="Scroll categories right"
          className={arrowClass}
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>
    </nav>
  );
}