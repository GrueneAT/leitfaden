---
title: Was hinein darf
kurz: Welche Unterlagen in eine KI dürfen, welche nie — und warum Werkzeuge, die im Browser laufen, die Frage entschärfen.
reihenfolge: 10
fuer: [datenwerkzeug, dokument]
grundlage: false
schwierigkeit: einfach
fuer_ki: "Datenschutz: Zwischen Chat (Daten verlassen das Gerät) und fertigem Browser-Werkzeug (Daten bleiben lokal) unterscheiden. Personenbezogene Daten, nicht-öffentliche Entwürfe und Spender- oder Melderegisterdaten gehören nie in einen Chat. Werkzeuge so bauen, dass keine Daten übertragen werden, und das im Werkzeug sichtbar sagen."
stand: 2026-09-18
---

## Zwei verschiedene Fragen

Sie werden ständig vermischt, haben aber unterschiedliche Antworten:

1. **Was gebe ich in den Chat?** Alles, was du dort hineinkopierst, verlässt
   dein Gerät und läuft über die Server eines Anbieters.
2. **Was verarbeitet das fertige Werkzeug?** Wenn es rein im Browser läuft —
   wie alles in diesem Leitfaden — bleiben die Daten auf dem Gerät. Es gibt
   keinen Server, der sie sehen könnte.

Das ist der eigentliche Grund für die Bauweise „alles im Browser": Der
Voranschlag, die Mitgliederliste, das Melderegister-Auszug werden verarbeitet,
ohne je hochgeladen zu werden.

## Was nie in einen Chat gehört

- **Personenbezogene Daten** — Namen mit Adressen, Geburtsdaten, IBANs,
  Gesundheitsangaben, Melderegisterauszüge.
- **Spenden- und Mitgliederdaten.** Bei parteirechtlichen Meldungen ist die
  KI nützlich, um die **Regeln** zu verstehen und das **Formular** zu
  strukturieren — die Spenderliste selbst bleibt draußen.
- **Nicht-öffentliche Entwürfe und Vertrauliches** aus der Gemeindestube, so
  lange sie nicht beschlossen oder veröffentlicht sind.
- **Fremde Unterlagen**, für die du keine Weitergabebefugnis hast.

Brauchbarer Ersatz: Struktur statt Inhalt. „Ich habe eine Tabelle mit den
Spalten Name, Geburtsjahr, Ortsteil, Beitrag — schreib mir die Auswertung
dafür" liefert dasselbe Ergebnis wie das Hochladen der echten Liste, nur ohne
die Liste. Oder: die Daten durch erfundene ersetzen, den Code bauen lassen, und
das fertige Werkzeug dann lokal mit den echten Daten füttern.

## Was das Werkzeug seinen Nutzerinnen sagen muss

Wenn dein Werkzeug Daten verarbeitet, schreib **sichtbar** hinein, was damit
passiert. Ein Satz reicht:

> Alle Daten werden ausschließlich in deinem Browser verarbeitet. Es findet
> keine Übertragung an einen Server statt. Was du löschst oder nicht
> exportierst, ist weg.

Und halt dich daran — das heißt in der Praxis:

- Keine Analyse-Dienste, keine eingebetteten Zählpixel, keine Schriften, die
  beim Laden die IP-Adresse an Dritte melden.
- Keine automatischen Abfragen an fremde Server mit Inhalten aus den
  eingelesenen Dateien.
- Wenn doch etwas nach außen geht — etwa eine Verlinkung zu einem offenen
  Datenportal — muss das eine bewusste Handlung sein, kein Nebeneffekt.

Der Bezug fremder Bibliotheken und des Design-Systems per Adresse ist davon
nicht betroffen: dabei werden keine Inhalte übertragen. Wer auch das vermeiden
will, muss anders bauen — das ist eine bewusste Abwägung, keine
Selbstverständlichkeit.

## Grenzfall: öffentlich vorführen

Wenn du ein Werkzeug in der Sitzung oder in einem Vortrag zeigst, gelten die
Regeln der Veröffentlichung, nicht die der internen Arbeit. Praktisch heißt
das: mit öffentlichen oder erfundenen Daten vorführen, Beträge runden oder
Namen austauschen, wenn noch verhandelt wird, und bei sensiblen Unterlagen nur
den **Aufbau** zeigen, nicht den Inhalt.
