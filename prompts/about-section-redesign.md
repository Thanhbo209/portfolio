# About Section Redesign

## Context

Following on from the LinkedIn-style `IntroBlock` refactor, the user wants the
entire About section rebuilt into a premium, developer-focused section in the
spirit of Linear / Vercel / Stripe / Raycast — clean, minimal,
information-dense, with subtle motion. This is a visual/structural redesign
of one section only; the rest of the site (design tokens, other sections,
Motion system) stays untouched.

**Design read:** developer portfolio About section for recruiters/hiring
managers, Linear-style minimalist language, Tailwind utilities + the existing
Motion system + restrained transform/opacity-only animation. Dials (per the
loaded `design-taste-frontend` skill's Portfolio/Developer preset):
`VARIANCE 6 / MOTION 5 / DENSITY 4` — moderate asymmetry, calm motion,
"daily app" spacing (not art-gallery-airy, not cockpit-dense).

## Goals

- The section reads, top to bottom, as: **who am I → what do I build → what
  have I done → what am I focused on → why work with me** — matching the
  user's five questions.
- Every stat/number shown is real, sourced from existing site content, not
  invented (see **Data accuracy** below — several of the user's example
  numbers don't match current real content and are corrected here).
- Single shared Motion system (`lib/motion/variants.ts`, `Reveal`, `Card`)
  stays the only animation vocabulary — no new one-off animation approach
  introduced for this section.
- No new dependencies; Motion and Phosphor icons (already installed) cover
  everything requested, including the scroll-linked timeline line via
  Motion's `useScroll`/`useTransform` (not a raw `scroll` listener, which the
  loaded `design-taste-frontend` skill hard-bans for animation purposes).

## Data accuracy (must confirm before/while implementing)

The request's Quick Stats numbers were prefixed "Example:", and cross-checking
them against real site content, two don't match:

| Stat | Requested example | Real, sourced value | Source |
|---|---|---|---|
| Projects | 12+ | **4** | `content/projects.ts` (4 entries) |
| Internships | 2 | **2** ✅ | FlyRank AI (`FeaturedExperienceCard`, tagged "Internship") + Acacy Co. Ltd (`PreviousExperienceCard`) |
| Years Learning | 3+ | **2+** | `JourneyTimeline.tsx`: "Started Software Engineering at HUFLIT" — Aug 2024 to now (~Jul 2026) is ~2 years |
| TOEIC | 870 | **870** ✅ | `content/certifications.ts` |

Proceeding with the corrected real numbers (4 / 2 / 2+ / 870) rather than the
example figures, since this site's stated principle throughout has been that
every number on the page is real. Flag if "12+"/"3+" refer to something not
yet reflected in site content (e.g. unlisted side projects) — happy to use a
different real number if so, just not a fabricated one.

## Architecture

Existing convention is `components/sections/about/*` (not a new top-level
`components/about/` as loosely sketched in the request) — matches every
other section's folder structure (§7) and is what `About.tsx` already
imports from.

```
components/sections/about/
  IntroBlock.tsx            existing, untouched (avatar/name/headline/location/education — already answers "who am I")
  AboutSummary.tsx           NEW — professional summary card + technology chips
  QuickStats.tsx             NEW — 4 stat tiles, staggered reveal
  JourneyTimeline.tsx        MODIFIED — redesigned vertical timeline, scroll-linked line, highlighted current dot
  CurrentFocus.tsx          NEW — "Currently Exploring" card
  EngineeringPrinciples.tsx  MODIFIED — new 5-item copy, checklist layout (not 2-col grid)
  AboutCTA.tsx               NEW — full-width CTA block, extracted from About.tsx
  WhatIBuildCards.tsx        DELETED — superseded by AboutSummary's prose (its 3 build areas are now covered by the summary text); confirmed only referenced from About.tsx
components/sections/About.tsx  MODIFIED — new composition order
lib/motion/variants.ts         MODIFIED — add staggerContainer/staggerItem (a real, non-redundant use now — QuickStats' 4 tiles animating as one coordinated group, distinct from Reveal's per-item delay pattern)
```

New composition order in `About.tsx` (each top-level block wrapped in the
existing `Reveal`, consistent with every other section):

1. `IntroBlock` (unchanged)
2. `AboutSummary` (summary card + tech chips)
3. `QuickStats` (4 tiles, stagger)
4. Two-column: `JourneyTimeline` (left) / `CurrentFocus` + `EngineeringPrinciples` stacked (right)
5. `AboutCTA` (full-width, final)

## Content specifics

**AboutSummary** — replaces the old bio paragraph (which currently regressed
back to "Majored in TypeScript..." per your last edit — removing that
phrasing was already a standing instruction). New copy:

> Backend & AI Engineer passionate about building production-ready APIs,
> AI-powered applications, and scalable backend systems. Currently focused on
> LLM applications, distributed systems, and software architecture.

Technology chips (existing `Badge` component, `variant="outline"`, hover
`translateY(-2px)` + brighter border via Motion, matching the button-hover
timing already established): TypeScript, Python, Node.js, FastAPI, Next.js,
PostgreSQL, Docker, OpenAI, LangGraph.

**QuickStats** — 4 tiles, large number + small label, in a `Card`:
`4` Projects, `2` Internships, `2+` Years Learning, `870` TOEIC.

**JourneyTimeline** — same 5 real milestones (unchanged data), redesigned
presentation: more vertical spacing between items, the connector line grows
via `useScroll({ target })` + `useTransform` driving `scaleY` (transform, not
`height`, per the hard "transform/opacity only" rule), and the last
("Present"/current) milestone's dot gets a highlighted ring using the
existing `primary` token.

**CurrentFocus** — new card, title "Currently Exploring", 5 icon rows: AI
Agents, Distributed Systems, Docker & Kubernetes, Backend Architecture,
Production AI Systems.

**EngineeringPrinciples** — replace the 4 existing bullets with the 5 new
ones verbatim, laid out as a vertical checklist (not the current 2-column
grid, since 5 items don't split evenly and "elegant checklist" reads as a
single column):
Think in systems, not features. / Build software people can maintain. /
Learn by building. / Measure before optimizing. / Ship. Iterate. Improve.

**AboutCTA** — same two buttons/behavior as today (`Get in Touch` →
`#contact`, `Download Resume` → `/resume`), moved out of the Engineering
Principles column into their own full-width block at the very end of the
section; hover keeps the existing `buttonHover`/`buttonPressEffect` (scale +
press) and gains the shared `Card`-style lift (`hoverLift`'s `y`/shadow
pairing) so the CTA reads as the section's closing, most prominent action.

## Motion choreography (all via existing `lib/motion/variants.ts` + `Reveal`/`Card`, once-only via `viewport={{ once: true }}`)

| Element | Treatment |
|---|---|
| IntroBlock avatar | subtle fade + scale-in (`scaleIn`, already defined, currently unused) |
| AboutSummary | fade up (`Reveal`, default) |
| QuickStats | stagger children — new `staggerContainer`/`staggerItem` variants |
| JourneyTimeline | slide from left (`fadeLeft`, already defined) + scroll-linked line (`useScroll`/`useTransform`, new use of an existing pattern) |
| CurrentFocus | slide from right (`fadeRight`, already defined) |
| EngineeringPrinciples | fade up (`Reveal`, default) |
| AboutCTA | fade up (`Reveal`, default) + existing hover treatment |

Nothing springs/bounces — every transition uses the existing `TRANSITIONS`
easing tiers, consistent with "nothing should bounce."

## Responsiveness

- Desktop (`lg:`): two-column Journey/Focus layout as specified.
- Tablet/mobile: single column throughout (matches existing mobile-first
  convention); Quick Stats becomes a `grid-cols-2` (2×2) below `sm:`, `sm:grid-cols-4` at and above; CTA buttons stack vertically (`flex-col sm:flex-row`, matching the existing pattern already used elsewhere in the site, e.g. `HiringInformationCard`).

## Accessibility

- `AboutSummary`, `QuickStats`, `CurrentFocus`, `EngineeringPrinciples` each get a semantic `h3` (matching existing sibling components), no heading level skipped.
- Tech chips and timeline items are non-interactive (no keyboard trap needed); CTA buttons keep existing focus-visible/keyboard behavior from `MotionLink`.
- Contrast: reusing existing `foreground`/`muted-foreground`/`primary` tokens throughout, no new colors introduced.

## Files Affected

- `components/sections/about/AboutSummary.tsx` — new
- `components/sections/about/QuickStats.tsx` — new
- `components/sections/about/CurrentFocus.tsx` — new
- `components/sections/about/AboutCTA.tsx` — new
- `components/sections/about/JourneyTimeline.tsx` — modified (redesign + scroll-linked line)
- `components/sections/about/EngineeringPrinciples.tsx` — modified (new copy + layout)
- `components/sections/about/WhatIBuildCards.tsx` — deleted (superseded)
- `components/sections/About.tsx` — modified (new composition)
- `lib/motion/variants.ts` — modified (add `staggerContainer`/`staggerItem`)

## Acceptance Criteria

- Given the About section loads, IntroBlock → Summary → Chips → Stats →
  Timeline/Focus/Principles → CTA appear in that order, each animating in
  once as the user scrolls to it.
- Given a Quick Stats number, it matches real site content (4/2/2+/870), not
  a placeholder.
- Given `prefers-reduced-motion: reduce`, every entrance still fades in
  (opacity-only) with no travel; hover/tap feedback stays smooth regardless
  (per the established site-wide reduced-motion approach).
- Given the viewport narrows below `sm`, Quick Stats becomes 2×2, the
  Journey/Focus columns stack, and CTA buttons stack vertically.
- Given `WhatIBuildCards` is removed, no dangling import/reference remains.

## Validation Plan

- `npm run lint`, `npm run build`.
- Manual pass in the browser (light + dark) at desktop and mobile widths.
- CDP check: confirm the timeline line's `scaleY` progresses smoothly while
  scrolling, confirm reduced-motion still gives opacity feedback, confirm no
  console/hydration errors.

## Risks

- The timeline's scroll-linked line is the one genuinely new Motion pattern
  in this codebase (previous work used `whileInView`/`whileHover`, not
  `useScroll`) — slightly more involved than the rest, isolated to one
  component so it's easy to fall back to a simpler `whileInView` reveal on
  the line if it doesn't feel right.
- Quick Stats numbers are corrected from the request's examples per **Data
  accuracy** above — flag if that's not the intended source of truth.
