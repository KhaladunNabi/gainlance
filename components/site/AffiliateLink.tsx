import { ShoppingBag, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AffiliateLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'lg';
}

export function AffiliateLink({ href, children, className, size = 'default' }: AffiliateLinkProps) {
  return (
    <a
      href={href}
      rel="nofollow sponsored noopener noreferrer"
      target="_blank"
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg bg-accent text-accent-foreground font-semibold transition-all hover:brightness-110 hover:shadow-lg hover:shadow-accent/20 active:scale-[0.98]',
        size === 'lg' ? 'px-6 py-3.5 text-base' : 'px-5 py-2.5 text-sm',
        className
      )}
    >
      <ShoppingBag className={size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} />
      {children}
      <ExternalLink className={size === 'lg' ? 'h-4 w-4 opacity-70' : 'h-3.5 w-3.5 opacity-70'} />
    </a>
  );
}
