---
title: Adapting the look
order: 10
summary: "The design system is token-driven, so a different organisation's colours are one extra stylesheet — lokal.css linked AFTER design-system.css, overriding ~15 tested tokens in a plain :root block. Never fork or copy the design system. Ask before rebranding; keep status colours, spacing and radii untouched; re-check contrast."
read_when: "The tool is NOT for the Austrian Greens — another country's party, a local group with its own colours, an association, or a neutral tool."
---

The design system in *Making it look right* is the Austrian Greens'. Most
tools built from this guide are theirs, so it is the default. When the tool is
for someone else, you do not fork it and you do not drop it — you override a
short list of tokens.

## Ask first. This is not automatic.

Do **not** rebrand because the user mentioned another country. Adapt the look
only when you know who the tool represents, and say what you are doing:

- The user names another party or organisation → ask which colours apply, or
  whether they want it neutral.
- The user is a councillor in another country but the tool is for their own
  use → the default is fine. Nobody needs a rebrand for a spreadsheet
  replacement.
- The user says nothing about branding → leave it alone and mention once that
  it can be adapted.

Using another party's branding without being asked is worse than using none.

## The hook: one extra stylesheet

Create `lokal.css` next to `index.html` and link it **after** the design
system:

```html
<link rel="stylesheet" href="https://design-system.gruene.at/design-system.css">
<link rel="stylesheet" href="lokal.css">
```

```css
/* lokal.css — Farben für <Organisation>.
   Quelle der Werte: <Styleguide, URL oder wer sie genannt hat>, <Datum>.
   Nur Tokens überschreiben, keine Komponenten nachbauen. */
:root {
  /* Marke */
  --gat-color-dunkelgruen: #3d7a26;
  --gat-color-hellgruen:   #8cc63f;
  --gat-web-green:         #3d7a26;   /* Kopfleiste, Akzentlinien */
  --gat-web-green-deep:    #2d5c1c;   /* Hover, gedrückter Zustand */
  --gat-web-green-tint:    #eaf5e3;   /* Flächen, Zebrastreifen */

  /* Zweitfarben — nur wenn die Organisation welche hat */
  --gat-color-accent:      #e6007e;
  --gat-color-highlight:   #ffed00;

  /* Diagrammpalette: erste zwei die Marke, Rest unterscheidbar halten */
  --gat-web-chart-1: #3d7a26; --gat-web-chart-2: #8cc63f;
  --gat-web-chart-3: #2f7ea8; --gat-web-chart-4: #d9a520;
  --gat-web-chart-5: #c2662f; --gat-web-chart-6: #97527c;
  --gat-web-chart-7: #5b6b8c; --gat-web-chart-8: #87907b;

  /* Schrift — nur wenn wirklich eine andere vorgeschrieben ist */
  /* --gat-font-headline: "Deine Schrift", sans-serif; */
  /* --gat-font-copy:     "Deine Schrift", sans-serif; */
}
```

**Why a plain `:root` block is enough:** the design system's defaults live
inside `@layer` rules, and unlayered declarations beat layered ones regardless
of order. Verified: overriding these tokens repaints the primary button, the
header rule, metric-card accents and the chart palette, with no leftovers of
the original green anywhere on the page.

Derived values follow on their own — the focus ring and the table stripe are
computed from the tokens above with `color-mix`, so they come along without
being listed.

## What to leave alone

- **Status colours.** `--gat-web-tag-*`, `--gat-web-callout-*`,
  `--gat-web-toast-*`. Green means ok and red means error in every
  organisation; recolouring them to match a brand destroys the meaning.
- **Spacing, radii, font sizes.** `--gat-space-*`, `--gat-radius-*`,
  `--gat-text-*`. These are the layout rhythm, not the brand.
- **Text and surface colours**, unless the brand genuinely demands it — they
  are what carries the contrast.
- **Component classes.** Never redefine `.gat-btn` and friends in `lokal.css`.
  The moment you restyle components instead of tokens, the next design-system
  update breaks your tool silently.

One token that looks useful and is not: `--gat-color-dunkelgruen-strong` is
unused by any component. Overriding it changes nothing.

## The logo

The header logo is a file, not a token:

```html
<img class="gat-header__logo" src="logo.svg" alt="<Organisation>">
```

Put the organisation's own file next to `index.html`. If you have no logo
file, use the wordmark alone — `gat-header__wordmark` with the name in it
looks deliberate, a stretched or wrong-colour logo does not. Never recolour
somebody else's logo to fit.

## The brand colour is usually too light. Plan for it.

This is the most common failure, not an edge case. `--gat-color-dunkelgruen`
and `--gat-web-green` carry **white text** on buttons and the header, so they
need a contrast ratio of at least **4.5:1 against white** to be readable.

Measured:

| Colour | Contrast to white | |
|---|---|---|
| `#257639` — the Austrian Greens' green | 5.63:1 | passes |
| `#3d7a26` — the example above | 5.24:1 | passes |
| `#78be20` — a typical bright party green | 2.29:1 | **fails badly** |

Many party greens are bright, because they were chosen for print and logos,
not for white text on screen. When the brand colour fails:

**Do not change the brand colour.** Split the roles instead:

```css
:root {
  /* Die Markenfarbe bleibt, wo sie als Fläche wirkt */
  --gat-color-hellgruen:  #78be20;   /* Markenfarbe, flächig */
  --gat-web-green-tint:   #eef7e2;   /* helle Fläche, dunkler Text darauf */

  /* Abgedunkelte Variante überall dort, wo weisse Schrift darauf liegt */
  --gat-color-dunkelgruen: #3f6610;  /* aus der Markenfarbe abgedunkelt */
  --gat-web-green:         #3f6610;
  --gat-web-green-deep:    #2e4b0b;
}
```

Say in the file that the darker value is derived from the brand colour for
legibility, not invented. That is a decision someone will otherwise "correct"
back later.

## Check it afterwards, do not assume

- **Contrast.** Measure, do not eyeball: white text on the primary button, the
  body text, and anything sitting on a tinted surface. 4.5:1 for normal text,
  3:1 for large text.
- **The chart palette.** Eight colours must stay distinguishable from each
  other, including for the most common colour-vision deficiencies. Two shades
  of the same brand green next to each other in a stacked bar are a problem,
  not a brand.
- **Look at the page.** Load it and check the header, a primary button, a
  table and a chart. Token overrides are cheap to get almost right and easy to
  get subtly wrong.

## Write down what you changed

In `lokal.css`, state where the colour values came from and when — a style
guide, a website, or simply "the user gave these". A future reader has to be
able to tell a decision from a guess. This is the same rule as in
*Documenting the tool*.

If the tool represents no organisation at all, say so in the file rather than
leaving the Austrian Greens' colours in place by accident.
