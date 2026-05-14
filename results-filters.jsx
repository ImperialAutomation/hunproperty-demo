// results-filters.jsx — top filter bar with all controls in a single row,
// plus a "More filters" popover for extras (pool, garage, new build, renovated)
// and a price range mini-popover.

const { useState: useStateF, useRef: useRefF, useEffect: useEffectF } = React;

function FilterBar({ state, setState }) {
  return (
    <div style={{
      background: "var(--bg)",
      borderBottom: "1px solid var(--line)",
      position: "sticky",
      top: "var(--header-h)",
      zIndex: 40,
    }}>
      <div className="filter-bar-inner" style={{
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        flexWrap: "wrap",
      }}>
        {/* Location pill (always editable) */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: "var(--surface)",
          border: "1px solid var(--line-strong)",
          borderRadius: 999,
          padding: "7px 14px",
          fontSize: 13,
          fontWeight: 500,
          cursor: "pointer",
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s-7-7.5-7-12a7 7 0 0 1 14 0c0 4.5-7 12-7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>
          {state.where || "Anywhere in Hungary"}
          <svg width="10" height="10" viewBox="0 0 12 12" style={{ opacity: 0.55 }}><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>

        {/* Mode toggle */}
        <SegToggle
          value={state.mode}
          onChange={(v) => setState({ ...state, mode: v })}
          options={[{ id: "buy", l: "Buy" }, { id: "rent", l: "Rent" }]}
        />

        <Sep />

        <FilterPill label="Type" value={state.type} onChange={(v) => setState({ ...state, type: v })} options={TYPES} />
        <FilterPill label="Rooms" value={state.rooms} onChange={(v) => setState({ ...state, rooms: v })} options={ROOMS} />
        <PricePill state={state} setState={setState} />
        <FilterPill label="Area m²" value={state.area} onChange={(v) => setState({ ...state, area: v })} options={["Any", "50+", "80+", "120+", "180+", "250+"]} />
        <FilterPill label="Plot m²" value={state.plot} onChange={(v) => setState({ ...state, plot: v })} options={["Any", "500+", "1000+", "2000+", "5000+"]} />

        <MoreFilters state={state} setState={setState} />

        <div style={{ flex: 1 }} />

        {/* Reset */}
        <button onClick={() => setState({ ...state, type: TYPES[0], rooms: ROOMS[0], price: PRICES[0], area: "Any", plot: "Any", extras: {} })}
          style={{
            appearance: "none", border: "none", background: "transparent",
            color: "var(--muted)", fontSize: 12.5, cursor: "pointer",
            textDecoration: "underline", textUnderlineOffset: 3,
          }}>
          Reset filters
        </button>
      </div>
    </div>
  );
}

function Sep() {
  return <span className="filter-sep" style={{ width: 1, height: 22, background: "var(--line)", margin: "0 2px" }} />;
}

function SegToggle({ value, onChange, options }) {
  return (
    <div style={{
      display: "inline-flex",
      background: "var(--surface)",
      borderRadius: 999,
      padding: 3,
    }}>
      {options.map(o => (
        <button key={o.id}
          onClick={() => onChange(o.id)}
          style={{
            appearance: "none",
            border: "none",
            background: value === o.id ? "var(--bg)" : "transparent",
            color: "var(--ink)",
            fontSize: 13,
            fontWeight: 500,
            padding: "6px 14px",
            borderRadius: 999,
            cursor: "pointer",
            boxShadow: value === o.id ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
          }}>
          {o.l}
        </button>
      ))}
    </div>
  );
}

function FilterPill({ label, value, options, onChange }) {
  const [open, setOpen] = useStateF(false);
  const ref = useRefF(null);
  useEffectF(() => {
    function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  const active = value && !["Any", "Any type", "Any price"].includes(value);
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(v => !v)} style={{
        appearance: "none",
        background: active ? "var(--ink)" : "var(--bg)",
        color: active ? "var(--bg)" : "var(--ink)",
        border: "1px solid",
        borderColor: active ? "var(--ink)" : "var(--line-strong)",
        borderRadius: 999,
        padding: "7px 14px",
        fontSize: 13,
        fontWeight: 500,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
      }}>
        <span style={{ opacity: active ? 0.7 : 1 }}>{label}{active ? ":" : ""}</span>
        {active && <span>{value}</span>}
        <svg width="10" height="10" viewBox="0 0 12 12" style={{ opacity: 0.6 }}><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0,
          background: "var(--bg)", border: "1px solid var(--line)",
          borderRadius: 10, padding: 4, minWidth: 160,
          boxShadow: "0 12px 30px rgba(20,30,28,0.10)",
          zIndex: 40,
        }}>
          {options.map(o => (
            <div key={o}
              onClick={() => { onChange(o); setOpen(false); }}
              style={{
                padding: "8px 12px", borderRadius: 6, fontSize: 13.5,
                cursor: "pointer", whiteSpace: "nowrap",
                background: o === value ? "var(--surface)" : "transparent",
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

function PricePill({ state, setState }) {
  const [open, setOpen] = useStateF(false);
  const ref = useRefF(null);
  useEffectF(() => {
    function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  const active = state.priceMin > 0 || state.priceMax < 500000;
  const label = active
    ? `€${(state.priceMin/1000).toFixed(0)}k – €${state.priceMax >= 500000 ? "500k+" : (state.priceMax/1000).toFixed(0)+"k"}`
    : "Price";
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(v => !v)} style={{
        appearance: "none",
        background: active ? "var(--ink)" : "var(--bg)",
        color: active ? "var(--bg)" : "var(--ink)",
        border: "1px solid",
        borderColor: active ? "var(--ink)" : "var(--line-strong)",
        borderRadius: 999,
        padding: "7px 14px",
        fontSize: 13,
        fontWeight: 500,
        cursor: "pointer",
        display: "inline-flex", alignItems: "center", gap: 6,
      }}>
        {label}
        <svg width="10" height="10" viewBox="0 0 12 12" style={{ opacity: 0.6 }}><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0,
          background: "var(--bg)", border: "1px solid var(--line)",
          borderRadius: 10, padding: 14, width: 280,
          boxShadow: "0 12px 30px rgba(20,30,28,0.10)",
          zIndex: 40,
        }}>
          <div className="mono" style={{ marginBottom: 10 }}>Price range</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <NumField label="Min" value={state.priceMin} onChange={(v) => setState({ ...state, priceMin: v })} />
            <NumField label="Max" value={state.priceMax} onChange={(v) => setState({ ...state, priceMax: v })} />
          </div>
          {/* Mini histogram */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 36, marginBottom: 10 }}>
            {[3,7,12,18,22,28,30,26,18,14,10,7,5,3,2,1].map((h, i) => (
              <div key={i} style={{
                flex: 1,
                height: `${h * 3.2}%`,
                background: "color-mix(in oklch, var(--accent) 60%, var(--surface))",
                borderRadius: 1,
                minHeight: 2,
              }} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--muted)" }}>
            <span>€0</span><span>€500k+</span>
          </div>
        </div>
      )}
    </div>
  );
}

function NumField({ label, value, onChange }) {
  return (
    <label style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
      <span className="mono">{label}</span>
      <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--line-strong)", borderRadius: 6, padding: "5px 8px" }}>
        <span style={{ color: "var(--muted)", marginRight: 4 }}>€</span>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value || "0", 10))}
          style={{ width: "100%", border: "none", outline: "none", background: "transparent", fontSize: 13, fontWeight: 500 }}
        />
      </div>
    </label>
  );
}

function MoreFilters({ state, setState }) {
  const [open, setOpen] = useStateF(false);
  const ref = useRefF(null);
  useEffectF(() => {
    function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  const extras = state.extras || {};
  const activeCount = Object.values(extras).filter(Boolean).length;
  const flags = [
    { id: "pool",       label: "Swimming pool" },
    { id: "garage",     label: "Garage" },
    { id: "new_build",  label: "New build" },
    { id: "renovated",  label: "Renovated" },
    { id: "garden",     label: "Garden" },
    { id: "cellar",     label: "Cellar" },
    { id: "balcony",    label: "Balcony / terrace" },
    { id: "view",       label: "Lake / hill view" },
  ];
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(v => !v)} style={{
        appearance: "none",
        background: activeCount ? "var(--ink)" : "var(--bg)",
        color: activeCount ? "var(--bg)" : "var(--ink)",
        border: "1px solid",
        borderColor: activeCount ? "var(--ink)" : "var(--line-strong)",
        borderRadius: 999,
        padding: "7px 14px",
        fontSize: 13,
        fontWeight: 500,
        cursor: "pointer",
        display: "inline-flex", alignItems: "center", gap: 6,
      }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/>
        </svg>
        More filters
        {activeCount > 0 && (
          <span style={{
            background: activeCount ? "var(--accent)" : "var(--surface-2)",
            color: "white",
            borderRadius: 999, padding: "0 6px",
            fontSize: 11, fontWeight: 600,
            minWidth: 18, textAlign: "center",
          }}>{activeCount}</span>
        )}
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0,
          background: "var(--bg)", border: "1px solid var(--line)",
          borderRadius: 10, padding: 14, width: 320,
          boxShadow: "0 12px 30px rgba(20,30,28,0.10)",
          zIndex: 40,
        }}>
          <div className="mono" style={{ marginBottom: 10 }}>Features</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            {flags.map(f => {
              const on = !!extras[f.id];
              return (
                <button key={f.id}
                  onClick={() => setState({ ...state, extras: { ...extras, [f.id]: !on } })}
                  style={{
                    appearance: "none",
                    border: "1px solid",
                    borderColor: on ? "var(--ink)" : "var(--line)",
                    background: on ? "var(--ink)" : "transparent",
                    color: on ? "var(--bg)" : "var(--ink)",
                    padding: "7px 10px",
                    borderRadius: 8,
                    fontSize: 12.5,
                    fontWeight: 500,
                    textAlign: "left",
                    cursor: "pointer",
                  }}>
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { FilterBar });
