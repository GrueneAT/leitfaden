---
title: Data protection
order: 10
summary: "The tool must not transmit user data — no analytics, no tracking pixels, no remote calls carrying file contents. Say so visibly in the UI. Separately: warn the user not to paste personal data, donor lists or non-public drafts into the chat."
read_when: "Always. Especially when the tool touches names, addresses, finances or anything non-public."
---

Two different questions get mixed up constantly. Keep them apart, and say
which one you are answering.

## 1. What the finished tool does

A tool built to this guide runs entirely in the browser. Nothing is uploaded,
because there is no server. This is the reason it may be used with real
municipal documents at all.

Keep it true:

- **No analytics, no tracking pixels, no counters.**
- **No remote calls carrying content** from the loaded files — not to an API,
  not to a "helpful" lookup service.
- **No fonts or assets that leak the IP address** beyond the CDN resources the
  page already needs.
- If something does go outward — a deep link to an open data portal, say — it
  must be a deliberate click, never a side effect.

Loading the design system and a library from a CDN transmits no user content
and is fine.

State it in the UI, in one visible sentence:

> Alle Daten werden ausschließlich in deinem Browser verarbeitet. Es findet
> keine Übertragung an einen Server statt.

Do not write that sentence unless the code makes it true.

## 2. What goes into the chat

Everything the user pastes into a chat leaves their device and reaches a
provider. When their request would involve sensitive material, say so and
offer the alternative before they paste it.

Never encourage the user to paste:

- Personal data — names with addresses, dates of birth, IBANs, health data,
  population-register extracts
- Donor and member lists. For party-law reporting, helping with the **rules**
  and the **form structure** is fine; the donor list is not
- Non-public drafts and confidential material from the administration
- Third-party documents they are not permitted to pass on

The substitute that works: **structure instead of content.** "I have a table
with the columns Name, Year of birth, District, Amount — write the analysis
for it" produces the same tool without the data. Or: build against invented
sample data, and let the finished tool read the real file locally.

Offer to generate realistic sample data. It is usually the unblocking move.

## Showing a tool in public

Demonstrating in a council session or a talk follows publication rules, not
internal ones: use public or synthetic data, round figures or relabel
municipalities where something is still under negotiation, and for sensitive
documents show the structure rather than the content.
