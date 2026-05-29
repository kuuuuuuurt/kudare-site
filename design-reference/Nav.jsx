// Nav.jsx — sticky site navigation with active-section tracking
const { useState, useEffect } = React;

// The swipe — brand highlighter motif. Wrap any run of text.
function Swipe({ children }) {
  return (
    <span className="swipe"><span className="swipe__mark"></span><span className="swipe__txt">{children}</span></span>
  );
}

// Wordmark — "Ku" + swiped "dare" (kern gap handled in CSS)
function Wordmark() {
  return <span className="wordmark">Ku<Swipe>dare</Swipe></span>;
}

function Brand({ onClick }) {
  return (
    <div className="brand" onClick={onClick}>
      <img src="assets/kudare-mark.svg" alt="Kudare" />
      <Wordmark />
    </div>
  );
}

const NAV_ITEMS = [
  { id: "offerings", label: "What we build" },
  { id: "method", label: "Method" },
  { id: "work", label: "Selected work" },
  { id: "notes", label: "Field Notes" },
];

function SiteNav({ active, onNav, onContact }) {
  return (
    <header className="nav">
      <div className="wrap nav__in">
        <Brand onClick={() => onNav("top")} />
        <nav className="nav__links">
          {NAV_ITEMS.map((it) => (
            <span
              key={it.id}
              className={"nav__link" + (active === it.id ? " is-active" : "")}
              onClick={() => onNav(it.id)}
            >
              {it.label}
            </span>
          ))}
        </nav>
        <button className="btn btn--ink" onClick={onContact}>
          Start a conversation <span className="ar">→</span>
        </button>
      </div>
    </header>
  );
}

Object.assign(window, { SiteNav, Brand, Wordmark, Swipe, NAV_ITEMS });
