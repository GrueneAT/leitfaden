---
title: Dass es wirklich stimmt
kurz: Kontrollsummen, Fundstellen, Tests und Bildschirmfotos — die Prüfungen, ohne die ein Werkzeug im Sitzungssaal nicht trägt.
reihenfolge: 8
fuer: [eine-datei, dokument]
grundlage: false
schwierigkeit: mittel
fuer_ki: "Qualitätssicherung: Kontrollsummen und ein von Hand gerechneter Referenzfall gehören in jedes Rechenwerkzeug; Textauswertungen immer mit Fundstelle; automatische Tests für die Rechenlogik; Playwright-Bildschirmfotos, die vor dem Commit angesehen werden. Absichtlich nach Fehlern und Gegenargumenten fragen."
stand: 2026-09-18
---

Ein Werkzeug, dessen Zahl du im Gemeinderat nicht verteidigen kannst, ist
schlimmer als gar keines. Diese vier Prüfungen kosten wenig und tragen weit.

## 1. Kontrollsumme und Referenzfall

In jedes Werkzeug, das rechnet, gehört eine Zahl, die aufgehen **muss** —
Summe der Teile gleich Gesamtsumme, Zahl der eingelesenen Zeilen gleich Zahl
der Zeilen in der Quelle. Stimmt sie nicht, zeigt das Werkzeug das an, statt
weiterzurechnen.

Dazu ein **Referenzfall**: ein Beispiel, das du einmal von Hand gerechnet hast
und dessen Ergebnis du kennst. Nach jeder Änderung als Erstes dagegen prüfen.

> Bei einem Varianten-Rechner für Abgeltungen an Nachbargemeinden waren es die
> Kontrollsummen, die die Sache belastbar gemacht haben — und die Möglichkeit,
> eigene Werte einzusetzen. Ein Modell, an dem man nicht drehen kann, ist eine
> Folie, kein Werkzeug.

## 2. Fundstellen statt Zusammenfassungen

Bei allem, was aus Dokumenten kommt: nicht „fass zusammen", sondern **„das
Ergebnis in einem Satz, dann die entscheidenden Punkte, jeder mit der Stelle,
aus der er stammt"**. Kapitel, Seite, Beilage.

Die Fundstelle macht die Aussage im Sitzungssaal zitierfähig — und die
Nachprüfung billig. Ohne sie musst du der KI glauben, und das ist keine
Grundlage für eine Wortmeldung.

## 3. Tests für die Rechenlogik

Sobald mehr als eine Formel im Spiel ist, lohnen automatische Tests. Nicht für
die Oberfläche — für das Rechnen:

```js
// pruefung.test.js
import { anteilNachEntfernung } from "./rechnen.js"

test("Gemeinde innerhalb der ersten Zone bekommt den vollen Satz", () => {
  expect(anteilNachEntfernung(1200, 50000)).toBe(50000)
})

test("Summe aller Anteile entspricht der Gesamtsumme", () => {
  const anteile = verteile(gesamt, gemeinden)
  expect(anteile.reduce((a, b) => a + b, 0)).toBe(gesamt)
})
```

Die Tests sind auch die beste Beschreibung dessen, was das Werkzeug tun soll.
Bitte die KI, **zuerst** die Fälle aufzuschreiben, die stimmen müssen, und erst
dann zu bauen.

## 4. Bildschirmfotos ansehen, nicht nur Code lesen

Was optisch kaputt ist, sieht man nicht im Code. In `Gemeindeordnung` ist es
deshalb verbindlich: Bevor eine Änderung an Vorlagen, CSS oder JavaScript
eingecheckt wird, werden Bildschirmfotos erzeugt und **angesehen** — Desktop
und 375 Pixel Mobilbreite, Startseite, Detailseite, Suche, aufgeklappte
Zustände.

```bash
npx playwright test --project=desktop-chromium
```

Der Ablauf funktioniert auch mit einer KI-Assistenz, die Bilder lesen kann:
Bildschirmfotos erzeugen lassen, dann die Bilddateien ansehen lassen und
gezielt nach Abweichungen fragen. Das findet abgeschnittene Überschriften,
überlappende Elemente und unlesbare Kontraste, die in jedem Code-Review
durchrutschen.

## Die Frage, die am meisten bringt

Frag die KI nicht, ob es passt — frag nach den Gegenargumenten:

> Was an dieser Auswertung könnte falsch sein? Welche Annahme steckt drin, die
> ich nicht geprüft habe? Welche drei Fragen würde jemand stellen, der das
> Ergebnis angreifen will?

Bei einer Fahrzeugbeschaffung war genau das der wertvollste Teil: nicht die
Antwort, sondern die Liste der kritischen Rückfragen — darunter die, ob hier
Fahrzeuglänge mit Ladeflächenlänge verwechselt wurde. Diese eine Frage hat die
ganze Beschaffung gedreht.
