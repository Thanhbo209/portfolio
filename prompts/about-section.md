# About Section

## Context

The About section (`components/sections/About.tsx`) currently renders only a "coming soon" placeholder. This replaces it with the real narrative section — introduction, journey, what I build, engineering principles — as distinct from Overview's at-a-glance dashboard.

## Important: resume data-currency issue (read before approving)

You said to use your resume as the single source of truth and not invent information. I went looking for it:

- The most recent resume in git history (`public/cv/VietThanh_Resume.pdf`, from the last commit before these files were deleted) is **corrupted** — both `git cat-file` extraction and `pdftotext` fail on it with stream/xref errors. I can't read it.
- An **older** version (`public/cv/ThanhResume.pdf`, from an earlier commit) extracted cleanly. I read it in full. It predates the FlyRank AI internship entirely — its most recent listed experience is "Software Engineering Student — Academic Projects" and independent full-stack projects (the AI resume analyzer, this portfolio, a grocery e-commerce app). It also lists a TOEIC score of 855, where you told me 870 for the Overview section.

**What this means for the plan below:** education (HUFLIT, Bachelor of Software Engineering, 2023–2027) matches exactly between this resume and what's already live in Overview, so that's solid. For anything the old resume doesn't cover (the FlyRank role specifically), I'm using only what you already gave me directly for Overview — title, company, dates — nothing beyond that. Where the old resume and your more recent direct instructions disagree (TOEIC 855 vs. 870), I'm going with what you told me more recently, since it postdates the PDF. I'm not inventing metrics, project outcomes, or claims that appear in neither source.

If you have a current resume file you can share, I'd rather use that than the stale one — happy to fold it in before or after this lands.

## Loaded Skills

✓ `design-taste-frontend` ("Taste") — applied: §9.D (no fabricated specifics — see above), §4.2 Color Consistency Lock (same single accent as the rest of the site), §4.4 Shape Consistency Lock (reuses `components/ui/Card.tsx` from Overview rather than a new card style).

No `nextjs`/`react`/`accessibility`/`seo` skill files exist yet — proceeding on AGENTS.md's own §12 Server/Client, §18 Tailwind, §19 Accessibility.

## Proposed Layout

`About.tsx` renders `<Section id="about" heading="About" headingLevel="h2" align="start">` (top-aligned, matching Overview — a narrative section reads top-down, not centered) composed of four stacked blocks, each its own component under `components/sections/about/`:

1. **`IntroBlock.tsx`** — two-column on desktop: portrait (`public/portrait/64.jpg` via `next/image`) plus name/role/education meta on the left, 2–3 short bio paragraphs on the right. Stacks to one column on mobile (photo above text).
2. **`JourneyTimeline.tsx`** — a simple vertical timeline, four milestones, each with a small icon marker and one line: started SE at HUFLIT → built AI/full-stack projects → joined FlyRank AI as an AI Backend Engineering Intern → current goal: becoming a professional AI Engineer.
3. **`WhatIBuildCards.tsx`** — three `Card`s (AI Engineering, Backend Systems, Full-Stack Applications), one sentence each describing the *kind* of system, not a tech list — deliberately not overlapping with Tech Stack or Projects.
4. **`EngineeringPrinciples.tsx`** — four short principles in a 2×2 grid (your own suggested wording: build maintainable software; solve real-world problems; learn by building; prioritize clean architecture and scalability).

Per AGENTS.md §5, `About` grows taller than one viewport if its content needs it (a floor, not a ceiling) — unlike Overview, nothing here is being compressed to fit exactly one screen; that stricter constraint was specific to the Overview task, not the standing rule.

## Files Affected

**New:** `components/sections/about/IntroBlock.tsx`, `components/sections/about/JourneyTimeline.tsx`, `components/sections/about/WhatIBuildCards.tsx`, `components/sections/about/EngineeringPrinciples.tsx`.

**Edited:** `components/sections/About.tsx` (rewritten to compose the four blocks).

**Not touched:** no new assets needed (portrait already at `public/portrait/64.jpg`), no `AGENTS.md` changes (nothing new architecturally beyond what Overview already established — same `Card` primitive, same `Section` usage).

## Responsive Behavior

- **Mobile (`<640px`):** everything single-column — portrait above bio text, timeline single column, three "What I Build" cards stacked, principles stacked.
- **`sm` and up (640px+, tablet through desktop):** Introduction becomes two columns (portrait + meta beside the bio text); "What I Build" becomes a 3-column row; principles become a 2×2 grid. No separate desktop-only tier is needed beyond `sm:` — same single-breakpoint pattern Overview's grid already uses, for consistency.

## Acceptance Criteria

- `/` About section shows: intro (portrait + name/role/education + bio), a 4-stop timeline, 3 "what I build" cards, 4 principles.
- Two-column intro and 3/2-column grids from `sm:` up; single column below it.
- No specific technology names or project titles appear (those stay in Tech Stack / Projects).
- `npm run lint` / `npm run build` pass.

## Validation Plan

- `npm run lint` / `npm run build`.
- Visual check via screenshot at mobile and desktop widths, both themes.

## Risks

- **Resume currency**, as described above — this is the main open item, not a code risk.
- Bio copy is written from verified real facts (your own Overview instructions + the older resume's education/background) but the exact phrasing is mine — read it over and adjust tone/specifics as needed, same as the Overview placeholder-description caveat.
