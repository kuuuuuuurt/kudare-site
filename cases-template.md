# Case study fill-in template

Use this file when you're ready to write a case study. Fill out the prompts, then paste the TypeScript at the bottom into `src/data/cases.ts`, replacing that case's existing object. Flip `caseStudyReady: true` and run `npm run build` to publish.

This template covers ONE case study. Copy this file (e.g. `cases-template-wikimedia.md`) before filling it in, so you can keep multiple drafts.

---

## Section 1 — the row on the homepage

These fields control how the case shows up in the Selected Work table on the homepage, and the section header on the detail page itself.

### `client`
The name as it should appear on the page. Examples: `Wikimedia`, `TextNow`, `Rolex`, `Mach 49`.

> _Your answer:_ `___________________________`

### `slug`
The URL-safe version of the client name. The case page will live at `/work/<slug>`. Lowercase, hyphens instead of spaces, no special chars. Examples: `wikimedia`, `1021-creative`, `mach49`.

> _Your answer:_ `___________________________`

### `n`
The index number in the case list. Two digits, zero-padded. Examples: `01`, `02`, `07`. Order on the homepage matches the order of cases in `src/data/cases.ts`.

> _Your answer:_ `___________________________`

### `year`
Year or year range. Examples: `2024`, `2023–2024`, `2025–2026`, `2023–`.

> _Your answer:_ `___________________________`

### `sector`
One- or two-word category tag. Examples: `Telecom`, `Fintech`, `Luxury`, `Venture`, `Agency`, `DTC home goods`, `Nonprofit`.

> _Your answer:_ `___________________________`

### `engagement`
Engagement model. Most common values: `Project`, `Ongoing partnership`. For unusual cases anything goes (e.g. `Senior leadership`, `Multi-phase project`).

> _Your answer:_ `___________________________`

### `services`
Two to four short labels for the services involved, in Kudare's pillar vocabulary. Each label is a string; the whole list shows on the case page's "Services" meta strip joined by ` · `.

Common service labels to pull from:
- Market intelligence: `Competitive landscape audit`, `Competitive intelligence`, `Market opportunity assessment`, `Competitor feature tracking`
- Consumer research: `Voice-of-customer research`, `Consumer segmentation`, `Brand perception`, `Customer journey mapping`, `Message testing`, `Cultural trend identification`
- Strategic advisory: `Brand positioning`, `Strategic planning facilitation`, `PMF assessment`, `GTM playbook`, `Content strategy`, `Channel strategy`, `Innovation pipeline planning`

> _Your answers (one per line):_
> - `___________________________`
> - `___________________________`
> - `___________________________`

### `whatHomepage`
The one-line description that shows on the homepage table next to the client name. Aim for one tight sentence using Kudare's service-pillar vocabulary. ~12–18 words. Examples:

- _"Strategic positioning, audience prioritization, and an off-platform playbook for the AI-answer-layer era"_
- _"Multi-year insights partnership: consumer research, market intelligence, and strategic planning support"_
- _"Competitive landscape audits and GTM playbooks for two new corporate ventures"_

> _Your answer:_
> `___________________________________________________________________________`

### `standfirst`
The serif lede on the case detail page, right under the big client name. ~25–45 words. More room than `whatHomepage` to set up what the engagement was. Should read like the opening of a magazine article.

> _Your answer:_
> ```
> ___________________________________________________________________________
> ___________________________________________________________________________
> ___________________________________________________________________________
> ```

---

## Section 2 — the body of the case page

This is where the actual story lives. Three blocks is the standard rhythm (The situation / What we did / Where it landed), but you can have any number and use any labels.

### Block 1 — usually "The situation"

#### `label`
What this block is called in the left-margin mono label. Convention: short, no verbs. Examples: `The situation`, `What we found`, `The brief`.

> _Your answer:_ `___________________________`

#### `body`
One or more paragraphs of editorial prose. Each paragraph is a separate string in the `body` array. Newsreader serif, ~18px, ~68 character measure. Voice: dry, declarative, no em-dashes, no hype.

> _Paragraph 1:_
> ```
> ___________________________________________________________________________
> ___________________________________________________________________________
> ___________________________________________________________________________
> ```
>
> _Paragraph 2 (optional):_
> ```
> ___________________________________________________________________________
> ___________________________________________________________________________
> ```

### Block 2 — usually "What we did"

#### `label`
Examples: `What we did`, `The approach`, `How we worked`.

> _Your answer:_ `___________________________`

#### `body`
> _Paragraph 1:_
> ```
> ___________________________________________________________________________
> ___________________________________________________________________________
> ```

#### `methods` (optional)
A bulleted list of the specific methods used. Each is one string. Renders as a citron-ticked list. Use for "What we did" type blocks. Skip the field entirely if not relevant.

> _Your bullets:_
> - `___________________________`
> - `___________________________`
> - `___________________________`
> - `___________________________`

### Block 3 — usually "Where it landed"

#### `label`
Examples: `Where it landed`, `The outcome`, `What changed`.

> _Your answer:_ `___________________________`

#### `body`
> _Paragraph 1:_
> ```
> ___________________________________________________________________________
> ___________________________________________________________________________
> ```

#### `stats` (optional, but powerful)
A 3-up row of headline numbers. Each stat has `v` (the value, displayed huge) and `k` (the unit/context, displayed small).

> ⚠️ Don't invent metrics. Replace with client-approved figures, or omit the field.

> _Your stats:_
> - v: `___________` k: `___________________________`
> - v: `___________` k: `___________________________`
> - v: `___________` k: `___________________________`

---

## Section 3 — the optional flourishes

These are powerful when used, but not every case has them. Skip the whole field if you don't want it.

### `pullquote` (optional)
A large italic Newsreader quote that sits between blocks 1 and 2. One word in it carries the citron swipe. ~12–24 words for the quote.

- `text`: the full quote text, with `{{swipe}}` as a placeholder for where the swipe should land.
- `emphasis`: the word that gets the citron swipe behind it. This replaces `{{swipe}}` at render time.
- `caption` (optional): a small mono uppercase line below the quote. Often used for a numeric anchor.

Example:
```
text:     "It was not a product problem. It was a {{swipe}} problem, and trust is answered with posture, not with specs."
emphasis: "trust"
caption:  "The read, delivered in 10 days"
```

> _Your quote:_
> ```
> ___________________________________________________________________________
> ___________________________________________________________________________
> ```
>
> _Word carrying the swipe:_ `___________`
>
> _Caption (optional):_ `___________________________`

### `testimonial` (optional)
A client quote with attribution. Shows below the last block, before the CTA band.

- `quote`: the full client quote. ~25–60 words is a good range.
- `attribution`: who said it. Title and company. Mono uppercase.

Example:
```
quote:       "Kurt brought equal parts deep collaboration, creative research, and analytical discernment to a problem with no time to spare."
attribution: "VP Insights, consumer brand"
```

> _Your quote:_
> ```
> ___________________________________________________________________________
> ___________________________________________________________________________
> ___________________________________________________________________________
> ```
>
> _Attribution:_ `___________________________`

---

## Section 4 — the publish toggle

Set `caseStudyReady: true` once everything above is filled in. That's the one switch that makes:

- The homepage row become a clickable link to this case page.
- The `/work/<slug>` page get generated on the next build.
- Prev/next on the case page include this case in the rotation.

Set `illustrative: false` (or just omit it). Leaving it `true` shows a small "Illustrative template · replace copy with the selected engagement" note on the page, which is appropriate during drafting but should be off when the case is published.

---

## TypeScript to paste into `src/data/cases.ts`

When all the prompts above are filled in, transcribe into this shape and replace the existing object for this case in `src/data/cases.ts`. Order in the file determines order on the homepage.

```ts
{
  slug: "PASTE_SLUG_HERE",
  n: "PASTE_N_HERE",
  client: "PASTE_CLIENT_HERE",
  year: "PASTE_YEAR_HERE",
  sector: "PASTE_SECTOR_HERE",
  engagement: "PASTE_ENGAGEMENT_HERE",
  services: [
    "PASTE_SERVICE_1",
    "PASTE_SERVICE_2",
    "PASTE_SERVICE_3",
  ],
  standfirst:
    "PASTE_STANDFIRST_HERE",
  whatHomepage: "PASTE_WHATHOMEPAGE_HERE",

  // ↓ The body of the case page.
  blocks: [
    {
      label: "The situation",
      body: [
        "PASTE_PARAGRAPH_1",
        "PASTE_PARAGRAPH_2",
      ],
    },
    {
      label: "What we did",
      body: [
        "PASTE_PARAGRAPH_1",
      ],
      methods: [
        "PASTE_METHOD_1",
        "PASTE_METHOD_2",
        "PASTE_METHOD_3",
      ],
    },
    {
      label: "Where it landed",
      body: [
        "PASTE_PARAGRAPH_1",
      ],
      stats: [
        { v: "PASTE_V_1", k: "PASTE_K_1" },
        { v: "PASTE_V_2", k: "PASTE_K_2" },
        { v: "PASTE_V_3", k: "PASTE_K_3" },
      ],
    },
  ],

  // ↓ Optional. Remove the whole property if not used.
  pullquote: {
    text: "It was not X. It was a {{swipe}} problem.",
    emphasis: "trust",
    caption: "Optional small caption",
  },

  // ↓ Optional. Remove the whole property if not used.
  testimonial: {
    quote: "PASTE_TESTIMONIAL_QUOTE",
    attribution: "PASTE_ATTRIBUTION",
  },

  // ↓ Flip to true to publish.
  caseStudyReady: true,
},
```

---

## After pasting

1. Save `src/data/cases.ts`.
2. With `npm run dev` running, the homepage should show the row as a link again, and `/work/<your-slug>` should render the full page. (If dev isn't running, just run `npm run build` once to verify.)
3. Walk through the rendered page in a browser. Check spacing, line wraps, that the pullquote swipe lands on the right word.
4. When happy: `npm run build` and re-upload `dist/` to Hostinger.

If a build error mentions your case, it's almost always a stray comma, missing quote, or unmatched bracket in the object you pasted. The terminal output points at the file + line.
