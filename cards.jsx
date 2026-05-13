// cards.jsx — Property card swatches (placeholders) + PropertyCard + RegionCard

// Striped placeholder swatches — different hues for variety, no real images yet.
// These are intentionally placeholders. The user will swap in real photos.
const SWATCH_DEFS = {
  "swatch-1": { hue: 195, l: 0.62 }, // Balaton lake teal
  "swatch-2": { hue: 35,  l: 0.66 }, // Budapest amber
  "swatch-3": { hue: 95,  l: 0.65 }, // Farm green
  "swatch-4": { hue: 245, l: 0.62 }, // Siófok blue
  "swatch-5": { hue: 18,  l: 0.65 }, // Hévíz warm
  "swatch-6": { hue: 130, l: 0.62 }, // Plot mossy
  "swatch-7": { hue: 320, l: 0.62 }, // Pécs mauve
  "swatch-8": { hue: 55,  l: 0.68 }, // Sopron honey
};

// Fillable image slot — user drags a photo onto it, the drop persists.
// Falls back to a tinted swatch placeholder until an image is dropped.
// When `src` is given, it pre-fills the slot with that image; user can
// still drop a new one to override.
function Swatch({ name, label, slotId, height = 200, rounded = "var(--radius-lg)", placeholder = "Drop a photo", src = null }) {
  const def = SWATCH_DEFS[name] || SWATCH_DEFS["swatch-1"];
  const a = `oklch(${def.l} 0.06 ${def.hue})`;
  const b = `oklch(${def.l - 0.07} 0.08 ${def.hue + 8})`;
  const radius = rounded === "var(--radius-lg)" ? 10 : (typeof rounded === "number" ? rounded : 10);
  const hasImg = !!src;
  return (
    <div style={{
      position: "relative",
      width: "100%",
      height,
      borderRadius: rounded,
      overflow: "hidden",
      background: hasImg ? "var(--surface)" : `linear-gradient(135deg, ${a}, ${b})`,
    }}>
      {!hasImg && (
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0 14px, rgba(0,0,0,0.04) 14px 28px)`,
          pointerEvents: "none",
        }} />
      )}
      <image-slot
        id={slotId}
        shape="rounded"
        radius={String(radius)}
        placeholder={placeholder}
        src={src || undefined}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
      {/* Caption hidden when a real image is showing — keeps photos clean */}
      {!hasImg && (
        <div style={{
          position: "absolute",
          left: 10, bottom: 8,
          fontFamily: "var(--mono)",
          fontSize: 10,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.85)",
          background: "rgba(0,0,0,0.22)",
          padding: "3px 7px",
          borderRadius: 4,
          backdropFilter: "blur(2px)",
          pointerEvents: "none",
          zIndex: 1,
        }}>
          {label}
        </div>
      )}
    </div>
  );
}

function HeartIcon({ filled }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  );
}

function PropertyCard({ p }) {
  const [fav, setFav] = React.useState(false);
  return (
    <article
      onClick={() => { window.location.href = "detail.html"; }}
      style={{
      display: "flex",
      flexDirection: "column",
      background: "transparent",
      cursor: "pointer",
    }}>
      {/* Image */}
      <div style={{ position: "relative" }}>
        <Swatch
          name={p.swatch}
          label={`PHOTO · ${p.location}`}
          slotId={`prop-${p.id}`}
          height={210}
          rounded="var(--radius-lg)"
          placeholder={`Drop a photo · ${p.location}`}
          src={p.src}
        />
        {/* Top-left tag */}
        <div style={{
          position: "absolute", left: 10, top: 10,
          background: "var(--bg)",
          color: "var(--ink)",
          fontSize: 11,
          fontWeight: 500,
          padding: "4px 9px",
          borderRadius: 999,
        }}>
          {p.tag}
        </div>
        {/* Top-right heart */}
        <button
          onClick={(e) => { e.stopPropagation(); setFav(v => !v); }}
          style={{
            position: "absolute", right: 10, top: 10,
            width: 32, height: 32,
            background: "var(--bg)",
            border: "none",
            borderRadius: 999,
            display: "grid", placeItems: "center",
            cursor: "pointer",
            color: fav ? "var(--accent)" : "var(--ink)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}>
          <HeartIcon filled={fav} />
        </button>
        {/* Bottom-right photo count */}
        <div style={{
          position: "absolute", right: 10, bottom: 10,
          background: "rgba(20,30,28,0.62)",
          color: "white",
          fontSize: 11,
          fontFamily: "var(--mono)",
          padding: "4px 8px",
          borderRadius: 999,
          display: "inline-flex", alignItems: "center", gap: 5,
          backdropFilter: "blur(4px)",
        }}>
          <CameraIcon /> {p.photoCount}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "12px 2px 0", display: "flex", flexDirection: "column", gap: 4 }}>
        {/* Price + agent on one line */}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
          <div style={{
            fontFamily: "var(--serif)",
            fontSize: 24,
            lineHeight: 1.1,
            color: "var(--ink)",
          }}>
            {fmtPrice(p.price)}
          </div>
          <div style={{ fontSize: 11, color: "var(--muted)" }}>{p.agent}</div>
        </div>

        {/* Title + location */}
        <div style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)" }}>
          {p.title}
        </div>
        <div style={{ fontSize: 13, color: "var(--muted)" }}>
          {p.location}
        </div>

        {/* Specs */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 0,
          marginTop: 8,
          paddingTop: 10,
          borderTop: "1px solid var(--line)",
          fontSize: 12.5,
          color: "var(--ink-2)",
        }}>
          {[
            p.rooms != null && { v: p.rooms, u: "rooms" },
            p.baths != null && { v: p.baths, u: "bath" },
            p.area != null && { v: `${p.area}`, u: "m²" },
            p.plot != null && { v: `${p.plot}`, u: "m² plot" },
          ].filter(Boolean).map((s, i, arr) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "baseline", gap: 4, paddingRight: 10, marginRight: 10, borderRight: i < arr.length - 1 ? "1px solid var(--line)" : "none" }}>
              <span style={{ fontWeight: 600, color: "var(--ink)" }}>{s.v}</span>
              <span style={{ color: "var(--muted)" }}>{s.u}</span>
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function RegionCard({ r }) {
  return (
    <a style={{
      position: "relative",
      display: "block",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      cursor: "pointer",
      transition: "transform 0.18s",
    }}
    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
    onMouseLeave={e => e.currentTarget.style.transform = "none"}
    >
      <Swatch
        name={r.swatch}
        label={`PHOTO · ${r.name}`}
        slotId={`region-${r.id}`}
        height={170}
        placeholder={`Drop a photo · ${r.name}`}
      />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(20,30,28,0.55) 0%, rgba(20,30,28,0.05) 55%, transparent 100%)",
      }} />
      <div style={{
        position: "absolute", left: 14, right: 14, bottom: 12,
        color: "white",
        display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 8,
      }}>
        <div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 24, lineHeight: 1, marginBottom: 4 }}>{r.name}</div>
          <div style={{ fontSize: 12, opacity: 0.86 }}>{r.blurb}</div>
        </div>
        <div style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          padding: "4px 8px",
          background: "rgba(255,255,255,0.15)",
          border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: 999,
          backdropFilter: "blur(4px)",
          whiteSpace: "nowrap",
        }}>
          {r.count} ↗
        </div>
      </div>
    </a>
  );
}

Object.assign(window, { PropertyCard, RegionCard, Swatch });
