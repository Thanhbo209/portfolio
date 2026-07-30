# Design System & Color Refactor

## Context

Full color-system audit and refactor, requested to move the site off its
current near-pure-grayscale palette toward a "modern SaaS" identity (Linear /
Vercel / Stripe / Raycast / Supabase / GitHub-dark-redesign), while staying
professional and avoiding gradient/neon/crypto tells.

**Design read:** developer/AI-engineering portfolio, modern-SaaS language,
Tailwind v4 + the existing shadcn/ui-style CSS-variable token system (`app/
globals.css`) — extending it, not replacing it or introducing a second
theming mechanism. Per the loaded `design-taste-frontend` skill's color
section: default guidance is "max 1 accent," but that's explicitly brief-
overridable, and this brief is detailed and deliberate about wanting a
primary/secondary/support hue set with distinct purposes — so this plan
follows the brief, while keeping the skill's underlying intent (no *random*
color mixing, one locked, consistent system) fully intact.

## Audit findings (current state)

- `app/globals.css`'s entire token set is shadcn/ui boilerplate: every
  neutral-role token (`background`, `foreground`, `card`, `popover`,
  `secondary`, `muted`, `accent`, `border`, `input`, `ring`, `sidebar-*`) has
  **zero chroma** — literally grayscale OKLCH values. Only `--destructive`
  (red) and the unused `--chart-1..5` (blue family, no chart component exists
  to consume them) carry any real color.
- Light mode's `background` and `card` are the **same value**
  (`oklch(1 0 0)`) — no surface separation at all, which is likely why light
  mode reads as flat.
- Dark mode's elevation ladder (`background` → `card` → `popover`) already
  has real lightness steps (0.145 → 0.205 → 0.269) — the layering the brief
  asks for already exists structurally in dark mode, it's just fully
  achromatic. This is mostly a **retint**, not a rebuild.
- Hardcoded-color audit (`grep` across `components/app/lib/hooks/constants/
  content`) found almost nothing to fix:
  - `GitHubActivityCard.tsx` uses raw `bg-green-500/25..100` for its
    contribution-heatmap levels — the one real violation, and a natural fit
    for a new `--success` token (green = positive activity).
  - `LinkedinIcon.tsx` uses fixed brand hexes (`#0A66C2`/`#4A9EFF`) — **not**
    a violation, this is the documented, intentional exception in AGENTS.md
    §12 (fixed-brand-color marks keep their real brand color, never tokenized).
  - Nothing else sitewide uses a raw Tailwind color utility or arbitrary hex.
- Several component types in the request's checklist don't exist in this
  codebase (Tabs, Forms, Dialogs, Popover menu, Dropdown, Command palette,
  Tooltips, Skeleton, Code blocks, Tables) — noted so the audit honestly
  covers what's real: buttons/links (`MotionLink`/`MotionAnchor`/motion
  buttons), `Card`, `Badge`, Sidebar/`NavItem`/`MobileNavDrawer`, every
  section, the certifications accordion, and the timeline.

## Palette direction

One cohesive OKLCH-based system, extending the existing token names rather
than inventing a parallel set:

- **Neutrals:** warm, low-chroma gray (hue ≈75°, chroma ≈0.002–0.007 —
  enough to read as "warm charcoal"/"warm white," not enough to look tinted
  or beige). Replaces the current chroma-0 neutrals. Light mode's
  `background`/`card`/`popover` get distinct values for the first time
  (currently identical); dark mode's existing elevation steps are kept and
  just retinted warm.
- **Primary accent — Blue** (hue ≈258, matching the hue family the unused
  `--chart` tokens already use, so the new accent and the existing-but-dormant
  chart colors stay in the same family instead of introducing a second,
  disconnected hue). This *is* `--primary` — the token already consumed
  sitewide (nav active pill, primary CTA buttons, `text-primary` checkmarks),
  so retinting it is the single highest-leverage change in this plan.
- **Info accent — Indigo** (hue ≈280): new `--info`/`--info-foreground`.
  Narrow use — not introduced as a second "primary."
- **Support accent — Teal** (hue ≈195): new `--support`/`--support-foreground`.
  Narrowest use of the three, per "majority of the UI stays neutral."
- **Success — Emerald** (hue ≈152): new `--success`/`--success-foreground`.
  Used for the GitHub heatmap and the Experience "Current" badge.
- **Warning — Amber** (hue ≈80): new `--warning`/`--warning-foreground`.
  Token defined for completeness (matches the brief's semantic set); no
  forced current use if nothing genuinely warrants it today.
- **Error — Rose:** `--destructive` keeps its existing name (already
  consumed as "error/destructive" semantically) but its hue shifts from the
  current orange-red (≈27°) to a proper rose (≈15°).
- **Focus ring:** `--ring` retinted to match `--primary`'s hue, so focus
  states read as "the brand color," not a leftover gray.

Saturation stays moderate (chroma 0.10–0.20 range) — bright enough to read
as intentional color, not neon. Every accent is used **narrowly and
semantically** (nav active state, primary CTAs, status badges, focus rings,
one heatmap) — the majority of surfaces, text, and borders stay neutral, per
the brief's own "do not color everything" instruction.

## New/changed tokens (`app/globals.css`)

Full concrete OKLCH values for both themes — added as a table here so exact
numbers are reviewable before implementation, not decided ad hoc while
editing:

| Token | Light | Dark | Notes |
|---|---|---|---|
| `background` | `oklch(0.985 0.003 75)` | `oklch(0.16 0.006 75)` | warm, was pure white / achromatic charcoal |
| `foreground` | `oklch(0.145 0.004 75)` | `oklch(0.97 0.004 75)` | |
| `card` | `oklch(0.995 0.002 75)` | `oklch(0.20 0.006 75)` | now distinct from `background` in light mode (currently identical) |
| `popover` | `oklch(1 0 0)` | `oklch(0.24 0.007 75)` | topmost neutral surface |
| `primary` | `oklch(0.55 0.18 258)` | `oklch(0.62 0.17 258)` | Blue — nav active pill, primary CTAs, `text-primary` icons |
| `primary-foreground` | `oklch(0.98 0 0)` | `oklch(0.98 0 0)` | |
| `secondary` / `muted` | `oklch(0.96 0.004 75)` | `oklch(0.269 0.006 75)` | unchanged role, warmed |
| `accent` | `oklch(0.955 0.01 258)` | `oklch(0.30 0.02 258)` | subtle **blue-tinted** hover surface (was neutral gray) — small, cohesive touch |
| `destructive` | `oklch(0.58 0.20 15)` | `oklch(0.70 0.18 15)` | Rose, was orange-red |
| `success` *(new)* | `oklch(0.58 0.15 152)` | `oklch(0.68 0.15 152)` | Emerald |
| `warning` *(new)* | `oklch(0.68 0.16 80)` | `oklch(0.75 0.15 80)` | Amber |
| `info` *(new)* | `oklch(0.56 0.16 280)` | `oklch(0.68 0.15 280)` | Indigo |
| `support` *(new)* | `oklch(0.62 0.11 195)` | `oklch(0.70 0.11 195)` | Teal |
| `border` / `input` | `oklch(0.90 0.004 75)` | `oklch(0.30 0.008 75)` | warmed, softened slightly in dark |
| `ring` | `oklch(0.55 0.18 258)` | `oklch(0.62 0.17 258)` | now matches `primary` instead of neutral gray |
| `sidebar-primary` | `oklch(0.55 0.18 258)` | `oklch(0.62 0.17 258)` | fixes an existing inconsistency — today only dark mode's `sidebar-primary` had any chroma |
| `chart-1..5` | unchanged | unchanged | already in the blue/indigo family; left as-is, still unused |

(`*-foreground` pairs not listed above keep the same near-white/near-black
pattern already established, just checked for AA contrast against their new
paired background — see Validation Plan.)

## Component touch-points

- **`GitHubActivityCard.tsx`** — heatmap `LEVEL_CLASSES` migrate from raw
  `bg-green-500/*` to `--success`-based classes (e.g.
  `bg-success/25`/`/50`/`/75`/full), so the one real hardcoded-color instance
  in the codebase goes through the token system too.
- **`FeaturedExperienceCard.tsx`** — the `Badge>Current<` gets a `success`
  variant (new `Badge` variant, see below) instead of the default neutral
  badge style, since "current/active" is a natural success-semantic fit.
- **`Badge.tsx`** — add `success` (and `outline` stays as-is); not adding
  `warning`/`info` variants speculatively unless a real call site needs one
  (avoids dead variant code).
- **Focus-visible states** — spot-check interactive elements already using
  `focus-visible:ring-*` (Sidebar buttons, MobileNavDrawer) pick up the new
  `--ring` automatically since they reference the token, not a hardcoded color.
- Everything else that already routes through `--primary`/`--accent`/
  `--border`/`--muted-foreground` (Card hover, NavItem active pill, MotionLink/
  MotionAnchor buttons, all section headings, all badges) updates
  automatically from the token change alone — **no per-component edits
  needed** beyond the two above, since the architecture already put color
  behind tokens almost everywhere (confirmed by the audit above).

## What this plan does NOT do

- Does not touch Tabs/Forms/Dialogs/Dropdown/Command/Tooltip/Skeleton/Table —
  none exist in this codebase today.
- Does not recolor `LinkedinIcon.tsx` — that's the documented brand-icon
  exception (AGENTS.md §12), not a token violation.
- Does not add a 4th elevation tier (`surface-3`/floating) beyond
  `background`/`card`/`popover` — no modal/dropdown component exists yet to
  need one; the existing three-tier vocabulary already gives dark mode a real
  elevation ladder once retinted, and light mode gains one for the first time.
- Does not touch typography scale, spacing, or layout — color only, per the
  request's scope.

## Files Affected

- `app/globals.css` — full token retint + new `success`/`warning`/`info`/
  `support` tokens and their `@theme inline` registrations
- `components/sections/overview/GitHubActivityCard.tsx` — heatmap → `--success`
- `components/ui/Badge.tsx` — add `success` variant
- `components/sections/experience/FeaturedExperienceCard.tsx` — `Current` badge → `success` variant

## Acceptance Criteria

- Given light or dark mode, every neutral surface (`background`/`card`/
  `popover`) is visibly distinct from its neighbors, not identical.
- Given the nav active pill, primary CTA buttons, or any `text-primary` icon,
  they render the new blue, not black/white/gray.
- Given the GitHub heatmap, its levels render in the new `--success` green
  instead of raw Tailwind `green-500`.
- Given any text/icon/border pairing sitewide, contrast meets WCAG AA (4.5:1
  body text, 3:1 large text/icons) in both themes — verified, not assumed.
- Given `prefers-reduced-motion`/existing hover-lift/press animations, none
  of this plan changes their timing or mechanics — color only.

## Validation Plan

- `npm run lint`, `npm run build`.
- Compute actual contrast ratios (not eyeballed) for every new
  foreground/background pairing in both themes — the table above's `oklch`
  values get converted and checked against WCAG AA before considering this
  done, with any failing pair adjusted.
- Manual pass through every section in both themes via a headless browser,
  screenshot comparison light vs. dark.
- Confirm `LinkedinIcon.tsx` is untouched (exception, not a miss).

## Risks

- OKLCH chroma/hue values in the table are a considered starting point, not
  guaranteed-perfect on first render — expect one adjustment pass after
  visually reviewing screenshots in both themes before calling this done.
- Retinting `--primary`/`--ring` sitewide is high-leverage specifically
  *because* so much already routes through the token — meaning a value
  that's slightly off is also highly visible sitewide; this is exactly why
  contrast gets checked numerically rather than approximated.
