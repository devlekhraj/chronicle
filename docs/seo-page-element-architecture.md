# SEO Page Element Architecture

> Project: Everest Chronicle  
> Frontend: Next.js 16 / React  
> Backend: Laravel API  
> Purpose: Define one project-wide semantic HTML, metadata, crawlability, structured data, internal-linking, and page-template standard for all public pages.
>
> This document is based on Google Search Central guidance current as of September 2026. It is an implementation standard for this project, not a guarantee of rankings.

---

## 1. Core Principles

Every public page must be built for:

1. **Clear page purpose**
2. **Valid semantic HTML**
3. **One primary page topic**
4. **Crawlable content and links**
5. **Correct canonical URL**
6. **Unique, useful metadata**
7. **Logical heading hierarchy**
8. **Accessible image markup**
9. **Appropriate structured data**
10. **Fast server-rendered or statically rendered initial HTML**
11. **Consistent URL architecture**
12. **No accidental indexing of utility/duplicate pages**

SEO must be implemented at the **page-template level**, not manually on individual pages wherever avoidable.

---

# 2. Global HTML Document Architecture

Use this semantic structure on every public page.

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- metadata -->
  </head>

  <body>
    <header>
      <!-- branding + primary navigation -->
    </header>

    <main>
      <!-- unique page content -->
    </main>

    <footer>
      <!-- site footer -->
    </footer>
  </body>
</html>
```

Rules:

- Exactly one `<main>` element per page.
- Global header must use `<header>`.
- Primary navigation must use `<nav>`.
- Footer must use `<footer>`.
- Do not use `<div>` when a meaningful semantic element exists.
- Do not use heading tags for styling.
- Do not use clickable `<div>` or `<span>` elements where a real link or button is required.

---

# 3. Navigation Architecture

## Correct structure

```html
<header>
  <a href="/" aria-label="Everest Chronicle home">
    <img
      src="/logo.svg"
      alt="Everest Chronicle"
      width="..."
      height="..."
    />
  </a>

  <nav aria-label="Primary navigation">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/category/expedition">Expedition</a></li>
      <li><a href="/category/mountain">Mountain</a></li>
      <li><a href="/category/environment">Environment</a></li>
      <li><a href="/category/conservation">Conservation</a></li>
      <li><a href="/category/legends">Legends</a></li>
      <li><a href="/category/travel">Travel</a></li>
    </ul>
  </nav>
</header>
```

## Navigation tag rules

| UI element | Required semantic element |
|---|---|
| Main navigation wrapper | `<nav>` |
| Navigation collection | `<ul>` |
| Navigation item | `<li>` |
| Navigation destination | `<a>` / Next.js `<Link>` |
| Dropdown trigger that does not navigate | `<button>` |
| Logo linking to home | `<a>` / `<Link>` |
| Mobile menu toggle | `<button>` |

### Never use

```html
<h2>Conservation</h2>
<h3>Expedition</h3>
<div onclick="...">Travel</div>
<span onclick="...">Mountain</span>
```

for navigation items.

Navigation elements must **not inflate H1/H2/H3 counts**.

---

# 4. Heading Architecture

Heading levels describe the information hierarchy.

They are **not font-size controls**.

## Standard hierarchy

```text
H1  Page's primary topic
└── H2  Major page section
    └── H3  Item/subsection inside H2
        └── H4  Deeper subsection if genuinely necessary
```

## Project standard

### H1

Use **one primary H1 per page template**.

Examples:

```html
<h1>Conservation</h1>
```

```html
<h1>Everest Expeditions Face a Changing Climate</h1>
```

```html
<h1>Stories by Mingma Sherpa</h1>
```

Do not use H1 for:

- logo
- navigation items
- sidebar widget titles
- footer sections
- article cards
- advertisements
- newsletter blocks
- buttons

### H2

Use H2 for major sections of the current page.

Example:

```html
<h1>Conservation</h1>

<section>
  <h2>Latest Conservation Stories</h2>
</section>

<section>
  <h2>Climate & Environment</h2>
</section>

<section>
  <h2>Most Read</h2>
</section>
```

### H3

Use H3 for content nested within an H2 section.

```html
<section>
  <h2>Latest Conservation Stories</h2>

  <article>
    <h3>
      <a href="/...">Snow Leopard Conservation Expands in Nepal</a>
    </h3>
  </article>
</section>
```

### H4-H6

Use only when a real nested structure requires them.

Do not force all heading levels to appear.

---

# 5. Article Card Semantics

Every standalone news card should generally use `<article>`.

```html
<article>
  <a href="/article/example-slug">
    <img
      src="..."
      alt="..."
      width="..."
      height="..."
    />
  </a>

  <p>
    <a href="/category/conservation">Conservation</a>
  </p>

  <h3>
    <a href="/article/example-slug">
      Snow Leopard Conservation Expands in Nepal
    </a>
  </h3>

  <p>Short summary...</p>

  <time datetime="2026-09-25">September 25, 2026</time>
</article>
```

Heading level of a card depends on its parent section.

Example:

```text
H1 Conservation
  H2 Latest Stories
    H3 Article title
    H3 Article title

  H2 Most Read
    H3 Article title
```

Do **not** automatically make every article card H2.

---

# 6. Links

Google must be able to discover important pages through crawlable links.

Use real anchors:

```html
<a href="/category/conservation">Conservation</a>
```

In Next.js:

```tsx
<Link href="/category/conservation">Conservation</Link>
```

Avoid JavaScript-only navigation when a destination is a real URL.

Bad:

```tsx
<div onClick={() => router.push('/category/conservation')}>
  Conservation
</div>
```

Use descriptive anchor text.

Good:

```html
<a href="/category/conservation">Conservation</a>
```

Less useful:

```html
<a href="/category/conservation">Click here</a>
```

### Internal-link rules

- Every important article must be reachable through internal links.
- Category pages must link to their articles.
- Article pages should link to relevant categories/topics/authors where useful.
- Breadcrumbs should use links for ancestors.
- Avoid hundreds of repetitive, low-value links.
- Do not create hidden links for SEO.

---

# 7. Buttons vs Links

Use:

- `<a>` / `<Link>` when the action changes URL or opens another page.
- `<button>` when the action changes UI/application state.

Examples:

```html
<a href="/search?q=everest">View search results</a>
```

```html
<button type="button">Open search</button>
```

Do not create fake links using buttons.

---

# 8. Canonical URL Architecture

Every indexable page must resolve to its preferred production URL.

## Required pattern

Home:

```html
<link rel="canonical" href="https://everestchronicle.com/" />
```

Category:

```html
<link
  rel="canonical"
  href="https://everestchronicle.com/category/conservation"
/>
```

Article:

```html
<link
  rel="canonical"
  href="https://everestchronicle.com/article/example-slug"
/>
```

Author:

```html
<link
  rel="canonical"
  href="https://everestchronicle.com/author/mingma-sherpa"
/>
```

## Critical rules

- Do not canonicalize all pages to the homepage.
- Do not emit localhost URLs in production metadata.
- Use HTTPS production URLs.
- The canonical must match the preferred public URL.
- Canonical URLs should also be used consistently in internal links and XML sitemaps.
- Do not create conflicting canonical signals.
- Query/filter/sort variants need deliberate canonical/indexing rules.
- Do not change canonical URLs only after client-side rendering if avoidable.

### Next.js rule

Canonical metadata should be present in the server-generated HTML.

Use a production metadata base.

```tsx
export const metadata = {
  metadataBase: new URL('https://everestchronicle.com'),
};
```

For a dynamic page, generate its canonical from its real slug.

---

# 9. Robots Directives

Indexable public pages:

```html
<meta name="robots" content="index, follow" />
```

However, `index, follow` is effectively the normal default and does not need to be repeated merely for SEO scoring.

`X-Robots-Tag` is **not required** for normal HTML pages when appropriate meta robots directives are already used.

Use `noindex` intentionally for pages that should not appear in Search.

Possible examples:

- internal search results
- account/login pages
- private pages
- temporary preview pages
- duplicate utility pages
- staging environments

Example:

```html
<meta name="robots" content="noindex, follow" />
```

Never block a URL in `robots.txt` if Google must crawl it to see a `noindex` directive.

---

# 10. robots.txt

Production should expose:

```text
https://everestchronicle.com/robots.txt
```

Example baseline:

```txt
User-agent: *
Allow: /

Sitemap: https://everestchronicle.com/sitemap.xml
```

Add `Disallow` rules only for paths that should not be crawled.

Do not use `robots.txt` as a substitute for canonicalization or `noindex`.

---

# 11. Page Title

Every indexable page must have a descriptive `<title>`.

Examples:

```text
Conservation News & Stories | Everest Chronicle
```

```text
Everest Expedition News | Everest Chronicle
```

```text
Article Headline | Everest Chronicle
```

Rules:

- Make the title specific to the page.
- Avoid duplicate titles.
- Avoid keyword stuffing.
- Keep titles concise and human-readable.
- The title should accurately describe the page.
- Brand suffix may be used consistently.
- Do not repeat the same keyword several times.
- `<title>` is not the same as H1, although they should be semantically aligned.

---

# 12. Meta Description

Each important indexable template should generate a useful description.

Example:

```html
<meta
  name="description"
  content="Latest conservation reporting from Nepal and the Himalayas, including wildlife, climate, protected areas and environmental policy."
/>
```

Rules:

- Summarize the actual page.
- Prefer unique descriptions.
- Avoid keyword lists.
- Do not copy one description to every page.
- A missing or poor description is not fixed by stuffing keywords; Google may generate a snippet from page content.

---

# 13. Meta Keywords

Do not treat:

```html
<meta name="keywords" content="...">
```

as an SEO ranking requirement.

Everest Chronicle should not spend development effort managing meta-keyword lists.

Use relevant terminology naturally in:

- title
- H1
- page copy
- headings
- internal links
- image alt text where appropriate
- structured data
- article content

---

# 14. Language

Use:

```html
<html lang="en">
```

for English pages.

If multilingual versions are introduced later:

- assign the correct `lang`;
- create distinct URLs;
- implement valid `hreflang`;
- keep canonical and hreflang signals logically consistent.

---

# 15. Breadcrumb Architecture

Visual breadcrumb:

```html
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/category/conservation">Conservation</a></li>
    <li aria-current="page">Article Title</li>
  </ol>
</nav>
```

Breadcrumbs are navigation, therefore use `<nav>`, not heading tags.

Also emit matching `BreadcrumbList` JSON-LD where appropriate.

Example:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://everestchronicle.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Conservation",
      "item": "https://everestchronicle.com/category/conservation"
    }
  ]
}
```

Breadcrumb markup must represent a meaningful user path.

---

# 16. Image Architecture

Use semantic `<img>` output, including when Next.js `<Image>` generates it.

```tsx
<Image
  src={article.image}
  alt={article.imageAlt}
  width={1200}
  height={675}
/>
```

## Alt text

Alt text should describe the meaningful content/function of the image.

Good:

```html
alt="Climbers crossing the Khumbu Icefall on Mount Everest"
```

Bad:

```html
alt="image"
```

Bad keyword stuffing:

```html
alt="Everest Nepal Everest climbing Himalaya mountain Nepal news"
```

Decorative images should normally have:

```html
alt=""
```

## Image rules

- Supply explicit width and height or a stable aspect ratio.
- Avoid layout shift.
- Use responsive sizes.
- Prefer modern optimized delivery such as AVIF/WebP where supported.
- Ensure important images are crawlable.
- Do not block image URLs required for Search.
- Keep image URLs stable.
- Use descriptive source media.
- For article structured data, use representative article images.
- For important article imagery, provide sufficiently high-resolution assets.
- Keep Open Graph image and structured-data image aligned with the preferred representative image when appropriate.

For news articles, maintain high-quality versions suitable for:

- `16:9`
- `4:3`
- `1:1`

Google's Article documentation recommends multiple high-resolution representative image aspect ratios and states the images must be crawlable/indexable and relevant to the article.

---

# 17. Figure and Caption

When a visible caption belongs to an image:

```html
<figure>
  <img
    src="..."
    alt="Aerial view of Sagarmatha National Park"
  />

  <figcaption>
    Sagarmatha National Park seen from the south.
    Photo: Everest Chronicle
  </figcaption>
</figure>
```

Use `figcaption` for visible captions.

Do not put long captions into `alt`.

---

# 18. News Article Page Architecture

Recommended structure:

```text
main
│
├── breadcrumb nav
│
├── article
│   ├── category/topic links
│   ├── H1 article headline
│   ├── standfirst / summary
│   ├── author/byline
│   ├── published time
│   ├── modified time when meaningful
│   ├── hero figure
│   ├── article body
│   │   ├── paragraphs
│   │   ├── H2
│   │   ├── paragraphs
│   │   ├── H2
│   │   │   ├── H3 if necessary
│   │   │   └── H3 if necessary
│   │   └── ...
│   └── related metadata/topics
│
└── related stories section
    ├── H2
    └── article cards using H3
```

Example:

```html
<main>
  <nav aria-label="Breadcrumb">...</nav>

  <article>
    <header>
      <p><a href="/category/conservation">Conservation</a></p>

      <h1>Everest Glaciers Show Accelerating Change</h1>

      <p>Introductory standfirst...</p>

      <p>
        By <a href="/author/example">Author Name</a>
      </p>

      <time datetime="2026-09-25T09:30:00+05:45">
        September 25, 2026
      </time>
    </header>

    <figure>...</figure>

    <p>...</p>

    <h2>What researchers observed</h2>

    <p>...</p>

    <h2>What changes may mean for the Himalayas</h2>

    <p>...</p>
  </article>

  <section>
    <h2>Related Stories</h2>
    ...
  </section>
</main>
```

---

# 19. NewsArticle Structured Data

Article pages should generate JSON-LD representing the visible article.

Recommended type:

```json
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "Article Headline",
  "description": "Article description",
  "image": [
    "https://everestchronicle.com/path/image-1x1.jpg",
    "https://everestchronicle.com/path/image-4x3.jpg",
    "https://everestchronicle.com/path/image-16x9.jpg"
  ],
  "datePublished": "2026-09-25T09:30:00+05:45",
  "dateModified": "2026-09-25T10:15:00+05:45",
  "author": [
    {
      "@type": "Person",
      "name": "Author Name",
      "url": "https://everestchronicle.com/author/author-slug"
    }
  ],
  "publisher": {
    "@type": "Organization",
    "name": "Everest Chronicle",
    "url": "https://everestchronicle.com/"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://everestchronicle.com/article/article-slug"
  }
}
```

Rules:

- Structured data must describe content visible on the page.
- Do not create fake authors, ratings, dates, or entities.
- `headline` should match the article.
- `datePublished` must represent the actual publication time.
- `dateModified` should change only for meaningful article updates.
- Author URLs should resolve to useful author/profile pages when available.
- Images must be representative and crawlable.
- Validate with Google's Rich Results Test.

---

# 20. Publisher / Organization Structured Data

The site should expose consistent organization identity.

Example concept:

```json
{
  "@context": "https://schema.org",
  "@type": "NewsMediaOrganization",
  "name": "Everest Chronicle",
  "url": "https://everestchronicle.com/",
  "logo": {
    "@type": "ImageObject",
    "url": "https://everestchronicle.com/logo.png"
  }
}
```

Use one consistent:

- organization name
- production URL
- logo identity

Do not emit contradictory publisher objects across pages.

---

# 21. Homepage Architecture

Recommended:

```text
H1 Everest Chronicle / meaningful publication proposition
│
├── H2 Latest Stories
│   └── H3 article titles
│
├── H2 Expedition
│   └── H3 article titles
│
├── H2 Mountain
│   └── H3 article titles
│
├── H2 Environment
│   └── H3 article titles
│
├── H2 Conservation
│   └── H3 article titles
│
└── H2 Most Read
    └── H3 article titles
```

Do not make each section title an H1.

Do not make the navigation labels headings.

---

# 22. Category Page Architecture

Example URL:

```text
/category/conservation
```

Metadata:

```text
Title: Conservation News & Stories | Everest Chronicle
Canonical: https://everestchronicle.com/category/conservation
Robots: index, follow
```

Body:

```text
Breadcrumb
H1 Conservation
Short useful category introduction

H2 Latest Conservation Stories
  H3 Article title
  H3 Article title
  H3 Article title

H2 Most Read in Conservation
  H3 Article title
  H3 Article title
```

One useful category intro is preferable to a block of keyword-stuffed SEO copy.

Category articles should have crawlable links.

---

# 23. Topic / Tag Page Architecture

Do not automatically index thousands of thin tag pages.

A tag/topic page should be indexable only when it has genuine editorial/search value.

Indexable topic page:

```text
/topic/climate-change
```

should have:

- unique title
- H1
- useful collection of relevant articles
- enough distinct content/value
- self-canonical
- internal links

Thin/empty/near-duplicate tag pages should not become indexable search clutter.

---

# 24. Author Page Architecture

Recommended indexable author page:

```text
/author/author-slug
```

Structure:

```text
Breadcrumb

H1 Author Name

Author image
Role / credentials / bio
Relevant profile links when appropriate

H2 Latest Stories by Author Name
  H3 Article
  H3 Article
  ...
```

Use a real author page if article structured data references the author URL.

Do not manufacture expertise claims.

---

# 25. Search Results Pages

Typical internal search result URLs:

```text
/search?q=everest
```

Project default:

```html
<meta name="robots" content="noindex, follow">
```

Internal search pages generally should not become a large set of indexable URLs.

Search result items still need crawlable article links.

Do not include internal search result URLs in the XML sitemap.

---

# 26. Pagination

Examples:

```text
/category/conservation
/category/conservation/page/2
/category/conservation/page/3
```

Rules:

- Each page must be crawlable by normal links.
- Do not rely only on client-side infinite scroll.
- If infinite scrolling is used, provide paginated URLs Google can reach.
- Do not canonicalize page 2, 3, etc. to page 1 merely because they belong to the same category when they contain distinct paginated item sets.
- Each pagination URL should represent its own content.
- Use clear Previous/Next links where appropriate.

---

# 27. Filters and Sort URLs

Examples:

```text
/category/conservation?sort=latest
/category/conservation?year=2026
/category/conservation?author=...
```

Before allowing indexing, decide whether a filtered page has unique search value.

Avoid creating crawl traps through unlimited combinations of:

- sort
- filter
- date
- author
- page size
- tracking parameters

Use canonicalization/noindex/crawl controls based on the actual purpose.

Do not blindly index every parameter combination.

---

# 28. 404 Pages

A missing article must return a real HTTP `404` or `410` when appropriate.

Do not return `200 OK` with a "not found" message.

Custom 404 page:

```text
H1 Page Not Found
Helpful explanation
Link to homepage
Link to latest news/categories
```

Do not canonicalize nonexistent URLs to the homepage.

---

# 29. Redirects

Use permanent redirects for URLs permanently replaced/moved.

Examples:

```text
old slug -> new slug
http -> https
non-preferred hostname -> preferred hostname
```

Avoid:

- redirect chains
- redirect loops
- redirecting unrelated deleted articles to the homepage

When an article's slug changes, redirect the old article URL directly to the new canonical URL.

---

# 30. URL Standard

Preferred:

```text
https://everestchronicle.com/category/conservation
https://everestchronicle.com/article/descriptive-article-slug
https://everestchronicle.com/author/author-name
```

Rules:

- lowercase
- human-readable
- stable
- concise
- words separated consistently
- no unnecessary IDs if a stable slug is available
- avoid meaningless query parameters
- avoid changing established URLs without redirects

---

# 31. Open Graph and Social Metadata

Important public pages should include social metadata.

Example:

```html
<meta property="og:type" content="article">
<meta property="og:title" content="Article Headline">
<meta property="og:description" content="...">
<meta property="og:url" content="https://everestchronicle.com/article/...">
<meta property="og:image" content="https://...">
<meta property="og:site_name" content="Everest Chronicle">
```

For article pages also provide appropriate article dates/author data where supported by the implementation.

Keep `og:url` aligned with the canonical URL.

Use a representative image.

---

# 32. Twitter/X Card Metadata

Example:

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Article Headline">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="https://...">
```

Social metadata is not a replacement for normal SEO metadata.

---

# 33. Preferred Representative Image

For important articles, keep representative-image signals consistent across:

- visible hero image
- `NewsArticle.image`
- `og:image`
- Twitter/X image where suitable

Google's March 2026 documentation update explicitly clarified that both schema.org markup and `og:image` can be sources for choosing image thumbnails in Search/Discover.

Do not use unrelated promotional imagery as the article's representative image.

---

# 34. Date Markup

Visible date:

```html
<time datetime="2026-09-25T09:30:00+05:45">
  September 25, 2026
</time>
```

Use correct timezone-aware timestamps.

Structured data:

```json
"datePublished": "2026-09-25T09:30:00+05:45",
"dateModified": "2026-09-25T12:20:00+05:45"
```

Rules:

- publication date must be truthful;
- modification date should indicate substantial editorial updates;
- do not refresh dates merely to appear newer;
- keep visible and structured dates consistent.

---

# 35. Byline / Author Semantics

Example:

```html
<p class="byline">
  By
  <a href="/author/jane-doe" rel="author">
    Jane Doe
  </a>
</p>
```

For editorial trust, author pages should provide useful real information when available.

Do not make the author name an H2 merely for styling.

---

# 36. Article Body HTML

Use semantic text elements:

```html
<p>Paragraph...</p>

<h2>Section heading</h2>

<p>Paragraph...</p>

<blockquote>
  <p>Quotation...</p>
  <cite>Source</cite>
</blockquote>

<ul>
  <li>...</li>
</ul>

<ol>
  <li>...</li>
</ol>

<figure>...</figure>

<table>
  ...
</table>
```

Do not represent all content as nested `<div>` tags.

Do not use `<br>` repeatedly to create paragraphs.

---

# 37. Lists

Use:

```html
<ul>
  <li>...</li>
</ul>
```

for unordered lists.

Use:

```html
<ol>
  <li>...</li>
</ol>
```

when order matters.

List titles may be headings only when they actually introduce a section.

---

# 38. Tables

Use tables only for tabular data.

```html
<table>
  <caption>...</caption>
  <thead>
    <tr>
      <th scope="col">...</th>
    </tr>
  </thead>
  <tbody>
    ...
  </tbody>
</table>
```

Do not use tables for layout.

---

# 39. Aside / Sidebar

Use `<aside>` for complementary content.

Example:

```html
<aside aria-label="Most read stories">
  <h2>Most Read</h2>
  ...
</aside>
```

If the sidebar is nested inside a larger section, heading level must still respect page hierarchy.

Do not use multiple H1s for sidebar widgets.

---

# 40. Ads

Ads must not distort document heading structure.

Good:

```html
<aside aria-label="Advertisement">
  <!-- ad -->
</aside>
```

Do not use:

```html
<h2>Advertisement</h2>
```

unless a visible heading is genuinely needed.

Ads should not push the main editorial content into a misleading or inaccessible structure.

---

# 41. Newsletter UI

A newsletter block is a complementary call-to-action, not a page-level heading.

Example:

```html
<section aria-labelledby="newsletter-title">
  <h2 id="newsletter-title">Get Everest Chronicle in your inbox</h2>
  ...
</section>
```

If nested within a section, adjust heading level accordingly.

Do not use H1.

---

# 42. Footer Architecture

Example:

```html
<footer>
  <nav aria-label="Footer navigation">
    <ul>
      <li><a href="/about">About</a></li>
      <li><a href="/contact">Contact</a></li>
      ...
    </ul>
  </nav>
</footer>
```

Footer navigation labels should not be H1/H2 merely for typography.

A footer can contain section headings where logically needed, but avoid polluting the document outline with meaningless heading tags.

---

# 43. Next.js Metadata Architecture

Prefer the Next.js Metadata API for normal metadata.

Global:

```tsx
export const metadata = {
  metadataBase: new URL('https://everestchronicle.com'),
  title: {
    default: 'Everest Chronicle',
    template: '%s | Everest Chronicle',
  },
};
```

Dynamic page:

```tsx
export async function generateMetadata({ params }) {
  const article = await getArticle(params.slug);

  return {
    title: article.seoTitle ?? article.title,
    description: article.metaDescription ?? article.summary,
    alternates: {
      canonical: `/article/${article.slug}`,
    },
    openGraph: {
      type: 'article',
      url: `/article/${article.slug}`,
      title: article.title,
      description: article.summary,
      images: [article.image],
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
  };
}
```

Rules:

- do not hard-code homepage canonical globally for child pages;
- do not generate production metadata from `localhost`;
- do not fetch SEO data only after hydration;
- article metadata should be available with initial server output.

---

# 44. SSR / SSG / Server Rendering SEO Contract

For public editorial pages, the initial response should contain meaningful content.

The rendered HTML should already expose:

- title
- meta description
- canonical
- robots directive where applicable
- H1
- primary article/category content
- crawlable internal links
- image markup
- JSON-LD

Do not make Google depend on a user interaction before important editorial content appears.

Next.js may use server rendering, static generation, or revalidation based on content freshness, but SEO-critical information must remain available to crawlers.

---

# 45. Laravel API Contract for SEO

Laravel should expose enough data for Next.js to render complete metadata without extra browser-only requests.

Recommended article SEO payload concept:

```json
{
  "slug": "example-slug",
  "title": "Article Title",
  "seo_title": null,
  "meta_description": "...",
  "summary": "...",
  "canonical_url": null,
  "robots": "index,follow",
  "published_at": "...",
  "updated_at": "...",
  "author": {
    "name": "...",
    "slug": "..."
  },
  "category": {
    "name": "Conservation",
    "slug": "conservation"
  },
  "image": {
    "url": "...",
    "alt_text": "...",
    "title": "...",
    "caption": "...",
    "photo_credit": "..."
  }
}
```

For Everest Chronicle's media architecture, contextual image metadata should come from the usage/context record rather than deprecated gallery-level title/alt fields.

---

# 46. XML Sitemap

Expose:

```text
/sitemap.xml
```

or segmented sitemaps if necessary.

Include only canonical URLs intended for indexing.

Examples:

```text
/
category URLs
article URLs
author URLs with real search value
other editorial landing pages
```

Exclude:

```text
/search
login/account pages
preview URLs
noindex pages
parameter duplicates
staging URLs
404 URLs
```

Large sites may use a sitemap index.

Update sitemaps when content changes.

---

# 47. News Sitemap

Because Everest Chronicle is a news publication, evaluate and implement a dedicated Google News sitemap for recent news content if the publication is targeting Google News discovery.

Keep it generated from actual publication data.

Do not confuse a News sitemap with normal NewsArticle structured data; they serve different functions.

---

# 48. Structured Data Rules

Use JSON-LD unless there is a compelling reason otherwise.

Potential site types:

| Page | Structured data |
|---|---|
| Home | Organization / NewsMediaOrganization, WebSite as appropriate |
| Article | NewsArticle |
| Category | BreadcrumbList; optionally other schema only when genuinely applicable |
| Author | ProfilePage/Person when implemented according to Google's supported requirements |
| Breadcrumb-supported pages | BreadcrumbList |

Do not add structured data only because a validator accepts it.

Structured data must match visible, truthful page content.

Validate deployments with Google's Rich Results Test.

---

# 49. Category Structured Data

Do not mark a category listing itself as a `NewsArticle`.

The articles inside it are separate article entities.

Category page can provide:

- BreadcrumbList
- normal page metadata
- crawlable article links

Avoid invented schema solely to increase markup count.

---

# 50. Duplicate Content

Typical duplicate causes:

```text
http vs https
www vs non-www
trailing slash variants
tracking parameters
sort/filter params
duplicate slugs/routes
print pages
AMP/alternate legacy URLs
preview URLs
staging domains
```

Choose one preferred architecture and make signals consistent:

- redirects
- canonical tags
- internal links
- sitemap URLs
- Open Graph URL
- structured-data URLs

---

# 51. Staging / Preview Environment

Staging must never accidentally compete with production.

Use authentication where possible.

At minimum, staging should not be indexable.

Never allow a public staging domain to become a canonical source for production articles.

---

# 52. Search Console

After rollout:

1. Verify production property.
2. Submit sitemap(s).
3. Inspect key URLs.
4. Verify Google's selected canonical.
5. Check Page Indexing.
6. Check structured data / rich-result reports.
7. Monitor crawl and indexing problems.
8. Monitor Core Web Vitals.
9. Review search performance by page/query/country/device.

Do not treat a third-party SEO scanner as Google's final authority.

---

# 53. Core Web Vitals / Performance

SEO architecture must not sacrifice user performance.

Priorities:

- stable layout
- optimized images
- avoid render-blocking excess
- minimize unnecessary client JavaScript
- server-render editorial content
- cache API data appropriately
- use responsive image sizes
- avoid excessive third-party scripts
- lazy-load below-the-fold media
- do not lazy-load the primary LCP image incorrectly
- preload/prioritize only genuinely critical resources

Performance should be measured with real-user and lab data.

---

# 54. Accessibility and SEO Semantics

Good semantic accessibility often improves crawlable structure.

Required practices:

- meaningful landmarks
- keyboard-accessible controls
- descriptive link text
- proper buttons
- alt text
- labels for forms
- correct heading structure
- visible focus states
- avoid duplicate IDs
- meaningful document language

ARIA should enhance semantic HTML, not replace it.

Prefer:

```html
<button>Menu</button>
```

over:

```html
<div role="button">Menu</div>
```

when a native button works.

---

# 55. Forms

Search/newsletter/account forms must use labels.

```html
<label for="email">Email address</label>
<input id="email" name="email" type="email" autocomplete="email">
```

Submit actions:

```html
<button type="submit">Subscribe</button>
```

Do not use anchors as form submit buttons.

---

# 56. Site Search UI

Recommended:

```html
<form role="search" action="/search" method="get">
  <label for="site-search">Search Everest Chronicle</label>
  <input id="site-search" name="q" type="search">
  <button type="submit">Search</button>
</form>
```

Search results should normally remain `noindex`.

---

# 57. External Links

Normal editorial citations may use normal crawlable links.

Use appropriate `rel` values when technically/security/editorially required.

For untrusted user-generated links:

```html
rel="ugc"
```

For paid/sponsored placements:

```html
rel="sponsored"
```

Do not disguise paid links as editorial links.

---

# 58. Absolute vs Relative URLs

Internal HTML links can be relative.

Canonical, structured-data identity URLs, sitemap URLs, and Open Graph canonical identity should use correct production absolute URLs where required/appropriate.

Never output:

```text
http://localhost:3000/...
```

in deployed SEO metadata.

---

# 59. Page-Type SEO Matrix

| Page type | Index? | H1 | Canonical | Primary schema |
|---|---:|---:|---|---|
| Homepage | Yes | 1 | Self | Organization/WebSite as appropriate |
| Category | Yes | 1 | Self | BreadcrumbList |
| Article | Yes | 1 | Self | NewsArticle + BreadcrumbList |
| Author | Usually yes if useful | 1 | Self | Profile/Person as applicable |
| Editorial topic | Only if useful | 1 | Self | BreadcrumbList |
| Search results | Usually no | 1 | Self or deliberate | None required |
| Login | No | 1 | Deliberate | None |
| Account | No | 1 | Deliberate | None |
| Preview | No | 1 | Deliberate | None |
| 404 | No | 1 | None | None |

---

# 60. Homepage Checklist

- [ ] production canonical
- [ ] unique title
- [ ] useful description
- [ ] one primary H1
- [ ] navigation is `<nav><ul><li><a>`
- [ ] section titles use H2
- [ ] article cards nested beneath sections use H3 where appropriate
- [ ] article URLs crawlable
- [ ] Organization/NewsMediaOrganization data correct
- [ ] representative social metadata
- [ ] no localhost URLs
- [ ] no duplicated H1 in logo/header/footer

---

# 61. Category Page Checklist

Example `/category/conservation`:

- [ ] HTTP 200
- [ ] indexable
- [ ] self-canonical
- [ ] canonical is NOT homepage
- [ ] unique `<title>`
- [ ] unique meta description
- [ ] breadcrumb
- [ ] one H1 = category name
- [ ] useful intro if editorially appropriate
- [ ] major content groups use H2
- [ ] story titles use H3 under their section when appropriate
- [ ] normal crawlable article links
- [ ] pagination crawlable
- [ ] parameter duplicates controlled
- [ ] BreadcrumbList valid
- [ ] images have appropriate contextual alt
- [ ] no navigation H1/H2 pollution

---

# 62. Article Page Checklist

- [ ] HTTP 200
- [ ] self-canonical
- [ ] indexable
- [ ] unique title
- [ ] unique description
- [ ] one article H1
- [ ] visible author
- [ ] valid author link if available
- [ ] visible publication date
- [ ] modified date only when legitimate
- [ ] hero image
- [ ] meaningful contextual alt text
- [ ] body paragraphs semantic
- [ ] H2/H3 hierarchy
- [ ] NewsArticle JSON-LD
- [ ] structured data headline matches article
- [ ] structured dates match page
- [ ] schema image represents article
- [ ] `og:image` represents article
- [ ] BreadcrumbList valid
- [ ] internal category/topic links
- [ ] related articles
- [ ] no fake ratings/schema
- [ ] no localhost URLs

---

# 63. Author Page Checklist

- [ ] one H1
- [ ] useful author bio
- [ ] unique title/description
- [ ] self-canonical
- [ ] author article links crawlable
- [ ] author identity consistent with NewsArticle data
- [ ] avoid empty/thin author pages

---

# 64. Automated SEO Validation

Add automated checks in development/CI where practical.

Fail or warn when:

```text
page has no <title>
page has no canonical where required
canonical contains localhost
canonical points to homepage unexpectedly
page has multiple primary H1 elements
page has no H1
article has no NewsArticle data
article schema headline differs unexpectedly
article canonical differs from schema mainEntityOfPage
article image is missing alt metadata when meaningful
indexable page returns non-200
noindex page appears in sitemap
sitemap contains noncanonical URLs
navigation items are headings
```

---

# 65. Development Rule: Never Style by Heading Level

Bad:

```tsx
<h1 className="small-nav-item">Environment</h1>
```

Good:

```tsx
<Link className="small-nav-item" href="/category/environment">
  Environment
</Link>
```

Typography is CSS.

Semantics are HTML.

Never change semantic tags merely to obtain a font preset.

---

# 66. Development Rule: Component-Level Heading Control

Reusable components must not blindly hard-code heading levels without context.

Bad component:

```tsx
function ArticleCard() {
  return <h2>...</h2>;
}
```

Better:

```tsx
function ArticleCard({ headingLevel = 3 }) {
  const Heading = `h${headingLevel}` as const;
  return <Heading>...</Heading>;
}
```

Or create explicit variants controlled by page architecture.

The parent page determines structural hierarchy.

---

# 67. Target Structure for the Current Conservation Page

Current audit indicates multiple H1 and many H2 elements.

Target:

```text
HEADER
  Logo -> Link
  Navigation -> nav / ul / li / Link

MAIN

  Breadcrumb -> nav

  H1 Conservation

  Intro paragraph

  H2 Latest Conservation Stories
    H3 Story
    H3 Story
    H3 Story
    ...

  H2 Featured
    H3 Story
    H3 Story

  H2 Most Read
    H3 Story
    H3 Story

FOOTER
  Footer navigation -> nav / ul / li / Link
```

The exact number of H2/H3 tags is **not** the SEO goal.

The goal is a correct, understandable semantic hierarchy.

---

# 68. Current Canonical Fix

Wrong:

```text
Page:
https://everestchronicle.com/category/conservation

Canonical:
https://everestchronicle.com/
```

Correct:

```text
Page:
https://everestchronicle.com/category/conservation

Canonical:
https://everestchronicle.com/category/conservation
```

Implement the same self-canonical rule for each independently indexable canonical page.

---

# 69. SEO Priorities

## P0 — Critical

1. Production URL / hostname correctness
2. HTTP status correctness
3. Crawlability
4. Accidental noindex/blocking
5. Canonical correctness
6. Unique page identity/title
7. Server-visible main content
8. Sitemap canonical URLs
9. Article structured data correctness

## P1 — High

1. One primary H1
2. Heading hierarchy
3. navigation semantics
4. crawlable internal links
5. image alt/context
6. breadcrumb implementation
7. author/date quality
8. duplicate URL control
9. category architecture

## P2 — Enhancement

1. Open Graph refinement
2. preferred representative images
3. profile schema
4. advanced News/Discover optimization
5. automated audits
6. editorial internal-link improvements

---

# 70. Things SEO Auditors Commonly Flag That Are Not Automatically Problems

These are not inherently errors:

- missing `X-Robots-Tag` on an HTML page
- a large number of H2/H3 headings
- many internal links on a genuinely content-rich page
- many images on a news/category page
- title and H1 not being character-for-character identical
- `index,follow` not explicitly present when the page is otherwise indexable
- absence of `meta keywords`

Judge the actual HTML architecture and search intent instead of optimizing only for a third-party SEO score.

---

# 71. Project-Wide Acceptance Criteria

A public production page is SEO-ready only when:

```text
[ ] correct HTTP status
[ ] correct production URL
[ ] correct canonical
[ ] allowed to crawl
[ ] correct index/noindex intent
[ ] unique title
[ ] useful description
[ ] one primary H1
[ ] logical H2/H3 hierarchy
[ ] semantic navigation
[ ] crawlable links
[ ] meaningful initial HTML
[ ] correct image markup
[ ] relevant structured data
[ ] consistent Open Graph URL/image
[ ] sitemap policy correct
[ ] no localhost/staging identity
[ ] responsive and stable
[ ] no major structured-data errors
```

---

# 72. Recommended Component Contract

Create shared components such as:

```text
components/seo/
├── SeoMetadata
├── Canonical
├── JsonLd
├── NewsArticleJsonLd
├── BreadcrumbJsonLd
├── OrganizationJsonLd
└── RobotsMetadata

components/layout/
├── SiteHeader
├── PrimaryNavigation
├── Breadcrumbs
├── Main
└── SiteFooter

components/article/
├── ArticleHeader
├── ArticleBody
├── ArticleCard
├── ArticleImage
├── AuthorByline
├── PublishedDate
└── RelatedStories
```

SEO rules should be centralized rather than recreated independently on every route.

---

# 73. Route-Level Architecture

Suggested Next.js App Router concept:

```text
app/
├── layout.tsx
├── page.tsx
├── category/
│   └── [slug]/
│       ├── page.tsx
│       └── metadata logic
├── article/
│   └── [slug]/
│       ├── page.tsx
│       └── metadata logic
├── author/
│   └── [slug]/
│       └── page.tsx
├── search/
│   └── page.tsx
├── robots.ts
├── sitemap.ts
└── not-found.tsx
```

Use shared builders for:

```text
absolute URL
canonical URL
title
description
robots
Open Graph
JSON-LD
```

---

# 74. Canonical Helper

Recommended concept:

```ts
const SITE_URL = 'https://everestchronicle.com';

export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString();
}
```

Never derive canonical identity from the browser's current development host.

---

# 75. Metadata Consistency Rule

For an article:

```text
Canonical URL
=
Open Graph URL
=
NewsArticle mainEntityOfPage
=
XML sitemap URL
=
preferred internal-link destination
```

All should represent the same canonical article.

For category pages, apply the same consistency principle.

---

# 76. SEO Content Quality Rule

Technical SEO cannot compensate for low-value editorial content.

For every indexable page:

- satisfy a clear reader intent;
- provide original, useful information;
- use accurate headlines;
- avoid fabricated freshness;
- avoid filler written solely for search engines;
- disclose meaningful authorship;
- keep content factually maintained;
- avoid mass-producing thin pages from tags/filters.

---

# 77. Validation Tools

Use:

1. Google Search Console
2. URL Inspection
3. Google Rich Results Test
4. browser View Source / rendered DOM inspection
5. Lighthouse / PageSpeed Insights
6. schema validation as secondary support
7. automated tests in CI

Always inspect both:

- raw/server-delivered HTML
- rendered page

especially for metadata/canonical debugging.

---

# 78. Official Google References

Primary references used for this architecture:

- Google Search appearance overview  
  https://developers.google.com/search/docs/appearance

- Canonicalization  
  https://developers.google.com/search/docs/crawling-indexing/canonicalization

- Article / NewsArticle structured data  
  https://developers.google.com/search/docs/appearance/structured-data/article

- Breadcrumb structured data  
  https://developers.google.com/search/docs/appearance/structured-data/breadcrumb

- Google Search documentation updates  
  https://developers.google.com/search/updates

Also review relevant current Google Search Central documentation for:

- title links
- snippets
- image SEO
- robots meta directives
- robots.txt
- sitemaps
- JavaScript SEO
- URL structure
- crawlable links
- Search Essentials
- structured data general guidelines
- Google News / publisher guidance
- Core Web Vitals

---

# 79. Final Non-Negotiable Rule

For every component ask:

> **What does this element mean in the document?**

Then select the HTML element.

Do not ask:

> **Which tag gives me the font size I want?**

CSS controls appearance.

HTML communicates structure.

For Everest Chronicle, the expected page hierarchy is generally:

```text
1 page
→ 1 primary H1
→ major H2 sections
→ nested H3 story/subsection titles
→ real nav elements for navigation
→ real links for destinations
→ real buttons for actions
→ self-consistent canonical + metadata + schema
```

That standard should be applied to **all existing and future public page templates**.
