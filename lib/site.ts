//gainlance/lib/site.ts
export const SITE_CONFIG = {
  name: 'GainLance',
  tagline: 'Testing and comparative reviews of essential home and office desk equipment.',
  description:
    'GainLance tests and compares essential home office desk equipment so you can confidently purchase the right setup or product.',
  url: 'https://gainlance.com',
  icon: '/gainlance-icon.jpg',
  twitter: '@khaladunnabi',
  author: 'Md Khaladunnabi',
  amazonAffiliateTag: 'tag=gainlance-20',
};

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
