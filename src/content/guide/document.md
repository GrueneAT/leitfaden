---
title: Documenting the tool
order: 11
summary: "Document inside the tool first — a one-line purpose under the title, inline help at the field that needs it, a data-handling sentence, and a date. Then one short plain-text readme in the folder. Comment the domain decisions in the code, not the JavaScript. No docs folder, no changelog ceremony."
read_when: "Before you hand anything over. Applies to every tool, however small."
---

The person using this will come back to it in eight months, having forgotten
everything, possibly having lost the conversation. Someone else may inherit it
entirely. Documentation is what makes that survivable — and almost none of it
belongs in a separate file.

Order of priority: **in the tool**, then **one readme next to it**, then
**comments in the code**. Most tools need only the first two.

## 1. In the tool itself

This is the only documentation that is certain to be read, because it is on
screen while the tool is being used. Five things, none of them long:

**A one-line purpose under the title.** What it does and who it is for, in the
user's language.

```html
<h1>Voranschlag-Vergleich</h1>
<p class="fm-subline">
  Zwei Voranschläge als PDF gegenüberstellen — Abweichungen je Ansatz,
  für die Vorbereitung der Gemeinderatssitzung.
</p>
```

**Help where the question arises**, not in a manual. At the drop zone, say
which format is expected; at an unusual field, say what it means. Use
`fm-field__hint` for a field, `fm-dropzone__hint` for a drop zone.

```html
<p class="fm-dropzone__hint">
  VRV-2015-Voranschlag als PDF. Gescannte Dokumente funktionieren nicht.
</p>
```

**The data-handling sentence**, visibly, once. Word it as a claim about the
user's files, which is the part you can actually stand behind — see
*Data protection* before you write it:

```html
<p class="fm-callout fm-callout--info">
  Deine Dateien werden nur in diesem Browser gelesen und nirgendwohin
  übertragen.
</p>
```

**A date and a source.** Put it in the footer of the tool. Without it nobody
can tell whether they are looking at something current:

```html
<footer>
  Stand: 18.09.2026 · Datengrundlage: eigene Eingabe ·
  Rundung: kaufmännisch auf ganze Euro
</footer>
```

If any data is built into the tool, name where it came from and when it was
retrieved. This is what makes a figure quotable — see *Making the result
checkable*.

**What it does not do.** One short "Hinweise" or "Grenzen" block, collapsed if
you like, listing the two or three things people will otherwise assume: which
cases are not covered, which browser is required for a feature, what gets lost
when browser data is cleared.

## 2. One readme next to it

A single plain-text file in the folder, in the user's language, written for
someone who does not code. `LIESMICH.txt` for German users, `README.txt`
otherwise. Five lines is a good length, fifteen is the limit.

```text
Voranschlag-Vergleich
=====================

Was das ist
  Stellt zwei Gemeindevoranschläge (PDF, VRV 2015) gegenüber und zeigt
  die Abweichungen je Ansatz.

Starten
  index.html doppelklicken. Chrome oder Edge empfohlen — nur dort kann
  das Ergebnis direkt in eine bestehende Datei zurückgeschrieben werden.

Dateien
  index.html   die Oberfläche, hier doppelklicken
  app.js       die Auswertung
  daten.js     die Ansatz-Bezeichnungen, hier ändern
  stil.css     das Aussehen

Daten
  Deine Dateien werden nur in diesem Browser gelesen und nirgendwohin
  übertragen. Zum Laden von Design und Diagramm-Bibliothek braucht die
  Seite eine Internetverbindung; deine Dateien gehen dabei nicht mit.

Stand
  18.09.2026
```

Use `.txt`, not `.md` — it opens by double-click on every system and renders
as what it is. Name the file the user should open, and name the file they are
most likely to want to change.

In chat mode, offer this as the second file after the tool, and say it is
optional. In file-access mode, just write it.

## 3. Comments in the code

Comment the **domain decisions**, not the JavaScript. Nobody needs
`// loop over the rows`. What people need eight months later:

```js
// Spalte 3 ist beim Rechnungsabschluss die Abweichung RA-VA, beim
// Voranschlag dagegen der Rechnungsabschluss des Vorvorjahres.
// Verifiziert an den Seitenköpfen, nicht geraten.

// Auf ganze Euro gerundet wird erst bei der Anzeige. Die Summen
// rechnen auf Cent, sonst geht die Kontrollsumme nicht auf.
```

Rule of thumb: if the comment explains *why* it is that way, or records
something that was checked against a real document, keep it. If it restates
the code, delete it.

Put a short block at the top of each file saying what the file is for. Three
lines, not a header ceremony.

## What not to do

- **No `docs/` folder**, no wiki, no multi-page documentation. For a tool this
  size it guarantees the documentation and the tool drift apart.
- **No changelog** unless the user asked for one. A date in the footer covers
  it.
- **Do not say the same thing in three places.** If it is in the tool, the
  readme points at it rather than repeating it.
- **No Markdown the user will not open.** `README.md` renders as raw markup
  when double-clicked on Windows.
- **Do not document what the tool should just say itself.** A readme
  explaining which file format is accepted is a missing hint in the UI.

## The rules file is something else

`CLAUDE.md` / `AGENTS.md` is documentation for the *next assistant*, not for
the user — what the tool is, what is fixed, what must not change. Write it
yourself when the tool will be worked on again; never ask the user to compose
one. It is separate from the readme and may be more technical. See *How you
are delivering*.
