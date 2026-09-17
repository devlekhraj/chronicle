# Everest Chronicle — Step 04
# Typography System

Implement the Figma type scale.

## Figma Rules

- Font family: Kedebideri
- Base size: 16px
- Scale ratio: Minor Third (1.2)
- Heading line-height: 1.2

## Type Scale

```text
11px  text-xs
13px  text-sm
16px  text-base
19px  text-lg
23px  text-xl
28px  text-2xl
33px  text-3xl
40px  text-4xl
48px  text-5xl
```

## CSS Tokens

Add:

```css
:root {
  --font-primary: "Kedebideri", sans-serif;

  --text-xs: 11px;
  --text-sm: 13px;
  --text-base: 16px;
  --text-lg: 19px;
  --text-xl: 23px;
  --text-2xl: 28px;
  --text-3xl: 33px;
  --text-4xl: 40px;
  --text-5xl: 48px;

  --leading-none: 1;
  --leading-tight: 1.1;
  --leading-heading: 1.2;
  --leading-snug: 1.3;
  --leading-normal: 1.5;
  --leading-body: 1.6;
  --leading-relaxed: 1.75;

  --font-regular: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}

@theme inline {
  --font-sans: var(--font-primary);
  --text-xs: 11px;
  --text-sm: 13px;
  --text-base: 16px;
  --text-lg: 19px;
  --text-xl: 23px;
  --text-2xl: 28px;
  --text-3xl: 33px;
  --text-4xl: 40px;
  --text-5xl: 48px;
  --leading-none: 1;
  --leading-tight: 1.1;
  --leading-heading: 1.2;
  --leading-snug: 1.3;
  --leading-normal: 1.5;
  --leading-body: 1.6;
  --leading-relaxed: 1.75;
}
```

## Font Loading

If the actual Kedebideri font files are available, use `next/font/local`. If they are not available, keep a temporary fallback and do not invent or download a substitute automatically.

## Semantic Typography

Create sensible semantic usage:
- hero title: 48px desktop
- section title: 23–28px depending on layout
- card title: 16–19px
- body/excerpt: 16px or 13–16px depending on card size
- metadata: 11–13px

Use responsive typography for hero/article titles.

Do not overuse custom CSS classes where Tailwind utilities are sufficient.
