# Ask My Portfolio — Chat Interface Refactor

## Context

Restructure the existing single-response "Ask My Portfolio" card into a real
chat interface with conversation history, message bubbles, and a typing
indicator. This explicitly supersedes the original card's "no conversation
history, only show the latest response" constraint — this request asks for
exactly that history, so it takes precedence for this component.

## What stays untouched

Per "preserve existing functionality / do not replace the backend or AI
logic": `lib/portfolio-assistant.ts` (topics, `findResponse`, `getTopicById`,
`SUGGESTION_CHIPS`, `PLACEHOLDER_EXAMPLES`) is reused as-is — this refactor
only changes how responses are *presented*, not how they're *matched*. The
only content change there is `EMPTY_STATE.message`'s copy, updated to the
new greeting text - not a logic change.

## New state model (in `AskMeCard.tsx`)

Replaces `activeTopic: AssistantTopic | null` with:

```ts
interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  actions?: FollowUpAction[];
}
```

- Initialized with one assistant greeting message (from `EMPTY_STATE`).
- Sending a message: push the user message, set `isTyping`, then after a
  short (~500-600ms) presentational delay - not simulating real computation,
  `findResponse`/`getTopicById` are still called instantly - push the
  assistant's message and clear `isTyping`. This is the one deliberate
  exception to "everything instant": a chat with zero typing delay reads as
  fake, and the request explicitly asks for a typing indicator.

## Components

- `ChatHeader.tsx` *(new)* — icon/avatar, "Ask My Portfolio", small
  "AI Assistant" status with a dot indicator.
- `MessageBubble.tsx` *(new, replaces `AssistantMessage.tsx`)* — one bubble,
  `role`-driven styling:
  - user: right-aligned, `bg-primary text-primary-foreground`, `rounded-2xl rounded-br-md`
  - assistant: left-aligned, `bg-muted text-foreground`, `rounded-2xl rounded-bl-md` (visibly more subtle than user, per the request)
  - both capped at `max-w-[80%]` so bubbles never span the full width
  - assistant messages render their follow-up actions (existing `MotionLink`/`MotionAnchor` pattern, unchanged) below the bubble, not inside it
- `TypingIndicator.tsx` *(new)* — three dots, gentle staggered opacity pulse, styled like an assistant bubble.
- `ChatMessageList.tsx` *(new)* — the scrollable region: fixed height (not
  min-height, same reasoning as the earlier fix - this card sits in a
  `sm:auto-rows-fr` grid with three siblings, so growth here would stretch
  the whole row), `role="log" aria-live="polite"`, auto-scrolls to the
  newest message/typing indicator via a bottom sentinel + `scrollIntoView`.
- `SuggestionChips.tsx` *(modified)* — same data/component, now shown only
  while the conversation is just the initial greeting (`messages.length === 1`), not persistently pinned above the chat regardless of progress.
- `AssistantInput.tsx` *(modified)* — restyled into a rounded, visually
  integrated pill sitting at the bottom of the card; keeps its existing
  rotating-placeholder mechanism, Enter-to-submit, Escape-to-clear, and
  disabled-when-empty send button unchanged.

## Motion

All new animation reuses `lib/motion/variants.ts`'s existing
`TRANSITIONS`/fade patterns - no new ad-hoc timing values:
- Bubbles: fade + slight slide-up on arrival (mirrors the existing sentence-stagger pattern, now one bubble per message instead of one sentence per paragraph).
- Typing indicator: gentle opacity pulse per dot, staggered.
- Chips/send button: already-established `buttonHover`/`buttonPressEffect`.
- Everything respects `prefers-reduced-motion` the same way the rest of the
  site does (entrance travel gated, hover feedback stays live).

## Layout / height stability

Card's total height stays fixed (header + fixed-height scrollable message
list + input = constant), so switching between the greeting-only state and
a long conversation never changes the card's footprint or stretches its
grid row - same fix already applied once for this exact card, now built
into the new structure from the start rather than retrofitted.

## Files Affected

- `components/sections/overview/AskMeCard.tsx` — state model rewrite
- `components/sections/overview/ChatHeader.tsx` — new
- `components/sections/overview/MessageBubble.tsx` — new
- `components/sections/overview/TypingIndicator.tsx` — new
- `components/sections/overview/ChatMessageList.tsx` — new
- `components/sections/overview/AssistantMessage.tsx` — deleted (superseded)
- `components/sections/overview/SuggestionChips.tsx` — modified (conditional visibility)
- `components/sections/overview/AssistantInput.tsx` — modified (visual integration only)
- `lib/portfolio-assistant.ts` — `EMPTY_STATE.message` copy only

## Acceptance Criteria

- Given the card loads, it shows one assistant greeting bubble + suggestion chips, not a blank interface.
- Given a chip click or Enter-submitted message, a user bubble appears immediately, then a typing indicator, then the assistant's bubble (with actions if any).
- Given a growing conversation, the card's total height never changes and its `sm:auto-rows-fr` siblings never shift; the message list scrolls internally and auto-scrolls to the newest message.
- Given `prefers-reduced-motion`, bubbles/typing indicator still provide feedback via opacity only.
- Given mobile width, the chat remains usable with no horizontal overflow.

## Validation Plan

`npm run lint`, `npm run build`; CDP check: send several messages, confirm bubble alignment/colors, confirm auto-scroll, confirm card height stays constant across a short vs. long conversation, confirm chips disappear after first message, both themes, mobile width.
