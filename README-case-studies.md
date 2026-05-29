# Handoff addendum — Case study pages

Read `README.md` first. This file covers ONLY the case-study detail pages, which are new since that README was written. Everything in the main README about stack, tokens, fonts, signature devices, and "don't ship the prototype as-is" applies here too.

## What this is
A reusable **case-study detail page template**. One template, rendered once per selected engagement. The design reference is:
- `design-reference/Case Study.html` — the full page (static HTML; no React/Babel here, unlike the homepage prototype).
- `design-reference/casestudy.css` — its styles. Loads on top of `site.css` + `colors_and_type.css` (same tokens as the rest of the site).

Open `Case Study.html` in a browser to see the intended result. It's populated with an **illustrative Peloton example** — the copy, figures, and images are placeholder (there's a visible "Illustrative template" note in the header). **Do not treat the example content as final.**

## How it should work in production
These are **data-driven pages**, not six hand-built HTML files. Build one template/component and render it from a list of case-study records. In a static stack (Astro recommended, per the README) this is a content collection + a `[slug].astro` dynamic route; in Next.js, a dynamic route with static params; etc.

### ⚠️ Content is not final
The set of case studies is **TBD by the client**. Decision already made: **one single combined list, with NO visible distinction between Kudare consulting engagements and prior in-house experience.** The placeholders currently shown (Peloton, Wikimedia, ZX Ventures, Matterport, TextNow, Unilever) are illustrative. Build for an arbitrary list; don't hardcode.

### Suggested data shape (adapt freely)
```
{
  slug: "peloton",
  n: "01",                      // index in the set
  client: "Peloton",
  year: "2021",
  sector: "Consumer fitness",
  engagement: "Project",        // or "Ongoing partnership"
  services: ["Crisis research", "Brand health"],
  standfirst: "...",            // the lede under the title
  heroImage: "...",             // optional
  blocks: [                     // the labeled content sections
    { label: "The situation", body: [ "para", "para" ] },
    { label: "What we did",   body: [...], methods: ["...","..."] },
    { label: "Where it landed", body: [...], stats: [{v:"10 days", k:"..."}] }
  ],
  pullquote: { text: "...", emphasis: "trust", caption: "..." },  // emphasis word gets the swipe
  testimonial: { quote: "...", attribution: "..." },
  prev: { slug, client },       // for the bottom prev/next
  next: { slug, client }
}
```
Treat the section labels (The situation / What we did / Where it landed) as a **suggested rhythm, not a fixed schema** — some cases won't have stats or a testimonial. Render blocks conditionally.

## Page structure (top to bottom)
1. **Global nav** — the SAME header as the homepage (brand mark + "Kudare" wordmark with the swipe on "dare", the four section links, "Start a conversation" button). The links point back to the homepage sections (`/#offerings`, `/#method`, `/#work`, `/#notes`) and the button to `/#contact`. "Selected work" carries the active state.
2. **Case-index sub-bar** (`.cs-index`) — a second sticky bar directly under the main nav, **unique to case-study pages**. It lists every case in the set (`01 Peloton · 02 Wikimedia · …`), horizontally scrollable on small screens, with the current case marked (citron tick + ink text via `.is-current`). This is the primary way to move between cases without going back to the homepage. **Render this list from the same data as the case index; mark the current slug.** (Per the client: this persistent bar lives ONLY on case pages — do NOT turn the homepage's "Selected work" nav item into a dropdown.)
3. **Header** (`.cs-head`) — a register mark (`§ Case 01 · Selected work · [year]`), the client name as the H1 (`.cs-title`), the standfirst lede, a 4-up **meta strip** (`.cs-meta`: Sector / Engagement / Services / Year), and a lead **image placeholder** (`.ph.cs-hero-img`).
4. **Content blocks** (`.cs-block` + `.cs-grid`) — each is a two-column row: a sticky mono **label in the left margin** (`.cs-label`, e.g. "01 / The situation") and prose on the right (`.cs-body`, max ~68ch). "What we did" includes a citron-ticked **methods list** (`.cs-methods`). Add figure placeholders (`.ph.cs-fig` + `.cs-figcap`) where a case has imagery.
5. **The read** (`.cs-quote`) — a `--paper-2` band with a large Newsreader-italic **pull-quote**; one word carries the swipe (the `.swipe` markup). This is the case's one-line thesis.
6. **Where it landed** (`.cs-block`) — outcome prose plus an optional 3-up **stats row** (`.cs-stats` / `.cs-stat`). Stats use placeholder values in brackets like `[ 10 ]` — these MUST be replaced with real, client-approved figures or the block omitted. Don't invent metrics.
7. **Testimonial** (`.cs-testimonial`) — optional; a real client quote + attribution.
8. **CTA** (`.cs-cta`) — dark `--ink` band, "Have a decision like this in front of you?" + "Start a conversation →" linking to `/#contact`.
9. **Prev / next** (`.cs-nav`) — links to the adjacent cases. Secondary to the sub-bar.
10. **Global footer** — the SAME footer as the homepage (brand, link columns, baseline with the "koo · dare" pronunciation button). Reuse the shared footer component; don't fork it.

## Key implementation notes
- **Reuse the shared nav + footer components** from the homepage. They are intentionally identical for cross-site consistency. The only case-page-specific chrome is the `.cs-index` sub-bar.
- **Sticky offsets matter.** Main nav is 72px; the `.cs-index` bar sits at `top: 72px`; the in-content `.cs-label` sticks at `top: 144px` (below both bars). If you change nav height, update these together.
- **No grid overlay on case pages** (deliberate client decision — the homepage's baseline/column grid would fight long-form reading). Case pages stay clean.
- **The swipe** in the pull-quote and wordmark uses the same `.swipe` / `.swipe__mark` / `.swipe__txt` markup as the homepage. On these static pages it's shown at rest (no scroll draw-on JS), which is fine; if you want it to animate in, reuse the homepage's IntersectionObserver approach.
- **Image placeholders** (`.ph`) are striped slots labeled with what goes there. Replace with real `<img>`/`<picture>` (these pages will need real imagery; the homepage currently has none).
- **Pronunciation button**: the footer's speaker button calls `speechSynthesis`. Same as homepage; a small inline script handles it on the static page. Swap for a recorded `<audio>` clip when available.
- **Routing**: case pages should live at something like `/work/[slug]`. The homepage case index rows (currently inert in the prototype) should link to these. Update the homepage `CaseIndex` to link each row to its case page.
- **Responsive**: `.cs-grid` collapses to single column and `.cs-label` goes inline at ≤860px; meta and stats reflow. Still do a real mobile pass (same caveat as the rest of the site).

## New asset since the main README
- `assets/kudare-wordmark.svg` and `assets/kudare-wordmark-reversed.svg` — the "Kudare" wordmark lockup (Bricolage + citron swipe on "dare") as standalone SVGs, in case you want the wordmark as an image rather than live text. The nav/footer still use live text for the wordmark; these are for og-images, emails, etc.

## Open items specific to case pages
1. Final case list + real copy, figures, images, testimonials (client).
2. Real outcome stats, or omit the stats block. No invented numbers.
3. Decide the route pattern and wire the homepage case index rows to link in.
4. Mobile pass.
