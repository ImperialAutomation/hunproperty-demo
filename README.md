# HunProperty — Hungarian Real Estate Portal (Demo)

Interactive prototype of a Hungarian property portal, with white-label
tenant support planned. Built as a high-fidelity mockup.

## Live demo

After enabling GitHub Pages on this repo (Settings → Pages → Source:
"Deploy from a branch" → `main` / root), the demo will be available at:

```
https://imperialautomation.github.io/<repo-name>/
```

## Pages

| Route             | Description                                          |
|-------------------|------------------------------------------------------|
| `index.html`      | Homepage — search, regions, featured listings        |
| `results.html`    | Search results — grid, list, map view                |
| `detail.html`     | Property detail — gallery, specs, sidebar, similar   |
| `detail.html?id=4125` | Worked example — full photo set                  |
| `dashboard.html`  | Agent dashboard — KPIs, listings, add wizard         |

## Data

All ~114 listings are loaded from `data.jsx` and were derived from a scrape
of Capital '99 Balaton's public listings. Capital '99 is used as a demo
tenant for the planned white-label feature — no Capital '99 branding,
logos or trademarks are used in the customer-facing UI; only the listing
facts (titles, prices, locations, specs) populate the mockup.

## Tech

- Plain HTML + React (loaded via UMD `<script>` tags, no build step)
- Babel standalone for inline JSX transpilation in the browser
- Leaflet for the real-map view
- CSS custom properties for theming
- No backend — fully static, deployable to GitHub Pages / any static host

## Caveats

- The drag-and-drop image slots (in cards, gallery, dashboard) require a
  writable runtime to persist drops. On GitHub Pages they render but
  user-uploaded images won't be saved across reloads.
- Tweak panels (bottom-right of each page) are dev-time toolbars and live
  in the prototype only; they don't appear in production builds.

## Updating

Edit any file in this repo and push — GitHub Pages redeploys within
~1 minute. No build step.
