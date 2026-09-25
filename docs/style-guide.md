# Everest Chronicle Style Guide

## Editorial Metadata

Use one shared metadata pattern for story cards, listings, homepage modules, and related-story cards:

```tsx
<div className="meta">
  <span className="meta-author">By Author Name</span>
  <span className="meta-sep" aria-hidden="true">|</span>
  <time dateTime={publishedAtIso}>Sep 19, 2026</time>
</div>
```

Rules:

- Author appears first and must include the `By` label.
- Date appears second.
- Separate author and date with a visual pipe separator.
- Do not use pill backgrounds or badges for metadata.
- Do not show updated dates or read-time in listing/card metadata.
- Detail pages may include richer metadata in `.article-header-meta`, including material updated dates and read-time.

## Category Tags

Use category tags as crawlable links when they point to category pages:

```tsx
<div className="tags">
  <Link href="/category/mountain">Mountain</Link>
  <Link href="/category/expedition">Expedition</Link>
</div>
```

Tag typography should stay compact:

```css
font:
  600 12px/1 var(--font-condensed),
  sans-serif;
```

Article detail category tags use `.article-detail-tags` and should follow the same `600 12px/1` type scale.
