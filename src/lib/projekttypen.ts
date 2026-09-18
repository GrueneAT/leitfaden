// Die vier Projekt-Zuschnitte, nach denen der Leitfaden sortiert ist.
// Jedes Kapitel deklariert im Frontmatter, fuer welche Typen es relevant ist —
// daraus entsteht die Einstiegs-Navigation ("lies das, wenn du X baust").

export interface Projekttyp {
  id: string;
  name: string;
  einzeiler: string;
  wann: string;
  aufwand: string;
  beispiel: string;
}

export const PROJEKTTYPEN: Projekttyp[] = [
  {
    id: 'eine-datei',
    name: 'Eine einzige HTML-Datei',
    einzeiler: 'Ein Rechner, ein Formular, eine Checkliste — alles in einer Datei, per Doppelklick geöffnet.',
    wann: 'Du willst etwas ausrechnen, vergleichen oder abhaken und es höchstens per Mail weitergeben.',
    aufwand: 'Eine Sitzung mit der KI. Kein Konto, kein Build, kein Server.',
    beispiel: 'Varianten-Rechner für Abgeltungen an Nachbargemeinden.',
  },
  {
    id: 'statische-seite',
    name: 'Kleine Website',
    einzeiler: 'Mehrere Seiten, öffentlich erreichbar, mit Suche und Navigation.',
    wann: 'Andere sollen es lesen können: eine Anleitung, ein Verzeichnis, eine Materialsammlung.',
    aufwand: 'Ein Nachmittag. Braucht ein GitHub-Konto für die Veröffentlichung.',
    beispiel: 'Dieser Leitfaden. Oder das Werkzeug-Verzeichnis werkzeuge.gruene.at.',
  },
  {
    id: 'datenwerkzeug',
    name: 'Datenwerkzeug',
    einzeiler: 'Datei rein, Auswertung raus — PDF, CSV oder Tabelle wird im Browser gelesen und ausgewertet.',
    wann: 'Du bekommst regelmäßig Unterlagen, die du nicht durchsuchen kannst: Voranschläge, Listen, Protokolle.',
    aufwand: 'Mehrere Sitzungen. Der Aufwand steckt im Einlesen, nicht in der Anzeige.',
    beispiel: 'gemeindefinanzen.gruene.at — mehrere hundert Seiten Voranschlag als Dashboard.',
  },
  {
    id: 'dokument',
    name: 'Gar kein Werkzeug',
    einzeiler: 'Eine Analyse, ein Schreiben, eine Tabelle — einmalig, kein Code.',
    wann: 'Die Aufgabe kommt genau einmal vor. Ein Werkzeug zu bauen wäre Verschwendung.',
    aufwand: 'Minuten bis Stunden, direkt im Chat.',
    beispiel: 'Ein Gutachten zusammenfassen, mit Fundstellen für die Sitzung.',
  },
];

export function projekttyp(id: string): Projekttyp | undefined {
  return PROJEKTTYPEN.find((p) => p.id === id);
}
