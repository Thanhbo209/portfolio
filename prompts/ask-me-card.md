# "Ask My Portfolio" Card

## Context

Replace `EducationCard` in the Overview section with a compact, keyword-driven
Q&A card. Per your own closing note, framed transparently as a lightweight,
keyword-matched assistant rather than pretending to be a real AI - title
"Ask My Portfolio," description states plainly what it is.

Education content isn't lost from the site: `EducationSummaryCard` already
exists and is shown in the Experience section, so Overview's copy was a
redundant duplicate, not the only place that information lives.

## Content accuracy note

Your mockup's placeholder example ("Ask about my RAG platform...") doesn't
match any of the three real projects in `content/projects.ts` (Retail
Product Detection, FinAI, AI Resume Analyzer) - none is described as RAG
anywhere in the existing site copy, so I'm not asserting that label.
Placeholders instead reference the real projects by name. Likewise, the
internship response draws only from what `FeaturedExperienceCard.tsx`
already states (backend APIs, AI integration, document ingestion) rather
than the mockup's "automate search workflows" detail, which isn't confirmed
anywhere in the current site content.

## Architecture

- `lib/portfolio-assistant.ts` - new, framework-agnostic content + matching
  logic:
  ```ts
  interface FollowUpAction { label: string; href: string; external?: boolean }
  interface AssistantTopic { id: string; keywords: string[]; response: string; actions: FollowUpAction[] }

  export const ASSISTANT_TOPICS: AssistantTopic[]
  export const SUGGESTION_CHIPS: { label: string; topicId: string }[]
  export const PLACEHOLDER_EXAMPLES: string[]
  export const EMPTY_STATE_MESSAGE: string
  export const FALLBACK_TOPIC: AssistantTopic

  export function findResponse(query: string): AssistantTopic   // keyword match, or FALLBACK_TOPIC
  export function getTopicById(id: string): AssistantTopic | undefined
  ```
  `findResponse`'s signature (`string -> AssistantTopic`) is deliberately the
  seam for a later LLM swap - the UI only ever calls this one function and
  renders whatever `AssistantTopic` comes back, so replacing the body with
  an async LLM call later doesn't touch the components, only this file.
  Topics planned: internship, projects (general), the 3 individual projects
  (so typing "FinAI" gets a more specific answer than the general one), AI
  experience, skills, career goals, portfolio (how this site was built),
  resume.

- Components (flat files in `components/sections/overview/`, matching the
  existing convention):
  - `AskMeCard.tsx` - holds the only state (`activeTopicId: string | null`,
    `inputValue: string`), composes the rest.
  - `SuggestionChips.tsx` - the 6 chips, `onSelect(topicId)`.
  - `AssistantMessage.tsx` - empty state or the active topic's response +
    follow-up action buttons; `aria-live="polite"` so screen readers
    announce a new response automatically.
  - `AssistantInput.tsx` - input + send button, rotating animated
    placeholder, Enter to submit / Escape to clear.

## Response animation ("stream in naturally" vs. "everything instant")

These two requirements are in tension if read as "simulate a slow typing
delay." Resolved as: the lookup itself is instant (no artificial delay,
matching the Performance section) - but the response's *presentation*
splits into sentences and staggers them in fast (~0.05s apart, reusing the
existing `staggerContainer`/`staggerItem` pattern), so it reads as a
natural multi-phase reveal rather than one flat block appearing at once,
without faking multi-second "AI thinking" latency.

## Animated placeholder

Native `<input placeholder>` can't be transitioned. Implemented as a
absolutely-positioned overlay span (Motion `AnimatePresence`, fade + slight
y-shift) shown only while the input is empty, sitting behind the real input
- same technique already used for the certifications accordion's
`AnimatePresence` in this codebase.

## Reused, not reinvented

- `Card`, `Badge` for the shell/chips.
- `MotionLink`/`MotionAnchor` for follow-up action buttons (external
  GitHub/LinkedIn links vs. internal anchors/`/resume`) - same hover/press
  treatment as every other button on the site, no new button component.
- `TRANSITIONS`/stagger variants from `lib/motion/variants.ts`.

## Accessibility

- Enter submits, Escape clears (on the input's `onKeyDown`).
- Every chip and follow-up action button has an explicit `aria-label`.
- Message area is `aria-live="polite"`.
- Normal tab order - no custom focus trapping needed, this isn't a modal.

## Files Affected

- `lib/portfolio-assistant.ts` - new
- `components/sections/overview/AskMeCard.tsx` - new
- `components/sections/overview/SuggestionChips.tsx` - new
- `components/sections/overview/AssistantMessage.tsx` - new
- `components/sections/overview/AssistantInput.tsx` - new
- `components/sections/overview/EducationCard.tsx` - deleted (superseded; confirmed education content still lives in `EducationSummaryCard` under Experience)
- `components/sections/Hero.tsx` - swap `EducationCard` for `AskMeCard`

## Acceptance Criteria

- Given the card loads, it shows the transparent empty-state message, not a fake "I'm a real AI" framing.
- Given a chip click or an Enter-submitted question, exactly one response replaces the previous one (no history list) with its own follow-up actions.
- Given no keyword matches, the fallback response shows instead of an error or blank state.
- Given `prefers-reduced-motion`, the response/placeholder animations still respect it (opacity-only, per the site-wide convention).
- Given mobile width, chips wrap, nothing scrolls horizontally, the card height matches its Overview siblings.

## Validation Plan

`npm run lint`, `npm run build`; CDP check: chip click produces the right response + actions, keyboard Enter/Escape work, aria-live region present, no console errors, both themes, mobile width has no horizontal scroll.
