import type { Metadata } from 'next';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { OrganizationJsonLd } from '@/components/site/JsonLd';
import { getCategories, getPosts } from '@/lib/data';
import { SITE_CONFIG } from '@/lib/site';
import { ShieldCheck, Microscope, Users, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about GearGuru — our testing methodology, our team, and our commitment to honest, independent product reviews.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: `About Us | ${SITE_CONFIG.name}`,
    description:
      'Learn about our testing methodology, our team, and our commitment to honest, independent product reviews.',
    url: `${SITE_CONFIG.url}/about`,
  },
};

export default async function AboutPage() {
  const [categories, posts] = await Promise.all([getCategories(), getPosts()]);

  const values = [
    {
      icon: Microscope,
      title: 'Rigorous Testing',
      description:
        'Every product goes through weeks of real-world testing. We do not rely on spec sheets — we use the products in our daily lives before forming our opinions.',
    },
    {
      icon: ShieldCheck,
      title: 'Independent & Honest',
      description:
        'Our reviews are not paid for by manufacturers. We purchase products ourselves and maintain complete editorial independence. Affiliate revenue supports our testing, not our opinions.',
    },
    {
      icon: Users,
      title: 'Reader-First Approach',
      description:
        'We write for you, not for brands. Our goal is to help you make informed buying decisions, whether or not you use our affiliate links.',
    },
    {
      icon: Heart,
      title: 'Passion for Tech',
      description:
        'We are genuine technology enthusiasts who love testing gadgets. Our team has decades of combined experience in consumer electronics.',
    },
  ];

  return (
    <>
      <OrganizationJsonLd />
      <Header categories={categories} posts={posts} />

      <main className="flex-1">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'About' },
            ]}
          />
        </div>

        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-16">
          <h1 className="font-heading text-3xl lg:text-4xl font-bold tracking-tight mb-6">
            About {SITE_CONFIG.name}
          </h1>

          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {SITE_CONFIG.description} We believe buying tech products should be simple,
              and the best way to simplify that decision is through honest, hands-on reviews
              from people who actually use the products.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 my-12">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-border bg-card p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

          <section className="my-12">
            <h2 className="font-heading text-2xl font-bold tracking-tight mb-4">
              Our Testing Process
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                When we review a product, we follow a structured testing process to ensure
                consistency and fairness:
              </p>
              <ol className="list-decimal list-inside space-y-3 marker:text-primary marker:font-semibold">
                <li>
                  <strong className="text-foreground">Unboxing & Initial Setup</strong> — We
                  document the complete out-of-box experience, from packaging to first use.
                </li>
                <li>
                  <strong className="text-foreground">Real-World Testing</strong> — We use the
                  product as a typical consumer would for a minimum of 2 weeks across multiple
                  scenarios.
                </li>
                <li>
                  <strong className="text-foreground">Benchmark Comparison</strong> — Where
                  applicable, we compare performance against competitors in the same price range.
                </li>
                <li>
                  <strong className="text-foreground">Pros & Cons Assessment</strong> — We
                  compile our findings into a clear pros and cons list to help you weigh your
                  options.
                </li>
                <li>
                  <strong className="text-foreground">Final Verdict</strong> — We assign a rating
                  and write our overall recommendation, considering value, performance, and
                  alternatives.
                </li>
              </ol>
            </div>
          </section>

          <section className="my-12">
            <h2 className="font-heading text-2xl font-bold tracking-tight mb-4">
              Affiliate Disclosure
            </h2>
            <div className="rounded-xl bg-secondary/50 border border-border p-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {SITE_CONFIG.name} is a participant in the Amazon Services LLC Associates
                Program, an affiliate advertising program designed to provide a means for sites
                to earn advertising fees by advertising and linking to Amazon.com. When you
                purchase through links on our site, we may earn a commission at no additional
                cost to you. This revenue helps us purchase products for testing and maintain
                our editorial operations. Our reviews and ratings are never influenced by
                affiliate relationships.
              </p>
            </div>
          </section>

          <section className="my-12">
            <h2 className="font-heading text-2xl font-bold tracking-tight mb-4">Our Team</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary font-heading font-bold text-lg shrink-0">
                  MC
                </div>
                <div>
                  <h3 className="font-semibold">Marcus Chen</h3>
                  <p className="text-xs text-primary font-medium mt-0.5">Senior Editor, Audio & Drones</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    10 years of experience reviewing consumer electronics. Former audio engineer
                    with a passion for sound quality.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary font-heading font-bold text-lg shrink-0">
                  SK
                </div>
                <div>
                  <h3 className="font-semibold">Sarah Kim</h3>
                  <p className="text-xs text-primary font-medium mt-0.5">Editor, Wearables & Gaming</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Tech journalist with 7 years covering smartwatches, gaming peripherals, and
                    mobile accessories.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer categories={categories} />
    </>
  );
}
