# Everest Chronicle — Step 14
# Final Figma Refinement

Refine the homepage against the supplied Figma references.

## Goals

Improve visual fidelity without sacrificing maintainability.

## Compare

Check:
- overall container width
- header height
- logo size/position
- navigation spacing
- search dimensions
- hero proportions
- section gaps
- image aspect ratios
- card spacing
- font sizes
- font weights
- line heights
- tag dimensions
- Latest sidebar alignment
- newsletter width
- footer spacing

## Rules

- Prefer design tokens over arbitrary repeated values.
- A one-off arbitrary Tailwind value is acceptable if the Figma requires it and it does not belong in the shared token system.
- Do not add decorative styles absent from the Figma.
- Do not introduce heavy shadows, excessive border radius, gradients, or oversized UI controls.

## Quality Checks

Run:

```bash
npm run lint
npm run build
```

Check browser console for warnings/errors.

Ensure:
- semantic HTML
- keyboard-accessible navigation
- correct heading hierarchy
- optimized images
- no hydration warnings
- no layout overflow
