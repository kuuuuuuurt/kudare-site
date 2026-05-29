// specimen.jsx — "Show the work" hero. A market artifact Kudare has read and
// marked up by hand. The marks (circle, underline, highlight) draw on in
// sequence; numbered reads explain them in the margin; a verdict lands last.

// ---- The mark vocabulary (the hand) -------------------------------------
function Hl({ children, n, delay = 0 }) {
  return (
    <span className="sm-hl" style={{ transitionDelay: delay + "ms" }}>
      {children}
      {n ? <sup className="sm-ref" style={{ transitionDelay: (delay + 220) + "ms" }}>{n}</sup> : null}
    </span>
  );
}
function Circle({ children, n, delay = 0 }) {
  return (
    <span className="sm-circle">
      {children}
      <svg viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true">
        <path style={{ transitionDelay: delay + "ms" }}
          d="M 92 31 C 93 14 71 6 50 6 C 26 6 8 17 8 31 C 8 47 31 55 53 55 C 74 55 97 47 89 25" />
      </svg>
      {n ? <sup className="sm-ref" style={{ transitionDelay: (delay + 320) + "ms" }}>{n}</sup> : null}
    </span>
  );
}
function Under({ children, n, delay = 0 }) {
  return (
    <span className="sm-under">
      {children}
      <svg viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
        <path style={{ transitionDelay: delay + "ms" }}
          d="M1 6 C 20 2 32 9 47 5 C 63 1 79 9 99 4" />
      </svg>
      {n ? <sup className="sm-ref" style={{ transitionDelay: (delay + 220) + "ms" }}>{n}</sup> : null}
    </span>
  );
}

const SPEC_READS = [
  { n: "1", t: <React.Fragment>Third straight quarter at 4%. <b>"Held"</b> is carrying the whole sentence.</React.Fragment> },
  { n: "2", t: <React.Fragment>Premium is growing on a base that is <b>shrinking underneath it</b>.</React.Fragment> },
  { n: "3", t: <React.Fragment>The line that <b>ages badly</b>. The change is already in the numbers above.</React.Fragment> },
];

function SpecimenHero({ onContact, onNav }) {
  const ref = React.useRef(null);
  const [run, setRun] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    el.removeAttribute("data-drawn");
    void el.offsetWidth; // force reflow so a replay restarts the transitions
    const id = setTimeout(() => { if (ref.current) ref.current.dataset.drawn = "1"; }, 380);
    return () => clearTimeout(id);
  }, [run]);

  return (
    <section className="spec" id="top">
      <div className="wrap">
        <div className="spec__kick">
          <span className="kick kick--accent">Independent strategic practice</span>
          <span className="kick">A read, in the open</span>
        </div>

        <div className="specimen" ref={ref}>
          <div className="spec__grid">
            <div>
              <div className="exhibit">
                <div className="exhibit__head">
                  <span className="exhibit__tag">Exhibit A</span>
                  <span>Category incumbent · investor letter · Q1 2026</span>
                </div>
                <p className="exhibit__body">
                  &ldquo;We are pleased to report continued category leadership. Subscriber growth
                  held at <Circle n="1" delay={250}>4%</Circle> for the quarter, and the{" "}
                  <Under n="2" delay={680}>premium tier</Under> should drive the majority of revenue
                  expansion next year. We see <Hl n="3" delay={1040}>no material change</Hl> in the
                  competitive environment.&rdquo;
                </p>
                <div className="exhibit__foot">Illustrative · figures and names fictional</div>
              </div>

              <div className="verdict">
                <span className="verdict__label">The read</span>
                <p className="verdict__text">
                  Leadership is being defended with <Hl delay={1980}>language, not numbers</Hl>.
                  The opening is the tier they are calling premium.
                </p>
              </div>
            </div>

            <div className="reads">
              <span className="reads__title">In the margin</span>
              {SPEC_READS.map((r, i) => (
                <div className="read" key={r.n} style={{ transitionDelay: (1180 + i * 170) + "ms" }}>
                  <span className="read__n">{r.n}</span>
                  <span className="read__t">{r.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="spec__frame">
          <h1 className="spec__line">This is the work. We read the market and mark what matters.</h1>
          <p className="spec__sub">
            From a clean primary read to a standing intelligence system, the output is the same:
            the few things that are true, marked so you can act on them.
          </p>
          <div className="spec__cta">
            <button className="btn btn--primary" onClick={onContact}>Request a read <span className="ar">→</span></button>
            <button className="btn btn--outline" onClick={() => onNav("method")}>See the method</button>
            <button className="spec__replay" onClick={() => setRun((x) => x + 1)}>
              <span className="gl">↻</span> Watch the read
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { SpecimenHero });
