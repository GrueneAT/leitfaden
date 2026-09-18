---
title: Erste Schritte
kurz: Was du brauchst, bevor du anfängst — und wie das erste eigene Werkzeug in einer halben Stunde entsteht.
reihenfolge: 1
fuer: []
grundlage: true
schwierigkeit: einfach
fuer_ki: "Einstieg: Mindestausstattung (Browser, KI-Chat, optional Editor), das Muster 'eine HTML-Datei, per Doppelklick geöffnet', und die Reihenfolge klein anfangen → benutzen → erweitern."
stand: 2026-09-18
---

## Was du wirklich brauchst

Für die erste Stufe reicht erstaunlich wenig:

- **Ein Browser.** Chrome oder Edge, wenn du später Dateien direkt auf der
  Festplatte bearbeiten willst (siehe [Dateien lesen und
  zurückschreiben](../dateien/)). Sonst tut es jeder.
- **Ein KI-Chat**, der Dateien annimmt und Code schreiben kann.
- **Ein Ordner** auf deinem Rechner, in dem die Sachen liegen.

Nicht nötig: ein Server, ein Hosting-Vertrag, eine Datenbank, ein Konto bei
irgendwem. Die Werkzeuge in diesem Leitfaden laufen **im Browser auf deinem
Gerät**. Das ist kein Kompromiss, sondern der Grund, warum sie
datenschutzrechtlich überhaupt brauchbar sind.

Erst wenn andere dein Werkzeug benutzen sollen, kommt ein GitHub-Konto dazu —
siehe [Veröffentlichen](../veroeffentlichen/).

## Das Grundmuster: eine Datei

Das kleinste sinnvolle Werkzeug ist **eine einzige HTML-Datei**. Sie enthält
Aufbau, Aussehen und Logik in einem Stück, liegt in deinem Downloads-Ordner und
öffnet sich per Doppelklick. Du kannst sie per Mail verschicken, und beim
Empfänger funktioniert sie genauso.

```html
<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Sitzungs-Checkliste</title>
  <link rel="stylesheet" href="https://design-system.gruene.at/design-system.css">
  <style>
    body { margin: 0; padding: 2rem; background: var(--gat-color-surface);
           color: var(--gat-color-text); font-family: var(--gat-font-copy); }
  </style>
</head>
<body>
  <h1>Sitzungs-Checkliste</h1>
  <!-- ab hier baut die KI -->
</body>
</html>
```

Die vier Zeilen `body`-CSS sind nötig, weil das Design-System bewusst keine
HTML-Tags direkt stylt. Ohne sie rendert die Seite in Serifenschrift auf Weiß.
Mehr dazu unter [Aussehen](../design/).

## Die Reihenfolge, die funktioniert

1. **Klein anfangen.** Ein Bildschirm, eine Aufgabe, keine Einstellungen.
   Nicht „ein Werkzeug für die Gemeindearbeit", sondern „rechne mir die vier
   Varianten aus".
2. **Sofort benutzen.** Mit echten Zahlen aus deiner nächsten Sitzung. Fast
   jeder Fehler fällt beim ersten echten Gebrauch auf, keiner beim Lesen des
   Codes.
3. **Erst dann erweitern.** Was du nach drei Anwendungen immer noch vermisst,
   ist ein echtes Feature. Was dir beim Bauen eingefallen ist, meistens nicht.

Der häufigste Fehlschlag ist nicht schlechter Code, sondern ein Werkzeug, das
zu viel auf einmal wollte und deshalb nie fertig wurde.

## Wann es sich überhaupt lohnt

Ein Werkzeug rechnet sich, wenn die Aufgabe **wiederkehrt** oder das Ergebnis
**nachvollziehbar** sein muss. Einmalige Aufgaben löst du schneller direkt im
Chat — das ist kein Rückschritt, sondern die richtige Wahl.

| Situation | Bessere Wahl |
|---|---|
| „Fass mir dieses Gutachten zusammen" | Chat, kein Werkzeug |
| „Jedes Jahr derselbe Voranschlag, jedes Jahr dieselbe Auswertung" | Werkzeug |
| „Ich muss die Rechnung in der Sitzung vorführen können" | Werkzeug |
| „Ich brauche das für einen Zeitungsartikel, einmal" | Chat, kein Werkzeug |

## Nächster Schritt

Wenn klar ist, welchen Zuschnitt dein Projekt hat, geht es weiter mit
[Die KI anleiten](../ki-anleiten/) — dort steht, wie du die Aufgabe so
formulierst, dass brauchbarer Code herauskommt. Sobald es mehr als eine Datei
wird, lohnt sich der Schritt zu einem eigenen Projektordner: [Lokal
arbeiten](../lokal-arbeiten/).
