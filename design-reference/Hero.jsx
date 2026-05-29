// Hero.jsx — the practice's opening statement
function Hero({ onContact, onNav }) {
  return (
    <section className="hero" id="top">
      <HeroMark />
      <div className="wrap">
        <div className="hero__kick">
          <span className="kick kick--accent">Independent strategic practice</span>
          <span className="kick">Est. 2019</span>
        </div>
        <h1 className="hero__head">
          We inform the <Swipe>decisions</Swipe> you can't afford to get wrong.
        </h1>
        <p className="hero__lede">
          Stop guessing on the tough stuff. We build the intelligence and decision
          systems senior leaders lean on when the wrong call gets expensive.
        </p>
        <div className="hero__cta">
          <button className="btn btn--primary" onClick={onContact}>
            Start a conversation <span className="ar">→</span>
          </button>
          <button className="btn btn--outline" onClick={() => onNav("method")}>
            See how we work
          </button>
        </div>
        <div className="hero__meta">
          <div className="item">
            <span className="n">01</span>
            <span className="l">Intelligence Systems, always on</span>
          </div>
          <div className="item">
            <span className="n">02</span>
            <span className="l">Decision Frameworks that outlast the engagement</span>
          </div>
          <div className="item">
            <span className="n">03</span>
            <span className="l">Strategic Reads for the moments that matter</span>
          </div>
        </div>
      </div>
    </section>
  );
}
Object.assign(window, { Hero });
