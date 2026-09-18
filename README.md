# Leitfaden — eigene Werkzeuge bauen / Build your own tools

Kurze Erklärung auf **Deutsch und Englisch**, dazu ein **englischer Leitfaden
für KI-Assistenzen**, der beschreibt, wie ein kleines Werkzeug für Leute ohne
Entwicklungsumgebung gebaut sein muss.

**Live:** https://grueneat.github.io/leitfaden/

## Die Idee

Jemand mit einem Browser und einem KI-Chat — kein Terminal, kein Editor, kein
Paketmanager — kopiert einen Absatz in den Chat, beschreibt sein Problem und
bekommt **eine einzige HTML-Datei**, die per Doppelklick läuft. Der Absatz
verweist die KI auf `llms.txt`; dort und in den verlinkten Abschnitten stehen
die Vorgaben.

Der Leitfaden ist bewusst **englisch**: Modelle folgen ihm dann zuverlässiger.
Die erzeugten Werkzeuge sprechen die Sprache der Nutzerin, meist Deutsch.

## Aufbau

| Adresse | Sprache | Für wen |
| --- | --- | --- |
| `/leitfaden/` | Deutsch | Menschen — kurze Erklärung, Absatz zum Kopieren |
| `/leitfaden/en/` | Englisch | Menschen — dasselbe |
| `/leitfaden/guide/` | Englisch | Der Leitfaden, lesbar gerendert |
| `/leitfaden/llms.txt` | Englisch | **Einstieg für KIs** — Kernregeln plus Abschnittsindex |
| `/leitfaden/llms-full.txt` | Englisch | Alle Abschnitte in einer Datei, ein Abruf |
| `/leitfaden/guide/<name>.md` | Englisch | Ein Abschnitt als reiner Text |

Elf Abschnitte, von „was überhaupt abzuliefern ist" bis GitHub Pages und
Beispiel-Repositories ganz am Schluss.

## Die zentrale Vorgabe

Ein Ordner, den die Nutzerin speichert; `index.html` läuft per Doppelklick.
Kein Build, kein Server, keine Installation. Eine Datei bei kleinen
Werkzeugen, mehrere wenn es sich lohnt — das ist eine Abwägung, keine Regel.

**Nicht** verwendbar sind ES-Module (`import` scheitert auf `file://` mit
CORS gegen Origin `null`) und `fetch()` auf lokale Dateien. Daten kommen
deshalb als `.js`-Datei, die ein Global setzt.

Auf `file://` in Chromium nachgemessen: `isSecureContext` ist `true`;
localStorage, IndexedDB, File System Access API, Canvas-Export, Zwischenablage,
CDN-Ressourcen und eigene CSS-/JS-/Bilddateien per relativem Pfad über
klassische Tags funktionieren — auch über Unterordner.

## Stack

- **Astro 5** mit Content Collections (Schema in `src/content.config.ts`)
- **Design-System** extern von `https://design-system.gruene.at/design-system.css`
- **Pagefind** als Postbuild-Schritt
- **GitHub Pages**, `base: '/leitfaden'`

## Lokal bauen

```bash
npm install
npm run check    # astro check, muss fehlerfrei sein
npm run build    # erzeugt dist/ und indiziert es
npm run dev
```

## Einen Abschnitt ergänzen

Ein Abschnitt = eine Markdown-Datei unter `src/content/guide/<name>.md`,
**auf Englisch**:

```yaml
---
title: Reading files
order: 2
summary: "Was drinsteht — landet in llms.txt und entscheidet, ob eine KI den Abschnitt holt."
read_when: "Wann dieser Abschnitt zählt. Eine Zeile."
---
```

`summary` und `read_when` sind keine Zierde: Sie sind das, was eine KI sieht,
bevor sie entscheidet, ob sie den Abschnitt abruft.

Interne Links relativ setzen — die Site liegt unter einem `base`-Pfad.

## Lizenz

[CC BY 4.0](LICENSE). Urheber: Die Grünen.
