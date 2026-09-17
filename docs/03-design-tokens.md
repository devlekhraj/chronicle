# Everest Chronicle — Step 03
# Design Tokens and Base Theme

Implement the base color system extracted from the Figma design.

## Core Colors

```text
Brand 100      #2A836A
Brand Tint     #3FC183
Yellowish Green #E4EA95
Dark 100       #141414
Light 100      #FFFFFF
Alt Light      #F4F6F6
```

## Required CSS

Add the following token system to `src/app/globals.css` after the Tailwind import:

```css
:root {
  --brand-100: #2a836a;
  --brand-75: rgb(42 131 106 / 75%);
  --brand-50: rgb(42 131 106 / 50%);
  --brand-25: rgb(42 131 106 / 25%);
  --brand-15: rgb(42 131 106 / 15%);
  --brand-10: rgb(42 131 106 / 10%);

  --brand-tint: #3fc183;
  --brand-tint-25: rgb(63 193 131 / 25%);
  --yellowish-green: #e4ea95;

  --light-100: #ffffff;
  --light-90: rgb(255 255 255 / 90%);
  --light-75: rgb(255 255 255 / 75%);
  --light-50: rgb(255 255 255 / 50%);
  --light-25: rgb(255 255 255 / 25%);
  --light-15: rgb(255 255 255 / 15%);
  --alt-light: #f4f6f6;

  --dark-100: #141414;
  --dark-90: rgb(20 20 20 / 90%);
  --dark-75: rgb(20 20 20 / 75%);
  --dark-50: rgb(20 20 20 / 50%);
  --dark-20: rgb(20 20 20 / 20%);

  --background: var(--light-100);
  --background-soft: var(--alt-light);
  --foreground: var(--dark-100);
  --text-primary: var(--dark-100);
  --text-secondary: rgb(20 20 20 / 70%);
  --text-muted: rgb(20 20 20 / 50%);
  --border: rgb(20 20 20 / 15%);
  --border-light: rgb(20 20 20 / 8%);
  --link: var(--brand-100);
  --link-hover: #216b57;
}

@theme inline {
  --color-brand: var(--brand-100);
  --color-brand-75: var(--brand-75);
  --color-brand-50: var(--brand-50);
  --color-brand-25: var(--brand-25);
  --color-brand-15: var(--brand-15);
  --color-brand-10: var(--brand-10);
  --color-brand-tint: var(--brand-tint);
  --color-brand-tint-25: var(--brand-tint-25);
  --color-yellowish-green: var(--yellowish-green);
  --color-dark: var(--dark-100);
  --color-alt-light: var(--alt-light);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-text-primary: var(--text-primary);
  --color-text-secondary: var(--text-secondary);
  --color-text-muted: var(--text-muted);
  --color-border: var(--border);
}
```

## Semantic Usage

Use semantic tokens for content roles where possible. Avoid repeating raw hex values in components.

Do not use arbitrary colors like `text-[#2A836A]` if `text-brand` can be used.

## Visual Direction

The site should remain:
- white-background editorial
- minimal shadows
- mostly square corners
- green accents
- restrained borders
- strong whitespace

Do not introduce gradients or decorative colors not present in the design.
