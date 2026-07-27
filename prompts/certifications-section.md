# Certifications Section

## Context

The Certifications nav item (`#certifications`) is a placeholder. The user
wants certifications grouped by issuing provider in an accordion, sourced
only from the resume's Certifications section (already extracted this
session via `pdftotext`).

## Real data used (verified only)

Three certifications, three providers - no credential IDs or verification
URLs exist anywhere in the resume (I re-checked the PDF's embedded link
annotations directly, via its raw `/URI` objects - there are none), so
those two fields are simply omitted per "if unavailable, omit rather than
guess":

| Provider | Certification | Issue date |
| --- | --- | --- |
| Google | Google AI Essentials | Jul 2026 |
| Anthropic | Claude Code 101 | Jul 2026 |
| ETS | TOEIC Listening & Reading (Score: 870) | Jun 2026 |

Related-skill badges are short paraphrases of each certification's own
resume description (not new claims): Google AI Essentials -> "Prompt
Engineering", "AI Productivity"; Claude Code 101 -> "Claude Code",
"Agentic Workflows", "Prompt Engineering", "Context Management"; TOEIC ->
"Professional English Proficiency".

**Provider naming note**: the resume credits TOEIC as "Administered by IIG
Vietnam (Official ETS Representative)" - IIG Vietnam is the local proctor,
ETS is the actual certifying organization that owns the TOEIC exam, so
that's the provider group used here. That "administered by" detail is kept
in the certification's own description rather than invented as a second
provider.

**Provider logos**: Google and Anthropic have real, sourceable brand marks
(fetched from Simple Icons - `public/tech/google.svg`, and reusing the
`anthropic.svg`/`anthropic-dark.svg` pair already vendored for the Tech
Stack section, per "prefer reuse over duplication"). **ETS has no logo in
Simple Icons or devicon** - rather than hand-drawing one (banned by
AGENTS.md §12), that provider falls back to a neutral Phosphor
`CertificateIcon` in place of a brand mark.

## 1. Accordion architecture

Built entirely with native HTML `<details>`/`<summary>`, **zero
JavaScript**:

```html
<details class="group" name="certifications">
  <summary>...logo, name, count, chevron...</summary>
  <div><!-- certification list --></div>
</details>
```

- **"Only one provider expanded at a time"** is the browser-native
  exclusive-accordion behavior: giving every `<details>` the same `name`
  attribute makes the browser itself enforce single-open, no state
  management needed. (This is a modern HTML feature - shipped in all
  evergreen browsers since early 2024 - consistent with this project
  already assuming a modern-only rendering target, e.g. `oklch()` colors
  throughout `globals.css`.)
- **Chevron rotation** uses Tailwind's `group-open:rotate-180` variant,
  which targets the `[open]` attribute state - no JS toggle handler.
- **Smooth animation**: native `<details>` show/hide is an instant snap
  with no transition, so the actual expand/collapse motion reuses the same
  `grid-rows-[0fr] → group-open:grid-rows-[1fr]` CSS technique already
  built for the Tech Stack section's hover reveal - `<details>` supplies
  the accessible open/closed *state*, the grid-rows trick supplies the
  *animation*, cleanly separating semantics from motion.
- The first provider (Google) is `open` by default so the section isn't
  empty-looking on first paint.
- This makes the entire section Server-Component-only, same as Tech Stack
  - no Client Component anywhere in this feature.

## 2. Data structure

`content/certifications.ts`:

```ts
export interface Certification {
  title: string;
  issueDate: string;
  credentialId?: string;
  verifyUrl?: string;
  skills?: string[];
}

export interface CertificationProvider {
  name: string;
  logo?: string;       // omitted -> falls back to a neutral Certificate icon
  logoDark?: string;
  certifications: Certification[];
}

export const certificationProviders: CertificationProvider[] = [ /* Google, Anthropic, ETS */ ];
```

Matches the requested Provider -> Certifications -> Metadata shape. The
section only ever does
`certificationProviders.map((provider) => <ProviderAccordion provider={provider} />)`
- adding a certification or a whole new provider is a data-file edit only.

## 3. Files affected

- `public/tech/google.svg` - new (already fetched, real Google brand blue).
- `content/certifications.ts` - new.
- `components/sections/certifications/ProviderAccordion.tsx` - new, Server Component: the `<details>` block described above (logo/fallback icon, name, count badge, animated chevron, animated content region).
- `components/sections/certifications/CertificationItem.tsx` - new, Server Component: title, issue date, and (conditionally) credential ID / Verify Credential link / skill badges.
- `components/sections/Certifications.tsx` - modified: replace the placeholder with a vertical stack of `ProviderAccordion`s.

No new dependency, no Client Component - same "native platform feature
over JS" approach as the Projects carousel (CSS Scroll Snap) and Tech
Stack hover reveal (CSS `group-hover`/`group-focus`).

## 4. Responsive behavior

Per the brief, this section does **not** change shape across breakpoints -
accordion cards stack vertically full-width at every size, mobile and
desktop alike. That's simpler than every prior section (Experience,
Projects, Tech Stack all reflow their grid at `sm`/`lg`); Certifications is
just `flex flex-col gap-4` everywhere.

## One flagged inconsistency

Same as the last three sections: the brief says "Occupy at least one
viewport (`min-h-screen`)"; this plan keeps the shared `Section`
component's `min-h-dvh` per AGENTS.md §5 rather than reintroducing the
banned class.

## Acceptance Criteria

- Given the section renders, exactly 3 providers appear, each showing its real certification count in the collapsed header.
- Given a provider is expanded, all others collapse - verified via the native `<details name>` grouping, not JS.
- Given `prefers-reduced-motion: reduce`, the expand/collapse has no transition.
- Given a certification has no `credentialId`/`verifyUrl`, neither renders - no broken links, no fabricated IDs.
- Given ETS has no sourceable brand logo, its header shows a neutral `CertificateIcon` instead of an invented mark.

## Validation Plan

- `npm run lint` - zero warnings.
- `npm run build` - TypeScript strict-checks clean.
- Manual check: visit `/#certifications`, confirm expanding one provider collapses any other, confirm chevron rotates, confirm keyboard operability (Tab to a `<summary>`, press Enter/Space to toggle).

## Risks

- Exclusive `<details name>` grouping requires a reasonably modern browser (shipped since early-2024 in Chrome/Firefox/Safari); older browsers will still show each accordion independently openable (graceful degradation, not breakage) rather than true single-open enforcement.
- ETS's fallback icon is a generic Phosphor glyph, not a brand mark - flagged above as an intentional, honest substitution rather than a fabricated logo.
