// Case studies — single source of truth, consumed by:
//   - src/components/CaseIndex.astro    (homepage Selected Work table)
//   - src/components/CaseIndexBar.astro (sticky sub-bar on case pages)
//   - src/pages/work/[slug].astro       (the dynamic case-page route)
//
// Per the README decision: ONE single combined list, with NO visible
// distinction between Kudare consulting engagements and prior in-house
// experience. Order on the homepage matches the order here.
//
// Detail pages are gated by `caseStudyReady`. When false, the homepage row
// is non-interactive (no link, no arrow, no hover) and no /work/[slug] page
// is generated. Flip to true once `blocks` (and ideally a pullquote and/or
// testimonial) are filled in.

export type CaseStat = { v: string; k: string };

export type CaseBlock = {
  label: string;
  body: string[];
  methods?: string[];
  stats?: CaseStat[];
};

export type CasePullquote = {
  text: string;       // use {{swipe}} where the citron swipe goes
  emphasis: string;   // the word the swipe sits behind
  caption?: string;
};

export type CaseTestimonial = {
  quote: string;
  attribution: string;
};

export type Case = {
  slug: string;
  n: string;
  client: string;
  year: string;
  sector: string;
  engagement: string;        // "Project" / "Ongoing partnership" / "Senior leadership" / etc.
  services: string[];
  standfirst: string;
  whatHomepage: string;      // one-liner shown in the homepage table
  blocks: CaseBlock[];
  pullquote?: CasePullquote;
  testimonial?: CaseTestimonial;
  illustrative?: boolean;    // hides the "Illustrative template" footer when false
  caseStudyReady?: boolean;  // when false, no detail page + no homepage link
};

export const CASES: Case[] = [
  {
    slug: "wikimedia",
    n: "01",
    client: "Wikimedia",
    year: "2026",
    sector: "Non-profit",
    engagement: "Project",
    services: ["Strategic positioning", "Audience prioritization", "Off-platform playbook"],
    standfirst:
      "Wikipedia's role beyond its own platform in the AI-answer-layer era — who matters off-platform, where Wikipedia should show up, and what forms its presence should take.",
    whatHomepage: "Strategic positioning, audience prioritization, and an off-platform playbook for the AI-answer-layer era",
    caseStudyReady: false,
    blocks: [],
  },
  {
    slug: "textnow",
    n: "02",
    client: "TextNow",
    year: "2025–2026",
    sector: "Telecom",
    engagement: "Ongoing partnership",
    services: [
      "Consumer learning",
      "Primary research (qual + quant)",
      "Planning support",
      "Market-intelligence system",
    ],
    standfirst:
      "Multi-year strategic partnership covering consumer learning, primary research, planning support, and the design of an AI-enabled market-intelligence system.",
    whatHomepage: "Standing insights function for an MVNO planning against a market that moves weekly",
    caseStudyReady: false,
    blocks: [],
  },
  {
    slug: "rolex",
    n: "03",
    client: "Rolex",
    year: "2023–",
    sector: "Luxury",
    engagement: "Ongoing partnership",
    services: ["Channel strategy", "Content strategy", "Competitive intelligence"],
    standfirst:
      "Advising Rolex on social media strategy across new platforms, content development, and competitive intelligence. Via True Fan / Kessel Run Ventures.",
    whatHomepage: "Channel strategy, content frameworks, and competitive intelligence for luxury platform expansion",
    caseStudyReady: false,
    blocks: [],
  },
  {
    slug: "mach49",
    n: "04",
    client: "Mach 49",
    year: "2024",
    sector: "Venture",
    engagement: "Project",
    services: ["Competitive landscape audit", "GTM playbook"],
    standfirst:
      "Competitive landscape audits and GTM strategy for two new ventures in the Mach 49 portfolio — a construction SaaS spin-out and a digital-twin platform.",
    whatHomepage: "Competitive landscape audits and GTM playbooks for two new construction-SaaS corporate ventures",
    caseStudyReady: false,
    blocks: [],
  },
  {
    slug: "ernesta",
    n: "05",
    client: "Ernesta",
    year: "2023–2024",
    sector: "DTC home goods",
    engagement: "Project",
    services: [
      "Voice-of-customer research",
      "Customer segmentation",
      "Brand perception",
    ],
    standfirst:
      "Mixed-methods voice-of-customer research and segmentation profiling the existing customer base in service of a brand repositioning toward more design-minded consumers.",
    whatHomepage: "Mixed-methods voice-of-customer research and segmentation to inform a brand repositioning",
    caseStudyReady: false,
    blocks: [],
  },
  {
    slug: "1021-creative",
    n: "06",
    client: "1021 Creative",
    year: "2024",
    sector: "Agency",
    engagement: "Project",
    services: [
      "Brand positioning",
      "Product packaging and tiering",
      "Pricing strategy",
      "GTM playbook",
    ],
    standfirst:
      "Six-month productization engagement: reframing what 1021 sells, building a tiered product suite with defined pricing, and the GTM playbook to take it to market as a cultural-intelligence firm.",
    whatHomepage: "Repositioning a cultural-intelligence agency around what it actually sells: pricing, packaging, and GTM",
    caseStudyReady: false,
    blocks: [],
  },
  {
    slug: "betterment",
    n: "07",
    client: "Betterment",
    year: "2023",
    sector: "Fintech",
    engagement: "Project",
    services: ["Market opportunity assessment", "Competitive intelligence"],
    standfirst:
      "Benefits-broker and 401(k)-provider landscape, plus competitive analysis on Betterment at Work's top competitors, informing a new B2B channel push. Via Grindle Marketing Communications.",
    whatHomepage: "Market opportunity assessment and competitive intelligence to inform a new B2B channel strategy",
    caseStudyReady: false,
    blocks: [],
  },
];

// Only generate detail pages for the cases whose write-up is finished.
// When you complete a case study, set its `caseStudyReady: true` and the
// homepage row becomes a link + the /work/[slug] page gets built.
export const READY_CASES: Case[] = CASES.filter((c) => c.caseStudyReady === true);

export function findCase(slug: string): Case | undefined {
  return CASES.find((c) => c.slug === slug);
}

export function neighbors(slug: string): { prev?: Case; next?: Case } {
  // Only navigate within ready cases so we don't link to a non-existent page.
  const i = READY_CASES.findIndex((c) => c.slug === slug);
  if (i === -1) return {};
  const prev = READY_CASES[(i - 1 + READY_CASES.length) % READY_CASES.length];
  const next = READY_CASES[(i + 1) % READY_CASES.length];
  return { prev, next };
}
