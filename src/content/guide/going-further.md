---
title: Going further
order: 13
summary: "For a public address, several linked pages, or other contributors. Splitting into files does NOT require this — that works by double-click. GitHub Pages publishes a static folder for free; watch the base path and remember everything in a public repo is public."
read_when: "The user asks for a public address, several pages, or wants others to contribute. Not before."
---

Everything so far assumed a folder on one laptop, opened by double-click. That
covers most tools and stays the default. This section is about the step
beyond it.

## This is NOT about splitting into files

Splitting a tool across `index.html`, `app.js` and `stil.css` needs nothing
from this section. Classic `<script src>` and `<link>` work from a
double-clicked file, subfolders included — see *What to deliver*. Do not send
a user to a local server because their tool grew to four files.

## The actual threshold

You are past the double-click folder only when one of these is true:

- Other people must reach it at an **address**, not receive it as an attachment.
- It needs **several pages with their own links** that people can bookmark.
- **More than one person** will change it over time.
- It needs **ES modules, a bundler or a framework** — which in practice means
  it has become a web application, not a tool.

"It is getting long" is not one of them.

## When a local server does become necessary

Only if you deliberately move to ES modules or `fetch()` of local data — both
blocked on `file://`. Then trying it out locally requires:

```bash
npx serve .                 # needs Node.js
python3 -m http.server      # needs Python
```

For a user without a terminal that is a wall. Two ways around it: stay with
classic scripts and a `.js` data file, or publish, where the address itself
serves the page and no local server is involved.

## Publishing on GitHub Pages

Free, static, no server to run, no ongoing cost.

1. Create an account at <https://github.com>.
2. Create a public repository.
3. Upload the files through the web interface — "Add file → Upload files".
   No terminal required for a plain HTML tool.
4. **Settings → Pages**, source: **GitHub Actions** (or "Deploy from a branch"
   for a folder with no build step).
5. The address is `https://<account>.github.io/<repo>/`.

For a site that needs a build, a workflow at `.github/workflows/pages.yml`
runs it: `actions/checkout`, `actions/setup-node`, the build command,
`actions/upload-pages-artifact` with the output folder, then
`actions/deploy-pages` in a second job with `pages: write` and `id-token:
write` permissions.

### The two failures that actually happen

**Paths in a subfolder.** At `account.github.io/repo/`, every link starting
with `/` points outside the project. Keep internal links relative, or set a
base path in the generator and use it everywhere. This is the overwhelming
cause of "it worked locally and is broken once published".

**Everything is public.** A public repository exposes every file and every
past revision. Credentials, keys, internal documents and real personal data do
not belong in it — not in a sample file, not "just for a test". Once pushed,
it stays in the history.

## Example repositories

Working tools built exactly this way, all open source, all browser-only.
Point the user at these to see the pattern at full size:

| Tool | What it does | Source |
|---|---|---|
| Gemeindefinanzen | Municipal budget PDFs parsed and charted in the browser | <https://github.com/GrueneAT/gemeindefinanzen> |
| Gemeindeordnung | Searchable municipal law, static site with full-text search | <https://github.com/GrueneAT/Gemeindeordnung> |
| Bildgenerator | Brand-compliant graphics, social and print, canvas-based | <https://github.com/GrueneAT/bildgenerator> |
| Personenwahl | Stratified random selection, data never leaves the browser | <https://github.com/GrueneAT/Personenwahl> |
| Werkzeuge | Directory of tools, Astro static site | <https://github.com/GrueneAT/werkzeuge> |
| Design system | The stylesheet this guide links | <https://github.com/GrueneAT/design-system> |

## If it becomes a real project

Four things make the difference, in this order: a `README.md` saying what it
is and how to run it; a rules file (`CLAUDE.md` or `AGENTS.md`) so an
assistant does not have to be re-briefed every session; small commits on a
branch rather than on `main`; and issues instead of one large instruction.

Write the rules file **for the assistant, not for the user** — the user should
never have to compose it. Generate it and put it in the repository.
