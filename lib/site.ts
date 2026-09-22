//gainlance/lib/site.ts
export const SITE_CONFIG = {
  name: 'GainLance',
  tagline: 'Expert Reviews for Smart Shoppers',
  description:
    'In-depth, hands-on reviews of the latest tech products. We test everything from home to office so you can buy with confidence.',
  url: 'https://gainlance.com',
  icon: '/gainlance-icon.jpg',
  twitter: '@khaladunnabi',
  author: 'Md Khaladunnabi',
  amazonAffiliateTag: '**********',
};

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
