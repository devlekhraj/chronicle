export interface AuthorSocials {
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  email?: string;
}

export interface AuthorMeta {
  slug?: string;
  name: string;
  role?: string;
  avatar?: string;
  image?: string;
  bio?: string;
}

export interface AuthorProfile {
  slug: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  beats?: string[];
  location?: string;
  storyCount?: number;
  sinceYear?: string | number;
  socials?: AuthorSocials;
}

export interface SeoMeta {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogImage?: string;
  keywords?: string[];
}

export interface ArticleCategory {
  title: string;
  slug: string;
  id?: string;
}

export interface ArticleSummary {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  image?: string;
  categories?: (string | ArticleCategory)[];
  publishedAt?: string;
  updatedAt?: string;
  readTime?: string;
  author?: string | AuthorMeta;
  authors?: AuthorMeta[];
  meta?: SeoMeta;
}

export interface ShortItem {
  id: string;
  title: string;
  slug: string;
  image?: string;
  videoUrl?: string;
  location?: string;
}

