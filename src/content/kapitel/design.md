---
title: Aussehen
kurz: Mit vier Zeilen CSS sieht es aus wie ein grünes Werkzeug — und nicht wie ein unfertiges Formular.
reihenfolge: 8
fuer: [eine-datei, statische-seite]
grundlage: false
schwierigkeit: einfach
fuer_ki: "Design: Design-System per <link> von https://design-system.gruene.at/design-system.css einbinden, niemals kopieren. Es setzt keine Tag-Defaults — body braucht margin/background/color/font-family aus --gat-*-Tokens. Komponenten als gat-*-Klassen (gat-btn, gat-card, gat-callout, gat-table, gat-dropzone, gat-toast, gat-header, gat-metric-card). Eigene Farben nur, wenn kein Token passt."
stand: 2026-09-18
---

## Eine Zeile, und es passt

Das Grüne Design-System ist eine gehostete CSS-Datei. Kein npm, kein
Build-Schritt, keine Installation:

```html
<link rel="stylesheet" href="https://design-system.gruene.at/design-system.css">
```

Die Adresse ist stabil und wird zentral gepflegt — Verbesserungen kommen bei
allen Werkzeugen an, ohne dass du etwas tust.

**Kopiere die Datei niemals ins Projekt.** Eine lokale Kopie veraltet sofort,
und der gemeinsame Browser-Cache über alle grünen Werkzeuge hinweg geht
verloren. Dasselbe gilt für Logos, Schriften und Diagramm-Bibliotheken: per
Adresse einbinden, nicht kopieren.

## Die vier Zeilen, die niemand erwähnt

Das Design-System stylt bewusst **keine HTML-Tags** — kein `body`, kein `h1`.
Ohne eigenes Grundlayout rendert die Seite in Serifenschrift auf Weiß, und es
sieht aus, als hätte das Stylesheet nicht geladen. Das Minimum:

```css
body {
  margin: 0;
  background: var(--gat-color-surface);
  color: var(--gat-color-text);
  font-family: var(--gat-font-copy);
}
```

Ein vollständiges Minimalbeispiel steht unter
<https://design-system.gruene.at/examples/minimal.html>.

## Bausteine statt Eigenbau

Bevor du etwas selbst stylst, sieh im Style Guide nach —
<https://design-system.gruene.at/> zeigt jede Komponente mit Markup. Vorhanden
sind unter anderem:

| Baustein | Klasse | Wofür |
|---|---|---|
| Kopfleiste | `gat-header` | Logo, Titel, Navigation |
| Knopf | `gat-btn`, `gat-btn--primary` | Aktionen |
| Karte | `gat-card` | Übersichten, Kacheln |
| Hinweis | `gat-callout`, `--info/--warn/--error` | Warnungen, Erklärungen |
| Tabelle | `gat-table`, `--zebra`, `--compact` | Datenlisten, mit `gat-table__num` für Zahlen |
| Ablagefläche | `gat-dropzone` | Dateien hereinziehen |
| Meldung | `gat-toast`, `gat-toaster` | „gespeichert", „Fehler beim Einlesen" |
| Werkzeugleiste | `gat-toolbar` | Filter, Aktionen über einer Liste |
| Kennzahl | `gat-metric-card` | eine große Zahl |
| Etikett | `gat-tag`, `--ok/--warn/--error` | Status an einem Eintrag |

Farben, Abstände, Schriftgrößen und Radien kommen aus Tokens
(`--gat-color-*`, `--gat-space-*`, `--gat-text-*`, `--gat-radius-*`). Eigene
Werte nur dort, wo wirklich kein Token passt — sonst fällt dein Werkzeug beim
nächsten Design-Update aus der Reihe.

## Was trotzdem immer selbst zu prüfen ist

Das Design-System macht die Optik richtig, nicht die Bedienbarkeit:

- **Am Handy ansehen.** Die Hälfte der Leute öffnet es dort. Eine Tabelle mit
  zwölf Spalten ist auf 375 Pixel unbrauchbar, egal wie schön sie gestylt ist.
- **Ohne Maus bedienbar.** Mit der Tabulatortaste durch die Seite: Kommt man
  überall hin, sieht man immer, wo man ist?
- **Beschriftungen an Eingabefeldern.** Ein Platzhaltertext ist keine
  Beschriftung — er verschwindet beim Tippen.
- **Zustände zeigen.** Lädt gerade, fertig, fehlgeschlagen. Ein Werkzeug, das
  nach dem Klick zwanzig Sekunden nichts tut, gilt als kaputt.
- **Kontrast.** Graue Schrift auf hellem Grund ist auf einem Beamer im
  Sitzungssaal nicht lesbar.

## Was der KI mitzugeben ist

> Binde das Design-System per `<link>` von
> `https://design-system.gruene.at/design-system.css` ein, kopiere nichts ins
> Projekt. Setze das `body`-Grundlayout aus den `--gat-*`-Tokens. Verwende für
> Knöpfe, Karten, Hinweise, Tabellen, Ablageflächen und Meldungen die
> vorhandenen `gat-*`-Klassen statt eigener Stile. Die Seite muss auf 375
> Pixel Breite und mit der Tastatur allein bedienbar sein.
