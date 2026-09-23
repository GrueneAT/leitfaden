---
title: Tables and numbers
order: 6
summary: "Use fm-table with fm-table__num for figures; right-align and use tabular-nums. Format with de-AT locale. Show a total row and make it verifiable. Sorting and filtering in plain JS, no grid library."
read_when: "The tool shows rows of data or does arithmetic the user will quote."
---

Most of these tools are, at heart, a table plus a number. Get both right and
the tool is credible.

## Markup

```html
<div class="fm-table-scroll">
  <table class="fm-table fm-table--zebra">
    <thead>
      <tr><th>Ansatz</th><th class="fm-table__num">2025</th><th class="fm-table__num">2026</th></tr>
    </thead>
    <tbody id="rows"></tbody>
    <tfoot>
      <tr><th>Summe</th><td class="fm-table__num" id="sum25"></td><td class="fm-table__num" id="sum26"></td></tr>
    </tfoot>
  </table>
</div>
```

`fm-table__num` right-aligns and switches on tabular figures so digits line
up in columns. `fm-table-scroll` keeps a wide table scrolling inside itself
instead of breaking the page on a phone. `fm-table--compact` and
`--dense` exist for data-heavy views.

## Formatting numbers

Never print a raw float at an Austrian or German audience.

```js
var euro = new Intl.NumberFormat('de-AT', {
  style: 'currency', currency: 'EUR', maximumFractionDigits: 0
});
var num = new Intl.NumberFormat('de-AT');

euro.format(1234567.8);   // "1.234.568 €"
num.format(0.385);        // "0,385"
```

Reading them back is the mirror problem: `"1.234,50"` must become `1234.5`,
not `NaN` and not `1.234`. Strip thousands separators, then swap the decimal
comma.

## Arithmetic that survives scrutiny

- **Round only for display.** Compute on full precision; a table whose rounded
  rows do not add up to the rounded total destroys trust instantly.
- **For money, work in cents** (integers) when you sum many values, and
  divide at the end.
- **Always show a total row** and, where the data allows, a check: the sum of
  the parts against an independently stated total. Display the discrepancy
  when it does not match instead of hiding it.
- **Never silently drop rows.** If 12 of 340 rows could not be parsed, say
  "328 von 340 Zeilen gelesen, 12 übersprungen" and let the user see which.

## Sorting and filtering

Plain JavaScript. No grid library — for a few thousand rows it is unnecessary
weight, and it fights the design system.

```js
rows.sort(function (a, b) { return b.betrag - a.betrag; });
```

Use `localeCompare('de')` for text so umlauts sort correctly. Above roughly
5,000 rows, render only what is visible or paginate; below that, just redraw
the `<tbody>`.

Make the active sort and filter visible in the UI. A filtered table that looks
like a complete one is how wrong numbers end up in a council meeting.
