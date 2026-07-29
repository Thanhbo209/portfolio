# Portfolio-Wide Motion Pass

## Context

Applies the `ui-animation` skill's rules across the whole site: entrance
motion (page load + scroll reveal), navigation polish, card/button
feedback, and specific touches for Tech Stack, Projects, Certifications,
and Contact. Engineering Journey's digit/colon motion is already done
(previous task) - included here only as a compliance check, no rebuild.

**Skill note**: `.agents/skills/ui-animation/SKILL.md` exists, but none of
its referenced `references/*.md` files are actually present in this repo
(only the top-level SKILL.md). I'm applying the core rules, easing table,
and anti-patterns that ARE in that file directly - there's no deeper
per-component reference to load beyond what's already read.

**No new dependency.** `package.json` has no animation library today
(no `motion`/`framer-motion`/`gsap`). Per the skill's own implementation
priority ("CSS transitions > WAAPI > CSS keyframes > JS") and your
instruction not to add one unless the existing stack can't do the job -
it can. Everything below is Tailwind transition utilities, one small
`IntersectionObserver` hook, and CSS `group-hover`/`group-open` states
already used throughout this codebase.

## 1. The animation system

Two new shared primitives power every entrance animation on the site -
nothing is hand-rolled per section:

**`hooks/useInViewOnce.ts`** - a small client hook: takes a ref, observes
it with `IntersectionObserver`, flips a boolean to `true` on first
intersection, then disconnects (skill: "pause looping animations
off-screen" / "animates only the first time it enters the viewport" -
disconnecting after the first hit is what makes it a *once*, not a
scroll-driven replay).

**`components/ui/Reveal.tsx`** - `"use client"`, the only new component:
wraps `children` in a `div` that starts `opacity-0 translate-y-4` and
transitions to `opacity-100 translate-y-0` once `useInViewOnce` fires.
Takes an optional `delay` (ms, via inline `transitionDelay`) for stagger
and passes through `className` (so a card wrapped in `Reveal` can still
carry `h-full` where the surrounding grid needs stretch-equal card
heights - already established in Experience/Tech Stack/Contact). Duration
300ms with the skill's "enter" curve (`cubic-bezier(0.22, 1, 0.36, 1)`),
`motion-reduce:` forces full opacity/no-translate with no transition at
all.

**How it's used, consistently everywhere:**
- `components/layout/Section.tsx` wraps its `<Heading>` in `<Reveal>` (no
  delay) - this alone gives every section's title a fade-up entrance the
  first time it's scrolled to, with zero changes needed in any individual
  section file.
- Each section's own composition file wraps its top-level cards/blocks in
  `<Reveal delay={index * 60}>` - the stagger. This is deliberately scoped
  to *top-level* cards only (Overview's 4 cards, Tech Stack's 6 category
  cards, not each of the 28 individual tech rows inside them) - staggering
  every nested item would be both visually noisy and contradict the
  skill's explicit anti-pattern: "Animating both a container and
  staggering its children: pick one entrance per container."
- "Page load" and "scroll reveal" are the same mechanism, not two systems:
  `IntersectionObserver` reports intersection immediately for elements
  already on screen at mount, so Overview's cards (above the fold) animate
  in on load, and every section below animates in as it's scrolled to -
  one hook, one component, both requirements satisfied without
  duplicating logic.
- Projects' carousel passes its own scroll container as the observer
  `root` (a small optional param added to the hook), so cards reveal as
  you scroll *horizontally* through it too, not just vertically into the
  page - a natural extension of the same primitive, not a special case.

Hover, press, and the accordion's expand/collapse are **not** part of this
system - they're plain CSS `:hover`/`:active`/`group-open` states, several
already implemented (nav highlight, accordion chevron). This task mostly
adds/aligns transition classes on existing elements rather than new
components.

## One judgment call to flag: not every card gets the same hover weight

Your Cards section asks for "gentle lift on hover... slight scale" as a
general rule. Applied literally to every `Card` on the site, that would
put a hover-lift on cards that aren't clickable at all (Overview's
Education/Quick-Facts cards, Tech Stack's category cards, Experience's
summary cards) - which the skill's core rule flags directly: "Animate for
feedback... If it's just 'it looks cool'... don't," and a lift on a
non-interactive card implies clickability that isn't there.

Resolution: cards that **are** (or contain) the primary click target get
the full treatment - scale + shadow + border transition:
- `ContactMethodCard` (whole card is a link - already partially done)
- `ProjectCard` (hover emphasizes the focused project, per your Projects
  item)
- Certification `ProviderAccordion`'s `<summary>` (the actual click
  target)

Purely informational cards (Overview's Education/Quick-Facts/GitHub-
Activity, Experience's summary cards, Tech Stack's category cards) get a
much more restrained `border-color` transition only - acknowledges the
cursor without implying an action. Say the word if you'd rather every card
get the full lift regardless.

## 2. Shared utilities/components created

- `hooks/useInViewOnce.ts` - new
- `components/ui/Reveal.tsx` - new

That's the entire new surface. Everything else is editing existing
elements' className strings.

## 3. Files affected

**Core (touches every section for free):**
- `components/layout/Section.tsx` - heading wrapped in `Reveal`
- `components/ui/Card.tsx` - baseline `transition-colors duration-200` so any hover class applied at the call site animates smoothly

**Nav (mostly verification against the skill's timing table, already close to compliant):**
- `components/layout/NavItem.tsx`, `components/layout/ExternalLinkItem.tsx` - confirm/align hover + active-indicator durations (currently 250ms, within the 150-350ms band already)

**Section compositions (add `Reveal` + stagger to top-level cards/blocks):**
- `components/sections/Hero.tsx`, `About.tsx`, `Experience.tsx`, `TechStack.tsx`, `Certifications.tsx`, `Contact.tsx`
- `components/sections/projects/ProjectsCarousel.tsx` (stagger + carousel-aware observer root)

**Specific per-area polish:**
- `components/sections/techstack/TechItemRow.tsx` - logo `group-hover:scale-110` (icon animates slightly on hover)
- `components/sections/projects/ProjectCard.tsx` - whole-card hover lift, arrow-icon nudge on the GitHub/Live Demo/Case Study links
- `components/sections/certifications/ProviderAccordion.tsx` - hover treatment on the summary trigger; cert items get a fade+slide tied to the same `group-open` state (already-open accordions don't replay it, only newly-expanded ones)
- `components/sections/certifications/CertificationItem.tsx` - verify/align Verify-Credential link hover + press feedback
- `components/sections/contact/ContactMethodCard.tsx` - icon `group-hover:scale-110` layered on the existing whole-card hover
- `components/sections/About.tsx` - press feedback (`active:scale-[0.98]`) on the "Get in Touch"/"Download Resume" links if not already present

**Compliance check only, no changes expected:**
- `components/ui/JourneyTimer.tsx`, `SevenSegmentDigit.tsx` - already does segment-level `transition-colors` + independent CSS blink, matches the skill's rules as built.

## Accessibility & performance (applied uniformly, not per-file)

- Every new transition/animation gets a `motion-reduce:` path - instant state, no transform/opacity motion.
- Movement stays on `transform`/`opacity` only, per the skill's "what to animate" rule - no `width`/`height`/`top`/`left` transitions anywhere in this pass.
- No `transition: all` - every transition lists its properties explicitly.
- `IntersectionObserver` instances disconnect after firing once - nothing keeps observing off-screen elements indefinitely.

## Validation Plan

- `npm run lint` / `npm run build`.
- Manual check: reload at `/`, confirm Overview's cards stagger in immediately; scroll through every section and confirm each reveals once (not on every re-scroll past it); toggle `prefers-reduced-motion` in DevTools Rendering panel and confirm all motion becomes instant; verify no page-level horizontal scrollbar or layout shift was introduced by any wrapper div.
