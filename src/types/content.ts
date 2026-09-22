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

/* ── Article body blocks ──────────────────────────────────────────────────
 *
 * Mirrors the `article_version_sections` mapper in the Laravel API
 * (`Website\Support\Api\ArticleBlockData`). Every block type the editor can
 * produce is represented here so the article page renders the full editor
 * output, not just the five types the original static fixtures used.
 */

export type ArticleHeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";

export interface ArticleImageRef {
  src?: string;
  alt?: string;
}

export type ArticleBodyBlock =
  | { type: "heading"; level?: ArticleHeadingLevel; text: string }
  | { type: "paragraph"; text: string }
  | { type: "richText"; html: string }
  | { type: "divider" }
  | { type: "quotation"; text: string; citation?: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | {
      type: "imageGrid";
      images: ArticleImageRef[];
      columns?: number;
      caption?: string;
      credit?: string;
      link?: string;
    }
  | {
      type: "wideImage";
      image?: ArticleImageRef;
      caption?: string;
      credit?: string;
      link?: string;
    }
  | {
      type: "fullWideImage";
      image?: ArticleImageRef;
      caption?: string;
      credit?: string;
      link?: string;
    }
  | {
      type: "table";
      columns: string[];
      rows: string[][];
      caption?: string;
      hasHeader?: boolean;
      striped?: boolean;
    };


