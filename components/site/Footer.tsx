import Link from 'next/link';
import { Mail } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site';
import type { Category } from '@/lib/types';
import { FooterCategories } from './FooterCategories';

interface FooterProps {
  categories: Category[];
}

export function Footer({ categories }: FooterProps) {
  const year = new Date().getFullYear();

  // Facebook icon component
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

  return (
    <footer className="border-t border-border/60 bg-secondary/30 mt-auto">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="group flex shrink-0 items-center gap-2">
    <img
    src="/favicon.ico"
    alt=""
    width={28}
    height={28}
    className="h-7 w-7 object-contain"
    />
    <span className="font-heading text-lg font-bold text-foreground transition-colors group-hover:text-primary">
    {SITE_CONFIG.name}
    </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {SITE_CONFIG.description}
            </p>
          </div>

          {/* Categories */}
          <div>
            <FooterCategories categories={categories} />
          </div>

          {/* Site links */}
          <div>
            <h3 className="font-heading text-sm font-semibold mb-4 uppercase tracking-wider text-muted-foreground">
              Site
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  All Reviews
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/sitemap-html" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Sitemap
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  XML Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-sm font-semibold mb-4 uppercase tracking-wider text-muted-foreground">
              Contact Information
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Have a question or feedback? Reach out to us anytime.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:gainlancebd@gmail.com"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border">
                  <Mail className="h-4 w-4" />
                </div>
                <span>gainlancebd@gmail.com</span>
              </a>
              <a
                href="https://www.facebook.com/KhaladunNabi"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border">
                  <FacebookIcon className="h-4 w-4" />
                </div>
                <span>Facebook Page</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-8 border-t border-border/60">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground text-center sm:text-left">
              &copy; {year} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground text-center sm:text-right max-w-2xl">
              As an Amazon Associate we earn from qualifying purchases. Prices and availability are subject to change.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}