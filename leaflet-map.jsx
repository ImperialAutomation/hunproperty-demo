// leaflet-map.jsx — Real Hungary basemap (CartoDB Positron tiles)
//
// Two exported components:
//   <HungaryRegionMap /> — homepage: region pins (Budapest, Balaton, etc.)
//   <HungaryPropertyMap /> — results page: per-property price pins
//
// Both use Leaflet with the CartoDB Positron tile style, which gives the
// clean light-grey monochrome look from the reference. Tiles are public.

const { useEffect: useEffectL, useRef: useRefL, useState: useStateL } = React;

// Hungary bounding box (roughly)
const HUNGARY_BOUNDS = [[45.7, 16.0], [48.6, 22.9]];
const HUNGARY_CENTER = [47.16, 19.5];

// Region coords (lat, lng) + listing counts
const REGION_PINS = [
  { id: "budapest", name: "Budapest", lat: 47.4979, lng: 19.0402, count: 1284, primary: true },
  { id: "balaton", name: "Lake Balaton", lat: 46.8480, lng: 17.7280, count: 108, primary: true },
  { id: "danube", name: "Danube Bend", lat: 47.7900, lng: 19.0700, count: 187 },
  { id: "sopron", name: "Sopron / West", lat: 47.6850, lng: 16.5840, count: 224 },
  { id: "pecs", name: "Pécs / South", lat: 46.0727, lng: 18.2330, count: 158 },
  { id: "puszta", name: "Great Plain", lat: 46.9070, lng: 19.6840, count: 96 },
  { id: "debrecen", name: "Debrecen / East", lat: 47.5316, lng: 21.6273, count: 142 },
  { id: "tokaj", name: "Tokaj / NE", lat: 48.1218, lng: 21.4090, count: 38 },
];

// Property lat/lng — legacy fixture data, kept as a fallback for any
// property without lat/lng on the object itself. New listings carry
// p.lat / p.lng directly.
const PROP_LATLNG = {
  "kesz-villa": { lat: 46.7686, lng: 17.2444 },
  "bp-d5-apt": { lat: 47.4979, lng: 19.0521 },
  "somogy-farm": { lat: 46.4790, lng: 17.6510 },
  "siofok-new": { lat: 46.9050, lng: 18.0594 },
  "heviz-holiday": { lat: 46.7886, lng: 17.1864 },
  "badacsony-plot": { lat: 46.7944, lng: 17.4944 },
  "pecs-town": { lat: 46.0727, lng: 18.2330 },
  "sopron-apt": { lat: 47.6850, lng: 16.5840 },
};

// Deterministic per-id 0..1 hash so coincident lat/lng (Hévíz, Keszthely
// have dozens of listings at the same point) can be nudged apart without
// losing per-id stability across renders.
function hash01L(s, salt) {
  let h = 2166136261 ^ salt;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 10000) / 10000;
}

// Tile attribution strip is required for OSM/Carto.
const CARTO_TILES = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
const CARTO_ATTRIB = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

// Shared style injected once for the custom marker bubbles
function ensureMarkerCSS() {
  if (document.getElementById("hp-leaflet-css")) return;
  const css = `
    .hp-pin {
      background: var(--bg, #fafaf7);
      color: var(--ink, #1b2723);
      border: 1px solid var(--line-strong, #c8c2b6);
      border-radius: 999px;
      padding: 4px 10px;
      font: 600 11.5px/1 "Instrument Sans", system-ui, sans-serif;
      white-space: nowrap;
      box-shadow: 0 2px 6px rgba(20,30,28,0.18);
      transform: translate(-50%, -50%);
      cursor: pointer;
      display: inline-flex; align-items: center; gap: 6px;
      transition: background 0.12s, color 0.12s, transform 0.12s;
    }
    .hp-pin .dot { width: 6px; height: 6px; border-radius:999px; background: var(--accent, #c46a48); }
    .hp-pin-active, .hp-pin:hover {
      background: var(--ink, #1b2723);
      color: var(--bg, #fafaf7);
      border-color: var(--ink, #1b2723);
      z-index: 1000 !important;
    }
    .hp-pin-active .dot, .hp-pin:hover .dot { background: var(--bg, #fafaf7); }

    .hp-region-pin {
      background: var(--bg, #fafaf7);
      color: var(--ink, #1b2723);
      border: 1px solid var(--line-strong, #c8c2b6);
      border-radius: 12px;
      padding: 8px 12px;
      font-family: "Instrument Sans", system-ui, sans-serif;
      white-space: nowrap;
      box-shadow: 0 4px 14px rgba(20,30,28,0.10);
      transform: translate(-50%, -50%);
      cursor: pointer;
      display: flex; flex-direction: column;
      transition: background 0.15s, color 0.15s;
    }
    .hp-region-pin.primary { padding: 10px 14px; }
    .hp-region-pin .name {
      font-family: "Instrument Serif", Georgia, serif;
      font-size: 16px; line-height: 1; letter-spacing: -0.005em;
    }
    .hp-region-pin.primary .name { font-size: 19px; }
    .hp-region-pin .meta {
      font-family: "JetBrains Mono", monospace;
      font-size: 9.5px; letter-spacing: 0.06em; text-transform: uppercase;
      color: var(--muted, #7a7568); margin-top: 4px;
    }
    .hp-region-pin:hover {
      background: var(--ink, #1b2723);
      color: var(--bg, #fafaf7);
      border-color: var(--ink, #1b2723);
    }
    .hp-region-pin:hover .meta { color: rgba(250,249,247,0.65); }

    /* Hide Leaflet defaults that look webby */
    .leaflet-container { background: var(--surface, #ece8df) !important; font-family: inherit !important; }
    .leaflet-control-attribution {
      font: 9.5px/1.4 "JetBrains Mono", monospace !important;
      background: rgba(250,249,247,0.85) !important;
      color: var(--muted, #7a7568) !important;
      padding: 2px 6px !important;
    }
    .leaflet-control-attribution a { color: var(--ink-2, #2c3a36) !important; }
    .leaflet-bar {
      border: 1px solid var(--line, #d6d1c5) !important;
      box-shadow: 0 2px 6px rgba(20,30,28,0.06) !important;
      border-radius: 8px !important;
      overflow: hidden;
    }
    .leaflet-bar a {
      background: var(--bg, #fafaf7) !important;
      color: var(--ink, #1b2723) !important;
      border-bottom: 1px solid var(--line, #d6d1c5) !important;
      width: 30px !important; height: 30px !important; line-height: 30px !important;
    }
    .leaflet-bar a:last-child { border-bottom: none !important; }
    .leaflet-bar a:hover { background: var(--surface, #ece8df) !important; }
  `;
  const tag = document.createElement("style");
  tag.id = "hp-leaflet-css";
  tag.textContent = css;
  document.head.appendChild(tag);
}

// ── Region map (homepage) ───────────────────────────────────────────────
function HungaryRegionMap({ height = "auto" }) {
  const ref = useRefL(null);
  const mapRef = useRefL(null);

  useEffectL(() => {
    ensureMarkerCSS();
    if (!ref.current || mapRef.current) return;

    const map = L.map(ref.current, {
      zoomControl: true,
      scrollWheelZoom: false,
      attributionControl: true,
      zoomSnap: 0.5,
    });
    map.fitBounds(HUNGARY_BOUNDS, { padding: [10, 10] });

    L.tileLayer(CARTO_TILES, {
      attribution: CARTO_ATTRIB,
      subdomains: "abcd",
      maxZoom: 18,
    }).addTo(map);

    REGION_PINS.forEach(r => {
      const icon = L.divIcon({
        className: "",
        html: `<div class="hp-region-pin ${r.primary ? "primary" : ""}">
                 <span class="name">${r.name}</span>
                 <span class="meta">${r.count.toLocaleString()} listings</span>
               </div>`,
        iconSize: null,
      });
      L.marker([r.lat, r.lng], { icon }).addTo(map);
    });

    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, []);

  return (
    <div style={{
      position: "relative",
      width: "100%",
      aspectRatio: height === "auto" ? "760 / 460" : undefined,
      height: height === "auto" ? undefined : height,
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      border: "1px solid var(--line)",
      background: "var(--surface)",
    }}>
      <div ref={ref} style={{ position: "absolute", inset: 0 }} />
      {/* Small caption */}
      <div style={{
        position: "absolute", left: 12, top: 12,
        background: "var(--bg)", border: "1px solid var(--line)",
        borderRadius: 999, padding: "5px 11px",
        fontSize: 11, color: "var(--muted)",
        display: "flex", alignItems: "center", gap: 6,
        zIndex: 500, pointerEvents: "none",
      }}>
        <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--accent)" }} />
        Tap a region to filter
      </div>
    </div>
  );
}

// ── Property map (results page) ─────────────────────────────────────────
function HungaryPropertyMap({ properties, hoverId, onHover, onPick }) {
  const ref = useRefL(null);
  const mapRef = useRefL(null);
  const markersRef = useRefL({});

  // Initialize once
  useEffectL(() => {
    ensureMarkerCSS();
    if (!ref.current || mapRef.current) return;

    const map = L.map(ref.current, {
      zoomControl: true,
      scrollWheelZoom: true,
      attributionControl: true,
      zoomSnap: 0.5,
    });
    // Center on Lake Balaton where most demo listings are clustered
    map.setView([46.75, 17.25], 9);

    L.tileLayer(CARTO_TILES, {
      attribution: CARTO_ATTRIB,
      subdomains: "abcd",
      maxZoom: 18,
    }).addTo(map);

    mapRef.current = map;
    // Expose for external invalidateSize calls (e.g. mobile toggle)
    window.__hunPropertyMap = map;
    return () => { map.remove(); mapRef.current = null; window.__hunPropertyMap = null; };
  }, []);

  // Sync markers with properties
  useEffectL(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear old markers
    Object.values(markersRef.current).forEach(m => map.removeLayer(m));
    markersRef.current = {};

    properties.forEach(p => {
      // Prefer the per-property lat/lng (new data); fall back to the legacy lookup.
      let lat, lng;
      if (p.lat != null && p.lng != null) {
        // Small jitter so dozens of listings at the same city centroid
        // (Hévíz, Keszthely) spread visibly rather than stacking.
        const jx = (hash01L(p.id, 0) - 0.5) * 0.012; // ~0.6 km E/W
        const jy = (hash01L(p.id, 1) - 0.5) * 0.008; // ~0.4 km N/S
        lat = p.lat + jy;
        lng = p.lng + jx;
      } else {
        const c = PROP_LATLNG[p.id];
        if (!c) return;
        lat = c.lat; lng = c.lng;
      }
      const label = "€" + (p.price / 1000).toFixed(0) + "k";
      const icon = L.divIcon({
        className: "",
        html: `<div class="hp-pin" data-id="${p.id}"><span class="dot"></span>${label}</div>`,
        iconSize: null,
      });
      const m = L.marker([lat, lng], { icon, riseOnHover: true }).addTo(map);
      m.on("mouseover", () => onHover && onHover(p.id));
      m.on("mouseout", () => onHover && onHover(null));
      m.on("click", () => onPick && onPick(p.id));
      markersRef.current[p.id] = m;
    });
  }, [properties]);

  // Apply hover state — toggle the .hp-pin-active class on the active marker
  useEffectL(() => {
    Object.entries(markersRef.current).forEach(([id, m]) => {
      const el = m.getElement();
      if (!el) return;
      const pin = el.querySelector(".hp-pin");
      if (!pin) return;
      if (id === hoverId) pin.classList.add("hp-pin-active");
      else pin.classList.remove("hp-pin-active");
    });
  }, [hoverId]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div ref={ref} style={{ position: "absolute", inset: 0 }} />
      {/* Search-this-area badge (decorative) */}
      <div style={{
        position: "absolute", top: 14, left: "50%",
        transform: "translateX(-50%)",
        background: "var(--bg)",
        border: "1px solid var(--line)",
        borderRadius: 999,
        padding: "8px 14px",
        fontSize: 13, fontWeight: 500,
        display: "inline-flex", alignItems: "center", gap: 8,
        boxShadow: "0 4px 14px rgba(20,30,28,0.08)",
        zIndex: 500,
        cursor: "pointer",
      }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
        </svg>
        Search this area
      </div>
    </div>
  );
}

Object.assign(window, { HungaryRegionMap, HungaryPropertyMap });
