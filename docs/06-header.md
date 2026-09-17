# Everest Chronicle — Step 06
# Header and Navigation

Recreate the Figma header.

## Desktop Structure

- Centered Everest Chronicle wordmark/logo area near the top center
- Navigation row with:
  - Expeditions
  - Environment
  - Conservation
  - Travel
  - Media
- Search box aligned to the right
- Media opens a dropdown containing:
  - Dataviz
  - 3D
  - Video
  - Photography

## Visual Rules

- White background
- Thin divider/border along the lower edge
- Minimal or no shadow
- Dark text
- Brand green used in the logo/accent
- Compact navigation spacing

## Components

Implement:

```text
components/layout/Header.tsx
components/layout/Navigation.tsx
components/layout/MediaDropdown.tsx
components/ui/SearchBox.tsx
```

Only interactive pieces should be client components.

## Responsive Behavior

Desktop:
- full navigation
- search visible

Tablet/mobile:
- collapse navigation to a compact menu trigger
- maintain logo visibility
- do not simply shrink desktop navigation until it overflows

Use accessible buttons and keyboard navigation for the dropdown/menu.
