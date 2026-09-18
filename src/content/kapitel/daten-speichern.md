---
title: Daten behalten
kurz: Was zwischen zwei Besuchen erhalten bleibt — von localStorage bis zu einer vollständigen Datenbank im Browser.
reihenfolge: 6
fuer: [datenwerkzeug]
grundlage: false
schwierigkeit: mittel
fuer_ki: "Persistenz im Browser, aufsteigend: localStorage (kleine Einstellungen, nur Strings), IndexedDB (große Datenmengen, strukturiert), sqlite-wasm im Arbeitsspeicher mit Byte-Abzug nach IndexedDB (echtes SQL ohne OPFS und ohne COOP/COEP). Kein Server, Daten bleiben gerätegebunden und können gelöscht werden."
stand: 2026-09-18
---

Ohne Server gibt es keine zentrale Datenbank — und das ist meistens der
Vorteil. Die Frage ist nur, was nach dem Schließen des Tabs übrig bleibt.

## Die drei Stufen

| Stufe | Wofür | Grenze |
|---|---|---|
| `localStorage` | Einstellungen, letzte Auswahl, Entwurfstexte | nur Text, wenige MB |
| IndexedDB | eingelesene Dateien, Zwischenergebnisse, große Listen | umständliche Schnittstelle |
| SQLite im Browser | echte Auswertungen mit SQL über viele Tabellen | zusätzliche Bibliothek, mehr Aufwand |

Nimm die unterste Stufe, die reicht. Die meisten Werkzeuge kommen mit
`localStorage` aus.

## localStorage

```js
// Speichern
localStorage.setItem("lf.einstellungen", JSON.stringify({ jahr: 2026, ansicht: "tabelle" }))

// Lesen — immer mit Rückfallwert, der Eintrag kann fehlen oder kaputt sein
function einstellungen() {
  try {
    return JSON.parse(localStorage.getItem("lf.einstellungen")) ?? {}
  } catch {
    return {}
  }
}
```

Zwei Gewohnheiten, die später Ärger sparen: **Schlüssel mit Präfix** (`lf.`),
damit nichts mit anderen Seiten kollidiert, und **jeder Lesezugriff
abgesichert** — der Wert kann von einer älteren Version stammen.

Nicht geeignet für: alles, was größer als ein paar hundert Kilobyte ist, und
alles, was strukturiert abgefragt werden soll.

## IndexedDB

Für eingelesene Dateien, geparste Datensätze, alles ab ein paar Megabyte.
Die rohe Schnittstelle ist unangenehm; eine schlanke Hilfsbibliothek per CDN
ist hier die Ausnahme von „mach es selbst".

Wichtig zu wissen: IndexedDB ist **überall verfügbar** — auch auf
`http://localhost` und auf GitHub Pages. Es braucht weder OPFS noch
Cross-Origin-Isolation (`COOP`/`COEP`). Wenn eine KI dir diese Header
einbauen will, ist der Weg vermutlich zu kompliziert gewählt.

## SQLite im Browser

Für richtige Auswertungen — Gruppierungen, Verknüpfungen, Mehrjahresvergleiche
— gibt es SQLite als WebAssembly. Das Muster, das sich in `gemeindefinanzen`
bewährt hat:

1. Datenbank im **Arbeitsspeicher** öffnen (`:memory:`).
2. Schema anlegen, Daten einfügen, Abfragen laufen lassen.
3. Den Datenbankinhalt als Byte-Feld **nach IndexedDB sichern**.
4. Beim nächsten Start die Bytes zurückspielen.

Der Vorteil dieser Bauweise: sie funktioniert ohne besondere Serverheader und
ohne OPFS, also auch auf GitHub Pages und auf `localhost`. Die SQL-Abfragen
sind dieselben, die du auch in einem Auswertungsskript am Rechner verwenden
würdest — das macht sie prüfbar.

## Was den Leuten zu sagen ist

Gerätegebundene Speicherung hat eine Konsequenz, die im Werkzeug stehen muss:

- Die Daten liegen **nur in diesem Browser auf diesem Gerät**. Anderer Rechner,
  anderer Browser, privates Fenster: leer.
- **Browserdaten löschen löscht auch das Werkzeug-Archiv.** Ohne Vorwarnung.
- Es gibt **keine Sicherung**. Wer die Daten behalten will, exportiert sie als
  Datei (siehe [Dateien lesen und zurückschreiben](../dateien/)).

Ein Export-Knopf ist deshalb kein Extra, sondern Pflichtausstattung, sobald ein
Werkzeug Daten behält.
