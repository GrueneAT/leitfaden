---
title: Reading files
order: 2
summary: "Take files in via <input type=file> AND drag-and-drop. Read with File.text() or File.arrayBuffer(). CSV: use a CDN parser, never split on commas. PDF: text extraction is the expensive part — warn the user before promising it."
read_when: "The tool takes a document, spreadsheet, export or image from the user."
---

Everything happens on the device. The file is never uploaded — there is no
server that could receive it. Say this in the UI; for this audience it is the
deciding feature, not a detail.

## Always offer both ways in

A file picker alone is a usability bug: people drag files. A drop zone alone
is worse: it is invisible on touch devices.

```html
<div class="gat-dropzone" id="zone">
  <p class="gat-dropzone__label">Datei hierher ziehen</p>
  <button class="gat-btn gat-btn--secondary gat-dropzone__trigger" id="pick">
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

`gat-dropzone` and `is-dragover` come from the design system and carry the
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

**PDF with a text layer.** Extraction needs word positions, not just text, or
tables collapse into unusable strings. The working pattern: get words with
bounding boxes per page, group them into rows by similar y-position, split
words by x-gap. Two tolerances control this and differ per document type. This
is the most expensive part of any such tool — tell the user that before
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
