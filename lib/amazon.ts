// import {SITE_CONFIG} from './site';

// export function getAmazonAffiliateTag(asin: string): string {
//   const {affiliateTag} = SITE_CONFIG.amazon;
//   const {defaultDomain} = SITE_CONFIG;
//   return `https://www.${defaultDomain}/dp/${asin}?tag=${affiliateTag}`;
// }

import {SITE_CONFIG} from './site';

export function getAmazonAffiliateTag(input: string): string {
  const {affiliateTag} = SITE_CONFIG.amazon;
  const {defaultDomain} = SITE_CONFIG;

  if (input.startsWith('http')) {
    try {
      const url = new URL(input);
      url.searchParams.set('tag', affiliateTag); 
      return url.toString();
    } catch {
      return `https://www.${defaultDomain}/dp/${input}?tag=${affiliateTag}`;
    }
  }
}