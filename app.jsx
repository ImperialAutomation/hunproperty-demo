// app.jsx — Otthon homepage shell

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "brandName": "Otthon",
  "accent": "terracotta",
  "searchLayout": "row",
  "showRegionLabel": true
}/*EDITMODE-END*/;

const ACCENTS = {
  terracotta: { primary: "oklch(0.58 0.12 45)",  ink: "oklch(0.42 0.10 45)" },
  sage:       { primary: "oklch(0.55 0.08 145)", ink: "oklch(0.40 0.07 145)" },
  navy:       { primary: "oklch(0.48 0.09 250)", ink: "oklch(0.36 0.08 250)" },
  ochre:      { primary: "oklch(0.66 0.12 85)",  ink: "oklch(0.46 0.10 85)" },
};

const BRAND_NAMES = ["Otthon", "Páva", "Lakhely", "Magyaria"];

function applyAccent(name) {
  const a = ACCENTS[name] || ACCENTS.terracotta;
  document.documentElement.style.setProperty("--accent", a.primary);
  document.documentElement.style.setProperty("--accent-ink", a.ink);
}

function Header({ brand }) {
  return (
    <header style={{
      height: "var(--header-h)",
      borderBottom: "1px solid var(--line)",
      background: "var(--bg)",
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}>
      <div style={{
        height: "100%",
        maxWidth: 1320,
        margin: "0 auto",
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
      }}>
        {/* Logo */}
        <a style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <span style={{
            width: 26, height: 26,
            borderRadius: 6,
            background: "var(--ink)",
            display: "grid", placeItems: "center",
          }}>
            {/* tiny Hungarian-house glyph: arch over square — minimal, brand-mark style */}
            <svg width="14" height="14" viewBox="0 0 16 16">
              <path d="M2 9 L8 3 L14 9" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="4.2" y="9" width="7.6" height="4.5" fill="white" />
            </svg>
          </span>
          <span style={{
            fontFamily: "var(--serif)",
            fontSize: 24,
            lineHeight: 1,
            color: "var(--ink)",
            letterSpacing: "-0.005em",
          }}>
            {brand}
          </span>
          <span className="mono" style={{ marginLeft: 6, color: "var(--muted-2)" }}>
            Hungarian homes
          </span>
        </a>

        {/* Nav (right) */}
        <nav style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 14 }}>
          <a style={{ color: "var(--ink-2)", cursor: "pointer" }}>Buy</a>
          <a style={{ color: "var(--ink-2)", cursor: "pointer" }}>Rent</a>
          <a style={{ color: "var(--ink-2)", cursor: "pointer" }}>Regions</a>
          <a style={{ color: "var(--ink-2)", cursor: "pointer" }}>Guide</a>

          {/* Language picker */}
          <LangPicker />

          {/* For agents */}
          <a style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            color: "var(--ink)",
            border: "1px solid var(--line-strong)",
            padding: "6px 12px",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
          }}>
            For agents
            <svg width="11" height="11" viewBox="0 0 12 12"><path d="M3 2l5 4-5 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </nav>
      </div>
    </header>
  );
}

function LangPicker() {
  const [lang, setLang] = React.useState("EN");
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  const langs = [
    { id: "HU", label: "Magyar"  },
    { id: "EN", label: "English" },
    { id: "NL", label: "Nederlands" },
    { id: "DE", label: "Deutsch" },
  ];
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(v => !v)} style={{
        appearance: "none",
        border: "none",
        background: "transparent",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: "var(--mono)",
        fontSize: 11,
        letterSpacing: "0.06em",
        color: "var(--ink)",
        cursor: "pointer",
        padding: "4px 6px",
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9"/>
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>
        </svg>
        {lang}
        <svg width="9" height="9" viewBox="0 0 12 12" style={{ opacity: 0.5 }}><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", right: 0,
          background: "var(--bg)", border: "1px solid var(--line)",
          borderRadius: 8, padding: 4, minWidth: 140,
          boxShadow: "0 12px 26px rgba(20,30,28,0.10)",
          zIndex: 60,
        }}>
          {langs.map(l => (
            <div key={l.id}
              onClick={() => { setLang(l.id); setOpen(false); }}
              style={{
                padding: "7px 10px",
                borderRadius: 6,
                fontSize: 13,
                cursor: "pointer",
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: 10,
                background: l.id === lang ? "var(--surface)" : "transparent",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--surface)"}
              onMouseLeave={e => e.currentTarget.style.background = l.id === lang ? "var(--surface)" : "transparent"}
            >
              <span>{l.label}</span>
              <span className="mono" style={{ color: "var(--muted)" }}>{l.id}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Hero({ searchLayout }) {
  return (
    <section style={{
      padding: "44px 32px 56px",
      maxWidth: 1320,
      margin: "0 auto",
    }}>
      {/* Top label + intro */}
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 18, gap: 24 }}>
        <div>
          <div className="mono" style={{ marginBottom: 8 }}>
            <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: 999, background: "var(--accent)", marginRight: 8, transform: "translateY(-1px)" }}/>
            Live · 2,461 listings across Hungary
          </div>
          <h1 style={{
            fontFamily: "var(--serif)",
            fontWeight: 400,
            fontSize: 44,
            lineHeight: 1.05,
            margin: 0,
            letterSpacing: "-0.012em",
            color: "var(--ink)",
            maxWidth: 720,
          }}>
            Find a home in Hungary — <em style={{ fontStyle: "italic" }}>lake, city, or vineyard</em>.
          </h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 12, color: "var(--muted)", flexShrink: 0 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/></svg>
            Verified listings
          </span>
          <span style={{ width: 1, height: 12, background: "var(--line-strong)" }}/>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/><circle cx="12" cy="12" r="9"/></svg>
            4 languages
          </span>
        </div>
      </div>

      {/* Search + Map */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1.35fr) minmax(0, 1fr)",
        gap: 28,
        alignItems: "start",
      }}>
        <div>
          <SearchBar layout={searchLayout} />
        </div>
        <HungaryRegionMap />
      </div>
    </section>
  );
}

function FeaturedSection() {
  return (
    <section style={{
      padding: "12px 32px 40px",
      maxWidth: 1320,
      margin: "0 auto",
    }}>
      <SectionHead
        kicker="Just listed"
        title="Featured homes this week"
        cta="Browse all 2,461 →"
      />
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        gap: 22,
        rowGap: 32,
      }}>
        {PROPERTIES.map(p => <PropertyCard key={p.id} p={p} />)}
      </div>
    </section>
  );
}

function RegionsSection() {
  return (
    <section style={{
      padding: "24px 32px 64px",
      maxWidth: 1320,
      margin: "0 auto",
    }}>
      <SectionHead
        kicker="By region"
        title="Popular places to live"
        cta="See all regions →"
      />
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
        gap: 14,
      }}>
        {REGIONS.map(r => <RegionCard key={r.id} r={r} />)}
      </div>
    </section>
  );
}

function SectionHead({ kicker, title, cta }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      marginBottom: 22,
      gap: 16,
    }}>
      <div>
        <div className="mono" style={{ marginBottom: 6 }}>{kicker}</div>
        <h2 style={{
          fontFamily: "var(--serif)",
          fontWeight: 400,
          fontSize: 30,
          lineHeight: 1.1,
          margin: 0,
          letterSpacing: "-0.01em",
          color: "var(--ink)",
        }}>
          {title}
        </h2>
      </div>
      {cta && <a style={{ fontSize: 13, color: "var(--ink-2)", cursor: "pointer", whiteSpace: "nowrap", borderBottom: "1px solid var(--line-strong)", paddingBottom: 2 }}>{cta}</a>}
    </div>
  );
}

function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--line)",
      padding: "22px 32px",
      maxWidth: 1320,
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
      color: "var(--muted)",
      fontSize: 12,
    }}>
      <div className="mono">© 2026 Otthon · Budapest</div>
      <div style={{ display: "flex", gap: 20 }}>
        <a style={{ cursor: "pointer" }}>About</a>
        <a style={{ cursor: "pointer" }}>Privacy</a>
        <a style={{ cursor: "pointer" }}>Contact</a>
      </div>
    </footer>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => { applyAccent(t.accent); }, [t.accent]);

  return (
    <div data-screen-label="01 Homepage">
      <Header brand={t.brandName} />
      <Hero searchLayout={t.searchLayout} />
      <FeaturedSection />
      <RegionsSection />
      <Footer />

      <TweaksPanel>
        <TweakSection label="Brand" />
        <TweakRadio
          label="Name"
          value={t.brandName}
          options={BRAND_NAMES}
          onChange={(v) => setTweak('brandName', v)}
        />
        <TweakSection label="Palette" />
        <TweakRadio
          label="Accent"
          value={t.accent}
          options={["terracotta", "sage", "navy", "ochre"]}
          onChange={(v) => setTweak('accent', v)}
        />
        <TweakSection label="Search" />
        <TweakRadio
          label="Layout"
          value={t.searchLayout}
          options={["row", "stacked"]}
          onChange={(v) => setTweak('searchLayout', v)}
        />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
