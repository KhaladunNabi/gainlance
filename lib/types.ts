export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon_name: string | null;
  created_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: ContentBlock[];
  category_id: string;
  author_name: string;
  author_avatar: string | null;
  featured_image: string;
  featured_image_alt: string | null;
  published_at: string;
  updated_at: string;
  is_featured: boolean;
  reading_time: number;
  tags: string[];
  status: string;
  meta_title: string | null;
  meta_description: string | null;
  product_name: string | null;
  product_image: string | null;
  product_image_alt: string | null;
  amazon_url: string | null;
  rating: number;
  price: string | null;
  original_price: string | null;
  pros: string[];
  cons: string[];
  verdict: string | null;
  key_features: KeyFeature[];
}

export interface KeyFeature {
  label: string;
  value: string;
}

export interface ContentBlock {
  type: 'heading' | 'paragraph';
  text: string;
}

export interface PostWithCategory extends Post {
  category: Category;
}
