// quirk.jsx — the "marked-up document" furniture: section register marks,
// marginalia, the intelligence ribbon, and the cursor-reactive hero mark.
// All are inert unless their tweak is on (gated by data-attrs on <html> in CSS).

// Catalogue header for a section: § folio · LABEL ········· n / of
function SectionMark({ folio, label, of = "05" }) {
  return (
    <div className="secmark" aria-hidden="true">
      <span className="secmark__folio"><span className="secmark__tick"></span>§ {folio}</span>
      <span className="secmark__label">{label}</span>
      <span className="secmark__rule"></span>
      <span className="secmark__of">{folio} / {of}</span>
    </div>
  );
}

// An editor's note. side: "left" | "right" hangs in the margin (absolute);
// flow makes it sit in normal flow (for narrow columns with no margin to hang into).
function Margin({ tag = "Ed. note", side = "right", flow = false, top, style, children }) {
  const s = Object.assign({}, top != null ? { top } : null, style);
  return (
    <aside className={"marg marg--" + side + (flow ? " marg--flow" : "")} style={s} aria-hidden="true">
      <span className="marg__tag">{tag}</span>
      {children}
    </aside>
  );
}

// Intelligence ribbon — mono instrument readout, looped seamlessly.
// mode "services" = the familiar service vocabulary (discoverable, concrete);
// "clients" = the reference roster.
const RIBBON_CLIENTS = [
  { a: "Peloton", b: "brand health across six markets" },
  { a: "Wikimedia", b: "AI-era ecosystem positioning" },
  { a: "ZX Ventures", b: "front-end innovation framework" },
  { a: "Matterport", b: "competitive intelligence program" },
  { a: "TextNow", b: "multi-agent market brief" },
  { a: "Unilever", b: "North American People Data Center" },
];
const RIBBON_SERVICES = [
  "Competitive landscape audits",
  "Brand health tracking",
  "Consumer and buyer segmentation",
  "Market opportunity assessment",
  "Voice-of-customer programs",
  "Positioning and brand architecture",
  "GTM playbooks",
  "Competitive intelligence and battlecards",
  "Crisis research, fast",
  "Trend and cultural intelligence",
];

function FeedRibbon({ mode = "services" }) {
  const run = mode === "clients"
    ? RIBBON_CLIENTS.map((f, i) => (
        <span className="feed__item" key={"c" + i}>
          <b>{f.a}</b> {f.b}<span className="feed__sep">◆</span>
        </span>
      ))
    : RIBBON_SERVICES.map((p, i) => (
        <span className="feed__item" key={"s" + i}>
          <span className="up">↑</span> {p}<span className="feed__sep">◆</span>
        </span>
      ));
  return (
    <div className="feed" data-mode={mode} role="marquee" aria-label="Kudare ribbon">
      <div className="feed__track">{run}{run}</div>
    </div>
  );
}

// Hero mark — the dividers instrument, inline so it can move. It leans toward
// the cursor (taking a reading) and its legs breathe slowly. Static when off.
function HeroMark() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    let raf = 0;
    const onMove = (e) => {
      if (document.documentElement.dataset.heromotion !== "on") return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const nx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
        el.style.setProperty("--tilt", (Math.max(-1, Math.min(1, nx)) * 6).toFixed(2) + "deg");
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);
  return (
    <svg ref={ref} className="hero-mark" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <g className="hero-mark__rot">
        <g stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
          <g className="hero-mark__leg hero-mark__leg--l">
            <path d="M46 19 C39 44 28 64 20 85"></path>
            <path d="M20 85 l-4 5" strokeWidth="3.5"></path>
          </g>
          <g className="hero-mark__leg hero-mark__leg--r">
            <path d="M50 19 C57 44 68 64 76 85"></path>
            <path d="M76 85 l4 5" strokeWidth="3.5"></path>
          </g>
          <path d="M48 5 L48 10.5" strokeWidth="3.5"></path>
        </g>
        <circle cx="48" cy="15" r="5.4" fill="var(--citron)" stroke="var(--ink)" strokeWidth="3.5"></circle>
      </g>
    </svg>
  );
}

Object.assign(window, { SectionMark, Margin, FeedRibbon, HeroMark });
