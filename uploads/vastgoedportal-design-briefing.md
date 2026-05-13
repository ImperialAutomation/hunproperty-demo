# Design Briefing: Hongaars Vastgoedportal

## Voor gebruik in Claude Design
Gebruik dit document als prompt-basis. Begin met scherm 1 en werk door naar 4.
Refereer bij elk scherm naar de stijlrichtlijnen onderaan.

---

## Referentiesites

Bekijk deze sites voor inspiratie. De opmerkingen geven aan wat we wel en niet willen:

| Site | Opmerkingen |
|------|-------------|
| https://funda.nl | Zoekfunctie en to-the-point aanpak zijn top. Design is wat karig. |
| https://propertybalaton.co.uk/ | Uitstraling en filterfunctie spreken ons aan — dit is de richting. |
| https://honedimexma.com/property-type/ | Pragmatisch maar te goedkope uitstraling. Niet makkelijk zoeken. |
| https://interhomehungary.com/nl/woningen/ | Vergelijkbaar met honedimexma — te goedkope uitstraling. |
| https://ingatlan.com/ | Veel te rommelig. Onduidelijk waar je moet zoeken. Advertenties leiden af. |
| https://valdiboraingatlan.hu/ | Goede uitstraling en redelijk snelle filtering. |
| https://hagemanestate.com/en/ | Redelijke site, maar veel te grote header waardoor zoeken overschreeuwd wordt. |

**Samengevat:** combineer de zoekfunctionaliteit van Funda met de uitstraling van Property Balaton. Zoeken staat altijd voorop, geen visuele afleiding.

---

## Context

Een vastgoedportal voor Hongarije, gericht op internationale kopers (expats, vakantiehuiszoekers). Later uitbreidbaar naar de Hongaarse binnenlandse markt. Denk aan "Funda voor Hongarije" maar dan meertalig en met kaartnavigatie als kernfunctie (gebruikers kennen de Hongaarse regio's niet).

Werknaam: "HunProperty" (placeholder — mag aangepast worden in het ontwerp)

---

## Scherm 1: Homepage

### Layout (boven de vouw, geen scroll nodig)
- Compacte header: logo links, taalkiezer (HU/EN/NL/DE) en "Voor makelaars" link rechts
- Prominente zoekbalk met:
  - Tekstzoekveld met autocomplete (plaatsnamen, regio's)
  - Dropdowns: Type (Huis/Appartement/Perceel/Vakantiewoning), Prijs range, Kamers
  - Koop/Huur toggle
  - Zoekknop
- Interactieve kaart van Hongarije onder/naast de zoekbalk (klikbare regio's: Balaton, Budapest, Donauknie, Puszta, etc.)

### Onder de vouw
- "Uitgelichte woningen" — grid van 6-8 property cards
- Property card: foto, prijs, locatie, kamers/m2, makelaarlogo klein
- "Populaire regio's" — visuele blokken met foto en aantal woningen per regio

### Toon in de mockup
- HU, EN, NL, DE versie hoeft niet volledig uitgewerkt — toon de taalkiezer en gebruik Engels als primaire taal met een paar Hongaarse labels als voorbeeld

---

## Scherm 2: Zoekresultaten

### Layout
- Linker zijbalk of topbar met filters:
  - Prijs (slider of min/max)
  - Type woning
  - Kamers (min)
  - Oppervlakte (min m2)
  - Perceelgrootte (min m2)
  - Locatie/regio
  - Extra: zwembad, garage, nieuwbouw, gerenoveerd
- Toggle: lijstweergave / gridweergave / kaartweergave
- Kaartweergave: split-screen met lijst links, kaart rechts (zoals Funda)
- Resultaattelling bovenaan ("147 woningen gevonden")
- Sortering: prijs laag-hoog, prijs hoog-laag, nieuwste, oppervlakte

### Property card in resultaten
- Grote foto (met indicator "12 foto's")
- Prijs prominent
- Adres/locatie
- Kernkenmerken: kamers | badkamers | m2 woonoppervlak | m2 perceel
- Makelaar naam/logo klein
- Favoriet-hartje

### Voorbeelddata (gebruik deze)
- Villa in Keszthely, Balaton - EUR 285.000 - 4 kamers, 180m2, 800m2 perceel
- Appartement in Budapest District V - EUR 195.000 - 2 kamers, 75m2
- Boerderij in Somogy megye - EUR 89.000 - 3 kamers, 120m2, 3.200m2 perceel
- Nieuwbouw woning Siofok - EUR 320.000 - 5 kamers, 210m2, 600m2 perceel
- Vakantiehuis Heviz - EUR 145.000 - 2 kamers, 85m2, 400m2 perceel
- Perceel bij Badacsony - EUR 45.000 - 1.500m2
- Herenhuis Pecs - EUR 165.000 - 4 kamers, 155m2, 500m2 perceel
- Appartement Sopron - EUR 125.000 - 3 kamers, 92m2

---

## Scherm 3: Woning Detailpagina

### Layout
- Fotogalerij bovenaan (grote hoofdfoto + thumbnails, lightbox bij klik)
- Twee kolommen:
  - Links (breed): beschrijving, kenmerken, plattegrond
  - Rechts (smal): prijsblok, contactformulier makelaar, makelaarinfo

### Inhoud
- Prijs groot en duidelijk
- Adres
- Kenmerken tabel:
  - Type | Kamers | Badkamers | Woonoppervlak | Perceelgrootte
  - Bouwjaar | Staat (gerenoveerd/origineel/nieuwbouw)
  - Verwarming | Energielabel
  - Extra: garage, zwembad, kelder, tuin
- Beschrijvingstekst (lorem ipsum is prima)
- Locatie kaart (Leaflet/OpenStreetMap stijl)
- "Vergelijkbare woningen" onderaan (3-4 cards)

### Contactblok (rechterkolom)
- Makelaarlogo en naam
- Contactformulier: naam, email, telefoon, bericht (vooringevuld: "Ik ben geinteresseerd in deze woning")
- Telefoonnummer makelaar (klikbaar)

### Gebruik als voorbeeld
- De villa in Keszthely uit de zoekresultaten, volledig uitgewerkt

---

## Scherm 4: Makelaarsdashboard

### Layout
- Eigen navigatie (niet de publieke site-nav)
- Sidebar: Dashboard | Mijn woningen | Woning toevoegen | Statistieken | Profiel

### Dashboard overzicht
- KPI cards bovenaan: Actieve woningen (24) | Views deze maand (1.847) | Contactverzoeken (12) | Gemiddelde tijd op pagina (2:34)
- Recente contactverzoeken (tabel: datum, woning, naam, email, status)
- Top 5 meest bekeken woningen (mini-lijst)

### "Woning toevoegen" scherm (apart frame of tab)
- Stappen-formulier:
  1. Basisgegevens (type, prijs, adres)
  2. Kenmerken (kamers, m2, bouwjaar, etc.)
  3. Foto's uploaden (drag & drop, volgorde aanpasbaar)
  4. Beschrijving (meertalig: HU verplicht, EN/NL/DE optioneel)
  5. Preview & publiceer

---

## Stijlrichtlijnen

### Principes
- ZOEKEN STAAT CENTRAAL — alles wijkt voor de zoekfunctionaliteit
- Clean en professioneel, geen goedkope uitstraling
- Geen oversized headers, hero banners, of visueel lawaai
- Vergelijkbare sfeer als propertybalaton.co.uk: warm, premium, uitnodigend
- Functioneel als Funda: to-the-point, snelle filtering, kaartintegratie

### Wat te vermijden
- Advertenties of promotieblokken (zoals ingatlan.com)
- Te grote headers die zoeken wegdrukken (zoals hagemanestate.com)
- Goedkope/template-achtige uitstraling (zoals honedimexma.com)
- Visuele rommel en onduidelijke navigatie

### Typografie
- Modern, leesbaar sans-serif
- Prijzen en kerngetallen prominent en groot
- Voldoende witruimte

### Kleuren
- Nog geen vaste keuze — stel een passend kleurenpalet voor dat:
  - Premium en vertrouwenwekkend aanvoelt
  - Warm maar niet schreeuwerig
  - Goed werkt voor vastgoed (geen felle kleuren)
  - Voldoende contrast heeft voor leesbaarheid

### Responsief
- Desktop-first voor de mockups, maar houd mobile in gedachten
- Kaartweergave mag op mobile onder de resultaten klappen
