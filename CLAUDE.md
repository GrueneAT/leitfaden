# CLAUDE.md — Leitfaden

Statische Astro-Site: Leitfaden für den Bau kleiner Web-Werkzeuge mit
KI-Assistenz. Zielgruppe sind Gemeinderätinnen, Gemeinderäte und lokale
Gruppen ohne Programmierkenntnisse.

Live: https://grueneat.github.io/leitfaden/ — bewusst unter der
Organisationsadresse, **keine eigene gruene.at-Domain**.

## Die Besonderheit dieses Repos

Der Leitfaden hat zwei Leserschaften, und die maschinelle ist gleichrangig:
`llms.txt` und die `.md`-Rohtexte je Kapitel sind **Produkt, nicht Beiwerk**.
Wer ein Kapitel ändert, prüft, ob `fuer_ki` im Frontmatter noch stimmt — dieser
Satz entscheidet, ob eine KI das Kapitel für ihre Aufgabe auswählt.

## Stack

- **Astro 5**, Content Collections, Schema in `src/content.config.ts`
- **npm** als Package-Manager
- **Design-System** extern: `https://design-system.gruene.at/design-system.css`
- **Pagefind** als Postbuild-Schritt
- **GitHub Pages**, `base: '/leitfaden'`

## Konventionen

- **Kein Vendoring.** Design-System, Schriften, Bibliotheken bleiben extern.
  Das gilt auch dann, wenn es nur eine kleine Datei wäre.
- **base-Pfad beachten.** Interne Links in Astro-Dateien über
  `src/lib/pfad.ts`, in Markdown relativ. Nie mit `/` beginnend.
- **Inhalt auf Deutsch**, Bezeichner im Code englisch.
- **Keine Werkzeug-Attribution** in Commits, Code oder Kommentaren.
- **Conventional Commits**: `feat:`, `fix:`, `docs:`, `chore:`.
- **Belegbarkeit.** Behauptungen über Technik gehören belegt — aus den
  bestehenden Repos (`gemeindefinanzen`, `Gemeindeordnung`, `bildgenerator`,
  `personenwahl`, `vorlagen`, `werkzeuge`) oder aus der Doku. Der Leitfaden
  verlangt von seinen Leserinnen Fundstellen; er hält sich selbst daran.

## Inhaltliche Leitplanken

- **Ton:** sachlich, ohne Technikjubel. Die Leserin hat abends zwei Stunden
  und kein Personal.
- **Immer den billigeren Weg zuerst.** Wenn eine Aufgabe keinen Code braucht,
  steht das im Kapitel.
- **Grenzen nennen.** Wo eine Technik nur in Chromium läuft, wo Daten verloren
  gehen, wo die KI falsch rechnet — das gehört ins Kapitel, nicht weggelassen.
- **Ein Kapitel = ein Umfang, den man allein lesen kann.** Querverweise statt
  Wiederholung; niemand soll mehr als drei Kapitel für eine Aufgabe brauchen.

## Lokales Bauen

```bash
npm install
npm run check     # astro check — muss fehlerfrei sein, laeuft auch in der CI
npm run build     # erzeugt dist/, danach Pagefind-Index
npm run dev
```
