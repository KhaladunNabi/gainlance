//gainlance/lib/site.ts
export const SITE_CONFIG = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? 'GainLance',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gainlance.com').replace(/\/$/, ''),
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Testing and comparative reviews of essential home and office desk equipment.',
  description:
    'GainLance tests and compares essential home office desk equipment so you can confidently purchase the right setup or product.',
  icon: process.env.NEXT_PUBLIC_SITE_ICON || '/gainlanceLogo.png',
  twitter: process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@khaladunnabi',
  author: process.env.NEXT_PUBLIC_SITE_AUTHOR || 'Md Khaladunnabi',
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
