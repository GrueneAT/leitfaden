import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { PROJEKTTYPEN } from '../lib/projekttypen';

const BASIS = 'https://grueneat.github.io/leitfaden';

// Maschinenlesbarer Einstieg nach der llms.txt-Konvention. Eine KI, die auf
// diesen Leitfaden verwiesen wird, liest zuerst diese Datei und holt sich
// daraus gezielt die ein bis drei Kapitel, die zur Aufgabe passen.
export const GET: APIRoute = async () => {
  const kapitel = (await getCollection('kapitel')).sort(
    (a, b) => a.data.reihenfolge - b.data.reihenfolge,
  );

  const zeilen: string[] = [];
  zeilen.push('# Leitfaden: eigene kleine Web-Werkzeuge bauen');
  zeilen.push('');
  zeilen.push(
    '> Vorgaben und Rezepte für kleine Werkzeuge, die vollständig im Browser laufen — ' +
      'ohne Server, ohne Konto, ohne Build-Schritt, wo es ohne geht. Zielgruppe sind ' +
      'Gemeinderätinnen, Gemeinderäte und lokale Gruppen, die mit einer KI-Assistenz ' +
      'etwas Eigenes bauen. Herausgeber: Die Grünen Österreich.',
  );
  zeilen.push('');
  zeilen.push('## So benutzt du diese Datei');
  zeilen.push('');
  zeilen.push(
    '- Wähle anhand der Aufgabe den passenden Projekttyp und lies die dort genannten Kapitel.',
  );
  zeilen.push(
    '- Jedes Kapitel gibt es als reinen Markdown-Text unter der angegebenen `.md`-Adresse.',
  );
  zeilen.push(
    '- Lies nicht alles. Zwei bis drei Kapitel genügen für nahezu jede Aufgabe.',
  );
  zeilen.push('');
  zeilen.push('## Grundsätze, die für alle Projekte gelten');
  zeilen.push('');
  zeilen.push('- Alles läuft im Browser auf dem Gerät. Kein Server, keine Übertragung von Nutzerdaten.');
  zeilen.push('- Einfachste tragfähige Technik: eine HTML-Datei oder Vanilla-JS-Module, Framework nur mit Begründung.');
  zeilen.push('- Fremdbibliotheken per CDN mit fest angegebener Version, niemals ins Projekt kopieren.');
  zeilen.push('- Design-System einbinden: https://design-system.gruene.at/design-system.css');
  zeilen.push('- Oberflächentexte auf Deutsch. Keine Werkzeug-Attribution in Code oder Commits.');
  zeilen.push('- Jede Rechnung braucht eine Kontrollsumme, jede Textauswertung eine Fundstelle.');
  zeilen.push('');
  const grundlagen = kapitel.filter((k) => k.data.grundlage);
  zeilen.push('## Projekttypen');
  zeilen.push('');
  zeilen.push(
    `Für jeden Typ zuerst lesen: ${grundlagen.map((k) => k.data.title).join(', ')}. ` +
      'Danach nur die unten genannten Kapitel — mehr braucht keine Aufgabe.',
  );
  zeilen.push('');
  for (const typ of PROJEKTTYPEN) {
    const passend = kapitel.filter((k) => !k.data.grundlage && k.data.fuer.includes(typ.id));
    zeilen.push(`### ${typ.name}`);
    zeilen.push(`${typ.einzeiler} Wann: ${typ.wann} Aufwand: ${typ.aufwand}`);
    if (passend.length) {
      zeilen.push(
        `Relevante Kapitel: ${passend.map((k) => k.data.title).join(', ')}`,
      );
    }
    zeilen.push('');
  }
  zeilen.push('## Kapitel');
  zeilen.push('');
  for (const k of kapitel) {
    zeilen.push(
      `- [${k.data.reihenfolge}. ${k.data.title}](${BASIS}/kapitel/${k.id}.md): ${k.data.fuer_ki}`,
    );
  }
  zeilen.push('');
  zeilen.push('## Weiterführend');
  zeilen.push('');
  zeilen.push(`- [Seite für KI-Assistenzen](${BASIS}/fuer-ki/): fertige Prompt-Bausteine und Projektregeln`);
  zeilen.push('- [Design-System](https://design-system.gruene.at/): Tokens, Komponenten, Style Guide');
  zeilen.push('- [Werkzeug-Verzeichnis](https://werkzeuge.gruene.at/): bestehende Werkzeuge, bevor du neu baust');
  zeilen.push('');

  return new Response(zeilen.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
