# Contact Section

## Context

The Contact nav item (`#contact`) is a placeholder. The user wants a "Let's
Connect" dashboard - large clickable contact-method cards, no form - and
explicitly wants the external-link data (GitHub/LinkedIn/Email/Resume)
reused from the existing sidebar source rather than duplicated.

## Reused source: `constants/navigation.ts`

This file already exports `externalLinks: ExternalLink[]`, the exact data
the Sidebar and MobileNavDrawer use today (label, href, icon). Per "External
links should be reusable across the project," this plan does **not** create
a second GitHub/LinkedIn/Email/Resume list in `contact.ts` - it adds one
optional field (`description?: string`) to the existing `ExternalLink` type,
populates it on the 4 existing entries, and has `content/contact.ts` import
that same array. One source of truth; Sidebar/Drawer simply ignore the new
field.

## Data needing your input (flagged, not invented)

The "Current Status" card needs three facts nowhere in the resume or this
site's existing content - Employment Status, Desired Opportunities, and
Location. I'm proposing values below inferred from what's already verified
(FlyRank AI is Remote, HUFLIT/Acacy are Ho Chi Minh City-based) - **please
correct any of these before I implement**, since I won't guess personal
status/location facts:

- **Employment Status (proposed):** "Open to new opportunities"
- **Desired Opportunities (proposed):** "AI Engineering & Backend Development roles"
- **Location (proposed):** "Ho Chi Minh City, Vietnam"

Role and Company are already verified (Backend AI Engineering Intern @
FlyRank AI, from the Experience section).

## 1. Layout

Bento grid of exactly 6 cards - matching the Bento Cell Count Rule the same
way Tech Stack's 6 categories did:

```
grid-cols-1            (mobile: 6 cards stacked)
sm:grid-cols-2         (tablet: 3 rows of 2)
lg:grid-cols-3         (desktop: 2 rows of 3)
```

Reading order: Email, LinkedIn, GitHub, Resume (the 4 large actionable
method cards, most prominent - first), then Current Status, then
Availability (supporting info, last). Every card gets `h-full` for
same-row alignment, the same fix used in Experience/Tech Stack.

- **Contact method cards**: the entire card is the `<a>` (not just the
  icon) - full-card clickability per "large clickable cards." Hover gets a
  subtle border/scale shift (`hover:scale-[1.02] hover:border-primary/40
  transition-transform motion-reduce:transition-none`), plus a
  `active:scale-[0.98]` press state for tactile feedback. GitHub/LinkedIn
  open in a new tab; Email is `mailto:`; Resume opens `/resume`.
- **Current Status card**: role, company (with the existing FlyRank AI
  logo, reused from `public/companies/flyrank-ai.jpg`), employment status,
  desired opportunities, location.
- **Availability card**: the 4 areas as outline `Badge` pills (not a
  checkmark list - About's Engineering Principles already uses that
  pattern, so this uses badges instead to avoid repeating the same list
  style twice on the site).

## 2. Data structure

```ts
// types/navigation.ts (modified)
export interface ExternalLink {
  label: string;
  href: string;
  icon: ElementType;
  description?: string; // new, optional - Sidebar/Drawer ignore it
}
```

```ts
// content/contact.ts (new)
import { externalLinks } from "@/constants/navigation";

export const contactMethods = externalLinks; // same array, reused as-is

export interface CurrentStatus {
  role: string;
  company: string;
  companyLogo?: string;
  employmentStatus: string;
  desiredOpportunities: string;
  location: string;
}
export const currentStatus: CurrentStatus = { /* proposed values above */ };

export const availabilityAreas: string[] = [
  "AI Engineering",
  "Backend Development",
  "Full-Stack Development",
  "Open Source Collaboration",
];
```

The section only ever maps `contactMethods` and reads `currentStatus`/
`availabilityAreas` - no per-link JSX branching, so adding a 5th contact
method or a 5th availability area is a data-file edit only.

## 3. Files affected

- `types/navigation.ts` - modified: add `description?: string` to `ExternalLink`.
- `constants/navigation.ts` - modified: add a one-line description to each of the 4 existing entries.
- `content/contact.ts` - new: re-exports `contactMethods`, plus `currentStatus` and `availabilityAreas`.
- `components/sections/contact/ContactMethodCard.tsx` - new, Server Component: one large clickable card.
- `components/sections/contact/CurrentStatusCard.tsx` - new, Server Component.
- `components/sections/contact/AvailabilityCard.tsx` - new, Server Component.
- `components/sections/Contact.tsx` - modified: compose the 6-cell Bento grid.

No new dependency. No Client Component anywhere - hover/press feedback is
pure CSS, same as every prior section this session.

## 4. Responsive behavior

- **Mobile (`<640px`)**: 1 column, all 6 cards stacked full-width.
- **Tablet (`sm`, >=640px)**: 2 columns, 3 rows.
- **Desktop (`lg`, >=1024px)**: 3 columns, 2 rows.

## One flagged inconsistency

Same as every section this session: the brief says `min-h-screen`; this
plan keeps the shared `Section` component's `min-h-dvh` per AGENTS.md §5.

## Acceptance Criteria

- Given the section renders, exactly 4 contact-method cards, 1 status card, and 1 availability card appear - 6 cells, no empty tiles.
- Given a method card is clicked, it navigates/opens exactly like the existing sidebar link for that same method (same href, same new-tab behavior).
- Given `prefers-reduced-motion: reduce`, hover/press scale transitions are disabled.
- Given `constants/navigation.ts`'s `externalLinks` changes, the Contact section's method cards update automatically - no duplicate data to keep in sync.

## Validation Plan

- `npm run lint` - zero warnings.
- `npm run build` - TypeScript strict-checks clean.
- Manual check: visit `/#contact`, confirm all 4 links work, confirm hover/press animation, confirm layout at `sm`/`lg` breakpoints.

## Risks

- Employment Status / Desired Opportunities / Location are proposed, not verified - flagged above, please correct before I implement.
