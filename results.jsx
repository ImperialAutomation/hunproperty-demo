// results.jsx — main results view (Grid / List / Map switcher + horizontal cards)

const { useState: useStateR } = React;

const RESULTS_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "terracotta",
  "view": "map",
  "density": "comfy"
}/*EDITMODE-END*/;

const RESULTS_ACCENTS = {
  terracotta: { primary: "oklch(0.58 0.12 45)",  ink: "oklch(0.42 0.10 45)" },
  sage:       { primary: "oklch(0.55 0.08 145)", ink: "oklch(0.40 0.07 145)" },
  navy:       { primary: "oklch(0.48 0.09 250)", ink: "oklch(0.36 0.08 250)" },
  ochre:      { primary: "oklch(0.66 0.12 85)",  ink: "oklch(0.46 0.10 85)" },
};

function applyResultsAccent(name) {
  const a = RESULTS_ACCENTS[name] || RESULTS_ACCENTS.terracotta;
  document.documentElement.style.setProperty("--accent", a.primary);
  document.documentElement.style.setProperty("--accent-ink", a.ink);
}

// ── Toolbar with count / sort / view toggle ─────────────────────────────
function Toolbar({ count, sort, setSort, view, setView, mobileShowMap, setMobileShowMap }) {
  return (
    <div className="results-toolbar" style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "16px 24px",
      borderBottom: "1px solid var(--line)",
      background: "var(--bg)",
      gap: 16,
    }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
        <h1 style={{
          fontFamily: "var(--serif)", fontWeight: 400,
          fontSize: 24, lineHeight: 1, margin: 0, letterSpacing: "-0.01em",
        }}>
          {count} homes found
        </h1>
        <span className="mono">across Hungary</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {/* Sort */}
        <SortMenu sort={sort} setSort={setSort} />
        {/* View toggle (desktop) */}
        <ViewToggle view={view} setView={setView} />
        {/* Map toggle (mobile only — hidden on desktop via CSS) */}
        <button
          className="mobile-map-btn"
          onClick={() => setMobileShowMap(v => !v)}
          title={mobileShowMap ? "Hide map" : "Show map"}
          style={{
            display: "none",
            appearance: "none",
            width: 38, height: 38,
            borderRadius: 8,
            border: "1px solid",
            borderColor: mobileShowMap ? "var(--ink)" : "var(--line-strong)",
            background: mobileShowMap ? "var(--ink)" : "var(--bg)",
            color: mobileShowMap ? "var(--bg)" : "var(--ink)",
            cursor: "pointer",
            alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            transition: "background 0.15s, color 0.15s, border-color 0.15s",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/>
            <line x1="9" y1="4" x2="9" y2="18"/>
            <line x1="15" y1="6" x2="15" y2="20"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

function SortMenu({ sort, setSort }) {
  const [open, setOpen] = useStateR(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  const opts = [
    { id: "newest",     l: "Newest first" },
    { id: "price-asc",  l: "Price · low to high" },
    { id: "price-desc", l: "Price · high to low" },
    { id: "area-desc",  l: "Largest area" },
  ];
  const current = opts.find(o => o.id === sort) || opts[0];
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(v => !v)} style={{
        appearance: "none",
        background: "transparent",
        border: "1px solid var(--line-strong)",
        borderRadius: 8,
        padding: "7px 12px",
        fontSize: 13,
        cursor: "pointer",
        display: "inline-flex", alignItems: "center", gap: 8,
      }}>
        <span className="mono" style={{ color: "var(--muted)" }}>Sort</span>
        <span style={{ fontWeight: 500 }}>{current.l}</span>
        <svg width="10" height="10" viewBox="0 0 12 12" style={{ opacity: 0.5 }}><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", right: 0,
          background: "var(--bg)", border: "1px solid var(--line)",
          borderRadius: 8, padding: 4, minWidth: 200,
          boxShadow: "0 12px 26px rgba(20,30,28,0.10)", zIndex: 30,
        }}>
          {opts.map(o => (
            <div key={o.id}
              onClick={() => { setSort(o.id); setOpen(false); }}
              style={{
                padding: "8px 10px", borderRadius: 6, fontSize: 13.5,
                cursor: "pointer",
                background: o.id === sort ? "var(--surface)" : "transparent",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--surface)"}
              onMouseLeave={e => e.currentTarget.style.background = o.id === sort ? "var(--surface)" : "transparent"}
            >
              {o.l}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ViewToggle({ view, setView }) {
  const views = [
    { id: "grid", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></svg>, l: "Grid" },
    { id: "list", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="4" width="18" height="3" rx="1"/><rect x="3" y="10.5" width="18" height="3" rx="1"/><rect x="3" y="17" width="18" height="3" rx="1"/></svg>, l: "List" },
    { id: "map",  icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><line x1="9" y1="4" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="20"/></svg>, l: "Map" },
  ];
  return (
    <div className="view-toggle" style={{ display: "inline-flex", background: "var(--surface)", borderRadius: 8, padding: 3 }}>
      {views.map(v => {
        const on = view === v.id;
        return (
          <button key={v.id}
            onClick={() => setView(v.id)}
            style={{
              appearance: "none", border: "none",
              background: on ? "var(--bg)" : "transparent",
              color: "var(--ink)",
              padding: "6px 12px",
              borderRadius: 6,
              cursor: "pointer",
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 12.5, fontWeight: 500,
              boxShadow: on ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
            }}>
            {v.icon}{v.l}
          </button>
        );
      })}
    </div>
  );
}

// ── Horizontal card (used in list + map views) ──────────────────────────
// Wire result cards → detail page
function HorizontalCard({ p, compact, hovered, onHover, onClick }) {
  const [fav, setFav] = useStateR(false);
  return (
    <article
      className="horizontal-card"
      onMouseEnter={() => onHover && onHover(p.id)}
      onMouseLeave={() => onHover && onHover(null)}
      onClick={() => { window.location.href = "detail.html"; }}
      style={{
        display: "grid",
        gridTemplateColumns: compact ? "220px 1fr" : "300px 1fr",
        gap: 16,
        background: hovered ? "var(--surface)" : "var(--bg)",
        border: "1px solid",
        borderColor: hovered ? "var(--line-strong)" : "var(--line)",
        borderRadius: "var(--radius-lg)",
        padding: 12,
        cursor: "pointer",
        transition: "background 0.12s, border-color 0.12s",
      }}>
      {/* Image */}
      <div style={{ position: "relative" }}>
        <Swatch
          name={p.swatch}
          label={`PHOTO · ${p.location}`}
          slotId={`prop-${p.id}`}
          height={compact ? 150 : 180}
          rounded={8}
          placeholder={`Drop a photo · ${p.location}`}
          src={p.src}
        />
        <div style={{
          position: "absolute", left: 8, top: 8,
          background: "var(--bg)", color: "var(--ink)",
          fontSize: 11, fontWeight: 500,
          padding: "3px 8px", borderRadius: 999,
        }}>{p.tag}</div>
        <button
          onClick={(e) => { e.stopPropagation(); setFav(v => !v); }}
          style={{
            position: "absolute", right: 8, top: 8,
            width: 28, height: 28,
            background: "var(--bg)", border: "none", borderRadius: 999,
            display: "grid", placeItems: "center", cursor: "pointer",
            color: fav ? "var(--accent)" : "var(--ink)",
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          }}>
          <HeartIconSmall filled={fav} />
        </button>
        <div style={{
          position: "absolute", right: 8, bottom: 8,
          background: "rgba(20,30,28,0.62)", color: "white",
          fontSize: 11, fontFamily: "var(--mono)",
          padding: "3px 7px", borderRadius: 999,
          display: "inline-flex", alignItems: "center", gap: 5,
          backdropFilter: "blur(4px)",
        }}>📷 {p.photoCount}</div>
      </div>

      {/* Info */}
      <div style={{ display: "flex", flexDirection: "column", padding: "4px 4px 4px 0", minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
          <div style={{ fontFamily: "var(--serif)", fontSize: compact ? 24 : 30, lineHeight: 1.05, color: "var(--ink)" }}>
            {fmtPrice(p.price)}
          </div>
          <div className="mono">{p.type}</div>
        </div>
        <div style={{ fontSize: 15, fontWeight: 500, color: "var(--ink)", marginBottom: 2 }}>{p.title}</div>
        <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s-7-7.5-7-12a7 7 0 0 1 14 0c0 4.5-7 12-7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>
          {p.location}
        </div>

        {/* Specs */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 0,
          paddingTop: 10, paddingBottom: 10,
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
          fontSize: 13, color: "var(--ink-2)", marginBottom: 10,
        }}>
          {[
            p.rooms != null && { v: p.rooms, u: "rooms", icon: "🛏" },
            p.baths != null && { v: p.baths, u: "bath", icon: "🛁" },
            p.area  != null && { v: p.area, u: "m² floor", icon: "□" },
            p.plot  != null && { v: p.plot, u: "m² plot",  icon: "▤" },
          ].filter(Boolean).map((s, i, arr) => (
            <span key={i} style={{
              display: "inline-flex", alignItems: "baseline", gap: 4,
              paddingRight: 12, marginRight: 12,
              borderRight: i < arr.length - 1 ? "1px solid var(--line)" : "none",
            }}>
              <span style={{ fontWeight: 600, color: "var(--ink)" }}>{s.v}</span>
              <span style={{ color: "var(--muted)" }}>{s.u}</span>
            </span>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
          <div style={{ fontSize: 12, color: "var(--muted)" }}>via <span style={{ color: "var(--ink-2)", fontWeight: 500 }}>{p.agent}</span></div>
          <div style={{ fontSize: 12, color: "var(--accent-ink)", fontWeight: 500 }}>View details →</div>
        </div>
      </div>
    </article>
  );
}

function HeartIconSmall({ filled }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}

// ── Views ───────────────────────────────────────────────────────────────
function GridView({ properties }) {
  return (
    <div className="grid-view" style={{
      padding: "22px 24px 60px",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: 22, rowGap: 32,
    }}>
      {properties.map(p => <PropertyCard key={p.id} p={p} />)}
    </div>
  );
}

function ListView({ properties }) {
  return (
    <div style={{ padding: "22px 24px 60px", display: "flex", flexDirection: "column", gap: 14 }}>
      {properties.map(p => <HorizontalCard key={p.id} p={p} />)}
    </div>
  );
}

function MapView({ properties, mobileShowMap }) {
  const [hover, setHover] = useStateR(null);
  // Check if we're on mobile (matches CSS breakpoint)
  const isMobile = React.useMemo(() =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches
  , []);
  // On mobile: only mount the map when the user toggles to it.
  // On desktop: always mount both panels.
  const showMap = !isMobile || mobileShowMap;

  return (
    <div>
      <div className={`map-view-grid ${mobileShowMap ? "mobile-show-map" : "mobile-show-list"}`} style={{
        display: "grid",
        gridTemplateColumns: "minmax(440px, 1fr) minmax(0, 1.15fr)",
        height: "calc(100vh - var(--header-h) - var(--filterbar-h) - 65px)",
        minHeight: 640,
      }}>
        {/* List */}
        <div className="map-view-list" style={{
          overflowY: "auto",
          padding: "16px 18px 24px",
          borderRight: "1px solid var(--line)",
          background: "var(--bg)",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {properties.map(p => (
              <HorizontalCard
                key={p.id}
                p={p}
                compact
                hovered={hover === p.id}
                onHover={setHover}
              />
            ))}
          </div>
        </div>
        {/* Map (sticky) — on mobile, only mounted when user selects Map */}
        {showMap && (
          <div className="map-view-map" style={{ position: "sticky", top: "calc(var(--header-h) + var(--filterbar-h) + 65px)", height: "calc(100vh - var(--header-h) - var(--filterbar-h) - 65px)", minHeight: 640 }}>
            <HungaryPropertyMap
              properties={properties}
              hoverId={hover}
              onHover={setHover}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ── App ─────────────────────────────────────────────────────────────────
function ResultsApp() {
  const [t, setTweak] = useTweaks(RESULTS_TWEAK_DEFAULTS);
  const [filterState, setFilterState] = useStateR({
    where: "Anywhere in Hungary",
    mode: "buy",
    type: TYPES[0],
    rooms: ROOMS[0],
    price: PRICES[0],
    priceMin: 0,
    priceMax: 500000,
    area: "Any",
    plot: "Any",
    extras: {},
  });
  const [sort, setSort] = useStateR("newest");
  const [mobileShowMap, setMobileShowMap] = useStateR(false);

  React.useEffect(() => { applyResultsAccent(t.accent); }, [t.accent]);

  // Sort properties
  const sorted = React.useMemo(() => {
    const arr = [...PROPERTIES];
    if (sort === "price-asc")  arr.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") arr.sort((a, b) => b.price - a.price);
    if (sort === "area-desc")  arr.sort((a, b) => (b.area || 0) - (a.area || 0));
    return arr;
  }, [sort]);

  // "147 listings" — show realistic Funda-style count rather than the 8 shown
  const totalCount = 147;

  return (
    <div data-screen-label="02 Search results" style={{ minHeight: "100vh" }}>
      <ResultsHeader />
      <FilterBar state={filterState} setState={setFilterState} />
      <Toolbar count={totalCount} sort={sort} setSort={setSort} view={t.view} setView={(v) => setTweak('view', v)} mobileShowMap={mobileShowMap} setMobileShowMap={setMobileShowMap} />

      {t.view === "grid" && <GridView properties={sorted} />}
      {t.view === "list" && <ListView properties={sorted} />}
      {t.view === "map"  && <MapView  properties={sorted} mobileShowMap={mobileShowMap} />}

      <TweaksPanel>
        <TweakSection label="Palette" />
        <TweakRadio label="Accent" value={t.accent}
          options={["terracotta", "sage", "navy", "ochre"]}
          onChange={(v) => setTweak('accent', v)} />
        <TweakSection label="View" />
        <TweakRadio label="Default" value={t.view}
          options={["grid", "list", "map"]}
          onChange={(v) => setTweak('view', v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ResultsApp />);
