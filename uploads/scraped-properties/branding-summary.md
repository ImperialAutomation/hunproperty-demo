# Capital 99 / Property Balaton — Branding Guide

Geëxtraheerd van propertybalaton.co.uk op 2026-05-13.

## Logo's

| Bestand | Beschrijving | Formaat |
|---------|-------------|---------|
| `images/logo-header.png` | Header logo (blauw op wit) | 162×48 |
| `images/logo-header-2x.png` | Header logo retina @2x | 324×96 |
| `images/logo-footer.png` | Footer logo (wit op donker) | 162×49 |
| `images/logo-footer-2x.png` | Footer logo retina @2x | 324×98 |
| `images/logo-full.png` | Full-size logo | 324×96 |
| `images/logo-300w.png` | Logo 300px breed | 300×89 |
| `images/favicon.ico` | Favicon | ICO |

## Kleuren

### Primaire kleuren
| Kleur | Hex | RGB | Gebruik |
|-------|-----|-----|---------|
| Donker blauw | `#093C51` | rgb(9, 60, 81) | Buttons, CTA, accenten |
| Medium blauw | `#2DA6D8` | rgb(45, 166, 216) | Links, logo-kleur |
| Licht blauw | `#80C0DB` | rgb(128, 192, 219) | Navigatiebalk achtergrond |
| Blauwgrijs | `#4DA7CD` | rgb(77, 167, 205) | E-mail link |

### Neutrale kleuren
| Kleur | Hex | RGB | Gebruik |
|-------|-----|-----|---------|
| Donkergrijs | `#545454` | rgb(84, 84, 84) | Body tekst, headings, prijzen |
| Middengrijs | `#A6AAB1` | rgb(166, 170, 177) | Subtekst, footer tekst |
| Donkergrijs 2 | `#3E4146` | rgb(62, 65, 70) | Secundaire links |
| Zwart | `#333333` | CSS var --dark | Tekst accent |
| Wit | `#FFFFFF` | CSS var --light | Achtergronden |

### Accentkleuren
| Kleur | Hex | RGB | Gebruik |
|-------|-----|-----|---------|
| Groen | `#27AE60` | rgb(39, 174, 96) | Telefoon/call link |
| Goud | `#DEB03D` | rgb(222, 176, 61) | Kaart/locatie link |

## Typografie

- **Font family**: Lato (lokaal geladen, geen Google Fonts)
- **Body**: 16px, weight 400
- **H1**: 34px, weight 400
- **H2**: 26px, weight 400
- **H3**: 26px (section) / 15px (widget), weight 400/700
- **Buttons**: 13px, weight 500
- **Small/labels**: 13px, weight 700

## Button stijlen

### Primary button (CTA)
- Achtergrond: `#093C51` (donker blauw)
- Tekst: wit
- Border: 1px solid `#093C51`
- Border-radius: 2px

### Secondary button ("Show details")
- Achtergrond: wit
- Tekst: `#093C51` (donker blauw)
- Border: 1px solid `#093C51`
- Border-radius: 2px

### Slider/carousel buttons
- Achtergrond: rgba(255, 255, 255, 0.8) (semi-transparant wit)
- Tekst: zwart

## Navigatiebalk
- Achtergrond: `#80C0DB` (licht blauw)
- Tekst: wit
- Font: Lato 16px

## Footer
- Achtergrond: donker (via achtergrondafbeelding/overlay)
- Tekst: `#A6AAB1` (grijs)
- Links: `#2DA6D8` (blauw)

## CSS Variables (custom theme)
```css
--dark: #333;
--light: #fff;
--fadefrom: rgba(255,255,255,1);
--fadeto: rgba(255,255,255,0);
--dark-shadow: rgba(0,0,0,0.40);
```

## WordPress Theme
- Theme: `capital` (custom)
- Stylesheet: `style.css?ver=2023.9.12_080857`
- Maps: MapPress + Leaflet + MapLibre GL

## Samenvatting stijl
De site gebruikt een **koel blauw kleurenpalet** dat vertrouwen en professionaliteit uitstraalt:
- Donker blauw (#093C51) als primaire actie-kleur
- Medium blauw (#2DA6D8) als link-kleur
- Licht blauw (#80C0DB) als navigatie-achtergrond
- Veel witruimte, clean layout
- Lato als universeel lettertype — modern, leesbaar sans-serif
- Minimale border-radius (2px) — strak, niet rond
