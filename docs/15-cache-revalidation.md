# Cache & On-Demand Revalidation Rule
## Next.js 16 App Router + Laravel CMS

> **Status:** Production Standard  
> **Applies to:** Next.js Frontend (`chronicle`) & Laravel Backend (`admin-chronicle`)  
> **Core Principle:** Invalidate on publish/update via webhooks, cache aggressively between mutations.

---

## 1. High-Level Architecture

The caching strategy relies on **dual-layer cache control**:
1. **Background Caching (Next.js SWR):** Pages and queries are cached using `"use cache"` with defined `cacheLife` profiles (`content`, `listing`, `navigation`, `longLived`).
2. **On-Demand Purging (Laravel Event-Driven):** When an admin creates, updates, deletes, or publishes content, Laravel fires a webhook to Next.js (`POST /api/revalidate`), immediately expiring all matching cache tags with `{ expire: 0 }`.

```text
  ADMIN DASHBOARD (Laravel)
             │
             │  1. Admin publishes or updates article
             ▼
      LARAVEL BACKEND
             │
             │  2. Save to database
             │  3. NextRevalidator::revalidate($tags)
             ▼
  HTTP POST /api/revalidate  ──[ Header: x-revalidate-secret ]──►  NEXT.JS FRONTEND
                                                                         │
                                                                         │  4. revalidateTag(tag, { expire: 0 })
                                                                         ▼
                                                                NEXT.JS SERVER CACHE
                                                                         │
                                                                         │  5. Clears matching tags instantly
                                                                         ▼
                                                                NEXT VISITOR REQUEST
                                                                         │
                                                                         │  6. Fetches fresh API data
                                                                         ▼
                                                                FRESH RENDERED PAGE
```

---

## 2. Tag Taxonomy

All cache tags in [`src/lib/ec-api.ts`](file:///Volumes/TOSHIBA/lekh/dev/chronicle/src/lib/ec-api.ts) adhere to this naming convention:

| Tag Pattern | Scope | Attached In |
| :--- | :--- | :--- |
| `homepage` | Homepage sections (Hero, Featured, Latest, Shorts) | `getHomePageData()`, `getSitemapEntries()` |
| `articles` | General article listing & detail queries | `getHomePageData()`, `getArticleDetail()`, `getCategoryPageData()`, `getAuthorPageData()` |
| `article:{slug}` | Specific article detail page and metadata | `getArticleDetail(slug)` |
| `categories` | All category feeds, header navigation categories | `getHomePageData()`, `getCategoryPageData()`, `getSitemapEntries()` |
| `category:{slug}` | Specific category archive & paginated feed | `getCategoryPageData(slug, page)` |
| `authors` | Author directory and global author listings | `getAuthorPageData(slug)` |
| `author:{slug}` | Specific author profile and article archive | `getAuthorPageData(slug)` |
| `navigation` | Site navigation, main menu, footer categories | `getNavigationItems()`, `getSitemapEntries()` |

---

## 3. Revalidation Trigger Matrix

Whenever a mutation occurs in the backend, the following tags **must** be sent to `POST /api/revalidate`:

| Event / Mutation | Tags to Send |
| :--- | :--- |
| **New article published** | `["homepage", "articles", "category:{cat_slug}", "author:{author_slug}"]` |
| **Published article updated** | `["homepage", "articles", "article:{slug}", "category:{cat_slug}", "author:{author_slug}"]`<br>*(If slug or category changed, include both old and new)* |
| **Article unpublished / trashed** | `["homepage", "articles", "article:{slug}", "category:{cat_slug}"]` |
| **Category created / updated / deleted** | `["homepage", "navigation", "articles", "categories", "category:{slug}"]` |
| **Author profile updated** | `["authors", "author:{slug}"]` |
| **Navigation / Site layout updated** | `["navigation", "homepage"]` |

---

## 4. Next.js Revalidation Endpoint Contract

- **Route:** `POST /api/revalidate`
- **Location:** [`src/app/api/revalidate/route.ts`](file:///Volumes/TOSHIBA/lekh/dev/chronicle/src/app/api/revalidate/route.ts)
- **Authentication:** `x-revalidate-secret` header (must match `process.env.REVALIDATE_SECRET`)

### Request
```http
POST /api/revalidate HTTP/1.1
Host: localhost:3000
Content-Type: application/json
x-revalidate-secret: faa6736fd2e4fd9fba063806b2b6cffd8411ac8f9b5a9b0e

{
  "tags": [
    "homepage",
    "articles",
    "article:my-new-post",
    "category:mountaineering"
  ],
  "immediate": true
}
```

### Route Behavior (Next.js 16)
```ts
// src/app/api/revalidate/route.ts
const isImmediate = body.immediate !== false;
const config = isImmediate ? { expire: 0 } : "max";

for (const tag of normalizedTags) {
  revalidateTag(tag, config);
}
```
- By default, `config = { expire: 0 }` expires the tag **immediately** so the very next visitor receives fresh data without seeing stale cached pages.
- If `"immediate": false`, it defaults to `"max"` (stale-while-revalidate).

### Response
```json
{
  "revalidated": true,
  "tags": [
    "homepage",
    "articles",
    "article:my-new-post",
    "category:mountaineering"
  ],
  "mode": "immediate"
}
```

---

## 5. Laravel Backend Integration Contract

The backend uses `Admin\Support\NextRevalidator`:

### Configuration (`config/services.php`)
```php
'next' => [
    'revalidate_url' => env('NEXT_REVALIDATE_URL'),
    'revalidate_secret' => env('NEXT_REVALIDATE_SECRET'),
    'revalidate_timeout' => (int) env('NEXT_REVALIDATE_TIMEOUT', 5),
],
```

### Invalidation Helper (`packages/devlekh/Admin/src/Support/NextRevalidator.php`)
```php
NextRevalidator::revalidate(NextRevalidator::articleTags($publishedVersion));
// or
NextRevalidator::revalidate(NextRevalidator::categoryTags($category));
```

---

## 6. Environment Variables

### Frontend (`chronicle/.env.local`)
```env
EC_API_BASE_URL="https://admin-chronicle.test"
EC_API_TIMEOUT_MS="8000"
EC_API_ALLOW_SELF_SIGNED="true"
REVALIDATE_SECRET="faa6736fd2e4fd9fba063806b2b6cffd8411ac8f9b5a9b0e"
```

### Backend (`admin-chronicle/.env`)
```env
NEXT_REVALIDATE_URL="http://localhost:3000/api/revalidate"
NEXT_REVALIDATE_SECRET="faa6736fd2e4fd9fba063806b2b6cffd8411ac8f9b5a9b0e"
NEXT_REVALIDATE_TIMEOUT=5
```

---

## 7. Verification & Testing

### Manual cURL Test
```bash
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -H "x-revalidate-secret: faa6736fd2e4fd9fba063806b2b6cffd8411ac8f9b5a9b0e" \
  -d '{"tags": ["homepage", "articles"]}'
```

### Expected Output
```json
{"revalidated":true,"tags":["homepage","articles"],"mode":"immediate"}
```
