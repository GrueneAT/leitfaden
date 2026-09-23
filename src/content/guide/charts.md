---
title: Charts
order: 7
summary: "ECharts from CDN as a global script with a pinned version. Read the palette from the design-system CSS tokens --fm-web-chart-1..8 via getComputedStyle — do NOT import fm-charts.js, it is an ES module and fails on file://. Pick the chart type from the claim, label axes, state source and date."
read_when: "The tool visualises numbers."
---

## Choose the form from the claim

Most useless charts exist because the shape was chosen before the statement.

| The claim | The form |
|---|---|
| "More than last year" | grouped bars |
| "This is how the total splits" | stacked bar — not a pie |
| "This is the trend over the years" | line |
| "One number decides it" | the number itself, `fm-metric-card` |
| "Where it comes from, where it goes" | Sankey |

A pie with seven slices says less than a sorted list. For a single figure, the
figure beats every chart.

## ECharts, without modules

```html
<script src="https://cdn.jsdelivr.net/npm/echarts@5.5.1/dist/echarts.min.js"
        crossorigin="anonymous"></script>
```

This build sets a global `echarts` — it works from a classic `<script>` and
from a double-clicked file. **Pin the version.** Verified working from
`file://`.

The design system also publishes `fm-charts.js` with the palette and axis
helpers, but it is an **ES module**: `import` fails on `file://` however many
files the tool has. Read
the tokens from CSS instead — same colours, no module:

```js
function palette() {
  var s = getComputedStyle(document.documentElement);
  var out = [];
  for (var i = 1; i <= 8; i++) {
    out.push(s.getPropertyValue('--fm-web-chart-' + i).trim());
  }
  return out;
}

var chart = echarts.init(document.getElementById('chart'));
chart.setOption({
  color: palette(),
  tooltip: { trigger: 'axis' },
  grid: { left: 60, right: 20, top: 30, bottom: 40 },
  xAxis: { type: 'category', data: jahre },
  yAxis: { type: 'value', name: 'EUR' },
  series: [{ type: 'bar', data: werte }],
});
window.addEventListener('resize', function () { chart.resize(); });
```

The container needs an explicit height — ECharts renders nothing into a
zero-height div, with no error. This is the most common "the chart is blank"
cause.

## What every chart needs

- **Axis labels with the unit.** "EUR", "Anzahl", "%".
- **A source and a date** near the chart. Without them it is not quotable in a
  council meeting.
- **A y-axis that starts at zero** for bars. A truncated axis is how you lose
  an argument about honesty rather than about the matter.
- **Rounded, formatted tick labels** — `de-AT` formatting, not raw floats.
- **A text alternative.** A sentence stating what the chart shows, for anyone
  who cannot see it.

## Simple graphics: inline SVG

For a schematic, a share, a small diagram, no library is needed. SVG is text,
scales, and takes design-system colours:

```html
<svg viewBox="0 0 120 40" role="img" aria-label="3 von 5 Fahrzeugen elektrifizierbar">
  <rect x="0" y="0" width="72" height="40" fill="var(--fm-web-chart-1)"/>
  <rect x="72" y="0" width="48" height="40" fill="var(--fm-web-chart-4)"/>
</svg>
```

`role="img"` plus `aria-label` is not optional — without it the graphic does
not exist for part of the audience.

## Exporting a chart

```js
var url = chart.getDataURL({ pixelRatio: 3, backgroundColor: '#fff' });
```

Set the white background explicitly. A transparent PNG turns black when
pasted into Word or PowerPoint.
