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

## Stack

- [Astro](https://astro.build) — static site generator
- [rss-parser](https://github.com/rbren/rss-parser) — parses the Perspicacity Substack feed at build time
- Google Fonts (Bricolage Grotesque, Newsreader, Spline Sans Mono) — loaded via `@import` in `colors_and_type.css`
- [Formspree](https://formspree.io/) — contact-form backend (form ID in `.env`)
- [Lighthouse](https://github.com/GoogleChrome/lighthouse) — devDependency for local audits

No client-side framework runtime. No analytics. No CDN dependencies at runtime.

## Deploying

This site auto-deploys via GitHub Actions. Push to `main`, the workflow at `.github/workflows/deploy.yml` runs, builds the site, and uploads `./dist/` over FTPS to Hostinger. End-to-end takes ~60 seconds.

### Day-to-day workflow

```bash
# 1. Edit something
# 2. (Optional) Preview locally
npm run dev          # http://localhost:4321

# 3. Commit and push — that's the deploy
git add .
git commit -m "Short description of the change"
git push
```

Watch the run at `gh run watch` in the terminal, or in the browser at the **Actions** tab of the GitHub repo. When it goes green, hard-refresh `https://kudare.co/` (Cmd+Shift+R) to see the change live.

### Required GitHub secrets

Four encrypted secrets configured under **Settings → Secrets and variables → Actions** on the GitHub repo:

| Secret name | Value |
|---|---|
| `FTP_SERVER` | FTP hostname from hPanel → **Files → FTP Accounts**. Bare hostname only — no `ftp://` prefix, no trailing slash. |
| `FTP_USERNAME` | FTP username (looks like `u123456789` or `u123456789.kudare.co`). |
| `FTP_PASSWORD` | FTP password. |
| `PUBLIC_FORMSPREE_ID` | Formspree form ID (baked into the contact form at build time). |

### Server-dir gotcha

The workflow's `server-dir` is set to `/domains/kudare.co/public_html/` — Hostinger's premium hosting layout puts each domain in its own subdirectory.

**Do NOT change this to `/public_html/`** (the obvious-looking default). That folder exists at the FTP account's home directory level, but it's **NOT** the live document root for the domain. Files uploaded there go nowhere visible to the public.

### `.htaccess` and the custom 404

[`public/.htaccess`](public/.htaccess) gets copied to `dist/.htaccess` at build time. It does two things:

1. Serves [`src/pages/404.astro`](src/pages/404.astro) (built to `/404.html`) for any unmatched route.
2. Sets cache headers: HTML 5 min (so edits propagate fast), images/PDF 30 days, fingerprinted CSS/JS/fonts 1 year (Astro emits content hashes in those filenames, so the cache busts itself when the source changes).

Modify with care — wrong cache rules can stale-serve broken updates.

### After a deploy, verify

For trivial content edits, hard-refresh and eyeball the live site. For anything bigger:

1. Hit `https://kudare.co/` in a private window to bypass cache.
2. Click into a case-study row (once any are `caseStudyReady: true`) and confirm `/work/<slug>/` loads.
3. Hit a deliberately bad URL like `/nope/` and confirm the custom 404 still serves.
4. (Optional, for major changes) re-run the Lighthouse audit — see below.

### Manual fallback (emergency only)

If auto-deploy is broken and you need to push a fix urgently:

```bash
npm run build
```

Then upload contents of `dist/` manually to `/domains/kudare.co/public_html/` via Hostinger File Manager. In hPanel File Manager, use the **"Access files of kudare.co"** shortcut — it routes you directly to the correct doc root. The **"Access all files"** option lands you at the account home, where there's a leftover `/public_html/` that's a dead-end.

### Common gotchas

- **Cache headers** mean your browser might serve cached HTML for up to 5 minutes after a deploy. Hard-refresh (Cmd+Shift+R) to see fresh content immediately.
- **Don't commit secrets.** Anything sensitive belongs in `.env` (gitignored) and gets referenced via `import.meta.env`. The GitHub Actions runner pulls from repo secrets.
- **Lockfile discipline.** If you `npm install` a new dependency locally, commit both `package.json` AND `package-lock.json`. The Actions runner uses `npm ci` which fails if the lockfile is out of sync.
- **Pretty URLs.** Astro generates `/work/<slug>/index.html`, which serves cleanly at `/work/<slug>/` with no extra `.htaccess` config required.

## Local Lighthouse audit

Lighthouse is installed as a devDependency. To re-audit at any point:

```bash
npm run build
npm run preview    # in one terminal
# in another terminal:
npx lighthouse http://localhost:4321/ \
  --chrome-flags="--headless --no-sandbox" \
  --only-categories=accessibility,best-practices,seo,performance \
  --throttling-method=provided \
  --preset=desktop \
  --view
```

`--view` opens the HTML report in a browser when done.

## License

All rights reserved. Source visible for transparency; not licensed for reuse.
