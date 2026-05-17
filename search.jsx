// search.jsx — central search bar (location autocomplete + filters + CTA)

const { useState, useRef, useEffect } = React;

function SearchBar({ layout = "row" }) {
  const [mode, setMode] = useState("buy"); // buy | rent
  const [q, setQ] = useState("");
  const [type, setType] = useState(TYPES[0]);
  const [price, setPrice] = useState(PRICES[0]);
  const [rooms, setRooms] = useState(ROOMS[0]);
  const [focused, setFocused] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setFocused(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const filtered = q
    ? SUGGESTIONS.filter(s => s.label.toLowerCase().includes(q.toLowerCase())).slice(0, 6)
    : SUGGESTIONS.slice(0, 6);

  const stacked = layout === "stacked";

  return (
    <div style={{ width: "100%" }}>
      {/* Buy / Rent toggle — sits ABOVE the search row */}
      <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>
        {[
          { id: "buy",  label: "Buy" },
          { id: "rent", label: "Rent" },
          { id: "new",  label: "New developments" },
        ].map(opt => (
          <button
            key={opt.id}
            onClick={() => setMode(opt.id)}
            style={{
              appearance: "none",
              border: "1px solid",
              borderColor: mode === opt.id ? "white" : "rgba(255,255,255,0.4)",
              background: mode === opt.id ? "white" : "rgba(255,255,255,0.15)",
              color: mode === opt.id ? "var(--ink)" : "white",
              padding: "8px 16px",
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              transition: "background 0.15s, color 0.15s",
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Search row */}
      <div
        ref={wrapRef}
        className="search-bar-wrap"
        style={{
          background: "var(--bg)",
          border: "1px solid var(--line-strong)",
          borderRadius: 14,
          padding: 6,
          display: stacked ? "grid" : "flex",
          gridTemplateColumns: stacked ? "1fr 1fr" : undefined,
          alignItems: stacked ? "stretch" : "center",
          gap: stacked ? 6 : 0,
          boxShadow: focused
            ? "0 0 0 4px color-mix(in oklch, var(--accent) 18%, transparent), 0 12px 28px rgba(20,30,28,0.07)"
            : "0 6px 22px rgba(20,30,28,0.05)",
          transition: "box-shadow 0.18s",
          position: "relative",
        }}
      >
        {/* Location input */}
        <div style={{
          flex: stacked ? undefined : "2 1 280px",
          gridColumn: stacked ? "1 / -1" : undefined,
          padding: "10px 14px",
          borderRight: stacked ? "none" : "1px solid var(--line)",
          minWidth: 0,
        }}>
          <div className="mono" style={{ marginBottom: 3 }}>Where</div>
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder="City, region or district…"
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: 16,
              fontWeight: 500,
              padding: 0,
            }}
          />
        </div>

        {/* Type */}
        <Dropdown label="Type" value={type} options={TYPES} onChange={setType} stacked={stacked} />
        {/* Price */}
        <Dropdown label="Price" value={price} options={PRICES} onChange={setPrice} stacked={stacked} />
        {/* Rooms */}
        <Dropdown label="Rooms" value={rooms} options={ROOMS} onChange={setRooms} stacked={stacked} narrow />

        {/* Search button */}
        <button onClick={() => { window.location.href = "results.html"; }} style={{
          gridColumn: stacked ? "1 / -1" : undefined,
          marginLeft: stacked ? 0 : 6,
          appearance: "none",
          border: "none",
          background: "var(--accent)",
          color: "white",
          padding: stacked ? "14px 20px" : "16px 22px",
          borderRadius: 10,
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: "0.01em",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          transition: "filter 0.15s",
        }}
        onMouseEnter={e => e.currentTarget.style.filter = "brightness(0.94)"}
        onMouseLeave={e => e.currentTarget.style.filter = "none"}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7"/>
            <path d="m20 20-3.5-3.5"/>
          </svg>
          Search
        </button>

        {/* Autocomplete dropdown */}
        {focused && (
          <div className="search-autocomplete" style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            width: stacked ? "100%" : "60%",
            maxWidth: 480,
            background: "var(--bg)",
            border: "1px solid var(--line)",
            borderRadius: 12,
            padding: 6,
            boxShadow: "0 16px 40px rgba(20,30,28,0.10)",
            zIndex: 30,
          }}>
            <div className="mono" style={{ padding: "8px 10px 6px" }}>
              {q ? `Matches for "${q}"` : "Popular searches"}
            </div>
            {filtered.length === 0 && (
              <div style={{ padding: "10px", color: "var(--muted)", fontSize: 13 }}>
                No matches. Try a region name.
              </div>
            )}
            {filtered.map((s, i) => (
              <button
                key={i}
                onMouseDown={(e) => { e.preventDefault(); setQ(s.label); setFocused(false); }}
                style={{
                  appearance: "none",
                  border: "none",
                  background: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  width: "100%",
                  padding: "9px 10px",
                  borderRadius: 8,
                  cursor: "pointer",
                  textAlign: "left",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--surface)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                  <span style={{
                    width: 28, height: 28, borderRadius: 7,
                    background: "var(--surface)",
                    display: "grid", placeItems: "center",
                    flexShrink: 0,
                  }}>
                    <PinIcon />
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{s.label}</span>
                    <span style={{ fontSize: 11, color: "var(--muted)" }}>{s.kind}</span>
                  </span>
                </span>
                <span style={{ fontSize: 11, color: "var(--muted)", whiteSpace: "nowrap" }}>{s.hint}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quick chips */}
      <div className="quick-chips" style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
        <span className="mono" style={{ alignSelf: "center", marginRight: 4, color: "rgba(255,255,255,0.7)" }}>Quick:</span>
        {["Balaton villas", "Budapest district V", "Under €100k", "Vineyards", "New build"].map(c => (
          <button key={c} style={{
            appearance: "none",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.4)",
            borderRadius: 999,
            padding: "5px 12px",
            fontSize: 12.5,
            color: "white",
            cursor: "pointer",
            transition: "background 0.15s, color 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = "var(--ink)"; e.currentTarget.style.borderColor = "white"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; }}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

function Dropdown({ label, value, options, onChange, stacked, narrow }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  return (
    <div ref={ref} style={{
      position: "relative",
      flex: stacked ? undefined : (narrow ? "0 0 110px" : "1 1 150px"),
      padding: "10px 14px",
      borderRight: stacked ? "none" : "1px solid var(--line)",
      cursor: "pointer",
      minWidth: 0,
    }}
    onClick={() => setOpen(v => !v)}
    >
      <div className="mono" style={{ marginBottom: 3 }}>{label}</div>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        fontSize: 15, fontWeight: 500, gap: 8,
      }}>
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" style={{ flexShrink: 0, opacity: 0.5, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.15s" }}>
          <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {open && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 6px)",
          left: 0,
          minWidth: "100%",
          background: "var(--bg)",
          border: "1px solid var(--line)",
          borderRadius: 10,
          padding: 4,
          boxShadow: "0 12px 30px rgba(20,30,28,0.10)",
          zIndex: 25,
        }}>
          {options.map(o => (
            <div key={o}
              onClick={(e) => { e.stopPropagation(); onChange(o); setOpen(false); }}
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                fontSize: 14,
                background: o === value ? "var(--surface)" : "transparent",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--surface)"}
              onMouseLeave={e => e.currentTarget.style.background = o === value ? "var(--surface)" : "transparent"}
            >
              {o}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--ink)" }}>
      <path d="M12 22s-7-7.5-7-12a7 7 0 0 1 14 0c0 4.5-7 12-7 12z"/>
      <circle cx="12" cy="10" r="2.5"/>
    </svg>
  );
}

Object.assign(window, { SearchBar });
