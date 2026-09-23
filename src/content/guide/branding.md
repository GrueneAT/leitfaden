---
title: Adapting the look
order: 10
summary: "The design system is token-driven, so different colours are one extra stylesheet — local.css linked AFTER design-system.css, overriding about eight role tokens in a plain :root block. Never fork or copy the design system. Ask before applying anyone's branding; leave status colours, spacing and radii untouched; re-check contrast."
read_when: "The tool represents an organisation with its own colours, or the default look is wrong for the job."
---

The design system ships a neutral default. When a tool belongs to an
organisation with its own colours, you do not fork the stylesheet and you do
not drop it — you override a short list of tokens.

## Ask first. This is not automatic.

Do **not** rebrand because the user mentioned an organisation. Adapt the look
only when you know who the tool represents, and say what you are doing:

- The user names an organisation → ask which colours apply, or whether they
  want it neutral.
- The user works somewhere but the tool is for their own use → the default is
  fine. Nobody needs a rebrand for a spreadsheet replacement.
- The user says nothing about branding → leave it alone and mention once that
  it can be adapted.

Using an organisation's branding without being asked is worse than using none.

## The hook: one extra stylesheet

Create `local.css` next to `index.html` and link it **after** the design
system:

```html
<link rel="stylesheet" href="https://flomotlik.github.io/design-system/design-system.css">
<link rel="stylesheet" href="local.css">
```

```css
/* local.css — colours for <organisation>.
   Source of the values: <style guide, URL, or who supplied them>, <date>.
   Override tokens only; never rebuild a component. */
:root {
  /* Brand roles */
  --fm-color-primary:        #1f4a6d;   /* carries white text */
  --fm-color-primary-strong: #14324a;   /* deepened, for opacity stacking */
  --fm-color-secondary:      #8fb4cc;   /* surface, carries dark text */
  --fm-color-accent:         #9a4a1c;   /* accent, carries white text */

  /* Screen layer — header, rules, tints, focus ring */
  --fm-web-primary-deep:     #245a80;
  --fm-web-primary:          #5b8cad;
  --fm-web-primary-tint:     #e4edf4;

  /* Chart palette: first one may carry the brand, the rest must stay
     distinguishable from each other */
  --fm-web-chart-1: #2f6f96; --fm-web-chart-2: #c08a2e;
  --fm-web-chart-3: #4e8f6d; --fm-web-chart-4: #a8503c;
  --fm-web-chart-5: #6d5b9e; --fm-web-chart-6: #4fb0ad;
  --fm-web-chart-7: #6b4a2e; --fm-web-chart-8: #7d838c;

  /* Type — only if a different face is genuinely prescribed */
  /* --fm-font-headline: "Your face", sans-serif; */
  /* --fm-font-copy:     "Your face", sans-serif; */
}
```

That is the whole list. Because the tokens are named by **role** rather than
by hue, there is nothing to translate: `--fm-color-primary` is the primary
colour whatever colour it happens to be.

**Why a plain `:root` block is enough:** the design system's defaults live
inside `@layer` rules, and unlayered declarations beat layered ones regardless
of order.

Derived values follow on their own — the focus ring and the table stripe are
computed from the tokens above with `color-mix`, so they come along without
being listed.

## What to leave alone

- **Status colours.** `--fm-web-status-*`, and the `warn` / `error` /
  `success` variants of callouts, tags and toasts. Green means ok and red
  means error in every organisation; recolouring them to match a brand
  destroys the meaning. The one exception is `info`, which draws from the
  primary tint and follows the brand on purpose.
- **Spacing, radii, font sizes.** `--fm-space-*`, `--fm-radius-*`,
  `--fm-text-*`. These are the layout rhythm, not the brand.
- **Text and surface colours**, unless the brand genuinely demands it — they
  are what carries the contrast.
- **Component classes.** Never redefine `.fm-btn` and friends in `local.css`.
  The moment you restyle components instead of tokens, the next design-system
  update breaks your tool silently.

## The brand colour is usually too light. Plan for it.

This is the most common failure, not an edge case. `--fm-color-primary` and
`--fm-web-primary-deep` carry **white text**, so they need a contrast ratio of
at least **4.5:1 against white**.

Many brand colours are bright, because they were chosen for print and logos,
not for white text on screen. When the brand colour fails:

**Do not change the brand colour.** Split the roles instead:

```css
:root {
  /* the brand colour stays where it works as a surface */
  --fm-color-secondary:    #78be20;   /* brand colour, as a surface */
  --fm-web-primary-tint:   #eef7e2;   /* light fill, dark text on it */

  /* a darkened variant everywhere white text sits on it */
  --fm-color-primary:      #3f6610;   /* derived from the brand colour */
  --fm-web-primary:        #3f6610;
  --fm-web-primary-deep:   #2e4b0b;
}
```

Say in the file that the darker value is derived from the brand colour for
legibility, not invented. That is a decision someone will otherwise "correct"
back later.

## The logo

The header logo is a file, not a token:

```html
<img class="fm-header__logo" src="logo.svg" alt="<Organisation>">
```

Put the organisation's own file next to `index.html`. The design system ships
no logo of its own. If you have no logo file, use the wordmark alone —
`fm-header__wordmark` with the name in it looks deliberate, a stretched or
recoloured logo does not. Never recolour somebody else's logo to fit.

## Check it afterwards, do not assume

- **Contrast.** Measure, do not eyeball: white text on the primary button, the
  body text, and anything sitting on a tinted surface. 4.5:1 for normal text,
  3:1 for large text.
- **The chart palette.** Eight colours must stay distinguishable from each
  other, including for the most common colour-vision deficiencies. Two shades
  of the same brand colour next to each other in a stacked bar are a problem,
  not a brand.
- **Look at the page.** Load it and check the header, a primary button, a
  table and a chart. Token overrides are cheap to get almost right and easy to
  get subtly wrong.

## Write down what you changed

In `local.css`, state where the colour values came from and when — a style
guide, a website, or simply "the user gave these". A future reader has to be
able to tell a decision from a guess. This is the same rule as in
*Documenting the tool*.

If the tool represents no organisation at all, leave the default alone. It is
deliberately neutral.
