// Sections.jsx — Offerings, Method/POV, Selected work, Field Notes

const OFFERINGS = [
  {
    idx: "01",
    title: "Intelligence Systems",
    body: "The always-on apparatus that keeps your team plugged into the market. We build the engine and run it, train you to run it, or both.",
    list: ["Brand health trackers across markets", "Trend identification pipelines", "Multi-agent AI market intelligence systems", "Voice-of-customer programs"],
  },
  {
    idx: "02",
    title: "Decision Frameworks",
    body: "Methodologies that turn a recurring strategic question into a repeatable answer. Bespoke, transferable, built to outlast the engagement.",
    list: ["Consumer and buyer segmentation", "Product innovation frameworks", "Positioning and brand architecture", "GTM playbooks with decision logic"],
  },
  {
    idx: "03",
    title: "High-Stakes Strategic Reads",
    body: "One-shot intelligence for pivotal moments, timed to the decision it informs.",
    list: ["Competitive landscape audits", "Market opportunity assessments", "Brand perception and impact studies", "Customer journey mapping"],
  },
];

function Offerings({ onContact, ledger }) {
  return (
    <section className="section" id="offerings">
      <div className="wrap">
        <SectionMark folio="01" label="Offerings" />
        <div className="section__head">
          <div>
            <span className="kick">What we build</span>
            <h2>Apparatus for the decisions that matter most.</h2>
          </div>
        </div>
        {ledger ? (
          <div className="ledger">
            {OFFERINGS.map((o) => {
              const isBreak = o.idx === "02";
              return (
                <div className={"ledger-row" + (isBreak ? " ledger-row--break" : "")} key={o.idx} onClick={onContact}>
                  <span className="ledger-row__idx">{o.idx}</span>
                  <div className="ledger-row__main">
                    <h3><span className="mark-hover">{o.title}</span></h3>
                    <p>{o.body}</p>
                  </div>
                  <ul className="ledger-row__list">
                    {o.list.map((l) => <li key={l}>{l}</li>)}
                  </ul>
                  <span className="ledger-row__more">Discuss a fit <span className="ar">→</span></span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="offers">
            {OFFERINGS.map((o) => (
              <div className="offer" key={o.idx} onClick={onContact}>
                <span className="offer__idx">{o.idx}</span>
                <h3><span className="mark-hover">{o.title}</span></h3>
                <p>{o.body}</p>
                <ul className="offer__list">
                  {o.list.map((l) => <li key={l}>{l}</li>)}
                </ul>
                <span className="offer__more">Discuss a fit <span className="ar">→</span></span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function MethodPOV() {
  return (
    <section className="section" id="method" style={{ background: "var(--paper-2)" }}>
      <div className="wrap">
        <SectionMark folio="02" label="Methodology" />
        <span className="kick kick--accent">The method</span>
        <hr className="rule" style={{ margin: "16px 0 44px" }} />
        <div className="method">
          <blockquote className="method__quote">
            Anyone can surface a finding. We carry it all the way into the <Swipe>decision</Swipe>.
            <Margin tag="The standard" side="left" flow={true}>
              We measure ourselves on what gets decided, not on what gets delivered.
            </Margin>
          </blockquote>
          <div className="method__body">
            <p>
              Most research stops when the deck gets sent. Surfacing the finding was never the
              hard part. Getting it to the people deciding, in a form they can act on, is.
            </p>
            <p>
              So we steward it the rest of the way. The right format, the right venue, the
              right cadence, the right tone for whoever has to receive it. The insight does
              more than get read: it becomes scaffolding in a decision you already knew you
              faced, or it surfaces one you didn't.
            </p>
            <p>
              When the analysis points somewhere uncomfortable, we'll say so. Conviction is
              part of what you're paying for after all.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// TODO (content pending): final case-study selection is still TBD. Decision: ONE
// combined list, no visible distinction between Kudare consulting engagements and
// prior in-house experience. Swap these placeholders for the chosen set when ready.
const CASES = [
  { n: "01", client: "Peloton", what: "Crisis research and brand-health tracking after the Tread+ recall", sector: "Crisis response" },
  { n: "02", client: "Wikimedia", what: "Ecosystem positioning for the AI answer-layer era", sector: "Repositioning" },
  { n: "03", client: "ZX Ventures", what: "Front-End Innovation framework: build, buy, or pass", sector: "Innovation" },
  { n: "04", client: "Matterport", what: "Competitive intelligence program and enterprise personas", sector: "Competitive intel" },
  { n: "05", client: "TextNow", what: "Multi-agent weekly market intelligence brief", sector: "Intelligence system" },
  { n: "06", client: "Unilever", what: "North American People Data Center, stood up from scratch", sector: "Capability" },
];

function CaseIndex() {
  return (
    <section className="section" id="work">
      <div className="wrap">
        <SectionMark folio="03" label="Case index" />
        <div className="section__head">
          <div>
            <span className="kick">Selected work</span>
            <h2>Built for teams that could not afford to be wrong.</h2>
          </div>
          <span className="kick" style={{ whiteSpace: "nowrap" }}>2019–2026</span>
        </div>
        <div className="cases">
          {CASES.map((c) => (
            <a className="case" key={c.n} href="#work" onClick={(e) => e.preventDefault()}>
              <span className="case__n">{c.n}</span>
              <span className="case__client"><span className="mark-hover">{c.client}</span></span>
              <span className="case__what">{c.what}</span>
              <span className="case__sector">{c.sector}<span className="case__arrow"> →</span></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// TODO (refine later): pending a decision on what "the publication" actually is.
// Field Notes == the publication (same thing); keep them as one concept, not two.
const NOTES = [
  { fig: "Field Note · No. 03", title: "The problem with most research isn't rigor.", excerpt: "It is that nobody reads it after the slides land. The fix is an apparatus, not another study.", meta: ["6 min read", "Intelligence"] },
  { fig: "Field Note · No. 02", title: "A recurring question deserves a method.", excerpt: "Re-deciding from a blank page every quarter is a tax you pay in confidence and in time.", meta: ["5 min read", "Frameworks"] },
  { fig: "Field Note · No. 01", title: "Speed is a property of the apparatus.", excerpt: "Set the cadence so the read never falls behind the market it is supposed to describe.", meta: ["4 min read", "Operating"] },
];

function FieldNotes() {
  return (
    <section className="section" id="notes" style={{ background: "var(--paper-2)" }}>
      <div className="wrap">
        <SectionMark folio="04" label="The publication" />
        <div className="section__head">
          <div>
            <span className="kick">Field Notes</span>
            <h2>The point of view, in writing.</h2>
          </div>
          <span className="kick" style={{ whiteSpace: "nowrap" }}>The publication →</span>
        </div>
        <div className="notes">
          {NOTES.map((nt) => (
            <article className="note-card" key={nt.fig}>
              <span className="note-card__fig">{nt.fig}</span>
              <h4>{nt.title}</h4>
              <p>{nt.excerpt}</p>
              <div className="note-card__foot">
                {nt.meta.map((m, i) => <span key={i}>{i > 0 ? "· " : ""}{m}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Offerings, MethodPOV, CaseIndex, FieldNotes, OFFERINGS, CASES, NOTES });
