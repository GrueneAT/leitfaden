---
title: What to deliver
order: 1
summary: "Deliver a folder the user saves; index.html opens by double-click. One file for a small tool, several when the tool earns it — classic <script src> and <link> across files work fine from file://. What does NOT work: ES modules and fetch() of local files. Libraries from CDN as globals with a pinned version."
read_when: "Always. Read this before writing any code — it constrains every other section."
---

## Who you are building for

A part-time local councillor or volunteer. No development environment, no
terminal, no code editor, no package manager, no admin rights on the laptop.
They have a browser and a chat window with you. Their time budget is one
evening.

Anything that requires them to install software, run a command, or start a
local server has failed before it starts. This is not a preference — it is the
constraint that decides whether the tool gets used.

## The deliverable

**A folder the user saves. `index.html` is what they double-click.**

How many files that folder holds is your choice. What matters is that it runs
from `file://` without anything being installed or started.

| Rule | Why |
|---|---|
| `index.html` runs by double-click | No server, no `npx`, no terminal |
| No build step, no bundler, no npm | They cannot run any of it |
| **No `<script type="module">`, no `import`** | Blocked on `file://` — the tool silently does nothing |
| **No `fetch()` of a local file** | Blocked on `file://` — put data in a `.js` file instead |
| Classic `<script src>` and `<link rel=stylesheet>` | These *do* work across files, including subfolders |
| Libraries from CDN, global (UMD) build, pinned version | No install; a floating version breaks the tool later |
| UI text in the user's language | Almost always German for this audience |

## One file or several?

Both are fine. Choose by handover cost, not by tidiness.

**Start with one file** when the tool is small. It is the easiest thing to
save out of a chat, to email, and to keep track of. For a calculator, a form,
a checklist, a single analysis — one file is right, and splitting it is
busywork.

**Split into several files** when the tool genuinely earns it: a few hundred
lines of logic, a sizeable data table, a stylesheet worth reading on its own.
A flat folder is the usual shape:

```text
mein-werkzeug/
├── index.html
├── app.js
├── daten.js
└── stil.css
```

```html
<link rel="stylesheet" href="stil.css">
...
<script src="daten.js"></script>
<script src="app.js"></script>
```

Scripts run in document order, so a global defined in `daten.js` is available
in `app.js`. Verified working from a double-clicked file, subfolders included.

**Keep the folder flat when you split.** Nested directories work technically,
but every extra path is another chance for the user to save a file in the
wrong place. `index.html` + two or three siblings is the sweet spot.

**Say how to save it.** When you hand over more than one file, name each file
explicitly and say they all go in the same folder. That is the only part of
multi-file delivery that is genuinely harder for the user.

## Data belongs in a .js file, not a .json file

`fetch('daten.json')` fails from `file://` — Chrome reports *URL scheme "file"
is not supported*. Do not use it, and do not work around it with a local
server.

Instead, write the data as JavaScript that assigns a global:

```js
// daten.js
window.DATEN = {
  gemeinden: [
    { name: 'Oberndorf', einwohner: 5700 },
    { name: 'Herzogenburg', einwohner: 8300 }
  ]
};
```

Same content, loads with a plain `<script src="daten.js">`, and the user can
still open and edit it in any text editor.

## What DOES work from a double-clicked file

Verified in Chromium: `window.isSecureContext` is `true` for a local file, so
the following are all available without a server.

- `localStorage`, `sessionStorage`, `IndexedDB`
- File System Access API: `showOpenFilePicker`, `showSaveFilePicker`,
  `showDirectoryPicker` (Chrome/Edge — always ship the download fallback, see
  *Saving results*)
- `<canvas>` including `toBlob()` and `toDataURL()`
- Clipboard API
- CSS, fonts, images and scripts from a CDN
- Your own CSS, JS and images by relative path

## What does NOT work

- **ES modules.** `<script type="module">` and `import` fail with a CORS error
  against origin `null`. This is the single most common way a delivered tool
  arrives dead.
- **`fetch()` / `XMLHttpRequest` on a local file.** See above.
- Service workers, and anything else needing a real origin.

## The skeleton to start from

```html
<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Tool name</title>
<link rel="stylesheet" href="https://design-system.gruene.at/design-system.css">
<style>
  body {
    margin: 0;
    padding: 1.5rem;
    background: var(--gat-color-surface);
    color: var(--gat-color-text);
    font-family: var(--gat-font-copy);
  }
  main { max-width: 60rem; margin: 0 auto; }
</style>
</head>
<body>
<main>
  <h1>Tool name</h1>
  <!-- UI here -->
</main>
<script>
  // Logic here, or in a sibling file via <script src>. No imports.
</script>
</body>
</html>
```

The `body` rules are not optional: the design system deliberately styles no
HTML tags, so without them the page renders as unstyled serif text and looks
broken. See *Making it look right*.

## How to scope the first version

Build the smallest thing that produces a real answer, then stop and let them
use it.

- One screen. No settings, no tabs, no login, no onboarding.
- Real data from the start — ask for an actual file or three real rows.
- If the task happens only once, say so: a chat answer is the better tool, and
  building anything is waste.

## When this stops being enough

Only when the user needs a public address, several linked pages, or other
people contributing. That is a different shape of project — see *Going
further*.
