---
title: Going further
order: 11
summary: "Only when one file is genuinely not enough. Several files need a local server (ES modules and fetch fail on file://) — that is the real cost. GitHub Pages publishes a static folder for free; watch the base path and remember everything in a public repo is public."
read_when: "The user asks for a public address, several pages, or wants others to contribute. Not before."
---

Everything so far assumed one file on one laptop. That covers most tools and
should stay the default. This section is the exception — do not reach for it
early, and say out loud what it costs.

## The threshold

Split into several files only when one of these is true:

- Other people must reach it at an address, not receive it as an attachment.
- It genuinely needs several pages with their own links.
- More than one person will change it.

"It is getting long" is not sufficient. A 1,500-line single file that works by
double-click is better than a four-file project the user cannot open.

## What splitting actually costs

This is the honest part: **as soon as there is more than one file, the
double-click stops working.** ES modules and `fetch()` of a neighbouring file
are blocked on `file://`. From then on a local server is required to try it
out:

```bash
npx serve .                 # needs Node.js
python3 -m http.server      # needs Python
```

For a user without a terminal that is a wall. So either keep it in one file,
or move straight to publishing — where the address itself serves the page and
no local server is needed.

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
