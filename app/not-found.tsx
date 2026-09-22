//app/not-found.tsx
import Link from 'next/link';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { getCategories, getPosts } from '@/lib/data';
import { Compass } from 'lucide-react';

export default async function NotFound() {
  const [categories, posts] = await Promise.all([getCategories(), getPosts()]);

  return (
    <>
      <Header categories={categories} posts={posts} />
      <main className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="container mx-auto max-w-2xl px-4 text-center py-20">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Compass className="h-8 w-8" />
            </div>
          </div>
          <h1 className="font-heading text-5xl font-bold tracking-tight mb-4">404</h1>
          <p className="text-lg text-muted-foreground mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 hover:shadow-lg hover:shadow-primary/20"
          >
            Back to Home
          </Link>
        </div>
      </main>
      <Footer categories={categories} />
    </>
  );
}
