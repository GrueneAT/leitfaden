---
title: Making it look right
order: 9
summary: "Link https://design-system.gruene.at/design-system.css and set the four body properties from --gat-* tokens — the design system styles no HTML tags, so without them the page renders unstyled. Use gat-* component classes. Must work at 375px and by keyboard."
read_when: "Always, for anything with a user interface."
---

## One link

```html
<link rel="stylesheet" href="https://design-system.gruene.at/design-system.css">
```

No npm, no build, no install. The URL is stable and centrally maintained.
Verified working from a double-clicked local file.

Never copy the file into the project. The same goes for logos, fonts and
libraries: link them, do not vendor them.

This is the **Austrian Greens'** design system. If the tool is for another
party, another country or an association, do not fork it — override a short
list of tokens in a separate stylesheet, as described in *Adapting the look*.

## The four lines everybody forgets

The design system deliberately styles **no HTML tags** — no `body`, no `h1`.
Without your own base layout the page renders as serif text on white and looks
like the stylesheet failed. Minimum:

```css
body {
  margin: 0;
  background: var(--gat-color-surface);
  color: var(--gat-color-text);
  font-family: var(--gat-font-copy);
}
```

## Use the components that exist

| Need | Class |
|---|---|
| Button | `gat-btn`, `gat-btn--primary`, `gat-btn--secondary` |
| Card | `gat-card`, `gat-card__title`, `gat-card__body` |
| Notice | `gat-callout` with `--info` / `--warn` / `--error` / `--success` |
| Table | `gat-table`, `--zebra`, `--compact`, `gat-table__num` |
| Drop zone | `gat-dropzone`, state class `is-dragover` |
| Toast | `gat-toaster` + `gat-toast--info/success/warn/error` |
| Toolbar | `gat-toolbar`, `gat-toolbar__actions` |
| Single figure | `gat-metric-card`, `gat-metric-card__num` |
| Status label | `gat-tag` with `--ok` / `--warn` / `--error` / `--info` |
| Form field | `gat-field`, `gat-field__label`, `gat-input`, `gat-select` |
| Header | `gat-header`, `gat-header__inner`, `gat-header__brand` |

Values come from tokens: `--gat-color-*`, `--gat-space-1..6`, `--gat-text-*`,
`--gat-radius-*`. Hard-code a value only where no token fits.

The full style guide with live markup is at
<https://design-system.gruene.at/>, a minimal working page at
<https://design-system.gruene.at/examples/minimal.html>.

## What the design system does not do for you

- **375 px.** Half the audience opens it on a phone. A twelve-column table is
  unusable there however well it is styled — collapse, scroll it inside
  `gat-table-scroll`, or show fewer columns.
- **Keyboard.** Everything reachable by Tab, focus always visible. Anything
  that only responds to a mouse is broken for some users.
- **Real labels.** A placeholder is not a label; it disappears on typing. Use
  `<label for>`.
- **States.** Loading, done, failed. A tool that does nothing visible for
  twenty seconds after a click is assumed broken and closed.
- **Contrast.** Grey-on-light is unreadable on a projector in a council
  chamber.
- **Errors in plain language.** "Diese Datei enthält keine Textebene — sie ist
  vermutlich eingescannt" beats any exception text.
