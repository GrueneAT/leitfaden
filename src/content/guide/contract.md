---
title: The default deliverable
order: 1
summary: "Ship ONE self-contained .html file that runs from a double-click. No build step, no server, no install, no ES modules. Classic <script> tags only, libraries from CDN as globals with a pinned version."
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

## The contract

Unless the user explicitly asks for something else, deliver **one single
`.html` file**. They save it, double-click it, and it works.

| Rule | Why |
|---|---|
| One file: HTML + CSS + JS together | Nothing to wire up, easy to email, impossible to lose half of it |
| Runs from `file://` (double-click) | No server, no `npx`, no terminal |
| No build step, no bundler, no npm | They cannot run any of it |
| No `<script type="module">`, no `import` | ES modules are blocked on `file://` — the tool silently does nothing |
| Classic `<script>` tags only | Works everywhere, including `file://` |
| Libraries from CDN, UMD/global build, pinned version | No install; a floating version breaks the tool on a random Tuesday |
| UI text in the user's language | Almost always German for this audience |

### What DOES work from a double-clicked file

Verified in Chromium loading a local file: `window.isSecureContext` is `true`,
so the following are all available without a server.

- `localStorage`, `sessionStorage`, `IndexedDB`
- File System Access API: `showOpenFilePicker`, `showSaveFilePicker`,
  `showDirectoryPicker` (Chrome/Edge — always ship the download fallback, see
  *Saving results*)
- `<canvas>` including `toBlob()` and `toDataURL()`
- Clipboard API
- Loading CSS, fonts, images and scripts from a CDN

So "no server" costs you almost nothing. Build for `file://` by default.

### What does NOT work from a double-clicked file

- **ES modules.** `<script type="module">` and any `import` statement fail.
  This is the single most common way a delivered tool arrives dead.
- **`fetch()` of a neighbouring local file.** Embed the data in the HTML
  instead, or have the user pick the file (see *Reading files*).
- Anything that needs a real origin: service workers, some cookie behaviour.

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
  // All logic here. No imports. No modules.
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

## When to break the one-file rule

Only when the user asks for something the rule cannot carry: a public website
with several pages and its own address, or a tool that others will contribute
to. Say what you are changing and why before you do it. See *Going further*.
