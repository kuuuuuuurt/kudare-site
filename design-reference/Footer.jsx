// Footer.jsx — Contact CTA, footer, and the contact modal
const { useState: useStateF } = React;

// Speak the brand name on demand (koo · dare). Web Speech API, no asset needed.
// Swap for an <audio> element with a recorded clip when one exists.
function sayKudare() {
  try {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance("koo dare");
    u.rate = 0.85;
    synth.speak(u);
  } catch (e) {}
}

function ContactCTA() {
  return (
    <section className="cta" id="contact">
      <div className="wrap">
        <SectionMark folio="05" label="Start a conversation" />
        <div className="cta__grid">
          <div className="cta__pitch">
            <h2 className="cta__head">
              Instinct gets you most of the way. The big bets deserve a little <Swipe>more</Swipe>.
            </h2>
            <p className="cta__lead">
              Tell us the decision in front of you. A real person reads every note and
              replies within two working days.
            </p>
            <div className="engage">
              <div className="engage__item">
                <span className="engage__k">Ongoing partnership</span>
                <span className="engage__d">An intelligence function on retainer: briefings on your cadence, and strategic support on call when a question can't wait.</span>
              </div>
              <div className="engage__item">
                <span className="engage__k">Project</span>
                <span className="engage__d">A defined question, scope, and timeline. Most often where a relationship starts.</span>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

const FOOT_COLS = [
  { h: "Practice", links: ["Intelligence Systems", "Decision Frameworks", "High-Stakes Strategic Reads", "How we engage"] },
  { h: "Library", links: ["Field Notes", "Selected work"] },
  { h: "Elsewhere", links: ["LinkedIn", "reckziegel.me", "info@kudare.co"] },
];

function Footer({ onNav }) {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot__grid">
          <div className="foot__brand">
            <div className="row">
              <img src="assets/kudare-mark.svg" alt="Kudare" />
              <Wordmark />
            </div>
            <p className="foot__tag">
              The intelligence and systems companies use to make big decisions confidently.
            </p>
          </div>
          {FOOT_COLS.map((col) => (
            <div className="foot__col" key={col.h}>
              <h5>{col.h}</h5>
              {col.links.map((l) => (
                <a key={l} onClick={(e) => e.preventDefault()}>{l}</a>
              ))}
            </div>
          ))}
        </div>
        <div className="foot__base">
          <span>© 2026 Kudare. All rights reserved.</span>
          <span className="foot__pron">
            koo · dare{" "}
            <button type="button" className="pronounce" onClick={sayKudare} aria-label="Hear how Kudare is pronounced" title="Hear it">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M11 5 6 9H2v6h4l5 4z"></path>
                <path d="M15.5 8.5a5 5 0 0 1 0 7"></path>
                <path d="M19 5a9 9 0 0 1 0 14"></path>
              </svg>
            </button>
            {" "}· independent strategic practice
          </span>
        </div>
      </div>
    </footer>
  );
}

const SERVICE_OPTS = ["Intelligence Systems", "Decision Frameworks", "High-Stakes Strategic Read", "A specific research project", "Not sure yet"];

function ContactForm() {
  const [sent, setSent] = useStateF(false);
  const [optin, setOptin] = useStateF(true);
  if (sent) {
    return (
      <div className="contact-card contact-card--done">
        <img className="mk" src="assets/kudare-mark.svg" alt="" />
        <h3>Received.</h3>
        <p>We read every note personally and reply within two working days. No autoresponder, no funnel.</p>
      </div>
    );
  }
  return (
    <div className="contact-card">
      <div className="field">
        <label>Name</label>
        <input type="text" placeholder="Your name" />
      </div>
      <div className="field">
        <label>Work email</label>
        <input type="email" placeholder="name@company.com" />
      </div>
      <div className="field">
        <label>What you're considering</label>
        <select defaultValue={SERVICE_OPTS[0]}>
          {SERVICE_OPTS.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="field">
        <label>The decision in front of you</label>
        <textarea placeholder="A competitor just moved and we need to decide how to respond."></textarea>
      </div>
      <label className="optin">
        <input type="checkbox" checked={optin} onChange={(e) => setOptin(e.target.checked)} />
        <span>Send me Field Notes and the occasional market read. Monthly at most, and you can unsubscribe anytime.</span>
      </label>
      <button className="btn btn--primary contact-card__send" onClick={() => setSent(true)}>
        Send it over <span className="ar">→</span>
      </button>
    </div>
  );
}

function ContactModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="modal__scrim" onClick={onClose}>
      <div className="modal modal--contact" onClick={(e) => e.stopPropagation()}>
        <div className="modal__top">
          <div>
            <span className="kick kick--accent">Start a conversation</span>
            <h3>What decision are you facing?</h3>
          </div>
          <button className="modal__close" onClick={onClose}>CLOSE ✕</button>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}

Object.assign(window, { ContactCTA, Footer, ContactForm, ContactModal });
