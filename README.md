# Handoff: Kudare website (kudare.co)

## Overview
This is the marketing/practice website for **Kudare**, an independent strategic consulting practice (market research, intelligence, and growth strategy). The design is a single long-scroll homepage plus a contact flow. This package is what you build the production site from.

Founder: Kurt. Hosting target: **Hostinger**. Publication: **Substack** (see Open Items). The build tool you're using is **Claude Code**.

> **Case-study detail pages** have their own spec: see **`README-case-studies.md`**. This README covers the homepage; that one covers the case pages (template, data shape, the sticky case-index bar). Read both.

## About the design files
The files in `design-reference/` are a **design reference, not production code**. They were built as an HTML + React-via-in-browser-Babel prototype so the look and behavior could be designed and reviewed quickly. **Do not ship them as-is.** Your job is to **recreate this design faithfully in a proper production stack** using that stack's conventions.

- The in-browser Babel approach (`<script type="text/babel">`) is for prototyping only. Use a real build.
- Recommended stack for this project: a **static site** since it's hosted on Hostinger (shared/static hosting). **Astro** is an excellent fit (component-based, ships static HTML, trivial to deploy a build folder to Hostinger). **Vite + React** exported to static, or **Next.js** with static export, also work. Pick what you're fastest in; the design uses no server rendering.
- Fonts are Google Fonts (loaded in `colors_and_type.css`): **Bricolage Grotesque**, **Newsreader**, **Spline Sans Mono**. Keep them.

### ⚠️ Two things in the reference that are NOT part of the production site
1. **The Tweaks panel** (`tweaks-panel.jsx`, and the floating control panel) is a **design-review tool only**. Do not build it. It exists so the client could toggle design options during review. The *default* states of those toggles represent the intended production design (listed under "Production configuration" below).
2. **The "specimen" hero** (`specimen.jsx`, `specimen.css`, and the `heroMode = "specimen"` branch) is an **abandoned exploration**. Do not build it. Production uses the **"statement" hero** only (`Hero.jsx`). You can ignore/delete `specimen.*`.

### Production configuration (the intended design)
Build the site as if these review-toggles are set this way:
- **Hero:** the "statement" hero (`Hero.jsx`). *(Not the specimen.)*
- **Section register marks:** ON (the `§ 01 · LABEL ········· 01 / 05` catalogue headers + corner crop marks).
- **Marginalia:** ON (the italic editor's note in the Method section).
- **Swipe draws on:** ON (highlighter animates in when scrolled into view).
- **Hero mark motion:** ON (the dividers mark leans toward the cursor + legs breathe).
- **Offerings as ledger:** ON (the numbered ledger layout, with one inverted "break" row — *not* the 3-card layout, which is an alternate).
- **Intelligence ribbon:** ON, content = **services** (the scrolling service-vocabulary strip).
- **Baseline + column grid overlay:** *Your call.* It's ON in the prototype but it's the most optional element. Many will prefer it OFF or very subtle at launch. Treat as a nice-to-have.

## Fidelity
**High-fidelity.** Colors, typography, spacing, and interactions are final and intentional. Recreate the UI precisely. Exact design tokens live in `design-reference/colors_and_type.css` — treat that file as the source of truth for values.

---

## Design tokens
Full set in `design-reference/colors_and_type.css`. Highlights:

**Color**
- Ground (warm paper): `--paper-bright #FBF8F2`, `--paper #F4F0E8`, `--paper-2 #ECE6DA`, `--paper-3 #E2DBCC`
- Ink (warm near-black, never pure black): `--ink #1C1813`, `--ink-2 #2A251E`
- Warm graphite scale: `--graphite-1 #423A30`, `-2 #6E6557`, `-3 #9A9081`, `-4 #C8BFAE` (hairline), `-5 #DAD2C2`
- Accent — citron (used as a FILL/highlight, not as text): `--citron #C8CC1C`, `--citron-deep #A6AE15` (pressed / on light), `--citron-ink #5C5E0A` (when citron must read AS text), `--citron-tint #EEF0C2`
- Support: `--pine #244A33` (rare, data/secondary)
- On a citron fill, text is **ink**, never white.

**Type** (families + fluid scale; all `clamp()`-based)
- Display/UI: **Bricolage Grotesque** (700 for display, tight tracking ~ -0.022 to -0.028em)
- Editorial prose/quotes: **Newsreader** (serif, real italic), ~18px base, line-height ~1.55
- System labels/indices/metadata: **Spline Sans Mono**, 11px, UPPERCASE, letter-spacing 0.16em. The *only* uppercase in the system. Tabular numerals for data.
- Scale vars: `--t-display`, `--t-h1`, `--t-h2`, `--t-h3`, `--t-h4`, `--t-lead`, `--t-body (1.125rem)`, `--t-label (0.6875rem)`.

**Spacing** — 4px base rhythm, `--s-1`(4px) … `--s-11`(192px). Whitespace is generous.

**Structure**
- Radius: mostly square. `--r-0 0`, `--r-1 2px`, `--r-2 4px` (buttons/inputs), `--r-3 8px` (rare). The "hand" lives in the swipe/mark, not rounded corners.
- Borders: **2px ink rule** (`--bd-rule`) is the primary divider (editorial). 1px `--graphite-4` hairlines for cards/tables.
- Shadows: restrained, warm-black-tinted, reserved for menus/modals.
- Motion: `--ease cubic-bezier(.22,1,.36,1)`, `--dur 220ms`, `--dur-fast 120ms`, `--dur-slow 520ms`. Quiet. No bounce/spring/parallax.
- Layout: content max-width `--maxw 1280px`, fluid gutter `clamp(20px,5vw,80px)`, prose measure ~68ch.
- Inverted/dark context: a `.on-ink` class flips semantic tokens for dark sections (the closing Contact band uses a dark `--ink` background).

---

## Screens / sections (top to bottom)

The whole site is one page (`#top`, `#offerings`, `#method`, `#work`, `#notes`, `#contact`) with smooth-scroll nav. Files map: `Nav.jsx`, `Hero.jsx`, `quirk.jsx` (shared devices: ribbon, marginalia, register marks, hero mark), `Sections.jsx` (offerings, method, case index, field notes), `Footer.jsx` (contact CTA + form + footer + modal). Styles: `site.css` (base), `quirk.css` (the signature devices + contact layout), `colors_and_type.css` (tokens).

### 1. Nav (`Nav.jsx`)
- Sticky top bar, height 72px, paper background with subtle blur + 1px hairline bottom border.
- Left: **brand** = the dividers mark SVG (28px) + the wordmark **"Kudare"** where "dare" carries the citron **swipe** (highlighter behind the text). A barely-there kern opens the u/d gap so the swipe reads as a highlight of "dare," not redaction.
- Center: nav links (Bricolage, 14px, graphite-1): "What we build", "Method", "Selected work", "Field Notes". Active link gets a small citron swipe-tick underline; tracks scroll position.
- Right: primary button **"Start a conversation →"** (ink fill, paper text) — opens the **contact modal** (see §8).

### 2. Hero (`Hero.jsx`) — the "statement" hero
- Kicker row (mono, uppercase): citron-ink "Independent strategic practice" + graphite "Est. 2019".
- **Headline** (Bricolage, 700, `--t-display`, line-height ~1.0, max ~15ch): **"We inform the **decisions** you can't afford to get wrong."** — the word **"decisions"** carries the citron swipe.
- **Lede** (Newsreader, `--t-lead`, graphite-1, ~54ch): "Stop guessing on the tough stuff. We build the intelligence and decision systems senior leaders lean on when the wrong call gets expensive."
- CTAs: primary **"Start a conversation →"** (citron fill, ink text) opens modal; secondary **"See how we work"** (outline) scrolls to Method.
- Meta row: three items, each a mono index + Newsreader label, separated by 2px ink top-rules:
  - 01 — "Intelligence Systems, always on"
  - 02 — "Decision Frameworks that outlast the engagement"
  - 03 — "Strategic Reads for the moments that matter"
- **Hero mark:** the dividers/compass mark, faint (opacity ~0.14), pinned top-right. It is an inline SVG so it can animate (see Interactions).

### 3. Intelligence ribbon (`FeedRibbon` in `quirk.jsx`)
- Full-width dark (`--ink`) band directly under the hero. A single horizontally-scrolling marquee of mono, uppercase service terms separated by citron "◆", each prefixed with a citron "↑".
- Content (mode "services"): Competitive landscape audits · Brand health tracking · Consumer and buyer segmentation · Market opportunity assessment · Voice-of-customer programs · Positioning and brand architecture · GTM playbooks · Competitive intelligence and battlecards · Crisis research, fast · Trend and cultural intelligence.
- Purpose: discoverable, concrete service vocabulary (SEO + concreteness). Loops seamlessly (duplicate the track, translateX 0 → -50%, ~46s linear, infinite). Pauses on hover. Respects `prefers-reduced-motion` (no animation).
- (Alternate content mode "clients" exists in the prototype — a roster of reference engagements. Not the default.)

### 4. Offerings (`Offerings` in `Sections.jsx`) — the LEDGER layout
- Section register mark `§ 01 · OFFERINGS`. Kicker "What we build" + h2 (Bricolage 700, `--t-h2`): **"Apparatus for the decisions that matter most."**
- A **ledger**: a 2px ink top-rule, then rows separated by 1px hairlines. Each row is a CSS grid: `[mono index] [title + body] [deliverables list] [more →]`.
- Three rows (data in `OFFERINGS`):
  - **01 Intelligence Systems** — "The always-on apparatus that keeps your team plugged into the market. We build the engine and run it, train you to run it, or both." List: Brand health trackers across markets · Trend identification pipelines · Multi-agent AI market intelligence systems · Voice-of-customer programs.
  - **02 Decision Frameworks** — "Methodologies that turn a recurring strategic question into a repeatable answer. Bespoke, transferable, built to outlast the engagement." List: Consumer and buyer segmentation · Product innovation frameworks · Positioning and brand architecture · GTM playbooks with decision logic. **This row is the "break" row** (the one deliberate rule-breaker per the brand): it is **inverted to a dark `--ink` background**, bleeds slightly wider than the others (negative inline margins), with a citron index and citron "Discuss a fit →". On hover it goes to near-black.
  - **03 High-Stakes Strategic Reads** — "One-shot intelligence for pivotal moments, timed to the decision it informs." List: Competitive landscape audits · Market opportunity assessments · Brand perception and impact studies · Customer journey mapping.
- Title carries a **hover highlight** (see Interactions). Whole row is clickable → opens contact modal. Each row ends "Discuss a fit →".
- Below 760px the row collapses to a 2-column stack (index + content).

### 5. Method (`MethodPOV` in `Sections.jsx`)
- Background `--paper-2`. Register mark `§ 02 · METHODOLOGY`. Kicker (citron-ink) "The method", then a 2px ink rule.
- Two-column grid (~0.9fr / 1.4fr):
  - Left: **pull-quote** (Newsreader italic, `--t-h2`): "Anyone can surface a finding. We carry it all the way into the **decision**." — "decision" is set in bold Bricolage with a citron swipe. Below it, a **marginalia** note (italic, citron left-border in narrow widths; hangs in the margin when wide): tag "The standard" — "We measure ourselves on what gets decided, not on what gets delivered."
  - Right: three Newsreader body paragraphs:
    1. "Most research stops when the deck gets sent. Surfacing the finding was never the hard part. Getting it to the people deciding, in a form they can act on, is."
    2. "So we steward it the rest of the way. The right format, the right venue, the right cadence, the right tone for whoever has to receive it. The insight does more than get read: it becomes scaffolding in a decision you already knew you faced, or it surfaces one you didn't."
    3. "When the analysis points somewhere uncomfortable, we'll say so. Conviction is part of what you're paying for after all."
- This section is the practice's core differentiation (stewardship from discovery → decision). See the messaging doc.

### 6. Selected work / case index (`CaseIndex` in `Sections.jsx`)
- Register mark `§ 03 · CASE INDEX`. Kicker "Selected work" + h2 "Built for teams that could not afford to be wrong." Right-aligned mono "2019–2026".
- A table-like index: 2px ink top-rule, then rows (grid: `[mono n] [client] [what] [sector →]`), hairline dividers, hover lifts background + reveals a citron arrow + nudges padding.
- **⚠️ CONTENT IS PLACEHOLDER.** The current six entries (Peloton, Wikimedia, ZX Ventures, Matterport, TextNow, Unilever) are placeholders. Final selection is TBD by the client. **Decision: one single combined list, with NO visible distinction between consulting engagements and prior in-house experience.** Build the component to render an arbitrary list; don't hardcode these.
- Each row links to a **case-study detail page** — the template now exists (`Case Study.html` / `casestudy.css`); see **`README-case-studies.md`**. Wire each row to its case page (route like `/work/[slug]`).

### 7. Field Notes (`FieldNotes` in `Sections.jsx`)
- Background `--paper-2`. Register mark `§ 04 · THE PUBLICATION`. Kicker "Field Notes" + h2 "The point of view, in writing." Right mono "The publication →".
- A 3-column grid of note cards (paper surface, hairline gutters): each has a mono figure label with a citron swipe-tick, a Newsreader headline, an excerpt, and a mono footer (read time · category).
- **⚠️ Field Notes IS the publication** (one concept, not two). Content is placeholder. **The publication will be a Substack.** Intended pattern: this section shows the latest 2–3 posts and links out to the Substack (likely `notes.kudare.co`), ideally pulled automatically via the Substack **RSS feed** at build time. Do not build a CMS for it.

### 8. Contact (`ContactCTA`, `ContactForm`, `ContactModal` in `Footer.jsx`)
- The closing section `#contact` is a **dark band** (`--ink` background, paper text). Register mark `§ 05 · START A CONVERSATION`.
- Two-column grid:
  - Left (pitch): h2 (Bricolage 700, ~`--t-h2`) **"Instinct gets you most of the way. The big bets deserve a little **more**."** ("more" carries the swipe). Lede: "Tell us the decision in front of you. A real person reads every note and replies within two working days." Then two **engagement models** (top-hairline-ruled items): **Ongoing partnership** — "An intelligence function on retainer: briefings on your cadence, and strategic support on call when a question can't wait." and **Project** — "A defined question, scope, and timeline. Most often where a relationship starts."
  - Right: the **contact form**, rendered as a **light card** (`--paper-bright`) sitting on the dark band so fields stay legible.
- **The same `ContactForm` appears in two places:** (a) inline in this section, and (b) inside a **popup modal** that opens from the nav button, hero buttons, and offering rows. Build the form once and reuse it. (In the prototype the modal neutralizes the form's card chrome since the modal provides its own surface.)
- **Form fields:** Name (text), Work email (email), "What you're considering" (select: Intelligence Systems / Decision Frameworks / High-Stakes Strategic Read / A specific research project / Not sure yet), "The decision in front of you" (textarea), an **opt-in checkbox** (default checked): "Send me Field Notes and the occasional market read. Monthly at most, and you can unsubscribe anytime.", and a full-width primary submit **"Send it over →"**.
- **Submit behavior (prototype):** front-end only; on submit it swaps to a "Received." confirmation card ("We read every note personally and reply within two working days. No autoresponder, no funnel."). **Production must wire a real backend** (see Open Items).

### 9. Footer (`Footer.jsx`)
- `--paper-2` background. Grid: brand column (mark + wordmark + tagline "The intelligence and systems companies use to make big decisions confidently.") and three link columns:
  - Practice: Intelligence Systems · Decision Frameworks · High-Stakes Strategic Reads · How we engage
  - Library: Field Notes · Selected work
  - Elsewhere: LinkedIn · reckziegel.me · info@kudare.co
- Baseline row: "© 2026 Kudare. All rights reserved." and "koo · dare [speaker icon] · independent strategic practice". The **speaker icon is a button** that plays the pronunciation of "Kudare" via the Web Speech API (`speechSynthesis.speak("koo dare")`). **Future:** swap for an `<audio>` element with a real recorded clip when available.

---

## Signature design devices (get these right — they ARE the brand)
- **The swipe** — a citron highlighter stroke behind a run of type, slightly rotated (~-1.3deg), irregular corner radii, sitting *behind* the text (legibility preserved). Used sparingly: the wordmark "dare", the hero word "decisions", the method word "decision", the CTA word "more". One per view. Implemented as a span with a background/clip. Tokens prefixed `--swipe-*`.
- **Register marks** — mono catalogue headers (`§ 02 · METHODOLOGY ········· 02 / 05`) with a citron tick, plus small L-shaped **crop marks** at each section's top corners. Editorial "marked-up document" furniture.
- **The ledger break row** — exactly one row inverts to dark. The deliberate "one outlandish move per page."
- **Marginalia** — short editor's notes in Newsreader italic, hung in the margin (absolute) on wide screens, folded inline with a citron left-border on narrow.
- **Hero mark motion** — the dividers mark leans toward the cursor (compass "taking a reading") and its legs breathe slowly. Subtle, quiet.
- **Intelligence ribbon** — the mono service-vocabulary marquee.

## Interactions & behavior
- **Smooth-scroll nav** with active-section tracking (highlights the current section's nav link). Offset for the 72px sticky nav.
- **Swipe draw-on:** each swipe is hidden then "drawn on" (left→right reveal via `clip-path`, ~520ms `--ease`) when it scrolls into view (IntersectionObserver). Honor `prefers-reduced-motion` (show fully, no animation). Don't gate text visibility on it; only the highlight animates.
- **Hover highlight** on offering/case titles: a citron band grows behind the title on row hover (`background-size` 0→100%, ~220ms). On the dark "break" row it's a citron underline instead (so light text stays legible).
- **Hero mark:** mousemove tilts the mark up to ±6deg toward the cursor (rAF-throttled, ~700ms ease); legs run a slow breathing keyframe (~6.5s). Off under reduced motion.
- **Ribbon marquee:** infinite linear scroll, pause on hover, off under reduced motion.
- **Contact modal:** opens from nav/hero/offering triggers; scrim click or close button dismisses; locks body scroll while open. The closing-section inline form is always present regardless.
- **Form:** submit → "Received." state (front-end only in prototype). Opt-in checkbox defaults checked.
- **Pronunciation button:** plays speech synthesis of the name.
- All motion is quiet: fades and short moves, `--ease`, ~220ms. No bounce/spring/parallax.

## State management
Minimal. In the prototype: active nav section (scroll-derived), modal open/closed, form "sent" boolean, opt-in boolean. (The Tweaks state is review-only and not part of production.)

## Responsive behavior
The prototype is **desktop-first and still needs a dedicated mobile pass** (flagged as a to-do). Breakpoints used: ~900px (offerings ledger → stacked, method → single column, ribbon/notes → single column, nav links hidden), ~760px (ledger row → 2-col), ~880px (contact grid → single column), ~640px. When you build, do a proper mobile pass: the hero display type, the ledger, the register marks, and the contact two-column all need attention at small sizes. Hit targets ≥44px.

## Assets
- **Brand mark** (the "dividers"/compass glyph) in `design-reference/assets/`: `kudare-mark.svg` (primary, citron hinge), `kudare-mark-ink.svg` (single-color), `kudare-mark-reversed.svg` (for dark grounds). The hero uses an **inline** copy of this glyph (in `quirk.jsx` / `HeroMark`) so its legs can animate.
- **Fonts:** Google Fonts — Bricolage Grotesque, Newsreader, Spline Sans Mono (imported in `colors_and_type.css`).
- No raster images in the current design. (Case-study detail pages will likely need imagery later.)
- The client also intends to recreate these brand elements in **Canva** for future asset creation (separate track).

## Open items / TODOs (not yet resolved — don't block the core build on these)
1. **Case-study selection + content.** Detail page template now exists (see `README-case-studies.md`). Final list is TBD (single combined list, no consulting/in-house distinction); render the index + pages from a data array. Real copy, images, stats, testimonials pending from client.
2. **The publication.** It's a Substack. Implement Field Notes as latest-posts-from-Substack (RSS at build time) + link out, likely at `notes.kudare.co`. Don't build a CMS.
3. **Contact form backend.** Currently front-end only. Wire to a form service (Formspark / Basin / Formspree) and connect the opt-in to the client's email tool so it actually subscribes.
4. **The baseline/column grid overlay** — confirm whether it ships (optional; lean off or subtle).
5. **Standard launch items:** domain, favicon, page `<title>`/meta/OG tags, analytics, a real mobile pass.

## Files (in `design-reference/`)
- `index.html` — app shell + composition + the (review-only) Tweaks wiring.
- `Nav.jsx` — nav, brand, wordmark, the `Swipe` component.
- `Hero.jsx` — statement hero.
- `quirk.jsx` — shared devices: `FeedRibbon`, `Margin` (marginalia), `SectionMark` (register marks), `HeroMark` (animated mark).
- `Sections.jsx` — `Offerings` (ledger), `MethodPOV`, `CaseIndex`, `FieldNotes` + their data arrays.
- `Footer.jsx` — `ContactCTA`, `ContactForm`, `ContactModal`, `Footer`, pronunciation.
- `site.css` — base styles. `quirk.css` — signature devices + contact layout. `specimen.css` — IGNORE (abandoned). `colors_and_type.css` — design tokens (source of truth).
- `specimen.jsx` / `tweaks-panel.jsx` — IGNORE for production (abandoned hero / review tool).
- `README.md` (inside design-reference) — the original design-system notes for context.

## Content source of truth
`../Kudare_Messaging_and_Positioning.md` (bundled at the top of this package) is the verbal brief: positioning, the stewardship method, voice rules, and the finalized copy. Defer to it for any wording question. Note its voice rules (no em dashes, no "…is real" tic, plain/dry register, etc.).
