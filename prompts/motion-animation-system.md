# Unified Motion Animation System

## Context

Full replacement of the site's ad-hoc, per-feature CSS animations (built up
incrementally across many prior tasks: `Reveal`, `.nav-highlight`,
`Card`'s hover classes, per-component `transition-*` utilities) with one
shared system built on `motion` (the npm package formerly known as
`framer-motion`). This is an architecture change, not a visual redesign -
the goal is one animation vocabulary instead of N slightly-different ones.

**Dependency justification** (AGENTS.md §8): this is a user-directed
architectural decision, not something CSS/React alone couldn't do - the
existing pure-CSS system already satisfied every functional requirement
(reduced-motion, once-only reveal, stagger, GPU-safe properties) with zero
dependencies. Adding `motion` is justified specifically because it enables
things CSS genuinely can't: a single shared `layoutId` element that
smoothly glides between two different DOM positions (the active-nav
indicator moving from one item to another), and a common variants API that
collapses ~10 different hand-written transition strings into reusable,
named configs.

## One design commitment carried over, not re-litigated

AGENTS.md §13 permanently codifies the nav highlight's sharp-triangular-
left-edge flag shape ("Implement this once in the shared NavItem
component"). Moving the active-indicator's *transition* mechanics to
Motion's `layoutId` does not touch that shape - the `clip-path` stays
exactly as defined; Motion animates the position/size of the box wearing
that clip-path, the same way it would animate a plain rectangle. This plan
treats that as non-negotiable and preserves it.

## 1. Shared animation system (Requirement 1)

- **`lib/motion/variants.ts`** - new: plain, framework-typed variant
  objects, imported everywhere instead of redefined. Exports `fadeIn`,
  `fadeUp`, `fadeLeft`, `fadeRight`, `staggerContainer`, `staggerItem`,
  `scaleIn`, `hoverLift`, `pressEffect`, plus one shared `TRANSITIONS`
  object (`fast: 0.175s`, `normal: 0.3s`, `reveal: 0.6s`, all `ease-out`-
  family curves) so every component pulls duration from the same three
  numbers rather than picking its own.
- **`lib/motion/useReducedMotion.ts`** - new: thin wrapper around Motion's
  own `useReducedMotion()` (re-exported for a single import path across
  the codebase) - variants read this to zero out movement while keeping
  opacity transitions, per Requirement 15.
- **`components/motion/Reveal.tsx`** - replaces the current CSS/
  IntersectionObserver `Reveal` with a `motion.div` using `whileInView` +
  `fadeUp`, `viewport={{ once: true, amount: 0.2-0.25 }}`. **Same prop API**
  (`children`, `delay`, `className`, `root`) as today's `Reveal`, so all
  ~40 existing call sites across every section keep working without being
  individually touched - this is what makes the section-entrance
  requirement (Requirement 2) a one-file change instead of a 40-file one.
- **`components/motion/StaggerGroup.tsx` / `StaggerItem.tsx`** - new,
  thin wrappers around `staggerContainer`/`staggerItem` for card grids
  that need coordinated (not independently-delayed) staggering.

## 2. Section entrance (Requirement 2)

Since every section already routes its heading and top-level
cards/blocks through `Reveal` (built that way specifically so this kind
of swap is possible), updating `components/motion/Reveal.tsx` alone
covers Overview, About, Experience, Projects, Tech Stack, Certifications,
Contact, and the Resume page. No changes needed in `Hero.tsx`, `About.tsx`,
`Experience.tsx`, `TechStack.tsx`, `Certifications.tsx`, `Contact.tsx`,
`ProjectsCarousel.tsx`, or `app/resume/page.tsx` themselves.

## 3. Cards (Requirement 3)

- **`components/ui/Card.tsx`** - becomes a thin wrapper around
  `motion.div` with `whileHover={hoverLift}` (`translateY(-4px) scale(1.01)`
  + shadow, ~200ms) and `whileTap={pressEffect}` (`scale(0.98)`). Since
  every card on the site already goes through this one component, this
  single edit satisfies "every Card shares the same hover behavior."
  Cards that need a *stronger* hover (Contact/Project cards, previously
  overridden via className) instead pass a `hoverVariant="strong"` prop
  rather than re-declaring their own transition string.
- Per "do not animate informational content inside the card
  independently" - text/badges/icons *inside* a card do not get their own
  entrance or hover animation; only the card shell does (Project card
  tech-badge "fade upward" in Requirement 7 is the one explicit exception,
  handled locally in `ProjectCard.tsx`, not via `Card` itself).

## 4. Sidebar (Requirement 4)

- **`components/layout/NavItem.tsx`** - the icon becomes a `motion.span`
  with `whileHover={{ x: 4 }}` (3-5px per spec); background-color hover
  stays a plain CSS `transition-colors` (color painting isn't something
  Motion does better than CSS, and it's not the part that was ever broken).
  The active-state fill changes from the current per-item CSS
  `translateX` to a single `<motion.span layoutId="nav-active-pill">`
  rendered only inside the currently-active item - Motion detects it
  "moving" between items across renders and animates the transition
  automatically (no flash, no remount, since Motion preserves the
  element's identity via `layoutId` across the tree).
- **`components/layout/Sidebar.tsx`** - nav item list wrapped in
  `StaggerGroup`/`StaggerItem` (fade-from-left + slight x movement) for
  the one-time load-in stagger. `MobileNavDrawer.tsx` reuses the same
  `NavItem`, so it inherits the hover/active behavior automatically: it
  gets its own `StaggerGroup` triggered on drawer-open rather than page
  load, since that's when its items actually become visible.

## 5. Buttons (Requirement 5)

- **`components/ui/Button.tsx`** - new shared primitive (`motion.a` /
  `motion.button` depending on whether `href` is passed), `whileHover`
  (slight lift + brighter background via a CSS class swap + shadow) and
  `whileTap={{ scale: 0.96 }}`. Existing hand-styled CTAs migrate to it:
  About's "Get in Touch"/"Download Resume", Contact's "Email Me"/
  "Download Resume", Resume page's three actions, Projects carousel's
  prev/next controls.

## 6. Icons (Requirement 6)

Interactive icons (nav icon, button leading icons, project-card link
icons, tech-row logos) get a small shared `whileHover` (either `x: 2-3` or
`rotate: 5-8`, never a bounce/spring-overshoot) applied at their existing
call sites - no new wrapper component needed here since these are just a
`whileHover` prop on an already-`motion`-ified parent.

## 7. Project cards (Requirement 7)

`ProjectCard.tsx`: thumbnail image gets `whileHover={{ scale: 1.03 }}`
(container `overflow-hidden`, already true); the tech-badge row fades
upward via a small `whileHover`-triggered variant on the card (not
independently per-badge); the GitHub/Live-Demo/Case-Study arrow icons keep
their existing nudge, re-expressed as a Motion `whileHover` instead of the
current CSS `group-hover:translate-x-0.5`.

## 8. Tech Stack (Requirement 8)

`TechStack.tsx`'s category cards already stagger via `Reveal` (covered by
the Section 2 change). `TechItemRow.tsx` keeps a row-level hover highlight
and the logo gets `whileHover={{ scale: 1.05 }}`. Explicitly **not**
touched: no per-technology entrance animation on load - only the 6
category cards stagger, matching "do not animate every individual
technology on initial page load" (already true today, staying true).

## 9. Certifications (Requirement 9)

`ProviderAccordion.tsx`'s expand/collapse moves from the current CSS
`grid-rows-[0fr]→[1fr]` trick to Motion's `AnimatePresence` +
`animate={{ height: "auto" }}` for the content region (fade paired with
it), and the chevron's rotation becomes a `whileTap`/`animate` rotation
tied to open state instead of the CSS `group-open:rotate-180`. The
`<summary>` trigger gets `whileHover={hoverLift}` matching every other
"button-like" surface.

## 10. Contact (Requirement 10)

`ContactMethodCard.tsx` and `HiringInformationCard.tsx`'s CTAs migrate to
the shared `Button` (Requirement 5); the method card's icon gets a slight
upward `whileHover` nudge in addition to the card's own lift.

## 11. Resume page (Requirement 11)

`ResumeViewer.tsx`: the iframe's fade-in on load becomes a Motion
`animate` off the existing `isLoaded` state (replacing the current CSS
`transition-opacity`); the Download button's icon gets a downward
`whileHover` nudge.

## 12. Scroll (Requirement 12)

**No change.** Section-to-section navigation stays exactly what it is
today - native `scrollIntoView()` deferring to CSS `scroll-behavior`,
respecting `motion-reduce:scroll-auto`. Motion's viewport detection
(`whileInView` in `Reveal`) is a separate concern from *how* the page
scrolls, and the brief is explicit that JS-driven scrolling must not be
introduced.

## 13-15. Timing / performance / accessibility

Centralized entirely in `lib/motion/variants.ts`'s `TRANSITIONS` object
and the shared `useReducedMotion` wrapper - every variant reads from these
rather than hardcoding its own numbers, so "confirm consistent easing and
duration" (Requirement 16) is a property of the architecture, not
something to audit file-by-file after the fact. All variants animate only
`transform`/`opacity` (Requirement 14); the one exception is the
accordion's `height: "auto"` in Requirement 9 - Motion's `AnimatePresence`
measures and animates this specifically to avoid the layout-thrash a raw
CSS height transition would cause, which is the standard, accepted use of
Motion for exactly this pattern.

## Files affected (complete list)

**New:**
- `lib/motion/variants.ts`, `lib/motion/useReducedMotion.ts`
- `components/motion/Reveal.tsx` (replaces `components/ui/Reveal.tsx` - same import path retained)
- `components/motion/StaggerGroup.tsx`, `components/motion/StaggerItem.tsx`
- `components/ui/Button.tsx`

**Modified:**
- `components/ui/Card.tsx`
- `components/layout/NavItem.tsx`, `components/layout/Sidebar.tsx`, `components/layout/MobileNavDrawer.tsx`
- `components/sections/About.tsx` (CTA row → shared `Button`)
- `components/sections/projects/ProjectCard.tsx`
- `components/sections/techstack/TechItemRow.tsx`
- `components/sections/certifications/ProviderAccordion.tsx`
- `components/sections/contact/ContactMethodCard.tsx`, `HiringInformationCard.tsx`
- `features/resume/ResumeViewer.tsx`
- `package.json` (add `motion`)

**Removed (superseded, not left as dead code):**
- The `.nav-highlight` CSS block, `@keyframes blink`'s accordion-adjacent bits are unaffected (unrelated to nav), but the transform/transition portion of `.nav-highlight` in `app/globals.css` goes away once `layoutId` takes over - the `clip-path` value itself gets carried into the new `motion.span`'s inline/className styling, not deleted.
- `app/globals.css`'s manual `.animate-blink` stays (JourneyTimer, out of scope - not listed in your 16 requirements).

## Acceptance Criteria

- Given any section is scrolled into view, it fades/translates in exactly once, never replaying on repeat scroll-past.
- Given any two adjacent nav items, hovering shows the icon nudge and background transition independently per item; scrolling between sections animates the active pill as one continuous glide, not two independent fades.
- Given `prefers-reduced-motion: reduce`, every variant drops translation/scale but keeps a plain opacity fade - nothing is instant-and-silent, nothing still moves.
- Given the certifications accordion opens, height and content fade animate together with no layout jump.
- Given a full click-through of the site, no two components use a differently-tuned duration/easing for what is semantically the same interaction (hover lift, entrance, press).

## Validation Plan

- `npm install motion`, `npm run lint`, `npm run build`.
- Manual pass through all 8 sections + Resume page in both themes, confirming entrance, hover, and press feel identical in timing/character everywhere.
- Toggle `prefers-reduced-motion` and re-confirm every interactive surface still gives feedback (opacity only).

## Risks

- This touches nearly every interactive surface on the site in one pass; given the size, I'd suggest landing it in the order listed above (shared system → Reveal/Cards, which cover most of the surface area for free → Sidebar → Buttons/Icons → the remaining per-section polish) rather than one atomic change, so each stage can be checked before the next.
- Motion's bundle adds to client JS size; `Reveal`/`Card`/`NavItem` already need `"use client"` today, so this doesn't newly violate the Server-Component-first rule, but it does mean slightly more client JS shipped than the pure-CSS version.
- The certifications accordion's `height: "auto"` animation is the one place this plan intentionally animates a layout property - flagged explicitly per Requirement 14's "whenever possible" wording, with the standard Motion `AnimatePresence` mitigation noted above.
