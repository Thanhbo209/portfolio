# Projects Section

## Context

The Projects nav item (`#projects`) currently renders a "coming soon"
placeholder. The user wants a horizontally-paginated, dashboard-style
showcase: 4 cards per screen on desktop, additional projects push new
horizontal pages instead of growing the section vertically.

## Goals

- Exactly 4 cards visible per screen on desktop (2x2), adapting to 2x1 on
  tablet and 1-per-view on mobile, using native CSS Scroll Snap only.
- Projects render from a typed central data source; adding/removing a
  project needs no layout code changes.
- Section height stays fixed at one viewport regardless of project count.
- No fabricated project data, links, or screenshots.

## Real data used (from the resume, already extracted this session)

Only 3 verified projects exist, each with a real GitHub URL and no verified
live-demo or case-study URL (both fields are optional in the data model and
simply omitted, per "omit rather than guess"):

1. **Retail Product Detection** — Python, YOLOv8, CVAT, OpenCV, Pandas, NumPy — github.com/Thanhbo209/retail-product-detection
2. **FinAI — Expense Intelligence Platform** — TypeScript, Node.js, Express, PostgreSQL, Prisma, Python, FastAPI, React, Docker — github.com/Thanhbo209/finAI-assistant
3. **AI Resume Analyzer** — JavaScript, React Router v7, Tailwind CSS, Puter.js, Zustand — github.com/Thanhbo209/ai-powered-resume-tracking

Each one-line description is a condensed paraphrase of that project's first
resume bullet — no new claims.

**No real screenshots exist on disk** (the old `public/projects/*` images
were placeholder/fake projects unrelated to these 3, and are already gone
from the repo). Per the loaded design-taste skill's image policy ("last
resort: tell the user" — no image-gen tool is available in this
environment, and fabricating a fake screenshot of a real project would
misrepresent it), each card ships with a clean placeholder tile (icon on a
muted background) instead of an `<img>`. **You'll need to supply real
screenshots** at the paths listed in Files Affected below to replace them.

## 1. Horizontal pagination strategy

Pure CSS, no JS chunking, no carousel library. The scroll container is a
CSS Grid with `grid-auto-flow: column` and a **fixed row count that changes
per breakpoint**:

- Mobile (base): `grid-rows-1`, each column = `100%` of the container width → 1 card per screen.
- Tablet (`sm:`): `grid-rows-1`, each column = `calc(50% - gap/2)` → 2 cards per screen (2x1).
- Desktop (`lg:`): `grid-rows-2`, same column width → 2 columns x 2 rows visible at once = 4 cards per screen (2x2).

Because the column count is driven by the CSS grid itself (not a
JS-computed array chunk), adding a 4th, 5th, 6th... project just adds more
grid columns — no page-grouping logic to update, and the same markup works
at every breakpoint. `scroll-snap-align: start` on each card plus
`snap-x snap-mandatory` on the container gives the snap-to-page feel;
`scroll-smooth motion-reduce:scroll-auto` (same convention already used on
`<html>` for nav anchors) respects reduced motion.

## 2. How projects group into pages of four

They don't get pre-grouped in the data or in JS at all — grouping is an
emergent property of the grid math above. `grid-auto-flow: column` with 2
explicit row-tracks fills column-major (item 1 → row 1/col 1, item 2 → row
2/col 1, item 3 → row 1/col 2, item 4 → row 2/col 2...), and since 2
columns exactly span one container width, every 4 items form one visual
"page" automatically. With only 3 projects today, the single page renders 3
cards (top-left, bottom-left, top-right) with the bottom-right cell simply
absent — not a blank placeholder tile, just one fewer card, exactly like a
partial last page in any paginated grid. This resolves itself as more
projects are added.

A lightweight Client Component (`ProjectsCarousel`) watches the container's
`scrollWidth`/`scrollLeft` via a scroll listener + `ResizeObserver` to
compute the current page and total page count for the dots/arrows — no
hardcoded page math, so it stays correct at every breakpoint automatically.
Dots/arrows only render when there's more than one page.

## 3. Files affected

- `content/projects.ts` — new: `Project` interface + the 3 real projects (central data source, per AGENTS.md §23).
- `components/sections/Projects.tsx` — modified: replace the placeholder; stays a thin Server Component (`<Section><ProjectsCarousel projects={projects} /></Section>`) — no project-specific logic here.
- `components/sections/projects/ProjectsCarousel.tsx` — new, `"use client"`: the only interactive leaf (scroll container, pagination dots, prev/next buttons). Everything else in the feature stays a Server Component.
- `components/sections/projects/ProjectCard.tsx` — new, Server Component: thumbnail (placeholder until real screenshots exist), title, one-line description (`line-clamp-2` for consistent height), up to 4 tech badges (+N more if a project lists more, e.g. FinAI's 9), GitHub link (reusing the existing local `GithubIcon`), and conditionally-rendered Live Demo / Case Study links for when those URLs exist.
- `app/globals.css` — add a `.scrollbar-hide` utility to the existing `@layer utilities` block (hides the scrollbar visually; the container stays keyboard-scrollable via `tabIndex={0}` and native arrow-key/Page-Up-Down support, so nothing is lost for keyboard or screen-reader users).

**Screenshots to add later** (once available), to replace each card's
placeholder automatically:
- `public/projects/retail-product-detection.png`
- `public/projects/finai-expense-intelligence.png`
- `public/projects/ai-resume-analyzer.png`

No new dependency — everything here is native CSS Scroll Snap + `ResizeObserver`/scroll events, per the "avoid third-party carousel libraries" instruction.

## 4. Responsive behavior

| Breakpoint | Rows | Column width | Cards per screen |
| --- | --- | --- | --- |
| `<640px` (mobile) | 1 | 100% | 1 (swipe to next) |
| `640–1023px` (tablet) | 1 | `calc(50% - 0.75rem)` | 2 (2x1) |
| `≥1024px` (desktop) | 2 | `calc(50% - 0.75rem)` | 4 (2x2) |

Section height is constant at every breakpoint and as projects are added —
the grid's row count never changes for a given breakpoint, only the number
of columns (i.e. horizontal scroll distance) grows. Card height is kept
uniform via a fixed-aspect-ratio thumbnail slot and `line-clamp-2` on the
description, so no card can stretch a row taller than its siblings.

## One flagged inconsistency

The brief says "Occupy at least one viewport (`min-h-screen`)," but
AGENTS.md §5 mandates `min-h-dvh` specifically (never `min-h-screen`, to
avoid the mobile-Safari address-bar jump) and the shared `Section`
component already enforces this uniformly. This plan keeps using `Section`
unchanged — it already satisfies "at least one viewport" via `min-h-dvh`,
which reads as the intended meaning here rather than a deliberate request
to reintroduce the banned class.

## Acceptance Criteria

- Given the section is viewed on desktop, exactly 4 project cards (or fewer, on the last/only page) are visible without vertical scrolling, and scrolling the mouse wheel/trackpad horizontally (or dragging, or using the arrow buttons) reveals the next page.
- Given the section is viewed on mobile, exactly 1 card is visible per swipe.
- Given a project is added to or removed from `content/projects.ts`, no component code changes are needed for the layout to remain correct.
- Given a project has no `liveUrl`/`caseStudyUrl`, that link is omitted from its card rather than rendered broken or fabricated.
- Given `prefers-reduced-motion: reduce` is set, the carousel scrolls instantly instead of smoothly.

## Validation Plan

- `npm run lint` — zero warnings.
- `npm run build` — TypeScript strict-checks clean.
- Manual check: visit `/#projects`, resize across `sm`/`lg` breakpoints, confirm card-per-screen counts match the table above, confirm keyboard (Tab to the carousel, arrow keys) and the prev/next buttons both work, confirm no page-level horizontal scrollbar appears.

## Risks

- With only 3 real projects, the desktop grid's bottom-right cell is empty on the (only) page — expected and disclosed above, not a bug.
- Dot/page-count math is an approximation based on `scrollWidth`/`clientWidth` (accounting for `gap-6` between columns); it's a "subtle indicator," not pixel-exact, which is fine at the small project counts this site has.
- Thumbnails are placeholders until real screenshots are supplied at the three paths listed above.
