---
title: Reading files
order: 3
summary: "Take files in via <input type=file> AND drag-and-drop. Read with File.text() or File.arrayBuffer(). CSV: use a CDN parser, never split on commas. PDF: PDF.js 3.11.174 is the last classic non-module build and works from file:// — never 4.x/5.x, those are ESM only. Use text positions for tables."
read_when: "The tool takes a document, spreadsheet, export or image from the user."
---

Everything happens on the device. The file is never uploaded — there is no
server that could receive it. Say this in the UI; for this audience it is the
deciding feature, not a detail.

That is true of the **finished tool**. It is not true of you while you are
building it. Before you read a file the user points you at, run the precheck in
*Data protection* — filename and header row first, flag the personal-data
columns, and stop there if any turn up. Once a file is in the conversation it
cannot be taken back out.

## Always offer both ways in

A file picker alone is a usability bug: people drag files. A drop zone alone
is worse: it is invisible on touch devices.

```html
<div class="fm-dropzone" id="zone">
  <p class="fm-dropzone__label">Datei hierher ziehen</p>
  <button class="fm-btn fm-btn--secondary fm-dropzone__trigger" id="pick">
    Datei auswählen
  </button>
  <input type="file" id="input" accept=".csv,.pdf" multiple hidden>
</div>
```

```html
<script>
var input = document.getElementById('input');
var zone = document.getElementById('zone');

document.getElementById('pick').addEventListener('click', function () {
  input.click();
});
input.addEventListener('change', function () {
  handleFiles(Array.prototype.slice.call(input.files));
});

['dragenter', 'dragover'].forEach(function (ev) {
  zone.addEventListener(ev, function (e) {
    e.preventDefault();
    zone.classList.add('is-dragover');
  });
});
['dragleave', 'drop'].forEach(function (ev) {
  zone.addEventListener(ev, function (e) {
    e.preventDefault();
    zone.classList.remove('is-dragover');
  });
});
zone.addEventListener('drop', function (e) {
  handleFiles(Array.prototype.slice.call(e.dataTransfer.files));
});
</script>
```

`fm-dropzone` and `is-dragover` come from the design system and carry the
dashed border and the highlight state.

## Getting the content out

```js
async function handleFiles(files) {
  for (const file of files) {
    if (/\.(csv|txt|json)$/i.test(file.name)) {
      const text = await file.text();
      // ...
    } else {
      const bytes = await file.arrayBuffer();   // PDF, XLSX, images
      // ...
    }
  }
}
```

Note: `async`/`await` and arrow functions are fine — they are language
features, not modules. Only `import` is off limits.

## Per format

**CSV.** Do not write your own splitter. Quoted fields, embedded semicolons
and newlines inside cells will break it, and the user will not notice until
the numbers are wrong. Load a parser from CDN as a global. Also: files from
Austrian and German offices are usually semicolon-separated, Windows-1252
encoded, and use a comma as the decimal mark. Detect the separator, and offer
an encoding switch if the first read shows mojibake.

**XLSX.** Needs a library. If the user controls the file, the cheaper answer
is "save it as CSV in Excel first" — say so instead of pulling in a heavy
dependency.

**PDF with a text layer.** Use **PDF.js 3.11.174** — the last release that
ships a classic, non-module build. Verified working from a double-clicked
file, with and without the CDN worker:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
```

```js
// Sets a global `pdfjsLib`. The worker is optional — without it PDF.js
// parses on the main thread, which is fine for a few hundred pages.
pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

const doc = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
for (let n = 1; n <= doc.numPages; n++) {
  const items = (await (await doc.getPage(n)).getTextContent()).items;
  // items[i].str is the text, items[i].transform[4]/[5] are x and y
}
```

Do **not** take PDF.js 4.x or 5.x: those ship only `.mjs` ES-module builds,
which are blocked on `file://`. Pin 3.11.174.

For tables, plain concatenated text is not enough — use the positions.
`getTextContent()` gives each fragment an x and a y; group fragments with a
similar y into a row, then split a row into cells on x-gaps. Two tolerances
control this and they differ per document type, so make them easy to adjust
and show the user the recognised rows before interpreting them.

Expect this to be the most expensive part of the tool. Say so before
committing to it.

**Scanned PDF.** There is no text, only images. This needs OCR, and the error
rate becomes its own problem. Say this rather than producing silently wrong
output.

**Images.** `URL.createObjectURL(file)` for display, or draw into a canvas for
processing. Call `URL.revokeObjectURL()` afterwards.

## Show what was read before you interpret it

First version: read the file and display what was recognised — row count, the
first rows, detected columns. No analysis yet.

This is not a debugging step you can skip. It is the only point where the user
can catch "it read the wrong column" before that error is buried inside a
result they will quote in a council meeting.

Always state the row count and make the tool refuse loudly on a file it does
not recognise, rather than producing an empty table.
