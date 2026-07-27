# Engineering Journey: Seven-Segment Redesign

## Context

Replaces the current text-based `JourneyTimer` (plain monospace digits)
with a CSS-built seven-segment digital-clock look, adapted to this site's
existing monochrome token system rather than any hardcoded reference
colors.

**Note**: no image actually came through on this message - I only received
the text description. It's detailed enough (exact colors per theme,
layout, behavior) that I can proceed from it directly; flagging in case
you intended to attach something and it didn't land.

**Start date update**: your message gives an exact date now - "Since 26
Aug 2024" - which is more precise than the placeholder `2024-11-01` used
previously. This plan updates `ENGINEERING_JOURNEY_START_DATE` to
`2024-08-26` accordingly.

## 1. Component structure

```
EngineeringJourneyCard (Server Component, unchanged responsibility)
  - "Engineering Journey" title
  - <JourneyTimer startDate={...} />      <- the clock-face box itself
  - "Since 26 Aug 2024" subtitle
  - "Every second invested in learning." footer

JourneyTimer ("use client" - the only client boundary)
  - calls useElapsedTime(startDate) - unchanged hook, still one setInterval
  - renders the bordered "clock body" box (bg-background, border-border,
    inset shadow - the near-black/white screen from your Appearance spec)
  - inside it: 4 digit groups (Days/Hours/Minutes/Seconds), each a row of
    <SevenSegmentDigit> plus a small uppercase label underneath
  - a blinking ":" between groups (pure CSS animation, independent of the
    real tick logic)

SevenSegmentDigit (plain component, no "use client" needed - it has no
hooks/state of its own; being rendered inside JourneyTimer's client tree
is enough for it to work as a client-rendered leaf)
  - takes a single character "0"-"9"
  - looks up which of the 7 segments (a-g) are lit from a small truth
    table
  - renders 7 absolutely-positioned <span>s inside a relatively-positioned
    box sized by percentage insets (not fixed pixels), so it scales
    cleanly at every breakpoint via just a height + aspect-ratio class
  - active segment -> `bg-foreground`; inactive segment -> `bg-muted`
    (both already flip correctly between themes - no new color tokens)
  - each segment has `transition-colors duration-150
    motion-reduce:transition-none` - this is the "smooth digit
    transition": individual segments fade between on/off as the digit
    changes, which is how a real multi-segment display actually changes,
    rather than fading the whole glyph as one image.
```

Colors, mapped from your spec to existing tokens (no new hex anywhere):

| Your spec | Token used |
| --- | --- |
| Clock body: almost black (dark) / white (light) | `bg-background` |
| Digits: white (dark) / black (light) | `bg-foreground` (active segments) |
| Inactive segments: very dark gray / light gray | `bg-muted` |
| Thin border | `border border-border` |
| Slight inner shadow | `shadow-[inset_0_2px_6px_rgba(0,0,0,0.15)]` (a fixed subtle inset shadow value works in both themes without needing a separate token) |

## 2. Files affected

- `constants/profile.ts` - modified: `ENGINEERING_JOURNEY_START_DATE` -> `"2024-08-26"`.
- `components/ui/SevenSegmentDigit.tsx` - new: the CSS seven-segment digit renderer described above.
- `components/ui/JourneyTimer.tsx` - rewritten: same public API (`startDate` prop, same hook), new seven-segment presentation, blinking colon.
- `components/sections/overview/EngineeringJourneyCard.tsx` - modified: update the "Since" date formatting to "26 Aug 2024" style (day-month-year, matching your layout example) instead of the previous "November 2024" format.
- `app/globals.css` - add a `@keyframes blink` / `.animate-blink` utility (same authoring pattern as the existing `.animate-border-travel`/`.animate-timer-digit`; the old `.animate-timer-digit` keyframe becomes unused and gets removed since the fade-per-glyph approach is replaced by per-segment color transitions).
- `hooks/useElapsedTime.ts` - unchanged. The ticking logic already does exactly what's needed; this refactor is presentation-only.

No new dependency - confirmed no seven-segment webfont is being added; this
is hand-built with CSS per your fallback instruction.

## 3. How the timer updates efficiently

Unchanged at the logic layer: a single `setInterval(..., 1000)` inside
`useElapsedTime` ticks once a second and updates one piece of state,
causing exactly one re-render of `JourneyTimer` per second - not four
separate timers, not a re-render per digit.

The rendering side is actually *more* efficient than the previous
implementation: the old version keyed each digit's `<span>` on its value
(`key={value}`), which forces React to unmount and remount a DOM node
every time a digit changes, just to replay a fade-in animation. The new
seven-segment digits never remount - each of the 7 segment `<span>`s keeps
its identity across renders, and only the ones whose on/off state actually
changed get a class-list update (`bg-foreground` <-> `bg-muted`), which the
browser then animates smoothly via `transition-colors`. Given only the
seconds group changes most ticks (minutes/hours/days change far less
often), the overwhelming majority of the ~70-odd segment elements on
screen don't re-render meaningfully at all - React's diffing skips them
since their props are unchanged.

The blinking colon is a pure CSS `@keyframes` running on its own timeline,
not synced to or driven by the JS timer at all - one less thing for the
interval to manage, and it keeps blinking smoothly even if a re-render is
in flight.

## Acceptance Criteria

- Given the timer is viewed in dark theme, the clock body is near-black, digits are white, inactive segments are a dark (not pure-black) gray, matching `bg-muted`'s dark-theme value.
- Given the timer is viewed in light theme, the same layout holds with the body white, digits black, inactive segments light gray.
- Given days exceed 999, a 4th (or more) digit appears with no layout break.
- Given `prefers-reduced-motion: reduce`, the colon stops blinking and segment color changes are instant rather than transitioned.
- Given the section is left open, the display keeps advancing every second indefinitely with no memory leak (unchanged interval-cleanup behavior from the existing hook).

## Validation Plan

- `npm run lint` / `npm run build`.
- Manual check: visit `/#overview` in both themes, confirm the seven-segment digits render legibly, confirm the colon blinks once per second, confirm no console errors from the new component.
