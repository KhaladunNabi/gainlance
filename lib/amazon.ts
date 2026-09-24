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

  // input যদি 'http' দিয়ে শুরু না হয় (যেমন শুধু ASIN কোড হয়), তখন এই লাইনটা চলবে
  return `https://www.${defaultDomain}/dp/${input}?tag=${affiliateTag}`;
}