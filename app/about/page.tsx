// import type { Metadata } from 'next';
// import { Breadcrumbs } from '@/components/site/Breadcrumbs';
// import { OrganizationJsonLd } from '@/components/site/JsonLd';
// import { getCategories, getPosts } from '@/lib/data';
// import { SITE_CONFIG } from '@/lib/site';
// import { ShieldCheck, Microscope, Users, Heart } from 'lucide-react';

// export const metadata: Metadata = {
//   title: 'About Us',
//   description:
//     'Learn about GainLance — our testing methodology, our team, and our commitment to honest, independent product reviews.',
//   alternates: {
//     canonical: '/about',
//   },
//   openGraph: {
//     title: `About Us | ${SITE_CONFIG.name}`,
//     description:
//       'Learn about our testing methodology, our team, and our commitment to honest, independent product reviews.',
//     url: `${SITE_CONFIG.url}/about`,
//   },
// };

// export default async function AboutPage() {
//   const [categories, posts] = await Promise.all([getCategories(), getPosts()]);

//   const values = [
//     {
//       icon: Microscope,
//       title: 'Rigorous Testing',
//       description:
//         'We use products in real situations before forming an opinion. Testing time varies by product, and we note how long we used each one in the review.',
//     },
//     {
//       icon: ShieldCheck,
//       title: 'Independent & Honest',
//       description:
//         'Our reviews are not paid for by manufacturers. We purchase products ourselves and maintain complete editorial independence. Affiliate revenue supports our testing, not our opinions.',
//     },
//     {
//       icon: Users,
//       title: 'Reader-First Approach',
//       description:
//         'We write for you, not for brands. Our goal is to help you make informed buying decisions, whether or not you use our affiliate links.',
//     },
//     {
//       icon: Heart,
//       title: 'Passion for Tech',
//       description:
//         'We are genuine technology enthusiasts who love testing gadgets. Our team brings nearly a decade of combined experience reviewing consumer products.',
//     },
//   ];

//   return (
//     <>
//       <OrganizationJsonLd />

//       <main className="flex-1">
//         <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
//           <Breadcrumbs
//             items={[
//               { label: 'Home', href: '/' },
//               { label: 'About' },
//             ]}
//           />
//         </div>

//         <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-16">
//           <h1 className="font-heading text-3xl lg:text-4xl font-bold tracking-tight mb-6">
//             About {SITE_CONFIG.name}
//           </h1>

//           <div className="prose prose-slate max-w-none">
//             <p className="text-lg text-muted-foreground leading-relaxed mb-8">
//               {SITE_CONFIG.description} We believe buying tech products should be simple,
//               and the best way to simplify that decision is through honest, hands-on reviews
//               from people who actually use the products.
//             </p>
//           </div>

//           <div className="grid sm:grid-cols-2 gap-6 my-12">
//             {values.map((value) => (
//               <div
//                 key={value.title}
//                 className="rounded-xl border border-border bg-card p-6 hover:shadow-md transition-shadow"
//               >
//                 <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
//                   <value.icon className="h-6 w-6" />
//                 </div>
//                 <h3 className="font-heading text-lg font-semibold mb-2">
//                   {value.title}
//                 </h3>
//                 <p className="text-sm text-muted-foreground leading-relaxed">
//                   {value.description}
//                 </p>
//               </div>
//             ))}
//           </div>

//           <section className="my-12">
//             <h2 className="font-heading text-2xl font-bold tracking-tight mb-4">
//               Our Testing Process
//             </h2>
//             <div className="space-y-4 text-muted-foreground leading-relaxed">
//               <p>
//                 At Gainlance, we are committed to providing honest, transparent, and research-backed product recommendations. We believe our readers deserve absolute clarity about how we evaluate products.
//               </p>
//               <ol className="list-decimal list-inside space-y-3 marker:text-primary marker:font-semibold">
//                 <li>
//                   <strong className="text-foreground">How We Evaluate Products-</strong> Whether a product is tested in our studio or evaluated through extensive market research, every review follows a structured methodology to ensure consistency, fairness, and accuracy:
//                 </li>
//                 <li>
//                   <strong className="text-foreground">1. In-Depth Research & Market Analysis:</strong>For products that are difficult to physically acquire (due to size, regional availability, or high cost), we conduct deep analytical research. We aggregate and analyze hundreds of verified buyer reviews, technical specifications, expert opinions, and long-term feedback to identify real-world pros and cons.
//                 </li>
//                 <li>
//                   <strong className="text-foreground">2. Consensus & Pros/Cons Assessment:</strong> We filter out hype and spam to compile our findings into a clear, honest pros and cons list. We highlight consistent user praises as well as common real-world complaints so you know exactly what to expect.
//                 </li>
//                 <li>
//                   <strong className="text-foreground">3. Final Verdict & Honest Recommendation:</strong> Finally, we assign an overall recommendation based on value for money, performance, durability, and practical everyday use—helping you make a confident buying decision.
//                 </li>
//                 <li>
//                   <strong className="text-foreground">Unbiased Opinions:</strong>Our recommendations are never influenced by brands, manufacturers, or affiliate partnerships.
//                 </li>
//               </ol>
//             </div>
//           </section>

//           <section className="my-12">
//             <h2 className="font-heading text-2xl font-bold tracking-tight mb-4">
//               Affiliate Disclosure
//             </h2>
//             <div className="rounded-xl bg-secondary/50 border border-border p-6">
//               <p className="text-sm text-muted-foreground leading-relaxed">
//                 {SITE_CONFIG.name} is a participant in the Amazon Services LLC Associates
//                 Program, an affiliate advertising program designed to provide a means for sites
//                 to earn advertising fees by advertising and linking to Amazon.com. When you
//                 purchase through links on our site, we may earn a commission at no additional
//                 cost to you. This revenue helps us purchase products for testing and maintain
//                 our editorial operations. Our reviews and ratings are never influenced by
//                 affiliate relationships.
//               </p>
//             </div>
//           </section>

//           <section className="my-12">
//   <h2 className="font-heading text-2xl font-bold tracking-tight mb-4">Our Team</h2>
//   <div className="grid sm:grid-cols-2 gap-6">
//     {/* Member 1 */}
//     <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
//       <img
//         src="https://gxqcukmyejzykwplipoo.supabase.co/storage/v1/object/public/image/auth.jpg"
//         alt="Khaladun Nabi"
//         width={56}
//         height={56}
//         loading="lazy"
//         className="h-14 w-14 shrink-0 rounded-full object-cover bg-primary/10"
//       />
//       <div>
//         <h3 className="font-semibold">Khaladun Nabi</h3>
//         <p className="text-xs text-primary font-medium mt-0.5">
//           Founder & Lead Product Reviewer | Gainlance
//         </p>
//         <p className="text-sm text-muted-foreground hover:underline">
//           Gmail: khaladunnabi@gmail.com
//         </p>
//         <p className="text-sm text-muted-foreground mt-2">
//           3 years of experience reviewing products. Search engine optimization expert.
//           Expert about helping consumers make informed decisions.
//         </p>
//       </div>
//     </div>

//     {/* Member 2 */}
//     <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
//       <img
//         src="https://gxqcukmyejzykwplipoo.supabase.co/storage/v1/object/public/image/Shila_Avator.jpeg"
//         alt="Shirin Shila"
//         width={56}
//         height={56}
//         loading="lazy"
//         className="h-14 w-14 shrink-0 rounded-full object-cover bg-primary/10"
//       />
//       <div>
//         <h3 className="font-semibold">Shirin Shila</h3>
//         <p className="text-xs text-primary font-medium mt-0.5">
//           Lead Product Reviewer | Gainlance
//         </p>
//         <p className="text-sm text-muted-foreground hover:underline">
//           Gmail: shirinshila9025@gmail.com
//         </p>
//         <p className="text-sm text-muted-foreground mt-2">
//           Home office desk products analyst with 3 years of experience in reviewing
//           office supplies and home office products. She has a keen eye for detail and
//           is an expert at helping consumers make informed decisions.
//         </p>
//       </div>
//     </div>
//   </div>
// </section>
//         </div>
//       </main>
//     </>
//   );
// }

import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { OrganizationJsonLd } from '@/components/site/JsonLd';
import { getCategories, getPosts } from '@/lib/data';
import { SITE_CONFIG } from '@/lib/site';
import { ShieldCheck, Microscope, Users, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Gainlance — our testing methodology, our team, and our commitment to honest, independent product reviews.',
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
      title: 'Data-Driven & Rigorous Evaluation',
      description:
        'We combine direct hands-on testing with deep market research and verified buyer analysis to give you accurate product insights.',
    },
    {
      icon: ShieldCheck,
      title: 'Independent & Honest',
      description:
        'Our reviews are never paid for by manufacturers. We maintain complete editorial independence, prioritizing transparency and user trust.',
    },
    {
      icon: Users,
      title: 'Reader-First Approach',
      description:
        'We write for you, not for brands. Our goal is to help you make informed buying decisions, whether or not you use our affiliate links.',
    },
    {
      icon: Heart,
      title: 'Passion for Tech & Home',
      description:
        'We are genuine product enthusiasts who love researching and evaluating gear. Our team brings years of combined experience evaluating consumer products.',
    },
  ];

  const evaluationSteps = [
    {
      title: 'In-Depth Research & Market Analysis',
      description:
        'For products that are difficult to physically acquire (due to high cost, size, or regional limitations), we analyze hundreds of verified buyer feedback, technical specifications, and long-term user experiences to filter out fake reviews.',
    },
    {
      title: 'Selective Hands-On Testing & Unboxing',
      description:
        'When products are available in-house, we document the unboxing experience, initial setup, and conduct real-world usage tests across multiple scenarios.',
    },
    {
      title: 'Consensus & Pros/Cons Assessment',
      description:
        'We compile our analytical findings and hands-on observations into a transparent pros and cons list to give you a clear, balanced perspective.',
    },
    {
      title: 'Final Verdict & Honest Recommendation',
      description:
        'Finally, we assign a rating based on performance, long-term value for money, and price-to-quality ratio—helping you make a confident choice.',
    },
  ];

  return (
    <>
      <OrganizationJsonLd />

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
              {SITE_CONFIG.description} We believe buying tech and home products should be simple,
              and the best way to simplify that decision is through transparent, research-backed, and honest reviews.
            </p>
          </div>

          {/* Core Values Section */}
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

          {/* Testing Process Section */}
          <section className="my-12">
            <h2 className="font-heading text-2xl font-bold tracking-tight mb-4">
              Our Testing & Evaluation Process
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                At Gainlance, we are committed to providing honest, transparent, and research-backed product recommendations. To deliver comprehensive and unbiased reviews, we combine deep product analysis, verified customer feedback from platforms like Amazon, and selective hands-on testing.
              </p>
              
              <ol className="list-decimal list-inside space-y-4 marker:text-primary marker:font-semibold mt-4">
                {evaluationSteps.map((step, index) => (
                  <li key={index} className="text-muted-foreground">
                    <strong className="text-foreground font-semibold">{step.title}: </strong>
                    {step.description}
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Affiliate Disclosure Section */}
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
                cost to you. This revenue supports our editorial operations and analytical tools. Our reviews and ratings are never influenced by affiliate relationships.
              </p>
            </div>
          </section>

          {/* Our Team Section */}
          <section className="my-12">
            <h2 className="font-heading text-2xl font-bold tracking-tight mb-4">Our Team</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Member 1 */}
              <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
                <img
                  src="https://gxqcukmyejzykwplipoo.supabase.co/storage/v1/object/public/image/auth.jpg"
                  alt="Khaladun Nabi"
                  width={56}
                  height={56}
                  loading="lazy"
                  className="h-14 w-14 shrink-0 rounded-full object-cover bg-primary/10"
                />
                <div>
                  <h3 className="font-semibold">Khaladun Nabi</h3>
                  <p className="text-xs text-primary font-medium mt-0.5">
                    Founder & Lead Product Reviewer | Gainlance
                  </p>
                  <a href="mailto:khaladunnabi@gmail.com" className="text-sm text-muted-foreground hover:underline block">
                    khaladunnabi@gmail.com
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">
                    3 years of experience reviewing products. Search engine optimization expert dedicated to helping consumers make informed decisions.
                  </p>
                </div>
              </div>

              {/* Member 2 */}
              <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
                <img
                  src="https://gxqcukmyejzykwplipoo.supabase.co/storage/v1/object/public/image/Shila_Avator.jpeg"
                  alt="Shirin Shila"
                  width={56}
                  height={56}
                  loading="lazy"
                  className="h-14 w-14 shrink-0 rounded-full object-cover bg-primary/10"
                />
                <div>
                  <h3 className="font-semibold">Shirin Shila</h3>
                  <p className="text-xs text-primary font-medium mt-0.5">
                    Lead Product Reviewer | Gainlance
                  </p>
                  <a href="mailto:shirinshila9025@gmail.com" className="text-sm text-muted-foreground hover:underline block">
                    shirinshila9025@gmail.com
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">
                    Home office desk products analyst with 3 years of experience in reviewing office supplies and home office products with a keen eye for detail.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}