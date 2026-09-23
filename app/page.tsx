import Link from 'next/link';
import { ArrowRight, TrendingUp, ShieldCheck, ThumbsUp } from 'lucide-react';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { BlogCard } from '@/components/site/BlogCard';
import { CategoryCard } from '@/components/site/CategoryCard';
import { HeroCarousel } from '@/components/site/HeroCarousel';
import { TopRatedSection } from '@/components/site/TopRatedSection';
import { OrganizationJsonLd, WebsiteJsonLd } from '@/components/site/JsonLd';
import { getCategories, getFeaturedPosts, getPosts, getTopRatedPosts } from '@/lib/data';
import { SITE_CONFIG } from '@/lib/site';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [categories, featuredPosts, allPosts, topRatedPosts] = await Promise.all([
    getCategories(),
    getFeaturedPosts(5),
    getPosts(),
    getTopRatedPosts(4),
  ]);

  const recentPosts = allPosts.slice(0, 6);
  const carouselPosts = featuredPosts.slice(0, 5);

  const postCountByCategory = categories.map((cat) => ({
    categoryId: cat.id,
    count: allPosts.filter((p) => p.category_id === cat.id).length,
  }));

  return (
    <>
      <OrganizationJsonLd />
      <WebsiteJsonLd />
      <Header categories={categories} posts={recentPosts} />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-6">
                  <TrendingUp className="h-4 w-4" />
                  Trusted by 50,000+ readers
                </span>
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
                  We Test Tech So{' '}
                  <span className="text-primary">You Don&apos;t Have To</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                  {SITE_CONFIG.description} Every product is tested for weeks before we publish our verdict.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
                  >
                    Browse All Reviews
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-secondary active:scale-[0.98]"
                  >
                    How We Test
                  </Link>
                </div>

                <div className="flex items-center gap-6 mt-10">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Independent testing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Hands-on reviews</span>
                  </div>
                </div>
              </div>

              <div className="relative hidden lg:block">
                <HeroCarousel posts={carouselPosts} />
              </div>
            </div>
          </div>
        </section>

        {/* Top-Rated Products */}
        <TopRatedSection posts={topRatedPosts} />

        {/* Categories */}
        <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-heading text-2xl lg:text-3xl font-bold tracking-tight mb-2">
                Browse by Category
              </h2>
              <p className="text-muted-foreground">
                Find the perfect product review for your needs
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => {
              const count = postCountByCategory.find((c) => c.categoryId === cat.id)?.count || 0;
              return <CategoryCard key={cat.id} category={cat} postCount={count} />;
            })}
          </div>
        </section>

        {/* Latest Reviews */}
        <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-heading text-2xl lg:text-3xl font-bold tracking-tight mb-2">
                Latest Reviews
              </h2>
              <p className="text-muted-foreground">
                Fresh from our testing lab
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        {/* Trust banner */}
        <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
          <div className="rounded-2xl border border-border bg-gradient-to-r from-primary/5 to-accent/5 p-8 lg:p-12">
            <div className="grid sm:grid-cols-3 gap-8 text-center">
              <div>
                <p className="font-heading text-3xl font-bold text-primary">20+</p>
                <p className="text-sm text-muted-foreground mt-1">Products Tested</p>
              </div>
              <div>
                <p className="font-heading text-3xl font-bold text-primary">1K+</p>
                <p className="text-sm text-muted-foreground mt-1">Monthly Readers</p>
              </div>
              <div>
                <p className="font-heading text-3xl font-bold text-primary">4.8/5</p>
                <p className="text-sm text-muted-foreground mt-1">Reader Trust Score</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer categories={categories} />
    </>
  );
}
