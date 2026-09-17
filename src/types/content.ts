export interface ArticleSummary {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  image?: string;
  categories?: string[];
  publishedAt?: string;
  author?: string;
}

export interface ShortItem {
  id: string;
  title: string;
  slug: string;
  image?: string;
  videoUrl?: string;
  location?: string;
}
