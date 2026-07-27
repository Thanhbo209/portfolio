# Engineering Journey Timer (Overview)

## Context

Adds a full-width "Engineering Journey" card beneath the existing 2x2
Overview grid (`components/sections/Hero.tsx`) - a live counter of elapsed
time since the user started their Software Engineering degree.

## One fact needing your confirmation

The resume only gives "Nov 2024" for HUFLIT (no exact day). I'm defaulting
`ENGINEERING_JOURNEY_START_DATE` to **2024-11-01** - correct this to the
real date if it matters to you; it's a single constant, trivial to change
either way.

## 1. Timer calculation strategy

- **Single source of truth**: `constants/profile.ts` exports
  `ENGINEERING_JOURNEY_START_DATE` as an ISO date string (not a `Date`
  object - see below).
- **`hooks/useElapsedTime.ts`** (new client hook, logic only): given a
  start timestamp, computes `elapsedSeconds = (Date.now() - start) / 1000`,
  decomposes it via integer division/modulo into
  `{ days, hours, minutes, seconds }` (86400s/day, 3600s/hour, 60s/minute -
  days has no ceiling, hours/minutes/seconds wrap at 24/60/60 as required).
  It seeds state once on mount, then re-derives it every 1000ms via
  `setInterval`, and returns a cleanup function from `useEffect` that calls
  `clearInterval` - the standard React pattern for avoiding a leaked timer
  when the component unmounts or the section scrolls out and back in.
- **RSC boundary detail**: the Server Component card passes the start date
  down as the plain ISO **string** from the constant, not a `Date`
  instance - client components receive props over the Next.js Server/
  Client boundary, and a plain string is unambiguously serializable there
  where a `Date` object is a murkier case to rely on. The client-side
  `JourneyTimer` does `new Date(startDate)` internally.
- **Presentation is separate from logic**: `components/ui/JourneyTimer.tsx`
  (the reusable client component) only calls the hook and renders digits -
  it doesn't know about "Engineering Journey" wording at all. The
  Engineering-Journey-specific title/subtitle/footer copy lives in a
  Server Component card that embeds `<JourneyTimer />` as its one
  interactive leaf, per AGENTS.md §14 (push `"use client"` to the smallest
  leaf, not the whole card).
- **Digit transitions**: implemented as a small CSS-only fade
  (`@keyframes` + a utility class in `globals.css`, same authoring pattern
  as the existing `.animate-border-travel`) retriggered by keying each
  digit group on its current value - changing the `key` remounts that DOM
  node, restarting the fade. `motion-reduce:animate-none` disables it under
  reduced motion. This is "practical" enough to implement rather than
  falling back to an instant update.
- **Padding**: days pad to a minimum of 3 digits (matching the "DDD" main
  display) via `padStart(3, "0")` and simply grow past that with no
  ceiling once the count exceeds 999; hours/minutes/seconds always pad to
  2 digits.

## 2. Files affected

- `constants/profile.ts` - new: `ENGINEERING_JOURNEY_START_DATE`.
- `hooks/useElapsedTime.ts` - new: the ticking client hook described above.
- `components/ui/JourneyTimer.tsx` - new, `"use client"`: generic DDD:HH:MM:SS digit display + DD/HH/MM/SS labels, reusable (takes `startDate: string` as its only prop, no Engineering-Journey-specific copy).
- `components/sections/overview/EngineeringJourneyCard.tsx` - new, Server Component: title, embedded `JourneyTimer`, "Since November 2024" subtitle, footer line.
- `components/sections/Hero.tsx` - modified: render `EngineeringJourneyCard` as a full-width block after the existing 4-card grid.
- `app/globals.css` - add the digit-fade `@keyframes`/utility to the existing `@layer utilities` block.

No new dependency - `setInterval`/`useEffect` and a CSS keyframe, nothing
else.

## 3. Responsive behavior

- **Mobile**: digits at `text-2xl` so `045 : 12 : 33 : 07` fits one line
  in a full-width mobile card without horizontal overflow; everything
  (title, timer, labels, subtitle, footer) stacks vertically, tight
  spacing.
- **Tablet (`sm:`)**: digits step up to `text-3xl`, slightly more gap
  between digit groups.
- **Desktop (`lg:`)**: digits reach `text-5xl` for the "high visual
  emphasis" the brief asks for.

The card itself is always full-width - it renders outside the existing
`sm:grid-cols-2` grid, as its own block beneath it, so it spans whatever
width the Overview section's content area has at every breakpoint.

## Acceptance Criteria

- Given the page is left open, the displayed time increments every second without a page refresh.
- Given the component unmounts (e.g. navigating away), the interval is cleared - no console warnings, no leaked timer.
- Given `ENGINEERING_JOURNEY_START_DATE` changes, only that one constant needs editing.
- Given `prefers-reduced-motion: reduce`, digits update with no fade animation.

## Validation Plan

- `npm run lint` - zero warnings.
- `npm run build` - TypeScript strict-checks clean.
- Manual check: visit `/#overview`, confirm the timer ticks every second, confirm digits are legible and don't overflow at mobile width, confirm the card matches the existing dashboard card style.
