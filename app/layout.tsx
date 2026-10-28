// import './globals.css';
// import type { Metadata } from 'next';
// import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
// import { SITE_CONFIG } from '@/lib/site';
// import { getCategories, getPosts } from '@/lib/data';
// import { Header } from '@/components/site/Header';
// import { CategoryNav } from '@/components/site/CategoryNav';
// import { Footer } from '@/components/site/Footer';

// const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
// const jakarta = Plus_Jakarta_Sans({
//   subsets: ['latin'],
//   variable: '--font-jakarta',
//   display: 'swap',
// });

// export const metadata: Metadata = {
//   metadataBase: new URL(SITE_CONFIG.url),
//   title: {
//     default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
//     template: `%s | ${SITE_CONFIG.name}`,
//   },
//   description: SITE_CONFIG.description,
//   authors: [{ name: SITE_CONFIG.author }],
//   creator: SITE_CONFIG.author,
//   publisher: SITE_CONFIG.name,
//   icons: {
//     icon: SITE_CONFIG.icon,
//     apple: SITE_CONFIG.icon,
//   },
//   keywords: [
//     'home office tech',
//     'office tech reviews',
//   ],
//   alternates: {
//     canonical: '/',
//   },

//   openGraph: {
//     type: 'website',
//     locale: 'en_US',
//     url: SITE_CONFIG.url,
//     siteName: SITE_CONFIG.name,
//     title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
//     description: SITE_CONFIG.description,
//     images: [
//       {
//         url: '/og-image.png',
//         width: 1200,
//         height: 630,
//         alt: SITE_CONFIG.name,
//       },
//     ],
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
//     description: SITE_CONFIG.description,
//     creator: SITE_CONFIG.twitter,
//     images: ['/og-image.png'],
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       'max-image-preview': 'large',
//       'max-snippet': -1,
//       'max-video-preview': -1,
//     },
//   },
//   category: 'technology',
//   themeColor: [
//     { media: '(prefers-color-scheme: light)', color: '#ffffff' },
//     { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
//   ],
// };




// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     // <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
//     //   <body className="font-sans antialiased min-h-screen flex flex-col">
//     //     {children}
//     //   </body>
//     // </html>
//     <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
//       <body className="font-sans antialiased min-h-screen flex flex-col">
//         <Header categories={categories} posts={allPosts} />
//         <CategoryNav categories={categories} />
//         {children}
//         <Footer categories={categories} />
//       </body>
//     </html>
//   );
// }
 

import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { SITE_CONFIG } from '@/lib/site';
import { getCategories, getPosts } from '@/lib/data';
import { Header } from '@/components/site/Header';
import { CategoryNav } from '@/components/site/CategoryNav';
import { Footer } from '@/components/site/Footer';

// সব পেজে মেনু/Footer সবসময় সর্বশেষ ডেটা দেখাবে
export const dynamic = 'force-dynamic';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  authors: [{ name: SITE_CONFIG.author }],
  creator: SITE_CONFIG.author,
  publisher: SITE_CONFIG.name,
  icons: {
    icon: SITE_CONFIG.icon,
    apple: SITE_CONFIG.icon,
  },
  keywords: ['home office tech', 'office tech reviews'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    creator: SITE_CONFIG.twitter,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'technology',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, allPosts] = await Promise.all([
    getCategories(),
    getPosts(),
  ]);

  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Header categories={categories} posts={allPosts} />
        <CategoryNav categories={categories} />
        {children}
        <Footer categories={categories} />
      </body>
    </html>
  );
}