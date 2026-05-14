// detail.jsx — Composition: header, breadcrumb, gallery, two-column body, similar properties

const DETAIL_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "terracotta",
  "stickySidebar": true
}/*EDITMODE-END*/;

const DETAIL_ACCENTS = {
  terracotta: { primary: "oklch(0.58 0.12 45)",  ink: "oklch(0.42 0.10 45)" },
  sage:       { primary: "oklch(0.55 0.08 145)", ink: "oklch(0.40 0.07 145)" },
  navy:       { primary: "oklch(0.48 0.09 250)", ink: "oklch(0.36 0.08 250)" },
  ochre:      { primary: "oklch(0.66 0.12 85)",  ink: "oklch(0.46 0.10 85)" },
};

function applyDetailAccent(name) {
  const a = DETAIL_ACCENTS[name] || DETAIL_ACCENTS.terracotta;
  document.documentElement.style.setProperty("--accent", a.primary);
  document.documentElement.style.setProperty("--accent-ink", a.ink);
}

function Breadcrumb({ p }) {
  return (
    <nav className="detail-breadcrumb" style={{
      padding: "14px 24px 0",
      maxWidth: 1280,
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontSize: 13,
      color: "var(--muted)",
    }}>
      <a href="index.html" style={{ color: "var(--muted)" }}>Home</a>
      <span style={{ opacity: 0.5 }}>/</span>
      <a href="results.html" style={{ color: "var(--muted)" }}>Buy</a>
      <span style={{ opacity: 0.5 }}>/</span>
      <a style={{ color: "var(--muted)", cursor: "pointer" }}>{p.region}</a>
      <span style={{ opacity: 0.5 }}>/</span>
      <a style={{ color: "var(--muted)", cursor: "pointer" }}>{p.location.split(",")[0]}</a>
      <span style={{ opacity: 0.5 }}>/</span>
      <span style={{ color: "var(--ink-2)", fontWeight: 500 }}>{p.title}</span>
      <span style={{ marginLeft: "auto" }}>
        <a href="results.html" style={{
          fontSize: 13, color: "var(--ink-2)",
          display: "inline-flex", alignItems: "center", gap: 6,
        }}>
          ← Back to results
        </a>
      </span>
    </nav>
  );
}

// Quick page-nav strip (sticky on scroll)
function PageNav({ p }) {
  const items = [
    { id: "about",      l: "About" },
    { id: "features",   l: "Features" },
    { id: "floorplan",  l: "Floorplan" },
    { id: "location",   l: "Location" },
    { id: "similar",    l: "Similar" },
  ];
  return (
    <div style={{
      position: "sticky",
      top: "var(--header-h)",
      background: "color-mix(in oklch, var(--bg) 92%, transparent)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid var(--line)",
      zIndex: 30,
      marginTop: 14,
    }}>
      <div className="page-nav-inner" style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        gap: 24,
        height: 44,
        fontSize: 13.5,
      }}>
        {items.map(it => (
          <a key={it.id} href={`#${it.id}`} style={{
            color: "var(--ink-2)",
            paddingBottom: 2,
            borderBottom: "1px solid transparent",
            cursor: "pointer",
          }}
          onMouseEnter={e => e.currentTarget.style.borderBottomColor = "var(--ink-2)"}
          onMouseLeave={e => e.currentTarget.style.borderBottomColor = "transparent"}
          >{it.l}</a>
        ))}
        <span style={{ flex: 1 }} />
        <span className="mono">Asking</span>
        <span style={{ fontFamily: "var(--serif)", fontSize: 18, color: "var(--ink)" }}>{fmtPrice(p.price)}</span>
        <button style={{
          appearance: "none",
          background: "var(--ink)",
          color: "var(--bg)",
          border: "none",
          borderRadius: 999,
          padding: "6px 14px",
          fontSize: 12.5,
          fontWeight: 500,
          cursor: "pointer",
        }}>
          Contact agent
        </button>
      </div>
    </div>
  );
}

function SimilarSection({ current }) {
  // Pick 4 other properties in the same region
  const others = PROPERTIES.filter(p => p.id !== current.id && p.region === current.region).slice(0, 4);
  return (
    <section id="similar" style={{
      maxWidth: 1280,
      margin: "0 auto",
      padding: "40px 24px 64px",
      borderTop: "1px solid var(--line)",
    }}>
      <div style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginBottom: 22, gap: 16,
      }}>
        <div>
          <div className="mono" style={{ marginBottom: 6 }}>Similar properties</div>
          <h2 style={{
            fontFamily: "var(--serif)", fontWeight: 400,
            fontSize: 28, lineHeight: 1.1, margin: 0, letterSpacing: "-0.01em",
          }}>
            Other homes around the lake
          </h2>
        </div>
        <a href="results.html" style={{ fontSize: 13, color: "var(--ink-2)", borderBottom: "1px solid var(--line-strong)", paddingBottom: 2 }}>
          See all {PROPERTIES.filter(x => x.region === current.region).length} {current.region} listings →
        </a>
      </div>
      <div className="similar-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        gap: 22, rowGap: 32,
      }}>
        {others.map(p => <PropertyCard key={p.id} p={p} />)}
      </div>
    </section>
  );
}

function DetailFooter() {
  return (
    <footer style={{
      borderTop: "1px solid var(--line)",
      padding: "22px 24px",
      maxWidth: 1280,
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

function DetailApp() {
  const [t, setTweak] = useTweaks(DETAIL_TWEAK_DEFAULTS);
  React.useEffect(() => { applyDetailAccent(t.accent); }, [t.accent]);

  // Read which listing to show from the URL (?id=4125), fall back to the rich demo listing.
  const params = new URLSearchParams(window.location.search);
  const wanted = params.get("id") || "4125";
  const p = PROPERTIES.find(x => x.id === wanted) || PROPERTIES.find(x => x.id === "4125") || PROPERTIES[0];

  return (
    <div data-screen-label="03 Property detail" style={{ minHeight: "100vh" }}>
      <ResultsHeader />
      <Breadcrumb p={p} />
      <Gallery p={p} />
      <PageNav p={p} />

      <main className="detail-main" style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "0 24px",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) 360px",
        gap: 56,
        alignItems: "start",
      }}>
        <DetailContent p={p} />
        <Sidebar p={p} />
      </main>

      <SimilarSection current={p} />
      <DetailFooter />

      <TweaksPanel>
        <TweakSection label="Palette" />
        <TweakRadio label="Accent" value={t.accent}
          options={["terracotta", "sage", "navy", "ochre"]}
          onChange={(v) => setTweak('accent', v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<DetailApp />);
