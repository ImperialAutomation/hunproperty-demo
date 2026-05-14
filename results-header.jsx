// results-header.jsx — shared header used on the results + detail pages.
// Compact (matches homepage) but with a focused search summary instead of nav.
// Includes hamburger menu for mobile.

const { useState: useStateH, useRef: useRefH, useEffect: useEffectH } = React;

function ResultsHeader({ brand = "Otthon" }) {
  const [drawerOpen, setDrawerOpen] = useStateH(false);
  return (
    <header style={{
      height: "var(--header-h)",
      borderBottom: "1px solid var(--line)",
      background: "var(--bg)",
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}>
      <div className="results-header-inner" style={{
        height: "100%",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
      }}>
        <a href="index.html" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 26, height: 26, borderRadius: 6, background: "var(--ink)", display: "grid", placeItems: "center" }}>
            <svg width="14" height="14" viewBox="0 0 16 16">
              <path d="M2 9 L8 3 L14 9" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="4.2" y="9" width="7.6" height="4.5" fill="white" />
            </svg>
          </span>
          <span style={{ fontFamily: "var(--serif)", fontSize: 24, lineHeight: 1, color: "var(--ink)" }}>{brand}</span>
        </a>

        {/* Breadcrumb / context — hidden on mobile via CSS */}
        <div className="results-breadcrumb" style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--muted)", flex: 1, justifyContent: "center" }}>
          <a href="index.html" style={{ color: "var(--muted)" }}>Home</a>
          <span style={{ opacity: 0.5 }}>/</span>
          <span style={{ color: "var(--ink-2)" }}>Buy</span>
          <span style={{ opacity: 0.5 }}>/</span>
          <span style={{ color: "var(--ink)", fontWeight: 500 }}>All Hungary</span>
        </div>

        {/* Desktop nav */}
        <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 13 }}>
          <a style={{ color: "var(--ink-2)", display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            Saved <span className="mono" style={{ color: "var(--muted-2)" }}>3</span>
          </a>
          <span className="mono">EN ▾</span>
          <a href="dashboard.html" style={{ border: "1px solid var(--line-strong)", padding: "6px 12px", borderRadius: 999, cursor: "pointer", fontWeight: 500 }}>For agents</a>
        </nav>

        {/* Hamburger — hidden on desktop via CSS */}
        <button className="hamburger-btn" onClick={() => setDrawerOpen(true)} style={{
          display: "none",
          appearance: "none", border: "none", background: "transparent",
          width: 44, height: 44,
          alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: "var(--ink)",
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>

      {/* Mobile drawer overlay */}
      <div className={`mobile-drawer-overlay ${drawerOpen ? "open" : ""}`} onClick={() => setDrawerOpen(false)} />
      {/* Mobile drawer */}
      <div className={`mobile-drawer ${drawerOpen ? "open" : ""}`}>
        <button className="drawer-close" onClick={() => setDrawerOpen(false)}>×</button>
        <a href="index.html" style={{ color: "var(--ink)", cursor: "pointer", fontWeight: 500 }}>Home</a>
        <a href="results.html" style={{ color: "var(--ink)", cursor: "pointer", fontWeight: 500 }}>Buy</a>
        <a style={{ color: "var(--ink)", cursor: "pointer", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 8 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          Saved (3)
        </a>
        <div style={{ padding: "12px 0", borderBottom: "1px solid var(--line)" }}>
          <span className="mono">EN ▾</span>
        </div>
        <a href="dashboard.html" style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
          color: "var(--bg)", background: "var(--ink)",
          padding: "12px 16px", borderRadius: 999,
          fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 8,
        }}>
          For agents
        </a>
      </div>
    </header>
  );
}

Object.assign(window, { ResultsHeader });
