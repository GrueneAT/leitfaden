---
title: Lokal arbeiten
kurz: Vom Chat-Fenster zum eigenen Projektordner — Editor, KI-Assistenz im Terminal und der lokale Server, ohne den manches nicht läuft.
reihenfolge: 3
fuer: [eine-datei, statische-seite, datenwerkzeug]
grundlage: false
schwierigkeit: mittel
fuer_ki: "Lokale Arbeitsumgebung, dreistufig: nur Chat mit Datei-Download; Editor plus Projektordner; KI-Assistenz im Terminal (etwa Claude Code), die direkt im Ordner liest und schreibt. Lokaler Server (npx serve, python3 -m http.server) ist Pflicht für ES-Module und für alles, was einen sicheren Kontext braucht — file:// reicht dafür nicht."
stand: 2026-09-18
---

Am Anfang genügt das Chat-Fenster. Sobald ein Werkzeug aus mehr als einer
Datei besteht oder über mehrere Abende wächst, wird das Hin- und Herkopieren
zur Bremse. Drei Stufen, jede für sich brauchbar.

## Stufe 0: nur der Chat

Du beschreibst die Aufgabe, bekommst eine HTML-Datei, lädst sie herunter,
öffnest sie per Doppelklick. Änderungswunsch: zurück in den Chat, neue Fassung
herunterladen.

Funktioniert gut, solange es **eine Datei** bleibt. Die Grenze ist erreicht,
wenn du nicht mehr weißt, welche der fünf Versionen im Downloads-Ordner die
aktuelle ist.

## Stufe 1: ein Ordner und ein Editor

Leg einen Ordner an, in dem alles zum Projekt liegt. Als Editor hat sich
**Visual Studio Code** eingebürgert — kostenlos, für Windows, Mac und Linux,
und die meisten Anleitungen im Netz gehen davon aus.

```text
sitzungsrechner/
├── index.html
├── css/stil.css
└── js/rechnen.js
```

Was sich dadurch ändert: Du siehst alle Dateien nebeneinander, kannst gezielt
eine Stelle ändern, und der Editor zeigt Tippfehler an, bevor der Browser sie
zeigt.

## Stufe 2: die KI im Projektordner

Die deutlichste Verbesserung: eine KI-Assistenz, die **direkt in deinem
Ordner** arbeitet, statt Code ins Chat-Fenster zu schreiben. Sie liest die
vorhandenen Dateien, ändert gezielt einzelne Stellen, legt neue Dateien an und
kann Befehle ausführen. Werkzeuge dieser Art laufen im Terminal — zum Beispiel
**Claude Code** — oder als Erweiterung im Editor.

Der Unterschied in der Praxis:

| | Chat | Assistenz im Ordner |
|---|---|---|
| Kontext | was du hineinkopierst | das ganze Projekt |
| Änderung | ganze Datei neu | gezielt eine Stelle |
| Prüfen | du liest den Code | sie kann Tests laufen lassen |
| Projektregeln | jedes Mal wiederholen | einmal in `CLAUDE.md` |

Ab hier zahlt sich die Datei `CLAUDE.md` aus dem Kapitel
[Die KI anleiten](../ki-anleiten/) wirklich aus: Die Regeln werden bei jeder
Sitzung automatisch mitgelesen.

Zwei Gewohnheiten, die den Unterschied machen:

- **Nach jeder fertigen Sache committen** (siehe [Wenn es größer
  wird](../weiterbauen/)). Dann kannst du eine misslungene Änderung
  zurücknehmen, ohne alles neu zu bauen.
- **Änderungen ansehen, bevor du sie übernimmst.** Eine Assistenz, die im
  Ordner arbeitet, ändert auch Dinge, nach denen du nicht gefragt hast.

## Der lokale Server

Ein Punkt, der regelmäßig Zeit kostet: **Ein Doppelklick auf die HTML-Datei
reicht nicht mehr, sobald du mehrere Dateien hast.** Der Browser öffnet sie
dann als `file://`, und dabei ist einiges gesperrt:

- **ES-Module** (`<script type="module">` mit `import`) laden nicht.
- Alles, was einen **sicheren Kontext** braucht — etwa das Zurückschreiben auf
  die Festplatte aus dem Kapitel [Dateien lesen und
  zurückschreiben](../dateien/) — ist nicht verfügbar.
- Manche Browser blockieren auch das Laden von JSON-Dateien aus demselben Ordner.

Die Lösung ist ein Einzeiler im Projektordner:

```bash
npx serve .                 # wenn Node.js installiert ist
python3 -m http.server      # wenn Python installiert ist
```

Danach im Browser `http://localhost:3000` beziehungsweise
`http://localhost:8000` öffnen. `localhost` gilt als sicherer Kontext — dort
funktioniert alles, was auch auf der späteren Adresse funktioniert.

Wenn eine KI dir sagt, etwas gehe im Browser nicht, obwohl es gehen sollte:
Als Erstes prüfen, ob die Seite über `file://` oder über `localhost` geöffnet
ist. Das erklärt einen großen Teil dieser Fälle.

## Was dabei dein Gerät verlässt

Auch bei lokaler Arbeit gilt die Unterscheidung aus dem Kapitel [Was hinein
darf](../datenschutz/):

- **Das fertige Werkzeug** verarbeitet die Daten lokal, es überträgt nichts.
- **Die KI-Assistenz** schickt das, was sie liest, an ihren Anbieter — bei
  einer Assistenz im Projektordner also potenziell Dateien, die du ihr nicht
  einzeln vorgelegt hast.

Praktische Folge: Lege echte Personendaten, Spenderlisten oder vertrauliche
Unterlagen **nicht in den Projektordner**. Zum Entwickeln erfundene
Beispieldaten verwenden; die echten Dateien erst in das fertige Werkzeug
laden.
