import type { MetadataRoute } from 'next';
import { getCategories, getPosts } from '@/lib/data';
import { SITE_CONFIG } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, posts] = await Promise.all([getCategories(), getPosts()]);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_CONFIG.url,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_CONFIG.url}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_CONFIG.url}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${SITE_CONFIG.url}/category/${cat.slug}`,
    lastModified: new Date(cat.created_at),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_CONFIG.url}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at || post.published_at),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...postPages];
}
