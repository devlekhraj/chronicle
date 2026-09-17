# Everest Chronicle — Step 02
# Establish Project Architecture

Create the permanent application structure before building the visual design.

## Goal

Establish clear boundaries for layout, homepage sections, article-related components, UI primitives, shared types, data, and utilities.

## Required Structure

```text
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Container.tsx
│   ├── home/
│   │   ├── HeroStory.tsx
│   │   ├── FeaturedStory.tsx
│   │   ├── LatestStories.tsx
│   │   ├── CategorySection.tsx
│   │   ├── ShortsSection.tsx
│   │   └── Newsletter.tsx
│   ├── article/
│   │   ├── ArticleCard.tsx
│   │   ├── ArticleMeta.tsx
│   │   └── CategoryTag.tsx
│   └── ui/
│       ├── SectionHeading.tsx
│       └── SearchBox.tsx
├── data/
│   └── homepage.ts
├── lib/
│   └── utils.ts
├── types/
│   └── content.ts
└── styles/
```

Do not fully implement all components yet. Create only minimal shells where needed for architecture.

## Rules

- Keep layout components free of homepage-specific content.
- Keep reusable article content in `components/article`.
- Keep generic primitives in `components/ui`.
- Keep homepage composition in `components/home`.
- Avoid circular imports.
- Do not create a barrel file for every folder unless it genuinely improves maintainability.
- Do not put static content directly inside presentational components; use typed data objects.

## Types

Create initial shared content types in `src/types/content.ts`:

```ts
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
}
```

## Utility

Create `src/lib/utils.ts` with only a small helper if needed. Do not create unnecessary abstractions.

## Verification

- All imports compile.
- `npm run lint` passes.
- `npm run build` passes.
