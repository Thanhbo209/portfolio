# Overview Section — Bento Dashboard

## Context

The Overview section (`components/sections/Hero.tsx`) currently renders only a placeholder heading + "coming soon" line. This replaces it with a real, data-forward snapshot — a 2×2 bento grid a recruiter can scan in 5–10 seconds — while explicitly staying out of "introduction" territory (that's the About section's job).

Per your answers to the clarifying questions: the Education card is deferred (content/logo held back until you share the reference image; the other three cards ship now), the GitHub Activity card uses real data (live repo count + an embedded contribution heatmap, no new secrets), and the restored FlyRank AI logo (black background baked into the file) gets a dark badge-chip treatment so it reads as intentional in both themes.

## Design Read (Taste skill, §0.B)

*"Reading this as: a portfolio's at-a-glance summary section — not a SaaS admin dashboard (the Taste skill's dashboard exclusion targets dense product UI/admin panels, not a 4-card portfolio snapshot) — for recruiters scanning quickly, with a clean, data-forward bento language, leaning on this project's existing tokens + Phosphor icons."*

Dials, scoped to this one section: `DESIGN_VARIANCE: 4` (orderly/scannable — a dashboard wants structure, not asymmetry), `MOTION_INTENSITY: 3` (static by default; a subtle hover state on cards at most), `VISUAL_DENSITY: 6` (deliberately denser than the rest of the site's sections — this is the one place the homepage is information-forward rather than airy).

## Loaded Skills

✓ `design-taste-frontend` ("Taste") — applied: §4.7 Bento Cell Count Rule (4 items → 4 cells, no empty/mismatched cells), §4.7 Bento Background Diversity (the Education and GitHub cards carry real visual assets — a logo, a chart — so the grid isn't 4 identical white-on-white text tiles), §4.4 Shape Consistency Lock (one card primitive, one radius/border system, reused by all four), §4.2 Color Consistency Lock (reuses the site's existing single accent rather than introducing a second one for the heatmap), §9.D (no fabricated stats — the repo count is real, fetched; the description text is flagged as a placeholder for you to fact-check, not invented specifics presented as fact), §13 Out of Scope (confirmed this reads as a portfolio section, not the dashboard/admin-panel case the skill excludes).

No `nextjs`/`react`/`accessibility`/`seo` skill files exist yet — proceeding on AGENTS.md's own §14 (Server/Client), §18 (Tailwind), §19 (Accessibility), §21 (Performance), §23 (Data Fetching).

## Architecture

### Layout

`Hero.tsx` renders `<Section id="overview" heading="Overview" headingLevel="h1" align="start">` — switching from the default `align="center"` to `"start"`, using the `align` prop exactly as it was designed for ("intentionally aligned based on the section's purpose," per §5). A dashboard reads top-down; centering four cards vertically would waste the space centering is meant to use for short text.

Below the heading, a grid: `grid grid-cols-1 sm:grid-cols-2 gap-6`. One column stacked on mobile, two columns (the requested 2×2) from the `sm` breakpoint up through desktop — see the responsiveness breakdown below.

### New shared primitive: `components/ui/Card.tsx`

A small, generic bordered container (`border border-border bg-card rounded-md p-6` — all existing tokens, nothing new) that all four cards build on. This is what makes the Shape Consistency Lock automatic (one radius/border definition, not four copies of it) and belongs in `components/ui/` per its existing definition ("small, generic, presentational primitives" — AGENTS.md §7). It's also immediately reusable the next time any section needs a card (Projects, Case Studies, Certifications will likely all want one).

### Four card components under `components/sections/overview/`

Colocated in a subfolder scoped to this one section (each card is used exactly once, right now — per §8.8, colocation over premature structure) rather than inlined into one large `Hero.tsx`, which would blow past the ~150-line component guideline (§26) once four real cards are in it.

- **`CurrentPositionCard.tsx`** — FlyRank AI, "AI Backend Engineering Intern," "Jun 2026 – Present," a short description. Includes the restored `public/companies/flyrank-ai.jpg` logo in a small fixed-dark rounded badge chip (so its baked-in black background reads as intentional, not a broken image, in either theme).
  **The description line is placeholder copy** ("Building and maintaining backend services and AI-powered features for FlyRank's platform.") — flagged explicitly so you can correct it to what you actually worked on rather than me inventing specifics I can't verify.
- **`EducationCard.tsx`** — **deferred per your answer.** Ships as a minimal placeholder (heading + "Coming soon," same pattern every other not-yet-built section already uses) so the grid stays a real 2×2 with no empty/broken cell. Full content (HUFLIT logo, degree, expected graduation) and its specific visual treatment land once you share the reference image.
- **`GitHubActivityCard.tsx`** — an `async` Server Component. Fetches real public repo count server-side via `lib/github.ts`, embeds a real contribution heatmap image, links to your GitHub profile (reusing the existing `components/ui/icons/GithubIcon.tsx` — no new icon).
- **`QuickFactsCard.tsx`** — compact icon + label rows: Ho Chi Minh City (`MapPinIcon`), TOEIC 870 (`SealCheckIcon`), AI Engineering (`BrainIcon`), Full-Stack Engineering (`StackIcon`) — all confirmed present in the installed Phosphor package.

### `lib/github.ts` (new) — real data, no new secrets

```ts
const GITHUB_USERNAME = "Thanhbo209";

export interface GithubStats {
  publicRepos: number;
}

export async function getGithubStats(): Promise<GithubStats | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      next: { revalidate: 3600 }, // repo count doesn't change minute-to-minute
    });
    if (!res.ok) return null;
    const data = await res.json();
    return { publicRepos: data.public_repos };
  } catch (err) {
    console.error("Failed to fetch GitHub stats", err);
    return null;
  }
}
```

This is, almost verbatim, the exact example AGENTS.md §23 already names ("e.g. `lib/github.ts` exporting `getRepoStats()`") — this plan just implements what was already the documented convention. Verified live against the real profile (`Thanhbo209` → "Pham Thanh," 19 public repos) and the heatmap service before writing this plan, so both data sources are confirmed working, not assumed.

**On `null`:** if the GitHub API is unreachable or rate-limited, the card renders without the repo-count line rather than crashing the page (§22 Error Handling — never let an external-service failure blank a whole page over one card's data).

### The heatmap image is a plain `<img>`, not `next/image` — a deliberate, documented exception

AGENTS.md §21 says images go through `next/image`. Next's image optimizer refuses to process remote SVGs at all unless you set `dangerouslyAllowSVG` (a real security-relevant flag, since SVGs can carry scripts) — for a pre-rendered chart image where `next/image`'s actual benefits (format conversion, responsive `srcset`, layout-shift reservation) don't meaningfully apply, loosening that setting isn't worth it. A plain `<img>` with a one-line comment explaining exactly this trade-off is the lower-risk choice, and keeps the exception visible in the code rather than silently bypassed.

### Files Affected

**New:** `lib/github.ts`, `components/ui/Card.tsx`, `components/sections/overview/CurrentPositionCard.tsx`, `components/sections/overview/EducationCard.tsx`, `components/sections/overview/GitHubActivityCard.tsx`, `components/sections/overview/QuickFactsCard.tsx`.

**Restored (from git history, commit `4ad2b7d`):** `public/companies/flyrank-ai.jpg`.

**Edited:** `components/sections/Hero.tsx` (rewritten to compose the grid).

**Not touched:** `next.config.ts` (no `next/image` remote pattern needed — the one external image is the deliberate plain-`<img>` exception above), `AGENTS.md` (no new pattern being introduced beyond what §23 already documents; `Card.tsx` fits `components/ui/`'s existing definition as-is).

## Bento Grid Responsiveness

- **Mobile (`<640px`, below Tailwind's `sm`):** `grid-cols-1` — all four cards stack in a single column, full width, in reading order (Current Position → Education → GitHub Activity → Quick Facts). No 2×2 shape here; a 2-column grid at phone width would make each card too narrow for its content (especially the heatmap).
- **Tablet (`sm` to `lg`, 640–1023px):** `sm:grid-cols-2` takes effect — the real 2×2 shape forms as soon as there's room for it, well before the desktop breakpoint.
- **Desktop (`lg`+, 1024px+, sidebar-offset content area):** stays `grid-cols-2` — exactly the requested 2×2, not expanded to a wider 4-across row, since a single row would stop being a "bento grid" and just become a horizontal stat strip.

## Acceptance Criteria

- `/` Overview section shows a heading plus a 4-card grid: Current Position, Education (placeholder), GitHub Activity, Quick Facts.
- All four cards share one visual system (radius, border, padding) via `components/ui/Card.tsx`.
- GitHub Activity shows a real, currently-fetched repo count and a real contribution heatmap image for `Thanhbo209`; both degrade gracefully (card renders without the stat, not a broken page) if the fetch fails.
- Current Position shows the restored FlyRank AI logo in a dark badge chip, legible in both light and dark theme.
- Grid is 1 column on mobile, 2 columns from `sm` up (tablet and desktop both show the 2×2).
- `npm run lint` / `npm run build` pass.

## Validation Plan

- `npm run lint` / `npm run build`.
- `curl` check: `/` still returns the real repo count value somewhere in the rendered HTML (proves the server fetch actually ran, not just compiled).
- Manual/visual check via screenshot (no headless browser interaction tool in this environment): grid shape at mobile/tablet/desktop widths, both themes, and that the whole dashboard is visible without scrolling on a normal desktop viewport per the Section Layout Rules.

## Risks

- **"Fits in one viewport on desktop" is a design target, not a hard technical guarantee.** `Section` uses `min-h-dvh` (a floor, not a ceiling) by design (§5) — I'm keeping card content and padding compact enough to comfortably fit typical desktop viewport heights, but on an unusually short window the grid could in principle need a touch more than one screen. No JS viewport-fitting logic is being added for this (would be real complexity for a marginal, rare case) — flagging so it's a known, accepted trade-off, not a silent gap.
- **Current Position's description is placeholder copy** — needs your edit to be accurate.
- **Education card ships incomplete** in this pass, by your choice — a visible "coming soon" card, not a broken or missing one.
- **Third-party heatmap service dependency** (`ghchart.rshah.org`) — no auth, no cost, but it is an external service; if it ever goes down the `<img>` just fails to load (broken-image icon) rather than breaking the page, same failure mode as any embedded image.
