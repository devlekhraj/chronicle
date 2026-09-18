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
