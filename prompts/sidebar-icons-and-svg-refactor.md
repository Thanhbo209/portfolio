# Sidebar Icons, Sliding Highlight, Wide Layout, Local SVG Icons

## Context

Follow-up refactor of the global application shell built in `prompts/global-app-shell.md`. Five changes requested: (1) an icon before every sidebar nav item, (2) a redesigned hover/active highlight that slides left-to-right with a sharp triangular right edge, (3) removing the `max-w-3xl` placeholder constraint so pages can go wide, (4) moving social/tech-stack icons off the npm icon library and onto real local SVGs, (5) codifying that icon-sourcing rule in AGENTS.md. `app/about/page.tsx` was already hand-edited (outside this session) to drop its `max-w-3xl` entirely — that's the precedent item 3 should match exactly on the remaining 9 pages.

## Goals

- Every one of the 10 primary nav items (in both the desktop `Sidebar` and the `MobileNavDrawer`, since both render the shared `NavItem`) shows a semantically appropriate icon before its label.
- Hovering or activating a nav item reveals a highlight that visibly sweeps in from the left edge and ends in a sharp triangular point on the right, replacing the current flat `bg-*` swap. Applies identically everywhere `NavItem` renders.
- All placeholder pages use the same unconstrained width `about/page.tsx` already uses — no `max-w-3xl` left anywhere.
- GitHub, LinkedIn, and Email icons in the sidebar's external-links row come from real, locally-vendored SVG artwork instead of `@phosphor-icons/react`. Generic UI icons (menu, close, theme toggle) and the 10 nav-item icons are unaffected — they aren't brand marks, so the existing icon-library policy still applies to them.
- AGENTS.md states, as a standing rule, that social-link and tech-stack icons must be real sourced `.svg` assets, not generic icon-library placeholders — so this convention holds the next time tech-stack logos are built.

## Loaded Skills

✓ `design-taste-frontend` ("Taste") — the only skill present under `.agents/skills/`. Applied here: §4.8 (real, sourced brand marks — Simple Icons/devicon-style sourcing, not fabricated logos), §4.4's Shape Consistency Lock (the new flag-shaped highlight is one documented shape, used identically everywhere it appears), §5 "motion must be motivated" (the slide communicates hover/active state, nothing decorative), §6.A (animate only `transform`, not layout properties), §6.B (reduced-motion fallback).

No `nextjs`/`react`/`tailwind`/`accessibility` skill files exist yet — proceeding on AGENTS.md's own §11 (Server/Client), §14–15 (styling/Tailwind), §16 (accessibility) per §8.3.4.

## Investigation notes (why local SVG ≠ `public/` `<img>` for the social icons)

`@phosphor-icons/react` icons render as real inline `<svg>` elements in the DOM, so `fill="currentColor"` picks up whatever text color class is active — that's how the existing hover/dark-mode recoloring works. A file referenced via `<img src="/icons/x.svg">` is loaded as an isolated document: page CSS, `currentColor`, and hover states do **not** reach into it. Since the sidebar's social icons need to keep tracking `sidebar-foreground` → `sidebar-accent-foreground` on hover across both themes, item 4 is implemented as small local components with the real SVG markup inlined (still "local .svg icons," not pulled from the npm icon package) — not as static files in `public/`.

This is also exactly where the two upcoming asset types diverge, which is what AGENTS.md's new rule (item 5) needs to capture:
- **Monochrome, theme-adaptive icons** (social links here; any future single-tone glyph that must recolor with the theme) → local component, real vendored path data, `fill="currentColor"`.
- **Full-brand-color logos** (a future tech-stack grid — React blue, Next.js black, Tailwind cyan, etc.) → real static `.svg`/`.png` files in `public/`, rendered via `next/image`/`<img>`, with a separate light/dark variant file only where the mark itself needs one for contrast (matches the naming convention the prior portfolio used, e.g. `nextjs-dark.svg`) — never recolored via CSS, since brand color is the point.

Sourcing used for this change: Font Awesome Free (CC BY 4.0) via the `@fortawesome/fontawesome-free` package's published SVGs (`github`, `linkedin-in`, `envelope`) — verified reachable, all three ship `fill="currentColor"` natively and an embedded license comment that stays in the vendored file as attribution. Simple Icons' CDN was tried first for GitHub/LinkedIn; LinkedIn's mark has been removed from that library entirely (confirmed via a 404 against the canonical `simple-icons` GitHub repo, not just the CDN), so Font Awesome is used for all three social icons instead of mixing sources.

## Architecture

```
components/
  ui/
    icons/
      GithubIcon.tsx        (new) — local component, real FA path data, fill="currentColor"
      LinkedinIcon.tsx      (new) — same
      EnvelopeIcon.tsx      (new) — same
  layout/
    NavItem.tsx             (edit) — icon prop rendering + new sliding/triangular highlight
    ExternalLinkItem.tsx    (edit) — use local icon components instead of Phosphor
types/
  navigation.ts             (edit) — NavItem gets `icon: Icon`; ExternalLink's icon becomes a component reference like NavItem's, dropping the string-keyed lookup
constants/
  navigation.ts             (edit) — attach a Phosphor icon per primary-nav item; attach the new local components per external link
app/
  globals.css               (edit) — one small utility class for the highlight's clip-path shape
  page.tsx                          (edit) — drop max-w-3xl
  experience/page.tsx               (edit) — drop max-w-3xl
  projects/page.tsx                 (edit) — drop max-w-3xl
  case-studies/page.tsx             (edit) — drop max-w-3xl
  blog/page.tsx                     (edit) — drop max-w-3xl
  tech-stack/page.tsx               (edit) — drop max-w-3xl
  certifications/page.tsx           (edit) — drop max-w-3xl
  resume/page.tsx                   (edit) — drop max-w-3xl
  contact/page.tsx                  (edit) — drop max-w-3xl
AGENTS.md                    (edit) — new §4.6 codifying the icon-sourcing rule
```

`about/page.tsx` is not touched — it's already the target state.

### Nav-item icon mapping (Phosphor, unchanged library — these are section glyphs, not brand marks)

| Item | Icon |
|---|---|
| Overview | `HouseIcon` |
| About | `UserIcon` |
| Experience | `BriefcaseIcon` |
| Projects | `FolderIcon` |
| Case Studies | `NotebookIcon` |
| Blog | `ArticleIcon` |
| Tech Stack | `CodeIcon` |
| Certifications | `CertificateIcon` |
| Resume | `FileTextIcon` |
| Contact | `EnvelopeSimpleIcon` |

All ten confirmed to exist in the installed `@phosphor-icons/react` version; imported from `/dist/ssr` in `constants/navigation.ts` so the data module stays Server-Component-safe (it's consumed by both the server `Sidebar` and the client `MobileNavDrawer`/`NavItem`).

### Highlight shape & motion

A single Tailwind/CSS treatment, defined once and used identically for hover and active on every `NavItem` (desktop and mobile — same shared component, so no duplication):

- A small utility class in `globals.css` sets `clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%)` — a flag shape: flat left edge, sharp triangular point on the right.
- An absolutely-positioned `<span>` inside the (now `relative overflow-hidden`) link carries that class plus `origin-left transition-transform duration-300 ease-out motion-reduce:transition-none`.
- Not active: `scale-x-0 bg-sidebar-accent`, revealed via `group-hover:scale-x-100` (slides in on hover, slides back out on hover-leave).
- Active: `scale-x-100 bg-sidebar-primary` unconditionally (matches the current active/hover color split, just reshaped and animated).
- Icon and label sit in a `relative z-10` layer above the highlight span so they're never clipped or obscured.
- Only `transform` is animated (per the Taste skill's hardware-acceleration guidance) — the clip-path itself is static, not interpolated.

## Implementation Steps

1. Add `app/globals.css`'s `.nav-highlight` utility class (clip-path only).
2. Add the three local icon components under `components/ui/icons/` with the vendored Font Awesome SVG markup (`fill="currentColor"`, license comment preserved), each accepting `className` and spreading `SVGProps<SVGSVGElement>`.
3. Update `types/navigation.ts`: `NavItem.icon: Icon` (from `@phosphor-icons/react`); `ExternalLink.icon` becomes the same shape (a component), dropping the `"github" | "linkedin" | "email"` string union.
4. Update `constants/navigation.ts`: import the 10 Phosphor icons (`/dist/ssr`) and the 3 local icon components; attach one to each entry.
5. Update `components/layout/NavItem.tsx`: render the icon, restructure the link markup for the sliding highlight span, keep `aria-current` and the existing active/inactive text-color ternary.
6. Update `components/layout/ExternalLinkItem.tsx`: remove the Phosphor imports and the `ICONS` string-keyed map; render `link.icon` directly, matching `NavItem`'s pattern.
7. Remove `max-w-3xl` from the 9 listed page files, matching `about/page.tsx`'s existing `mx-auto px-6 py-16 lg:px-12`.
8. Add AGENTS.md §4.6 (icon-sourcing rule) and a one-line mention of `components/ui/icons/` in the §5 target-structure tree.
9. Run validation.

## Acceptance Criteria

- Every nav item, in both the desktop sidebar and the mobile drawer, shows an icon to the left of its label.
- Hovering a non-active nav item animates a flag-shaped highlight sweeping in from the left over ~300ms and back out on hover-leave; the active item shows the same shape permanently in the stronger `sidebar-primary` color. Both survive a resize between desktop/mobile since they're the same component.
- With `prefers-reduced-motion: reduce`, the highlight appears/disappears instantly with no transition.
- No page under `app/` contains `max-w-3xl`; all 9 edited pages render identically to `about/page.tsx`'s current width behavior.
- `ExternalLinkItem` and its three icons render with no import from `@phosphor-icons/react`; GitHub/LinkedIn/Email icons visibly recolor on hover and remain legible (WCAG AA) in both light and dark themes.
- `npm run lint` / `npm run build` pass; no new `any`, no unused Phosphor imports left behind in `ExternalLinkItem.tsx`.
- AGENTS.md's new §4.6 is present and unambiguous about which asset type (local component vs. `public/` file) applies to which case.

## Validation Plan

- `npm run lint` and `npm run build`.
- Structural check via `curl` against the (already-running) dev server: confirm nav icons + highlight span markup appear in the rendered HTML for `/` and one other route, confirm no `max-w-3xl` remains, confirm `ExternalLinkItem`'s output no longer references Phosphor's `github-logo`/`linkedin-logo` SVG title text and instead contains the vendored FA path data.
- Manual/visual spot-check by the user (no headless browser tool is available in this environment, per the prior shell task): hover each nav item to confirm the sweep direction and triangular point, toggle theme to confirm contrast, resize below `lg:` to confirm the mobile drawer's `NavItem`s behave identically.
- This maps to the Pull Request Checklist (AGENTS.md §27) plus the Taste skill's relevant Pre-Flight items (shape consistency, reduced motion, contrast, real sourced icons, hardware-accelerated animation).

## Risks

- **Font Awesome CC BY 4.0 attribution** is satisfied by keeping the embedded license comment inside each vendored component file — flagging this explicitly since it's a real (if minor) licensing obligation, not just a style choice.
- **Clip-path + `overflow-hidden` interaction**: the flag shape's sharp corners rely on the parent link keeping its current `rounded-md` + `overflow-hidden`; if a future change removes `overflow-hidden` from the link, the highlight will paint outside the intended rounded box. Worth a one-line comment in the code.
- **Icon semantic choices** (e.g. `NotebookIcon` for Case Studies, `CodeIcon` for Tech Stack) are a reasonable but subjective mapping — easy to swap later since they're centralized in one constants file.
- Tech-stack visuals themselves are not built in this change (no tech-stack UI exists yet) — item 4's tech-stack half is satisfied by the AGENTS.md rule only (item 5), so that convention is ready when that page is actually implemented.
