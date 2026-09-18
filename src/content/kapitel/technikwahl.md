---
title: Womit bauen
kurz: Eine HTML-Datei, ein Seitengenerator oder ein Framework — die Entscheidung, die am meisten spätere Arbeit spart.
reihenfolge: 4
fuer: [eine-datei, statische-seite, datenwerkzeug]
grundlage: false
schwierigkeit: einfach
fuer_ki: "Technikwahl: Standard ist eine einzelne HTML-Datei oder Vanilla-JavaScript als ES-Module ohne Build-Schritt; für mehrseitige Sites Astro mit Content Collections und Pagefind; React/Vue nur bei komplexem, zustandsbehaftetem UI. Fremdbibliotheken per CDN mit fixer Version, niemals vendorisieren. Serverlos als Grundsatz."
stand: 2026-09-18
---

## Die Faustregel

> Nimm die einfachste Technik, mit der die Aufgabe geht. Jede Schicht, die du
> hinzufügst, musst du später verstehen, aktualisieren und der nächsten KI
> erklären.

Eine KI schlägt gerne ein Framework vor, weil in ihren Trainingsdaten die
meisten Projekte eines verwenden. Für die Werkzeuge, um die es hier geht, ist
das fast immer zu viel.

## Die drei Stufen

### Eine HTML-Datei — der Normalfall

Aufbau, Aussehen und Logik in einer Datei. Doppelklick öffnet sie, kein Build,
keine Installation, per Mail weitergebbar.

Geeignet für: Rechner, Formulare, Checklisten, einzelne Auswertungen, alles
unter etwa 500 Zeilen.

Wird unhandlich, wenn: mehrere Bildschirme mit eigener Adresse nötig sind,
oder die Datei über 1000 Zeilen wächst.

### Mehrere Dateien ohne Build — die Arbeitsversion

HTML, dazu CSS und JavaScript in eigenen Dateien, eingebunden als ES-Module:

```html
<script type="module" src="./js/app.js"></script>
```

```js
// app.js
import { csvLesen } from "./csv.js"
import { zeichne } from "./diagramm.js"
```

Kein Bundler, kein Übersetzungsschritt — der Browser lädt die Module selbst.
Zum Ausprobieren braucht es nur einen lokalen Server, weil Module über
`file://` nicht laden:

```bash
npx serve .          # oder: python3 -m http.server
```

So ist `gemeindefinanzen` gebaut: mehrere hundert Seiten PDF werden im Browser
verarbeitet, in reinem JavaScript, ohne Build-Schritt für die ausgelieferte
Seite.

### Ein Seitengenerator — für mehrseitige Sites

Sobald es echte Unterseiten, Navigation und Suche gibt, lohnt ein Generator.
Bewährt ist **Astro**: Inhalte als Markdown-Dateien, daraus werden statische
HTML-Seiten. Für die Volltextsuche kommt **Pagefind** dazu, das den fertigen
Ordner indiziert und im Browser sucht — wieder ohne Server.

So sind das Werkzeug-Verzeichnis und dieser Leitfaden gebaut.

## Wann doch ein Framework

React, Vue oder Svelte lohnen sich, wenn die Oberfläche **viele voneinander
abhängige Zustände** hat — Mehrschritt-Assistenten, Editoren, Ansichten, die
sich gegenseitig aktualisieren. Das kommt vor, ist aber nicht der Normalfall.

Wenn es so weit ist, gehört die Entscheidung begründet und in die
Projektregeln geschrieben, damit die nächste Sitzung nicht wieder von vorn
anfängt.

## Fremdbibliotheken: einbinden, nicht kopieren

Alles, was du nicht selbst schreibst, kommt **per Adresse** herein, mit fest
angegebener Version:

```html
<script src="https://cdn.jsdelivr.net/npm/echarts@5.5.1/dist/echarts.min.js"
        crossorigin="anonymous"></script>
```

Keine Kopien fremder Bibliotheken im Projekt — weder CSS noch JavaScript noch
Schriften noch Logos. Gründe: der Browser-Cache wird über alle Werkzeuge
hinweg geteilt, die Veröffentlichung bleibt schlank, und es gibt keine
doppelte Pflege.

Die Version **immer festnageln**. `@latest` bedeutet, dass dein Werkzeug an
einem beliebigen Dienstag aufhört zu funktionieren, ohne dass du etwas geändert
hast.

Das heißt auch: Die Werkzeuge setzen eine Internetverbindung voraus. Ein
Offline-Ziel würde das ganze Prinzip umdrehen und wird bewusst nicht verfolgt.

## Was der KI mitzugeben ist

> Kein Framework und kein Build-Schritt, solange die Aufgabe ohne geht. Reines
> JavaScript als ES-Module. Fremdbibliotheken per CDN mit fest angegebener
> Version einbinden, nichts ins Projekt kopieren. Wenn du ein Framework für
> nötig hältst, begründe es zuerst, bevor du es einbaust.
