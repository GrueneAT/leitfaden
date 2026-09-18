# Leitfaden — eigene Werkzeuge bauen

Leitfaden für Gemeinderätinnen, Gemeinderäte und lokale Gruppen, die mit einer
KI-Assistenz ein eigenes kleines Web-Werkzeug bauen wollen: einen Rechner für
die nächste Sitzung, eine Auswertung eines Voranschlags, eine kleine Website.

**Live:** https://grueneat.github.io/leitfaden/

Der Leitfaden hat zwei Zielgruppen:

- **Menschen** — die Website erklärt, was sich zu bauen lohnt und wie man
  anfängt.
- **KI-Assistenzen** — man kann eine KI auf diesen Leitfaden verweisen, sie
  liest `llms.txt`, holt sich die passenden Kapitel und hält sich an die
  Vorgaben.

## Maschinenlesbare Schnittstelle

| Adresse | Inhalt |
| --- | --- |
| `/leitfaden/llms.txt` | Übersicht aller Kapitel, eine Zeile Zusammenfassung je Kapitel |
| `/leitfaden/kapitel/<name>.md` | Ein Kapitel als reiner Markdown-Text |
| `/leitfaden/kapitel/<name>/` | Dasselbe Kapitel als Webseite |
| `/leitfaden/fuer-ki/` | Textbausteine zum Kopieren (Prompt, Projektregeln) |

## Stack

- **Astro 5** mit Content Collections (Schema in `src/content.config.ts`)
- **Design-System** als externes Stylesheet von
  `https://design-system.gruene.at/design-system.css` — kein Vendoring
- **Pagefind** für clientseitige Volltextsuche über `dist/`
- **GitHub Pages** als Hosting, Unterordner-Adresse (`base: '/leitfaden'`)

## Lokal bauen

```bash
npm install
npm run dev      # Entwicklungsserver
npm run build    # erzeugt dist/ und indiziert es mit Pagefind
```

## Ein Kapitel ergänzen oder ändern

Ein Kapitel = eine Markdown-Datei unter `src/content/kapitel/<name>.md`:

```yaml
---
title: Dateien lesen und zurückschreiben
kurz: Ein bis zwei Sätze, erscheinen auf der Kapitelkarte.
reihenfolge: 4
fuer: [eine-datei, datenwerkzeug]     # IDs aus src/lib/projekttypen.ts
schwierigkeit: mittel                 # einfach | mittel | fortgeschritten
fuer_ki: "Ein Satz, den eine KI als Zusammenfassung übernehmen kann."
stand: 2026-09-18
---
```

`fuer_ki` ist keine Zierde — der Satz landet in `llms.txt` und entscheidet,
ob eine KI dieses Kapitel für ihre Aufgabe holt. Er soll benennen, welche
konkreten Vorgaben im Kapitel stehen, nicht welches Thema es behandelt.

Interne Links im Markdown relativ setzen (`../dateien/`, `../../fuer-ki/`) —
die Site liegt unter einem `base`-Pfad, absolute Pfade zeigen ins Leere.

## Lizenz

[CC BY 4.0](LICENSE). Urheber: Die Grünen.
