---
title: Making it look right
order: 9
summary: "Link https://flomotlik.github.io/design-system/design-system.css and set the four body properties from --fm-* tokens — the design system styles no HTML tags, so without them the page renders unstyled. Use fm-* component classes. Must work at 375px and by keyboard."
read_when: "Always, for anything with a user interface."
---

## One link

```html
<link rel="stylesheet" href="https://flomotlik.github.io/design-system/design-system.css">
```

No npm, no build, no install. Verified working from a double-clicked local
file.

Never copy the file into the project. The same goes for fonts and libraries:
link them, do not vendor them.

For a tool whose look must not shift later — something archived, printed or
handed on — link the frozen version instead:

```html
<link rel="stylesheet" href="https://flomotlik.github.io/design-system/v1/design-system.css">
```

## The four lines everybody forgets

The design system deliberately styles **no HTML tags** — no `body`, no `h1`.
Without your own base layout the page renders as serif text on white and looks
like the stylesheet failed. Minimum:

```css
body {
  margin: 0;
  background: var(--fm-color-surface);
  color: var(--fm-color-text);
  font-family: var(--fm-font-copy);
}
```

## Use the components that exist

| Need | Class |
|---|---|
| Button | `fm-btn`, `fm-btn--primary`, `fm-btn--secondary` |
| Card | `fm-card`, `fm-card__title`, `fm-card__body` |
| Notice | `fm-callout` with `--info` / `--warn` / `--error` / `--success` / `--legal` |
| Table | `fm-table`, `--zebra`, `--compact`, `fm-table__num` |
| Drop zone | `fm-dropzone`, state class `is-dragover` |
| Toast | `fm-toaster` + `fm-toast--info/success/warn/error` |
| Toolbar | `fm-toolbar`, `fm-toolbar__actions` |
| Single figure | `fm-metric-card`, `fm-metric-card__num` |
| Status label | `fm-tag` with `--ok` / `--warn` / `--error` / `--info` |
| Form field | `fm-field`, `fm-field__label`, `fm-input`, `fm-select` |
| Header | `fm-header`, `fm-header__inner`, `fm-header__brand` |
| Tabs | `fm-tabbar`, `fm-tab`, `fm-tab-panel` |
| Body text | `fm-prose`, `fm-headline`, `fm-subline` |

Values come from tokens: `--fm-color-*`, `--fm-space-1..6`, `--fm-text-*`,
`--fm-radius-*`. Hard-code a value only where no token fits.

The full style guide with live markup is at
<https://flomotlik.github.io/design-system/>, a minimal working page at
<https://flomotlik.github.io/design-system/examples/minimal.html>.

## Colours are named by role, not by hue

There is no `--fm-color-blue`. The tokens say what a colour is *for*:
`--fm-color-primary` carries the main action, `--fm-color-secondary` is a
surface that carries dark text, `--fm-color-accent` is the accent. That is
what makes the look changeable without touching a single component — see
*Adapting the look*.

One group is deliberately **not** changeable: `--fm-web-status-*` and the
`warn` / `error` / `success` variants. Green means ok and red means error in
every tool. Do not recolour them to match anything.

## What the design system does not do for you

- **375 px.** Half the audience opens it on a phone. A twelve-column table is
  unusable there however well it is styled — collapse it, scroll it inside
  `fm-table-scroll`, or show fewer columns.
- **Keyboard.** Everything reachable by Tab, focus always visible. Anything
  that only responds to a mouse is broken for some users.
- **Real labels.** A placeholder is not a label; it disappears on typing. Use
  `<label for>`.
- **States.** Loading, done, failed. A tool that does nothing visible for
  twenty seconds after a click is assumed broken and closed.
- **Contrast.** Grey-on-light is unreadable on a projector in a meeting room.
- **Errors in plain language.** "This file has no text layer — it was probably
  scanned" beats any exception text.
