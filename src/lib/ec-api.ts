import http from "node:http";
import https from "node:https";
import type {
  ArticleBodyBlock,
  ArticleCategory,
  ArticleSummary,
  AuthorMeta,
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

/**
 * Error carrying the upstream HTTP status so callers can tell "this slug does
 * not exist" (404 -> notFound()) apart from "the API is unreachable"
 * (everything else -> fall back to bundled content).
 */
export class EcApiError extends Error {
  readonly status: number;

  constructor(status: number, path: string) {
    super(`Everest Chronicle API request failed: ${status} ${path}`);
    this.name = "EcApiError";
    this.status = status;
  }
}

const API_BASE_URL = process.env.EC_API_BASE_URL || "https://admin-chronicle.test";

/**
 * Requests go through `node:http(s)` rather than `fetch`, which keeps the
 * self-signed-certificate handling below working but also means Next.js cannot
 * cache them. A small in-process TTL cache stands in for that: without it every
 * page view of a category page with 40+ pages of results hits Laravel.
 *
 * Set `EC_API_CACHE_SECONDS=0` to disable.
 */
const CACHE_TTL_MS = (() => {
  const seconds = Number.parseInt(process.env.EC_API_CACHE_SECONDS ?? "60", 10);

  return Number.isFinite(seconds) && seconds > 0 ? seconds * 1000 : 0;
})();

const CACHE_MAX_ENTRIES = 250;

const responseCache = new Map<string, { expiresAt: number; value: unknown }>();

async function fetchJson<T>(path: string): Promise<T> {
  const cached = responseCache.get(path);

  if (cached && cached.expiresAt > Date.now()) {
    return cached.value as T;
  }

  const value = await requestJson<T>(path);

  if (CACHE_TTL_MS > 0) {
    if (responseCache.size >= CACHE_MAX_ENTRIES) {
      const oldest = responseCache.keys().next().value;
      if (oldest !== undefined) {
        responseCache.delete(oldest);
      }
    }

    responseCache.set(path, { expiresAt: Date.now() + CACHE_TTL_MS, value });
  }

  return value;
}

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

    request.on("error", reject);
    request.end();
  });
}

export async function getHomePageData(): Promise<HomePageData> {
  return fetchJson<HomePageData>("/api/ec/home");
}

export async function getNavigationItems(): Promise<NavigationItem[]> {
  const data = await fetchJson<{ items: NavigationItem[] }>("/api/ec/navigation");

  return data.items;
}

export async function getCategoryPageData(slug: string, page = 1): Promise<CategoryPageData> {
  const query = page > 1 ? `?page=${page}` : "";

  return fetchJson<CategoryPageData>(`/api/ec/categories/${encodeURIComponent(slug)}${query}`);
}

export async function getArticleDetail(slug: string): Promise<ArticleDetailData> {
  return fetchJson<ArticleDetailData>(`/api/ec/articles/${encodeURIComponent(slug)}`);
}

export { API_BASE_URL };
