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

/**
 * Contextual image metadata supplied by the API. `alt` is the editorial alt
 * text and should be preferred over the article title (docs §16).
 */
export interface ImageMeta {
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
  credit?: string;
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
  imageMeta?: ImageMeta;
  categories?: (string | ArticleCategory)[];
  publishedAt?: string;
  publishedAtIso?: string;
  updatedAt?: string;
  readTime?: string;
  author?: string | AuthorMeta;
  authors?: AuthorMeta[];
  badge?: string;
  hasLiveUpdateToday?: boolean;
  latestLiveUpdateAgo?: string | null;
  latestLiveUpdateIso?: string | null;
  meta?: SeoMeta;
}

export interface ShortItem {
  id: string;
  title: string;
  slug: string;
  image?: string;
  videoUrl?: string;
  redirectUrl?: string | null;
  location?: string;
  description?: string;
  publishedAt?: string;
  author?: {
    id?: string | number;
    name?: string;
    slug?: string;
    avatar?: string | null;
  } | null;
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

export type ArticleBlockSize = "normal" | "medium" | "full";

export type ArticleBodyBlock =
  | { type: "heading"; level?: ArticleHeadingLevel; text: string; size?: ArticleBlockSize }
  | { type: "paragraph"; text: string }
  | { type: "divider"; size?: ArticleBlockSize }
  | {
      type: "quotation";
      text: string;
      citation?: string;
      attribution?: string;
      source?: string;
      sourceUrl?: string;
      size?: ArticleBlockSize;
    }
  | { type: "list"; items: string[]; ordered?: boolean; size?: ArticleBlockSize }
  | {
      type: "imageGrid";
      images: ArticleImageRef[];
      columns?: number;
      caption?: string;
      credit?: string;
      link?: string;
      size?: ArticleBlockSize;
    }
  | {
      type: "wideImage";
      image?: ArticleImageRef;
      caption?: string;
      credit?: string;
      link?: string;
      size?: ArticleBlockSize;
    }
  | {
      type: "fullWideImage";
      image?: ArticleImageRef;
      caption?: string;
      credit?: string;
      link?: string;
      size?: ArticleBlockSize;
    }
  | {
      type: "video";
      url: string;
      caption?: string;
      size?: ArticleBlockSize;
    }
  | {
      type: "callout";
      style?: string;
      title?: string;
      text?: string;
      message?: string;
      size?: ArticleBlockSize;
    }
  | {
      type: "code";
      code: string;
      language?: string;
      title?: string;
      backgroundColor?: string;
      textColor?: string;
      size?: ArticleBlockSize;
    }
  | {
      type: "table";
      columns: string[];
      rows: string[][];
      caption?: string;
      hasHeader?: boolean;
      striped?: boolean;
      size?: ArticleBlockSize;
    }
  | {
      /** Interactive / Social Embed block (Google Maps, Instagram, Facebook, X/Twitter, YouTube, Spotify, TikTok, etc.) */
      type: "embed";
      /** Raw URL or iframe/HTML snippet saved by the editor */
      source?: string;
      /** Alias fields saved by the editor block */
      url?: string;
      code?: string;
      caption?: string;
      captionPosition?: string;
      size?: ArticleBlockSize;
      layout?: string;
      /** Parser output from the API (kind/url/html are safe to render directly). */
      embedType?:
        | "empty"
        | "html"
        | "iframe"
        | "instagram-post"
        | "instagram-profile"
        | "twitter-post"
        | "youtube"
        | "vimeo"
        | "spotify"
        | "soundcloud"
        | "tiktok-post"
        | "facebook-post"
        | "facebook-profile"
        | "generic-url"
        | "unsupported";
      embedUrl?: string;
      embedHtml?: string;
      embedRawUrl?: string;
      embedHeight?: number;
      embedAspectRatio?: string;
      embedProvider?: string;
    }
  | {
      type: "related";
      heading?: string;
      articleIds?: number[];
      size?: ArticleBlockSize;
    }
  | {
      type: "ad";
      imageUrl?: string;
      title?: string;
      description?: string;
      linkUrl?: string;
      buttonText?: string;
      size?: ArticleBlockSize;
    };

export interface LiveUpdateBanner {
  url: string;
  alt?: string | null;
  caption?: string | null;
  credit?: string | null;
}

export interface LiveUpdateItem {
  id: string;
  title?: string | null;
  subTitle?: string | null;
  publishedAt?: string | null;
  publishedAtIso?: string | null;
  banner?: LiveUpdateBanner | null;
  body: ArticleBodyBlock[];
  author?: string | null;
}


