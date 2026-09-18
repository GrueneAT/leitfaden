---
title: Saving results
order: 4
summary: "Blob download via a temporary <a download> is the baseline and always works. Direct write-back with showSaveFilePicker is a Chrome/Edge enhancement behind a feature check — never the only path."
read_when: "The tool produces something the user keeps: a table, a report, an image, an edited file."
---

## Baseline: download (always implement this)

Works in every browser, needs no permission, works from `file://`.

```js
function download(content, filename, type) {
  const blob = new Blob([content], { type: type || 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
```

For CSV opened in Excel, prepend a BOM or the separator hint, otherwise
umlauts break and columns collapse into one:

```js
download('﻿' + csvText, 'auswertung.csv');
```

For most tools this is the whole story. Do not add complexity on top of it
unless the user edits the same file repeatedly.

## Enhancement: write back into the same file

Chrome and Edge can open a file, change it, and save it back to the same
location — no growing pile of `auswertung (3).csv` in Downloads. Available
from `file://` too, since a local file counts as a secure context.

```js
let handle = null;

async function openFile() {
  const picked = await window.showOpenFilePicker({
    types: [{ description: 'CSV', accept: { 'text/csv': ['.csv'] } }],
  });
  handle = picked[0];
  const file = await handle.getFile();
  return file.text();
}

async function saveBack(text) {
  if (!handle) {
    handle = await window.showSaveFilePicker({ suggestedName: 'auswertung.csv' });
  }
  const stream = await handle.createWritable();
  await stream.write(text);
  await stream.close();
}
```

A whole folder works too, for "process every PDF in this directory":

```js
const dir = await window.showDirectoryPicker({ mode: 'readwrite' });
for await (const [name, h] of dir.entries()) {
  if (h.kind === 'file' && name.endsWith('.pdf')) {
    const file = await h.getFile();
    // ...
  }
}
```

### The rules that make it fail

1. **Chromium only.** Chrome and Edge yes; Firefox and Safari no.
2. **Must follow a user gesture.** Calling it from a timer, on page load, or
   after an `await` that loses the gesture throws.
3. **Permission does not survive a reload.** Re-request it, which needs
   another click. Storing the handle in IndexedDB lets you re-ask instead of
   re-pick:
   ```js
   if (await handle.queryPermission({ mode: 'readwrite' }) !== 'granted') {
     await handle.requestPermission({ mode: 'readwrite' });  // needs a click
   }
   ```

Therefore: **always feature-detect and always keep the download path.**

```js
const canWriteBack = 'showSaveFilePicker' in window;

async function exportResult(text, filename) {
  if (canWriteBack) {
    try { return await saveBack(text); }
    catch (e) { /* user cancelled or it failed — fall through */ }
  }
  download(text, filename);
}
```

Never present write-back as the only way out. A tool that cannot export in
Firefox is a broken tool, not a Chrome-optimised one.

## Other exits

- **Clipboard** — often the best export for text that goes into an email or a
  document: `navigator.clipboard.writeText(text)`. Needs a user gesture.
- **Print / PDF** — a `@media print` block plus `window.print()` beats
  generating a PDF in JavaScript for almost every case.
- **Image** — see *Generating images*.
