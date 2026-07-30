# GitHub Activity Heatmap Refinement

## Context

Polish pass on the just-built GitHub Activity card: remove the horizontal
scrollbar, add a legend, richer tooltip, centralized level logic, and
accessibility labels.

## Key finding: the current `level` field must be replaced, not reused

`ContributionDay.level` is currently populated directly by the third-party
API (`jogruber.de`), which computes levels using GitHub's own internal
**quantile/relative** scheme (relative to that user's own contribution
distribution) - not the **fixed absolute thresholds** this request specifies
(1-3, 4-7, 8-12, 13+). Reusing the API's own value would silently
contradict the new legend/tooltip text. Fix: stop trusting the API's
`level`, compute it ourselves from the raw `count` via the new centralized
function - this is what "avoid duplicated threshold logic" implies anyway.

## New file: `lib/contribution-level.ts`

Single source of truth, pure functions, no React/JSX (matches `lib/`'s
"pure functions, formatting utilities" role - color-class/label mapping
doesn't belong in `lib/github.ts`, which is specifically the API-client file):

```ts
export enum ContributionLevel { None, Low, Moderate, High, VeryHigh }

// One array both getContributionLevel() and the legend's range text read
// from - the actual "no duplicated thresholds" mechanism.
const LEVEL_THRESHOLDS: { level: ContributionLevel; min: number; max: number }[]

export function getContributionLevel(count: number): ContributionLevel
export function getContributionColor(level: ContributionLevel): string   // Tailwind class, bg-primary opacity ramp
export function getContributionLabel(level: ContributionLevel): string   // "None"/"Low"/"Moderate"/"High"/"Very High"
export function getContributionRangeLabel(level: ContributionLevel): string // "1-3 contributions", for the legend
```

`lib/github.ts`'s `ContributionDay` drops `level` entirely (dead weight once
nothing trusts it) - `ContributionHeatmap`/tooltip/legend all call
`getContributionLevel(day.count)` themselves.

## 1. No horizontal scrollbar - measure-and-scale, not `overflow-x-auto`

Replace the current `overflow-x-auto` wrapper with a measure-and-transform
approach: an outer wrapper (`ResizeObserver`-tracked, explicit `width: 100%`)
containing an inner grid rendered at its **natural** size, scaled down via
`transform: scale(ratio)` (`ratio = min(1, containerWidth / naturalWidth)`,
`transform-origin: top left`) whenever the natural width exceeds the
container. The outer wrapper's `height` is set explicitly to
`naturalHeight * ratio` so shrinking the content doesn't leave blank space
below it. This preserves square cells (uniform scale, not a stretch) and
never crops a week/month (everything shrinks, nothing clips) - satisfying
both explicit constraints. `useLayoutEffect` for the initial measurement,
to minimize (not fully eliminate - first paint is server-rendered before
any JS runs) the flash of natural-size content before the correct scale
applies.

## 2. Legend - new `components/sections/overview/ContributionLegend.tsx`

"Less [swatch x5] More", each swatch using `getContributionColor(level)` and
carrying an `aria-label` from `getContributionLabel()` +
`getContributionRangeLabel()`.

## 3. Tooltip - multi-line, sourced from the same helpers

Date / count / "Contribution Level: {label}" as three stacked lines
(replacing the current single-line pill), still CSS-only reveal (no new
per-cell state).

## 5. Accessibility

Each cell becomes `role="img"` with an `aria-label` combining date, count,
and level (screen-reader-discoverable without requiring hover) - not made
individually keyboard-focusable, since 365 tab stops would be its own
accessibility problem; this matches how dense data-grid visualizations
(including GitHub's own graph) are typically labeled. The heatmap container
also gets a summary `aria-label` ("GitHub contribution graph, N
contributions in the past year").

## Files Affected

- `lib/contribution-level.ts` - new
- `lib/github.ts` - `ContributionDay` drops `level`
- `components/sections/overview/ContributionHeatmap.tsx` - scaling mechanism, new tooltip, aria labels, uses centralized helpers
- `components/sections/overview/ContributionLegend.tsx` - new
- `components/sections/overview/GitHubActivityCard.tsx` - renders the legend under the heatmap

## Acceptance Criteria

- Given any viewport width, the heatmap never shows a horizontal scrollbar and every week/month stays visible (shrunk, not cropped).
- Given a cell's raw count, its color/tooltip label/legend text all agree (same thresholds, one source).
- Given a screen reader browsing the heatmap, each cell announces date + count + level without needing hover.

## Validation Plan

`npm run lint`, `npm run build`; CDP check at a few viewport widths confirming no scrollbar and cells stay square; verify tooltip's 3-line content and legend swatch colors match; confirm `aria-label`s are present.
