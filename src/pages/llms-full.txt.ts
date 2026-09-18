import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const BASIS = 'https://grueneat.github.io/leitfaden';

// The whole guide in one document, so an assistant can take it in a single
// fetch instead of following links per section.
export const GET: APIRoute = async () => {
  const abschnitte = (await getCollection('guide')).sort((a, b) => a.data.order - b.data.order);

  const teile: string[] = [];
  teile.push('# Build guide: small local tools for people without a development setup');
  teile.push('');
  teile.push(
    'Complete text, all sections. Source: ' + BASIS + '/guide/ · Index: ' + BASIS + '/llms.txt',
  );
  teile.push('');
  teile.push('Maintained by the Austrian Greens. The audience is a part-time local councillor');
  teile.push('or volunteer with a browser and a chat window — no terminal, no editor, no');
  teile.push('package manager. Every rule below follows from that.');
  teile.push('');

  for (const a of abschnitte) {
    teile.push('---');
    teile.push('');
    teile.push(`## ${a.data.order}. ${a.data.title}`);
    teile.push('');
    teile.push(`Read when: ${a.data.read_when}`);
    teile.push('');
    // Headings inside a section are shifted one level down so the combined
    // document keeps a single coherent outline.
    teile.push(a.body.replace(/^## /gm, '### ').replace(/^# /gm, '## '));
    teile.push('');
  }

  return new Response(teile.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
