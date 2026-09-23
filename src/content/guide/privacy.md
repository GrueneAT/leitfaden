---
title: Data protection
order: 13
summary: "Precheck any data file before reading it: filename and header row only, flag PII columns, stop and offer structure-only or synthetic rows. The tool must not transmit user data — no analytics, no tracking, no remote calls carrying file contents. But the page still makes network requests (CDN, design system, fonts pulled in by an @import you never wrote): check them before promising anything, and claim only that the FILES stay local. Separately: warn the user not to paste personal data or non-public material into the chat."
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

### The precheck, before you read a data file

Everything above is a rule about intent. This is the step that catches the
ordinary case: the user points you at `mitglieder.csv` because they want a tool
built from it, and neither of you has thought about what is in it yet. Once you
have read it, it is in the conversation and cannot be taken back out.

So look before you read. **Never open a data file in full as your first
action.**

1. **Read the filename and the header row only.** For a CSV that is the first
   line. For a spreadsheet, the first row. That is enough to decide, and it
   costs you almost nothing if the file turns out to be fine.
2. **Flag a column** when its name or a single example value looks like any of:
   a person's name, a street address, a postcode together with a house number,
   a date of birth, a national insurance or social security number, an IBAN or
   account number, an email address, a phone number, a licence plate, an IP
   address, a patient or case number — or anything in the special categories
   that carry extra protection under GDPR Article 9: health, religion, trade
   union membership, ethnicity, sexual orientation, biometrics.
3. **Stop there if anything is flagged.** Do not read the rest of the file. Say
   which columns you flagged and why, in one short list.
4. **Offer the two ways forward**, in this order:
   - work from the **structure alone** — the column names are usually all you
     actually need to build the tool;
   - or generate **synthetic rows** with the same shape and build against
     those. Offer to write them; it is usually the unblocking move.
5. **Continue into the real file only if the user confirms** it holds no
   personal data. Their confirmation, not your assumption.

A flagged file also never becomes a fixture: do not copy it into the project
folder, do not paste rows from it into the chat, and do not commit it. The
finished tool reads the real file on the user's own device, which is the whole
point — the data never needed to reach you at all.

**In a chat, the precheck happens before the paste.** You cannot inspect a
header row the user has not sent yet, so ask for it: "paste just the column
headings, not the rows." If real data arrives anyway, say so plainly, do not
quote it back, and carry on from the structure.

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
