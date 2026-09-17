# Everest Chronicle — Step 05
# Layout, Container, Grid, and Spacing

Build the shared layout system from the 1440px Figma homepage frame.

## Desktop Frame

The Figma homepage frame is 1440px wide.

The visible content area should remain centered with generous side margins and a maximum width around 1260–1280px.

## Shared Container

Implement a reusable `Container` component:

```tsx
import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1268px] px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
```

## Spacing Tokens

Add:

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
}
```

## Main Layout Patterns

Hero desktop:
- left story content roughly 32%
- right image roughly 68%

Featured row desktop:
- image roughly 30%
- feature story roughly 44%
- latest sidebar roughly 26%

Category grids:
- 3 columns desktop
- 2 columns tablet where appropriate
- 1 column mobile

Shorts:
- 5 visible vertical cards on large desktop
- horizontal overflow/scroll on smaller viewports if needed

## Section Rhythm

Use substantial vertical separation between category sections. Avoid cramped stacking.

Do not hardcode widths on every child. Prefer grid/flex rules and reusable layout primitives.
