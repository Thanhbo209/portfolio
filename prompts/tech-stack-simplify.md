# Tech Stack Refactor: Toolbox, Not a Skill Ledger

## Context

Follow-up refactor to the existing Tech Stack section
(`components/sections/TechStack.tsx` and `components/sections/techstack/*`).
The user wants proficiency badges removed entirely, each item reduced to
just logo + name, a 2-column inner grid per category, and shorter cards
overall - "a clean engineering toolbox, not a skill rating list."

## One contradiction to flag before I touch anything

The brief's **Layout** section says each item contains "only: Local SVG
logo, Technology name" - and the current hover interaction (a
`group-hover`/`group-focus` reveal of `relatedProjects`/`relatedExperience`
text) has nothing left to reveal once those fields are gone. But the
**Design** section separately says "Maintain existing hover animations."

I'm reading this as: drop the old *reveal* interaction (there's no longer
any hidden content to reveal, and keeping it would violate "only logo and
name"), but keep *a* hover response on each tile - a subtle background
tint on hover, so the grid doesn't go fully static. If you actually meant
to keep the related-projects/experience reveal alongside a slimmer default
view, tell me and I'll keep those fields and the disclosure interaction
instead of deleting them.

## 1. New grid layout

Each category card's item list changes from a vertical `flex flex-col`
list to:

```
grid grid-cols-2 gap-x-4 gap-y-3
```

Fixed at 2 columns (not breakpoint-conditional) - simplest, most literal
reading of "maximum of two technologies per row," and avoids a fragile
container-query threshold guess for a card whose rendered width already
varies depending on which of the outer 1/2/3-column breakpoints is active
(mobile/tablet/desktop). Each item shrinks from today's full-width row
(logo + name + badge + reveal box) down to a compact `logo + name` tile,
which is most of where the height reduction comes from - combined with 2
columns instead of 1, a 6-item category (e.g. Frontend) drops from 6
stacked rows to 3 grid rows, roughly half the vertical space it uses today.

Per-card height stays equalized the same way it already is elsewhere on
this site (Experience, original Tech Stack): the outer 6-cell Bento grid's
default `align-items: stretch` + `h-full` on `Card` makes same-row cards
match height regardless of item count - no new mechanism needed for
"equal card heights."

## 2. Handling odd technology counts

Two categories currently have an odd count (Languages: 5, AI / Machine
Learning: 5) - Frontend (6), Backend (4), Database (4), and DevOps & Tools
(4) are even. Rather than leaving a blank cell in the last row (which
would violate the loaded Taste skill's stance on empty filler cells), the
**last item spans both columns when the total count is odd**, via a pure
CSS selector - no counting logic in JS or in the data file:

```
[&>*:last-child:nth-child(odd)]:col-span-2
```

`:last-child` matches only the final tile; `:nth-child(odd)` is only also
true for that same element when the total item count is odd (an
odd-numbered element that also happens to be the last one). This means
adding or removing a technology from any category automatically produces
the right layout - even counts get a clean grid, odd counts get a
full-width final tile - with zero changes to component logic, satisfying
"do not hardcode rows or columns."

## 3. Files affected

- `content/tech-stack.ts` - modified: remove `ProficiencyLevel`, and the `proficiency`/`relatedProjects`/`relatedExperience` fields from `TechItem` and all 28 entries. `logo`/`logoDark` are untouched - the 5 theme-adaptive logos (GitHub, Express, Prisma, Anthropic, Next.js) keep working exactly as they do today.
- `components/sections/techstack/TechItemRow.tsx` - rewritten: drops the `Badge`/proficiency styling map, the `button`/`group-hover` reveal, and the now-unused related-info rendering; becomes a single compact `logo + name` tile with a subtle `hover:bg-accent` transition.
- `components/sections/techstack/TechCategoryCard.tsx` - modified: item container changes from `flex flex-col gap-3` to the 2-column grid described above.
- `components/sections/TechStack.tsx` - unchanged: the outer 6-category Bento grid and `min-h-dvh` `Section` wrapper stay exactly as they are; this refactor is scoped to what happens inside each category card.

No data is invented or re-verified here - this is a pure UI/data-shape
simplification of technologies already established as real in the
original Tech Stack implementation.

## Acceptance Criteria

- Given any category card, every item shows only its logo and name - no badge, no proficiency text, no hover-revealed extra info.
- Given a category with an odd technology count, its last tile spans the full card width instead of leaving an empty cell.
- Given a category card's item count changes (added/removed in `content/tech-stack.ts`), the grid and odd/even handling update with no component changes.
- Given same-row category cards have different item counts, their card heights still match.
- Given `prefers-reduced-motion: reduce`, the tile hover transition is disabled.

## Validation Plan

- `npm run lint` - zero warnings.
- `npm run build` - TypeScript strict-checks clean (also confirms nothing else in the app still reads the removed `proficiency`/`relatedProjects`/`relatedExperience`/`ProficiencyLevel` exports).
- Manual check: visit `/#tech-stack`, confirm 2-column layout and shorter cards in both themes, confirm the 5 theme-adaptive logos (GitHub/Express/Prisma/Anthropic/Next.js) still swap correctly.
