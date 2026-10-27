import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  query?: string;
  basePath?: string;
}

function getPageNumbers(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | 'ellipsis')[] = [1];
  if (current > 3) pages.push('ellipsis');

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push('ellipsis');
  pages.push(total);
  return pages;
}

export function Pagination({
  currentPage,
  totalPages,
  query = '',
  basePath = '/blog',
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const href = (page: number) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (page > 1) params.set('page', String(page));
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  const base =
    'inline-flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm font-semibold transition-all';
  const idle = 'border-border text-foreground hover:bg-secondary';
  const active = 'border-primary bg-primary text-primary-foreground';
  const disabled = 'border-border text-muted-foreground opacity-50 pointer-events-none';

  return (
    <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
      <Link
        href={href(currentPage - 1)}
        aria-label="Previous page"
        aria-disabled={currentPage === 1}
        tabIndex={currentPage === 1 ? -1 : undefined}
        className={`${base} ${currentPage === 1 ? disabled : idle}`}
      >
        <ChevronLeft className="h-4 w-4" />
      </Link>

      {getPageNumbers(currentPage, totalPages).map((p, i) =>
        p === 'ellipsis' ? (
          <span key={`e-${i}`} className="px-1 text-muted-foreground">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={href(p)}
            aria-current={p === currentPage ? 'page' : undefined}
            className={`${base} ${p === currentPage ? active : idle}`}
          >
            {p}
          </Link>
        )
      )}

      <Link
        href={href(currentPage + 1)}
        aria-label="Next page"
        aria-disabled={currentPage === totalPages}
        tabIndex={currentPage === totalPages ? -1 : undefined}
        className={`${base} ${currentPage === totalPages ? disabled : idle}`}
      >
        <ChevronRight className="h-4 w-4" />
      </Link>
    </nav>
  );
}