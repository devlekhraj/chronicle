# Everest Chronicle — Step 13
# Responsive Homepage

Make the homepage responsive while preserving the editorial hierarchy.

## Breakpoint Strategy

Use Tailwind defaults unless a real design requirement forces a custom breakpoint.

## Mobile Priorities

- Header becomes compact navigation
- Hero stacks vertically
- Featured row stacks vertically
- Latest sidebar moves below content
- Category grids become 1 column
- Shorts become horizontally scrollable
- Newsletter input/button can stack if needed
- Footer columns stack

## Tablet Priorities

- Use 2-column article grids where space allows
- keep readable line lengths
- do not simply scale desktop down

## Typography

Hero/article titles should scale responsively, for example:

```text
mobile 33px
small/medium 40px
large 48px
```

## Images

Preserve consistent aspect ratios. Avoid layout shift.

## Testing

Check at minimum:
- 375px
- 430px
- 768px
- 1024px
- 1280px
- 1440px
