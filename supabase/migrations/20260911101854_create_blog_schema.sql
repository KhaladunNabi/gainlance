//supabase/migrations/20260911101854_create_blog_schema.sql
/*
# Create blog schema for Amazon affiliate marketing site

## Overview
Creates the database schema for a product review blog focused on Amazon affiliate marketing.
This is a single-tenant content site with no authentication — all content is public.

## New Tables

### categories
- `id` (uuid, primary key)
- `name` (text, not null) — display name e.g. "Headphones"
- `slug` (text, unique, not null) — URL-safe identifier e.g. "headphones"
- `description` (text) — category description for SEO and display
- `icon_name` (text) — Lucide icon name for display
- `created_at` (timestamptz, default now())

### posts
- `id` (uuid, primary key)
- `title` (text, not null) — article title
- `slug` (text, unique, not null) — URL-safe identifier
- `excerpt` (text, not null) — short summary for cards and meta descriptions
- `content` (jsonb, not null) — structured content blocks for the article body
- `category_id` (uuid, FK to categories, not null)
- `author_name` (text, not null)
- `author_avatar` (text) — URL to author avatar image
- `featured_image` (text, not null) — hero image URL
- `featured_image_alt` (text) — alt text for hero image
- `published_at` (timestamptz, not null) — publication date
- `updated_at` (timestamptz, default now()) — last modified date
- `is_featured` (boolean, default false) — show on homepage hero
- `reading_time` (integer) — estimated reading time in minutes
- `tags` (text[]) — array of tag strings
- `status` (text, default 'published') — 'published' or 'draft'
- `meta_title` (text) — custom SEO title (falls back to title)
- `meta_description` (text) — custom meta description (falls back to excerpt)

### Product review fields (on posts table)
- `product_name` (text) — name of the product being reviewed
- `product_image` (text) — product image URL
- `product_image_alt` (text) — alt text for product image
- `amazon_url` (text) — Amazon affiliate link
- `rating` (numeric, 0-5) — overall rating with one decimal
- `price` (text) — current price display string
- `original_price` (text) — original price for showing discount
- `pros` (text[]) — list of pros
- `cons` (text[]) — list of cons
- `verdict` (text) — short verdict / recommendation summary
- `key_features` (jsonb) — array of { label, value } objects for spec table

## Security
- RLS enabled on both tables.
- All CRUD open to anon + authenticated because this is a public content site with no sign-in.
- USING (true) / WITH CHECK (true) is intentional for public shared content.

## Indexes
- Index on posts.slug for fast lookups
- Index on posts.category_id for category page queries
- Index on posts.status for filtering published posts
- Index on posts.is_featured for homepage queries
- Index on posts.published_at for date-ordered listing
- Index on categories.slug for fast lookups
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  icon_name text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content jsonb NOT NULL DEFAULT '[]',
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  author_name text NOT NULL,
  author_avatar text,
  featured_image text NOT NULL,
  featured_image_alt text,
  published_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  is_featured boolean NOT NULL DEFAULT false,
  reading_time integer DEFAULT 5,
  tags text[] DEFAULT '{}',
  status text NOT NULL DEFAULT 'published',
  meta_title text,
  meta_description text,
  product_name text,
  product_image text,
  product_image_alt text,
  amazon_url text,
  rating numeric(2,1) DEFAULT 0,
  price text,
  original_price text,
  pros text[] DEFAULT '{}',
  cons text[] DEFAULT '{}',
  verdict text,
  key_features jsonb DEFAULT '[]'
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_categories" ON categories;
CREATE POLICY "anon_select_categories" ON categories FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_categories" ON categories;
CREATE POLICY "anon_insert_categories" ON categories FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_categories" ON categories;
CREATE POLICY "anon_update_categories" ON categories FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_categories" ON categories;
CREATE POLICY "anon_delete_categories" ON categories FOR DELETE
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_select_posts" ON posts;
CREATE POLICY "anon_select_posts" ON posts FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_posts" ON posts;
CREATE POLICY "anon_insert_posts" ON posts FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_posts" ON posts;
CREATE POLICY "anon_update_posts" ON posts FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_posts" ON posts;
CREATE POLICY "anon_delete_posts" ON posts FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_category_id ON posts(category_id);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_is_featured ON posts(is_featured);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
