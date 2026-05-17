// footer.jsx — shared rich footer for client-facing pages

function Footer() {
  return (
    <footer style={{ marginTop: 24 }}>
      {/* Mission block — warm green background */}
      <div style={{
        background: "var(--ink)",
        color: "var(--bg)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Subtle accent glow */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(900px 300px at 20% 100%, color-mix(in oklch, var(--accent) 18%, transparent), transparent 60%)",
          pointerEvents: "none",
        }}/>

        <div className="footer-top" style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "56px 32px 48px",
          position: "relative",
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr",
          gap: 48,
        }}>
          {/* Mission column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <img src="uploads/logo-otia.svg" alt="Otia" style={{
                width: 32, height: 32,
                filter: "brightness(0) invert(1)",
              }}/>
              <span style={{
                fontFamily: "var(--serif)", fontSize: 26, lineHeight: 1,
                letterSpacing: "-0.005em",
              }}>Otia</span>
            </div>
            <p style={{
              margin: "0 0 20px",
              fontSize: 15, lineHeight: 1.6,
              color: "color-mix(in oklch, var(--bg) 78%, transparent)",
              maxWidth: 380,
            }}>
              We help international buyers find their home in Hungary. From first search to signed contract — in your language, at your pace.
            </p>

            {/* Trust badges */}
            <div style={{
              display: "flex", gap: 20, marginTop: 20,
              paddingTop: 20,
              borderTop: "1px solid color-mix(in oklch, var(--bg) 14%, transparent)",
            }}>
              {[
                { v: "12 yrs", l: "On the ground" },
                { v: "240+",   l: "Homes sold" },
                { v: "4",      l: "Languages" },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ fontFamily: "var(--serif)", fontSize: 22, lineHeight: 1 }}>{s.v}</div>
                  <div className="mono" style={{ marginTop: 4, color: "color-mix(in oklch, var(--bg) 55%, transparent)" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation column */}
          <div>
            <div className="mono" style={{ marginBottom: 16, color: "color-mix(in oklch, var(--bg) 55%, transparent)" }}>Explore</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["Buy property", "Rent property", "New build", "Inspiration", "Essential Collection", "Signature Collection", "Prestige Collection"].map(link => (
                <a key={link} style={{
                  fontSize: 14,
                  color: "color-mix(in oklch, var(--bg) 80%, transparent)",
                  cursor: "pointer",
                  transition: "color 0.15s",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--bg)"}
                onMouseLeave={e => e.currentTarget.style.color = "color-mix(in oklch, var(--bg) 80%, transparent)"}
                >{link}</a>
              ))}
            </div>
          </div>

          {/* Contact & languages column */}
          <div>
            <div className="mono" style={{ marginBottom: 16, color: "color-mix(in oklch, var(--bg) 55%, transparent)" }}>Contact</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
              <span style={{ color: "color-mix(in oklch, var(--bg) 80%, transparent)" }}>info@otia.hu</span>
              <span style={{ color: "color-mix(in oklch, var(--bg) 80%, transparent)" }}>+36 1 234 5678</span>
              <span style={{ color: "color-mix(in oklch, var(--bg) 80%, transparent)" }}>Budapest, Hungary</span>
            </div>

            <div className="mono" style={{ marginTop: 28, marginBottom: 12, color: "color-mix(in oklch, var(--bg) 55%, transparent)" }}>We speak your language</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["English", "Nederlands", "Deutsch", "Magyar"].map(lang => (
                <span key={lang} style={{
                  fontSize: 12, fontWeight: 500,
                  padding: "5px 12px",
                  borderRadius: 999,
                  border: "1px solid color-mix(in oklch, var(--bg) 20%, transparent)",
                  color: "color-mix(in oklch, var(--bg) 75%, transparent)",
                }}>
                  {lang}
                </span>
              ))}
            </div>

            <a style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              marginTop: 24,
              padding: "10px 20px",
              background: "var(--accent)",
              color: "white",
              borderRadius: 999,
              fontSize: 14, fontWeight: 600,
              cursor: "pointer",
            }}>
              Book a free call
              <svg width="12" height="12" viewBox="0 0 12 12"><path d="M3 2l5 4-5 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar — copyright */}
      <div style={{
        background: "color-mix(in oklch, var(--ink) 92%, black)",
      }}>
        <div className="footer-bottom" style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "16px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          color: "color-mix(in oklch, var(--bg) 45%, transparent)",
          fontSize: 12,
        }}>
          <div className="mono">© 2026 Otia · Budapest, Hungary</div>
          <div style={{ display: "flex", gap: 20 }}>
            <a style={{ cursor: "pointer" }}>Privacy</a>
            <a style={{ cursor: "pointer" }}>Terms</a>
            <a style={{ cursor: "pointer" }}>Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
