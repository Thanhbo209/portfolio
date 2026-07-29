# Sidebar Nav Hover: Sidebar-Primary Fill

## Context

`NavItem.tsx` already implements almost everything in this request from
earlier work this session (flag-shaped `.nav-highlight`, `scaleX()` +
`transform-origin: left`, 250ms `ease-out`, `motion-reduce` guards, shared
by both Sidebar and MobileNavDrawer). Auditing the current implementation
against every requirement:

| Requirement | Current state |
| --- | --- |
| Slides left-to-right, `scaleX()` + `transform-origin: left` | Already exact - `origin-left` + `scale-x-0 -> scale-x-100` |
| Triangular/flag left edge preserved | Already exact - `.nav-highlight` clip-path, untouched |
| Only the background layer moves, not icon/text | Already exact - icon/label are a separate `relative z-10` layer, highlight is a sibling `<span>` |
| Active stays filled, no replay | Already exact - `isActive` renders a static `scale-x-100`, nothing re-triggers it |
| Independent per-item hovering | Already exact - each item's highlight is scoped to its own `group` |
| Background/text/icon color transitions | Already present - `transition-colors` on the link covers text + inherited icon color together |
| 200-250ms, ease-out | Already exact - `duration-250 ease-out` |
| `prefers-reduced-motion` | Already exact - `motion-reduce:transition-none` on both the link and the highlight |
| No layout-property animation | Already exact - only `transform`/`background-color`/`color` |
| Shared in `NavItem` for both surfaces | Already exact - one component, no per-surface duplication |

**The one actual gap**: hover currently fills with `bg-sidebar-accent` /
`text-sidebar-accent-foreground`, a different color from the active
state's `bg-sidebar-primary` / `text-sidebar-primary-foreground`. Your
request asks for the hover fill itself to be `sidebar-primary` - so
hovering previews exactly the color the item will have once active,
rather than a distinct "hover-only" accent tone.

This plan changes only that: swap the two hover-only classes
(`bg-sidebar-accent` -> `bg-sidebar-primary`, `hover:text-sidebar-accent-
foreground` -> `hover:text-sidebar-primary-foreground`). Everything else
in the file is untouched because it already meets every other requirement
as built.

Scope note: this only touches `NavItem.tsx` (primary section links -
Overview, About, Experience, etc.). `ExternalLinkItem.tsx` (Resume/GitHub/
LinkedIn/Email) is a separate component with its own `sidebar-accent`
hover and isn't mentioned in this request, so it's left as-is.

## 1. Why this approach is GPU-friendly

- **`transform: scaleX()`** is a compositor-only property - the browser
  can animate it on the GPU compositing layer without triggering layout
  (`reflow`) or paint on every frame, unlike animating `width` (which
  the requirements explicitly rule out for the same reason).
- **`transform-origin: left`** is set once via the `origin-left` utility
  and doesn't change per frame, so there's no extra per-frame cost - the
  browser just scales around a fixed anchor.
- **`background-color`/`color` transitions** are cheap, paint-only
  properties (no layout impact); they're already the only other animated
  properties here, matching the skill's "movement: transform/opacity
  only; state feedback: color/background-color/opacity are acceptable"
  rule.
- The highlight `<span>` is a separate absolutely-positioned layer
  (`absolute inset-0`) behind the icon/label (`relative z-10`), so
  scaling it never causes the icon or text to reflow or repaint - exactly
  the "affects only the background layer" requirement, achieved
  structurally (two separate stacking-context layers) rather than by
  careful timing.

## 2. Files affected

- `components/layout/NavItem.tsx` - two class swaps (hover background and hover text color), nothing else.

No changes to `globals.css` (`.nav-highlight`'s clip-path is color-
agnostic), `Sidebar.tsx`, or `MobileNavDrawer.tsx` - both already consume
`NavItem` as their single source for this behavior, so they inherit the
change automatically.

## Acceptance Criteria

- Given a nav item is hovered, its highlight fills with the same `sidebar-primary` color the active state uses (not a separate accent tone).
- Given `prefers-reduced-motion: reduce`, the fill still appears/disappears but without the sliding transition.
- Given the active item is already filled, hovering a *different* item does not affect or replay the active item's highlight.

## Validation Plan

- `npm run lint` / `npm run build`.
- Manual check: hover each sidebar item (desktop) and each mobile drawer item, confirm the fill color now matches the active-state color, confirm the flag-shaped left edge and independent per-item animation still hold.
