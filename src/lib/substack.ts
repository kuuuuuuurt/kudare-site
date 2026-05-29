// Fetches the latest posts from the Perspicacity Substack feed at build time.
// Used by src/components/FieldNotes.astro to render the homepage's publication
// cards from live data instead of a hardcoded array.
//
// The fetch runs once per build (or once per dev-server start, thanks to the
// module-level cache). When you publish a new post on Substack, run
// `npm run build` and re-upload `dist/` to Hostinger to refresh the cards.

import Parser from "rss-parser";

// Interim: pointing at the direct Substack URL while the perspicacity.kudare.co
// custom-domain binding finishes processing on Substack's side. Once that goes
// live, swap this one line to "https://perspicacity.kudare.co/feed" and rebuild.
export const FEED_URL = "https://perspicacityy.substack.com/feed";

// Where the "Read more →" link in the section header points.
export const PUBLICATION_URL = FEED_URL.replace(/\/feed$/, "");

export interface Post {
  title: string;
  excerpt: string;
  url: string;
  date: Date;
  readMinutes: number;
}

// Module-level cache: in dev mode, this means we hit the network once per
// dev-server start, not on every page reload.
let cached: Post[] | null = null;

const WORDS_PER_MINUTE = 225;
const EXCERPT_CHARS = 180;

function stripHtml(s: string): string {
  return s.replace(/<style[\s\S]*?<\/style>/gi, "")
          .replace(/<script[\s\S]*?<\/script>/gi, "")
          .replace(/<[^>]+>/g, "")
          .replace(/&nbsp;/g, " ")
          .replace(/&amp;/g, "&")
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/\s+/g, " ")
          .trim();
}

function buildExcerpt(item: any): string {
  // Prefer contentSnippet (rss-parser strips HTML for us); fall back to
  // stripping the full content manually.
  const raw = (item.contentSnippet as string | undefined)
           ?? stripHtml((item["content:encoded"] as string | undefined) ?? item.content ?? item.description ?? "");
  const cleaned = raw.replace(/\s+/g, " ").trim();
  if (cleaned.length <= EXCERPT_CHARS) return cleaned;
  // Cut on a word boundary so we don't strand "th" mid-word.
  const cut = cleaned.slice(0, EXCERPT_CHARS);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > EXCERPT_CHARS * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd() + "…";
}

function estimateReadMinutes(item: any): number {
  const text = stripHtml((item["content:encoded"] as string | undefined) ?? item.content ?? item.contentSnippet ?? "");
  const words = text ? text.split(/\s+/).length : 0;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export async function getLatestPosts(limit = 3): Promise<Post[]> {
  if (cached) return cached.slice(0, limit);

  try {
    const parser = new Parser({ timeout: 8000 });
    const feed = await parser.parseURL(FEED_URL);
    const posts: Post[] = feed.items.map((item) => ({
      title: (item.title ?? "").trim(),
      excerpt: buildExcerpt(item),
      url: item.link ?? "",
      date: new Date(item.isoDate ?? item.pubDate ?? Date.now()),
      readMinutes: estimateReadMinutes(item),
    }));
    cached = posts;
    return posts.slice(0, limit);
  } catch (err) {
    // Network blip, feed change, build-time offline — keep the section from
    // shipping empty by using a small frozen snapshot of the latest known
    // posts. Refresh this list periodically (or after every successful build).
    console.warn(`[substack] feed fetch failed (${(err as Error).message}); using fallback.`);
    return FALLBACK_POSTS.slice(0, limit);
  }
}

// Snapshot fallback — only used when the network fetch fails. Update by
// running a successful build and copying the rendered cards back here.
const FALLBACK_POSTS: Post[] = [
  {
    title: "Bombas, Affective Forecasting, AI Transcription, & Experience-Stuff Pendulum",
    excerpt: "This week we welcome Jocelin Lee, Senior Director of Consumer Insights at Bombas. Read on as Jocelin reveals her path through investigating white-collar crime…",
    url: "https://perspicacityy.substack.com/p/issue-4",
    date: new Date("2022-06-16T10:30:11.000Z"),
    readMinutes: 6,
  },
  {
    title: "ELC, Stereotype Content Model, Flyover Politics, & Redefined Success",
    excerpt: "A read on what drives prestige in beauty, why the SCM keeps coming up in segmentation work, and a sharper lens on success after the obvious one runs out.",
    url: "https://perspicacityy.substack.com/p/issue-3",
    date: new Date("2022-06-02T10:00:38.000Z"),
    readMinutes: 5,
  },
  {
    title: "ECCO, Emotional Granularity, Podcast Recos, & Goths",
    excerpt: "Quietly Danish design, a quiet idea from clinical psychology that explains a lot of marketing failures, and a quietly excellent week of listening.",
    url: "https://perspicacityy.substack.com/p/issue-2",
    date: new Date("2022-05-27T01:26:30.000Z"),
    readMinutes: 5,
  },
];
