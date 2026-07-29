# Design Token Refactor & Consistency Audit

## Context

`app/globals.css` was replaced with a new token set (generic OKLCH
grayscale palette, `--radius: 0.625rem` instead of the previous
`0.125rem`, no custom `@layer utilities`, no `--font-heading`). The user
wants the entire component tree audited against these new tokens, all
hardcoded colors eliminated, duplicated styling extracted, and - critically
- "all animations, scroll spy behavior, hover effects, and interactions"
preserved.

## What I found auditing the actual codebase (not guessing)

I grepped every component for hardcoded colors, inconsistent radius
usage, and inconsistent shadow usage before writing this plan, so the
scope below is evidence-based, not a blanket "redo everything."

### Critical: the new globals.css silently breaks 5 already-built features

The wholesale replacement dropped the entire `@layer utilities` block and
the `--font-heading` token, which several finished, explicitly-required-
to-stay-working features depend on by literal class name:

| Missing | Breaks |
| --- | --- |
| `.nav-highlight` (clip-path) + the native `transform`/`transition` sweep rules | Sidebar/mobile-drawer hover-slide animation (just built and DevTools-verified last session) |
| `.animate-border-travel` | About's IntroBlock decorative border-dot animation |
| `.scrollbar-hide` | Projects carousel's hidden-but-keyboard-scrollable track |
| `.animate-blink` | JourneyTimer's blinking `:` separator |
| `--font-heading` (`:root`/`.dark`/`@theme inline`) + `h1-h6 { font-family: var(--font-heading) }` | Every heading site-wide silently falls back to body font (Space Grotesk headings stop working) - `layout.tsx` still loads the font correctly, only the CSS wiring to use it is gone |

This isn't me reverting your token change - the colors/radius/shadow
values stay exactly as you set them. This is restoring the *mechanism*
those five features run on, which your own requirement list ("preserve
all animations... hover effects... interactions") requires either way.

### Hardcoded colors found: 10 files, mostly already-justified exceptions

- `LinkedinIcon.tsx` - `text-[#0A66C2] dark:text-[#4A9EFF]`: LinkedIn's
  actual brand blue. Per AGENTS.md §12, fixed-brand-color marks keep their
  real color and never recolor via `currentColor` - correct as-is, not
  changing it.
- `MobileNavDrawer.tsx` - `backdrop:bg-black/40`: the drawer's dimming
  scrim. Scrims are conventionally black regardless of theme (using
  `bg-foreground` here would invert to a *white* haze in dark mode) -
  correct as-is.
- `GitHubActivityCard.tsx` - `rounded-[2px]`: the tiny contribution-heatmap
  cells. The new `radius-sm` (6px) would round them into circles at their
  ~9px size - a deliberate micro-UI exception, correct as-is.
- `JourneyTimer.tsx` - `shadow-[inset_0_2px_6px_rgba(0,0,0,0.15)]`: the
  clock body's recessed-screen effect. No inset-shadow token exists in
  either the old or new theme; a neutral black at low opacity reads
  correctly in both themes - keeping it, flagged here rather than silently
  left in.
- **6 "logo tile" blocks** (`CurrentPositionCard`, `EducationCard`,
  `GitHubActivityCard` N/A, `PreviousExperienceCard`,
  `EducationSummaryCard`, `FeaturedExperienceCard`, `CurrentStatusCard`) -
  `bg-black`/`bg-white` chips behind company/school logos. This *is* the
  real, actionable duplication: the same
  `flex size-10 shrink-0 items-center justify-center rounded-md bg-* p-*`
  shape repeats 6 times with only size/background/padding varying. This
  gets extracted into one shared component (see below) - both satisfies
  "eliminate duplicated styling" and centralizes the one-time justification
  for why these chips stay a fixed color instead of following the theme
  (they exist so third-party logos with their own fixed colors stay
  legible against either theme, the same rationale as the LinkedIn icon).

### Radius and shadow usage: already consistent, no changes needed

I checked every `rounded-*`/`shadow-*` class in the component tree.
Radius usage is already disciplined - `rounded-md` for cards/tiles/buttons,
`rounded-full` for avatars/pills/dots, `rounded-sm` for nested inner
images - all semantic scale classes, not raw pixel values, so they'll
automatically pick up the new `0.625rem` base with zero component edits.
Shadow usage is just `shadow-md` (semantic) plus the one justified inset
exception above. Nothing to fix here.

## 1. Files affected

- `app/globals.css` - add back `@layer utilities` (nav-highlight + sweep rules, border-travel, scrollbar-hide, blink) and `--font-heading` (root/dark/theme-inline) + the h1-h6 rule, using the exact same mechanism as before, sitting alongside the new token values untouched.
- `components/ui/LogoTile.tsx` - new: `{ src, alt, background: "black" | "white", size?, className? }`, replaces the 6 duplicated chip blocks.
- `components/sections/overview/CurrentPositionCard.tsx`, `EducationCard.tsx`, `components/sections/experience/PreviousExperienceCard.tsx`, `EducationSummaryCard.tsx`, `FeaturedExperienceCard.tsx`, `components/sections/contact/CurrentStatusCard.tsx` - swap their inline chip markup for `<LogoTile />`.

Every other component file is left untouched - confirmed via the audit
above that they already use semantic tokens (`bg-card`, `text-muted-
foreground`, `border-border`, `bg-accent`, `bg-primary`, etc.) throughout,
which was the discipline followed while building each section this
session.

## Acceptance Criteria

- Given the site renders in either theme, every color comes from a CSS variable except the 4 explicitly-justified exceptions listed above (LinkedIn brand blue, drawer scrim, heatmap cell radius, clock inset shadow) - each with a one-line reason, not silently left in.
- Given the nav is hovered, the border-dot animation plays, the Projects carousel scrolls, and the JourneyTimer's colon blinks - all four still work after the token swap.
- Given a heading renders anywhere on the site, it uses Space Grotesk again.
- Given a company/school logo chip appears, it comes from one shared `LogoTile` component, not 6 copies of the same markup.

## Validation Plan

- `npm run lint` / `npm run build`.
- Manual check: visit every section in both themes, confirm colors look cohesive, confirm the 4 previously-built animations/interactions listed above still function, confirm headings render in Space Grotesk.
