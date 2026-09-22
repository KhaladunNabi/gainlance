import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { getCategories, getPosts } from '@/lib/data';
import { SITE_CONFIG, formatDate } from '@/lib/site';
import { LayoutList } from 'lucide-react';

export const metadata: Metadata = {
  title: 'HTML Sitemap',
  description: `A complete list of all pages and product reviews on ${SITE_CONFIG.name}.`,
  alternates: { canonical: '/sitemap-html' },
  robots: { index: true, follow: true },
};

export default async function HtmlSitemapPage() {
  const [categories, posts] = await Promise.all([getCategories(), getPosts()]);

  const staticPages = [
    { label: 'Home', href: '/' },
    { label: 'All Reviews', href: '/blog' },
    { label: 'About Us', href: '/about' },
    { label: 'HTML Sitemap', href: '/sitemap-html' },
    { label: 'XML Sitemap', href: '/sitemap.xml' },
    { label: 'Robots.txt', href: '/robots.txt' },
  ];

  const postsByCategory = categories.map((cat) => ({
    category: cat,
    posts: posts.filter((p) => p.category_id === cat.id),
  }));

  return (
    <>
      <Header categories={categories} posts={posts} />
      <main className="flex-1">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'Sitemap' }]}
          />
        </div>

        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex items-center gap-3 mb-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <LayoutList className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-heading text-3xl font-bold tracking-tight">
                HTML Sitemap
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Complete index of all pages on {SITE_CONFIG.name}
              </p>
            </div>
          </div>

          {/* Static pages */}
          <section className="mb-10">
            <h2 className="font-heading text-lg font-bold tracking-tight mb-4 pb-2 border-b border-border">
              Main Pages
            </h2>
            <ul className="grid sm:grid-cols-2 gap-2">
              {staticPages.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="flex items-center gap-2 text-sm text-primary hover:underline underline-offset-4"
                  >
                    <span className="text-muted-foreground/50">&rsaquo;</span>
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Categories */}
          <section className="mb-10">
            <h2 className="font-heading text-lg font-bold tracking-tight mb-4 pb-2 border-b border-border">
              Categories
            </h2>
            <ul className="grid sm:grid-cols-2 gap-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="flex items-center gap-2 text-sm text-primary hover:underline underline-offset-4"
                  >
                    <span className="text-muted-foreground/50">&rsaquo;</span>
                    {cat.name} Reviews
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Posts by category */}
          {postsByCategory.map(({ category, posts: catPosts }) =>
            catPosts.length > 0 ? (
              <section key={category.slug} className="mb-10">
                <h2 className="font-heading text-lg font-bold tracking-tight mb-4 pb-2 border-b border-border">
                  {category.name} Reviews
                </h2>
                <ul className="space-y-3">
                  {catPosts.map((post) => (
                    <li key={post.slug} className="flex items-start justify-between gap-4">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-sm text-primary hover:underline underline-offset-4 flex items-center gap-2"
                      >
                        <span className="text-muted-foreground/50 shrink-0">&rsaquo;</span>
                        {post.title}
                      </Link>
                      <span className="text-xs text-muted-foreground shrink-0 pt-0.5">
                        {formatDate(post.published_at)}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null
          )}
        </div>
      </main>
      <Footer categories={categories} />
    </>
  );
}
