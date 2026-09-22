# UI Standards & Modal Guidelines

## 1. Modal & Overlay Backdrop Styling
- **Tailwind Frosted Glass Blur Backdrop**: Always use the blurred backdrop for modals and overlays:
  ```css
  background-color: rgba(15, 23, 42, 0.5); /* Semi-transparent dark overlay */
  backdrop-filter: blur(12px);             /* Tailwind backdrop-blur-md frosted effect */
  -webkit-backdrop-filter: blur(12px);
  ```

## 2. Strict Border-Radius Rule: Maximum 4px
- **Strict Limit**: The border-radius across modals, inputs, buttons, cards, suggestion pills, author avatars, and thumbnails must be **4px maximum** (`var(--radius)` or `4px`).
- **Never use larger radii**: Do not use `6px`, `8px`, `12px`, `16px`, `50%`, or full-pill `9999px` rounded corners.
- Keep the crisp, editorial, square-leaning aesthetic of Everest Chronicle.

## 3. Input Fields: No Hover, Focus, or Active State Effects
- **Strict Standard**: Input fields must have **NO** hover, focus, active, or transition effects.
- Maintain a completely unchanged, static visual appearance across all interaction states:
  - `outline: none !important;`
  - `box-shadow: none !important;`
  - Border color, background color, and dimensions must remain identical on `:hover`, `:focus`, and `:active` as their default state.
  - Do not add glow rings, color highlights, or scale shifts when focused or hovered.
