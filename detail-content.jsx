// detail-content.jsx — Left column: specs, features, description, floorplan, location

const { useEffect: useEffectC, useRef: useRefC } = React;

function TitleBlock({ p }) {
  return (
    <div style={{ paddingBottom: 24, borderBottom: "1px solid var(--line)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span className="mono" style={{ color: "var(--accent-ink)", letterSpacing: "0.08em" }}>
          ● Lakeside · Balaton · West shore
        </span>
        <span style={{ width: 1, height: 12, background: "var(--line-strong)" }} />
        <span className="mono" style={{ color: "var(--muted)" }}>{p.tag}</span>
      </div>
      <h1 style={{
        fontFamily: "var(--serif)", fontWeight: 400,
        fontSize: 44, lineHeight: 1.05, letterSpacing: "-0.012em",
        margin: 0, color: "var(--ink)",
      }}>
        {p.title} <em style={{ fontStyle: "italic" }}>with mature garden</em>
      </h1>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, fontSize: 15, color: "var(--ink-2)" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s-7-7.5-7-12a7 7 0 0 1 14 0c0 4.5-7 12-7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>
          Hévízi út 18, {p.location}, 8360 Hungary
      </div>

      {/* Quick stats row */}
      <div className="title-stats-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 0,
        marginTop: 22,
      }}>
        {[
          { v: p.rooms, l: "rooms",     sub: "3 bedrooms" },
          { v: p.baths, l: "bathrooms", sub: "1 ensuite" },
          { v: p.area,  l: "m²",  sub: "Living area" },
          { v: p.plot,  l: "m²",  sub: "Plot surface" },
        ].map((s, i) => (
          <div key={i} style={{
            paddingLeft: i ? 20 : 0,
            paddingRight: i < 3 ? 20 : 0,
            borderRight: i < 3 ? "1px solid var(--line)" : "none",
          }}>
            <div style={{ display: "baseline", display: "flex", alignItems: "baseline", gap: 4 }}>
              <span style={{ fontFamily: "var(--serif)", fontSize: 30, lineHeight: 1, color: "var(--ink)" }}>{s.v}</span>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>{s.l}</span>
            </div>
            <div className="mono" style={{ marginTop: 4 }}>{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Section({ kicker, title, children, anchor }) {
  return (
    <section id={anchor} style={{ padding: "32px 0", borderBottom: "1px solid var(--line)" }}>
      {kicker && <div className="mono" style={{ marginBottom: 8 }}>{kicker}</div>}
      {title && <h2 style={{
        fontFamily: "var(--serif)", fontWeight: 400,
        fontSize: 28, lineHeight: 1.1, margin: "0 0 18px",
        letterSpacing: "-0.01em",
      }}>{title}</h2>}
      {children}
    </section>
  );
}

function Description() {
  return (
    <Section kicker="About this property" title="A west-shore retreat, ten minutes from the water" anchor="about">
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14, fontSize: 15.5, lineHeight: 1.65, color: "var(--ink-2)", maxWidth: 720, textWrap: "pretty" }}>
        <p style={{ margin: 0 }}>
          Set on a sloping 800 m² plot a short walk from the lakeshore promenade, this single-storey
          villa was fully renovated in 2022 with new insulation, triple-glazed windows and a heat pump.
          The L-shaped layout wraps a south-facing terrace under mature linden trees — a quiet spot
          even in high season.
        </p>
        <p style={{ margin: 0 }}>
          Inside, the open kitchen-dining room opens onto the garden through three sets of glass
          doors. Four bedrooms (one en-suite) sit along the eastern wing; the main bathroom has a
          freestanding tub with views over the cherry trees. The cellar and utility room remain
          untouched original brickwork — a nod to the house's 1962 vintage.
        </p>
        <p style={{ margin: 0, color: "var(--muted)" }}>
          A short drive brings you to Hévíz thermal spa (9 km), Keszthely centre (3 km), and the
          ferry to Tihany. Suitable as a permanent residence, second home, or licensed short-stay
          rental.
        </p>
      </div>
    </Section>
  );
}

function FeatureTable() {
  const groups = [
    {
      title: "Property",
      rows: [
        ["Type", "Detached villa"],
        ["Year built", "1962, fully renovated 2022"],
        ["Condition", "Renovated"],
        ["Floors", "Single-storey + cellar"],
        ["Orientation", "South-facing terrace"],
      ],
    },
    {
      title: "Layout",
      rows: [
        ["Rooms",         "4 (3 bedrooms + study)"],
        ["Bathrooms",     "2 (1 en-suite)"],
        ["Living area",   "180 m²"],
        ["Plot surface",  "800 m²"],
        ["Cellar",        "Yes, 28 m²"],
      ],
    },
    {
      title: "Comfort",
      rows: [
        ["Heating",      "Heat pump + underfloor"],
        ["Energy label", "B (after renovation)"],
        ["Cooling",      "Reversible heat pump"],
        ["Windows",      "Triple-glazed, 2022"],
        ["Internet",     "Fibre, 1 Gbps"],
      ],
    },
    {
      title: "Outdoor",
      rows: [
        ["Garden",   "Mature, fenced, 720 m²"],
        ["Garage",   "Single + carport"],
        ["Pool",     "No (space available)"],
        ["Terrace",  "42 m² covered"],
        ["Parking",  "2 cars on plot"],
      ],
    },
  ];
  return (
    <Section kicker="Features" title="What's included" anchor="features">
      <div className="feature-table-grid" style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "24px 40px",
      }}>
        {groups.map(g => (
          <div key={g.title}>
            <div className="mono" style={{ color: "var(--accent-ink)", marginBottom: 10 }}>{g.title}</div>
            <dl style={{ margin: 0, display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: 8 }}>
              {g.rows.map(([k, v]) => (
                <React.Fragment key={k}>
                  <dt style={{ fontSize: 13.5, color: "var(--muted)", padding: "6px 0", borderTop: "1px solid var(--line)" }}>{k}</dt>
                  <dd style={{ margin: 0, fontSize: 13.5, fontWeight: 500, color: "var(--ink)", padding: "6px 0", borderTop: "1px solid var(--line)", textAlign: "right" }}>{v}</dd>
                </React.Fragment>
              ))}
            </dl>
          </div>
        ))}
      </div>

      {/* Amenity chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 28 }}>
        {[
          ["Renovated 2022", true],
          ["Heat pump", true],
          ["Fibre internet", true],
          ["South-facing garden", true],
          ["Garage", true],
          ["Cellar", true],
          ["Walk to lake", true],
          ["Swimming pool", false],
          ["Elevator", false],
        ].map(([l, on]) => (
          <span key={l} style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "5px 11px",
            fontSize: 12.5,
            borderRadius: 999,
            background: on ? "var(--surface)" : "transparent",
            border: "1px solid",
            borderColor: on ? "var(--line-strong)" : "var(--line)",
            color: on ? "var(--ink)" : "var(--muted-2)",
            textDecoration: on ? "none" : "line-through",
          }}>
            {on ? "✓" : "—"} {l}
          </span>
        ))}
      </div>
    </Section>
  );
}

function Floorplan() {
  return (
    <Section kicker="Floorplan" title="Single storey, 180 m²" anchor="floorplan">
      <div style={{
        background: "var(--surface)",
        border: "1px solid var(--line)",
        borderRadius: "var(--radius-lg)",
        padding: 18,
      }}>
        <FloorplanSVG />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, fontSize: 13, color: "var(--muted)" }}>
          <div className="mono">Sheet 1 of 1 · 1:100</div>
          <a style={{ color: "var(--accent-ink)", fontWeight: 500, cursor: "pointer" }}>Download PDF ↓</a>
        </div>
      </div>
    </Section>
  );
}

// Minimal architectural floorplan drawn in SVG — illustrative, not exact.
function FloorplanSVG() {
  return (
    <svg viewBox="0 0 720 380" style={{ width: "100%", height: "auto", display: "block" }}>
      {/* outer wall */}
      <rect x="40" y="40" width="640" height="300" fill="var(--bg)" stroke="var(--ink)" strokeWidth="3" />
      {/* internal walls */}
      <g stroke="var(--ink)" strokeWidth="1.4" fill="none">
        <line x1="40"  y1="180" x2="320" y2="180" />
        <line x1="320" y1="40"  x2="320" y2="340" />
        <line x1="320" y1="180" x2="500" y2="180" />
        <line x1="500" y1="40"  x2="500" y2="340" />
        <line x1="500" y1="120" x2="680" y2="120" />
        <line x1="500" y1="240" x2="680" y2="240" />
        {/* doors / openings */}
        <line x1="200" y1="180" x2="240" y2="180" stroke="var(--bg)" strokeWidth="3" />
        <line x1="320" y1="100" x2="320" y2="140" stroke="var(--bg)" strokeWidth="3" />
        <line x1="320" y1="230" x2="320" y2="270" stroke="var(--bg)" strokeWidth="3" />
        <line x1="500" y1="80"  x2="500" y2="120" stroke="var(--bg)" strokeWidth="3" />
        <line x1="500" y1="180" x2="500" y2="220" stroke="var(--bg)" strokeWidth="3" />
        <line x1="500" y1="280" x2="500" y2="320" stroke="var(--bg)" strokeWidth="3" />
      </g>

      {/* Room labels */}
      {[
        ["Living + dining", 180, 110, true],
        ["Kitchen",         180, 260, false],
        ["Hallway",         410, 110, false],
        ["Bath",            410, 220, false],
        ["Bedroom 1",       590, 80,  false],
        ["Bedroom 2",       590, 180, false],
        ["Bedroom 3",       590, 290, false],
      ].map(([l, x, y, big]) => (
        <text key={l} x={x} y={y} textAnchor="middle"
          fontFamily="var(--mono)" fontSize={big ? 13 : 11}
          letterSpacing="0.06em"
          fill="var(--ink)"
          style={{ textTransform: "uppercase" }}
        >{l}</text>
      ))}

      {/* Sizes */}
      {[
        ["38 m²", 180, 130],
        ["18 m²", 180, 280],
        ["12 m²", 410, 235],
        ["16 m²", 590, 100],
        ["14 m²", 590, 200],
        ["13 m²", 590, 310],
      ].map(([l, x, y]) => (
        <text key={`${x}-${y}`} x={x} y={y} textAnchor="middle"
          fontFamily="var(--sans)" fontSize="11" fill="var(--muted)">{l}</text>
      ))}

      {/* North arrow */}
      <g transform="translate(60 60)">
        <circle r="14" fill="none" stroke="var(--ink)" strokeWidth="1" />
        <path d="M 0 -10 L 5 4 L 0 0 L -5 4 Z" fill="var(--ink)" />
        <text y="22" textAnchor="middle" fontFamily="var(--mono)" fontSize="9" fill="var(--ink-2)">N</text>
      </g>

      {/* Terrace outline */}
      <g stroke="var(--ink-2)" strokeWidth="1" strokeDasharray="3 4" fill="none">
        <rect x="40" y="340" width="460" height="32" />
        <text x="270" y="362" textAnchor="middle" fontFamily="var(--mono)" fontSize="10" fill="var(--muted)" letterSpacing="0.08em">TERRACE · 42 M²</text>
      </g>
    </svg>
  );
}

// Small location map using Leaflet at the property's lat/lng
function LocationMap() {
  const ref = useRefC(null);
  useEffectC(() => {
    if (!ref.current) return;
    const map = L.map(ref.current, {
      zoomControl: true,
      scrollWheelZoom: false,
      attributionControl: true,
    }).setView([46.7686, 17.2444], 13);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      subdomains: "abcd",
    }).addTo(map);

    const icon = L.divIcon({
      className: "",
      html: `<div style="
        background: var(--accent);
        color: white;
        border: 3px solid var(--bg);
        width: 22px; height: 22px;
        border-radius: 999px;
        transform: translate(-50%, -50%);
        box-shadow: 0 4px 14px rgba(20,30,28,0.25);
      "></div>`,
      iconSize: null,
    });
    L.marker([46.7686, 17.2444], { icon }).addTo(map);

    // Approximate area circle (privacy — exact address shown after contact)
    L.circle([46.7686, 17.2444], {
      radius: 350,
      color: "var(--accent)",
      weight: 1,
      fillColor: "var(--accent)",
      fillOpacity: 0.10,
      dashArray: "4 4",
    }).addTo(map);

    return () => map.remove();
  }, []);
  return (
    <Section kicker="Location" title="Keszthely, Balaton — west shore" anchor="location">
      <div style={{
        position: "relative",
        width: "100%",
        height: 360,
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        border: "1px solid var(--line)",
      }}>
        <div ref={ref} style={{ position: "absolute", inset: 0 }} />
      </div>

      {/* Nearby */}
      <div className="nearby-grid" style={{
        marginTop: 16,
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 12,
      }}>
        {[
          ["Lakeshore",   "1.2 km", "🌊"],
          ["Keszthely",   "3 km",   "○"],
          ["Hévíz spa",   "9 km",   "♨"],
          ["Sármellék airport", "16 km", "✈"],
        ].map(([place, dist, sym]) => (
          <div key={place} style={{
            border: "1px solid var(--line)",
            borderRadius: "var(--radius)",
            padding: "10px 14px",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <span style={{ fontSize: 18, color: "var(--accent-ink)" }}>{sym}</span>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 500 }}>{place}</div>
              <div className="mono">{dist}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function DetailContent({ p }) {
  return (
    <div>
      <TitleBlock p={p} />
      <Description />
      <FeatureTable />
      <Floorplan />
      <LocationMap />
    </div>
  );
}

Object.assign(window, { DetailContent });
