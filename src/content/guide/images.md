---
title: Generating images
order: 7
summary: "Canvas plus toBlob() for PNG export. For print, size the canvas at target resolution and scale it down with CSS, or export with a multiplier — 300 dpi needs roughly 3.5x the screen size. Label AI-generated imagery."
read_when: "The tool produces a picture: a sharepic, a graphic for a newsletter, a poster draft, an annotated screenshot."
---

## Canvas to file

```js
canvas.toBlob(function (blob) {
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'grafik.png';
  a.click();
  URL.revokeObjectURL(url);
}, 'image/png');
```

Works from a double-clicked file. Use PNG for graphics and text, JPEG only for
photographs (`toBlob(cb, 'image/jpeg', 0.9)`).

## Screen size is not print size

A canvas sized to look right on screen produces a blurry print. Two ways out:

1. **Size the canvas at target resolution**, then shrink the *display* with
   CSS. Everything is drawn once, at full quality.
   ```js
   var dpi = 300, mmPerInch = 25.4;
   canvas.width  = Math.round(210 / mmPerInch * dpi);   // A4 width  = 2480 px
   canvas.height = Math.round(297 / mmPerInch * dpi);   // A4 height = 3508 px
   canvas.style.width = '210mm';                        // displayed small
   ```
2. **Draw at screen scale and export with a multiplier** — redraw into an
   offscreen canvas scaled by `ctx.scale(f, f)` before exporting.

Common targets: 1080×1080 and 1080×1350 for social, 1920×1080 for a slide,
A5–A2 at 300 dpi for print.

## Text on a canvas

Canvas has no text wrapping. Measure and break lines yourself with
`ctx.measureText()`. Load the brand font before drawing, or the first render
silently uses a fallback:

```js
await document.fonts.load('700 48px "Barlow Semi Condensed"');
await document.fonts.ready;
// only now draw
```

## Working from a user-supplied photo

```js
var img = new Image();
img.onload = function () { ctx.drawImage(img, 0, 0, w, h); };
img.src = URL.createObjectURL(file);
```

A local file drawn into a canvas does not taint it, so `toBlob()` keeps
working. An image loaded from another domain **does** taint the canvas and
export throws — so never pull the photo from a remote URL when the user will
export.

## Two things that matter politically

- **Rights.** For anything published: own photos or clearly licensed material,
  and a credit line where required.
- **Label AI-generated imagery.** Using synthetic images in political
  communication without disclosure invites exactly the debate the user did not
  want to have. Offer a visible label and make it the default.
