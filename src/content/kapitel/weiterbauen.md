---
title: Wenn es größer wird
kurz: Ab wann ein Werkzeug ein Projekt wird — Ordnerstruktur, Aufgabenzettel, Versionierung und die Übergabe an die nächste Sitzung.
reihenfolge: 11
fuer: [statische-seite]
grundlage: false
schwierigkeit: fortgeschritten
fuer_ki: "Projektreife: Projektregeln in CLAUDE.md, README mit Zweck und Startanleitung, Arbeit in kleinen Issues statt großer Aufträge, Git mit kleinen thematischen Commits, jede Änderung in einem eigenen Zweig. Keine Werkzeug-Attribution in Commits oder Code."
stand: 2026-09-18
---

Die meisten Werkzeuge bleiben eine Datei, und das ist in Ordnung. Wenn eines
über Monate weiterlebt oder mehrere Leute daran arbeiten, ändern sich die
Anforderungen.

## Die Schwelle

Zeit für Struktur ist es, wenn eines davon zutrifft:

- Du erklärst in jeder neuen Sitzung dieselben Dinge von vorn.
- Eine Änderung macht regelmäßig eine andere Stelle kaputt.
- Jemand anderer soll etwas beitragen können.
- Du willst zu einer früheren Fassung zurück und kannst es nicht.

## Vier Dateien, die den Unterschied machen

```text
mein-werkzeug/
├── README.md        Was ist das, für wen, wie startet man es
├── CLAUDE.md        Projektregeln für die KI-Assistenz
├── .gitignore       Was nicht ins Repository gehört
└── src/             Der eigentliche Code
```

`CLAUDE.md` ist die wirksamste. Alles, was du sonst in jedem Gespräch
wiederholst, steht dort einmal: gesetzte Technik, Sprache der Oberfläche,
Verbotenes, wie getestet wird. Siehe [Die KI anleiten](../ki-anleiten/).

## In kleinen Schritten arbeiten

Ein großer Auftrag („bau die Auswertung um") liefert etwas, das du nicht mehr
prüfen kannst. Zerleg ihn in Punkte, die einzeln fertig werden und einzeln
abnehmbar sind:

- *Mehrjahresvergleich: zweites Jahr einlesen und nebeneinander anzeigen*
- *Kontrollsumme über beide Jahre, Warnung wenn sie nicht aufgeht*
- *Export der Vergleichstabelle als CSV*

Wenn das Projekt auf GitHub liegt, sind das Issues. Sie sind zugleich die
Erinnerung daran, was du in drei Wochen eigentlich vorhattest.

## Versionsverwaltung, in der kürzesten Form

Es braucht nur drei Gewohnheiten:

1. **Kleine, thematische Commits.** Eine Sache pro Commit, Beschreibung in
   einem Satz: `Kontrollsumme über Mehrjahresvergleich prüfen`.
2. **Jede Änderung in einem eigenen Zweig**, nicht direkt auf `main`. So bleibt
   die veröffentlichte Fassung immer funktionsfähig, während du arbeitest.
3. **Nach jeder abgeschlossenen Sache committen.** Nicht am Ende des Abends,
   sondern wenn eine Sache funktioniert.

Commit-Beschreibungen und Code beschreiben, **was** geändert wurde — nicht,
womit gearbeitet wurde. Keine Werkzeug-Hinweise, keine „erstellt mit"-Zeilen.

## Die Übergabe an die nächste Sitzung

Der Kontext einer KI ist mit dem Gespräch zu Ende. Was die nächste Sitzung
wissen muss, muss im Projekt stehen — in `CLAUDE.md`, in der README, in den
Issues oder in einem kurzen `NOTIZEN.md` mit dem aktuellen Stand und den
offenen Entscheidungen.

Eine Frage, die sich am Ende jeder Sitzung lohnt:

> Fass zusammen, was wir geändert haben, was noch offen ist und welche
> Entscheidungen wir getroffen haben — als Ergänzung für die Projektnotizen.

## Wenn andere es nutzen sollen

Dann gelten die Punkte aus [Veröffentlichen](../veroeffentlichen/) — Lizenz,
Kontaktweg, Eintrag im Werkzeug-Verzeichnis. Und einer kommt dazu: Jemand
Fremder muss das Werkzeug **ohne dich** benutzen können. Setz dich einmal
daneben, wenn es jemand zum ersten Mal öffnet, und sag nichts. Die Stellen, an
denen die Person zögert, sind die Liste der nächsten Verbesserungen.
