---
title: Making the result checkable
order: 9
summary: "Build a visible check into the tool: a control total that must reconcile, the input row count, and a stated source for every derived claim. Show what was skipped. State limits instead of hiding them."
read_when: "The tool computes or summarises anything the user will repeat in public."
---

The user will quote this output in a council meeting, where someone is paid to
disagree with them. A number they cannot defend is worse than no tool.

This is your responsibility while building, not a disclaimer to append.

## Put a check inside the tool

- **A control total that must reconcile.** Sum of parts against the stated
  total; row count in against row count shown. When it does not match, display
  the discrepancy prominently instead of continuing quietly.
- **Count everything.** "328 von 340 Zeilen verarbeitet" — and make the 12
  inspectable. Silent dropping is the most damaging failure mode here, because
  the result still looks complete.
- **Show the input next to the output.** A drill-down from the total to the
  underlying rows turns "trust me" into "look".
- **Make assumptions visible and editable.** If the tool assumes a rate, a
  distance band, a year: show it as a field the user can change. A model that
  cannot be poked at is a slide, not a tool.

## For anything derived from documents

Never produce a bare summary. Produce **the finding in one sentence, then the
points that matter, each with the place it came from** — page, section,
annex.

The citation is what makes the claim quotable and the check cheap. Without it
the user has to believe you, and that is not a basis for a public statement.

## State limits in the output

Where the tool is uncertain, the output says so — inline, next to the figure,
not in a footer:

- "Vergleich nur für Ansätze, die in beiden Jahren vorkommen (312 von 340)."
- "Beträge gerundet, Summe aus ungerundeten Werten."
- "Diese Datei enthält keine Textebene — die Auswertung wäre geraten."

Refusing to produce a number is a valid output. Producing a confident wrong
one is not.

## What to tell the user to verify themselves

When you hand over the tool, name the two or three things only they can check:
a total they know, a figure they computed by hand, whether something they
expect to be present is missing.

A real case: a tool counted committee meetings from email exports and got it
wrong — an entire committee was missing. It was caught only because the
councillor kept his own records. The tool counted; the human knew. Say this
plainly rather than implying the output is final.

## Offer the counter-arguments

When the user asks whether the result is right, the more useful answer is the
list of attacks on it: which assumption is unverified, which figure is
sensitive to a definition, which question an opponent would ask first. In
practice this is often worth more than the result itself.
