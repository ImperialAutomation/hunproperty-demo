// detail-gallery.jsx — Hero photo grid: 1 big + 4 thumbs (Airbnb-style)
// + view-all button, "12 photos" badge, lightbox toggle.

const { useState: useStateG } = React;

// Detail images are named "detail-<code>-<room>.jpg" — we look them up
// optimistically. If a file's missing the slot falls back to its tinted
// swatch placeholder, which is fine for most listings (only listing 4125
// has the full eight-room photo set in the demo data).
const DETAIL_ROOMS = [
  { suffix: "exterior", label: "EXTERIOR · main shot" },
  { suffix: "view",     label: "VIEW · panorama" },
  { suffix: "kitchen",  label: "KITCHEN" },
  { suffix: "bedroom",  label: "BEDROOM" },
  { suffix: "interior1", label: "LIVING" },
  { suffix: "interior2", label: "LIVING · 2" },
  { suffix: "bathroom", label: "BATHROOM" },
  { suffix: "pool",     label: "POOL" },
];

function detailImg(p, suffix) {
  // Convention from the scraped image folder
  return `uploads/scraped-properties/images/detail-${p.id}-${suffix}.jpg`;
}

function Gallery({ p }) {
  const [lightbox, setLightbox] = useStateG(false);

  // Try to assemble 5 distinct shots for this listing:
  //   - hero: detail-exterior  (or fall back to p.src)
  //   - 4 thumbs: rotate through the rest of DETAIL_ROOMS
  // Listings without detail photos still render — they show the swatch placeholders.
  const heroSrc = p.src || detailImg(p, "exterior");
  const thumbs = [
    { suffix: "view",     swatch: "swatch-3", label: "LIVING · with view" },
    { suffix: "kitchen",  swatch: "swatch-5", label: "KITCHEN" },
    { suffix: "bedroom",  swatch: "swatch-1", label: "BEDROOM" },
    { suffix: "bathroom", swatch: "swatch-7", label: "GARDEN" },
  ];

  return (
    <section style={{ padding: "20px 24px 0" }}>
      <div style={{
        maxWidth: 1280,
        margin: "0 auto",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gridTemplateRows: "260px 260px",
          gap: 8,
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
        }}>
          {/* Hero — spans 2 rows */}
          <div style={{ gridRow: "1 / 3", position: "relative", minHeight: 0 }}>
            <Swatch
              name={p.swatch}
              label="EXTERIOR · main shot"
              slotId={`${p.id}-hero`}
              height="100%"
              rounded={0}
              placeholder="Drop the main exterior shot"
              src={heroSrc}
            />
            <button onClick={() => setLightbox(true)} style={{
              position: "absolute", left: 14, bottom: 14,
              background: "var(--bg)", color: "var(--ink)",
              border: "1px solid var(--line-strong)",
              borderRadius: 999, padding: "8px 14px",
              fontSize: 13, fontWeight: 500,
              display: "inline-flex", alignItems: "center", gap: 8,
              cursor: "pointer",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
              </svg>
              See all {p.photoCount} photos
            </button>
          </div>
          {thumbs.map((s, i) => (
            <div key={i} style={{ position: "relative", minHeight: 0 }}>
              <Swatch
                name={s.swatch}
                label={s.label}
                slotId={`${p.id}-${i+2}`}
                height="100%"
                rounded={0}
                placeholder={`Drop · ${s.label.toLowerCase()}`}
                src={detailImg(p, s.suffix)}
              />
            </div>
          ))}
        </div>

        {/* Below-gallery utility row */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "14px 4px 0", gap: 16,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 13, color: "var(--muted)" }}>
            <span className="mono" style={{ color: "var(--accent-ink)" }}>Ref · OTT-{p.id.toUpperCase().slice(0, 6)}</span>
            <span style={{ width: 1, height: 14, background: "var(--line-strong)" }} />
            <span>Listed 3 days ago</span>
            <span style={{ width: 1, height: 14, background: "var(--line-strong)" }} />
            <span>Updated today</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <UtilBtn icon={<HeartGlyph />}>Save</UtilBtn>
            <UtilBtn icon={<ShareGlyph />}>Share</UtilBtn>
            <UtilBtn icon={<PrintGlyph />}>Print</UtilBtn>
          </div>
        </div>
      </div>

      {lightbox && <Lightbox onClose={() => setLightbox(false)} photoCount={p.photoCount} />}
    </section>
  );
}

function UtilBtn({ icon, children }) {
  return (
    <button style={{
      appearance: "none", background: "transparent",
      border: "1px solid var(--line-strong)",
      borderRadius: 999,
      padding: "6px 12px",
      fontSize: 13,
      display: "inline-flex", alignItems: "center", gap: 6,
      cursor: "pointer",
      color: "var(--ink-2)",
    }}>
      {icon} {children}
    </button>
  );
}

function HeartGlyph()  { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>; }
function ShareGlyph()  { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>; }
function PrintGlyph()  { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>; }

function Lightbox({ onClose, photoCount }) {
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0,
      background: "rgba(20,30,28,0.86)",
      zIndex: 1000,
      display: "grid",
      placeItems: "center",
      backdropFilter: "blur(4px)",
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: "var(--bg)",
        padding: 16,
        borderRadius: 14,
        maxWidth: 880,
        width: "94vw",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div className="mono">Photo 1 of {photoCount}</div>
          <button onClick={onClose} style={{
            appearance: "none", background: "transparent", border: "none",
            cursor: "pointer", fontSize: 22, color: "var(--ink)", padding: 4,
          }}>×</button>
        </div>
        <Swatch name="swatch-1" label="LIGHTBOX · main photo" height={500} rounded={8} slotId="lightbox-1" placeholder="Drop main exterior shot" />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontSize: 13, color: "var(--muted)" }}>
          <span>← Previous</span>
          <span>Use ← → to navigate</span>
          <span>Next →</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Gallery });
