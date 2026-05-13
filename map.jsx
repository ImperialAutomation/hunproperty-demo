// map.jsx — Stylized Hungary map with clickable region zones.
// Simplified outline (geographic, not branded). Region pins use
// approximate positions on a 760×460 viewBox.

const { useState } = React;

// Simplified Hungary outline path — approximate, decorative-functional
const HUNGARY_PATH = `
  M 88 168
  C 110 142, 156 128, 198 124
  C 232 121, 268 116, 304 110
  C 340 104, 378 100, 416 104
  C 452 108, 488 118, 522 132
  C 552 144, 580 154, 610 164
  C 644 175, 678 188, 690 214
  C 700 240, 686 268, 666 292
  C 644 318, 614 336, 580 352
  C 542 370, 498 380, 452 386
  C 408 392, 360 392, 314 386
  C 268 380, 222 368, 184 348
  C 152 332, 124 312, 104 286
  C 86 262, 76 234, 78 210
  C 80 190, 84 178, 88 168
  Z
`;

// Regions with approximate centroid coordinates on 760×460 viewBox
const MAP_REGIONS = [
  { id: "sopron",   name: "Sopron / West",  x: 130, y: 195, count: 224 },
  { id: "danube",   name: "Danube Bend",    x: 348, y: 168, count: 187 },
  { id: "budapest", name: "Budapest",       x: 362, y: 210, count: 1284, primary: true },
  { id: "balaton",  name: "Balaton",        x: 252, y: 252, count: 108, primary: true },
  { id: "pecs",     name: "Pécs / South",   x: 296, y: 322, count: 158 },
  { id: "kecskemet",name: "Great Plain",    x: 432, y: 282, count: 96 },
  { id: "debrecen", name: "Debrecen / East",x: 552, y: 232, count: 142 },
  { id: "tokaj",    name: "Tokaj / NE",     x: 520, y: 168, count: 38 },
];

function HungaryMap({ onPick, selected }) {
  const [hover, setHover] = useState(null);
  const active = hover || selected;
  const activeRegion = MAP_REGIONS.find(r => r.id === active);

  return (
    <div style={{
      position: "relative",
      width: "100%",
      aspectRatio: "760 / 460",
      background: "var(--surface)",
      borderRadius: "var(--radius-lg)",
      border: "1px solid var(--line)",
      overflow: "hidden",
    }}>
      {/* Decorative subtle grid */}
      <svg
        viewBox="0 0 760 460"
        preserveAspectRatio="xMidYMid meet"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--line)" strokeWidth="0.5" opacity="0.45"/>
          </pattern>
          <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
        </defs>
        <rect width="760" height="460" fill="url(#grid)" />

        {/* Country body */}
        <path
          d={HUNGARY_PATH}
          fill="color-mix(in oklch, var(--accent) 6%, var(--bg))"
          stroke="var(--ink)"
          strokeWidth="1.25"
          opacity="0.92"
        />

        {/* Danube hint — single subtle line */}
        <path
          d="M 348 110 C 354 150, 360 180, 366 215 C 372 250, 378 290, 386 330 C 392 360, 398 380, 410 392"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1"
          opacity="0.35"
          strokeDasharray="2 3"
        />
        {/* Balaton lake — single shape */}
        <ellipse
          cx="248"
          cy="252"
          rx="38"
          ry="9"
          transform="rotate(-18 248 252)"
          fill="color-mix(in oklch, var(--accent) 18%, var(--bg))"
          stroke="var(--accent)"
          strokeWidth="0.75"
          opacity="0.85"
        />

        {/* Region pins */}
        {MAP_REGIONS.map(r => {
          const isActive = active === r.id;
          const radius = r.primary ? 7 : 5;
          return (
            <g
              key={r.id}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setHover(r.id)}
              onMouseLeave={() => setHover(null)}
              onClick={() => onPick && onPick(r.id)}
            >
              {/* Hit area */}
              <circle cx={r.x} cy={r.y} r="18" fill="transparent" />
              {/* Halo when active */}
              {isActive && (
                <circle cx={r.x} cy={r.y} r="14"
                  fill="color-mix(in oklch, var(--accent) 35%, transparent)" />
              )}
              <circle cx={r.x} cy={r.y} r={radius}
                fill={isActive ? "var(--accent)" : "var(--ink)"}
                stroke="var(--bg)"
                strokeWidth="2"
              />
              {/* Static label for primary regions */}
              {r.primary && !isActive && (
                <text
                  x={r.x + 12}
                  y={r.y + 4}
                  fontFamily="var(--sans)"
                  fontSize="11"
                  fontWeight="600"
                  fill="var(--ink)"
                >
                  {r.name}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Floating info card for active pin */}
      {activeRegion && (
        <div style={{
          position: "absolute",
          left: 12, top: 12,
          background: "var(--bg)",
          border: "1px solid var(--line)",
          borderRadius: "var(--radius)",
          padding: "10px 12px",
          minWidth: 168,
          boxShadow: "0 6px 18px rgba(20,30,28,0.06)",
          pointerEvents: "none",
        }}>
          <div className="mono" style={{ color: "var(--accent-ink)", marginBottom: 2 }}>Region</div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 20, lineHeight: 1.1, color: "var(--ink)" }}>
            {activeRegion.name}
          </div>
          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
            {activeRegion.count.toLocaleString()} listings
          </div>
        </div>
      )}

      {/* Bottom-right caption */}
      <div style={{
        position: "absolute",
        right: 12, bottom: 10,
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <span className="mono" style={{ color: "var(--muted)" }}>Hungary · 19 megyék</span>
      </div>

      {/* Top-right hint */}
      <div style={{
        position: "absolute",
        right: 12, top: 12,
        background: "var(--bg)",
        border: "1px solid var(--line)",
        borderRadius: 999,
        padding: "5px 11px",
        fontSize: 11,
        color: "var(--muted)",
        display: "flex", alignItems: "center", gap: 6,
      }}>
        <span style={{
          width: 6, height: 6, borderRadius: 999,
          background: "var(--accent)",
        }} />
        Tap a region to filter
      </div>
    </div>
  );
}

Object.assign(window, { HungaryMap, MAP_REGIONS });
