// detail-sidebar.jsx — sticky right column: price + contact form + agent card

const { useState: useStateS } = React;

function Sidebar({ p }) {
  return (
    <aside style={{ position: "sticky", top: "calc(var(--header-h) + 24px)", display: "flex", flexDirection: "column", gap: 18 }}>
      <PriceBlock p={p} />
      <ContactCard p={p} />
      <AgentCard p={p} />
      <TrustStrip />
    </aside>
  );
}

function PriceBlock({ p }) {
  const pricePerM2 = Math.round(p.price / p.area);
  return (
    <div style={{
      background: "var(--bg)",
      border: "1px solid var(--line-strong)",
      borderRadius: "var(--radius-lg)",
      padding: 22,
    }}>
      <div className="mono" style={{ color: "var(--accent-ink)", marginBottom: 6 }}>Asking price</div>
      <div style={{
        fontFamily: "var(--serif)",
        fontSize: 44,
        lineHeight: 1,
        color: "var(--ink)",
        letterSpacing: "-0.012em",
      }}>
        {fmtPrice(p.price)}
      </div>
      <div style={{ display: "flex", gap: 14, marginTop: 10, fontSize: 12.5, color: "var(--muted)" }}>
        <span>€{pricePerM2.toLocaleString()} / m²</span>
        <span>·</span>
        <span>HUF ≈ {(p.price * 395).toLocaleString("en-US", { maximumFractionDigits: 0 })}</span>
      </div>

      {/* Mortgage hint */}
      <div style={{
        marginTop: 14,
        padding: "10px 12px",
        background: "var(--surface)",
        border: "1px solid var(--line)",
        borderRadius: 8,
        fontSize: 12.5,
        color: "var(--ink-2)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span>Mortgage estimate</span>
        <span style={{ fontWeight: 600, color: "var(--ink)" }}>€1,180 / mo</span>
      </div>
    </div>
  );
}

function ContactCard({ p }) {
  const [vals, setVals] = useStateS({
    name: "",
    email: "",
    phone: "",
    msg: "I am interested in this property and would like to schedule a viewing.",
  });
  const update = (k) => (e) => setVals({ ...vals, [k]: e.target.value });
  return (
    <div style={{
      background: "var(--bg)",
      border: "1px solid var(--line)",
      borderRadius: "var(--radius-lg)",
      padding: 22,
    }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 14 }}>
        <h3 style={{
          fontFamily: "var(--serif)", fontWeight: 400, fontSize: 22,
          margin: 0, lineHeight: 1.1,
        }}>Contact the agent</h3>
        <span className="mono">EN · NL · DE</span>
      </div>

      <Field label="Name" value={vals.name} onChange={update("name")} placeholder="Jane Doe" />
      <Field label="Email" value={vals.email} onChange={update("email")} placeholder="you@example.com" type="email" />
      <Field label="Phone" value={vals.phone} onChange={update("phone")} placeholder="+31 6 1234 5678" type="tel" optional />

      <label style={{ display: "block", marginTop: 12 }}>
        <span className="mono" style={{ display: "block", marginBottom: 6 }}>Message</span>
        <textarea
          value={vals.msg}
          onChange={update("msg")}
          rows={4}
          style={{
            width: "100%",
            border: "1px solid var(--line-strong)",
            borderRadius: 8,
            padding: "10px 12px",
            background: "var(--bg)",
            fontSize: 13.5,
            lineHeight: 1.5,
            outline: "none",
            fontFamily: "inherit",
            resize: "vertical",
            color: "var(--ink-2)",
          }}
        />
      </label>

      <button style={{
        marginTop: 14,
        width: "100%",
        background: "var(--accent)",
        color: "white",
        border: "none",
        borderRadius: 10,
        padding: "13px 18px",
        fontSize: 15,
        fontWeight: 600,
        cursor: "pointer",
        display: "inline-flex", justifyContent: "center", alignItems: "center", gap: 8,
      }}
      onMouseEnter={e => e.currentTarget.style.filter = "brightness(0.94)"}
      onMouseLeave={e => e.currentTarget.style.filter = "none"}
      >
        Send enquiry
      </button>

      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button style={{
          flex: 1,
          background: "transparent",
          color: "var(--ink)",
          border: "1px solid var(--line-strong)",
          borderRadius: 10,
          padding: "11px 14px",
          fontSize: 13.5,
          fontWeight: 500,
          cursor: "pointer",
          display: "inline-flex", justifyContent: "center", alignItems: "center", gap: 6,
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Book viewing
        </button>
        <a href="tel:+36302345678" style={{
          flex: 1,
          background: "transparent",
          color: "var(--ink)",
          border: "1px solid var(--line-strong)",
          borderRadius: 10,
          padding: "11px 14px",
          fontSize: 13.5,
          fontWeight: 500,
          cursor: "pointer",
          display: "inline-flex", justifyContent: "center", alignItems: "center", gap: 6,
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          Call agent
        </a>
      </div>

      <div className="mono" style={{ marginTop: 14, textAlign: "center", color: "var(--muted-2)" }}>
        Replies within ~2 hours · Tue–Sat
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", optional }) {
  return (
    <label style={{ display: "block", marginTop: 12 }}>
      <span className="mono" style={{ display: "block", marginBottom: 6 }}>
        {label}{optional && <span style={{ color: "var(--muted-2)", marginLeft: 6, textTransform: "none", letterSpacing: 0 }}>optional</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          border: "1px solid var(--line-strong)",
          borderRadius: 8,
          padding: "10px 12px",
          background: "var(--bg)",
          fontSize: 14,
          outline: "none",
        }}
      />
    </label>
  );
}

function AgentCard({ p }) {
  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--line)",
      borderRadius: "var(--radius-lg)",
      padding: 18,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Avatar (placeholder slot) */}
        <div style={{
          width: 56, height: 56, borderRadius: 999,
          overflow: "hidden",
          background: "linear-gradient(135deg, oklch(0.62 0.06 195), oklch(0.55 0.08 175))",
          flexShrink: 0,
        }}>
          <image-slot
            id={`agent-${p.id}`}
            shape="circle"
            placeholder="Agent photo"
            style={{ width: "100%", height: "100%", display: "block" }}
          />
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 500, color: "var(--ink)" }}>Anna Kovács</div>
          <div style={{ fontSize: 13, color: "var(--muted)" }}>{p.agent}</div>
          <div className="mono" style={{ marginTop: 4, color: "var(--accent-ink)" }}>★ 4.9 · 38 reviews</div>
        </div>
      </div>
      <div style={{
        marginTop: 14, paddingTop: 14,
        borderTop: "1px solid var(--line)",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 12.5,
      }}>
        <Row k="Phone" v="+36 30 234 5678" />
        <Row k="Email" v="anna@balaton.hu" />
        <Row k="Office" v="Keszthely · Kossuth u. 12" full />
        <Row k="Languages" v="HU, EN, DE" full />
      </div>
    </div>
  );
}

function Row({ k, v, full }) {
  return (
    <div style={{ gridColumn: full ? "1 / -1" : "auto", display: "flex", justifyContent: "space-between", gap: 8 }}>
      <span className="mono">{k}</span>
      <span style={{ color: "var(--ink-2)", fontWeight: 500, textAlign: "right" }}>{v}</span>
    </div>
  );
}

function TrustStrip() {
  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: 8,
      padding: "14px 16px",
      border: "1px dashed var(--line-strong)",
      borderRadius: "var(--radius-lg)",
      fontSize: 12.5,
      color: "var(--muted)",
    }}>
      {[
        ["Verified by Otthon", "Title and zoning checked"],
        ["No buyer fees", "You only pay the price agreed"],
        ["Multilingual support", "Help through the whole transaction"],
      ].map(([t, s]) => (
        <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <span style={{
            width: 18, height: 18, marginTop: 2,
            borderRadius: 999, background: "var(--surface)",
            border: "1px solid var(--line-strong)",
            display: "grid", placeItems: "center", flexShrink: 0,
            color: "var(--accent-ink)", fontSize: 11,
          }}>✓</span>
          <div>
            <div style={{ color: "var(--ink)", fontWeight: 500 }}>{t}</div>
            <div>{s}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { Sidebar });
