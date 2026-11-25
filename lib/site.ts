//gainlance/lib/site.ts
export const SITE_CONFIG = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? 'GainLance',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gainlance.com').replace(/\/$/, ''),
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'GainLance helps you choose the right home office gear.',
  description:
    'GainLance helps you choose the right home office gear. We compare specs, verified buyer feedback and real-world ratings for monitors, chairs, standing desks, lamps and desk accessories, so you can pick with confidence.',
  icon: process.env.NEXT_PUBLIC_SITE_ICON || '/gainlance-icon.png',
  twitter: process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@khaladunnabi',
  author: process.env.NEXT_PUBLIC_SITE_AUTHOR || 'Md Khaladunnabi and GainLance Team',
  amazon: {
    affiliateTag: process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG || 'gainlance-20',
  },
  defaultDomain: 'amazon.com',
};

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
