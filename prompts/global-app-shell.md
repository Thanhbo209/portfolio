# Global Application Shell

## Context

The repository is currently a bare `create-next-app` scaffold (`app/layout.tsx`, `app/page.tsx`, `app/globals.css`) with no navigation, no theming, and no route structure. `AGENTS.md` §4 already fixes the site's Information Architecture (10-item sidebar nav + external links) and §4.5 names the exact files this shell should produce. This plan implements that shell: the persistent sidebar, the mobile drawer, dark/light theming, and the root layout wiring — nothing else.

`app/globals.css` already defines a full shadcn/ui-style semantic token set (`--background`, `--foreground`, `--sidebar`, `--sidebar-foreground`, `--sidebar-primary`, `--sidebar-accent`, `--sidebar-border`, etc.) mapped into Tailwind via `@theme inline`, plus a `.dark` class + `@custom-variant dark (&:is(.dark *))`. This is class-based dark mode wiring with dedicated sidebar tokens already in place — the shell should consume these tokens as-is, not invent new ones.

## Goals

- A persistent left sidebar (desktop, `lg:` and up) with the 10 fixed nav items and the 3 external links from AGENTS.md §4.1–§4.2, always visible and never remounted per page.
- A mobile navigation drawer (below `lg:`) triggered from a compact top bar, satisfying AGENTS.md §4.4 (closes on route change / outside click / Escape, traps focus, returns focus to the trigger).
- Correct active-item highlighting (URL-derived, `aria-current="page"`) per AGENTS.md §4.3.
- Dark/light theming wired through the existing semantic tokens, defaulting to system preference, with a manual toggle, no hydration flash.
- A root layout that composes all of the above per Next.js App Router conventions, plus minimal placeholder routes so every nav item resolves instead of 404ing.
- No page content, animation choreography, business logic, or data fetching beyond what the shell itself needs to function.

## Design Read (Taste skill, §0.B)

*"Reading this as: a developer/AI-engineering portfolio's global chrome for recruiters and startup founders, with a clean, restrained technical language, leaning on Tailwind v4 utilities + Geist + the project's existing shadcn-style semantic tokens."*

Dials, scoped to a shell (not a marketing page): `DESIGN_VARIANCE: 5` (orderly, functional — a sidebar is structural chrome, not a hero), `MOTION_INTENSITY: 3` (per explicit scope limit — a single slide/opacity transition on the drawer, CSS `:hover`/`:active` states, nothing choreographed), `VISUAL_DENSITY: 4` (standard app spacing).

## Loaded Skills

✓ `design-taste-frontend` ("Taste") — the only skill present under `.agents/skills/`. Applied: RSC/client-leaf isolation rules (§3.A), icon policy (§3.C), dark mode protocol (§8), reduced-motion + focus/contrast guardrails (§6), nav single-line/height constraints (§4.7, applied to the mobile top bar), AI-tell avoidance (no hand-rolled SVGs, no fabricated logo).

No `nextjs`, `react`, `tailwind`, `accessibility`, or `performance` skill files exist yet under `.agents/skills/` (AGENTS.md §8 names them as target folders, not present today) — proceeding on AGENTS.md's own sections for those domains (§11 Server/Client rules, §14–15 styling/Tailwind, §16 accessibility) rather than guessing at a nonexistent skill file, per §8.3.4.

## Architecture

Matches AGENTS.md §4.5 and §5/§6 exactly, plus the supporting files those components need:

```
app/
  layout.tsx                 (edit) — compose ThemeProvider + Sidebar + MobileNavDrawer + main content
  page.tsx                   (edit) — placeholder "Overview" content
  about/page.tsx             (new)  — placeholder
  experience/page.tsx        (new)  — placeholder
  projects/page.tsx          (new)  — placeholder
  case-studies/page.tsx      (new)  — placeholder
  blog/page.tsx              (new)  — placeholder
  tech-stack/page.tsx        (new)  — placeholder
  certifications/page.tsx    (new)  — placeholder
  resume/page.tsx            (new)  — placeholder
  contact/page.tsx           (new)  — placeholder
components/
  layout/
    Sidebar.tsx               (new) — desktop persistent sidebar (Server Component)
    MobileNavDrawer.tsx        (new) — mobile top bar + drawer (Client Component)
    NavItem.tsx                 (new) — shared nav link, active-state aware (Client Component)
    ThemeProvider.tsx           (new) — next-themes wrapper (Client Component)
    ThemeToggle.tsx             (new) — light/dark toggle button (Client Component)
constants/
  navigation.ts               (new) — single source of truth for nav items + external links
types/
  navigation.ts               (new) — NavItem / ExternalLink shared types
lib/
  utils.ts                    (new) — cn() className helper
```

Dependency direction stays one-way per AGENTS.md §7.10: `app/` → `components/layout/*` → `constants/` + `types/` + `lib/`. No new `components/ui/` primitives are needed yet — the shell doesn't need a generic Button/Badge library to ship, so none are added prematurely (AGENTS.md §7.5, Avoid unnecessary abstractions).

### Why a new dependency in each case (AGENTS.md §7.4 / §3)

| Package | Why the standard library / existing deps can't do this reasonably |
|---|---|
| `next-themes` | Hydration-safe theme persistence + system-preference sync is easy to get subtly wrong by hand (flash of wrong theme on load, SSR/CSR mismatch warnings). It is the de facto standard pairing for Next.js + Tailwind class-based dark mode and is a few KB. |
| `@phosphor-icons/react` | The Taste skill bans hand-rolled SVG icon paths and discourages `lucide-react` as a default; the shell needs a menu/close glyph and GitHub/LinkedIn/Email marks. Phosphor is first in the skill's allowed-library priority order and nothing is installed yet. |
| `clsx` + `tailwind-merge` | AGENTS.md §24 requires reusable components to support `className` passthrough "merged via a `cn()` utility." Implementing conflict-safe Tailwind class merging by hand is exactly what these two small, standard packages exist to solve correctly. |

No state management library, CSS-in-JS, or UI kit (shadcn CLI, Radix Themes, etc.) is introduced — the existing hand-authored tokens are sufficient for a shell this size, and pulling in a full component system for one sidebar and one drawer would be premature per §7.5.

### Sidebar / Drawer mechanics

- `Sidebar.tsx` is a **Server Component**: static chrome (site mark, `<nav aria-label="Primary">`, external links, theme toggle slot) built from `constants/navigation.ts`. It imports the client-leaf `NavItem` and `ThemeToggle` components but is not itself a Client Component — satisfies §11's "push `use client` to the smallest leaf."
- `NavItem.tsx` is a small **Client Component** (needs `usePathname()` for active-state + `aria-current`). Shared verbatim by `Sidebar` and `MobileNavDrawer` so active-state logic exists in exactly one place (AGENTS.md §7.1, reuse over duplication).
- `MobileNavDrawer.tsx` is a **Client Component** rendering a `lg:hidden` top bar (site mark + menu button, height-capped per the Taste skill's nav height rule) and a native `<dialog>` element for the drawer panel. Using `<dialog>` gets native focus-trapping and Escape-to-close for free instead of a hand-rolled focus-trap hook — "boring technology" per AGENTS.md §7.5. The drawer closes on route change via a `usePathname()` effect, and on backdrop click via the standard `e.target === dialogRef.current` light-dismiss check.
- `ThemeProvider.tsx` wraps `next-themes`' provider with `attribute="class"` (matching the existing `.dark` class + `@custom-variant dark` wiring already in `globals.css` — no CSS changes needed) and is mounted once in `app/layout.tsx`.
- The root `<html>` tag gets `suppressHydrationWarning` (the standard, documented `next-themes` requirement — without it React logs a benign but noisy hydration warning because the theme class is applied client-side before paint).

### Layout composition

`app/layout.tsx` renders `<ThemeProvider><Sidebar /><MobileNavDrawer /><main className="lg:pl-64">{children}</main></ThemeProvider>`. The sidebar is `fixed inset-y-0 left-0 hidden lg:flex lg:w-64 lg:flex-col`; main content gets a matching `lg:pl-64` offset so content never sits under the fixed sidebar. Below `lg:`, the sidebar is hidden entirely and the mobile top bar + drawer take over — no double-rendering of navigation on any viewport.

### Placeholder pages

Each of the 9 non-root routes gets a minimal `page.tsx`: an `<h1>` with the section name, one sentence of "coming soon" placeholder copy, and route-appropriate `metadata` (title only, per AGENTS.md §17). This is the minimum needed to make the nav genuinely clickable and testable end-to-end (active state, focus return, drawer close-on-navigate) without building any real page content, which stays explicitly out of scope. `app/page.tsx` gets the same treatment for "Overview." Resume is treated as a normal placeholder route for now (no resume asset exists in the repo since the prior portfolio's files were removed) — swapping it for a direct file link is a one-line change in `constants/navigation.ts` once a real PDF exists, called out as a follow-up, not decided silently.

## Implementation Steps

1. Add dependencies: `next-themes`, `@phosphor-icons/react`, `clsx`, `tailwind-merge`.
2. Add `lib/utils.ts` (`cn()` via `clsx` + `twMerge`).
3. Add `types/navigation.ts` (`NavItem`, `ExternalLink` types).
4. Add `constants/navigation.ts` (the 10 primary items + 3 external links from AGENTS.md §4.1–§4.2).
5. Add `components/layout/ThemeProvider.tsx` and `components/layout/ThemeToggle.tsx`.
6. Add `components/layout/NavItem.tsx`.
7. Add `components/layout/Sidebar.tsx`.
8. Add `components/layout/MobileNavDrawer.tsx`.
9. Update `app/layout.tsx`: wrap in `ThemeProvider`, add `suppressHydrationWarning`, compose `Sidebar` + `MobileNavDrawer` + offset `<main>`.
10. Update `app/page.tsx` and add the 9 placeholder route files.
11. Run validation (below).

## Acceptance Criteria

- Given a desktop viewport (`≥1024px`), the sidebar is visible on every route, lists all 10 items in the fixed order plus GitHub/LinkedIn/Email, and never remounts/flickers on navigation.
- Given a mobile viewport (`<1024px`), the sidebar is not rendered; a top bar with a menu button is shown instead.
- When the menu button is tapped, the drawer opens, traps focus, and lists the same nav items and external links.
- When a nav item is activated, the drawer closes, navigation occurs, and focus returns to the menu button.
- Given the drawer is open, pressing Escape or clicking outside the panel closes it.
- Given any route, the nav item matching the current path is visually distinct and carries `aria-current="page"`; no other item does.
- Given no stored preference, the theme matches system `prefers-color-scheme`; toggling the theme switches instantly with no flash-of-incorrect-theme on reload, and the choice persists across reloads.
- Given `prefers-reduced-motion: reduce`, the drawer's open/close transition is disabled or reduced to an instant state change.
- All 10 nav routes plus `/` resolve to a placeholder page instead of a 404.
- External links open in a new tab (GitHub, LinkedIn) or as `mailto:` (Email), never intercepted by client-side routing.

## Validation Plan

- `npm run lint` — zero errors/warnings.
- `npm run build` — TypeScript strict-mode clean, production build succeeds.
- Manual QA in the browser (both required — this is a UI-only change, not covered by any existing automated test):
  - Resize across the `lg:` breakpoint and confirm the sidebar/drawer swap with no double-nav or gap.
  - Keyboard-only pass: open the drawer with keyboard, Tab through it, confirm focus stays trapped, Escape closes it, focus returns to the trigger.
  - Toggle the theme, hard-reload, confirm the choice persisted and there's no flash of the wrong theme.
  - Click every nav item and both external links; confirm routes resolve and active state is correct after each navigation.
- This matches the Pull Request Checklist (AGENTS.md §27) plus the Taste skill's Final Pre-Flight Check (§14) for the surfaces this shell touches (dark mode tested both modes, reduced-motion respected, no hand-rolled SVG icons, one accent/shape system, focus/contrast checked).

## Risks

- **`<dialog>` + Tailwind transitions**: native `<dialog>` doesn't animate its own open/close across all target browsers without `@starting-style`; the plan animates an inner wrapper's transform instead and treats the dialog itself as instant show/hide. Low risk, but worth a visual check in the manual QA pass.
- **Sidebar width (`w-64`) and drawer width** are a reasonable default, not a brand decision — easy to adjust later without structural changes.
- **No real logo/brand mark exists** (the prior portfolio's `avatar.jpg` etc. were removed from disk). The sidebar/drawer site mark will be a plain text placeholder ("Portfolio") rather than a fabricated logo — real branding is explicitly future content work, not part of this shell.
- **Resume route vs. direct file link**: deferred to a placeholder route per above; revisit once a real resume asset exists.
- Adding 9 near-identical placeholder `page.tsx` files is intentional repetition (each is 3 lines of real content) rather than a generated/looped abstraction — matches AGENTS.md §7.5 (three similar lines over premature abstraction) since each will diverge once real content lands.
