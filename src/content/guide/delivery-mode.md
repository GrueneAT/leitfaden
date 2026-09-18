---
title: How you are delivering
order: 2
summary: "Work out whether you hand files to the user through a chat or write them into a folder yourself. Chat: prefer one file, name every file explicitly. Direct file access: split freely, iterate in place, open the tool and check it. Either way the user has no toolchain — never leave behind anything that needs a terminal to run or change."
read_when: "Always, right after 'What to deliver'. It decides how many files you produce and what you may leave behind."
---

## Two modes, different handover cost

The runtime constraints never change: the user double-clicks `index.html`, has
no build step, no server, no ES modules. What changes is how the files reach
them.

**Chat mode.** You emit text; the user copies or downloads it and saves it
themselves. Every additional file is a manual step they can get wrong — a
typo in a filename, a file saved to Downloads instead of the folder, a `.txt`
extension added silently.

**File-access mode.** You write into a folder directly. Tools of this kind —
agentic coding assistants, workspace assistants, project workspaces with file
output, and equivalents from other vendors — remove the handover entirely.

You usually know which one you are in: if you have a tool that writes files,
you are in file-access mode. If unsure, ask, or assume chat mode, which is the
stricter of the two.

| | Chat mode | File-access mode |
|---|---|---|
| Number of files | Prefer one; a few flat siblings at most | Split whenever it helps |
| Naming | Say every filename and where it goes | Just write them |
| Changing something | Re-emit the whole file | Edit in place |
| Sample data | Paste it inline | Write a real `daten.js` |
| Verification | The user reports back | Open it yourself and look |

The preference for a single file in *What to deliver* is a **chat-mode**
argument. It does not apply when you write the folder yourself.

## The trap in file-access mode

You may have a terminal. **The user does not.** Nothing you can run is
available to them afterwards.

So, however capable your environment is:

- **Do not add a build step.** No bundler, no transpiler, no CSS framework
  that must be compiled. A tool that needs `npm run build` before it can be
  changed is dead the moment you stop working on it.
- **Do not add a dependency manifest** — no `package.json`, no `node_modules`
  — unless the user has asked for a real project and understands what it
  implies. See *Going further*.
- **Do not leave generated output as the only source.** If a file is minified
  or compiled, the user cannot read or fix it.
- **Do not rely on a local server** to make it work. It still has to open by
  double-click.

The test: *if the user opened this folder in six months with nothing but a
browser and a text editor, could they still use it and change one label?* If
not, simplify.

## What file-access mode lets you do better

- **Split for readability.** `index.html`, `app.js`, `daten.js`, `stil.css` —
  no handover penalty. Keep it flat anyway; the user still has to find things.
- **Write real sample data.** A `daten.js` with twenty invented but realistic
  rows beats asking the user to paste their real list. See *Data protection*.
- **Iterate in small steps.** Change one thing, check it, then the next. You
  do not have to re-emit a whole file to fix one line.
- **Actually open the tool and check it.** You produced it; verify it does
  what it claims before saying it is finished. Load it, feed it the sample
  data, confirm the numbers.
- **Leave a short `LIESMICH.txt` / `README.txt`** in the folder — see
  *Documenting the tool* for what goes in it. In chat mode it is an optional
  extra; here it costs nothing, so write it.
- **Leave a rules file** (`CLAUDE.md` or `AGENTS.md`) if the tool will be
  worked on again, so the next session does not have to be re-briefed. Write
  it yourself — the user should never have to compose one. It is documentation
  for the next assistant, not for the user; the two are separate files.

## Reading files is not the same as the tool fetching them

In file-access mode you can read the user's real CSV to understand its shape.
The tool you build still cannot: `fetch()` on a local file is blocked at
runtime.

So use your access to *learn the structure* — column names, separator,
encoding, a few real values — and then build the tool to take the file through
a file picker or drag-and-drop, as described in *Reading files*. Do not bake
the user's data into the tool unless they asked for exactly that.
