import http from "node:http";
import https from "node:https";
import { cacheLife, cacheTag } from "next/cache";
import type {
  ArticleBodyBlock,
  ArticleCategory,
  ArticleSummary,
  AuthorProfile,
  AuthorMeta,
  ImageMeta,
  SeoMeta,
  ShortItem,
} from "@/types/content";

export interface NavigationChild {
  label: string;
  href: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationChild[];
}

export interface HomePageData {
  heroStory: ArticleSummary | null;
  featuredStories: ArticleSummary[];
  latestStories: ArticleSummary[];
  categoryStories: Record<string, ArticleSummary[]>;
  shorts: ShortItem[];
}

export interface CategoryInfo {
  id: string;
  title: string;
  slug: string;
  description: string;
  isActive: boolean;
}

export interface PaginationMeta {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface CategoryPageData {
  category: CategoryInfo;
  articles: ArticleSummary[];
  pagination: PaginationMeta;
}

export interface SitemapEntry {
  path: string;
  lastModified?: string | null;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
}

/** Full article payload returned by `GET /api/ec/articles/{slug}`. */
export interface ArticleDetailPayload {
  id: string;
  title: string;
  slug: string;
  dek?: string | null;
  excerpt?: string | null;
  categories?: (string | ArticleCategory)[];
  publishedAt?: string | null;
  publishedAtIso?: string | null;
  updatedAt?: string | null;
  readTime?: string | null;
  wordCount?: number;
  author?: string | null;
  authors?: AuthorMeta[];
  image?: string | null;
  imageMeta?: ImageMeta | null;
  caption?: string | null;
  credit?: string | null;
  body: ArticleBodyBlock[];
  meta?: SeoMeta;
}

export interface ArticleDetailData {
  article: ArticleDetailPayload;
  prev: ArticleSummary | null;
  next: ArticleSummary | null;
  related: ArticleSummary[];
}

export interface AuthorPageData {
  author: AuthorProfile;
  articles: ArticleSummary[];
  mostRead: ArticleSummary[];
  topics?: string[];
}

export interface SearchResultsData {
  articles: ArticleSummary[];
  authors: AuthorProfile[];
}

/**
 * Error carrying the upstream HTTP status so callers can tell "this slug does
 * not exist" (404 -> notFound()) apart from "the API is unreachable".
 */
export class EcApiError extends Error {
  readonly status: number;

  constructor(status: number, path: string) {
    super(`Everest Chronicle API request failed: ${status} ${path}`);
    this.name = "EcApiError";
    this.status = status;
  }
}

/**
 * Whether an error represents an upstream 404.
 *
 * Deliberately structural rather than `instanceof`: these errors cross a
 * `"use cache"` boundary, and the re-thrown error is not always an instance of
 * this class even though it keeps `name: "EcApiError"` and `status`. A failed
 * `instanceof` check here means a missing article escapes as a server error
 * instead of rendering the not-found page.
 */
export function isNotFoundError(error: unknown): boolean {
  if (error instanceof EcApiError) {
    return error.status === 404;
  }

  return (
    typeof error === "object" &&
    error !== null &&
    (error as { status?: unknown }).status === 404
  );
}

const API_BASE_URL = process.env.EC_API_BASE_URL || "https://admin-chronicle.test";
const IS_EC_API_CONFIGURED = true;
const API_TIMEOUT_MS = (() => {
  const milliseconds = Number.parseInt(process.env.EC_API_TIMEOUT_MS ?? "8000", 10);

  return Number.isFinite(milliseconds) && milliseconds > 0 ? milliseconds : 8000;
})();

function requestJson<T>(path: string): Promise<T> {
  const url = new URL(path, API_BASE_URL);

  return new Promise<T>((resolve, reject) => {
    const transport = url.protocol === "https:" ? https : http;
    const request = transport.request(
      url,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        rejectUnauthorized: process.env.EC_API_ALLOW_SELF_SIGNED !== "false" && url.hostname.endsWith(".test")
          ? false
          : undefined,
      },
      (response) => {
        let body = "";

        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          body += chunk;
        });
        response.on("end", () => {
          const statusCode = response.statusCode ?? 500;

          if (statusCode < 200 || statusCode >= 300) {
            reject(new EcApiError(statusCode, path));
            return;
          }

          try {
            resolve(JSON.parse(body) as T);
          } catch (error) {
            reject(error);
          }
        });
      },
    );

    request.setTimeout(API_TIMEOUT_MS, () => {
      request.destroy(new Error(`Everest Chronicle API request timed out after ${API_TIMEOUT_MS}ms: ${path}`));
    });
    request.on("error", reject);
    request.end();
  });
}

export async function getHomePageData(): Promise<HomePageData> {
  "use cache";

  cacheLife("content");
  cacheTag("homepage", "articles", "categories");

  return requestJson<HomePageData>("/api/ec/home");
}

export async function getNavigationItems(): Promise<NavigationItem[]> {
  "use cache";

  cacheLife("navigation");
  cacheTag("navigation");

  const data = await requestJson<{ items: NavigationItem[] }>("/api/ec/navigation");

  return data.items;
}

export async function getCategoryPageData(slug: string, page = 1): Promise<CategoryPageData> {
  "use cache";

  cacheLife("listing");
  cacheTag("articles", "categories", `category:${slug}`);

  const query = page > 1 ? `?page=${page}` : "";

  return requestJson<CategoryPageData>(`/api/ec/categories/${encodeURIComponent(slug)}${query}`);
}

export async function getArticleDetail(slug: string): Promise<ArticleDetailData> {
  "use cache";

  cacheLife("content");
  cacheTag("articles", `article:${slug}`);

  return requestJson<ArticleDetailData>(`/api/ec/articles/${encodeURIComponent(slug)}`);
}

export async function getAuthorPageData(slug: string): Promise<AuthorPageData> {
  "use cache";

  cacheLife("content");
  cacheTag("authors", "articles", `author:${slug}`);

  return requestJson<AuthorPageData>(`/api/ec/authors/${encodeURIComponent(slug)}`);
}

export async function getSearchResults(query: string): Promise<SearchResultsData> {
  const searchParams = new URLSearchParams({ q: query });

  return requestJson<SearchResultsData>(`/api/ec/search?${searchParams.toString()}`);
}

export async function getSitemapEntries(): Promise<SitemapEntry[]> {
  "use cache";

  cacheLife("longLived");
  cacheTag("homepage", "articles", "categories", "navigation");

  const data = await requestJson<{ urls: SitemapEntry[] }>("/api/ec/sitemap");

  return data.urls;
}

export { API_BASE_URL, IS_EC_API_CONFIGURED };
