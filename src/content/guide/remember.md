---
title: Keeping data
order: 5
summary: "localStorage for settings and drafts (wrap every read in try/catch), IndexedDB for large or structured data. Storage is device-bound and can vanish — an export button is mandatory, not a feature."
read_when: "Anything should survive closing the tab: settings, entered data, imported files."
---

There is no server, so there is no central database — and that is usually the
point. The only question is what survives closing the tab.

| Need | Use | Limit |
|---|---|---|
| Settings, last selection, a draft | `localStorage` | strings only, a few MB |
| Imported files, parsed records, long lists | IndexedDB | clumsy API |
| Real queries across tables | SQLite compiled to WebAssembly | extra library, real effort |

Pick the lowest rung that works. Most tools never leave `localStorage`.

## localStorage

```js
var KEY = 'toolname.settings';

function saveSettings(obj) {
  try { localStorage.setItem(KEY, JSON.stringify(obj)); } catch (e) {}
}

function loadSettings() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
  catch (e) { return {}; }
}
```

Two habits that prevent later grief: **prefix every key** with the tool name,
and **wrap every read** — the stored value may come from an older version, or
the browser may refuse storage entirely (private window, blocked site data).
A tool that throws on startup because of a stale setting is a tool nobody
opens twice.

## IndexedDB

For parsed data sets, imported files, anything beyond a few hundred kilobytes.
The raw API is unpleasant enough that a small CDN wrapper is the one
justified exception to "write it yourself".

It works everywhere, including from a double-clicked file. It needs **no**
OPFS and **no** cross-origin isolation (`COOP`/`COEP`). If you find yourself
reaching for those headers, the approach is wrong for this context.

## SQLite in the browser

Only for genuine analysis — grouping, joins, multi-year comparison. The
pattern that holds up: open the database in memory, run the schema and the
queries, then serialise the whole database to a byte array and store that in
IndexedDB; restore it on the next start. No special headers required, so it
still works on a static host.

This is a multi-session project, not an evening. Only propose it when the
analysis genuinely needs SQL.

## What the tool must tell the user

Device-bound storage has consequences that belong in the UI, not in a footnote:

- The data lives **only in this browser on this device**. Another laptop,
  another browser, a private window: empty.
- **Clearing browser data deletes it**, without warning.
- **There is no backup.**

So: an export button is mandatory as soon as a tool keeps anything. Offer
import of the same format, and the user has a backup and a way to move between
devices. See *Saving results*.
