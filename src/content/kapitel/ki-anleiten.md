---
title: Die KI anleiten
kurz: Wie du eine Aufgabe so formulierst, dass brauchbarer Code herauskommt — und wie du die KI auf diesen Leitfaden verweist.
reihenfolge: 2
fuer: []
grundlage: true
schwierigkeit: einfach
fuer_ki: "Arbeitsweise: Aufgabe vor Lösung beschreiben, echte Beispieldaten mitgeben, in kleinen überprüfbaren Schritten arbeiten, Projektregeln in eine CLAUDE.md/AGENTS.md schreiben, und diesen Leitfaden per URL als Referenz einbinden."
stand: 2026-09-18
---

## Beschreibe die Aufgabe, nicht die Lösung

Der häufigste Fehler ist, der KI zu sagen, *wie* sie es bauen soll. Sie kennt
die Technik besser als du. Was sie nicht kennt, ist dein Problem.

> **Schlecht:** „Bau mir eine React-App mit einer Tabelle und einem Chart."
>
> **Gut:** „Ich bekomme jedes Jahr einen Voranschlag als PDF, mehrere hundert
> Seiten. Ich will sehen, was sich gegenüber dem Vorjahr verändert hat, und in
> der Sitzung auf einzelne Posten klicken können. Hier ist das PDF von 2025."

Gib mit:

- **Echte Beispieldaten.** Eine Datei, ein Screenshot, drei Zeilen aus der
  Tabelle. Das Windkraft-Beispiel in unseren Projekten begann mit zwei
  Screenshots von Vorschlägen — mehr gab es nicht, und es hat gereicht.
- **Wer es benutzt.** „Ich, allein, am Laptop" führt zu etwas anderem als
  „zwanzig Gemeinderätinnen, davon die Hälfte am Handy".
- **Woran du merkst, dass es stimmt.** Eine Kontrollsumme, ein bekanntes
  Ergebnis, eine Zeile, die du schon von Hand gerechnet hast.

## In kleinen Schritten, die du prüfen kannst

Bitte um **einen** Schritt, sieh ihn dir an, dann den nächsten. Ein Werkzeug,
das in einem Rutsch entsteht, kannst du nicht mehr prüfen — und was du nicht
prüfen kannst, kannst du im Gemeinderat nicht vertreten.

Bewährte Reihenfolge bei Datenwerkzeugen:

1. Datei einlesen und **roh anzeigen**, was erkannt wurde. Noch keine Auswertung.
2. Eine Kennzahl rechnen, gegen einen bekannten Wert prüfen.
3. Erst dann Darstellung, Diagramme, Feinschliff.

## Projektregeln aufschreiben

Sobald ein Projekt über eine Sitzung hinausgeht, leg eine Datei namens
`CLAUDE.md` (bzw. `AGENTS.md`) in den Projektordner. Assistenzwerkzeuge lesen
sie automatisch und halten sich daran. Inhalt: was das Projekt ist, welche
Technik gesetzt ist, was verboten ist.

```markdown
# Projektregeln

Werkzeug zur Auswertung von Gemeindevoranschlägen. Läuft ausschließlich im
Browser, kein Server, kein Build-Schritt.

- Vanilla JavaScript als ES-Module. Kein Framework, kein Bundler.
- Fremdbibliotheken per CDN einbinden, niemals ins Repo kopieren.
- Design-System per Link einbinden: https://design-system.gruene.at/design-system.css
- Oberflächentexte auf Deutsch.
- Vor jeder Änderung an der Auswertung: Kontrollsumme prüfen.
```

Das ist der wirksamste einzelne Hebel. Regeln, die in der Datei stehen, musst
du nicht in jedem Gespräch wiederholen.

## Diesen Leitfaden als Referenz mitgeben

Dieser Leitfaden ist so gebaut, dass eine KI ihn selbst lesen kann. Es gibt
eine maschinenlesbare Übersicht aller Kapitel unter
`https://grueneat.github.io/leitfaden/llms.txt`, und jedes Kapitel gibt es
zusätzlich als reinen Text unter der Kapitel-Adresse mit `.md` am Ende.

Satz zum Kopieren an den Anfang eines Gesprächs:

```text
Bevor du anfängst: lies https://grueneat.github.io/leitfaden/llms.txt
und hol dir die zwei bis drei Kapitel, die zu meiner Aufgabe passen
(jedes Kapitel gibt es als reinen Text unter <Kapitel-Adresse>.md).
Halte dich an die dortigen Vorgaben zu Technikwahl, Dateiverarbeitung
und Design-System. Meine Aufgabe:
```

Die vollständige Fassung mit Varianten steht auf der Seite
[Für die KI](../../fuer-ki/).

## Was du selbst prüfen musst

Die KI rechnet, du weißt Bescheid — beides ist nötig. In einem realen Fall hat
eine KI aus Sitzungseinladungen eine Ausschuss-Statistik gebaut; die erste
Zählung war falsch, ein ganzer Ausschuss fehlte. Aufgefallen ist es nur, weil
der Gemeinderat seine eigenen Aufzeichnungen dagegenhielt.

Prüf grundsätzlich selbst:

- **Summen und Anzahlen** gegen eine Quelle, die du kennst.
- **Vollständigkeit**: fehlt etwas, das da sein müsste?
- **Fundstellen**: bei Textauswertungen immer Seiten- oder Kapitelangabe
  verlangen, damit jede Aussage nachschlagbar bleibt.

Mehr dazu unter [Dass es wirklich stimmt](../qualitaet/).
