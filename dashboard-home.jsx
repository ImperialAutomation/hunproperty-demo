// dashboard-home.jsx — Dashboard overview: KPI cards, views chart,
// enquiries table, top viewed listings, listings expiring soon.

const { useState: useStateH2 } = React;

function DashboardHome({ onAdd }) {
  return (
    <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 24 }}>
      <KPIRow />
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.5fr) minmax(0, 1fr)", gap: 24 }}>
        <ViewsChart />
        <TopViewed />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.5fr) minmax(0, 1fr)", gap: 24 }}>
        <EnquiriesTable />
        <ExpiringSoon onAdd={onAdd} />
      </div>
    </div>
  );
}

// ── KPI row ─────────────────────────────────────────────────────────────
function KPIRow() {
  const kpis = [
    { label: "Active listings", value: 24,     unit: "",      delta: "+2",  trend: [12,14,14,15,16,18,19,20,22,22,23,24], positive: true  },
    { label: "Views · this month", value: "1,847", unit: "",   delta: "+18%", trend: [40,52,48,58,65,70,72,68,80,92,95,103], positive: true },
    { label: "Enquiries", value: 12,    unit: "new", delta: "+4",   trend: [2,1,3,2,4,3,5,3,4,6,5,4], positive: true, alert: true },
    { label: "Avg. time on page", value: "2:34", unit: "",   delta: "−0:12", trend: [180,175,170,168,162,165,160,158,155,154,156,154], positive: true },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
      {kpis.map(k => <KPI key={k.label} {...k} />)}
    </div>
  );
}

function KPI({ label, value, unit, delta, trend, positive, alert }) {
  return (
    <div style={{
      background: "var(--bg)",
      border: "1px solid var(--line)",
      borderRadius: "var(--radius-lg)",
      padding: 18,
      display: "flex", flexDirection: "column", gap: 12,
      position: "relative",
    }}>
      {alert && <span style={{
        position: "absolute", top: 14, right: 14,
        width: 7, height: 7, background: "var(--accent)",
        borderRadius: 999,
      }}/>}
      <div className="mono">{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <span style={{
          fontFamily: "var(--serif)", fontSize: 38, lineHeight: 1, color: "var(--ink)", letterSpacing: "-0.012em",
        }}>{value}</span>
        {unit && <span style={{ fontSize: 12, color: "var(--muted)" }}>{unit}</span>}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 4,
          fontSize: 12, fontWeight: 500,
          color: positive ? "var(--positive)" : "var(--negative)",
        }}>
          <span>{positive ? "↑" : "↓"}</span>{delta}
          <span style={{ color: "var(--muted)", fontWeight: 400 }}>vs last 30d</span>
        </span>
        <Sparkline data={trend} positive={positive} />
      </div>
    </div>
  );
}

function Sparkline({ data, positive }) {
  const w = 72, h = 26;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 2) - 1;
    return [x, y];
  });
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const fill = `${d} L ${w} ${h} L 0 ${h} Z`;
  const color = positive ? "var(--positive)" : "var(--negative)";
  return (
    <svg width={w} height={h}>
      <path d={fill} fill={color} opacity="0.10" />
      <path d={d} fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="2" fill={color} />
    </svg>
  );
}

// ── Views over time chart ───────────────────────────────────────────────
function ViewsChart() {
  // 30 days, with a bit of structure (weekend dips + uptrend)
  const series = [42,38,55,60,57,52,48, 50,58,72,68,75,80,62, 70,75,88,92,95,82,78, 86,95,110,118,120,98,92, 100,115];
  const w = 720, h = 220, pad = 20;
  const min = 0, max = Math.max(...series) * 1.15;
  const pts = series.map((v, i) => {
    const x = pad + (i / (series.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / (max - min)) * (h - pad * 2);
    return [x, y];
  });
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const fill = `${path} L ${pts[pts.length-1][0]} ${h - pad} L ${pts[0][0]} ${h - pad} Z`;
  return (
    <Card>
      <CardHead title="Views over time" subtitle="Last 30 days" right={<TimeFilter />} />
      <div style={{ position: "relative" }}>
        <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="vchart" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28"/>
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/>
            </linearGradient>
          </defs>
          {/* gridlines */}
          {[0.25, 0.5, 0.75, 1].map((f, i) => {
            const y = h - pad - f * (h - pad * 2);
            return <line key={i} x1={pad} x2={w-pad} y1={y} y2={y} stroke="var(--line)" strokeWidth="0.5" strokeDasharray="2 4"/>;
          })}
          <path d={fill}  fill="url(#vchart)" />
          <path d={path}  fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          {/* End point */}
          <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="4" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2"/>
          {/* Tooltip on last point */}
          <g transform={`translate(${pts[pts.length-1][0] - 35} ${pts[pts.length-1][1] - 38})`}>
            <rect width="70" height="28" rx="6" fill="var(--ink)"/>
            <text x="35" y="12" textAnchor="middle" fontFamily="var(--mono)" fontSize="8" letterSpacing="0.06em" fill="rgba(250,249,247,0.6)">MAY 13</text>
            <text x="35" y="23" textAnchor="middle" fontFamily="var(--sans)" fontSize="11" fontWeight="600" fill="white">115 views</text>
          </g>
        </svg>
        {/* X labels */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, padding: `0 ${pad}px`, fontFamily: "var(--mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.06em" }}>
          <span>APR 14</span><span>APR 21</span><span>APR 28</span><span>MAY 5</span><span>MAY 13</span>
        </div>
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18,
        marginTop: 18, paddingTop: 18, borderTop: "1px solid var(--line)",
      }}>
        <MiniStat label="Unique visitors" value="1,243" delta="+12%" positive />
        <MiniStat label="Bounce rate"     value="34%"   delta="−4%"  positive />
        <MiniStat label="Pages per visit" value="3.2"   delta="+0.4" positive />
        <MiniStat label="Mobile share"    value="58%"   delta="+6%"  positive />
      </div>
    </Card>
  );
}

function MiniStat({ label, value, delta, positive }) {
  return (
    <div>
      <div className="mono" style={{ marginBottom: 4 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
        <span style={{ fontSize: 18, fontWeight: 600, color: "var(--ink)" }}>{value}</span>
        <span style={{ fontSize: 11, color: positive ? "var(--positive)" : "var(--negative)" }}>{delta}</span>
      </div>
    </div>
  );
}

function TimeFilter() {
  const [v, setV] = useStateH2("30d");
  return (
    <div style={{ display: "inline-flex", background: "var(--surface)", borderRadius: 6, padding: 2 }}>
      {["7d", "30d", "90d", "1y"].map(o => (
        <button key={o} onClick={() => setV(o)} style={{
          appearance: "none", border: "none",
          background: v === o ? "var(--bg)" : "transparent",
          color: "var(--ink)",
          fontSize: 11, fontWeight: 500,
          padding: "4px 9px", borderRadius: 4, cursor: "pointer",
          boxShadow: v === o ? "0 1px 2px rgba(0,0,0,0.04)" : "none",
        }}>{o}</button>
      ))}
    </div>
  );
}

// ── Top viewed listings (mini list) ─────────────────────────────────────
function TopViewed() {
  const rows = [
    { title: "Lakeside villa", loc: "Keszthely",    views: 412, change: "+8%",  rank: 1 },
    { title: "Renovated apartment", loc: "Budapest D5", views: 318, change: "+24%", rank: 2 },
    { title: "Thermal-spa holiday home", loc: "Hévíz",  views: 268, change: "+12%", rank: 3 },
    { title: "Town house", loc: "Pécs",              views: 214, change: "−3%",  rank: 4, negative: true },
    { title: "New-build family home", loc: "Siófok",  views: 195, change: "+6%",  rank: 5 },
  ];
  return (
    <Card>
      <CardHead title="Top viewed · this month" subtitle="Listings driving the most traffic" />
      <div style={{ display: "flex", flexDirection: "column" }}>
        {rows.map(r => (
          <div key={r.rank} style={{
            display: "grid",
            gridTemplateColumns: "20px 1fr auto",
            alignItems: "center",
            gap: 12,
            padding: "10px 0",
            borderTop: r.rank > 1 ? "1px solid var(--line)" : "none",
          }}>
            <span className="mono" style={{ color: "var(--muted-2)" }}>{r.rank.toString().padStart(2, "0")}</span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 500, color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.title}</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>{r.loc}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "var(--serif)", fontSize: 18, lineHeight: 1, color: "var(--ink)" }}>{r.views}</div>
              <div style={{ fontSize: 11, color: r.negative ? "var(--negative)" : "var(--positive)", marginTop: 2 }}>{r.change}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ── Recent enquiries table ──────────────────────────────────────────────
function EnquiriesTable() {
  const rows = [
    { date: "May 13",  prop: "Lakeside villa · Keszthely",       name: "Mark Janssen",      email: "m.janssen@gmail.com",    status: "new",       lang: "NL" },
    { date: "May 13",  prop: "Thermal-spa holiday home · Hévíz", name: "Sarah Wagner",      email: "swagner@web.de",         status: "new",       lang: "DE" },
    { date: "May 12",  prop: "Renovated apartment · Budapest",   name: "Emma Coleman",      email: "emma.c@outlook.com",     status: "replied",   lang: "EN" },
    { date: "May 12",  prop: "Lakeside villa · Keszthely",       name: "Pieter de Wit",     email: "pieter@dewitfamily.nl",  status: "viewing",   lang: "NL" },
    { date: "May 11",  prop: "Vineyard plot · Badacsony",        name: "Henrik Larsson",    email: "h.larsson@gmail.com",    status: "replied",   lang: "EN" },
    { date: "May 10",  prop: "Town house · Pécs",                name: "Kis Béla",           email: "kis.bela@freemail.hu",   status: "closed",    lang: "HU" },
  ];
  return (
    <Card>
      <CardHead
        title="Recent enquiries"
        subtitle="6 of 12 unread"
        right={<a style={{ fontSize: 13, color: "var(--accent-ink)", cursor: "pointer" }}>View all →</a>}
      />
      <div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "60px 1fr 1fr 110px",
          gap: 12,
          padding: "0 0 8px",
        }}>
          {["Date", "Property", "Contact", "Status"].map(h => (
            <span key={h} className="mono">{h}</span>
          ))}
        </div>
        {rows.map((r, i) => (
          <div key={i} style={{
            display: "grid",
            gridTemplateColumns: "60px 1fr 1fr 110px",
            gap: 12,
            padding: "11px 0",
            borderTop: "1px solid var(--line)",
            alignItems: "center",
            fontSize: 13,
          }}>
            <span className="mono" style={{ color: "var(--ink-2)", textTransform: "none", letterSpacing: 0, fontSize: 12 }}>{r.date}</span>
            <span style={{ color: "var(--ink)", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.prop}</span>
            <span style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {r.name}
                <span className="mono" style={{ background: "var(--surface)", padding: "1px 5px", borderRadius: 3, fontSize: 9.5 }}>{r.lang}</span>
              </span>
              <span style={{ fontSize: 11.5, color: "var(--muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.email}</span>
            </span>
            <StatusBadge status={r.status} />
          </div>
        ))}
      </div>
    </Card>
  );
}

function StatusBadge({ status }) {
  const styles = {
    new:     { bg: "color-mix(in oklch, var(--accent) 16%, var(--bg))", color: "var(--accent-ink)", dot: "var(--accent)",     l: "New" },
    replied: { bg: "var(--surface)",                                     color: "var(--ink-2)",      dot: "var(--ink-2)",       l: "Replied" },
    viewing: { bg: "color-mix(in oklch, var(--positive) 14%, var(--bg))", color: "var(--positive)",  dot: "var(--positive)",   l: "Viewing booked" },
    closed:  { bg: "transparent",                                        color: "var(--muted-2)",    dot: "var(--muted-2)",     l: "Closed" },
  };
  const s = styles[status] || styles.new;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      background: s.bg,
      color: s.color,
      padding: "3px 9px",
      borderRadius: 999,
      fontSize: 11.5,
      fontWeight: 500,
      width: "fit-content",
      border: status === "closed" ? "1px solid var(--line)" : "none",
    }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: s.dot }}/>
      {s.l}
    </span>
  );
}

// ── Expiring soon ───────────────────────────────────────────────────────
function ExpiringSoon({ onAdd }) {
  const items = [
    { title: "Vineyard plot",            loc: "Badacsony",   days: 3 },
    { title: "Renovated apartment",      loc: "Budapest D5", days: 8 },
    { title: "City-edge apartment",      loc: "Sopron",      days: 12 },
  ];
  return (
    <Card>
      <CardHead title="Renewals coming up" subtitle="Listings expiring within 14 days" />
      <div style={{ display: "flex", flexDirection: "column" }}>
        {items.map((it, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "10px 0",
            borderTop: i > 0 ? "1px solid var(--line)" : "none",
            gap: 12,
          }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{it.title}</div>
              <div className="mono" style={{ marginTop: 2 }}>{it.loc}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                color: it.days <= 5 ? "var(--negative)" : "var(--muted)",
              }}>{it.days}d left</span>
              <button style={{
                appearance: "none", border: "1px solid var(--line-strong)",
                background: "transparent",
                padding: "5px 10px", borderRadius: 6,
                fontSize: 12, fontWeight: 500, cursor: "pointer",
              }}>Renew</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--line)" }}>
        <button onClick={onAdd} style={{
          appearance: "none",
          width: "100%",
          background: "var(--ink)",
          color: "var(--bg)",
          border: "none",
          borderRadius: 10,
          padding: "11px 14px",
          fontSize: 13.5,
          fontWeight: 500,
          cursor: "pointer",
          display: "inline-flex", justifyContent: "center", alignItems: "center", gap: 8,
        }}>
          + Add new listing
        </button>
      </div>
    </Card>
  );
}

// ── Generic card primitives ─────────────────────────────────────────────
function Card({ children }) {
  return (
    <div style={{
      background: "var(--bg)",
      border: "1px solid var(--line)",
      borderRadius: "var(--radius-lg)",
      padding: 18,
    }}>{children}</div>
  );
}

function CardHead({ title, subtitle, right }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, gap: 12 }}>
      <div>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>{title}</div>
        {subtitle && <div className="mono" style={{ marginTop: 3 }}>{subtitle}</div>}
      </div>
      {right}
    </div>
  );
}

Object.assign(window, { DashboardHome, Card, CardHead, StatusBadge });
