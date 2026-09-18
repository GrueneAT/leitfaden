---
title: Diagramme und Bilder
kurz: Zahlen als Diagramm, Grafiken zum Herunterladen, Sharepics fürs Gemeindeblatt — und wann keine Grafik die bessere Grafik ist.
reihenfolge: 7
fuer: [eine-datei, datenwerkzeug]
grundlage: false
schwierigkeit: mittel
fuer_ki: "Visualisierung: ECharts per CDN mit fixer Version plus gat-charts.js für Palette und Achsen-Vorgaben; SVG für einfache statische Grafiken; Canvas mit toBlob() für PNG-Export, Skalierungsfaktor für Druckauflösung. Diagrammtyp nach Aussage wählen, Achsen beschriften, Quelle und Stand angeben."
stand: 2026-09-18
---

## Erst die Aussage, dann der Diagrammtyp

Die meisten unbrauchbaren Diagramme entstehen, weil die Form vor der Aussage
gewählt wurde. Sag der KI, **was gezeigt werden soll**, nicht welcher Typ:

| Aussage | Form |
|---|---|
| „So viel mehr als im Vorjahr" | Balken, gruppiert |
| „So verteilt sich der Gesamtbetrag" | gestapelter Balken, nicht Torte |
| „So entwickelt es sich über die Jahre" | Linie |
| „Ein einziger Wert zählt" | große Zahl, gar kein Diagramm |
| „Woher kommt es, wohin geht es" | Sankey |

Eine Tortengrafik mit sieben Segmenten sagt weniger als eine sortierte Liste.
Bei einer einzelnen Kennzahl ist die Zahl selbst die beste Darstellung — das
Design-System hat dafür `gat-metric-card`.

## Diagramme: ECharts

In den bestehenden Werkzeugen wird ECharts verwendet, per CDN mit **fest
angegebener Version** eingebunden:

```html
<script src="https://cdn.jsdelivr.net/npm/echarts@5.5.1/dist/echarts.min.js"
        crossorigin="anonymous"></script>
```

Farben und Achsen-Vorgaben kommen aus dem Design-System, damit alle Werkzeuge
gleich aussehen:

```js
import { PALETTE, INK, tip, legende, grid }
  from "https://design-system.gruene.at/gat-charts.js"

const diagramm = echarts.init(document.getElementById("chart"))
diagramm.setOption({
  color: PALETTE,
  tooltip: tip(),
  legend: legende(),
  grid: grid(),
  xAxis: { type: "category", data: jahre },
  yAxis: { type: "value" },
  series: [{ type: "bar", data: werte }],
})
window.addEventListener("resize", () => diagramm.resize())
```

Die Palette entspricht 1:1 den Tokens `--gat-web-chart-1` bis `-8`. ECharts
selbst wird eigenständig geladen — das Design-System bündelt keine fremden
Bibliotheken.

Was ein Diagramm immer braucht: **beschriftete Achsen mit Einheit**, eine
**Quellenangabe** und einen **Stand**. Ohne das ist es im Gemeinderat
angreifbar.

## Einfache Grafiken: SVG

Für ein Schema, eine Karte, einen Ablauf braucht es keine Bibliothek. SVG
steht direkt im HTML, ist Text, versionierbar, skaliert verlustfrei und lässt
sich per CSS einfärben:

```html
<svg viewBox="0 0 120 40" role="img" aria-label="Anteil: 3 von 5 Fahrzeugen">
  <rect x="0" y="0" width="72" height="40" fill="var(--gat-web-chart-1)"/>
  <rect x="72" y="0" width="48" height="40" fill="var(--gat-web-chart-4)"/>
</svg>
```

Das `role`/`aria-label`-Paar ist nicht optional: eine Grafik ohne
Textalternative ist für einen Teil der Leute schlicht nicht vorhanden.

## Bilder erzeugen und herunterladen

Wenn das Werkzeug ein Bild ausgeben soll — Sharepic, Diagramm fürs
Gemeindeblatt, Plakat-Entwurf — läuft es über ein Canvas:

```js
canvas.toBlob((blob) => {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "grafik.png"
  a.click()
  URL.revokeObjectURL(url)
}, "image/png")
```

**Für den Druck** reicht die Bildschirmauflösung nicht. Es gibt zwei Wege:
das Canvas von vornherein in der Zielgröße anlegen und die Darstellung per CSS
kleinrechnen, oder beim Export mit einem Faktor hochskalieren. Der
`bildgenerator` erzeugt so Formate von A5 bis A2 in 300 dpi aus derselben
Oberfläche, die am Bildschirm ein Social-Media-Format zeigt.

Ein Diagramm bekommst du direkt aus ECharts als Bild:

```js
const datenUrl = diagramm.getDataURL({ pixelRatio: 3, backgroundColor: "#fff" })
```

Der weiße Hintergrund ist wichtig — ohne ihn wird ein PNG mit durchsichtigem
Grund in Word und PowerPoint schwarz.

## Fotos und erzeugte Bilder

Zwei Punkte, die in der politischen Kommunikation zählen:

- **Rechte klären.** Für Veröffentlichungen nur eigene Fotos oder klar
  lizenzierte Bilder. Eine Bildquelle gehört ins Impressum oder die Bildunterschrift.
- **KI-erzeugte Bilder kennzeichnen.** Wer synthetische Bilder in politischer
  Kommunikation ohne Hinweis verwendet, riskiert genau die Diskussion, die er
  nicht führen wollte.
