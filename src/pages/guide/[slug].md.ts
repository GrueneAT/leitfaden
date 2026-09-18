import type { APIRoute, GetStaticPaths } from 'astro';
import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';

// Plain-text output per section. An assistant that needs only one topic
// fetches <section>.md instead of the HTML page.
export const getStaticPaths: GetStaticPaths = async () => {
  const abschnitte = await getCollection('guide');
  return abschnitte.map((eintrag) => ({ params: { slug: eintrag.id }, props: { eintrag } }));
};

export const GET: APIRoute = ({ props }) => {
  const { eintrag } = props as { eintrag: CollectionEntry<'guide'> };
  const d = eintrag.data;
  const kopf = [
    `# ${d.title}`,
    '',
    `Section ${d.order} of the build guide at https://grueneat.github.io/leitfaden/guide/`,
    `Read when: ${d.read_when}`,
    `Summary: ${d.summary}`,
    '',
    '---',
    '',
  ].join('\n');
  return new Response(kopf + eintrag.body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
