# Experience Section

## Context

The Experience nav item (`#experience`, AGENTS.md §4.1) currently renders a
"coming soon" placeholder (`components/sections/Experience.tsx`). The user
requested a real, dashboard-style Experience section sourced strictly from
`public/resume/Thanh_Resume.pdf` (already extracted via `pdftotext -layout`
during this task) — no invented responsibilities, dates, metrics, or
technologies.

## Goals

- Replace the placeholder with a Bento/dashboard layout that makes the
  current role (FlyRank AI) the visual focal point.
- Surface previous experience (Acacy Co., Ltd.) as a compact card.
- Surface education and a "Technical Focus" summary as supporting cards.
- Every fact traceable to the resume; anything not in the resume is omitted,
  not guessed.

## Resume-sourced content (verbatim facts used)

**Featured — FlyRank AI**
- Position: Backend AI Engineering Intern · Company: FlyRank AI
- Period: Jun 2026 – Present · Location: Remote · Type: Internship (from title)
- Responsibilities (5, condensed from resume bullets):
  1. Build backend services and REST APIs with TypeScript, Node.js, and PostgreSQL to support AI-powered applications.
  2. Develop production-ready features — authentication, authorization, async background jobs, containerized workflows with Docker.
  3. Integrate AI APIs and implement document ingestion pipelines for AI-driven workflows.
  4. Design workflow orchestration interfaces with React Flow; collaborate through Git-based development, debugging, testing, and code review.
  5. Apply AI engineering and AI-assisted development practices on a production-oriented capstone project.
- Technology badges: TypeScript, Node.js, PostgreSQL, Docker, React Flow, Git
- No achievement callout: per user direction, certifications belong in the (future) Certifications section — Experience shows what was done, not what was earned. The Anthropic Claude certification is omitted here.
- No company description or quantified business-impact metric exists in the resume for this role — both omitted rather than invented.

**Previous — Acacy Co., Ltd.**
- Position: IT Labeling / Product Annotation Contributor · Duration: May – June 2026 · Location: On-site
- Description (condensed from 3 bullets): Annotated and curated product images in CVAT for computer-vision training, applying consistency standards that reduced QA rework.
- Technology badge: CVAT (only named tool)

**Education**
- HCMC University of Foreign Languages and Information Technology
- Bachelor of Software Engineering · Nov 2024 – Jul 2027 · Expected graduation: 2027

**Technical Focus** (categorized from the resume's Skills + Experience sections, not a new claim)
- Backend & APIs — Node.js, Express, FastAPI, PostgreSQL, REST APIs
- AI Integration — AI API integration, document ingestion, CV annotation workflows
- DevOps & Tooling — Docker, Git, CI/CD
- Full-Stack Interfaces — React, React Flow, Next.js

## Layout

Bento grid inside the existing `Section` (`align="start"`, `min-h-dvh` floor already handled by `Section.tsx` — no per-file layout styling per AGENTS.md §5):

```
grid-cols-1                              (mobile: 4 cells stacked, in order)
sm:grid-cols-2                           (tablet: Featured full-width, Education | Technical Focus side by side, Previous full-width)
lg:grid-cols-3                           (desktop: Featured 2x2 + Education/Technical Focus stacked in col 3 + Previous full-width row below)
```

- `FeaturedExperienceCard`: `sm:col-span-2 lg:col-span-2 lg:row-span-2` — the large focal card.
- `EducationSummaryCard`: default cell.
- `TechnicalFocusCard`: default cell (sits under Education at `lg`, next to it at `sm`).
- `PreviousExperienceCard`: `sm:col-span-2 lg:col-span-3` — full-width row.

4 content blocks → 4 cells (1 large + 2 small + 1 full-width bar), no empty cells, matching the loaded Taste skill's Bento Cell Count Rule.

## Loaded Skills

✓ design-taste-frontend (Bento Cell Count Rule, Shape Consistency Lock — reuse existing `Card` radius/border, no new accent color, minimal-text responsibilities, no fabricated stats)

No other skill folder exists in `.agents/skills/` yet, so no `nextjs`/`react`/`tailwind`/`accessibility` skill file was loaded — this plan otherwise follows AGENTS.md directly (Server Components throughout, no client JS needed).

## Files Affected

- `components/sections/Experience.tsx` — modified: replace placeholder with the Bento composition.
- `components/sections/experience/FeaturedExperienceCard.tsx` — new: the FlyRank AI focal card.
- `components/sections/experience/PreviousExperienceCard.tsx` — new: renders past roles from a local array (currently one entry: Acacy) so a future role can be added without restructuring.
- `components/sections/experience/EducationSummaryCard.tsx` — new: education card with study period (distinct from `components/sections/overview/EducationCard.tsx`, which omits the period and is scoped to the Overview bento — not reused directly to avoid coupling two unrelated sections to one shared component for a minor field difference).
- `components/sections/experience/TechnicalFocusCard.tsx` — new: 4 focus-area rows.
- `components/ui/Badge.tsx` — new: small pill primitive per the shape already documented in AGENTS.md §11, used for all technology badges here (and reusable later by Tech Stack/Certifications).

All new components are Server Components (no state, no effects, no browser APIs) — no `"use client"` needed anywhere in this feature.

## Implementation Steps

1. Add `components/ui/Badge.tsx` (`variant: "default" | "outline"`, `className` passthrough via `cn()`).
2. Build `FeaturedExperienceCard.tsx`: header (FlyRank logo via existing `/companies/flyrank-ai.jpg` + role/company), meta row (period, location, type icons), responsibilities list, technology badges.
3. Build `PreviousExperienceCard.tsx`: maps a local `PastRole[]` array (one Acacy entry) into compact rows with company, position, duration, description, tech badge.
4. Build `EducationSummaryCard.tsx`: university, degree, study period, expected graduation — same visual language as `Card`-based Overview cards.
5. Build `TechnicalFocusCard.tsx`: 4 icon + label + one-line rows.
6. Rewrite `Experience.tsx` to compose the four cards in the grid described above, inside `Section id="experience" heading="Experience" align="start"`.
7. Run `npm run lint` and `npm run build`.

## Acceptance Criteria

- Given the Experience section is viewed on desktop, the FlyRank AI card is visually the largest element and occupies the top-left 2x2 area.
- Given the section is viewed on mobile, all four cards stack full-width in the order Featured → Education → Technical Focus → Previous, with no horizontal overflow.
- Given any fact shown in the section, it traces to a specific line in `Thanh_Resume.pdf`; no metric, responsibility, or technology appears that isn't in that extraction.
- Given the section renders, it uses only the shared `Section` component and existing `Card`/new `Badge` primitives — no hand-authored `<section>`, no new `min-h-screen`.

## Validation Plan

- `npm run lint` — zero warnings.
- `npm run build` — TypeScript strict-checks clean.
- Manual check: visit `/#experience`, confirm layout collapses correctly at `sm` and `lg` breakpoints (resize or devtools), confirm no content overflows its card.

## Risks

- Resume wording for the FlyRank title ("Backend AI Engineering Intern") differs slightly from the phrasing already used elsewhere on the site ("AI Backend Engineering Intern" in Overview/About). This plan uses the resume's exact wording for this new section per the "single source of truth" instruction; reconciling the other sections is out of scope unless requested separately.
- No company one-line description exists in the resume for FlyRank AI or Acacy — both omitted rather than invented, per the explicit constraint.
