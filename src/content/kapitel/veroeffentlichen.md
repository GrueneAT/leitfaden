---
title: Veröffentlichen
kurz: Von der Datei auf deinem Rechner zu einer Adresse, die du weitergeben kannst — kostenlos über GitHub Pages.
reihenfolge: 10
fuer: [statische-seite]
grundlage: false
schwierigkeit: fortgeschritten
fuer_ki: "Veröffentlichung über GitHub Pages: statisches Repo, Actions-Workflow mit upload-pages-artifact und deploy-pages, Pages-Quelle auf GitHub Actions stellen. Bei Unterordner-Adresse (org.github.io/repo/) müssen alle internen Pfade den base-Pfad berücksichtigen. Keine Geheimnisse ins Repo, alles ist öffentlich."
stand: 2026-09-18
---

Solange das Werkzeug nur dir gehört, reicht die Datei auf der Festplatte.
Sobald es jemand anderer benutzen soll, braucht es eine Adresse. Für statische
Seiten ist GitHub Pages der kürzeste Weg: kostenlos, ohne Server, ohne
laufende Kosten.

Realistisch: Das ist der Schritt, an dem es technisch wird. Er lohnt sich,
wenn mehr als eine Handvoll Leute das Werkzeug nutzen soll.

## Der kürzeste Weg

1. Konto auf <https://github.com> anlegen.
2. Neues Repository anlegen, öffentlich.
3. Dateien hineinlegen — im Browser per „Add file → Upload files" reicht für
   den Anfang.
4. Unter **Settings → Pages** als Quelle **GitHub Actions** wählen.
5. Bei jedem Push wird neu veröffentlicht.

Die Adresse ist dann `https://<organisation>.github.io/<repo>/`. Eine eigene
Domain ist möglich, aber nicht nötig — dieser Leitfaden selbst liegt unter der
Organisationsadresse.

## Der Workflow

Für eine Seite ganz ohne Build-Schritt genügt es, den Ordner hochzuladen.
Sobald gebaut wird, kommt eine Datei `.github/workflows/pages.yml` dazu:

```yaml
name: Deploy zu GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

## Die zwei Stolpersteine

**Pfade im Unterordner.** Liegt die Seite unter
`organisation.github.io/repo/`, zeigt jeder Link, der mit `/` beginnt, ins
Leere — er landet auf `organisation.github.io/` statt im Projekt. Entweder
alle internen Links relativ halten, oder im Generator einen `base`-Pfad setzen
und konsequent verwenden. Das ist die mit Abstand häufigste Ursache für „lokal
sieht es gut aus, veröffentlicht ist alles kaputt".

**Alles ist öffentlich.** Ein öffentliches Repository zeigt jede Datei und
jede frühere Fassung. Zugangsdaten, Schlüssel, interne Unterlagen und echte
Personendaten gehören nicht hinein — auch nicht in eine Beispieldatei, auch
nicht „nur kurz zum Testen". Was einmal gepusht wurde, bleibt in der Historie.

## Was noch dazugehört

- **Eine README.** Was ist das, für wen, wie benutzt man es. Zwei Absätze.
- **Eine Lizenz.** Ohne Lizenzdatei darf formal niemand dein Werkzeug
  weiterverwenden. Für Werkzeuge und Inhalte in diesem Umfeld ist CC BY 4.0
  oder MIT üblich.
- **Ein Kontaktweg.** Eine Mailadresse oder der Hinweis auf die Issues des
  Repositories, damit Rückmeldungen ankommen.
- **Ein Eintrag im Werkzeug-Verzeichnis.** Wenn es für andere Gruppen
  brauchbar ist, gehört es auf <https://werkzeuge.gruene.at/> — eine
  Markdown-Datei als Pull Request.
