//lib/data.ts
import { supabase } from './supabase';
import type { Category, Post, PostWithCategory, ContentBlock, KeyFeature } from './types';

function parseContent(content: unknown): ContentBlock[] {
  if (!Array.isArray(content)) return [];
  return content.filter(
    (b): b is ContentBlock =>
      typeof b === 'object' &&
      b !== null &&
      (b.type === 'heading' || b.type === 'paragraph') &&
      typeof b.text === 'string'
  );
}

function parseKeyFeatures(features: unknown): KeyFeature[] {
  if (!Array.isArray(features)) return [];
  return features.filter(
    (f): f is KeyFeature =>
      typeof f === 'object' && f !== null && typeof f.label === 'string' && typeof f.value === 'string'
  );
}

function mapPost(p: any): Post {
  return {
    ...p,
    content: parseContent(p.content),
    key_features: parseKeyFeatures(p.key_features),
    tags: Array.isArray(p.tags) ? p.tags : [],
    pros: Array.isArray(p.pros) ? p.pros : [],
    cons: Array.isArray(p.cons) ? p.cons : [],
    rating: Number(p.rating) || 0,
  };
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  if (error || !data) return [];
  return data as Category[];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  if (error || !data) return null;
  return data as Category;
}

export async function getPosts(limit?: number): Promise<PostWithCategory[]> {
  let query = supabase
    .from('posts')
    .select('*, category:categories(*)')
    .eq('status', 'published')
    .order('published_at', { ascending: false });
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error || !data) return [];
  return data.map((p) => ({ ...mapPost(p), category: p.category as Category }));
}

export async function getFeaturedPosts(limit = 3): Promise<PostWithCategory[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*, category:categories(*)')
    .eq('status', 'published')
    .eq('is_featured', true)
    .order('published_at', { ascending: false })
    .limit(limit);
  if (error || !data) return [];
  return data.map((p) => ({ ...mapPost(p), category: p.category as Category }));
}

export async function getPostBySlug(slug: string): Promise<PostWithCategory | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*, category:categories(*)')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();
  if (error || !data) return null;
  return { ...mapPost(data), category: data.category as Category };
}

export async function getPostsByCategory(categoryId: string): Promise<PostWithCategory[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*, category:categories(*)')
    .eq('status', 'published')
    .eq('category_id', categoryId)
    .order('published_at', { ascending: false });
  if (error || !data) return [];
  return data.map((p) => ({ ...mapPost(p), category: p.category as Category }));
}

export async function getRelatedPosts(post: Post, limit = 3): Promise<PostWithCategory[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*, category:categories(*)')
    .eq('status', 'published')
    .eq('category_id', post.category_id)
    .neq('id', post.id)
    .order('published_at', { ascending: false })
    .limit(limit);
  if (error || !data) return [];
  return data.map((p) => ({ ...mapPost(p), category: p.category as Category }));
}

export async function getTopRatedPosts(limit = 4): Promise<PostWithCategory[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*, category:categories(*)')
    .eq('status', 'published')
    .gte('rating', 4.0)
    .order('rating', { ascending: false })
    .limit(limit);
  if (error || !data) return [];
  return data.map((p) => ({ ...mapPost(p), category: p.category as Category }));
}

export async function getAllPostSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('slug')
    .eq('status', 'published');
  if (error || !data) return [];
  return data.map((p) => p.slug as string);
}

export async function getAllCategorySlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('slug');
  if (error || !data) return [];
  return data.map((c) => c.slug as string);
}
