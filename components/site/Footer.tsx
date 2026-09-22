import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site';
import type { Category } from '@/lib/types';

interface FooterProps {
  categories: Category[];
}

export function Footer({ categories }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-secondary/30 mt-auto">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-heading font-bold">
                G
              </div>
              <span className="font-heading text-lg font-bold">{SITE_CONFIG.name}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {SITE_CONFIG.description}
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-heading text-sm font-semibold mb-4 uppercase tracking-wider text-muted-foreground">
              Categories
            </h3>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
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
                href="mailto:khaladict@gmail.com"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border">
                  <Mail className="h-4 w-4" />
                </div>
                <span>khaladict@gmail.com</span>
              </a>
              <a
                href="tel:+8801817867767"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border">
                  <Phone className="h-4 w-4" />
                </div>
                <span>+880 1817-867767</span>
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