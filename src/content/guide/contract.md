---
title: What to deliver
order: 1
summary: "Deliver a folder the user saves; index.html opens by double-click. One file for a small tool, several when the tool earns it — classic <script src> and <link> across files work fine from file://. What does NOT work: ES modules and fetch() of local files. Libraries from CDN as globals with a pinned version. Interface in the language the tool is USED in, not the language of the request. Scope by the question asked, not by screen count."
read_when: "Always. Read this before writing any code — it constrains every other section."
---

## Who you are building for

Someone doing this alongside their actual job — an administrator, an
organiser, a volunteer. No development environment, no terminal, no code
editor, no package manager, no admin rights on the laptop. They have a
browser and a chat window with you. Their time budget is one evening.

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
| UI text in the language the tool will be *used* in | Not necessarily the language they wrote to you in — see below |

## Which language the interface is in

The language of the **use**, not the language of the request. Someone may
write to you in English about a tool for a Flemish town council — that tool
belongs in Dutch, because that is who will sit in front of it.

Derive it from where the tool will be used: the municipality, the institution,
the audience for its output. When the request itself and the place disagree,
and you cannot tell which one governs, **ask once** instead of guessing.

What follows the interface language, and is easy to forget:

- **Number and date format** — `nl-BE`, `de-AT`, `fr-BE`. A Belgian tool
  formatting amounts the German way looks broken to its user.
- **The name of the short readme** — `LEESMIJ.txt`, `LIESMICH.txt`,
  `README.txt`. See *Documenting the tool*.
- **Labels on exports and charts**, including the ones baked into an exported
  image.
- **Error messages**, which are the texts people actually have to understand.

Two things stay in English regardless, because they are not the interface:
this guide, and the rules file you leave for the next assistant
(`CLAUDE.md` / `AGENTS.md`). Those are read by machines and developers.

## One file or several?

Both are fine. Choose by handover cost, not by tidiness.

**Start with one file** when the tool is small *and you are handing it over
through a chat*. It is the easiest thing to save out of a conversation, to
email, and to keep track of. For a calculator, a form, a checklist, a single
analysis — one file is right, and splitting it is busywork.

**If you can write files into a folder yourself** — an agentic assistant, a
workspace with file output — that argument disappears: there is no handover to
get wrong, so split whenever it aids readability. Read *How you are
delivering* next; it also covers the trap that comes with having a terminal
the user does not have.

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

**Say how to save it.** When you hand over more than one file *in a chat*,
name each file explicitly and say they all go in the same folder. That is the
only part of multi-file delivery that is genuinely harder for the user — and
it does not apply when you write the folder yourself.

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
<link rel="stylesheet" href="https://design-system.flomotlik.me/design-system.css">
<style>
  body {
    margin: 0;
    padding: 1.5rem;
    background: var(--fm-color-surface);
    color: var(--fm-color-text);
    font-family: var(--fm-font-copy);
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

Build the smallest thing that actually answers their question, then stop and
let them use it.

**Smallest is measured against the question, not against a screen count.**
Test every control you are about to add:

> Can they answer the question they asked me without this element?
> If yes, leave it out. If no, it belongs in the first version.

A year selector in a tool for comparing years is not feature creep — without
it the tool does not answer the question. A settings panel nobody asked for
is. The difference is whether the element follows from the request or from
your own enthusiasm.

- **No login, no onboarding, no accounts, no user management.** These never
  follow from the question.
- **No second job.** A tool that reads budgets does not also send newsletters.
  One tool, one question.
- **Real data from the start** — ask for an actual file or three real rows.
- **If the task happens only once**, say so: a chat answer is the better tool
  and building anything is waste.

Then ship it before adding anything else. What they still miss after using it
three times is a real feature; what occurred to you while building usually is
not.

## When this stops being enough

Only when the user needs a public address, several linked pages, or other
people contributing. That is a different shape of project — see *Going
further*.
