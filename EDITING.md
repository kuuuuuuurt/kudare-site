# Editing the site yourself

A short guide so you can change copy without asking Claude every time.

## The 30-second loop

1. In a terminal, in this folder, run `npm run dev` once. Leave it running.
2. Open http://localhost:4321 in your browser. That's the site.
3. Edit a file in VS Code → save → the browser reloads. That's it.
4. When done, `Ctrl+C` to stop the dev server.

## Which file holds which copy?

The home page is composed of small Astro component files. Find the one with the words you want to change.

| Copy you want to change | File to edit |
|---|---|
| Sticky top navigation links / button | `src/components/Nav.astro` |
| Hero — headline, lede, CTAs, "01/02/03" meta row | `src/components/Hero.astro` |
| Intelligence ribbon (scrolling service terms) | `src/components/FeedRibbon.astro` |
| Offerings ledger (the three rows under "Apparatus for the decisions...") | `src/components/Offerings.astro` |
| Method pull-quote, marginalia, body paragraphs | `src/components/MethodPOV.astro` |
| "Selected work" table — and ALL case-page copy | `src/data/cases.ts` |
| Perspicacity section copy (the section H2, link label) | `src/components/FieldNotes.astro` |
| The Substack feed URL (after DNS swap) | `src/lib/substack.ts` (one constant: `FEED_URL`) |
| Contact section pitch + the two engagement models | `src/components/ContactCTA.astro` |
| Contact form fields, options, "Received." message | `src/components/ContactForm.astro` |
| Footer columns, copyright, pronunciation tag | `src/components/Footer.astro` |
| Page `<title>` and meta tags (default) | `src/layouts/Layout.astro` |

For case study pages: open `src/data/cases.ts`. Each case has a `client`, `standfirst`, `blocks`, `pullquote`, etc. Edit the strings. One file controls all six case pages plus the homepage's Selected Work table.

## What about the case study sub-bar / cs-index / casestudy.css?

Layout and design tokens are in `src/styles/` — `colors_and_type.css` (colors + fonts), `site.css` (base), `quirk.css` (signature devices), `casestudy.css` (case-page-specific). Only touch these if you're changing how things *look*. For words, you don't need them.

## Publishing changes

```bash
npm run build
```

That creates a fresh `dist/` folder. Upload the contents of `dist/` to Hostinger the same way you uploaded the site originally. Don't upload the rest of the repo — only `dist/`.

## Files you should NEVER edit by hand

- `dist/` — auto-generated. Edits get wiped on next build.
- `design-reference/` — the original prototype from Claude Design. Reference only; not shipped.
- `node_modules/` — installed dependencies. Auto-regenerated.

(These are hidden from the VS Code file explorer by `.vscode/settings.json`.)

## What if I break something?

Most likely: an unclosed tag, a missing quote, or a typo'd component name. Look at the dev server terminal — Astro prints a clear error with the file + line. Fix that line, save, the error disappears.

If you're really stuck and want to start over from the last known-good version (and you've been using git):

```bash
git diff               # see what you changed
git restore <file>    # revert one file
```

If you're NOT using git yet and you want a safety net: ask Claude to set that up — it's a small one-time chore.

## Common edits, the very fast way

### Change a single word in the hero headline

1. Open `src/components/Hero.astro`.
2. Find `We inform the` — it's right there in plain text.
3. Edit. Save. Browser reloads.

### Add a new bullet to an offerings row

1. Open `src/components/Offerings.astro`.
2. Find the offering (top of the file, `const OFFERINGS = [ ... ]`).
3. Add a string to the `list` array.
4. Save.

### Publish a new Perspicacity post to the Kudare homepage

Background: the Perspicacity cards on the homepage are fetched from your Substack's RSS feed at *build time*. New posts on Substack don't appear on the Kudare site automatically — you need to rebuild and re-upload.

1. Publish the post on Substack as normal.
2. In a terminal, in this folder: `npm run build`
3. Upload the contents of `dist/` to Hostinger.

The latest 3 posts will be on the homepage. If you ever want to change how many show, edit `getLatestPosts(3)` in `src/components/FieldNotes.astro`.

### Move the Perspicacity feed to the Kudare subdomain

Right now the site points at the direct Substack URL (`https://perspicacityy.substack.com/`) because the `perspicacity.kudare.co` custom-domain binding is still finishing on Substack's side. Once Substack confirms (the email lands and `perspicacity.kudare.co` loads the publication in a browser without redirecting to substack.com):

1. Open `src/lib/substack.ts`.
2. Change `FEED_URL` from `"https://perspicacityy.substack.com/feed"` to `"https://perspicacity.kudare.co/feed"`. One line.
3. Open `src/components/Footer.astro`. Find the footer link labeled `"Perspicacity"`. Change its `href` from `"https://perspicacityy.substack.com/"` to `"https://perspicacity.kudare.co"`.
4. `npm run build`, upload `dist/`.

The Perspicacity-section card links and the "Read more →" link all derive from `FEED_URL` so they update together.

### Swap the case-study list

1. Open `src/data/cases.ts`.
2. Edit the `CASES` array. Each entry is one case.
3. Remove `illustrative: true` from cases once their copy is final (that hides the "Illustrative template" note on the page).
4. Save. Browser reloads. All affected pages update automatically.
