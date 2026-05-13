// dashboard-add.jsx — "Add property" wizard with 5 steps.
// Default view shows step 3 (Photos) since that's the most visual step.

const { useState: useStateA } = React;

const STEPS = [
  { id: 1, l: "Basics",      sub: "Type, price, address" },
  { id: 2, l: "Specifications", sub: "Rooms, m², year built" },
  { id: 3, l: "Photos",      sub: "Upload & reorder" },
  { id: 4, l: "Description", sub: "Multilingual (HU + others)" },
  { id: 5, l: "Preview & publish", sub: "Final check" },
];

function AddPropertyView() {
  const [step, setStep] = useStateA(3);
  return (
    <div style={{ padding: 28, display: "grid", gridTemplateColumns: "minmax(0, 1fr) 320px", gap: 28, alignItems: "start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Stepper step={step} setStep={setStep} />
        {step === 1 && <StepBasics />}
        {step === 2 && <StepSpecs />}
        {step === 3 && <StepPhotos />}
        {step === 4 && <StepDescription />}
        {step === 5 && <StepPublish />}
        <StepNav step={step} setStep={setStep} />
      </div>
      <LivePreview step={step} />
    </div>
  );
}

// ── Stepper ─────────────────────────────────────────────────────────────
function Stepper({ step, setStep }) {
  return (
    <div style={{
      background: "var(--bg)",
      border: "1px solid var(--line)",
      borderRadius: "var(--radius-lg)",
      padding: "18px 18px 14px",
    }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {STEPS.map((s, i) => {
          const done = step > s.id;
          const active = step === s.id;
          return (
            <React.Fragment key={s.id}>
              <button onClick={() => setStep(s.id)} style={{
                appearance: "none", border: "none", background: "transparent",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                cursor: "pointer", padding: 0, minWidth: 0,
              }}>
                <span style={{
                  width: 30, height: 30, borderRadius: 999,
                  display: "grid", placeItems: "center",
                  background: done ? "var(--positive)" : (active ? "var(--ink)" : "var(--surface)"),
                  color: done || active ? "var(--bg)" : "var(--muted-2)",
                  border: !done && !active ? "1px solid var(--line-strong)" : "none",
                  fontSize: 13, fontWeight: 600,
                  fontFamily: "var(--mono)",
                }}>
                  {done ? "✓" : s.id}
                </span>
                <span style={{
                  fontSize: 11,
                  fontWeight: active ? 600 : 500,
                  color: active ? "var(--ink)" : "var(--muted)",
                  whiteSpace: "nowrap",
                }}>{s.l}</span>
              </button>
              {i < STEPS.length - 1 && (
                <span style={{
                  flex: 1,
                  height: 2,
                  background: step > s.id ? "var(--positive)" : "var(--line)",
                  margin: "0 8px",
                  marginTop: -16,
                  borderRadius: 1,
                }}/>
              )}
            </React.Fragment>
          );
        })}
      </div>
      <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--line)" }}>
        <div className="mono">Step {step} of 5</div>
        <h2 style={{
          margin: "4px 0 0",
          fontFamily: "var(--serif)", fontWeight: 400,
          fontSize: 24, letterSpacing: "-0.005em",
        }}>
          {STEPS[step-1].l} <span style={{ color: "var(--muted)" }}>· {STEPS[step-1].sub}</span>
        </h2>
      </div>
    </div>
  );
}

function StepNav({ step, setStep }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
      <button
        onClick={() => setStep(Math.max(1, step - 1))}
        disabled={step === 1}
        style={{
          appearance: "none",
          background: "transparent",
          color: "var(--ink-2)",
          border: "1px solid var(--line-strong)",
          borderRadius: 10,
          padding: "10px 16px",
          fontSize: 14, fontWeight: 500,
          cursor: step === 1 ? "not-allowed" : "pointer",
          opacity: step === 1 ? 0.5 : 1,
        }}>← Previous</button>
      <div style={{ display: "flex", gap: 10 }}>
        <button style={{
          appearance: "none",
          background: "transparent",
          color: "var(--ink-2)",
          border: "1px solid var(--line-strong)",
          borderRadius: 10,
          padding: "10px 16px",
          fontSize: 14, fontWeight: 500,
          cursor: "pointer",
        }}>Save as draft</button>
        <button
          onClick={() => setStep(Math.min(5, step + 1))}
          style={{
            appearance: "none",
            background: step === 5 ? "var(--accent)" : "var(--ink)",
            color: step === 5 ? "white" : "var(--bg)",
            border: "none",
            borderRadius: 10,
            padding: "10px 18px",
            fontSize: 14, fontWeight: 600,
            cursor: "pointer",
          }}>
          {step === 5 ? "Publish listing" : "Continue →"}
        </button>
      </div>
    </div>
  );
}

// ── Step 1: Basics ──────────────────────────────────────────────────────
function StepBasics() {
  return (
    <Card>
      <Grid cols={2}>
        <FieldGroup label="Listing type">
          <SegRadio options={["For sale", "For rent", "New development"]} value="For sale" />
        </FieldGroup>
        <FieldGroup label="Property type">
          <Select value="Detached villa" options={["Detached villa", "Apartment", "Town house", "Farmhouse", "Plot", "Holiday home"]} />
        </FieldGroup>
        <FieldGroup label="Asking price">
          <PriceInput value={285000} />
        </FieldGroup>
        <FieldGroup label="Currency">
          <SegRadio options={["EUR", "HUF"]} value="EUR" />
        </FieldGroup>
        <FieldGroup label="Address" full>
          <Input value="Hévízi út 18, Keszthely" />
        </FieldGroup>
        <FieldGroup label="Postcode">
          <Input value="8360" />
        </FieldGroup>
        <FieldGroup label="Region">
          <Select value="Balaton — west shore" options={["Balaton — west shore", "Balaton — south", "Budapest", "Sopron / West"]} />
        </FieldGroup>
      </Grid>
    </Card>
  );
}

// ── Step 2: Specs ───────────────────────────────────────────────────────
function StepSpecs() {
  return (
    <Card>
      <Grid cols={3}>
        <FieldGroup label="Rooms"><Stepper2 value={4} /></FieldGroup>
        <FieldGroup label="Bedrooms"><Stepper2 value={3} /></FieldGroup>
        <FieldGroup label="Bathrooms"><Stepper2 value={2} /></FieldGroup>
        <FieldGroup label="Living area (m²)"><Input value="180" /></FieldGroup>
        <FieldGroup label="Plot surface (m²)"><Input value="800" /></FieldGroup>
        <FieldGroup label="Year built"><Input value="1962" /></FieldGroup>
        <FieldGroup label="Condition"><Select value="Renovated" options={["Original","Renovated","New build"]} /></FieldGroup>
        <FieldGroup label="Heating"><Select value="Heat pump + underfloor" options={["Heat pump + underfloor","Gas central","Wood stove"]} /></FieldGroup>
        <FieldGroup label="Energy label"><Select value="B" options={["A+","A","B","C","D","E","F","G"]} /></FieldGroup>
      </Grid>
      <div style={{ marginTop: 18, paddingTop: 18, borderTop: "1px solid var(--line)" }}>
        <div className="mono" style={{ marginBottom: 10 }}>Extras</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {[
            ["Garage", true],["Pool", false],["Cellar", true],["Garden", true],
            ["Terrace", true],["Air conditioning", true],["Lake view", true],["Furnished", false],
            ["Pets allowed", true],["Smart home", false],
          ].map(([l, on]) => <ToggleChip key={l} label={l} on={on} />)}
        </div>
      </div>
    </Card>
  );
}

// ── Step 3: Photos ──────────────────────────────────────────────────────
function StepPhotos() {
  // 8 photo slots — the first is the cover
  const slots = [
    { id: "add-1", label: "EXTERIOR · cover", cover: true, swatch: "swatch-1" },
    { id: "add-2", label: "LIVING · view",     swatch: "swatch-3" },
    { id: "add-3", label: "KITCHEN",           swatch: "swatch-5" },
    { id: "add-4", label: "BEDROOM",           swatch: "swatch-2" },
    { id: "add-5", label: "BATHROOM",          swatch: "swatch-7" },
    { id: "add-6", label: "GARDEN",            swatch: "swatch-4" },
    { id: "add-7", label: "TERRACE",           swatch: "swatch-8" },
    { id: "add-8", label: "AERIAL",            swatch: "swatch-6" },
  ];
  return (
    <Card>
      {/* Dropzone */}
      <div style={{
        border: "2px dashed var(--line-strong)",
        background: "var(--surface)",
        borderRadius: "var(--radius-lg)",
        padding: 26,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
        textAlign: "center",
      }}>
        <span style={{
          width: 40, height: 40, borderRadius: 999,
          background: "var(--bg)", border: "1px solid var(--line)",
          display: "grid", placeItems: "center",
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        </span>
        <div style={{ fontSize: 15, fontWeight: 500 }}>Drop photos here, or click to browse</div>
        <div className="mono">JPEG, PNG · max 15 MB each · up to 30 photos</div>
        <button style={{
          marginTop: 8, appearance: "none",
          background: "var(--ink)", color: "var(--bg)",
          border: "none", borderRadius: 8,
          padding: "8px 16px", fontSize: 13, fontWeight: 500, cursor: "pointer",
        }}>Choose files</button>
      </div>

      {/* Existing photos grid */}
      <div style={{ marginTop: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div className="mono">{slots.length} photos · drag to reorder</div>
          <div style={{ display: "flex", gap: 6 }}>
            <button style={{
              appearance: "none", background: "transparent",
              border: "1px solid var(--line-strong)",
              padding: "5px 10px", borderRadius: 6,
              fontSize: 12, color: "var(--ink-2)", cursor: "pointer",
            }}>Auto-arrange</button>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {slots.map((s, i) => (
            <PhotoTile key={s.id} index={i + 1} {...s} />
          ))}
        </div>
      </div>
    </Card>
  );
}

function PhotoTile({ id, label, cover, index, swatch }) {
  return (
    <div style={{
      position: "relative",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      border: cover ? "2px solid var(--accent)" : "1px solid var(--line)",
    }}>
      <Swatch name={swatch} label={label} slotId={`addphoto-${id}`} height={120} rounded={cover ? 8 : 9} placeholder="Drop a photo" />
      {cover && (
        <div style={{
          position: "absolute", left: 8, top: 8,
          background: "var(--accent)", color: "white",
          fontSize: 10, fontWeight: 600,
          fontFamily: "var(--mono)",
          padding: "3px 7px", borderRadius: 999,
          letterSpacing: "0.06em",
        }}>COVER</div>
      )}
      <div style={{
        position: "absolute", right: 8, top: 8,
        display: "flex", gap: 4,
      }}>
        <TileBtn>↑</TileBtn>
        <TileBtn>×</TileBtn>
      </div>
      <div style={{
        position: "absolute", right: 8, bottom: 8,
        background: "rgba(20,30,28,0.7)", color: "white",
        fontSize: 10, fontFamily: "var(--mono)",
        padding: "2px 6px", borderRadius: 4,
      }}>{String(index).padStart(2, "0")}</div>
      {/* Drag handle */}
      <div style={{
        position: "absolute", left: 8, bottom: 8,
        background: "rgba(255,255,255,0.92)",
        borderRadius: 4, padding: "3px 5px",
        cursor: "grab",
        display: "grid", placeItems: "center",
      }}>
        <svg width="11" height="11" viewBox="0 0 12 12">
          {[3, 6, 9].map(y => (
            <React.Fragment key={y}><circle cx="3" cy={y} r="1" fill="var(--ink-2)"/><circle cx="9" cy={y} r="1" fill="var(--ink-2)"/></React.Fragment>
          ))}
        </svg>
      </div>
    </div>
  );
}

function TileBtn({ children }) {
  return (
    <button style={{
      appearance: "none",
      width: 20, height: 20,
      background: "rgba(255,255,255,0.92)",
      border: "none", borderRadius: 4,
      display: "grid", placeItems: "center",
      cursor: "pointer", color: "var(--ink)", fontSize: 11, fontWeight: 600,
    }}>{children}</button>
  );
}

// ── Step 4: Description ─────────────────────────────────────────────────
function StepDescription() {
  const [lang, setLang] = useStateA("HU");
  const contents = {
    HU: {
      title: "Tópart melletti villa, klassz nappali kerttel",
      body: "Csendes utcában fekvő, 800 m²-es telken álló, egyszintes villa. Teljesen felújítva 2022-ben, hőszivattyúval és háromrétegű ablakokkal…",
      status: "Required · in Hungarian", done: true,
    },
    EN: {
      title: "Lakeside villa with mature garden",
      body: "Set on a sloping 800 m² plot a short walk from the lakeshore promenade, this single-storey villa was fully renovated in 2022 with new insulation, triple-glazed windows and a heat pump…",
      status: "Recommended", done: true,
    },
    NL: {
      title: "Villa aan het meer met volgroeide tuin",
      body: "",
      status: "Optional · not started", done: false,
    },
    DE: {
      title: "Seenvilla mit ausgewachsenem Garten",
      body: "",
      status: "Optional · not started", done: false,
    },
  };
  const c = contents[lang];
  return (
    <Card>
      {/* Language tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--line)", marginBottom: 18, marginTop: -4 }}>
        {["HU","EN","NL","DE"].map(L => {
          const active = lang === L;
          const isDone = contents[L].done;
          const isRequired = L === "HU";
          return (
            <button key={L}
              onClick={() => setLang(L)}
              style={{
                appearance: "none",
                background: "transparent", border: "none",
                padding: "10px 18px",
                color: active ? "var(--ink)" : "var(--muted)",
                fontWeight: active ? 600 : 500,
                fontSize: 13,
                cursor: "pointer",
                borderBottom: active ? "2px solid var(--accent)" : "2px solid transparent",
                marginBottom: -1,
                display: "inline-flex", alignItems: "center", gap: 6,
              }}>
              {L}
              {isRequired && <span style={{ color: "var(--accent-ink)" }}>*</span>}
              <span style={{
                width: 8, height: 8, borderRadius: 999,
                background: isDone ? "var(--positive)" : "var(--line-strong)",
              }}/>
            </button>
          );
        })}
        <div style={{ marginLeft: "auto", padding: "10px 4px" }} className="mono">{c.status}</div>
      </div>

      <FieldGroup label="Listing title">
        <Input value={c.title} />
      </FieldGroup>

      <div style={{ marginTop: 14 }}>
        <div className="mono" style={{ marginBottom: 6 }}>Description</div>
        <textarea
          value={c.body}
          onChange={() => {}}
          rows={9}
          placeholder={`Write a description in ${({HU:"Hungarian",EN:"English",NL:"Dutch",DE:"German"})[lang]}…`}
          style={{
            width: "100%",
            border: "1px solid var(--line-strong)",
            borderRadius: 8,
            padding: "10px 12px",
            background: "var(--bg)",
            fontSize: 14, lineHeight: 1.5,
            outline: "none",
            resize: "vertical",
            fontFamily: "inherit",
            color: "var(--ink-2)",
          }}
        />
        <div style={{
          marginTop: 8,
          display: "flex", justifyContent: "space-between",
          fontSize: 11.5, color: "var(--muted)",
        }}>
          <span>{(c.body || "").length} / 1500 characters</span>
          <button style={{
            appearance: "none", background: "transparent", border: "none",
            color: "var(--accent-ink)", cursor: "pointer",
            display: "inline-flex", alignItems: "center", gap: 4,
            fontSize: 12, fontWeight: 500,
          }}>
            ✦ Translate from HU
          </button>
        </div>
      </div>
    </Card>
  );
}

// ── Step 5: Publish ─────────────────────────────────────────────────────
function StepPublish() {
  const checks = [
    { l: "Basics complete",         done: true,  hint: "Type, price, address" },
    { l: "Specifications complete", done: true,  hint: "9 fields filled" },
    { l: "8 photos uploaded",       done: true,  hint: "Cover image selected" },
    { l: "HU description complete", done: true,  hint: "Required" },
    { l: "EN description complete", done: true,  hint: "Recommended" },
    { l: "NL description",          done: false, hint: "Optional · not started" },
    { l: "DE description",          done: false, hint: "Optional · not started" },
    { l: "Energy label confirmed",  done: true,  hint: "Label B" },
  ];
  return (
    <Card>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        {checks.map(c => (
          <div key={c.l} style={{
            display: "flex", alignItems: "flex-start", gap: 10,
            padding: "10px 12px",
            background: c.done ? "var(--surface)" : "transparent",
            borderRadius: 8,
            border: "1px solid var(--line)",
          }}>
            <span style={{
              width: 18, height: 18, marginTop: 1,
              borderRadius: 999,
              background: c.done ? "var(--positive)" : "transparent",
              border: c.done ? "none" : "1.5px solid var(--line-strong)",
              color: "white",
              display: "grid", placeItems: "center",
              fontSize: 11, fontWeight: 700,
              flexShrink: 0,
            }}>{c.done ? "✓" : ""}</span>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 500, color: c.done ? "var(--ink)" : "var(--ink-2)" }}>{c.l}</div>
              <div className="mono" style={{ marginTop: 2 }}>{c.hint}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20, padding: 16, background: "var(--surface)", borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500 }}>Listing duration</div>
          <div className="mono" style={{ marginTop: 2 }}>Renew automatically after expiry</div>
        </div>
        <SegRadio options={["60 days", "90 days", "180 days"]} value="90 days" />
      </div>
    </Card>
  );
}

// ── Live preview pane (right column) ────────────────────────────────────
function LivePreview({ step }) {
  return (
    <div style={{ position: "sticky", top: "calc(var(--topbar-h) + 28px)", display: "flex", flexDirection: "column", gap: 14 }}>
      <div className="mono" style={{ color: "var(--accent-ink)" }}>Live preview</div>
      <div style={{
        background: "var(--bg)",
        border: "1px solid var(--line)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
      }}>
        {/* Mini card resembling a public listing */}
        <div style={{ position: "relative" }}>
          <Swatch name="swatch-1" label="EXTERIOR · cover" slotId="add-1" height={170} rounded={0} placeholder="Drop the cover photo" />
          <div style={{
            position: "absolute", left: 10, top: 10,
            background: "var(--accent)", color: "white",
            fontSize: 10, fontWeight: 600,
            fontFamily: "var(--mono)",
            padding: "3px 7px", borderRadius: 999,
          }}>DRAFT</div>
        </div>
        <div style={{ padding: 14 }}>
          <div style={{ fontFamily: "var(--serif)", fontSize: 24, lineHeight: 1.1, color: "var(--ink)" }}>€285,000</div>
          <div style={{ fontSize: 13.5, fontWeight: 500, marginTop: 4 }}>Lakeside villa with mature garden</div>
          <div style={{ fontSize: 12, color: "var(--muted)" }}>Keszthely, Balaton</div>
          <div style={{
            display: "flex", gap: 12, marginTop: 10,
            paddingTop: 10, borderTop: "1px solid var(--line)",
            fontSize: 12, color: "var(--ink-2)",
          }}>
            <span><b>4</b> rooms</span>
            <span><b>180</b> m²</span>
            <span><b>800</b> m² plot</span>
          </div>
        </div>
      </div>

      {/* Tips by step */}
      <div style={{
        background: "var(--surface)",
        border: "1px dashed var(--line-strong)",
        borderRadius: "var(--radius-lg)",
        padding: 14,
        fontSize: 12.5, color: "var(--ink-2)",
        lineHeight: 1.5,
      }}>
        <div className="mono" style={{ marginBottom: 6 }}>Tip · step {step}</div>
        {step === 1 && "Use the official municipal address. Buyers from abroad search by region name first; pick the closest match."}
        {step === 2 && "Energy label is required by Hungarian law since 2024. If unsure, mark 'Provisional' and update later."}
        {step === 3 && "Listings with 8+ photos get 2.3× more enquiries. Lead with the exterior; an aerial shot at the end works well."}
        {step === 4 && "We auto-translate from Hungarian, but always proof EN/NL/DE — buyers notice. Avoid promotional language."}
        {step === 5 && "Published listings appear on the public site within 5 minutes. You can edit at any time without losing views."}
      </div>
    </div>
  );
}

// ── Form primitives ─────────────────────────────────────────────────────
function FieldGroup({ label, full, children }) {
  return (
    <label style={{ display: "block", gridColumn: full ? "1 / -1" : "auto" }}>
      <span className="mono" style={{ display: "block", marginBottom: 6 }}>{label}</span>
      {children}
    </label>
  );
}
function Grid({ cols, children }) {
  return <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 16 }}>{children}</div>;
}
function Input({ value, onChange = () => {} }) {
  return (
    <input value={value} onChange={onChange} style={{
      width: "100%", border: "1px solid var(--line-strong)", borderRadius: 8,
      padding: "10px 12px", background: "var(--bg)", fontSize: 14, outline: "none",
    }}/>
  );
}
function Select({ value, options }) {
  return (
    <div style={{
      width: "100%", border: "1px solid var(--line-strong)", borderRadius: 8,
      padding: "10px 12px", background: "var(--bg)", fontSize: 14,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      cursor: "pointer",
    }}>
      <span>{value}</span>
      <svg width="11" height="11" viewBox="0 0 12 12" style={{ opacity: 0.55 }}><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </div>
  );
}
function PriceInput({ value }) {
  return (
    <div style={{
      width: "100%", border: "1px solid var(--line-strong)", borderRadius: 8,
      padding: "10px 12px", background: "var(--bg)",
      display: "flex", alignItems: "center", gap: 6,
    }}>
      <span style={{ color: "var(--muted)" }}>€</span>
      <input defaultValue={value.toLocaleString("en-US")} style={{
        flex: 1, border: "none", outline: "none", background: "transparent",
        fontSize: 14, fontWeight: 500,
      }}/>
    </div>
  );
}
function Stepper2({ value }) {
  return (
    <div style={{
      width: "100%", border: "1px solid var(--line-strong)", borderRadius: 8,
      background: "var(--bg)", display: "flex", alignItems: "center",
    }}>
      <button style={{ width: 36, height: 36, background: "transparent", border: "none", cursor: "pointer", fontSize: 16, color: "var(--ink-2)" }}>−</button>
      <span style={{ flex: 1, textAlign: "center", fontSize: 14, fontWeight: 500 }}>{value}</span>
      <button style={{ width: 36, height: 36, background: "transparent", border: "none", cursor: "pointer", fontSize: 16, color: "var(--ink-2)" }}>+</button>
    </div>
  );
}
function SegRadio({ options, value }) {
  return (
    <div style={{ display: "inline-flex", background: "var(--surface)", borderRadius: 8, padding: 3, width: "100%" }}>
      {options.map(o => (
        <button key={o} style={{
          flex: 1, appearance: "none", border: "none",
          background: value === o ? "var(--bg)" : "transparent",
          color: "var(--ink)", padding: "7px 12px",
          borderRadius: 6, fontSize: 13, fontWeight: 500,
          cursor: "pointer",
          boxShadow: value === o ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
        }}>{o}</button>
      ))}
    </div>
  );
}
function ToggleChip({ label, on: initial }) {
  const [on, setOn] = useStateA(initial);
  return (
    <button onClick={() => setOn(v => !v)} style={{
      appearance: "none",
      background: on ? "var(--ink)" : "transparent",
      color: on ? "var(--bg)" : "var(--ink)",
      border: "1px solid", borderColor: on ? "var(--ink)" : "var(--line)",
      borderRadius: 999,
      padding: "5px 12px",
      fontSize: 12.5, fontWeight: 500,
      cursor: "pointer",
      display: "inline-flex", alignItems: "center", gap: 5,
    }}>
      <span style={{ opacity: on ? 1 : 0.5 }}>{on ? "✓" : "+"}</span>{label}
    </button>
  );
}

Object.assign(window, { AddPropertyView });
