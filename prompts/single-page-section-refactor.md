# Single-Page, Section-Based Refactor

## Context

The portfolio currently ships as 10 separate routes, each a near-identical "coming soon" placeholder, navigated via `next/link` + `usePathname()`-derived active state. This consolidates them into one scrolling landing page, where the sidebar becomes a set of in-page anchors kept in sync with scroll position via `IntersectionObserver`, shared between the desktop sidebar and mobile drawer through one `NavigationContext` rather than prop-drilling or two independent observers.

This supersedes the previous version of this plan: the active-state mechanism is now Context (not a prop passed from a wrapper component), Resume reuses the existing Phosphor `FileTextIcon` (no new local icon), and the Projects/Case Studies/Blog sections are explicitly framed as **featured/preview** content with deferred "View All" links to future full listing routes.

## Goals

- One route (`/`) renders all nine sections in a fixed vertical order, each an independently authored, reusable component.
- Clicking a sidebar item smoothly scrolls to its section; scrolling manually updates the active sidebar item. Both stay perpetually synchronized because they drive the same underlying signal, not two states that need reconciling.
- Desktop sidebar and mobile drawer read active state from one shared `NavigationContext` — never two independent scroll observers, never two independently-maintained "which item is active" values.
- The eight now-redundant multi-page routes are removed; `/resume` is kept (linked from the secondary/external-links group, not primary nav).
- Nothing about this refactor removes the *ability* to add `/projects`, `/projects/[slug]`, `/case-studies`, `/case-studies/[slug]`, `/blog`, `/blog/[slug]` later — those are simply not built yet. The homepage's Projects/Case Studies/Blog sections show featured content only, with "View All" left unwired until those routes exist.
- Semantic HTML preserved: one `<h1>` (Overview/Hero), `<h2>` for every other section, each `<section>` with a stable `id` and an accessible name.
- `prefers-reduced-motion` disables smooth scrolling.

## Loaded Skills

✓ `design-taste-frontend` ("Taste") — the only skill present under `.agents/skills/`. Applied: §3.A (Client-Component isolation), §6.A/§6.B (transform/native-scroll only, reduced-motion respected), §4.11 (page theme lock, unaffected).

No `nextjs`/`react`/`accessibility`/`seo` skill files exist yet — proceeding on AGENTS.md's own §12 (Server/Client), §17 (Tailwind), §18 (Accessibility), §19 (SEO), and §23 (State Management Strategy) per §8.3.4.

## Architecture

### Why Context, not prop-drilling

AGENTS.md §23 already states the house rule: *"Cross-cutting UI state (theme, mobile menu open/closed) uses React Context, scoped as narrowly as possible."* Active-section state is exactly this kind of cross-cutting UI state — both `Sidebar` and `MobileNavDrawer` need it, and they're siblings, not nested inside each other. The existing `ThemeProvider.tsx` (wrapping `next-themes`) is the precedent to match: a Provider component living in `components/layout/`, not a new top-level `contexts/` folder (AGENTS.md's folder taxonomy doesn't have one, and inventing one for a single context would be a premature abstraction per §7.5).

### `components/layout/NavigationProvider.tsx` (new) — presentation-agnostic, config-driven

One file holding three tightly-coupled pieces, colocated deliberately (none of them are meaningful independently, the same reasoning that already justifies keeping `ThemeProvider.tsx` self-contained):
- `NavigationContext` — a React Context holding `{ activeId: string }`.
- `NavigationProvider` — `"use client"`, calls `useScrollSpy(sectionIds)` once internally, provides the result.
- `useNavigationContext()` — the consumer hook `NavItem` calls to read `activeId`.

**Presentation-agnostic, by design:** `NavigationProvider` takes `sectionIds: string[]` as a **prop** — it does not import `constants/navigation.ts` itself, does not know about labels, icons, `Sidebar`, or `MobileNavDrawer`. It is a generic "given these ids, tell me which one is currently active" utility with zero knowledge of how that fact gets displayed. This is what makes it reusable as the app grows: a future feature (a different nav surface, a table of contents, a progress indicator) can mount its own consumer of the same context, or the provider itself could be reused in a completely different part of the app, without ever touching this file.

**`constants/navigation.ts` is the one shared navigation configuration** feeding both sides: `app/layout.tsx` derives `sectionIds` from `primaryNav.map((item) => item.id)` and passes it into `NavigationProvider`, while `Sidebar`/`MobileNavDrawer`/`NavItem` read the same `primaryNav` for labels, icons, and ids. Neither side hardcodes a second, parallel list — there is exactly one place nav items are defined.

`app/layout.tsx` wraps everything below `ThemeProvider` in `NavigationProvider`, so any component in the tree can read active-section state without prop drilling — currently that's `NavItem` (see below); `Sidebar`/`MobileNavDrawer` themselves stay unaware of it entirely.

### `hooks/useScrollSpy.ts` (new)

The actual `IntersectionObserver` logic, kept separate from the Context wiring so it stays a pure, independently reasoned-about piece: takes the ordered list of section ids, watches them with a thin detection band near the top of the viewport, returns whichever id is currently in that band. Ties are broken deterministically (documented in the hook itself, preferring the section furthest down the page among those simultaneously intersecting — correct behavior on a fast downward scroll). This is what `NavigationProvider` calls internally; nothing else imports it directly.

### `NavItem` reads context directly

Rather than `Sidebar`/`MobileNavDrawer` reading the context and re-passing `isActive` down as a prop to every `NavItem` (redundant — that's exactly the prop-drilling Context exists to avoid), `NavItem` itself calls `useNavigationContext()` and computes `isActive = activeId === id` internally. This mirrors exactly how it worked before (`usePathname()` computed internally) — only the source of truth changes, not the shape of the component. `Sidebar` and `MobileNavDrawer` don't need any prop changes for this at all.

### Scrolling mechanics: CSS, not JavaScript

`<html>` gets `scroll-smooth motion-reduce:scroll-auto` (Tailwind utilities, in `app/layout.tsx`). Combined with plain anchor hrefs (`#about`, etc.), clicking a nav item smooth-scrolls with zero scroll-specific JavaScript, and automatically drops to an instant jump under `prefers-reduced-motion: reduce`. Each section gets `scroll-mt-20` so its heading clears the mobile drawer's sticky top bar when jumped to.

**This is the actual synchronization mechanism, stated plainly:** there is only ever one signal — "which section is currently intersecting the viewport's detection band" — computed by one observer, exposed through one Context. A nav click doesn't set an separate "active" flag; it just triggers the browser to scroll, and the same observer that tracks manual scrolling notices the new position and updates `activeId` accordingly. Click-driven and scroll-driven navigation are the same code path from the observer's perspective, so they cannot drift out of sync with each other.

### Section composition

AGENTS.md's target structure already names a `components/layout/Section.tsx` primitive (§5) — this is what finally uses it:
- **`components/layout/Section.tsx`** (new) — `id`, `heading`, `headingLevel` ("h1" for Hero only, "h2" elsewhere), `children`; renders `<section>` + heading + consistent spacing (`scroll-mt-20 px-6 py-16 lg:px-12`).
- Nine components under **`components/sections/`**: `Hero.tsx`, `About.tsx`, `Experience.tsx`, `Projects.tsx`, `CaseStudies.tsx`, `TechStack.tsx`, `Certifications.tsx`, `Blog.tsx`, `Contact.tsx`. `Projects.tsx` renders a "Featured Projects" heading, `CaseStudies.tsx` "Featured Case Studies", `Blog.tsx` "Latest Blog" — matching the nav's short labels ("Projects", "Case Studies", "Blog") while the section content itself signals it's a curated subset. No "View All" link is wired up yet in any of them (there's nowhere for it to go until `/projects` etc. exist) — noted explicitly in Risks so it's a visible, deliberate omission, not a silently missing feature.
- `app/page.tsx` composes all nine in nav order. No inner `<main>` — `app/layout.tsx`'s `<main>` stays the page's only `<main>` landmark.

### Navigation data model

`types/navigation.ts`: `NavItem.href: string` (a route) → `NavItem.id: string` (a section id). `NavItem.tsx` computes `href="#${id}"` at render time. `ExternalLink.icon` widens from `ComponentType<SVGProps<SVGSVGElement>>` to `React.ElementType` — the standard "accept any component shape" type for icon props — specifically so it can hold either a local `currentColor` component (GitHub/LinkedIn/Email) or a Phosphor `ForwardRefExoticComponent` (Resume's `FileTextIcon`, per your instruction to reuse it rather than add a fourth local icon) in the same field without a type mismatch.

`constants/navigation.ts`'s `externalLinks` becomes, in order: Resume (Phosphor `FileTextIcon`, links to `/resume`), GitHub, LinkedIn, Email — matching your listed secondary-nav order, with the theme toggle still rendered last in `Sidebar`/`MobileNavDrawer` below that list (unchanged from current markup).

### AGENTS.md changes

§4 (Information Architecture & Navigation) rewritten: §4.1's table swaps "Suggested route" for "Section id" and drops Resume (pointer to §4.2); §4.2 gains Resume as the first external link and notes it opens/downloads a PDF rather than being a section; §4.3 replaces the `usePathname()` active-state rule with the `NavigationContext`/scroll-spy rule; §4.4's "closes on route change" becomes "closes on nav selection"; §4.5's mapping table gets `NavigationProvider.tsx`, `useScrollSpy.ts`, and `Section.tsx`. No section renumbering — this rewrites existing §4 content, no new top-level section is inserted.

## Proposed Folder Structure (delta from current)

```
app/
  layout.tsx          (edit)
  page.tsx            (edit — composes all 9 sections)
  resume/page.tsx     (unchanged — kept, off primary nav)
  about/ experience/ projects/ case-studies/ blog/
  tech-stack/ certifications/ contact/    (all deleted)
components/
  layout/
    NavigationProvider.tsx   (new)
    Section.tsx              (new)
    Sidebar.tsx               (edit — no activeId prop needed, see above)
    MobileNavDrawer.tsx       (edit — same, plus drop dead usePathname effect)
    NavItem.tsx               (edit — usePathname → useNavigationContext)
  sections/
    Hero.tsx About.tsx Experience.tsx Projects.tsx
    CaseStudies.tsx TechStack.tsx Certifications.tsx
    Blog.tsx Contact.tsx      (all new)
hooks/
  useScrollSpy.ts     (new)
types/navigation.ts    (edit)
constants/navigation.ts (edit)
AGENTS.md              (edit, §4)
```

## Files Affected

**New:** `hooks/useScrollSpy.ts`, `components/layout/NavigationProvider.tsx`, `components/layout/Section.tsx`, 9 files under `components/sections/`.

**Edited:** `types/navigation.ts`, `constants/navigation.ts`, `components/layout/NavItem.tsx`, `components/layout/MobileNavDrawer.tsx` (drop dead `usePathname` safety-net effect — pathname can no longer change), `app/layout.tsx` (render `NavigationProvider`, add `scroll-smooth`), `app/page.tsx`, `AGENTS.md` §4.

**Unchanged but worth noting:** `components/layout/Sidebar.tsx` needs no prop-shape changes (it never receives `activeId` — `NavItem` reads context itself); `components/layout/ExternalLinkItem.tsx` unchanged (already renders whatever `link.icon` component it's given).

**Deleted:** `app/about/page.tsx`, `app/experience/page.tsx`, `app/projects/page.tsx`, `app/case-studies/page.tsx`, `app/blog/page.tsx`, `app/tech-stack/page.tsx`, `app/certifications/page.tsx`, `app/contact/page.tsx`.

**Kept as-is:** `app/resume/page.tsx`.

## Implementation Steps

1. Update `types/navigation.ts` (`id` instead of `href`, widen `ExternalLink.icon`) and `constants/navigation.ts` (9-item `primaryNav` with ids; `externalLinks` reordered with Resume/`FileTextIcon` first).
2. Add `hooks/useScrollSpy.ts`.
3. Add `components/layout/NavigationProvider.tsx`.
4. Add `components/layout/Section.tsx`.
5. Add the nine `components/sections/*.tsx` components (migrating existing placeholder copy; Projects/CaseStudies/Blog get "Featured"/"Latest" headings).
6. Update `components/layout/NavItem.tsx` (context instead of `usePathname`).
7. Update `components/layout/MobileNavDrawer.tsx` (drop the dead pathname effect).
8. Update `app/layout.tsx` (wrap in `NavigationProvider`, add `scroll-smooth motion-reduce:scroll-auto`).
9. Rewrite `app/page.tsx` to compose all nine sections.
10. Delete the eight obsolete route folders.
11. Rewrite AGENTS.md §4.
12. Run validation.

## Acceptance Criteria

- `/` shows all nine sections stacked in order, one `h1`, rest `h2`, each with a unique `id`.
- Clicking each sidebar/drawer item smoothly scrolls to its section and marks exactly that item active (`aria-current="page"`); manual scrolling does the same.
- `prefers-reduced-motion: reduce` makes anchor clicks jump instantly.
- The eight retired routes 404; `/resume` still 200s, reachable only via the secondary-nav Resume link (Phosphor `FileTextIcon`).
- `npm run lint` / `npm run build` pass.

## Validation Plan

- `npm run lint` / `npm run build`.
- `curl` structural checks: single `<h1>` on `/`, all nine section ids present, retired routes 404, `/resume` 200.
- Manual check (no headless browser tool available in this environment): click through every nav item both desktop/mobile, scroll manually and watch the active item track, resize across `lg:`.
- Maps to Pull Request Checklist (AGENTS.md §29), especially "if navigation changed, update the IA doc."

## Risks

- **"View All" CTAs are deliberately not implemented** in this pass (Projects/Case Studies/Blog sections show featured content only, no link) — there's nowhere for them to go until the listing routes exist. Flagging so it reads as a scoped decision, not a missing feature.
- **`ExternalLink.icon: React.ElementType`** is intentionally loose (it has to accept both a plain local component and a Phosphor `ForwardRefExoticComponent` in the same field) — `ExternalLinkItem.tsx` already only ever passes `className`, so this doesn't lose any real type safety in practice, but it's worth knowing the field is looser than before if a future icon needs more specific props.
- **IntersectionObserver tie-breaking** is a judgment call (documented in the hook) — reasonable and standard, retunable later without touching anything else.
- **No redirects** from retired routes to `/#id` — acceptable pre-launch, worth revisiting before real launch if these URLs are ever shared.
- **Per-route metadata is lost** for retired routes — expected for a single-page site; `app/layout.tsx`'s one `metadata` export is now the only title/description source.
