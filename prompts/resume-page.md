# Resume Page

## Context

`app/resume/page.tsx` is currently a "coming soon" placeholder. It's a
standalone route outside the homepage's section flow (per AGENTS.md §4.2 -
Resume opens/downloads a file, it isn't a scrollable section), so it does
not use the shared `Section` component, but should otherwise look and feel
like the rest of the site (same tokens, same `Reveal` entrance pattern,
same button styles already established in `About.tsx`'s CTA row).

The real file already exists at `public/resume/Thanh_Resume.pdf`.

## Two small data decisions (no invented facts)

- **Last Updated**: read directly from the PDF file's own filesystem
  mtime (`fs.statSync` in the Server Component) rather than a hand-typed
  date - it's real, and it updates itself automatically whenever the PDF
  is replaced.
- **Resume version**: marked optional in your spec, and there's no real
  version number to show, so it's omitted rather than inventing one
  (e.g. a fake "v1.0").

## Architecture

- `features/resume/ResumeViewer.tsx` - new, `"use client"`: the only
  interactive part of the page. Bundles the three action buttons and the
  iframe together because Print needs a ref to the same iframe the
  preview uses, and the loading placeholder needs the iframe's `onLoad`
  event - splitting them apart would mean lifting that state up for no
  benefit. Everything else on the page (heading, description, date) stays
  server-rendered.
- `app/resume/page.tsx` - rewritten: server-rendered header (title,
  description, Last Updated) wrapped in `Reveal`, then `ResumeViewer`
  wrapped in a second staggered `Reveal` - the same entrance pattern
  every other page/section on the site already uses.

### The three actions

- **Download PDF** - plain `<a href=".../Thanh_Resume.pdf" download>`, solid button style (matches `About.tsx`'s "Get in Touch" treatment).
- **Open in New Tab** - plain `<a target="_blank" rel="noopener noreferrer">`, outline button style (matches "Download Resume" there).
- **Print Resume** - the one button that needs JS: calls `iframeRef.current.contentWindow.print()`, which triggers the browser's native PDF-viewer print dialog on the already-loaded embed, rather than opening a second window and racing its load state.

### PDF embed + loading placeholder

`<iframe src={pdfUrl} onLoad={...}>` inside a `min-h-[80vh] w-full` bordered container (`border-border`, `rounded-md`, matching `Card`'s visual language). Until `onLoad` fires, a centered spinner + "Loading resume preview..." text overlays it (Tailwind's built-in `animate-spin`, no new keyframe needed) and the iframe stays `opacity-0`; once loaded, it fades in over 300ms. The spinner itself isn't gated behind `motion-reduce` - it's a functional loading indicator, not decorative motion, which the accessibility guidance in AGENTS.md treats differently from things like hover/entrance animation.

No PDF viewer library - just a native `<iframe>`, per "the PDF remains
the single source of truth" (no re-rendering resume content as HTML, no
parsing library needed).

## Files affected

- `app/resume/page.tsx` - rewritten.
- `features/resume/ResumeViewer.tsx` - new.

No new dependency.

## Responsive behavior

- **Desktop**: content column capped at `max-w-5xl`, centered, generous
  `px-6 lg:px-12 py-16` padding matching the rest of the site's page
  rhythm; the three actions sit in a row.
- **Mobile**: actions stack full-width (`w-full sm:w-auto` per button);
  the iframe container stays full-width with the same `min-h-[80vh]`
  floor so the preview is still usable on a phone.

## Acceptance Criteria

- Given the page loads, the header shows a real Last-Updated date sourced from the PDF's actual file mtime, not a hardcoded string.
- Given the PDF hasn't finished loading, a spinner + message covers the iframe; once loaded, it fades out and the PDF fades in.
- Given "Print Resume" is clicked, the PDF's own print dialog opens (not the surrounding page).
- Given the viewport is mobile-width, all three actions are full-width and stacked.
- Given the page renders, no resume content is duplicated as HTML - the iframe is the only source of the actual resume content.

## Validation Plan

- `npm run lint` / `npm run build`.
- Manual check: visit `/resume`, confirm all three actions work, confirm the loading placeholder appears then fades, confirm responsive stacking at mobile width.
