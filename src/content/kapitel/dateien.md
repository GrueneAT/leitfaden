---
title: Dateien lesen und zurückschreiben
kurz: PDF, CSV oder Tabelle in den Browser bekommen — und Ergebnisse als Datei wieder hinaus, bis hin zum direkten Schreiben auf die Festplatte.
reihenfolge: 5
fuer: [datenwerkzeug]
grundlage: false
schwierigkeit: mittel
fuer_ki: "Dateiverarbeitung im Browser: <input type=file> plus Drag-and-drop, File.text()/arrayBuffer(), Blob-Download über <a download>, und die File System Access API (showOpenFilePicker/showSaveFilePicker/showDirectoryPicker, nur Chromium, nur nach Nutzergeste, nur im sicheren Kontext) mit Pflicht-Fallback auf Download."
stand: 2026-09-18
---

Der Kern fast jedes nützlichen Werkzeugs: eine Datei kommt herein, etwas
Ausgewertetes kommt heraus. Alles davon läuft **auf dem Gerät**. Die Datei
wird nicht hochgeladen, es gibt keinen Server, der sie sehen könnte.

## Stufe 1: Datei hereinnehmen

Zwei Wege, immer beide anbieten — Dateiauswahl **und** Ziehen-und-Ablegen:

```html
<div class="gat-dropzone" id="ablage">
  <p class="gat-dropzone__label">PDF oder CSV hierher ziehen</p>
  <button class="gat-btn gat-btn--secondary gat-dropzone__trigger" id="waehlen">
    Datei auswählen
  </button>
  <input type="file" id="eingabe" accept=".pdf,.csv" multiple hidden>
</div>
```

```js
const eingabe = document.getElementById("eingabe")
const ablage = document.getElementById("ablage")

const knopf = document.getElementById("waehlen")
knopf.addEventListener("click", () => eingabe.click())
eingabe.addEventListener("change", () => verarbeite([...eingabe.files]))

for (const ev of ["dragenter", "dragover"]) {
  ablage.addEventListener(ev, (e) => {
    e.preventDefault()
    ablage.classList.add("is-dragover")
  })
}
for (const ev of ["dragleave", "drop"]) {
  ablage.addEventListener(ev, (e) => {
    e.preventDefault()
    ablage.classList.remove("is-dragover")
  })
}
ablage.addEventListener("drop", (e) => verarbeite([...e.dataTransfer.files]))
```

Die Klassen `gat-dropzone` und `is-dragover` kommen aus dem Design-System und
bringen den Rahmen und die Hervorhebung beim Darüberziehen mit.

Inhalt auslesen, je nach Dateityp:

```js
async function verarbeite(dateien) {
  for (const datei of dateien) {
    if (datei.name.endsWith(".csv")) {
      const text = await datei.text()          // Textdateien
      csvLesen(text)
    } else {
      const bytes = await datei.arrayBuffer()  // PDF, Bilder, XLSX
      pdfLesen(bytes)
    }
  }
}
```

### Größere Formate

- **CSV**: selbst zerlegen geht schief, sobald Semikolon, Anführungszeichen
  und Zeilenumbrüche in Feldern vorkommen. Eine kleine Bibliothek per CDN
  einbinden, nicht selbst schreiben.
- **XLSX**: braucht eine Bibliothek. Alternative, wenn du die Datei selbst in
  der Hand hast: im Tabellenprogramm als CSV speichern.
- **PDF**: Text mit Koordinaten herausholen, damit Tabellen wieder zu Zeilen
  werden. In `gemeindefinanzen` macht das `mupdf.js`: pro Seite Wörter mit
  Bounding-Box, dann werden Zeichen mit ähnlicher y-Lage zu Zeilen gruppiert.
  Das ist die aufwendigste Stelle im ganzen Projekt — dafür Zeit einplanen.
- **Gescanntes PDF**: enthält keinen Text, nur Bilder. Dann braucht es
  Texterkennung, und die Fehlerquote wird zum eigenen Thema.

## Stufe 2: Ergebnis als Datei herausgeben

Funktioniert in jedem Browser, braucht keine Berechtigung:

```js
function speichern(inhalt, dateiname, typ = "text/csv;charset=utf-8") {
  const blob = new Blob([inhalt], { type: typ })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = dateiname
  a.click()
  URL.revokeObjectURL(url)
}

speichern(csvText, "auswertung-2026.csv")
```

Für die meisten Werkzeuge reicht genau das. Erst wenn jemand **dieselbe Datei
immer wieder** bearbeitet, lohnt die nächste Stufe.

## Stufe 3: Direkt auf der Festplatte arbeiten

Chrome und Edge können eine Datei öffnen, verändern und **an dieselbe Stelle
zurückschreiben** — ohne dass bei jedem Speichern eine neue Kopie im
Downloads-Ordner landet. Das ist die File System Access API.

```js
let griff = null   // bleibt für spätere Speichervorgänge erhalten

async function oeffnen() {
  const [handle] = await window.showOpenFilePicker({
    types: [{ description: "CSV-Datei", accept: { "text/csv": [".csv"] } }],
  })
  griff = handle
  const datei = await handle.getFile()
  return datei.text()
}

async function zurueckschreiben(text) {
  if (!griff) {
    griff = await window.showSaveFilePicker({ suggestedName: "auswertung.csv" })
  }
  const strom = await griff.createWritable()
  await strom.write(text)
  await strom.close()
}
```

Ein ganzer Ordner geht auch — nützlich für „lies alle PDFs aus diesem
Verzeichnis":

```js
const ordner = await window.showDirectoryPicker({ mode: "readwrite" })
for await (const [name, handle] of ordner.entries()) {
  if (handle.kind === "file" && name.endsWith(".pdf")) {
    const datei = await handle.getFile()
    // ...
  }
}
```

### Die vier Regeln, an denen es sonst scheitert

1. **Nur Chromium.** Chrome und Edge ja, Firefox und Safari nein. Ohne
   Ausweichweg ist dein Werkzeug dort kaputt.
2. **Nur nach einem Klick.** Der Aufruf muss direkt aus einer Nutzeraktion
   kommen. Aus einem Timer oder beim Laden der Seite wirft er einen Fehler.
3. **Nur im sicheren Kontext.** `https://` oder `http://localhost`. Eine per
   Doppelklick geöffnete Datei (`file://`) kann das nicht.
4. **Berechtigung verfällt.** Nach dem Neuladen der Seite muss erneut gefragt
   werden. Willst du den Zugriff über Sitzungen hinweg behalten, speicherst du
   den Griff in IndexedDB und fragst beim nächsten Mal nach:

```js
if (await griff.queryPermission({ mode: "readwrite" }) !== "granted") {
  await griff.requestPermission({ mode: "readwrite" })   // braucht wieder einen Klick
}
```

Deshalb: **immer mit Prüfung bauen**, nie ohne.

```js
const kannDirekt = "showSaveFilePicker" in window

async function ergebnisAusgeben(text, name) {
  if (kannDirekt) return zurueckschreiben(text)
  speichern(text, name)            // Download-Weg als Rückfallebene
}
```

## Was der KI mitzugeben ist

> Das Werkzeug läuft rein im Browser, ohne Server. Dateien werden über
> `<input type="file">` **und** Ziehen-und-Ablegen angenommen. Ergebnisse
> gehen über einen Blob-Download hinaus. Wenn `showSaveFilePicker` verfügbar
> ist, zusätzlich Zurückschreiben in dieselbe Datei anbieten — mit
> Merkmalsprüfung und Download als Rückfallebene, nie als einziger Weg.
