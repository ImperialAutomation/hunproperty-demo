// app.jsx — Otthon homepage (v2)
// White, simple, sexy. Houses are emotion.
// Layout: compact search banner → featured (magazine) + over ons →
//         three Collections (Essential / Signature / Prestige) → footer.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "brandName": "Otia",
  "accent": "terracotta",
  "featuredLayout": "magazine",
  "showRegions": false,
  "language": "EN"
}/*EDITMODE-END*/;

const ACCENTS = {
  terracotta: { primary: "oklch(0.58 0.12 45)",  ink: "oklch(0.42 0.10 45)" },
  sage:       { primary: "oklch(0.55 0.08 145)", ink: "oklch(0.40 0.07 145)" },
  navy:       { primary: "oklch(0.48 0.09 250)", ink: "oklch(0.36 0.08 250)" },
  ochre:      { primary: "oklch(0.66 0.12 85)",  ink: "oklch(0.46 0.10 85)" },
};

const BRAND_NAMES = ["Otia", "Otthon", "Páva", "Lakhely", "Magyaria"];

function applyAccent(name) {
  const a = ACCENTS[name] || ACCENTS.terracotta;
  document.documentElement.style.setProperty("--accent", a.primary);
  document.documentElement.style.setProperty("--accent-ink", a.ink);
}

/* ============================================================
   HEADER — slim, white, brand left / nav right
   ============================================================ */
function Header({ brand }) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
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
        <a style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <img src="uploads/logo-otia.svg" alt="Otia" style={{
            width: 30, height: 30,
          }}/>
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

        <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 14 }}>
          <a style={{ color: "var(--ink-2)", cursor: "pointer" }}>Buy</a>
          <a style={{ color: "var(--ink-2)", cursor: "pointer" }}>Rent</a>
          <a style={{ color: "var(--ink-2)", cursor: "pointer" }}>New Build</a>
          <a style={{ color: "var(--ink-2)", cursor: "pointer" }}>Inspiration</a>
          <LangPicker />
          <a href="dashboard.html" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            color: "white",
            background: "var(--accent)",
            border: "none",
            padding: "8px 16px",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}>
            List your property
            <svg width="11" height="11" viewBox="0 0 12 12"><path d="M3 2l5 4-5 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
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
        <a style={{ color: "var(--ink)", cursor: "pointer", fontWeight: 500 }} onClick={() => setDrawerOpen(false)}>Buy</a>
        <a style={{ color: "var(--ink)", cursor: "pointer", fontWeight: 500 }} onClick={() => setDrawerOpen(false)}>Rent</a>
        <a style={{ color: "var(--ink)", cursor: "pointer", fontWeight: 500 }} onClick={() => setDrawerOpen(false)}>New Build</a>
        <a style={{ color: "var(--ink)", cursor: "pointer", fontWeight: 500 }} onClick={() => setDrawerOpen(false)}>Inspiration</a>
        <div style={{ padding: "12px 0", borderBottom: "1px solid var(--line)" }}>
          <LangPicker />
        </div>
        <a href="dashboard.html" style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
          color: "white", background: "var(--accent)",
          padding: "12px 16px", borderRadius: 999,
          fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 8,
        }}>
          List your property
        </a>
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
        appearance: "none", border: "none", background: "transparent",
        display: "inline-flex", alignItems: "center", gap: 6,
        fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.06em",
        color: "var(--ink)", cursor: "pointer", padding: "4px 6px",
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
          boxShadow: "0 12px 26px rgba(20,30,28,0.10)", zIndex: 60,
        }}>
          {langs.map(l => (
            <div key={l.id}
              onClick={() => { setLang(l.id); setOpen(false); }}
              style={{
                padding: "7px 10px", borderRadius: 6, fontSize: 13,
                cursor: "pointer", display: "flex", alignItems: "baseline",
                justifyContent: "space-between", gap: 10,
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

/* ============================================================
   HERO CAROUSEL — full-width mood images with floating search bar
   ============================================================ */
const HERO_SLIDES = [
  { src: "uploads/hero/budapest-parliament.jpg", alt: "Budapest Parliament at sunrise over the Danube" },
  { src: "uploads/hero/balaton-boat.jpg",        alt: "Boat on Lake Balaton at golden hour" },
  { src: "uploads/hero/hungarian-hills.jpg",     alt: "Rolling hills of the Hungarian countryside" },
  { src: "uploads/hero/green-waterfront.jpg",    alt: "Green trees along Hungarian waterfront" },
];

function HeroCarousel() {
  const [current, setCurrent] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const timerRef = React.useRef(null);

  const goTo = React.useCallback((idx) => {
    setCurrent((idx + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  React.useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => goTo(current + 1), 6000);
    return () => clearInterval(timerRef.current);
  }, [current, paused, goTo]);

  return (
    <section
      className="hero-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: "relative",
        width: "100%",
        height: 540,
        overflow: "hidden",
        background: "var(--ink)",
      }}
    >
      {/* Slides */}
      {HERO_SLIDES.map((slide, i) => (
        <div key={i} style={{
          position: "absolute", inset: 0,
          opacity: i === current ? 1 : 0,
          transition: "opacity 1s ease-in-out",
          willChange: "opacity",
        }}>
          <img
            src={slide.src}
            alt={slide.alt}
            style={{
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center",
              display: "block",
            }}
          />
        </div>
      ))}

      {/* Dark overlay for text readability */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(20,30,28,0.25) 0%, rgba(20,30,28,0.50) 100%)",
        pointerEvents: "none",
      }}/>

      {/* Content overlay */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "0 32px",
        zIndex: 2,
      }}>
        <div className="mono" style={{
          color: "rgba(255,255,255,0.80)",
          marginBottom: 14,
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{
            display: "inline-block", width: 6, height: 6, borderRadius: 999,
            background: "var(--accent)",
          }}/>
          Live · 2,461 listings across Hungary
        </div>

        <h1 style={{
          fontFamily: "var(--serif)",
          fontWeight: 400,
          fontSize: 52,
          lineHeight: 1.05,
          margin: 0,
          letterSpacing: "-0.018em",
          color: "white",
          textAlign: "center",
          textWrap: "balance",
          textShadow: "0 2px 16px rgba(20,30,28,0.30)",
        }}>
          A home in Hungary,<br/>
          <em style={{ fontStyle: "italic", color: "var(--accent)" }}>for the life you want to live.</em>
        </h1>

        <p style={{
          margin: "16px 0 28px",
          fontSize: 16,
          lineHeight: 1.55,
          color: "rgba(255,255,255,0.85)",
          maxWidth: 540,
          textAlign: "center",
        }}>
          From a stone cottage by Lake Balaton to a modern villa above the
          Danube — find homes hand-picked for character, light, and place.
        </p>

        {/* Floating search bar */}
        <div className="hero-search-wrap" style={{
          width: "100%",
          maxWidth: 780,
        }}>
          <SearchBar layout="row" />
        </div>
      </div>

      {/* Slide indicators */}
      <div style={{
        position: "absolute", bottom: 20, left: "50%",
        transform: "translateX(-50%)",
        display: "flex", gap: 8, zIndex: 3,
      }}>
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{
            appearance: "none", border: "none",
            width: i === current ? 28 : 8, height: 8,
            borderRadius: 999,
            background: i === current ? "white" : "rgba(255,255,255,0.50)",
            cursor: "pointer",
            transition: "width 0.3s ease, background 0.3s ease",
            padding: 0,
          }}/>
        ))}
      </div>

      {/* Prev / Next arrows */}
      {[
        { dir: -1, pos: "left" },
        { dir: 1, pos: "right" },
      ].map(({ dir, pos }) => (
        <button key={pos} onClick={() => goTo(current + dir)} style={{
          position: "absolute", top: "50%", [pos]: 16,
          transform: "translateY(-50%)",
          appearance: "none", border: "none",
          width: 40, height: 40, borderRadius: 999,
          background: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(8px)",
          color: "white",
          display: "grid", placeItems: "center",
          cursor: "pointer",
          zIndex: 3,
          transition: "background 0.2s",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.35)"}
        onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            {dir === -1
              ? <path d="M15 18l-6-6 6-6"/>
              : <path d="M9 18l6-6-6-6"/>
            }
          </svg>
        </button>
      ))}
    </section>
  );
}

/* Quick search points — a tidy panel of pre-built searches. */
function SearchPoints() {
  const points = [
    { kicker: "Most popular",  label: "Balaton lakefront",   meta: "428 homes", swatch: "swatch-1", src: "uploads/search-points/balaton-lakefront.webp" },
    { kicker: "City",          label: "Budapest, District V", meta: "112 homes", swatch: "swatch-2", src: "uploads/search-points/budapest-district-v.webp" },
    { kicker: "Countryside",   label: "Vineyards & farms",    meta: "247 homes", swatch: "swatch-3", src: "uploads/search-points/countryside.webp" },
    { kicker: "Under €100k",   label: "Renovation projects",  meta: "612 homes", swatch: "swatch-5", src: "uploads/search-points/renovation-projects.webp" },
  ];
  return (
    <div style={{
      border: "1px solid var(--line)",
      borderRadius: 14,
      padding: 6,
      background: "var(--bg)",
      boxShadow: "0 1px 0 var(--line), 0 18px 40px -24px rgba(20,30,28,0.18)",
    }}>
      <div style={{
        padding: "12px 14px 8px",
        display: "flex", alignItems: "baseline", justifyContent: "space-between",
      }}>
        <div className="mono">Quick searches</div>
        <a className="mono" style={{ color: "var(--accent-ink)", cursor: "pointer" }}>See all →</a>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        {points.map((p, i) => (
          <a key={i}
            onClick={() => { window.location.href = "results.html"; }}
            style={{
              position: "relative",
              display: "block",
              borderRadius: 10,
              overflow: "hidden",
              cursor: "pointer",
              aspectRatio: "1.4 / 1",
            }}
          >
            <Swatch
              name={p.swatch}
              label={p.label}
              slotId={`qsearch-${i}`}
              height={"100%"}
              rounded={10}
              placeholder={p.label}
              src={p.src}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(20,30,28,0.62) 0%, rgba(20,30,28,0.05) 60%, transparent 100%)",
            }}/>
            <div style={{
              position: "absolute", left: 12, right: 12, bottom: 10,
              color: "white",
            }}>
              <div className="mono" style={{ color: "rgba(255,255,255,0.78)", marginBottom: 2 }}>
                {p.kicker}
              </div>
              <div style={{
                display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 8,
              }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: 20, lineHeight: 1.1 }}>{p.label}</div>
                <div style={{ fontSize: 11, opacity: 0.85, whiteSpace: "nowrap" }}>{p.meta}</div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   FEATURED — "Aanbevolen woningen" — sexier, magazine layout.
   One large hero card + two side cards + supporting row.
   To the right of the lead row sits a compact "Over ons" panel.
   ============================================================ */
function FeaturedSection() {
  // Pick a small curated set from PROPERTIES (with images preferred).
  const withImg = PROPERTIES.filter(p => p.src);
  const featured = withImg.length >= 5 ? withImg.slice(0, 5) : PROPERTIES.slice(0, 5);
  const [hero, ...rest] = featured;
  return (
    <section style={{
      padding: "20px 32px 56px",
      maxWidth: 1320,
      margin: "0 auto",
    }}>
      <SectionHead
        kicker="Featured · This week"
        title="Homes we'd live in"
        subtitle="Hand-picked by our agents — for the light, the bones, the view."
        cta="See all 2,461 →"
      />

      {/* Magazine layout: hero (left) + Over ons (right) */}
      <div className="featured-grid" style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)",
        gap: 22,
        marginBottom: 22,
      }}>
        <HeroPropertyCard p={hero} />
        <OverOnsPanel />
      </div>

      {/* Supporting row — 4 across */}
      <div className="supporting-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        gap: 22,
        rowGap: 32,
      }}>
        {rest.slice(0, 4).map(p => <PropertyCard key={p.id} p={p} />)}
      </div>
    </section>
  );
}

/* Bigger, sexier card for the hero slot — large image, generous type. */
function HeroPropertyCard({ p }) {
  const [fav, setFav] = React.useState(false);
  return (
    <article
      onClick={() => { window.location.href = "detail.html"; }}
      style={{
        position: "relative",
        display: "flex", flexDirection: "column",
        cursor: "pointer",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        border: "1px solid var(--line)",
        background: "var(--bg)",
        minHeight: 520,
      }}
    >
      <div style={{ position: "relative", flex: "1 1 auto", minHeight: 380 }}>
        <Swatch
          name={p.swatch}
          label={`PHOTO · ${p.location}`}
          slotId={`hero-${p.id}`}
          height={"100%"}
          rounded={0}
          placeholder={`Drop a photo · ${p.location}`}
          src={p.src}
        />
        {/* Tag + heart */}
        <div style={{
          position: "absolute", left: 16, top: 16,
          display: "flex", gap: 6,
        }}>
          <span style={{
            background: "var(--bg)", color: "var(--ink)",
            fontSize: 11, fontWeight: 500,
            padding: "5px 10px", borderRadius: 999,
          }}>{p.tag || "Featured"}</span>
          <span style={{
            background: "var(--ink)", color: "var(--bg)",
            fontSize: 11, fontFamily: "var(--mono)", letterSpacing: "0.05em", textTransform: "uppercase",
            padding: "5px 10px", borderRadius: 999,
          }}>Editor's pick</span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); setFav(v => !v); }}
          style={{
            position: "absolute", right: 16, top: 16,
            width: 38, height: 38,
            background: "var(--bg)",
            border: "none", borderRadius: 999,
            display: "grid", placeItems: "center",
            cursor: "pointer",
            color: fav ? "var(--accent)" : "var(--ink)",
            boxShadow: "0 2px 10px rgba(0,0,0,0.10)",
          }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill={fav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <div style={{
          position: "absolute", right: 16, bottom: 16,
          background: "rgba(20,30,28,0.62)", color: "white",
          fontSize: 12, fontFamily: "var(--mono)",
          padding: "5px 10px", borderRadius: 999,
          display: "inline-flex", alignItems: "center", gap: 6,
          backdropFilter: "blur(4px)",
        }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
          {p.photoCount} photos
        </div>
      </div>

      {/* Body */}
      <div className="hero-card-footer" style={{
        padding: "20px 24px 22px",
        display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24,
        borderTop: "1px solid var(--line)",
      }}>
        <div style={{ minWidth: 0 }}>
          <div className="mono" style={{ marginBottom: 6 }}>{p.region || p.location}</div>
          <h3 style={{
            margin: 0,
            fontFamily: "var(--serif)", fontWeight: 400, fontSize: 30, lineHeight: 1.1,
            letterSpacing: "-0.012em", color: "var(--ink)",
          }}>{p.title}</h3>
          <div style={{
            display: "flex", flexWrap: "wrap", gap: 0, marginTop: 12,
            fontSize: 13, color: "var(--ink-2)",
          }}>
            {[
              p.rooms != null && { v: p.rooms, u: "rooms" },
              p.baths != null && { v: p.baths, u: "bath" },
              p.area != null && { v: `${p.area}`, u: "m²" },
              p.plot != null && { v: `${p.plot}`, u: "m² plot" },
            ].filter(Boolean).map((s, i, arr) => (
              <span key={i} style={{
                display: "inline-flex", alignItems: "baseline", gap: 5,
                paddingRight: 12, marginRight: 12,
                borderRight: i < arr.length - 1 ? "1px solid var(--line)" : "none",
              }}>
                <span style={{ fontWeight: 600, color: "var(--ink)" }}>{s.v}</span>
                <span style={{ color: "var(--muted)" }}>{s.u}</span>
              </span>
            ))}
          </div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div className="mono" style={{ marginBottom: 4 }}>Asking</div>
          <div className="hero-card-price" style={{
            fontFamily: "var(--serif)", fontSize: 38, lineHeight: 1,
            color: "var(--ink)",
          }}>
            {fmtPrice(p.price)}
          </div>
        </div>
      </div>
    </article>
  );
}

/* ============================================================
   OVER ONS — sits next to the hero featured card.
   Compact: who we are, why we're different, one CTA.
   ============================================================ */
function OverOnsPanel() {
  return (
    <aside style={{
      display: "flex", flexDirection: "column",
      background: "var(--ink)",
      color: "var(--bg)",
      borderRadius: "var(--radius-lg)",
      padding: "26px 26px 24px",
      minHeight: 520,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle texture */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(800px 320px at 80% -10%, color-mix(in oklch, var(--accent) 24%, transparent), transparent 60%)",
        pointerEvents: "none",
      }}/>
      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 14, flex: "0 0 auto" }}>
        <div className="mono" style={{ color: "color-mix(in oklch, var(--bg) 70%, transparent)" }}>
          About us · Over ons
        </div>
        <h3 style={{
          margin: 0,
          fontFamily: "var(--serif)", fontWeight: 400, fontSize: 30, lineHeight: 1.08,
          letterSpacing: "-0.01em",
        }}>
          A small team that has bought homes in Hungary — and helps you do the same.
        </h3>
        <p style={{
          margin: 0, fontSize: 14.5, lineHeight: 1.55,
          color: "color-mix(in oklch, var(--bg) 78%, transparent)",
        }}>
          We speak Dutch, English, German and Hungarian. We've walked every
          village. We never sell a house we wouldn't live in ourselves.
        </p>
      </div>

      {/* Stats row */}
      <div style={{
        position: "relative",
        marginTop: "auto",
        paddingTop: 20,
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 0,
        borderTop: "1px solid color-mix(in oklch, var(--bg) 18%, transparent)",
      }}>
        {[
          { v: "12 yrs", l: "On the ground" },
          { v: "240+",   l: "Homes sold"     },
          { v: "4",      l: "Languages"      },
        ].map((s, i, arr) => (
          <div key={i} style={{
            padding: "16px 4px 4px",
            borderRight: i < arr.length - 1 ? "1px solid color-mix(in oklch, var(--bg) 14%, transparent)" : "none",
          }}>
            <div style={{ fontFamily: "var(--serif)", fontSize: 26, lineHeight: 1 }}>{s.v}</div>
            <div className="mono" style={{ marginTop: 6, color: "color-mix(in oklch, var(--bg) 60%, transparent)" }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div style={{ position: "relative", display: "flex", gap: 10, marginTop: 18 }}>
        <a style={{
          flex: 1,
          display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
          padding: "12px 16px",
          background: "var(--bg)", color: "var(--ink)",
          borderRadius: 999, fontSize: 14, fontWeight: 600,
          cursor: "pointer",
        }}>
          Meet the team
          <svg width="12" height="12" viewBox="0 0 12 12"><path d="M3 2l5 4-5 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
        <a style={{
          flex: 1,
          display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
          padding: "12px 16px",
          background: "transparent", color: "var(--bg)",
          border: "1px solid color-mix(in oklch, var(--bg) 30%, transparent)",
          borderRadius: 999, fontSize: 14, fontWeight: 500,
          cursor: "pointer",
        }}>
          Book a call
        </a>
      </div>
    </aside>
  );
}

/* ============================================================
   COLLECTIONS — the three tiers.
   Essential / Signature / Prestige. Big, simple, sexy.
   ============================================================ */
const COLLECTIONS = [
  {
    id: "essential",
    name: "Essential Collection",
    subtitle: "Authentic & Rustic",
    priceMax: 150000,
    priceLabel: "Up to €150,000",
    blurb: "Stone walls, old beams, big skies. For makers, renovators, and slow-living seekers.",
    focus: ["Character", "Renovation potential", "Outdoor living"],
    accent: "oklch(0.62 0.10 60)",   /* warm clay */
    tint:   "oklch(0.96 0.018 60)",
    count: 612,
    swatch: "swatch-3",
    src: "uploads/collections/essential.webp",
  },
  {
    id: "signature",
    name: "Signature Collection",
    subtitle: "Comfort & Space",
    priceMin: 150000, priceMax: 250000,
    priceLabel: "€150,000 — €250,000",
    blurb: "Family homes you can move into tomorrow. Well-loved villages, gardens, schools nearby.",
    focus: ["Move-in ready", "Family homes", "Strong locations"],
    accent: "oklch(0.52 0.07 165)",   /* sage-teal */
    tint:   "oklch(0.96 0.014 165)",
    count: 824,
    swatch: "swatch-1",
    src: "uploads/collections/signature.webp",
  },
  {
    id: "prestige",
    name: "Prestige Collection",
    subtitle: "Exclusive & Modern",
    priceMin: 250000,
    priceLabel: "From €250,000",
    blurb: "Architect-built homes, lake views, vineyards on the doorstep. Where finish matters as much as place.",
    focus: ["Luxury finish", "Unique views", "Architect-built"],
    accent: "oklch(0.32 0.04 175)",   /* deep ink */
    tint:   "oklch(0.94 0.008 175)",
    count: 187,
    swatch: "swatch-4",
    src: "uploads/collections/prestige.webp",
  },
];

function CollectionsSection() {
  return (
    <section style={{
      padding: "40px 32px 64px",
      maxWidth: 1320,
      margin: "0 auto",
    }}>
      <SectionHead
        kicker="Find your fit · Three collections"
        title="Search the way buyers actually think"
        subtitle="Three budgets. Three lives. One step closer to home."
        cta={null}
      />
      <div className="collections-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: 18,
      }}>
        {COLLECTIONS.map((c, i) => <CollectionCard key={c.id} c={c} index={i} />)}
      </div>
    </section>
  );
}

function CollectionCard({ c, index }) {
  const [hover, setHover] = React.useState(false);
  // Roman numerals for serial markers
  const numerals = ["I", "II", "III"];
  return (
    <a
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => { window.location.href = "results.html"; }}
      style={{
        position: "relative",
        display: "flex", flexDirection: "column",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        cursor: "pointer",
        border: "1px solid var(--line)",
        background: "var(--bg)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        transform: hover ? "translateY(-3px)" : "none",
        boxShadow: hover ? "0 18px 40px -16px rgba(20,30,28,0.18)" : "none",
      }}
    >
      {/* Image header */}
      <div style={{ position: "relative", aspectRatio: "4 / 3" }}>
        <Swatch
          name={c.swatch}
          label={c.name}
          slotId={`collection-${c.id}`}
          height={"100%"}
          rounded={0}
          placeholder={`${c.name} · drop hero photo`}
          src={c.src}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(180deg, transparent 0%, transparent 55%, color-mix(in oklch, ${c.accent} 80%, black) 100%)`,
          mixBlendMode: "multiply",
          opacity: 0.55,
        }}/>
        {/* Roman numeral marker */}
        <div style={{
          position: "absolute", top: 16, left: 18,
          fontFamily: "var(--serif)", fontStyle: "italic",
          color: "white", fontSize: 28, lineHeight: 1,
          textShadow: "0 1px 4px rgba(0,0,0,0.3)",
          letterSpacing: "0.02em",
        }}>
          {numerals[index]}
        </div>
        {/* Subtitle pill, bottom-left over image */}
        <div style={{
          position: "absolute", left: 18, bottom: 18,
          color: "white",
        }}>
          <div className="mono" style={{ color: "rgba(255,255,255,0.85)", marginBottom: 6 }}>
            {c.priceLabel}
          </div>
          <div style={{
            fontFamily: "var(--serif)", fontSize: 34, lineHeight: 1,
            letterSpacing: "-0.01em",
          }}>
            {c.name}
          </div>
          <div style={{ fontSize: 14, fontStyle: "italic", marginTop: 6, opacity: 0.95 }}>
            {c.subtitle}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{
        padding: "22px 22px 22px",
        display: "flex", flexDirection: "column", gap: 16,
        flex: 1,
      }}>
        <p style={{
          margin: 0, fontSize: 15, lineHeight: 1.5, color: "var(--ink-2)",
          textWrap: "balance",
        }}>
          {c.blurb}
        </p>

        {/* Focus tags */}
        <ul style={{
          listStyle: "none", padding: 0, margin: 0,
          display: "flex", flexDirection: "column", gap: 8,
        }}>
          {c.focus.map((f, i) => (
            <li key={i} style={{
              display: "flex", alignItems: "center", gap: 10,
              fontSize: 13.5, color: "var(--ink)",
            }}>
              <span style={{
                width: 5, height: 5, borderRadius: 999,
                background: c.accent, flexShrink: 0,
              }}/>
              {f}
            </li>
          ))}
        </ul>

        {/* Footer row */}
        <div style={{
          marginTop: "auto",
          paddingTop: 16,
          borderTop: "1px solid var(--line)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div className="mono" style={{ color: "var(--muted)" }}>
            {c.count} homes
          </div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontSize: 13.5, fontWeight: 600, color: c.accent,
          }}>
            Browse collection
            <svg width="13" height="13" viewBox="0 0 12 12" style={{
              transition: "transform 0.2s ease",
              transform: hover ? "translateX(3px)" : "none",
            }}>
              <path d="M2 6h8M7 3l3 3-3 3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
}

/* ============================================================
   REGIONS — kept as an optional, smaller, secondary section.
   Hidden by default per the new layout (Tweak to toggle on).
   ============================================================ */
function RegionsSection() {
  return (
    <section style={{
      padding: "24px 32px 56px",
      maxWidth: 1320,
      margin: "0 auto",
    }}>
      <SectionHead
        kicker="By region"
        title="Popular places to live"
        cta="See all regions →"
      />
      <div className="regions-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
        gap: 14,
      }}>
        {REGIONS.map(r => <RegionCard key={r.id} r={r} />)}
      </div>
    </section>
  );
}

/* ============================================================
   SECTION HEAD — shared title block
   ============================================================ */
function SectionHead({ kicker, title, subtitle, cta }) {
  return (
    <div className="section-head" style={{
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      marginBottom: 24,
      gap: 24,
    }}>
      <div style={{ maxWidth: 720 }}>
        <div className="mono" style={{ marginBottom: 8 }}>{kicker}</div>
        <h2 style={{
          fontFamily: "var(--serif)",
          fontWeight: 400,
          fontSize: 36,
          lineHeight: 1.05,
          margin: 0,
          letterSpacing: "-0.014em",
          color: "var(--ink)",
        }}>
          {title}
        </h2>
        {subtitle && (
          <p style={{
            margin: "10px 0 0",
            fontSize: 15, color: "var(--muted)", lineHeight: 1.55,
            maxWidth: 580,
          }}>
            {subtitle}
          </p>
        )}
      </div>
      {cta && <a style={{
        fontSize: 13, color: "var(--ink-2)", cursor: "pointer", whiteSpace: "nowrap",
        borderBottom: "1px solid var(--line-strong)", paddingBottom: 2,
      }}>{cta}</a>}
    </div>
  );
}


/* ============================================================
   APP
   ============================================================ */
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => { applyAccent(t.accent); }, [t.accent]);

  return (
    <div data-screen-label="01 Homepage">
      <Header brand={t.brandName} />
      <HeroCarousel />
      <FeaturedSection />
      <CollectionsSection />
      {t.showRegions && <RegionsSection />}
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
        <TweakSection label="Layout" />
        <TweakToggle
          label="Show regions section"
          value={t.showRegions}
          onChange={(v) => setTweak('showRegions', v)}
        />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
