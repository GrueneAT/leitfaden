# CLAUDE.md — Leitfaden

Statische Astro-Site. Zwei Dinge in einem Repo:

1. Eine **kurze Erklärung auf Deutsch und Englisch** für Menschen ohne
   Programmierkenntnisse.
2. Ein **englischer Leitfaden für KI-Assistenzen**, der vorgibt, wie ein
   kleines Werkzeug gebaut sein muss.

Live: https://grueneat.github.io/leitfaden/ — Organisationsadresse, **keine
eigene gruene.at-Domain**.

## Die zwei Regeln, die alles andere bestimmen

**Erstens: Sprache ist keine Geschmacksfrage.** Die Erklärungsseiten gibt es
auf Deutsch und Englisch. Der Leitfaden selbst (`src/content/guide/`,
`llms.txt`, `llms-full.txt`) ist **ausschließlich englisch** — Modelle folgen
ihm dann zuverlässiger. Keine deutschen Abschnitte anlegen.

**Zweitens: Die Zielgruppe hat keine Entwicklungsumgebung.** Kein Terminal,
kein Editor, kein npm, keine Adminrechte. Alles, was im Leitfaden steht, muss
ohne all das funktionieren. Die Standard-Auslieferung ist **eine einzige
HTML-Datei, die per Doppelklick läuft**.

Daraus folgt für Inhalte: keine ES-Module, kein Build-Schritt, kein lokaler
Server im Hauptpfad. `npx`, Editor-Empfehlungen und Mehrdateiprojekte gehören
ausschließlich in den letzten Abschnitt (`going-further`) und sind dort
ausdrücklich als Ausnahme gekennzeichnet.

## Geprüfte Grundlage

Auf `file://` in Chromium nachgemessen (nicht aus dem Gedächtnis):
`isSecureContext: true`; localStorage, IndexedDB, `showOpenFilePicker`,
`showSaveFilePicker`, `showDirectoryPicker`, Canvas-`toBlob`, Clipboard und
CDN-Ressourcen sind verfügbar. ECharts lädt als globales Script, die
`--gat-web-chart-*`-Tokens sind per `getComputedStyle` lesbar.
**Nicht** verfügbar: ES-Module, `fetch()` auf Nachbardateien.

Wer diese Aussagen ändert, misst nach.

## Stack

- **Astro 5**, Content Collection `guide`, Schema in `src/content.config.ts`
- **npm**, **Pagefind** als Postbuild, **GitHub Pages** mit `base: '/leitfaden'`
- Design-System extern: `https://design-system.gruene.at/design-system.css`

## Konventionen

- **Kein Vendoring.** Design-System, Schriften, Bibliotheken bleiben extern.
- **base-Pfad beachten.** Interne Links über `src/lib/pfad.ts`, in Markdown
  relativ. Nie mit `/` beginnend.
- **Keine Werkzeug-Attribution** in Commits, Code oder Kommentaren.
- **Conventional Commits**: `feat:`, `fix:`, `docs:`, `chore:`.
- **Belegbarkeit.** Technische Behauptungen im Leitfaden gehören belegt — aus
  den bestehenden Repos (`gemeindefinanzen`, `Gemeindeordnung`,
  `bildgenerator`, `Personenwahl`, `werkzeuge`) oder nachgemessen.

## Ton

Sachlich, kurz, ohne Technikjubel. Die Erklärungsseiten sind bewusst knapp —
wer dort Absätze hinzufügt, muss begründen, warum sie nicht in den Leitfaden
gehören. Der Leitfaden selbst darf dicht sein: ihn liest eine Maschine.

Grenzen werden genannt, nicht weggelassen: wo etwas nur in Chromium läuft, wo
Daten verlorengehen, wo die KI falsch rechnet.

## Lokales Bauen

```bash
npm install
npm run check     # astro check — muss fehlerfrei sein, laeuft auch in der CI
npm run build     # erzeugt dist/, danach Pagefind-Index
npm run dev
```
