// dashboard.jsx — Top-level composition for the agent dashboard.

const DASH_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "terracotta",
  "defaultView": "home"
}/*EDITMODE-END*/;

const DASH_ACCENTS = {
  terracotta: { primary: "oklch(0.58 0.12 45)",  ink: "oklch(0.42 0.10 45)" },
  sage:       { primary: "oklch(0.55 0.08 145)", ink: "oklch(0.40 0.07 145)" },
  navy:       { primary: "oklch(0.48 0.09 250)", ink: "oklch(0.36 0.08 250)" },
  ochre:      { primary: "oklch(0.66 0.12 85)",  ink: "oklch(0.46 0.10 85)" },
};

function applyDashAccent(name) {
  const a = DASH_ACCENTS[name] || DASH_ACCENTS.terracotta;
  document.documentElement.style.setProperty("--accent", a.primary);
  document.documentElement.style.setProperty("--accent-ink", a.ink);
}

const TITLES = {
  home:      { t: "Dashboard",     s: "Welcome back, Anna · " + new Date(2026, 4, 13).toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long" }) },
  listings:  { t: "My listings",   s: "24 active · 3 drafts · 6 archived" },
  add:       { t: "Add a property",s: "Step-by-step listing wizard" },
  enquiries: { t: "Enquiries",     s: "12 unread · 47 this month" },
  stats:     { t: "Statistics",    s: "Performance across all listings" },
  profile:   { t: "Profile",       s: "Anna Kovács · Balaton Estates" },
};

function DashboardApp() {
  const [t, setTweak] = useTweaks(DASH_TWEAK_DEFAULTS);
  const [view, setView] = React.useState(t.defaultView);

  React.useEffect(() => { applyDashAccent(t.accent); }, [t.accent]);

  const meta = TITLES[view];
  const topActions = view === "home" ? (
    <button onClick={() => setView("add")} style={{
      appearance: "none",
      background: "var(--ink)",
      color: "var(--bg)",
      border: "none",
      borderRadius: 8,
      padding: "8px 14px",
      fontSize: 13.5,
      fontWeight: 500,
      cursor: "pointer",
      display: "inline-flex", alignItems: "center", gap: 6,
    }}>
      + Add listing
    </button>
  ) : null;

  return (
    <div data-screen-label="04 Agent dashboard" style={{ minHeight: "100vh" }}>
      <Sidebar view={view} setView={setView} />
      <BottomTabBar view={view} setView={setView} />
      <div className="dash-main" style={{ marginLeft: "var(--sidebar-w)" }}>
        <Topbar title={meta.t} subtitle={meta.s} actions={topActions} />

        {view === "home"      && <DashboardHome onAdd={() => setView("add")} />}
        {view === "add"       && <AddPropertyView />}
        {view === "listings"  && <Placeholder label="My listings (24)" />}
        {view === "enquiries" && <Placeholder label="Enquiries inbox" />}
        {view === "stats"     && <Placeholder label="Statistics — see Dashboard for an overview" />}
        {view === "profile"   && <Placeholder label="Profile & agency settings" />}
      </div>

      <TweaksPanel>
        <TweakSection label="Palette" />
        <TweakRadio label="Accent" value={t.accent}
          options={["terracotta", "sage", "navy", "ochre"]}
          onChange={(v) => setTweak('accent', v)} />
        <TweakSection label="View" />
        <TweakRadio label="Default" value={t.defaultView}
          options={["home", "add"]}
          onChange={(v) => { setTweak('defaultView', v); setView(v); }} />
      </TweaksPanel>
    </div>
  );
}

function Placeholder({ label }) {
  return (
    <div style={{
      margin: 28,
      padding: 60,
      borderRadius: "var(--radius-lg)",
      border: "1px dashed var(--line-strong)",
      background: "var(--bg)",
      textAlign: "center", color: "var(--muted)",
    }}>
      <div style={{ fontFamily: "var(--serif)", fontSize: 26, color: "var(--ink)", marginBottom: 6 }}>{label}</div>
      <div className="mono">Wireframed in this mockup · full screen on request</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<DashboardApp />);
