// results-map.jsx — split-screen map with pins for each property.
// Approximate coordinates on a 760×500 viewBox covering Hungary.

const { useState: useStateM } = React;

// Property positions on the Hungary viewBox (760×500)
const PROPERTY_COORDS = {
  "kesz-villa":     { x: 220, y: 268, region: "Balaton" },     // Keszthely (west end of Balaton)
  "bp-d5-apt":      { x: 362, y: 218, region: "Budapest" },    // Budapest District V
  "somogy-farm":    { x: 268, y: 308, region: "South" },       // Somogy megye
  "siofok-new":     { x: 286, y: 254, region: "Balaton" },     // Siófok (east shore)
  "heviz-holiday":  { x: 228, y: 262, region: "Balaton" },     // Hévíz
  "badacsony-plot": { x: 252, y: 258, region: "Balaton" },     // Badacsony
  "pecs-town":      { x: 304, y: 336, region: "South" },       // Pécs
  "sopron-apt":     { x: 134, y: 204, region: "West" },        // Sopron
};

const HUN_PATH = `
  M 88 178 C 110 152, 156 138, 198 134
  C 232 131, 268 126, 304 120
  C 340 114, 378 110, 416 114
  C 452 118, 488 128, 522 142
  C 552 154, 580 164, 610 174
  C 644 185, 678 198, 690 224
  C 700 250, 686 278, 666 302
  C 644 328, 614 346, 580 362
  C 542 380, 498 390, 452 396
  C 408 402, 360 402, 314 396
  C 268 390, 222 378, 184 358
  C 152 342, 124 322, 104 296
  C 86 272, 76 244, 78 220
  C 80 200, 84 188, 88 178 Z
`;

// Project lat/lng → viewBox coordinates. Linear fit calibrated against the
// previous hand-placed coords (Keszthely, Budapest, Pécs, Sopron).
function project(lat, lng) {
  return { x: 78.5 * lng - 1133, y: -68.5 * lat + 3472 };
}

// Cheap deterministic 0..1 hash so overlapping pins (Hévíz, Keszthely all
// sit on top of each other) can be jittered apart without losing per-id
// stability. Two hashes give us independent x/y offsets.
function hash01(s, salt) {
  let h = 2166136261 ^ salt;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 10000) / 10000;
}

function ResultsMap({ properties, hoverId, selectedId, onPick, onHover }) {
  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%",
      background: "var(--surface)",
      overflow: "hidden",
    }}>
      <svg
        viewBox="0 0 760 500"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--line)" strokeWidth="0.5" opacity="0.5"/>
          </pattern>
        </defs>
        <rect width="760" height="500" fill="url(#grid2)" />

        {/* Country body */}
        <path d={HUN_PATH}
          fill="color-mix(in oklch, var(--accent) 5%, var(--bg))"
          stroke="var(--ink)"
          strokeWidth="1.25"
          opacity="0.94"
        />

        {/* Danube */}
        <path d="M 348 120 C 354 160, 360 190, 366 225 C 372 260, 378 300, 386 340 C 392 370, 398 390, 410 402"
          fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.4" strokeDasharray="2 3" />

        {/* Balaton lake */}
        <ellipse cx="254" cy="262" rx="40" ry="9" transform="rotate(-18 254 262)"
          fill="color-mix(in oklch, var(--accent) 22%, var(--bg))"
          stroke="var(--accent)" strokeWidth="0.75" opacity="0.85" />

        {/* Region labels (subtle) */}
        {[
          ["Budapest", 388, 222],
          ["Balaton",  254, 246],
          ["Pécs",     316, 348],
          ["Sopron",   158, 204],
          ["Debrecen", 552, 240],
        ].map(([t, x, y]) => (
          <text key={t} x={x} y={y} fontFamily="var(--mono)" fontSize="9.5"
            fill="var(--muted)" letterSpacing="0.06em">{t.toUpperCase()}</text>
        ))}

        {/* Property pins as price tags */}
        {properties.map(p => {
          // Use real lat/lng if present, otherwise fall back to the
          // legacy hand-placed coords lookup (briefing fixture data).
          let cx, cy;
          if (p.lat != null && p.lng != null) {
            const proj = project(p.lat, p.lng);
            // Jitter so dozens of Hévíz/Keszthely listings don't sit on
            // exactly the same pixel. ±18px in each axis spreads them
            // around the city centroid.
            cx = proj.x + (hash01(p.id, 0) - 0.5) * 36;
            cy = proj.y + (hash01(p.id, 1) - 0.5) * 36;
          } else {
            const c = PROPERTY_COORDS[p.id];
            if (!c) return null;
            cx = c.x; cy = c.y;
          }
          const isHover = hoverId === p.id;
          const isSel = selectedId === p.id;
          const active = isHover || isSel;
          const label = `€${(p.price/1000).toFixed(0)}k`;
          const w = label.length * 7.5 + 12;
          return (
            <g key={p.id}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => onHover && onHover(p.id)}
              onMouseLeave={() => onHover && onHover(null)}
              onClick={() => onPick && onPick(p.id)}
            >
              <rect
                x={cx - w/2}
                y={cy - 12}
                width={w}
                height={22}
                rx={11}
                fill={active ? "var(--ink)" : "var(--bg)"}
                stroke={active ? "var(--ink)" : "var(--line-strong)"}
                strokeWidth="1"
                style={{ filter: active ? "drop-shadow(0 4px 10px rgba(20,30,28,0.20))" : "drop-shadow(0 1px 2px rgba(20,30,28,0.10))" }}
              />
              <text
                x={cx}
                y={cy + 3}
                textAnchor="middle"
                fontFamily="var(--sans)"
                fontSize="11"
                fontWeight="600"
                fill={active ? "var(--bg)" : "var(--ink)"}
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating controls */}
      <div style={{
        position: "absolute",
        right: 12, top: 12,
        display: "flex", flexDirection: "column",
        gap: 6,
      }}>
        <MapBtn>＋</MapBtn>
        <MapBtn>−</MapBtn>
      </div>
      <div style={{
        position: "absolute",
        left: 12, top: 12,
        display: "flex",
        background: "var(--bg)",
        border: "1px solid var(--line)",
        borderRadius: 999,
        padding: 3,
      }}>
        {["Map", "Satellite"].map((t, i) => (
          <span key={t} style={{
            padding: "4px 12px",
            fontSize: 11,
            fontWeight: 500,
            borderRadius: 999,
            background: i === 0 ? "var(--ink)" : "transparent",
            color: i === 0 ? "var(--bg)" : "var(--muted)",
            cursor: "pointer",
          }}>{t}</span>
        ))}
      </div>
      <div style={{
        position: "absolute",
        left: 12, bottom: 12,
        background: "var(--bg)",
        border: "1px solid var(--line)",
        borderRadius: 6,
        padding: "6px 10px",
        display: "flex", alignItems: "center", gap: 8,
        fontSize: 11, color: "var(--muted)",
      }}>
        <span style={{ width: 30, height: 2, background: "var(--ink)" }} />
        <span className="mono">50 km</span>
      </div>
    </div>
  );
}

function MapBtn({ children }) {
  return (
    <button style={{
      width: 32, height: 32,
      background: "var(--bg)",
      border: "1px solid var(--line)",
      borderRadius: 8,
      fontSize: 16,
      cursor: "pointer",
      display: "grid", placeItems: "center",
      color: "var(--ink)",
      boxShadow: "0 2px 6px rgba(20,30,28,0.06)",
    }}>{children}</button>
  );
}

Object.assign(window, { ResultsMap, PROPERTY_COORDS });
