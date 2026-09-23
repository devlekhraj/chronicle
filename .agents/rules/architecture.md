# Frontend Architecture Standard
## Next.js 16 App Router + Laravel API

> **Status:** Production architecture standard  
> **Applies to:** Existing Next.js frontend consuming a Laravel API  
> **Primary goals:** SEO, Core Web Vitals, zero-visible-flicker UX, maintainability, scalability, accessibility, security, and predictable caching.

> **Current project contract:** The frontend uses `EC_API_BASE_URL` for the Laravel
> public API, `REVALIDATE_SECRET` for the protected Next.js revalidation route,
> and `EC_API_TIMEOUT_MS` for upstream request timeouts. The Laravel backend uses
> `NEXT_REVALIDATE_URL`, `NEXT_REVALIDATE_SECRET`, and
> `NEXT_REVALIDATE_TIMEOUT` to invalidate Next.js cache tags after content
> mutations.

---

## 1. Purpose

This document defines the required architecture for the frontend application.

The application MUST be built so that:

- Search engines receive meaningful rendered HTML on the first response.
- Primary content does not depend on client-side `useEffect()` fetching.
- Internal navigation feels application-like and does not perform full page reloads.
- Hard refreshes do not produce avoidable white flashes, font swaps, layout jumps, or large loading screens.
- Fonts, images, API data, layouts, and route transitions are optimized for Core Web Vitals.
- Laravel remains the source of truth for application/business data.
- Next.js acts as the rendering, presentation, caching, SEO, and web-delivery layer.
- Public content can be cached aggressively while private/user-specific content remains dynamic.
- Cache invalidation happens when Laravel content changes.
- Client-side JavaScript is kept as small as reasonably possible.

The target is consistently excellent Lighthouse/Core Web Vitals results.

> A literal `100/100` Lighthouse score cannot be guaranteed on every device, browser, network, third-party integration, or test run. The architecture MUST nevertheless be designed so that our own code does not unnecessarily prevent a 100-class result.

---

# 2. High-Level Architecture

```text
                         SEARCH ENGINE / USER
                                  |
                                  v
                         CDN / EDGE / PLATFORM
                                  |
                                  v
                       +----------------------+
                       |      NEXT.JS 16      |
                       |      APP ROUTER      |
                       +----------+-----------+
                                  |
             +--------------------+--------------------+
             |                    |                    |
             v                    v                    v
      STATIC / CACHED        DYNAMIC SERVER        CLIENT ISLANDS
          CONTENT               CONTENT             ONLY WHEN NEEDED
             |                    |                    |
             +--------------------+--------------------+
                                  |
                                  v
                         SERVER-SIDE API LAYER
                                  |
                                  v
                       +----------------------+
                       |     LARAVEL API      |
                       |  BUSINESS LOGIC/API  |
                       +----------+-----------+
                                  |
                     +------------+------------+
                     |                         |
                     v                         v
                  MYSQL                     REDIS
                                      cache / queue / locks
```

### Responsibility boundary

### Next.js owns

- HTML rendering
- page composition
- routing
- SEO metadata
- canonical URLs
- Open Graph metadata
- JSON-LD rendering
- sitemap generation
- robots directives
- image optimization
- font delivery
- frontend caching
- streaming
- loading UI
- client-side navigation
- browser interaction
- UI state
- accessibility
- performance budgets

### Laravel owns

- authentication authority
- authorization
- validation
- business logic
- database writes
- application data
- domain rules
- API resources
- server-side query optimization
- events
- queues
- transactional actions
- cache invalidation events/webhooks

Next.js MUST NOT duplicate core Laravel business rules.

---

# 3. Rendering Strategy

The default rendering model is:

```text
Server Component first
        |
        +--> cache when public/shared
        |
        +--> dynamic when request-specific
        |
        +--> Client Component only for interaction
```

## Required rule

Pages MUST NOT be converted into Client Components simply because one small element requires interactivity.

### Correct

```text
page.tsx                       Server Component
|
+-- Header                     Server Component
+-- Hero                       Server Component
+-- ArticleList                Server Component
+-- NewsletterForm             Client Component
+-- BookmarkButton             Client Component
+-- Footer                     Server Component
```

### Incorrect

```tsx
'use client'

export default function Page() {
  // entire page unnecessarily hydrated
}
```

---

# 4. Server Components Are the Default

All page-level and content-level components MUST remain React Server Components unless browser APIs, event handlers, or local interactive state are required.

Use Client Components only for things such as:

- form interaction
- dropdown state
- modal state
- tabs that change locally
- carousel controls
- bookmark buttons
- interactive filters
- browser-only APIs
- optimistic updates
- authenticated client interaction where server rendering is not appropriate

Do NOT use `'use client'` for:

- article content
- category pages
- navigation markup that does not need client state
- static cards
- headings
- breadcrumbs
- SEO content
- site footer
- static hero sections
- public lists whose data can be rendered on the server

---

# 5. Data Flow

Public content SHOULD follow this path:

```text
Request
   |
   v
Next.js Server Component
   |
   v
Cached server data function
   |
   v
Laravel API
   |
   v
Laravel Resource
   |
   v
Rendered HTML
   |
   v
Browser
```

Avoid this architecture for initial SEO-visible content:

```text
Browser
   |
   v
empty component
   |
   v
hydration
   |
   v
useEffect()
   |
   v
Laravel API
   |
   v
content finally appears
```

That pattern causes avoidable:

- delayed content
- loading flicker
- SEO weakness
- extra JavaScript
- hydration work
- layout instability

---

# 6. API Layer

Do not scatter raw API URLs throughout components.

Required structure:

```text
src/
├── app/
├── components/
├── features/
├── lib/
│   ├── api/
│   │   ├── client.ts
│   │   ├── articles.ts
│   │   ├── categories.ts
│   │   ├── pages.ts
│   │   └── auth.ts
│   ├── cache/
│   ├── seo/
│   └── utils/
└── types/
```

Example base API helper:

```ts
// src/lib/api/client.ts

const API_URL = process.env.LARAVEL_API_URL

if (!API_URL) {
  throw new Error('LARAVEL_API_URL is not configured')
}

type ApiOptions = RequestInit & {
  timeout?: number
}

export async function apiFetch<T>(
  path: string,
  options: ApiOptions = {}
): Promise<T> {
  const controller = new AbortController()
  const timeout = setTimeout(
    () => controller.abort(),
    options.timeout ?? 8000
  )

  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(
        `Laravel API request failed: ${response.status} ${path}`
      )
    }

    return (await response.json()) as T
  } finally {
    clearTimeout(timeout)
  }
}
```

### Rules

- Server-side Laravel URL MUST come from environment configuration.
- Never expose private Laravel credentials to the browser.
- Do not call Laravel directly from Client Components unless there is a specific reason.
- Prefer server-to-server communication for public page rendering.
- Public Laravel responses MUST be serializable, stable, and intentionally shaped.
- Laravel API Resources SHOULD define public response contracts.

---

# 7. Next.js 16 Cache Components

For Next.js 16, enable Cache Components intentionally:

```ts
// next.config.ts

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
}

export default nextConfig
```

With Cache Components enabled:

- uncached/request-specific work is dynamic by default
- cacheable work should explicitly use `use cache`
- `cacheLife()` defines cache behavior
- `cacheTag()` identifies content for invalidation
- dynamic sections should use `<Suspense>`

This architecture SHOULD use the Next.js 16 Cache Components model rather than mixing multiple historical caching approaches without a reason.

---

# 8. Cache Profiles

Define cache behavior by content type.

Example:

```ts
// next.config.ts

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,

  cacheLife: {
    navigation: {
      stale: 3600,
      revalidate: 1800,
      expire: 86400,
    },

    content: {
      stale: 300,
      revalidate: 300,
      expire: 86400,
    },

    listing: {
      stale: 60,
      revalidate: 60,
      expire: 3600,
    },

    longLived: {
      stale: 86400,
      revalidate: 3600,
      expire: 604800,
    },
  },
}

export default nextConfig
```

These values are defaults, not immutable business rules. Adjust according to actual freshness requirements.

---

# 9. Cached Laravel Fetches

Example:

```ts
// src/lib/api/articles.ts

import { cacheLife, cacheTag } from 'next/cache'
import { apiFetch } from './client'

export async function getArticle(slug: string) {
  'use cache'

  cacheLife('content')
  cacheTag('articles', `article:${slug}`)

  return apiFetch(`/api/v1/articles/${slug}`)
}
```

Category listing:

```ts
export async function getCategoryArticles(slug: string) {
  'use cache'

  cacheLife('listing')
  cacheTag('articles', `category:${slug}`)

  return apiFetch(`/api/v1/categories/${slug}/articles`)
}
```

Navigation:

```ts
export async function getNavigation() {
  'use cache'

  cacheLife('navigation')
  cacheTag('navigation')

  return apiFetch('/api/v1/navigation')
}
```

---

# 10. Cache Invalidation Must Be Event Driven

Do not rely only on short cache TTLs.

When content changes in Laravel:

```text
Admin publishes article
        |
        v
Laravel saves transaction
        |
        v
Laravel emits event/job
        |
        v
Laravel calls protected Next.js revalidation endpoint
        |
        v
Next.js revalidateTag()
        |
        v
Next request receives updated content
```

Example Next.js endpoint:

```ts
// src/app/api/revalidate/route.ts

import { revalidateTag } from 'next/cache'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret')

  if (
    !process.env.REVALIDATE_SECRET ||
    secret !== process.env.REVALIDATE_SECRET
  ) {
    return Response.json(
      { message: 'Unauthorized' },
      { status: 401 }
    )
  }

  const body = await request.json()

  if (!Array.isArray(body.tags)) {
    return Response.json(
      { message: 'Invalid tags' },
      { status: 422 }
    )
  }

  for (const tag of body.tags) {
    revalidateTag(String(tag), 'max')
  }

  return Response.json({ revalidated: true })
}
```

Laravel example:

```php
Http::withHeaders([
    'X-Revalidate-Secret' => config('services.next.revalidate_secret'),
])->post(config('services.next.revalidate_url'), [
    'tags' => [
        'articles',
        "article:{$article->slug}",
        "category:{$article->category->slug}",
    ],
]);
```

Revalidation SHOULD be queued after the database transaction commits.

Current Laravel integration:

- Article publish MUST revalidate `homepage`, `articles`, `article:{slug}`,
  `category:{slug}` for every assigned category, and `author:{slug}` for every
  assigned author.
- Category create/update/status/delete MUST revalidate `homepage`,
  `navigation`, `articles`, `categories`, and `category:{slug}`.
- Revalidation is a best-effort side effect. It MUST log failures but MUST NOT
  fail the editorial mutation after the database transaction has succeeded.
- Backend environment variables:
  - `NEXT_REVALIDATE_URL`
  - `NEXT_REVALIDATE_SECRET`
  - `NEXT_REVALIDATE_TIMEOUT`
- Frontend environment variables:
  - `REVALIDATE_SECRET`
  - `EC_API_BASE_URL`
  - `EC_API_TIMEOUT_MS`

---

# 11. Suggested Cache Tag Taxonomy

Use predictable names.

```text
site-settings
navigation
footer
homepage

articles
article:{slug}
article:{id}

categories
category:{slug}

authors
author:{slug}

destinations
destination:{slug}

treks
trek:{slug}

pages
page:{slug}
```

A content update may invalidate multiple related tags.

Example:

```text
article updated
|
+-- article:everest-expedition
+-- articles
+-- category:expedition
+-- author:john-doe
+-- homepage
```

---

# 12. Dynamic / Personalized Content

Never share user-specific data through public caches.

Examples:

- current user
- cart
- private dashboard
- account details
- notifications
- personalized recommendations containing private data
- draft/pre-publication CMS content

These SHOULD be request-specific and separated from publicly cached page content.

Preferred composition:

```tsx
<>
  <PublicArticle />

  <Suspense fallback={<AccountActionsSkeleton />}>
    <UserArticleActions />
  </Suspense>
</>
```

Public content remains fast and cacheable while private content stays dynamic.

---

# 13. Persistent Layouts

Global site chrome MUST live in layouts.

```text
src/app/
├── layout.tsx
├── page.tsx
├── (site)/
│   ├── layout.tsx
│   ├── articles/
│   ├── categories/
│   └── ...
└── account/
    └── layout.tsx
```

Persistent layout SHOULD contain:

- global header
- primary navigation
- shared announcement/top bar if required
- site footer
- global providers that are genuinely required

Do not mount/unmount the global shell on each internal route.

---

# 14. Navigation

Internal routes MUST use `next/link`.

Correct:

```tsx
import Link from 'next/link'

<Link href="/expedition">
  Expedition
</Link>
```

Avoid:

```tsx
<a href="/expedition">Expedition</a>
```

for normal internal navigation because it performs a document navigation instead of using the Next.js router.

Do not globally disable prefetching without a measured reason.

For primary high-intent navigation, use normal `<Link>` behavior so Next.js can prefetch routes in production.

---

# 15. Loading Strategy

The application MUST NOT replace the entire viewport with a spinner for normal route changes.

Avoid:

```text
+-----------------------------+
|                             |
|          Loading...         |
|                             |
+-----------------------------+
```

Prefer stable page structure and sectional loading states:

```text
+------------------------------------------------+
| persistent header                              |
+------------------------------------------------+
| page title                                     |
|                                                |
| existing/cached content                        |
|                                                |
| +------------------+  +--------------------+   |
| | skeleton         |  | rendered content   |   |
| +------------------+  +--------------------+   |
+------------------------------------------------+
| persistent footer                              |
+------------------------------------------------+
```

Skeletons MUST:

- reserve the same approximate geometry as final content
- avoid animation that is visually distracting
- not cause layout shift when replaced
- be used only where content can genuinely be delayed

---

# 16. Suspense and Streaming

Use Suspense around slow dynamic subtrees rather than delaying the entire route.

```tsx
import { Suspense } from 'react'

export default async function Page() {
  return (
    <>
      <Hero />
      <MainContent />

      <Suspense fallback={<PopularSkeleton />}>
        <PopularContent />
      </Suspense>
    </>
  )
}
```

Do not wrap already-fast static/cached content in unnecessary suspense boundaries.

The goal is:

```text
critical content first
secondary content independently
no full-page blocking
```

---

# 17. Prevent Hydration Flicker

Avoid rendering materially different server and client trees.

Do NOT use:

```ts
if (typeof window !== 'undefined') {
  // render completely different UI
}
```

for important layout.

Avoid:

```tsx
const [mounted, setMounted] = useState(false)

useEffect(() => {
  setMounted(true)
}, [])

if (!mounted) return null
```

for page-level UI.

Avoid choosing the initial layout using:

- `window.innerWidth`
- `screen.width`
- `navigator`
- `localStorage`
- browser timezone
- browser-only authentication state

Use CSS responsive design whenever possible.

---

# 18. Responsive Design Must Be CSS First

Do not use JavaScript to decide common responsive layout.

Bad:

```tsx
const mobile = window.innerWidth < 768
```

Good:

```css
.card-grid {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
```

This prevents hydration mismatch and viewport flicker.

---

# 19. Fonts

Fonts are a common source of visual flicker and CLS.

Required:

- use `next/font/google` or preferably controlled `next/font/local`
- do not use CSS `@import` for Google Fonts
- do not add runtime `fonts.googleapis.com` stylesheets
- apply the primary font at the root layout
- load only actually used weights
- prefer WOFF2
- avoid excessive font families

Example:

```ts
// src/app/fonts.ts

import localFont from 'next/font/local'

export const primaryFont = localFont({
  src: [
    {
      path: '../../public/fonts/Primary-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Primary-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Primary-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Primary-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-primary',
  preload: true,
  display: 'block',
})
```

Root:

```tsx
<html lang="en" className={primaryFont.variable}>
  <body>{children}</body>
</html>
```

### Important trade-off

`display: block` reduces the chance of visibly seeing a fallback font but can briefly hide text on a cold load.

For many public sites, `swap` can produce better perceived loading behavior.

Choose deliberately and verify real-device behavior.

Do not claim that any web-font strategy can guarantee a fallback is never used under every browser/network failure condition.

---

# 20. Font Performance Rules

- Prefer one primary family.
- Use a second family only when branding genuinely requires it.
- Do not preload font weights that are not used above the fold.
- Variable fonts are acceptable when they reduce total transfer cost for the required range.
- Verify that the selected variable font file is smaller than the equivalent set of static fonts.
- Do not include legacy font formats unless required.
- Font files SHOULD be immutable cached static assets.

---

# 21. Images

Use `next/image` for normal content images.

```tsx
import Image from 'next/image'

<Image
  src={article.image.url}
  alt={article.image.alt}
  width={article.image.width}
  height={article.image.height}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

Every image MUST have predictable geometry.

Required:

- width/height OR `fill` with a dimensioned parent
- meaningful `alt` for informative images
- empty `alt=""` for purely decorative images
- `sizes` when responsive
- no enormous desktop asset sent unnecessarily to mobile
- preserve aspect ratio
- lazy-load below-fold images

---

# 22. LCP Images

The most likely LCP image MUST be identified per template.

Examples:

- homepage hero
- article main image
- trek/detail hero
- category lead story

Do NOT mark every image high priority.

Only the actual above-the-fold/LCP candidate should receive eager/high-priority treatment.

When using the currently supported Next.js Image API, prefer its current preload/fetch-priority guidance rather than copying outdated examples from older Next.js versions.

Always validate in production using Lighthouse and field data.

---

# 23. Remote Images From Laravel

Laravel SHOULD return structured image metadata:

```json
{
  "url": "https://cdn.example.com/articles/everest.jpg",
  "alt": "Mount Everest at sunrise",
  "width": 1600,
  "height": 900
}
```

This is better than returning only:

```json
{
  "image": "https://cdn.example.com/articles/everest.jpg"
}
```

Known dimensions allow Next.js to reserve correct space and avoid CLS.

Current migration contract:

- Existing API responses MAY keep `image: string | null` temporarily for
  backwards compatibility.
- New frontend code SHOULD prefer `imageMeta` when present:

```json
{
  "image": "https://cdn.example.com/articles/everest.jpg",
  "imageMeta": {
    "url": "https://cdn.example.com/articles/everest.jpg",
    "alt": "Mount Everest at sunrise",
    "width": 1600,
    "height": 900,
    "caption": "Everest at sunrise.",
    "credit": "Example Photographer"
  }
}
```

- Social metadata SHOULD prefer `meta.ogImageMeta` when present.
- Article body image blocks SHOULD include `width` and `height` alongside
  `src` and `alt` whenever gallery dimensions are known.

---

# 24. Image CDN Strategy

Recommended architecture:

```text
Original image upload
        |
        v
Laravel/media service
        |
        v
Object storage / CDN
        |
        v
Next.js Image Optimization
        |
        v
Browser appropriate size/format
```

Do not store long-term production media inside the Next.js deployment bundle.

Laravel MAY initially use local/public storage, but production architecture SHOULD support migration to:

- Cloudflare R2
- S3-compatible storage
- image CDN
- dedicated asset domain

---

# 25. next.config.ts Image Security

Remote image hosts MUST be explicitly whitelisted.

Example:

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.example.com',
      },
    ],

    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
```

Do NOT use broad insecure remote patterns when a narrow hostname rule is possible.

---

# 26. SEO Architecture

Every indexable page MUST render:

- unique title
- useful meta description
- canonical URL
- crawlable main content
- semantic headings
- crawlable internal links
- correct HTTP status
- Open Graph metadata where relevant
- Twitter/social metadata where relevant
- structured data when appropriate

Use the Next.js Metadata API.

---

# 27. Root Metadata

Example:

```ts
// src/app/layout.tsx

import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL!
  ),

  title: {
    default: 'Site Name',
    template: '%s | Site Name',
  },

  description: 'Default site description',

  robots: {
    index: true,
    follow: true,
  },
}
```

Do not duplicate the brand suffix manually on every page if a title template is used.

---

# 28. Dynamic Metadata

Content detail pages SHOULD use `generateMetadata()`.

```ts
import type { Metadata } from 'next'
import { getArticle } from '@/lib/api/articles'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)

  return {
    title: article.seo_title ?? article.title,

    description:
      article.meta_description ?? article.excerpt,

    alternates: {
      canonical: `/articles/${article.slug}`,
    },

    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt,
      images: article.image
        ? [
            {
              url: article.image.url,
              width: article.image.width,
              height: article.image.height,
              alt: article.image.alt,
            },
          ]
        : [],
    },
  }
}
```

The metadata function SHOULD reuse the same cached data source as the page where possible.

Do not create an unnecessary second uncached Laravel request.

---

# 29. Semantic HTML

Use actual document semantics.

Preferred:

```html
<header>
<nav>
<main>
<article>
<section>
<aside>
<footer>
```

Heading order should be meaningful.

Example article:

```text
H1 Article title

H2 Major section
H3 Sub-section
H3 Sub-section

H2 Next major section
```

Do not choose heading tags only for visual size.

Style them with CSS.

---

# 30. Structured Data / JSON-LD

Add schema only when it accurately represents visible content.

Potential types:

- `Organization`
- `WebSite`
- `BreadcrumbList`
- `Article`
- `NewsArticle`
- `BlogPosting`
- `Person`
- `FAQPage` where eligible and appropriate
- travel-related schema types when they accurately match the entity

Do not generate fake ratings, fabricated reviews, invented offers, or schema content that does not exist visibly on the page.

Example:

```tsx
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  datePublished: article.published_at,
  dateModified: article.updated_at,
  image: article.image?.url,
}

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
  }}
/>
```

Never insert untrusted raw JSON-LD strings without safe serialization.

---

# 31. Canonicals

Every indexable canonical page MUST have one canonical URL.

Canonical URLs SHOULD:

- use the production HTTPS host
- be normalized
- exclude irrelevant tracking parameters
- use the preferred slug
- not point to staging or API domains

Filtered/search pages require an intentional SEO policy rather than blindly self-canonicalizing everything.

---

# 32. robots.txt

Use Next.js metadata routes.

```ts
// src/app/robots.ts

import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/account/',
        '/admin/',
        '/api/',
        '/search/',
      ],
    },

    sitemap: 'https://www.example.com/sitemap.xml',
  }
}
```

Important:

`robots.txt` controls crawling, not secure authorization.

Private content MUST be protected using authentication/authorization regardless of robots rules.

---

# 33. Sitemap

Use dynamic sitemap generation.

The canonical source for sitemap entries is Laravel:

```text
GET /api/ec/sitemap
```

Expected shape:

```json
{
  "urls": [
    {
      "path": "/",
      "lastModified": "2026-09-23T08:00:00.000000Z",
      "changeFrequency": "daily",
      "priority": 1
    },
    {
      "path": "/article-slug",
      "lastModified": "2026-09-23T08:00:00.000000Z",
      "changeFrequency": "weekly",
      "priority": 0.7
    }
  ]
}
```

Next.js MUST convert these paths to production absolute URLs. It MAY keep a
small static fallback for local builds when `EC_API_BASE_URL` is not configured.

```ts
// src/app/sitemap.ts

import type { MetadataRoute } from 'next'

export default async function sitemap():
  Promise<MetadataRoute.Sitemap> {
  // fetch canonical indexable URLs from Laravel

  return [
    {
      url: 'https://www.example.com',
      lastModified: new Date(),
    },
  ]
}
```

For large sites, split sitemaps using `generateSitemaps()`.

Sitemap entries SHOULD contain only:

- canonical pages
- indexable pages
- URLs returning successful responses

Do not include:

- drafts
- internal search results
- user account routes
- duplicate filtered URLs
- redirects
- 404 pages

---

# 34. 404 and Status Codes

Missing Laravel content MUST become a real Next.js 404.

Example:

```tsx
import { notFound } from 'next/navigation'

if (!article) {
  notFound()
}
```

Do not return a visually styled "not found" message with HTTP `200`.

Correct status codes are important for both SEO and caching.

---

# 35. Redirects

Permanent slug changes SHOULD return proper redirects.

Examples:

```text
old slug -> 301/308 -> new canonical slug
http     -> https
www/non-www -> chosen canonical host
```

Do not keep multiple publicly indexable URL variants for the same content.

---

# 36. URL Design

URLs SHOULD be:

- human-readable
- stable
- lowercase
- descriptive
- short enough to understand
- independent from database implementation details when possible

Examples:

```text
/articles/everest-climbing-season
/category/expedition
/destinations/everest
/treks/everest-base-camp
```

Avoid:

```text
/page?id=591&type=article&category=22
```

for canonical public pages.

---

# 37. Authentication Architecture

Prefer secure cookie-based authentication for web sessions when practical.

Recommended:

```text
Browser
   |
 secure HTTP-only cookie
   |
   v
Next.js / Laravel session flow
   |
   v
Laravel authorization
```

Avoid storing long-lived sensitive auth tokens in `localStorage` when a secure HTTP-only cookie architecture is available.

Authentication MUST NOT cause this visual sequence:

```text
Login
  -> hydration
  -> /me request
  -> suddenly show Account
```

For UI that must be correct on first paint, resolve authentication state on the server where possible.

---

# 38. Laravel Sanctum

For a first-party Next.js + Laravel web application, Laravel Sanctum MAY be used where its domain/cookie/CORS requirements fit the deployment topology.

If Sanctum is used:

- configure trusted stateful domains correctly
- use HTTPS
- use secure cookies in production
- configure CSRF correctly
- explicitly configure CORS
- avoid wildcard credential origins
- keep Next.js and Laravel host strategy intentional

Example topology:

```text
www.example.com      Next.js
api.example.com      Laravel
cdn.example.com      media
```

---

# 39. Laravel API Performance

The Laravel API MUST be optimized independently.

Required practices:

- avoid N+1 queries
- eager load required relationships
- select only necessary columns where useful
- paginate large collections
- index query/filter/order columns
- cache expensive shared queries
- use Redis for appropriate hot data
- queue expensive non-blocking work
- keep API Resources intentional
- inspect slow queries
- avoid repeated transformations
- avoid returning unused payload fields

Example:

```php
Article::query()
    ->with([
        'author:id,name,slug',
        'category:id,name,slug',
    ])
    ->select([
        'id',
        'author_id',
        'category_id',
        'title',
        'slug',
        'excerpt',
        'published_at',
    ])
    ->published()
    ->latest('published_at')
    ->paginate(20);
```

---

# 40. Laravel Response Shape

API responses SHOULD be frontend-oriented but domain-safe.

Example:

```json
{
  "data": {
    "id": 812,
    "title": "Everest Expedition",
    "slug": "everest-expedition",
    "excerpt": "...",
    "published_at": "2026-09-23T08:00:00Z",
    "author": {
      "name": "Example Author",
      "slug": "example-author"
    },
    "image": {
      "url": "https://cdn.example.com/...",
      "alt": "Everest expedition",
      "width": 1600,
      "height": 900
    }
  }
}
```

Do not make Next.js reconstruct basic domain presentation data from dozens of unrelated endpoints.

Current public article summary shape SHOULD support both the legacy image field
and the structured image metadata field:

```json
{
  "id": "812",
  "title": "Everest Expedition",
  "slug": "everest-expedition",
  "excerpt": "...",
  "image": "https://cdn.example.com/...",
  "imageMeta": {
    "url": "https://cdn.example.com/...",
    "alt": "Everest expedition",
    "width": 1600,
    "height": 900
  },
  "publishedAtIso": "2026-09-23T08:00:00.000000Z",
  "authors": [
    {
      "name": "Example Author",
      "slug": "example-author"
    }
  ],
  "meta": {
    "metaTitle": "Everest Expedition",
    "metaDescription": "...",
    "canonicalUrl": "https://www.example.com/everest-expedition",
    "ogImage": "https://cdn.example.com/...",
    "ogImageMeta": {
      "url": "https://cdn.example.com/...",
      "alt": "Everest Expedition"
    },
    "keywords": []
  }
}
```

---

# 41. Laravel Caching

Use Laravel-side caching for expensive domain computations where appropriate.

Example:

```php
Cache::remember(
    'homepage:featured',
    now()->addMinutes(10),
    fn () => Article::query()
        ->published()
        ->featured()
        ->latest('published_at')
        ->limit(10)
        ->get()
);
```

Laravel cache and Next.js cache solve different problems.

```text
Laravel cache
    protects DB/business computation

Next.js cache
    protects Laravel + speeds rendered web delivery
```

Both layers may be used intentionally.

Avoid redundant caching without an invalidation strategy.

---

# 42. API Compression and HTTP

Production SHOULD use:

- HTTP/2 or HTTP/3 where supported
- Brotli/gzip compression
- TLS
- keep-alive
- CDN caching for safe public static assets
- appropriate cache-control headers

Do not cache private API responses in shared public caches.

---

# 43. Deployment Geography

The Next.js server runtime and Laravel API SHOULD be geographically close.

Bad:

```text
User
 |
 v
Next.js Singapore
 |
 +----------> Laravel Europe
                |
                v
              MySQL Asia
```

Better:

```text
User
 |
 v
CDN
 |
 v
Next.js Singapore
 |
 v
Laravel Singapore
 |
 v
MySQL Singapore
```

Server-to-server latency directly affects uncached SSR response time.

---

# 44. Avoid Browser -> Laravel for Initial Public Content

For primary page content:

Preferred:

```text
Browser -> Next.js -> Laravel
```

Avoid:

```text
Browser -> Next.js shell
Browser -> Laravel
Browser -> repaint
```

The latter should be reserved for genuinely client-driven interactions.

---

# 45. Third-Party Scripts

Every third-party script can reduce performance.

Examples:

- analytics
- ad networks
- chat widgets
- social embeds
- heatmaps
- tracking pixels

Rules:

- install only necessary scripts
- load after critical content where possible
- use `next/script`
- choose an appropriate loading strategy
- do not block initial rendering
- document business justification for each script
- periodically audit unused tags

Do not sacrifice Core Web Vitals for an unused marketing script.

---

# 46. CSS Architecture

Critical layout MUST not depend on JavaScript.

CSS SHOULD:

- define stable spacing
- define explicit image/container aspect ratios
- define responsive behavior
- avoid layout-changing late-loaded CSS
- avoid enormous global stylesheets
- avoid expensive selector complexity
- keep component styles predictable

Do not animate layout properties unnecessarily.

Prefer transform/opacity for animations.

Respect:

```css
@media (prefers-reduced-motion: reduce) {
  /* reduce non-essential animation */
}
```

---

# 47. Layout Shift Prevention

Before an asset/data block loads, its final approximate geometry SHOULD already be known.

Reserve dimensions for:

- images
- ads
- embeds
- video
- maps
- skeletons
- dynamic banners
- cookie notices when possible
- async widgets

Avoid injecting content above already-rendered content unexpectedly.

---

# 48. No-White-Flash Requirements

To minimize hard-refresh visual flashing:

- root background color MUST match the actual application background
- root layout MUST be server rendered
- primary CSS MUST load as part of the normal Next.js build
- fonts MUST be handled through `next/font`
- critical shell MUST not wait for client JavaScript
- theme MUST be known before first paint when possible
- avoid client-only mount gates
- avoid late injection of primary layout
- avoid full-screen route spinners
- avoid large client-side data fetches for first paint

---

# 49. Theme Flicker

If dark/light mode exists, initial theme SHOULD be determined before hydration.

Do not rely only on:

```ts
useEffect(() => {
  const theme = localStorage.getItem('theme')
})
```

That produces:

```text
light render
 -> hydrate
 -> dark render
```

Use server-readable state/cookie or a carefully designed pre-paint strategy.

---

# 50. Error Handling

Use Next.js route boundaries:

```text
error.tsx
not-found.tsx
loading.tsx
global-error.tsx
```

But avoid making `loading.tsx` an unnecessary full-page replacement when cached/static shell rendering can avoid it.

Laravel API failures SHOULD be classified:

```text
404  -> notFound()
401  -> authentication flow
403  -> permission response
422  -> validation
429  -> throttling/retry UI where appropriate
5xx  -> error boundary / graceful degradation
```

Never silently convert every API failure into an empty list.

---

# 51. Accessibility

Performance and SEO do not replace accessibility.

Required baseline:

- keyboard-accessible navigation
- visible focus styles
- correct labels
- semantic landmarks
- accessible form errors
- sufficient contrast
- meaningful alt text
- reduced-motion support
- buttons for actions
- links for navigation
- correct heading hierarchy
- no essential hover-only interaction

---

# 52. JavaScript Budget

Treat client JavaScript as a limited resource.

Goals:

- Server Components by default
- minimal global providers
- no giant UI library for a few components
- dynamic import heavy optional features
- avoid duplicate libraries
- no browser data library for content already available on the server
- tree-shake compatible imports
- inspect production bundles regularly

A page with no interactive behavior SHOULD require very little page-specific client JavaScript.

---

# 53. Dynamic Imports

Large client-only features SHOULD be loaded on demand.

Candidates:

- maps
- charting
- rich text editors
- large galleries
- video players
- admin-only tools
- advanced search UI

Do not dynamically import tiny components just for the sake of dynamic imports.

---

# 54. Prefetch Strategy

Use Next.js route prefetching intentionally.

Primary navigation:

```tsx
<Link href="/expedition">
  Expedition
</Link>
```

Do not manually prefetch hundreds of routes on page load.

Avoid aggressive custom prefetching unless profiling proves a benefit.

---

# 55. Search Pages

Internal search results generally SHOULD NOT become uncontrolled indexable URL combinations.

Typical approach:

```text
/search?q=everest     noindex,follow
```

Public curated landing pages SHOULD be separate canonical routes when SEO value exists.

Example:

```text
/treks/everest
/destinations/nepal
/category/expedition
```

instead of expecting `/search?q=...` to serve as the SEO landing architecture.

---

# 56. Pagination

Pagination MUST be crawlable and stable.

Use real URLs:

```text
/category/expedition?page=2
```

Do not make important archived content accessible only through infinite-scroll JavaScript.

Infinite scroll may exist as progressive enhancement while paginated URLs remain discoverable.

---

# 57. Core Web Vitals Targets

Engineering targets:

| Metric | Target |
|---|---:|
| LCP | <= 2.5 s, aim <= 1.8 s |
| INP | <= 200 ms, aim <= 100 ms |
| CLS | <= 0.10, aim near 0 |
| TTFB | keep as low as practical |
| Lighthouse Performance | aim 95-100 |
| Lighthouse Accessibility | aim 100 |
| Lighthouse Best Practices | aim 100 |
| Lighthouse SEO | aim 100 |

Measure both:

- lab data
- field/real-user data

A high Lighthouse score alone is not proof of good real-world UX.

---

# 58. Performance Budgets

Suggested initial budgets per public route:

```text
Initial client JS:
  keep as small as practical;
  investigate routes exceeding ~150 KB compressed

Hero/LCP image:
  ideally <= 150-250 KB where visual quality permits

Fonts:
  only required family/weights/subsets

Third-party JS:
  zero by default; every addition justified

CLS:
  target 0

Long tasks:
  minimize on initial interaction
```

These are engineering guardrails, not universal hard limits.

---

# 59. `next.config.ts` Baseline

Example baseline:

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,

  poweredByHeader: false,

  compress: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.example.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  cacheLife: {
    navigation: {
      stale: 3600,
      revalidate: 1800,
      expire: 86400,
    },

    content: {
      stale: 300,
      revalidate: 300,
      expire: 86400,
    },

    listing: {
      stale: 60,
      revalidate: 60,
      expire: 3600,
    },
  },
}

export default nextConfig
```

Do not blindly add experimental flags copied from old tutorials.

Verify configuration against the installed Next.js version before applying changes.

---

# 60. Recommended Environment Variables

```env
# public
NEXT_PUBLIC_SITE_URL=https://www.example.com

# server-only
EC_API_BASE_URL=https://api.example.com
EC_API_TIMEOUT_MS=8000
REVALIDATE_SECRET=change-me
```

Never prefix secrets with `NEXT_PUBLIC_`.

Laravel backend:

```env
NEXT_REVALIDATE_URL=https://www.example.com/api/revalidate
NEXT_REVALIDATE_SECRET=change-me
NEXT_REVALIDATE_TIMEOUT=5
```

`NEXT_REVALIDATE_SECRET` and `REVALIDATE_SECRET` MUST have the same value for a
given environment.

Local verification note:

- `next build --webpack` is an acceptable production verification command for
  this project when Turbopack encounters an environment-specific PostCSS worker
  failure.
- Do not treat a local Turbopack process/bind failure as a Lighthouse or runtime
  performance regression without reproducing it outside the sandboxed
  environment.

---

# 61. Environment Separation

Use separate configuration for:

```text
local
development
staging
production
```

Staging SHOULD be `noindex`.

Never allow preview/staging pages to accidentally become canonical production URLs.

---

# 62. Security Headers

Add appropriate headers at CDN/proxy/application level.

Consider:

- Content-Security-Policy
- Strict-Transport-Security
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy
- frame restrictions where appropriate

Do not add an overly restrictive CSP without testing Next.js assets, images, scripts, analytics, and required third-party services.

---

# 63. Laravel API Security

Laravel API MUST enforce:

- authentication where required
- authorization policies
- request validation
- throttling/rate limiting
- CORS allowlists
- CSRF protection for cookie/session flows
- secure cookies
- HTTPS
- mass-assignment protection
- output shaping
- no debug mode in production

The frontend MUST never be treated as a security boundary.

---

# 64. Database Rules

Indexes SHOULD exist for commonly queried fields such as:

- slug
- published status
- published date
- foreign keys
- category IDs
- author IDs
- sort columns
- visibility fields

Use composite indexes where query patterns justify them.

Measure queries before adding excessive indexes.

---

# 65. Observability

Monitor:

### Next.js

- route response time
- cache hit/miss behavior where measurable
- server errors
- build warnings
- bundle size
- Web Vitals
- image optimization failures

### Laravel

- API latency
- DB query latency
- slow queries
- error rates
- queue failures
- Redis health
- cache hit ratio
- external API latency

### Browser

- LCP
- INP
- CLS
- JS errors
- failed assets
- failed API requests

---

# 66. Testing Requirements

Before release:

### SEO

- page source contains primary content
- unique title
- description
- canonical
- robots
- sitemap
- correct status code
- JSON-LD validates when used
- internal links have real `href`
- staging is noindex

### Performance

- production build tested
- Lighthouse mobile
- Lighthouse desktop
- Chrome Performance trace when needed
- Slow 4G simulation
- CPU throttling test
- hard refresh
- client navigation
- back/forward navigation
- cold font cache
- warm font cache
- image loading test

### UX stability

- no white flash
- no font jump
- no header jump
- no image layout jump
- no auth state flash
- no theme flash
- no whole-page spinner during normal navigation

---

# 67. Browser Test Matrix

At minimum test current versions of:

- Chrome desktop
- Chrome Android
- Safari macOS
- Safari iOS
- Firefox desktop
- Edge desktop

Performance should not be optimized only for the developer's desktop Chrome environment.

---

# 68. Performance CI Gate

Where practical, CI SHOULD reject meaningful regressions.

Example thresholds:

```text
Lighthouse Performance < 90       warn/fail
Accessibility < 95                fail
SEO < 95                          fail
Best Practices < 95               fail
unexpected client bundle growth   fail/warn
```

Once the project is stable, thresholds can be tightened.

Do not use CI Lighthouse as the only performance measurement.

---

# 69. Production Build Is the Source of Truth

Never judge Next.js performance from `next dev`.

Use:

```bash
npm run build
npm run start
```

or the actual production deployment.

Development mode intentionally has behavior and overhead that production does not.

---

# 70. Recommended Page Pattern

```tsx
// app/articles/[slug]/page.tsx

import { notFound } from 'next/navigation'
import { getArticle } from '@/lib/api/articles'

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const article = await getArticle(slug)

  if (!article) {
    notFound()
  }

  return (
    <article>
      <header>
        <h1>{article.title}</h1>
      </header>

      {/* server-rendered body */}
    </article>
  )
}
```

The initial page should already contain the meaningful article HTML before client hydration.

---

# 71. What Must NOT Be Done

The following are architectural anti-patterns unless a documented exception exists.

### Do not

```text
[x] fetch primary SEO content in useEffect()
[x] make every page 'use client'
[x] show a full-screen spinner on route transitions
[x] use raw <a> for normal internal navigation
[x] load Google Fonts with CSS @import
[x] use giant images without responsive sizing
[x] omit image dimensions
[x] preload every image
[x] preload every font
[x] store sensitive tokens in localStorage by default
[x] expose Laravel secrets with NEXT_PUBLIC_*
[x] render different major layouts before/after hydration
[x] use JS media-query logic for normal responsive layout
[x] cache private user data in shared public caches
[x] return HTTP 200 for missing content
[x] index internal search/filter combinations blindly
[x] use one cache TTL for every content type
[x] re-fetch unchanged public data from Laravel on every request
[x] duplicate Laravel business logic inside Next.js
[x] add third-party scripts without measuring their cost
[x] depend on staging/API domains for canonical URLs
```

---

# 72. Smoothness Standard

A successful public route should behave approximately like:

### First cold visit

```text
request
  |
  v
CDN / Next.js
  |
  +--> static shell / cached content
  |
  +--> Laravel only when necessary
  |
  v
meaningful HTML
  |
  v
stable first paint
  |
  +--> hydration only for interactive islands
  |
  +--> secondary streamed content
```

### Internal navigation

```text
<Link>
  |
  v
prefetched Next.js route
  |
  v
persistent layout remains
  |
  v
new content rendered
```

### Hard refresh

```text
existing page
  |
  v
refresh
  |
  v
server-rendered shell/content
  |
  v
same dimensions/fonts/background
  |
  v
hydration
```

The user should not experience:

```text
white
 -> spinner
 -> fallback font
 -> header jumps
 -> image pushes content
 -> API content appears
 -> layout changes again
```

---

# 73. SEO + Performance Rendering Matrix

| Page/Data Type | Rendering | Cache | Client Fetch |
|---|---|---|---|
| Homepage | Server + cached | Yes | No |
| Public article | Server + cached | Yes | No |
| Category | Server + cached | Yes | No |
| Author page | Server + cached | Yes | No |
| Navigation | Server + long cache | Yes | No |
| Footer | Server + long cache | Yes | No |
| Search results | Server/dynamic | Short/none | Optional |
| Logged-in account | Dynamic server | Private only | Optional |
| Notifications | Dynamic | No/shared cache forbidden | Yes/stream |
| Bookmark action | Server rendered state + client action | user-specific | Yes |
| Form submission | Server/client interaction | No | Yes |
| Admin/editor | Dynamic application | domain-specific | Yes |

---

# 74. Laravel + Next.js Content Publication Flow

```text
                    ADMIN / CMS
                         |
                         v
                  Laravel validates
                         |
                         v
                    DB transaction
                         |
                         v
                  Article published
                         |
                         v
               after-commit event/job
                         |
                         v
          protected Next.js revalidation API
                         |
          +--------------+--------------+
          |              |              |
          v              v              v
       article        category       homepage
        tag             tag            tag
          \              |              /
           +-------------+-------------+
                         |
                         v
              cached content marked stale
                         |
                         v
              next visit gets fast content
              while refresh occurs as designed
```

This is preferred to waiting for a tiny TTL everywhere.

---

# 75. Recommended Project Structure

```text
src/
├── app/
│   ├── (site)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── articles/
│   │   ├── categories/
│   │   ├── authors/
│   │   └── destinations/
│   │
│   ├── account/
│   ├── api/
│   │   └── revalidate/
│   │       └── route.ts
│   │
│   ├── error.tsx
│   ├── global-error.tsx
│   ├── not-found.tsx
│   ├── robots.ts
│   ├── sitemap.ts
│   └── layout.tsx
│
├── components/
│   ├── layout/
│   ├── content/
│   ├── media/
│   ├── forms/
│   └── ui/
│
├── features/
│   ├── articles/
│   ├── auth/
│   ├── search/
│   └── newsletter/
│
├── lib/
│   ├── api/
│   ├── seo/
│   ├── cache/
│   ├── auth/
│   └── utils/
│
├── types/
│   ├── api.ts
│   ├── article.ts
│   └── media.ts
│
└── styles/
```

Do not force this exact structure if the existing project already has a consistent equivalent. Migrate incrementally rather than causing unnecessary churn.

---

# 76. Migration Plan for an Existing Project

Do not rewrite the entire existing application at once.

## Phase 1 — Audit

Inventory:

- all routes
- all `'use client'` files
- every `useEffect(fetch...)`
- direct Laravel API calls
- font loading
- image rendering
- metadata implementation
- loading screens
- layout boundaries
- third-party scripts
- authentication flow
- caching behavior
- production Lighthouse metrics

## Phase 2 — Fix rendering

Prioritize:

1. homepage
2. high-traffic landing pages
3. article/detail pages
4. category/listing pages
5. shared layout
6. navigation
7. search
8. authenticated areas

Move primary page fetches to Server Components.

## Phase 3 — Cache

Add:

- Cache Components
- `use cache`
- `cacheLife`
- `cacheTag`
- protected revalidation endpoint
- Laravel publish/update invalidation

## Phase 4 — Visual stability

Fix:

- fonts
- image dimensions
- hero/LCP asset
- theme flash
- auth flash
- skeleton dimensions
- header movement
- late CSS
- layout shift

## Phase 5 — SEO

Implement:

- metadata
- canonical
- robots
- sitemap
- structured data
- proper 404s
- redirects
- semantic headings
- crawlable links

## Phase 6 — Laravel

Profile:

- endpoint response time
- N+1 queries
- indexes
- payload size
- Resources
- cache
- Redis
- queue jobs

## Phase 7 — Measurement

Run production:

```bash
npm run build
npm run start
```

Measure and repeat until the remaining bottlenecks are identified by evidence rather than assumptions.

---

# 77. Definition of Done for Every Public Page

A public route is NOT complete until all applicable items pass.

## Rendering

- [ ] primary content renders on server
- [ ] no primary content depends on `useEffect`
- [ ] Client Components minimized
- [ ] correct Suspense boundaries
- [ ] correct cache policy

## SEO

- [ ] unique title
- [ ] meta description
- [ ] canonical URL
- [ ] correct robots directive
- [ ] semantic H1
- [ ] crawlable internal links
- [ ] correct 200/404/redirect status
- [ ] Open Graph metadata
- [ ] structured data where appropriate
- [ ] included/excluded correctly in sitemap

## Performance

- [ ] no avoidable layout shift
- [ ] LCP image optimized
- [ ] below-fold images lazy
- [ ] responsive image `sizes`
- [ ] font strategy verified
- [ ] no unnecessary third-party blocking script
- [ ] client bundle inspected
- [ ] production Lighthouse checked

## Smoothness

- [ ] no white flash caused by app code
- [ ] no visible font swap/jump
- [ ] no header jump
- [ ] no theme flash
- [ ] no auth flash where avoidable
- [ ] no full-page route spinner
- [ ] internal `<Link>` navigation
- [ ] refresh maintains stable page geometry

## Laravel

- [ ] no obvious N+1
- [ ] response payload intentional
- [ ] relevant DB indexes exist
- [ ] cache where justified
- [ ] content mutation triggers frontend invalidation

---

# 78. Architectural Decision Summary

The frontend standard is:

```text
NEXT.JS APP ROUTER
        |
        +--> SERVER COMPONENTS BY DEFAULT
        |
        +--> CACHE COMPONENTS FOR PUBLIC CONTENT
        |       |
        |       +--> use cache
        |       +--> cacheLife
        |       +--> cacheTag
        |       +--> revalidateTag
        |
        +--> SUSPENSE FOR TRUE DYNAMIC SUBTREES
        |
        +--> CLIENT COMPONENTS ONLY FOR INTERACTION
        |
        +--> NEXT/FONT
        |
        +--> NEXT/IMAGE
        |
        +--> NEXT/LINK
        |
        +--> METADATA API
        |
        +--> ROBOTS + SITEMAP + JSON-LD
        |
        v
LARAVEL API
        |
        +--> AUTHORIZATION
        +--> VALIDATION
        +--> BUSINESS LOGIC
        +--> API RESOURCES
        +--> REDIS CACHE
        +--> QUEUES
        +--> MYSQL
        |
        +--> PUBLISH/UPDATE EVENT
                 |
                 v
         NEXT.JS CACHE INVALIDATION
```

---

# 79. Priority Order

When there is a conflict between techniques, optimize in this order:

1. **Correctness**
2. **Security**
3. **SEO/indexability**
4. **Accessibility**
5. **Stable first render**
6. **Core Web Vitals**
7. **Minimal client JavaScript**
8. **Cache efficiency**
9. **Developer convenience**

Do not sacrifice correctness, security, or accessibility just to obtain a synthetic Lighthouse number.

---

# 80. Final Standard

The application should behave as a server-rendered, SEO-first website with SPA-quality navigation rather than as a client-rendered SPA.

The guiding rule is:

> **Render meaningful content before the browser needs JavaScript, cache all safely shareable content, hydrate only interactive islands, preserve layout geometry, and invalidate caches when Laravel changes the source data.**

The expected result is:

```text
SEO-friendly HTML
+
fast cached delivery
+
minimal JavaScript
+
stable fonts
+
stable images
+
persistent layouts
+
prefetched navigation
+
event-driven revalidation
+
optimized Laravel queries
=
smooth production experience
```

---

# 81. Official Reference Basis

This architecture intentionally follows current Next.js 16 concepts and should be rechecked when upgrading major framework versions.

- Next.js documentation: https://nextjs.org/docs
- Cache Components: https://nextjs.org/docs/app/getting-started/partial-prerendering
- `use cache`: https://nextjs.org/docs/app/api-reference/directives/use-cache
- `cacheLife`: https://nextjs.org/docs/app/api-reference/functions/cacheLife
- `revalidateTag`: https://nextjs.org/docs/app/api-reference/functions/revalidateTag
- Metadata: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- Laravel documentation: https://laravel.com/docs
- Google Search documentation: https://developers.google.com/search/docs
- Web Vitals: https://web.dev/vitals/
