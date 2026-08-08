# GitHub / Portfolio Assistant Dashboard Layout Refactor

## Context

The Overview section's dashboard grid currently renders four equal-ish cards
(GitHub Activity, Ask My Portfolio, Current Position, Quick Facts) in a
`sm:grid-cols-2 sm:auto-rows-fr` grid, which forces every card in a row to
match the tallest one. The user wants a restructured 2-column layout where
Ask My Portfolio becomes a full-height visual anchor spanning both rows of
the left column (GitHub Activity + Quick Facts stacked), Current Position is
removed, and the chat's message area grows to fill the extra vertical space
instead of staying at a small fixed height.

Separately, the GitHub contribution heatmap's hover tooltip is currently
clipped: hovering a cell (especially near the grid's top/left/right edges)
can hide part or all of the tooltip.

## Goals

- Left column stacks GitHub Activity above Quick Facts; right column is Ask
  My Portfolio, spanning the full combined height of both left cards.
- Current Position card is removed from the Overview section (component
  deleted, not just unlinked).
- Quick Facts content is not duplicated anywhere else.
- The chat's message list fills the available vertical space on desktop
  (header fixed, input fixed, messages `flex-1` + independently scrollable),
  while staying reasonably bounded (not "excessively tall") on mobile.
- Mobile collapses to a single column in the order: GitHub Activity → Ask My
  Portfolio → Quick Facts.
- The heatmap's per-cell tooltip is never clipped by any ancestor's
  `overflow`/stacking context, appears above the hovered cell (flipping
  below only if there isn't room), stays inside the viewport horizontally,
  and works identically for 0-contribution cells.
- No visual regressions to existing GitHub Activity or chat functionality.

## Architecture

Both changes are scoped entirely inside `components/sections/overview/` and
`components/sections/Hero.tsx`; no changes to routing, data fetching
(`lib/github.ts`), or the portfolio-assistant matching logic.

**Grid restructure.** `Hero.tsx`'s dashboard grid drops `sm:auto-rows-fr` in
favor of default `grid-auto-rows: auto` (Tailwind's plain `grid`). With the
grid at `grid-cols-1 sm:grid-cols-2 gap-6` and children in DOM order
`[GitHubActivityCard, AskMeCard (sm:row-span-2), QuickFactsCard]`, CSS
Grid's auto-placement algorithm naturally produces exactly the requested
layout with no explicit line numbers:
- `GitHubActivityCard` → row 1, col 1 (first free cell)
- `AskMeCard` (`row-span-2`) → row 1–2, col 2 (next free cell, spans down)
- `QuickFactsCard` → row 2, col 1 (next free cell, since col 2/row 1 is taken)

On mobile (`grid-cols-1`), the same DOM order collapses to a single column
in exactly the requested stacking order — no separate mobile-only markup
needed. The spanning `AskMeCard` cell's height is, by CSS Grid definition,
the union of row 1 + gap + row 2 (i.e. GitHub Activity + gap + Quick Facts),
so giving its `Card` `h-full` (already the case) makes it stretch to fill
exactly that combined height with no manual height math.

**Chat message area.** Because `AskMeCard` no longer shares a single grid
*row* with a sibling under `auto-rows-fr` (it owns its own spanning cell),
the earlier hard requirement for a *fixed* message-list height no longer
applies. `ChatMessageList`'s scroll region switches from `h-64` to `flex-1`
so it fills whatever height the card ends up with, with a `min-h-64
max-h-[28rem] sm:min-h-0 sm:max-h-none` bound so mobile (where the card
isn't row-spanning and would otherwise size to intrinsic content) stays
reasonably bounded rather than growing unbounded or collapsing to near-zero.

**Tooltip clipping root cause.** `ContributionHeatmap.tsx`'s
`containerRef` wrapper div is `w-full overflow-hidden` with an explicit
pixel `height` exactly matching the scaled grid's natural size (the
measure-and-scale-to-fit-width technique) — there is zero slack for
anything to overflow that box, and `overflow-hidden` actively clips
whatever tries. Its sibling `contentRef` div also has `transform:
scale(...)`, which per the CSS spec makes that element the *containing
block* for any `position: fixed` descendant too, not just `absolute` — so
even switching the tooltip to `position: fixed` in place wouldn't escape,
it would just be fixed relative to the scaled/scrolled grid instead of the
viewport. The correct fix (and what the task explicitly asks for) is a
portal to `document.body`, positioned from the hovered cell's
`getBoundingClientRect()` — this sidesteps every ancestor's overflow and
stacking context in one move rather than patching each one.

## Files Affected

- `components/sections/Hero.tsx` — modified: grid restructure, drop
  `CurrentPositionCard`, add `sm:row-span-2` to the `AskMeCard` `Reveal`.
- `components/sections/overview/CurrentPositionCard.tsx` — deleted (no
  other references in the codebase).
- `components/sections/overview/ChatMessageList.tsx` — modified: message
  region `h-64` → `flex-1 min-h-64 max-h-[28rem] overflow-y-auto
  sm:min-h-0 sm:max-h-none`.
- `components/sections/overview/ContributionHeatmap.tsx` — modified:
  replace the CSS `group-hover` tooltip block with hover-tracked state
  (`{ day, level, rect } | null`) driving a portaled `HeatmapTooltip`;
  remove the now-dead `tooltipCounterScale` logic; swap cell
  `whileHover`/CSS `group` for Motion's `onHoverStart`/`onHoverEnd` (these
  correctly ignore touch, unlike raw CSS `:hover`); add a `window` scroll
  listener that clears the hovered cell (prevents a `position: fixed`
  tooltip drifting out of alignment if the page scrolls mid-hover).
- `components/sections/overview/HeatmapTooltip.tsx` — new: portaled
  (`createPortal` to `document.body`) tooltip, `position: fixed`, computed
  from the passed `DOMRect`, clamped to the viewport on both axes
  (horizontal clamp always; vertical flips below the cell if there isn't
  room above), `z-[100]`, reusing the existing `bg-popover` /
  `text-popover-foreground` / `border-border` / `shadow-md` tokens
  (no new colors), short opacity fade (~150ms ease-out, matching the
  `ui-animation` skill's tooltip timing).
- `lib/contribution-level.ts` — modified: add `formatContributionDate`
  (moved out of `ContributionHeatmap.tsx`, where it's currently a private
  helper) so both `ContributionHeatmap` (cell `aria-label`) and the new
  `HeatmapTooltip` share one implementation instead of duplicating it.

## Implementation Steps

1. Delete `CurrentPositionCard.tsx`.
2. Update `Hero.tsx`: remove the `CurrentPositionCard` import/usage, drop
   `sm:auto-rows-fr` from the grid className, reorder children to
   `[GitHubActivityCard, AskMeCard, QuickFactsCard]`, add `sm:row-span-2`
   to the `AskMeCard` `Reveal`'s className (alongside its existing
   `h-full`).
3. Update `ChatMessageList.tsx`'s scroll-region className as described
   above; update its explanatory comment (the old one references
   `auto-rows-fr`, which no longer governs this card).
4. Move `formatFullDate` from `ContributionHeatmap.tsx` into
   `lib/contribution-level.ts` as `formatContributionDate`; update the
   import site.
5. Create `HeatmapTooltip.tsx` implementing the portal + viewport-clamped
   positioning described above.
6. Update `ContributionHeatmap.tsx`: add hover state, wire
   `onHoverStart`/`onHoverEnd` on each cell's `motion.div` (capturing
   `event.target`'s `getBoundingClientRect()`), add the dismiss-on-scroll
   listener, render `<HeatmapTooltip />` conditionally when a cell is
   hovered, delete the old inline tooltip markup and
   `tooltipCounterScale`.
7. Run `npm run lint` and `npm run build`.
8. CDP-based visual/functional verification (see Validation Plan).

## Acceptance Criteria

- Given desktop width, when the Overview section renders, then the layout
  is GitHub Activity (top-left) / Quick Facts (bottom-left) / Ask My
  Portfolio (full-height right column spanning both rows).
- Given desktop width, when Ask My Portfolio's height is measured, then it
  equals GitHub Activity's height + the grid gap + Quick Facts's height
  (within a few px of animation/rounding slack).
- Given the chat card, when its message list is inspected, then it uses
  `flex-1` and independently scrolls, with header and input pinned.
- Given mobile width, when the Overview section renders, then cards stack
  in order GitHub Activity → Ask My Portfolio → Quick Facts, and the chat's
  message area is bounded (not unbounded growth).
- Given the codebase, when searched, then `CurrentPositionCard` no longer
  exists and "Quick Facts" content appears in exactly one place.
- Given any heatmap cell (including 0-contribution days) near any edge of
  the GitHub Activity card, when hovered, then the tooltip is fully
  visible, positioned above the cell (or below if flipped), never clipped,
  and never overflows the viewport horizontally.
- Given `prefers-reduced-motion`, when the tooltip appears, then it still
  functions (per this codebase's established precedent of exempting small
  hover/feedback affordances from the reduced-motion gate, same as `Card`'s
  hover lift).

## Validation Plan

- `npm run lint` — zero new errors/warnings.
- `npm run build` — succeeds, strict TypeScript clean.
- CDP-based manual verification (headless Edge, matching this session's
  established methodology):
  - Desktop: screenshot the Overview grid; measure `GitHubActivityCard`,
    `QuickFactsCard`, and `AskMeCard` bounding rects to confirm the
    height-sum relationship.
  - Mobile (~390px): screenshot; confirm stacking order and no horizontal
    overflow.
  - Hover a cell in the top row and a cell near the right edge of the
    heatmap; screenshot with the tooltip open; confirm it's fully within
    the viewport and not clipped by the card boundary.
  - Confirm chat send/receive still works and auto-scrolls correctly at
    the new taller height.
  - Confirm no console errors.

## Post-Implementation Amendment

After initial implementation and CDP verification, two follow-up issues
surfaced and were fixed within this same task:

1. **Chat card height grew with conversation length.** The CSS-only
   `sm:row-span-2` approach (rows sized `auto`) turned out to be circular:
   a spanning item's own content height feeds back into how tall the auto
   rows it spans become, so a long conversation inflated GitHub Activity
   and Quick Facts right along with the chat card. Fixed by replacing the
   flat CSS grid with a new client component, `DashboardGrid.tsx`, which
   measures the left column's real rendered height (GitHub Activity + gap
   + Quick Facts) via `ResizeObserver` and applies it as an explicit pixel
   `height` to the Ask My Portfolio cell - the same measure-then-constrain
   technique already used in `ContributionHeatmap`'s scale-to-fit. This
   fully decouples the chat's height from its own content; verified by
   sending 8 message exchanges and confirming all three card heights stay
   pixel-identical before and after.
2. **Heatmap color changed from monochrome to green**, per explicit
   request, to read as a recognizable GitHub-style contribution graph
   rather than grayscale. `lib/contribution-level.ts`'s
   `LEVEL_COLOR_CLASSES` now ramps `bg-green-500` by opacity (25/50/75/100%)
   instead of the theme's neutral `--primary` token. This is intentionally
   scoped to just the heatmap, not a site-wide accent-color change -
   `--primary` stays the established neutral black/white.

## Risks

- CSS Grid auto-placement relying on DOM order is elegant but implicit —
  if a future edit reorders the children in `Hero.tsx` without
  understanding this, the layout breaks silently. Documented via a code
  comment at the grid.
- The scroll-dismiss listener for the tooltip is a small UX simplification
  (closes rather than re-tracks position on scroll); this is standard
  practice for portaled tooltips and avoids a more complex live-reposition
  implementation that isn't asked for.
- `max-h-[28rem]` on mobile is a judgment call for "reasonable"; easy to
  adjust after visual review if it reads too short/tall.
