# UI Kit — kudare.co (website)

A high-fidelity, interactive recreation of Kudare's marketing/practice site, built on the
root design system (`../../colors_and_type.css`). This is the primary brand surface: the
offering, the method, the point of view.

> Note: there was no existing `kudare.co` build to recreate from. This kit *defines* the
> site from the brand brief and visual foundations. Treat it as the reference
> implementation until a production build supersedes it.

## Run it
Open `index.html`. React + Babel load from CDN; components are plain JSX files registered
to `window`. No build step.

## What's here
A single scrolling homepage with working interactions:

| Component | File | Notes |
|-----------|------|-------|
| `SiteNav` | `Nav.jsx` | Sticky nav, dividers mark + swiped wordmark, active-section citron tick (scroll-tracked), ink CTA button. Includes `Brand`, `Wordmark`, `Swipe`. |
| `Hero` | `Hero.jsx` | Bricolage display headline with the citron swipe on one phrase, lede, dual CTA, offering index on ink rules. Oversized dividers mark as faint ornament. |
| `Offerings` | `Sections.jsx` | Three indexed offering columns on a 2px ink rule, hairline separators, citron tick bullets. Hover grows a citron top-tick. |
| `MethodPOV` | `Sections.jsx` | Editorial two-column: Newsreader italic pull-quote with a swiped Bricolage phrase + argued prose. |
| `CaseIndex` | `Sections.jsx` | Selected-work table: mono index, serif client, sans description, mono sector. Hover indents the row. |
| `FieldNotes` | `Sections.jsx` | Three writing cards with figure labels, the publication layer. |
| `ContactCTA` | `Footer.jsx` | Ink section, large serif statement, email-signature block in mono. |
| `Footer` | `Footer.jsx` | Mark, tagline, link columns, base line with pronunciation. |
| `ContactModal` | `Footer.jsx` | "Start a conversation" form: fields, select, textarea, ink focus ring, success state. |

The `App` in `index.html` wires nav state, smooth in-page scrolling, scroll-spy, and modal
open/close (with body scroll lock).

## Interactions to try
- Click any nav item or the mark to scroll; watch the active underline track the section.
- "Start a conversation" / "Request a read" / any offering card opens the contact modal.
- Submit the modal to see the received state.
- Hover the selected-work rows and offering columns.

## Design notes
- **Structure × hand:** Bricolage display + mono labels + hard rules (structure), with the
  citron swipe and dividers mark as the one human gesture per view.
- **One swipe per view:** the hero phrase, the method phrase, the CTA word. Never more.
- **Mono is chrome, not body:** kickers, indices, sectors, the email signature.
- **Squared, ruled, bordered.** No rounded cards beyond 4px on buttons/inputs. Dividers
  are 2px ink rules and 1px hairlines, not shadows.
- **Citron is a fill, not a text color:** ink text on citron buttons; citron-ink when the
  accent must read as text.

## Cutting corners (intentionally)
Form submission is faked (no backend). Links are inert. Field Notes don't route to
articles. This is a visual + interaction reference, not production code.
