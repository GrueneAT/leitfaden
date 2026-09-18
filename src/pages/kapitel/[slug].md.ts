import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';

// Rohtext-Ausgabe je Kapitel. Eine KI, die nur dieses eine Thema braucht,
// holt sich <kapitel-adresse>.md statt der HTML-Seite — deutlich weniger
// Ballast, identischer Inhalt.
export const getStaticPaths: GetStaticPaths = async () => {
  const kapitel = await getCollection('kapitel');
  return kapitel.map((eintrag) => ({
    params: { slug: eintrag.id },
    props: { eintrag },
  }));
};

export const GET: APIRoute = ({ props }) => {
  const { eintrag } = props as { eintrag: any };
  const d = eintrag.data;
  const kopf = [
    `# ${d.title}`,
    '',
    d.kurz,
    '',
    `Kapitel ${d.reihenfolge} des Leitfadens · Schwierigkeit: ${d.schwierigkeit} · Stand: ${d.stand.toISOString().slice(0, 10)}`,
    `Quelle: https://grueneat.github.io/leitfaden/kapitel/${eintrag.id}/`,
    '',
    `Kurzfassung für KI-Assistenzen: ${d.fuer_ki}`,
    '',
    '---',
    '',
  ].join('\n');

  return new Response(kopf + eintrag.body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
