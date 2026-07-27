# Tech Stack Section

## Context

The Tech Stack nav item (`#tech-stack`) is a placeholder. The user wants a
categorized "engineering toolbox" instead of a logo wall, sourced only from
the resume's Skills section plus verified technologies already used in the
Experience and Projects sections of this site (`content/projects.ts`,
`components/sections/Experience.tsx`).

## Real technologies used (verified only)

Only technologies with a real, sourceable brand mark are included — an
abstract skill phrase from the resume with no product/brand behind it
(e.g. "REST APIs", "AI API Integration", "AI-assisted Development", "CI/CD")
has no logo to source and is **omitted** rather than represented with a
hand-drawn icon, per AGENTS.md §12 ("verify it still exists in a real icon
source... rather than hand-drawing it"). For the same reason, **Zustand**,
**CVAT**, and **Puter.js** are used elsewhere on this site (Experience/
Projects) but have no entry in Simple Icons or devicon, so they're left out
of this specific grid rather than faked.

All 28 logos below were verified to exist and were fetched from Simple
Icons (open-source, CC0) into `public/tech/*.svg` already, in their real
brand colors:

| Category | Technologies (logo slug) |
| --- | --- |
| Languages | JavaScript, TypeScript, Python, HTML, CSS |
| Frontend | React, Next.js, Tailwind CSS, Vite, React Router, React Flow (xyflow) |
| Backend | Node.js, Express, FastAPI, JSON Web Tokens |
| Database | PostgreSQL, Prisma, MongoDB, Redis |
| AI / Machine Learning | NumPy, Pandas, OpenCV, YOLOv8 (Ultralytics mark), Claude (Anthropic) |
| DevOps & Tools | Git, GitHub, Docker, Postman |

### Proficiency levels (proposed — please correct any you'd rate differently)

Since "proficiency" is inherently a self-assessment, I inferred a level per
technology from how it's actually used across the resume/Experience/
Projects (daily use in the current role or a project's centerpiece tech →
Advanced; used to ship a completed project → Proficient; listed but only
lightly exercised → Working Knowledge). Full list will be in
`content/tech-stack.ts`; highlights: **Advanced** — TypeScript, Python,
React, Node.js, PostgreSQL, YOLOv8, Git, GitHub. Everything else lands at
Proficient or Working Knowledge; nothing is marked "Learning" today (that
tier exists in the type for future additions). Flag anything you'd rate
differently and I'll adjust the data file directly — no component changes
needed.

### Related projects / experience (hover reveal)

Where a resume bullet or project ties a technology to specific, named work,
that's recorded as `relatedProjects`/`relatedExperience` (e.g. TypeScript →
FlyRank AI experience + FinAI project). Technologies that are only listed
generically in the resume's Skills section (Vite, MongoDB, Redis, Postman,
HTML, CSS) have no related links, and simply render without the hover
affordance — no invented association.

## 1. Layout

`Section` (`align="start"`) containing a Bento grid of exactly 6 cards, one
per category — matching the loaded design-taste skill's Bento Cell Count
Rule (6 items → 6 cells, no filler):

```
grid-cols-1            (mobile: 6 cards stacked)
sm:grid-cols-2         (tablet: 3 rows of 2)
lg:grid-cols-3         (desktop: 2 rows of 3)
```

Every card gets `h-full` inside a stretched grid cell (the same fix already
applied in the Experience section) so cards in the same row line up evenly
even though categories hold different numbers of items (4-6) — "consistent
card heights" is achieved via CSS Grid's row-stretch behavior, not by
forcing every card to list the same item count.

Each category card: a header (Phosphor icon + category name, reusing the
existing icon vocabulary — `BrainIcon` for AI/ML and `WrenchIcon` for
DevOps & Tools already appear elsewhere on the site, e.g. Experience's
Technical Focus card) followed by a vertical list of tech item rows.

Every logo sits in a small white rounded tile (`bg-white p-1 rounded-md`),
the same pattern already used for FlyRank/HUFLIT/Acacy logos elsewhere on
this site — several of the real brand marks are near-black by default
(Next.js, Express, GitHub, Prisma, Anthropic, xyflow), so a fixed white tile
guarantees contrast in both themes without hand-crafting a dark-mode
variant for each of the 28 marks individually. Brand colors themselves are
never altered.

## 2. Data structure

`content/tech-stack.ts` (typed, central source — nothing hardcoded in
components):

```ts
export type ProficiencyLevel =
  | "Advanced"
  | "Proficient"
  | "Working Knowledge"
  | "Learning";

export interface TechItem {
  name: string;
  logo: string;                 // path under /public/tech
  proficiency: ProficiencyLevel;
  relatedProjects?: string[];   // project titles from content/projects.ts
  relatedExperience?: string[]; // company names from the Experience section
}

export interface TechCategory {
  name: string;
  icon: Icon;                   // Phosphor icon component reference
  items: TechItem[];
}

export const techCategories: TechCategory[] = [ /* 6 categories, 28 items total */ ];
```

The section component only ever does
`techCategories.map((category) => <TechCategoryCard category={category} />)`
— adding, removing, or re-tiering a technology is a data-file edit only, no
JSX/layout changes (satisfies "must automatically update when new
technologies are added").

## 3. Files affected

- `public/tech/*.svg` — 28 new files, already fetched from Simple Icons (real brand marks, correct license).
- `content/tech-stack.ts` — new: types + the 6 categories / 28 items described above.
- `components/sections/techstack/TechCategoryCard.tsx` — new, Server Component: card header + list of `TechItemRow`.
- `components/sections/techstack/TechItemRow.tsx` — new, Server Component: logo tile, name, proficiency badge, and (only when `relatedProjects`/`relatedExperience` exist) a CSS-only hover/focus reveal — no client JS anywhere in this feature.
- `components/sections/TechStack.tsx` — modified: replace the placeholder with the 6-card Bento grid.

No new dependency. No Client Component needed at all — the hover reveal is
pure CSS (`group-hover:`/`group-focus:` + `max-h` transition,
`motion-reduce:transition-none`), unlike Projects' carousel which genuinely
needed JS for scroll-position tracking.

## 4. Responsive behavior

- **Mobile (`<640px`)**: 1 column, all 6 cards stacked full-width.
- **Tablet (`sm`, ≥640px)**: 2 columns, 3 rows.
- **Desktop (`lg`, ≥1024px)**: 3 columns, 2 rows.

Within a card, tech item rows are a simple vertical list at every
breakpoint (logo, name, and badge stay on one line down to small mobile
widths — no internal wrapping grid needed since a single column of rows is
already narrow-friendly).

## One flagged inconsistency

The brief says "Occupy at least one viewport (`min-h-screen`)" — same as
the Experience and Projects briefs. As before, this plan uses the shared
`Section` component unchanged, which already enforces `min-h-dvh` per
AGENTS.md §5 (never `min-h-screen`). Reading "at least one viewport" as the
intent, not a request to reintroduce the banned class.

## Acceptance Criteria

- Given the section renders, exactly 6 category cards appear, each listing only technologies with a real, sourced logo.
- Given a technology has `relatedProjects`/`relatedExperience`, hovering or focusing its row reveals that text; technologies without either render with no hover affordance.
- Given `content/tech-stack.ts` gains or loses an item, no component file needs to change.
- Given `prefers-reduced-motion: reduce`, the hover/focus reveal has no transition (appears/disappears instantly, not animated).
- No progress bars or percentage ratings appear anywhere in the section.

## Validation Plan

- `npm run lint` — zero warnings.
- `npm run build` — TypeScript strict-checks clean.
- Manual check: visit `/#tech-stack`, confirm all 28 logos render legibly in both light and dark theme, confirm hover/focus reveal works via mouse and via Tab key on at least one item per category that has related links.

## Risks

- Proficiency levels are my inference from verified usage patterns, not a
  self-report — flagged above for correction.
- Vite, MongoDB, Redis, Postman, HTML, and CSS have no related-project/
  experience links because the resume only lists them generically; this is
  intentional, not a gap to fill with a guess.
