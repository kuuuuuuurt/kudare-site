# kudare-site

The marketing site for **Kudare** ([kudare.co](https://kudare.co)) — an independent strategic consulting practice. Single-page long-scroll homepage, a dynamic case-study route at `/work/[slug]`, a Field Notes section that pulls from the [Perspicacity](https://perspicacityy.substack.com/) Substack at build time, and a Formspree-backed contact form.

Built with [Astro](https://astro.build/). Ships as static HTML to be hosted on Hostinger.

## Run it locally

```bash
git clone https://github.com/kuuuuuuurt/kudare-site.git
cd kudare-site
npm install
npm run dev
```

Then open [http://localhost:4321](http://localhost:4321). Edit any file in `src/` and the browser hot-reloads.

## Build for production

```bash
npm run build
```

Outputs a fully static site to `dist/`. Upload that folder's contents to Hostinger (or anywhere that serves static HTML).

## Structure

```
src/
  pages/
    index.astro              the homepage
    work/[slug].astro        the case-study dynamic route
  layouts/
    Layout.astro             base page chrome (head, fonts, semantic tokens)
    CaseLayout.astro         layout for case-study pages
  components/                Astro components for every section
  data/
    cases.ts                 single source of truth for case studies
  lib/
    substack.ts              Perspicacity RSS fetcher (build-time)
  styles/
    colors_and_type.css      design tokens (colors, fonts, scale)
    site.css                 base styles
    quirk.css                signature devices (the citron swipe, register marks, ribbon)
    casestudy.css            case-page styles
public/
  assets/                    brand mark + wordmark SVGs
design-reference/            the original interactive prototype (archival)
```

## Editing content

Two reference docs at the project root, for changing copy without rebuilding from memory:

- **[EDITING.md](EDITING.md)** — file-to-edit table for every section of the homepage, the publish flow, and common edits like changing a single word or adjusting a heading.
- **[cases-template.md](cases-template.md)** — fill-in worksheet for writing a new case study. Each field has a prompt; the bottom has a TypeScript block to paste into `src/data/cases.ts`.

## Environment

A single environment variable for the contact form:

```bash
# .env (not committed)
PUBLIC_FORMSPREE_ID=xxxxxxxx
```

See `.env.example`. Without an ID set, the form falls back to a front-end-only "Received." preview state — useful for development, not for production.

## Design system

Design tokens live in [`src/styles/colors_and_type.css`](src/styles/colors_and_type.css) — colors, fonts, scale, motion. This file is the source of truth for design values; everything else builds on it.

The signature visual devices (the citron highlighter "swipe," the editorial register marks, the marginalia notes, the cursor-reactive hero mark, the intelligence ribbon) are implemented across [`src/styles/quirk.css`](src/styles/quirk.css) and the corresponding components.

## The `design-reference/` folder

The original interactive prototype from the design phase. Archival. Not loaded by the production build. Useful as a reference for design intent and as the source of truth for the design tokens, which were ported verbatim to `src/styles/colors_and_type.css`.

## License

All rights reserved. Source visible for transparency; not licensed for reuse.
