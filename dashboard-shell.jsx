// dashboard-shell.jsx — Sidebar nav + topbar for the agent dashboard.
// Distinct from the public site nav: cream surface, ink branding,
// counts/badges next to nav items.

const { useState: useStateD } = React;

function BottomTabBar({ view, setView }) {
  const tabs = [
    { id: "home",      l: "Home",       icon: TabHomeIcon },
    { id: "listings",  l: "Listings",   icon: TabListIcon,  badge: 24 },
    { id: "enquiries", l: "Enquiries",  icon: TabMailIcon,  badge: 12 },
    { id: "profile",   l: "Profile",    icon: TabUserIcon },
  ];
  return (
    <nav className="bottom-tab-bar" style={{
      display: "none",
      position: "fixed",
      left: 0, right: 0, bottom: 0,
      background: "var(--bg)",
      borderTop: "1px solid var(--line)",
      zIndex: 50,
      alignItems: "flex-end",
      justifyContent: "space-around",
      padding: "6px 8px",
      paddingBottom: "calc(6px + env(safe-area-inset-bottom, 0px))",
    }}>
      {tabs.map(tab => {
        const active = view === tab.id;
        const Icon = tab.icon;
        return (
          <button key={tab.id}
            onClick={() => setView(tab.id)}
            style={{
              appearance: "none",
              border: active ? "1px solid var(--line)" : "1px solid transparent",
              background: active ? "var(--accent-soft)" : "transparent",
              boxShadow: active ? "0 1px 4px rgba(20,30,28,0.06), inset 0 1px 0 rgba(255,255,255,0.7)" : "none",
              display: "flex", flexDirection: "column",
              alignItems: "center", gap: 4,
              padding: "6px 14px 5px",
              cursor: "pointer",
              color: active ? "var(--accent-ink)" : "var(--muted-2)",
              position: "relative",
              minWidth: 64,
              borderRadius: 12,
              transition: "all 0.2s ease",
            }}
          >
            <span style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: 24, height: 24 }}>
              <Icon active={active} />
              {tab.badge && (
                <span style={{
                  position: "absolute", top: -4, left: "calc(50% + 3px)",
                  background: "var(--accent)",
                  color: "white",
                  borderRadius: 999,
                  padding: "0 5px",
                  fontSize: 9,
                  fontWeight: 700,
                  lineHeight: "16px",
                  minWidth: 16,
                  textAlign: "center",
                  border: "2px solid var(--bg)",
                }}>{tab.badge}</span>
              )}
            </span>
            <span style={{
              fontSize: 11, fontWeight: active ? 600 : 500,
              letterSpacing: "0.01em",
              lineHeight: 1,
            }}>{tab.l}</span>
          </button>
        );
      })}
    </nav>
  );
}

function Sidebar({ view, setView }) {
  const items = [
    { id: "home",     l: "Dashboard",     icon: HomeIcon },
    { id: "listings", l: "My listings",   icon: ListIcon,  badge: 24 },
    { id: "add",      l: "Add property",  icon: PlusIcon },
    { id: "enquiries",l: "Enquiries",     icon: MailIcon, badge: 12, dot: true },
    { id: "stats",    l: "Statistics",    icon: ChartIcon },
    { id: "profile",  l: "Profile",       icon: UserIcon },
  ];
  return (
    <aside className="desktop-sidebar" style={{
      position: "fixed",
      left: 0, top: 0, bottom: 0,
      width: "var(--sidebar-w)",
      background: "var(--bg)",
      borderRight: "1px solid var(--line)",
      display: "flex", flexDirection: "column",
      padding: 14,
    }}>
      {/* Brand */}
      <a href="index.html" style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 8px 18px", borderBottom: "1px solid var(--line)", marginBottom: 14 }}>
        <span style={{ width: 26, height: 26, borderRadius: 6, background: "var(--ink)", display: "grid", placeItems: "center" }}>
          <svg width="14" height="14" viewBox="0 0 16 16">
            <path d="M2 9 L8 3 L14 9" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="4.2" y="9" width="7.6" height="4.5" fill="white" />
          </svg>
        </span>
        <span style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <span style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--ink)" }}>Otthon</span>
          <span className="mono" style={{ marginTop: 3, color: "var(--muted-2)", fontSize: 9.5 }}>Agent console</span>
        </span>
      </a>

      {/* Nav */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {items.map(it => {
          const active = view === it.id;
          const Icon = it.icon;
          return (
            <button key={it.id}
              onClick={() => setView(it.id)}
              style={{
                appearance: "none",
                background: active ? "var(--surface)" : "transparent",
                border: "none",
                color: active ? "var(--ink)" : "var(--ink-2)",
                padding: "9px 10px",
                borderRadius: 8,
                fontSize: 13.5,
                fontWeight: active ? 600 : 500,
                cursor: "pointer",
                display: "flex", alignItems: "center", gap: 10,
                textAlign: "left", width: "100%",
                position: "relative",
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = "var(--surface)"; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
            >
              {active && <span style={{
                position: "absolute", left: -14, top: 6, bottom: 6, width: 3,
                background: "var(--accent)", borderRadius: "0 3px 3px 0",
              }}/>}
              <Icon active={active} />
              <span>{it.l}</span>
              {it.badge && (
                <span style={{
                  marginLeft: "auto",
                  background: it.dot ? "var(--accent)" : "var(--surface-2)",
                  color: it.dot ? "white" : "var(--ink-2)",
                  borderRadius: 999,
                  padding: "1px 7px",
                  fontSize: 11,
                  fontWeight: 600,
                  minWidth: 22,
                  textAlign: "center",
                }}>{it.badge}</span>
              )}
            </button>
          );
        })}
      </nav>

      <div style={{ flex: 1 }} />

      {/* Bottom: agency card */}
      <div style={{
        padding: "12px 10px",
        borderTop: "1px solid var(--line)",
        marginTop: 14,
        display: "flex", flexDirection: "column", gap: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 999,
            overflow: "hidden",
            background: "linear-gradient(135deg, oklch(0.62 0.06 195), oklch(0.55 0.08 175))",
          }}>
            <image-slot id="agent-anna" shape="circle" placeholder="A" style={{ width: "100%", height: "100%", display: "block" }} />
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}>Anna Kovács</div>
            <div className="mono" style={{ marginTop: 1 }}>Balaton Estates</div>
          </div>
        </div>
        <a href="index.html" style={{
          fontSize: 12.5, color: "var(--muted)",
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "4px 0",
        }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          View public site
        </a>
      </div>
    </aside>
  );
}

function Topbar({ title, subtitle, actions }) {
  return (
    <header className="dash-topbar" style={{
      position: "sticky", top: 0,
      height: "var(--topbar-h)",
      background: "var(--bg)",
      borderBottom: "1px solid var(--line)",
      zIndex: 30,
      display: "flex", alignItems: "center",
      padding: "0 28px",
      gap: 18,
    }}>
      <a href="index.html" className="topbar-brand" style={{
        display: "none", alignItems: "center", gap: 8,
        color: "var(--ink)", textDecoration: "none",
      }}>
        <span style={{ width: 24, height: 24, borderRadius: 5, background: "var(--ink)", display: "grid", placeItems: "center", flexShrink: 0 }}>
          <svg width="12" height="12" viewBox="0 0 16 16">
            <path d="M2 9 L8 3 L14 9" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="4.2" y="9" width="7.6" height="4.5" fill="white" />
          </svg>
        </span>
        <span style={{ fontFamily: "var(--serif)", fontSize: 18 }}>Otthon</span>
      </a>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
        <h1 style={{
          margin: 0,
          fontFamily: "var(--serif)", fontWeight: 400,
          fontSize: 22, letterSpacing: "-0.005em",
        }}>{title}</h1>
        {subtitle && <span className="mono" style={{ marginTop: 4 }}>{subtitle}</span>}
      </div>

      <div className="topbar-search" style={{ flex: 1, maxWidth: 320, marginLeft: 32 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "var(--surface)",
          border: "1px solid var(--line)",
          borderRadius: 8,
          padding: "6px 12px",
          color: "var(--muted)",
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          <input
            placeholder="Search listings, enquiries…"
            style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 13.5 }}
          />
          <span className="mono" style={{ background: "var(--bg)", padding: "2px 6px", borderRadius: 4, border: "1px solid var(--line)" }}>⌘K</span>
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {actions}
        <IconBtn>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <span style={{
            position: "absolute", top: 6, right: 6,
            width: 7, height: 7, background: "var(--accent)",
            borderRadius: 999, border: "2px solid var(--bg)",
          }}/>
        </IconBtn>
      </div>
    </header>
  );
}

function IconBtn({ children }) {
  return (
    <button style={{
      appearance: "none",
      position: "relative",
      width: 34, height: 34,
      background: "transparent",
      border: "1px solid var(--line)",
      borderRadius: 8,
      cursor: "pointer",
      display: "grid", placeItems: "center",
      color: "var(--ink-2)",
    }}>{children}</button>
  );
}

// ── Sidebar icon set (14px, outline only) ───────────────────────────────
function HomeIcon()  { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>; }
function ListIcon()  { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>; }
function PlusIcon()  { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>; }
function MailIcon()  { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>; }
function ChartIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>; }
function UserIcon()  { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>; }

// ── Tab bar icon set (20px, outline/filled toggle) ──────────────────────
function TabHomeIcon({ active }) {
  return active
    ? <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0.5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
    : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
}
function TabListIcon({ active }) {
  return active
    ? <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0.5"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
    : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>;
}
function TabMailIcon({ active }) {
  return active
    ? <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6" fill="none" stroke="var(--bg)" strokeWidth="1.8"/></svg>
    : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
}
function TabUserIcon({ active }) {
  return active
    ? <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0.5"><circle cx="12" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/></svg>
    : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}

Object.assign(window, { Sidebar, BottomTabBar, Topbar, IconBtn });
