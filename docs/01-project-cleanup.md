# Everest Chronicle — Step 01
# Clean Fresh Next.js Project

You are working on a fresh Next.js project that will be used to recreate the Everest Chronicle Figma design.

## Tech Stack

Use:
- Next.js App Router
- React
- TypeScript
- Tailwind CSS v4
- `src/` directory
- Server Components by default
- Client Components only when interaction is required

Do not install a large opinionated UI framework.

Do not use:
- Material UI
- Chakra UI
- Bootstrap
- shadcn/ui
- Ant Design

Focused libraries may be added later only when they solve a specific problem.

## Goal

Clean the default Next.js project so we have a minimal, production-ready foundation before implementing the Figma design.

Do not build the actual homepage design yet.

## Tasks

1. Remove all default starter/demo content from `src/app/page.tsx`.
2. Replace `page.tsx` with a minimal temporary page:

```tsx
export default function Home() {
  return (
    <main>
      <h1>Everest Chronicle</h1>
    </main>
  );
}
```

3. Clean `src/app/globals.css` and keep only:

```css
@import "tailwindcss";

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

html,
body {
  margin: 0;
  padding: 0;
}

body {
  min-height: 100vh;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
textarea,
select {
  font: inherit;
}
```

4. Clean `src/app/layout.tsx` and use metadata:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Everest Chronicle",
    template: "%s | Everest Chronicle",
  },
  description:
    "Everest Chronicle — stories, expeditions, environment, conservation, travel and Himalayan culture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

5. Remove unused starter assets from `public/` such as `next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, and `window.svg` if present.
6. Keep the favicon for now.
7. Create this base structure:

```text
src/
├── app/
├── components/
│   ├── layout/
│   ├── home/
│   ├── article/
│   └── ui/
├── data/
├── lib/
├── types/
└── styles/
```

8. Create this public asset structure:

```text
public/
├── images/
│   ├── articles/
│   ├── homepage/
│   └── common/
├── icons/
└── brand/
```

9. Keep TypeScript strict and avoid `any` unless absolutely unavoidable.
10. Use `@/` import aliases.
11. Use PascalCase for components and camelCase for utility files/functions.
12. Use Tailwind CSS for component styling; avoid inline styles unless values are truly dynamic.
13. Use Server Components by default. Add `"use client"` only when required.
14. Use `next/image` for content images and `next/link` for internal navigation.
15. Ensure no unused imports, no dead CSS, no TypeScript errors, and no ESLint errors.
16. Do not implement header, hero, cards, footer, responsive logic, API, or database yet.

## Verification

Run:

```bash
npm run lint
npm run build
```

Both must pass before moving on.
