# GitHub Activity Dashboard Redesign

## Context

Redesign `GitHubActivityCard` into a premium dashboard-quality card, per a
detailed brief. Per the user's explicit choice, the new Commits/PRs/Reviews/
Issues breakdown is sourced from GitHub's GraphQL API with a real Personal
Access Token, not approximated or fabricated.

## Data layer (new)

- `lib/github.ts` — new `getContributionBreakdown()`:
  - POSTs to `https://api.github.com/graphql` with
    `Authorization: Bearer ${process.env.GITHUB_TOKEN}`, querying
    `user(login) { contributionsCollection(from, to) { totalCommitContributions,
    totalPullRequestContributions, totalPullRequestReviewContributions,
    totalIssueContributions } }`, with `from`/`to` set to a rolling
    365-day window (matching the existing calendar's `?y=last` framing).
  - Server-only (`GITHUB_TOKEN` has no `NEXT_PUBLIC_` prefix, never bundled
    client-side) — fits the existing async-Server-Component pattern.
  - Returns `null` on any failure (missing token, network error, bad
    response) — same defensive pattern as the two existing functions —
    so the UI can gracefully omit the stats row/distribution bar rather
    than break the page if the token isn't configured yet.
- `.env.example` — new, documents `GITHUB_TOKEN=` with a one-line comment
  (classic PAT, no special scopes needed to read a user's own public
  contribution data). `.env*` is already gitignored.

## Color mapping (no new tokens, per your constraint)

Current tokens are pure black/white plus `--destructive` (red) and
`--chart-1..5` (an already-defined, currently-unused blue-family scale
meant exactly for this kind of data-differentiation use case):

- Heatmap cell intensity: `bg-muted` (empty) → `bg-primary/20` → `/45` →
  `/70` → `bg-primary` (levels 1-4) — a monochrome ramp, not GitHub green.
  In the current black/white palette this reads as a grayscale heatmap,
  which is a legitimate, common "minimal dashboard" treatment, not a
  compromise.
- Stat tiles' small color indicators + distribution bar segments: `chart-1`
  (Commits) / `chart-2` (Pull Requests) / `chart-3` (Reviews) / `chart-4`
  (Issues) — reuses tokens that already exist for exactly this purpose,
  introduces nothing new, and keeps the four categories visually
  distinguishable without rainbow colors.

## Componentization (flat files, matching `components/sections/about/`'s pattern)

- `components/sections/overview/GitHubActivityCard.tsx` — rewritten:
  async Server Component, fetches all three (stats/calendar/breakdown),
  composes the header, divider, and the three new sub-components below
  inside the existing shared `Card`.
- `components/sections/overview/ContributionHeatmap.tsx` — new, Client
  Component: month labels, grid, per-cell hover (scale + brightness) and
  hover tooltip, staggered reveal.
- `components/sections/overview/ActivityStatsRow.tsx` — new: the four
  stat tiles (indicator, label, count, percentage of the four categories'
  combined total).
- `components/sections/overview/ContributionDistributionBar.tsx` — new,
  Client Component: segmented bar, animated width on reveal.

## Motion choreography

- Card entrance: existing `Reveal` (unchanged, already wraps this card
  from `Hero.tsx`).
- Header: a short, slightly-delayed fade-up nested inside the card
  (`fadeUp`, small delay) so it visibly precedes the heatmap rather than
  arriving in the same instant as the whole card.
- Heatmap: staggered by **week column**, not by individual day — 365
  individually-staggered cells would take an impractically long time
  even at a tiny per-item delay (365 × 0.08s ≈ 29s using the existing
  default `staggerContainer`). Staggering the ~52 week-columns instead,
  with a much smaller explicit `staggerChildren` (~0.01s) than the shared
  default, finishes in about half a second — "very fast, not
  distracting," matching the brief, while still reading as a wave sweeping
  across the grid.
- Cell hover: `whileHover={{ scale: 1.3 }}` (Motion) + `hover:brightness-125`
  (CSS) for the brightness bump; the tooltip itself is a plain CSS
  `opacity-0 group-hover:opacity-100` reveal (content is static, already
  in the DOM) rather than React state per cell — 365 `useState` calls
  would be real, avoidable overhead for a hover reveal CSS already handles.
- Distribution bar: each segment's `width` animates from `0%` to its real
  percentage via Motion's `whileInView`, once.
- All of the above respects `prefers-reduced-motion` the same way the rest
  of the site already does: `Reveal`'s existing reduced-motion handling
  covers the card/header/bar entrances; hover-triggered motion (cell scale)
  stays live regardless of the OS setting, consistent with the site-wide
  decision from the Motion refactor (hover feedback ≠ the kind of motion
  `prefers-reduced-motion` is meant to suppress; only ambient/entrance
  travel is gated).

## Layout

- `Card` gets a `p-6 sm:p-8` override for "generous padding," reusing the
  existing shared component (already Motion-enabled with `hoverLift`) —
  no new Card variant.
- Header: icon + "GitHub Activity" left; total contributions (large, bold)
  + "past year" (small, muted) right; `border-t border-border` divider
  below.
- Heatmap centered via `flex justify-center` on larger screens; existing
  `overflow-x-auto` kept for mobile horizontal scroll, so nothing about
  the current mobile behavior regresses.
- Stats row: responsive grid, `grid-cols-2` below `sm:`, `sm:grid-cols-4`
  at and above, matching the pattern already used for Quick Stats in the
  About section.

## Files Affected

- `lib/github.ts` — add `getContributionBreakdown()`
- `.env.example` — new
- `components/sections/overview/GitHubActivityCard.tsx` — rewritten
- `components/sections/overview/ContributionHeatmap.tsx` — new
- `components/sections/overview/ActivityStatsRow.tsx` — new
- `components/sections/overview/ContributionDistributionBar.tsx` — new

## Acceptance Criteria

- Given `GITHUB_TOKEN` is unset, the card still renders correctly (header,
  heatmap, profile link) with the stats row/distribution bar gracefully
  omitted — no crash, no broken layout.
- Given the token is set, stats show real counts and percentages that sum
  to 100% across the four categories.
- Given a cell hover, the cell scales/brightens and its tooltip (real date
  + count) appears; given `prefers-reduced-motion`, the heatmap/header/bar
  entrance skip their travel but hover feedback still works.
- Given mobile width, the heatmap scrolls horizontally without shifting
  the rest of the card's layout.
- No hardcoded colors outside existing tokens (`bg-primary`, `chart-1..4`,
  `bg-muted`, `border-border`, `text-muted-foreground`, `text-foreground`).

## Validation Plan

- `npm run lint`, `npm run build` (with and without `GITHUB_TOKEN` set, to
  confirm the graceful-omission path doesn't break the build).
- CDP check: hover a cell and confirm scale/tooltip, confirm stagger timing
  feels fast (not 29 seconds!), confirm reduced-motion still allows hover,
  confirm no console errors, screenshot both themes.

## Risks

- GitHub's GraphQL API requires the token to be generated and added to
  `.env.local` before the stats row will show real data — until then the
  card degrades gracefully rather than looking broken, but the "premium
  dashboard" stats/bar won't be visible without it.
- A classic PAT with zero scopes should suffice for reading a user's own
  public `contributionsCollection`, but if GitHub requires a minimal scope
  in practice, that surfaces immediately as a 401/403 from the graceful
  error path (returns `null`, logs server-side) rather than crashing.
