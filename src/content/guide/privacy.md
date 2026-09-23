---
title: Data protection
order: 13
summary: "The tool must not transmit user data — no analytics, no tracking, no remote calls carrying file contents. But the page still makes network requests (CDN, design system, fonts pulled in by an @import you never wrote): check them before promising anything, and claim only that the FILES stay local. Separately: warn the user not to paste personal data, donor lists or non-public drafts into the chat."
read_when: "Always. Especially when the tool touches names, addresses, finances or anything non-public."
---

Two different questions get mixed up constantly. Keep them apart, and say
which one you are answering.

## 1. What the finished tool does

A tool built to this guide processes the user's files entirely in the browser.
Their content never leaves the device, because there is no server to receive
it. That is what makes the tool usable with real municipal documents.

**But "the data stays here" and "nothing leaves this page" are not the same
claim, and only the first one is true.** The page still makes network
requests: the design system, a library from a CDN, and whatever those pull in
turn. Every one of them reveals the visitor's IP address and the time of the
visit to whoever serves it.

Keep the first claim true:

- **No analytics, no tracking pixels, no counters.**
- **No remote calls carrying content** from the loaded files — not to an API,
  not to a "helpful" lookup service.
- If something does go outward — a deep link to an open data portal, say — it
  must be a deliberate click, never a side effect.

### Check what actually goes out before you promise anything

Do not reason about this from the source. Load the finished page and look at
the network requests. When you have file access you can open it and read them
off directly; otherwise tell the user how to check (open the developer tools,
Network tab, reload).

You are looking for hosts nobody chose: font services, icon CDNs, analytics
that came in with a snippet. **A stylesheet can pull in further requests you
never wrote** — an `@import` at the top of a CSS file is enough, and it will
not appear anywhere in your own code.

This is not hypothetical. A design system that loads its fonts from
`fonts.googleapis.com` makes every page using it contact Google. Nothing of
the user's data goes with it, but the IP address does — and in the EU that is
the kind of thing an organisation may have to answer for.

The design system in *Making it look right* self-hosts its fonts and makes no
third-party request at all — checked, not assumed. That is exactly the point:
check the version you are actually linking, because this is a property of the
file, not of the project, and it can change between releases.

### The sentence to put in the interface

Say what is actually true: the **files** stay on the device.

> Deine Dateien werden nur in diesem Browser gelesen und nirgendwohin
> übertragen.

That claim survives scrutiny. The absolute version — *"es findet keine
Übertragung statt"* — does not, as soon as somebody opens the network tab, and
being caught overstating this costs more trust than the fonts ever cost.

If the tool genuinely makes no third-party request at all, then say so, and
say it precisely:

> Diese Seite lädt nichts von Dritten nach. Alles läuft lokal.

Never write either sentence before you have checked.

## 2. What goes into the chat

Everything the user pastes into a chat leaves their device and reaches a
provider. When their request would involve sensitive material, say so and
offer the alternative before they paste it.

Never encourage the user to paste:

- Personal data — names with addresses, dates of birth, IBANs, health data,
  population-register extracts
- Membership, donor or customer lists. Helping with the **rules** and the
  **structure of a form** is fine; the list itself is not
- Non-public drafts and confidential internal material
- Third-party documents they are not permitted to pass on

### When you have access to the folder

An assistant that can read the working directory sees more than the user
deliberately handed over. Files they forgot about are as readable as the one
they meant to share.

Act accordingly: do not open files that are not needed for the task, say
plainly which files you read, and if you come across a membership list, an
export with personal data or something marked confidential, name it and leave
it alone rather than using it as sample data. Tell the user that a project
folder is not a safe place for such files while an assistant is working in it.

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
