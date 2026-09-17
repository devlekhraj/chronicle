# Everest Chronicle — Figma Design System + Header / Navigation Implementation

## Role

Act as a senior frontend engineer and design-system specialist.

You are working inside an EXISTING Next.js project for:

**Everest Chronicle**

The UI is based on an existing Figma design.

Your task is NOT to redesign the website.

Your task is to reproduce the supplied Figma design language accurately and establish a clean reusable foundation for the rest of the website.

---

# 1. IMPORTANT PROJECT RULES

Before changing any code:

1. Inspect the existing Next.js project.
2. Detect:
   - App Router or Pages Router
   - TypeScript or JavaScript
   - current CSS architecture
   - existing components
   - existing fonts
   - existing layout
   - existing header/navigation
   - current global CSS
3. Reuse the existing architecture where reasonable.
4. Do NOT create a new Next.js project.
5. Do NOT unnecessarily replace existing configuration.
6. Do NOT delete working code unless it conflicts directly with this implementation.
7. Avoid unnecessary third-party UI libraries.
8. Prefer native React + Next.js + CSS.
9. Keep components reusable and production-ready.
10. Do not hardcode random colors throughout components.
11. Use centralized design tokens.
12. Do not invent Figma values when exact values are supplied below.
13. Keep the design editorial, professional, minimal and clean.
14. Avoid SaaS-style visual design.
15. Avoid excessive:
    - border radius
    - shadows
    - cards
    - gradients
    - animations
    - decorative UI

This is a professional news / editorial publication.

---

# 2. DESIGN DIRECTION

The intended visual character is:

- premium editorial publication
- minimal
- typography-driven
- clean white canvas
- restrained use of green
- strong content hierarchy
- professional journalism aesthetic
- generous whitespace
- lightweight borders
- almost no decorative shadows
- no oversized rounded cards
- no playful UI
- no glassmorphism
- no gradients

Think in terms of an international editorial/news publication rather than a startup dashboard.

---

# 3. FIGMA DESIGN TOKENS

Create centralized CSS design tokens.

Recommended location:

```text
app/globals.css
```

or, if the project already separates styles:

```text
styles/tokens.css
styles/globals.css
```

Do not duplicate token values across components.

---

# 4. BASE COLORS

## Brand

```css
--ec-brand-100: #2A836A;
--ec-brand-75: rgba(42, 131, 106, 0.75);
--ec-brand-50: rgba(42, 131, 106, 0.50);
--ec-brand-25: rgba(42, 131, 106, 0.25);
--ec-brand-15: rgba(42, 131, 106, 0.15);
--ec-brand-10: rgba(42, 131, 106, 0.10);
```

## Light

```css
--ec-light-100: #FFFFFF;
--ec-light-90: rgba(255, 255, 255, 0.90);
--ec-light-75: rgba(255, 255, 255, 0.75);
--ec-light-50: rgba(255, 255, 255, 0.50);
--ec-light-25: rgba(255, 255, 255, 0.25);
--ec-light-15: rgba(255, 255, 255, 0.15);
--ec-light-alt: #F4F6F6;
```

## Dark

```css
--ec-dark-100: #141414;
--ec-dark-90: rgba(20, 20, 20, 0.90);
--ec-dark-75: rgba(20, 20, 20, 0.75);
--ec-dark-50: rgba(20, 20, 20, 0.50);
--ec-dark-20: rgba(20, 20, 20, 0.20);
```

---

# 5. MISC COLORS

```css
--ec-brand-tint: #3FC183;
--ec-brand-tint-25: rgba(63, 193, 131, 0.25);
--ec-yellowish-green: #E4EA95;
```

---

# 6. BRAND DARK

Figma currently defines:

```css
--ec-brand-dark-100: #2A836A;
```

Even though this currently matches Brand 100, keep it as a separate semantic variable because Figma treats it independently and it may change later.

---

# 7. SEMANTIC SURFACE TOKENS

```css
--ec-surface-base: var(--ec-light-100);
--ec-surface-base-alt: var(--ec-light-alt);
```

---

# 8. SEMANTIC FILL TOKENS

## Light fills

```css
--ec-fill-light-strong: var(--ec-light-100);
--ec-fill-light-semi-strong: var(--ec-light-90);
--ec-fill-light-weak: var(--ec-light-75);
--ec-fill-light-weaker: var(--ec-light-50);
```

## Brand fills

```css
--ec-fill-brand-strongest: var(--ec-brand-100);
--ec-fill-brand-strong: var(--ec-brand-50);
--ec-fill-brand-semi-strong: var(--ec-brand-25);
--ec-fill-brand-weak: var(--ec-brand-15);
--ec-fill-brand-weaker: var(--ec-brand-10);
```

## Dark fills

```css
--ec-fill-dark-strong: var(--ec-dark-100);
--ec-fill-dark-semi-strong: var(--ec-dark-90);
--ec-fill-dark-weak: var(--ec-dark-75);
--ec-fill-dark-weaker: var(--ec-dark-50);
```

## Colored fills

```css
--ec-fill-colored-yellow: var(--ec-yellowish-green);
--ec-fill-colored-bluish: var(--ec-brand-tint);
--ec-fill-colored-bluish-weaker: var(--ec-brand-tint-25);
```

---

# 9. STROKE TOKENS

## Light strokes

```css
--ec-stroke-light-strong: var(--ec-light-100);
--ec-stroke-light-semi-strong: var(--ec-light-90);
--ec-stroke-light-weak: var(--ec-light-75);
```

## Dark strokes

```css
--ec-stroke-dark-strong: var(--ec-dark-100);
--ec-stroke-dark-semi-strong: var(--ec-dark-90);
--ec-stroke-dark-weak: var(--ec-dark-75);
--ec-stroke-dark-weaker: var(--ec-dark-50);
--ec-stroke-dark-more-weaker: var(--ec-dark-20);
```

## Brand strokes

```css
--ec-stroke-brand-strong: var(--ec-brand-100);
--ec-stroke-brand-semi-strong: var(--ec-brand-75);
--ec-stroke-brand-weak: var(--ec-brand-50);
--ec-stroke-brand-weaker: var(--ec-brand-25);
```

---

# 10. TEXT TOKENS

## Default text

```css
--ec-text-default-strong: var(--ec-dark-100);
--ec-text-default-semi-strong: var(--ec-dark-90);
--ec-text-default-weak: var(--ec-dark-75);
--ec-text-default-faded: var(--ec-dark-50);
```

## Brand text

```css
--ec-text-brand-extra-strong: var(--ec-brand-dark-100);
--ec-text-brand-strong: var(--ec-brand-100);
--ec-text-brand-semi-strong: var(--ec-brand-75);
```

## Inverse text

```css
--ec-text-inverse-strong: var(--ec-light-100);
--ec-text-inverse-semi-strong: var(--ec-light-75);
```

---

# 11. TYPOGRAPHY

The Figma variables define:

```text
brand-font = Roboto Condensed
body-font = Epunda Sans
```

Use:

```css
--ec-font-brand: "Roboto Condensed", sans-serif;
--ec-font-body: "Epunda Sans", sans-serif;
```

---

# 12. FONT IMPLEMENTATION

Inspect whether these font files already exist in the project.

Preferred approach:

- use local font files if they already exist
- use `next/font/local` where appropriate
- do not silently replace the Figma font with another font
- do not introduce a random fallback as the primary design font

If Roboto Condensed can safely be loaded through the project's existing font strategy, use that.

If `Epunda Sans` is not available locally, preserve the CSS font token and use a temporary sensible fallback ONLY as a fallback, not as a replacement for the design specification.

Example:

```css
--ec-font-brand: "Roboto Condensed", Arial, sans-serif;
--ec-font-body: "Epunda Sans", Arial, sans-serif;
```

Do not rename the font.

---

# 13. GLOBAL TYPOGRAPHY

Body content should use:

```css
body {
    font-family: var(--ec-font-body);
    color: var(--ec-text-default-strong);
    background: var(--ec-surface-base);
}
```

Editorial/display/interface typography may use:

```css
font-family: var(--ec-font-brand);
```

---

# 14. HEADER STRUCTURE

Create/refactor a reusable header.

Suggested component structure:

```text
components/
└── site/
    └── header/
        ├── SiteHeader.tsx
        ├── BrandLogo.tsx
        ├── DesktopNavigation.tsx
        ├── NavigationItem.tsx
        ├── NavigationDropdown.tsx
        └── SearchBox.tsx
```

Adapt to the existing project naming conventions if needed.

Do not create unnecessary abstraction if the existing project already has a good component structure.

---

# 15. HEADER VISUAL STRUCTURE

Desktop header approximately follows this structure:

```text
┌───────────────────────────────────────────────────────────────┐
│                                                               │
│                      ▲ EVEREST CHRONICLE                      │
│                                                               │
│ Expeditions  Environment  Conservation  Travel  Media  Search │
│                                                │              │
│                                                ├ Dataviz      │
│                                                ├ 3D           │
│                                                ├ Video        │
│                                                └ Photography  │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

The logo and navigation are separate rows.

Do NOT place the logo simply inline beside the navigation.

---

# 16. BRAND LOGO

The Figma logo uses:

```text
Font: brand-font / Roboto Condensed
Weight: Medium
Font size: 32px
Line height: 120%
Letter spacing: -2%
```

Implement:

```css
.ec-brand-logo {
    font-family: var(--ec-font-brand);
    font-size: 32px;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: -0.02em;
}
```

Visual composition:

```text
▲ EVEREST CHRONICLE
```

Rules:

- triangular brand mark = Brand 100
- `EVEREST` = Brand 100
- `CHRONICLE` = Dark 100
- spacing between EVEREST and CHRONICLE should be visually tight
- logo should not appear bold/heavy
- maintain editorial appearance

Use CSS to create the triangular mark if an existing SVG/logo asset is not already present.

If the project already contains the exact logo asset, prefer it.

---

# 17. LOGO POSITION

On desktop:

- logo is centered horizontally
- logo occupies the upper header row
- it is independent from navigation alignment
- give it comfortable vertical whitespace
- do not make the header overly tall

Do not use absolute positioning unless genuinely necessary.

Prefer grid/flex layout that remains responsive.

---

# 18. DESKTOP NAVIGATION

Navigation items visible in the Figma design:

```text
Expeditions
Environment
Conservation
Travel
Media
```

Search is positioned on the right.

---

# 19. NAVIGATION TYPOGRAPHY

The Figma navigation style shows:

```text
Style: EC/display
Font size: 18px
Line height: 120%
Fill: Text / Default / Weak
```

Use:

```css
.ec-nav-link {
    font-family: var(--ec-font-brand);
    font-size: 18px;
    line-height: 1.2;
    font-weight: 400;
    color: var(--ec-text-default-weak);
}
```

Do not make the navigation unnecessarily bold.

---

# 20. NAVIGATION ITEM PADDING

The Figma selected navigation label shows approximately:

```text
X: 8
Y: 8
```

Use approximately:

```css
padding: 8px;
```

on the clickable nav label.

The full navigation spacing should come primarily from the navigation container gap, not huge padding on every link.

---

# 21. NAVIGATION GAP

Use an initial desktop gap around:

```css
gap: 28px;
```

to:

```css
gap: 36px;
```

Start approximately around:

```css
gap: 32px;
```

and keep it visually faithful to the Figma layout.

Do not use excessive 50–60px menu spacing.

---

# 22. NAV LINK STATES

Default:

```css
color: var(--ec-text-default-weak);
```

Hover:

```css
color: var(--ec-text-brand-strong);
```

Active:

Use the same restrained editorial treatment.

Do NOT create:

- pill backgrounds
- chunky rounded tabs
- heavy underline animations

A subtle brand color change or thin line is enough if required.

---

# 23. MEDIA DROPDOWN

`Media` contains:

```text
Dataviz
3D
Video
Photography
```

Desktop behavior:

- dropdown appears below Media
- aligned naturally with the Media trigger
- white background
- compact width
- approximately 105–120px based on the Figma
- subtle shadow only
- small border radius
- clean vertical item list
- no oversized card styling

Approximate style:

```css
.ec-nav-dropdown {
    min-width: 110px;
    background: var(--ec-surface-base);
    border-radius: 6px;
    box-shadow:
        0 2px 4px rgba(20, 20, 20, 0.08),
        0 4px 10px rgba(20, 20, 20, 0.06);
}
```

Keep the shadow very restrained.

---

# 24. DROPDOWN ITEMS

Use brand typography.

Recommended starting values:

```css
.ec-nav-dropdown-link {
    display: block;
    padding: 14px 16px;
    font-family: var(--ec-font-brand);
    color: var(--ec-text-default-weak);
    text-decoration: none;
}
```

Hover should use either:

```css
color: var(--ec-text-brand-strong);
```

or a very subtle alternate surface.

Do not create large hover blocks.

---

# 25. DROPDOWN ACCESSIBILITY

The dropdown must support:

- mouse
- keyboard
- focus
- Escape key closing
- Tab navigation
- appropriate `aria-expanded`
- appropriate `aria-haspopup`

Desktop hover can be supported, but keyboard/click functionality must still work.

Do not make it hover-only.

---

# 26. SEARCH AREA

Search is positioned on the right side of the navigation row.

Figma appearance:

```text
┌──────────────────────────────┬──────┐
│ Search                       │  🔍  │
└──────────────────────────────┴──────┘
```

Style:

- white/light input
- thin subtle border
- approximately 6–8px radius
- search icon section on the right
- pale green / brand-tinted background for icon area
- dark search icon
- restrained dimensions
- no large rounded pill

Example starting point:

```css
.ec-search {
    display: flex;
    align-items: stretch;
    border: 1px solid var(--ec-stroke-dark-more-weaker);
    border-radius: 7px;
    overflow: hidden;
    background: var(--ec-surface-base);
}
```

Input:

```css
.ec-search input {
    border: 0;
    outline: none;
    background: transparent;
    font-family: var(--ec-font-body);
}
```

Search button:

```css
.ec-search button {
    border: 0;
    background: var(--ec-fill-brand-semi-strong);
}
```

Adjust semantic strength if needed after visual comparison.

---

# 27. SEARCH ICON

Use the project's existing icon strategy.

If no icon system exists, prefer a lightweight inline SVG rather than introducing a full dependency just for one icon.

Do not use emoji.

---

# 28. CONTENT CONTAINER

The Figma uses a centered content area with substantial whitespace outside it.

Create/reuse a common container utility.

Recommended general concept:

```css
.ec-container {
    width: min(100% - 32px, 1200px);
    margin-inline: auto;
}
```

However:

DO NOT blindly force `1200px`.

Inspect the existing page and adjust the max width visually so that it matches the Figma screenshot.

The header and homepage content should align to the same major grid.

---

# 29. HEADER LAYOUT

Recommended conceptual markup:

```tsx
<header>
    <div className="ec-container">
        <div className="ec-header-brand-row">
            <BrandLogo />
        </div>

        <div className="ec-header-nav-row">
            <DesktopNavigation />
            <SearchBox />
        </div>
    </div>
</header>
```

Desktop nav row:

```css
.ec-header-nav-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
```

---

# 30. WHITE SPACE

This design depends strongly on whitespace.

Preserve:

- clear space above/below logo
- separation between logo and navigation
- clean navigation line
- separation before homepage content starts

Do not compact everything excessively.

At the same time, do not create an oversized 180px+ header.

---

# 31. HEADER BORDER

The Figma header is visually very clean.

Do not add a heavy border.

If separation is required, use only something comparable to:

```css
border-bottom: 1px solid rgba(20, 20, 20, 0.08);
```

But do not add it if the design does not require it.

---

# 32. RESPONSIVE BEHAVIOR

Desktop implementation is the priority for this phase.

Still make the implementation structurally responsive.

Suggested breakpoints can follow the project's existing breakpoints.

At narrower screens:

- hide desktop menu when necessary
- avoid nav items wrapping awkwardly
- preserve logo
- preserve search functionality
- prepare structure for a future mobile menu

Do NOT invent an elaborate mobile redesign in this phase unless one already exists in the project.

If there is already a mobile header, do not break it.

---

# 33. HOMEPAGE CONTENT

For this phase:

Do NOT redesign the entire homepage.

The screenshot contains homepage content only to establish header context.

Focus on:

1. design tokens
2. fonts
3. content container
4. logo
5. navigation
6. Media dropdown
7. search

Existing homepage content should remain functional.

Only make minimal spacing adjustments if required so it aligns correctly beneath the new header.

---

# 34. DO NOT COPY FIGMA PLACEHOLDERS INTO PRODUCTION

The large gray boxes visible in the Figma are layout/image placeholders.

Do not assume those exact gray placeholders belong in production if the existing Next.js project already contains real images/content.

This phase is about header/navigation/design foundation.

---

# 35. CSS NAMING

Use clear scoped naming.

Example:

```text
ec-site-header
ec-brand-logo
ec-header-brand-row
ec-header-nav-row
ec-nav
ec-nav-list
ec-nav-item
ec-nav-link
ec-nav-dropdown
ec-nav-dropdown-link
ec-search
```

If the project uses CSS Modules, adapt naming appropriately.

---

# 36. CSS VARIABLES

Use all major visual values through tokens.

Good:

```css
color: var(--ec-text-default-weak);
```

Avoid:

```css
color: rgba(20, 20, 20, 0.75);
```

inside random components when a semantic variable already exists.

---

# 37. COMPONENT RESPONSIBILITIES

## SiteHeader

Responsible for:

- overall header layout
- container
- logo row
- navigation row

## BrandLogo

Responsible for:

- icon/triangle
- EVEREST
- CHRONICLE
- link back to homepage

## DesktopNavigation

Responsible for:

- primary nav
- dropdown trigger
- desktop interaction

## NavigationDropdown

Responsible for:

- Media dropdown
- accessible state
- menu items

## SearchBox

Responsible for:

- search input
- submit button
- keyboard form submission

---

# 38. ROUTES

Use the project's actual routing if these routes already exist.

If they do not yet exist, keep navigation URLs organized in a configuration object rather than scattering strings throughout JSX.

Example:

```ts
const navigation = [
    {
        label: "Expeditions",
        href: "/expeditions",
    },
    {
        label: "Environment",
        href: "/environment",
    },
    {
        label: "Conservation",
        href: "/conservation",
    },
    {
        label: "Travel",
        href: "/travel",
    },
    {
        label: "Media",
        children: [
            {
                label: "Dataviz",
                href: "/media/dataviz",
            },
            {
                label: "3D",
                href: "/media/3d",
            },
            {
                label: "Video",
                href: "/media/video",
            },
            {
                label: "Photography",
                href: "/media/photography",
            },
        ],
    },
];
```

Do not duplicate menu markup manually.

---

# 39. NEXT.JS REQUIREMENTS

Use:

```tsx
import Link from "next/link";
```

for internal routes.

Do not use raw `<a>` for normal internal Next.js navigation unless required.

Search should use a proper form:

```tsx
<form role="search">
```

Avoid unnecessary client components.

Only mark components with:

```tsx
"use client";
```

when interaction genuinely requires client-side state.

Keep static components server-renderable where possible.

---

# 40. DROPDOWN IMPLEMENTATION STRATEGY

Keep client-side JavaScript limited to the interactive dropdown component if possible.

For example:

```text
SiteHeader
 ├ BrandLogo             server-safe
 ├ DesktopNavigation
 │  └ MediaDropdown      client component if necessary
 └ SearchBox             server-safe unless dynamic state is needed
```

Do not convert the entire layout into a client component merely for one dropdown.

---

# 41. PERFORMANCE

Avoid:

- unnecessary dependencies
- huge icon packages for one icon
- client rendering of static content
- layout shifts caused by fonts
- unnecessary JavaScript
- animation libraries

Prioritize:

- semantic HTML
- server rendering
- CSS
- Next.js font optimization where appropriate

---

# 42. ACCESSIBILITY

Ensure:

- logo has meaningful accessible text
- navigation uses `<nav>`
- lists use `<ul>` / `<li>`
- search has an accessible label
- dropdown trigger is keyboard accessible
- visible focus states exist
- text contrast remains sufficient
- interactive elements have reasonable hit areas

Do not remove focus outlines without adding an accessible replacement.

---

# 43. PAGE BACKGROUND

The page should remain:

```css
background: var(--ec-surface-base);
```

Do not add a gray global page background.

The gray visible outside the Figma frame is the Figma editor canvas and is NOT part of the website.

---

# 44. FIGMA FRAME VS WEBSITE

Important:

Do not reproduce:

- Figma blue/purple selection borders
- editor gray background
- developer handoff controls
- rulers
- frame outlines
- Figma UI

Only reproduce the website itself.

---

# 45. DESKTOP TARGET

Use the supplied Figma screenshot as the current reference for a desktop layout around approximately:

```text
1440px design frame
```

The website must nevertheless remain fluid.

Do not make the application fixed at 1440px.

---

# 46. VISUAL CHECKLIST

Before finishing, compare the result against the Figma reference.

Verify:

### Logo
- [ ] centered
- [ ] 32px
- [ ] 120% line-height
- [ ] -2% tracking
- [ ] Roboto Condensed
- [ ] green EVEREST
- [ ] dark CHRONICLE
- [ ] triangular green mark

### Navigation
- [ ] 18px
- [ ] 120% line-height
- [ ] Roboto Condensed
- [ ] Text/Default/Weak
- [ ] restrained weight
- [ ] correct spacing
- [ ] starts at left content grid

### Search
- [ ] positioned right
- [ ] compact
- [ ] subtle border
- [ ] pale brand search action
- [ ] dark search icon

### Dropdown
- [ ] Media opens menu
- [ ] Dataviz
- [ ] 3D
- [ ] Video
- [ ] Photography
- [ ] white surface
- [ ] subtle shadow
- [ ] compact width
- [ ] keyboard accessible

### Overall
- [ ] clean
- [ ] editorial
- [ ] no excessive radius
- [ ] no heavy shadow
- [ ] no SaaS-style treatment
- [ ] no random colors
- [ ] uses semantic variables

---

# 47. CODE QUALITY

After implementation:

1. Run TypeScript checks if available.
2. Run ESLint if configured.
3. Run build if practical.
4. Fix errors introduced by this work.
5. Check desktop header at common widths.
6. Ensure dropdown does not cause layout shift.
7. Ensure menu remains accessible.
8. Ensure no hydration errors are introduced.

---

# 48. DO NOT OVER-ENGINEER

Do not build:

- mega menu infrastructure
- CMS
- global search backend
- animation system
- complex state manager
- mobile drawer system
- full homepage redesign

unless it already exists and only needs integration.

This phase establishes the Figma-based design foundation and desktop header.

---

# 49. EXPECTED RESULT

After completing this task, the existing Next.js project should have:

1. Everest Chronicle Figma design tokens
2. correct brand and body font variables
3. reusable site container
4. accurate centered Everest Chronicle logo
5. accurate desktop navigation
6. accessible Media dropdown
7. accurate search area
8. responsive structural foundation
9. clean reusable code
10. unchanged unrelated functionality

The result should visually feel like the supplied Figma design, not an interpretation or redesign.

---

# FINAL IMPLEMENTATION INSTRUCTION

First inspect the existing codebase.

Then implement the minimum clean set of changes needed to reproduce the Figma design system and header/navigation accurately.

Do not just explain what should be done.

Actually modify the existing files.

At the end, report:

1. files created
2. files modified
3. key implementation decisions
4. any font asset that is still missing
5. any Figma value that could not be determined exactly
6. build/lint/typecheck status

Do not claim pixel-perfect accuracy for values that were not explicitly available in the Figma screenshots.
