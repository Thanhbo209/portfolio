# Interactive Global Particle Background

## Context

New global, fullscreen canvas particle background sitting behind the entire
site, persisting across every section and the `/resume` route. Fully
specified by the request (constants, behavior, structure); this plan covers
the decisions left open — exact values within given ranges, file/mount
structure, theme-change detection, and how the canvas stacks with existing
`z-40`/`z-30` chrome (Sidebar/MobileNavDrawer).

## Architecture

- `components/background/InteractiveParticles.tsx` — new folder, matching
  the requested path exactly (a "background" layer is a distinct concern
  from `ui/layout/sections`, and the request names this path explicitly).
- Mounted in `app/layout.tsx`, inside `<body>`, as the first child **before**
  `ThemeProvider`/`NavigationProvider`/`main` — a sibling to everything else,
  never inside the scrolling content flow, so it can never remount on the
  one client-side navigation this site has (`/` ↔ `/resume`) or on scroll.
- `"use client"` (canvas, `rAF`, mouse listeners can't run server-side); no
  SSR output beyond an empty `<canvas>` — all setup happens in `useEffect`.
- Stacking: `fixed inset-0 -z-10 pointer-events-none` — negative z-index is
  the only way to guarantee it sits behind normal-flow content given the
  existing chrome uses `z-40`/`z-30` (Sidebar/MobileNavDrawer); `0` or unset
  wouldn't reliably lose to those.

## Rendering approach

- Particles are a plain array of mutable objects (`{x, y, opacity,
  targetOpacity, radius, targetRadius}`), created once per grid generation,
  mutated in place every frame — never reallocated in the animation loop.
- Color: read once per theme change (not per particle/frame) via
  `getComputedStyle(document.documentElement).getPropertyValue('--particle-color')`,
  cached in a ref. Opacity is applied via canvas's own `ctx.globalAlpha` per
  particle draw call instead of building an `rgba(...)` string per particle
  per frame — same visual result, zero string allocation in the hot path.
- Theme-change detection: a `MutationObserver` on `document.documentElement`'s
  `class` attribute (next-themes toggles `.dark` there) — re-reads the CSS
  variable when it fires. Keeps `InteractiveParticles` fully independent of
  `useTheme()`/React context, matching the "mount once in body, don't couple
  to the app tree" spirit of the request.
- "Only draw visible particles": since the grid is generated to exactly fill
  the viewport (fixed, never scrolls, never larger than the screen), every
  generated particle is already on-screen by construction — there's no
  off-screen culling to do beyond this.
- Glow: `ctx.shadowBlur`/`ctx.shadowColor` applied only to particles whose
  current opacity is above idle (i.e., actually near the cursor) — applying
  shadow to all particles every frame would be the one place this could
  actually cost real frame time, so it's gated to the small subset that
  needs it.
- Flicker: a tiny per-frame random jitter added only at draw time (`opacity +
  noise`), never written back into the particle's stored `opacity` — keeps
  the interpolation stable and prevents drift.

## Constants (within the request's given ranges)

```ts
GRID_SPACING = 32        // px, requested 24-36
INTERACTION_RADIUS = 160 // px, cursor influence radius
FADE_SPEED = 0.08        // exact value requested
MIN_OPACITY = 0.05       // exact value requested (idle)
MAX_OPACITY = 0.6        // within requested 0.45-0.8
MIN_RADIUS = 1.2         // exact value requested
MAX_RADIUS = 2.5         // exact value requested
FLICKER_AMOUNT = 0.02    // subtle, applied only at draw time
```

## Reduced motion

`prefers-reduced-motion: reduce` (checked on mount + listened for changes,
matching the existing pattern in `components/ui/Reveal.tsx`): skips the
mouse-tracking/interpolation loop and the flicker entirely, drawing the grid
once at `MIN_OPACITY`/`MIN_RADIUS` with no `rAF` loop running at all.

## New token

`app/globals.css` — one new pair, matching the current (reverted)
grayscale/black-white palette rather than introducing a new hue:

```css
:root { --particle-color: oklch(0.145 0 0); }   /* = current --foreground */
.dark { --particle-color: oklch(0.985 0 0); }   /* = current --foreground */
```

## Files Affected

- `components/background/InteractiveParticles.tsx` — new
- `app/layout.tsx` — mount it in `<body>`
- `app/globals.css` — add `--particle-color` (light + dark)

## Acceptance Criteria

- Given any page load or navigation to `/resume` and back, the canvas never
  remounts or flickers/resets.
- Given the mouse is idle, dots sit at ~0.05 opacity, essentially invisible.
- Given the mouse moves near a cluster of dots, they brighten and enlarge
  smoothly (no instant pop), and fade back out smoothly once the cursor moves away.
- Given `prefers-reduced-motion: reduce`, dots render statically at idle
  opacity with no animation loop running.
- Given the OS/browser theme toggles, particle color updates without a
  reload.
- Given a resize, the grid regenerates (throttled), not on every pixel of
  the resize.
- No React state updates occur per animation frame.

## Validation Plan

- `npm run lint`, `npm run build`.
- Manual + CDP check: confirm canvas exists once in the DOM, confirm
  `z-index`/`pointer-events` don't block clicks on content or the sidebar,
  confirm no console errors, confirm reduced-motion path renders statically.
- Rough frame-rate sanity check via DevTools while moving the mouse.

## Risks

- Canvas 2D `fillStyle` accepting an `oklch()` string directly depends on
  browser support (broadly available in current evergreen browsers this
  site already targets); if a target browser doesn't resolve it, the
  fallback is reading the *resolved* computed color instead of the raw
  variable — noted here in case a visual check surfaces it.
