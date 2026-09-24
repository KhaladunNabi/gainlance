import {SITE_CONFIG} from './site';

export function getAmazonAffiliateTag(asin: string): string {
  const {defaultDomain, affiliateTag} = SITE_CONFIG.amazon;
  return `https://www.${defaultDomain}/dp/${asin}?tag=${affiliateTag}`;
}
