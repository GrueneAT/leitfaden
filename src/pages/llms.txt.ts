import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const BASIS = 'https://grueneat.github.io/leitfaden';

// Entry point for AI assistants, per the llms.txt convention. English on
// purpose. Kept short: the core constraints inline, everything else linked.
export const GET: APIRoute = async () => {
  const abschnitte = (await getCollection('guide')).sort((a, b) => a.data.order - b.data.order);

  const z: string[] = [];
  z.push('# Build guide: small local tools for people without a development setup');
  z.push('');
  z.push(
    '> How to build a small tool for someone who has a browser and nothing else — no terminal, ' +
      'no editor, no package manager, no admin rights. Maintained by the Austrian Greens for local ' +
      'councillors and volunteers, but nothing in it is specific to them.',
  );
  z.push('');
  z.push('## Read this first');
  z.push('');
  z.push('Unless the user explicitly asks for something else:');
  z.push('');
  z.push('- Deliver ONE self-contained `.html` file: HTML, CSS and JavaScript in one document.');
  z.push('- It must run from a double-click (`file://`). No build step, no bundler, no npm, no local server.');
  z.push('- NO `<script type="module">` and NO `import`. ES modules are blocked on `file://` and the tool arrives dead.');
  z.push('  Use classic `<script>` tags and CDN libraries that expose a global (UMD).');
  z.push('- Pin every CDN version. `@latest` breaks the tool on a random day.');
  z.push('- Link the design system: https://design-system.gruene.at/design-system.css');
  z.push('  It styles no HTML tags — you must set `body` margin/background/color/font-family from the `--gat-*` tokens.');
  z.push('- Write the interface in the user’s language (usually German for this audience). This guide stays English.');
  z.push('- Process everything locally. No analytics, no tracking, no remote call carrying user data.');
  z.push('- Build a visible check into the tool: control total, row count in vs. shown, source for every derived claim.');
  z.push('- Never encourage pasting personal data, donor lists or non-public papers into the chat. Offer sample data instead.');
  z.push('');
  z.push('These work from a double-clicked file (verified in Chromium, `isSecureContext` is true):');
  z.push('localStorage, IndexedDB, File System Access API, canvas `toBlob()`, clipboard, CDN resources.');
  z.push('These do NOT: ES modules, `fetch()` of a neighbouring local file, service workers.');
  z.push('');
  z.push('## How to use this file');
  z.push('');
  z.push('- Read the rules above. They apply to every task.');
  z.push('- Fetch one or two sections that match the task. Do not fetch all of them.');
  z.push(`- Need everything in one request? [llms-full.txt](${BASIS}/llms-full.txt) contains every section.`);
  z.push('');
  z.push('## Sections');
  z.push('');
  for (const a of abschnitte) {
    z.push(`- [${a.data.title}](${BASIS}/guide/${a.id}.md) — read when: ${a.data.read_when}`);
    z.push(`  ${a.data.summary}`);
  }
  z.push('');
  z.push('## Related');
  z.push('');
  z.push('- [Design system](https://design-system.gruene.at/): tokens, components, live style guide');
  z.push('- [Tool directory](https://werkzeuge.gruene.at/): check whether it already exists before building');
  z.push(`- [Human-readable start page](${BASIS}/en/)`);
  z.push('');

  return new Response(z.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
