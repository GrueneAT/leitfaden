import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const BASIS = 'https://flomotlik.github.io/ai-build-guide';

// Entry point for AI assistants, per the llms.txt convention. English on
// purpose. Kept short: the core constraints inline, everything else linked.
export const GET: APIRoute = async () => {
  const abschnitte = (await getCollection('guide')).sort((a, b) => a.data.order - b.data.order);

  const z: string[] = [];
  z.push('# Build guide: small local tools for people without a development setup');
  z.push('');
  z.push(
    '> How to build a small tool for someone who has a browser and nothing else — no terminal, ' +
      'no editor, no package manager, no admin rights.',
  );
  z.push('');
  z.push('## Read this first');
  z.push('');
  z.push('Unless the user explicitly asks for something else:');
  z.push('');
  z.push('- Deliver a folder the user saves. `index.html` must run from a double-click (`file://`).');
  z.push('  No build step, no bundler, no npm, no local server, nothing to install.');
  z.push('- One file is right for a small tool handed over IN A CHAT, because the user saves it manually.');
  z.push('  If you can write files into a folder yourself, that argument does not apply — split freely.');
  z.push('  Classic `<script src>` and `<link>` DO work across files on `file://`, subfolders included;');
  z.push('  splitting never requires a server.');
  z.push('- Having a terminal does not mean the user has one. Never leave behind anything that needs');
  z.push('  a build step, a package manager or a local server to run or to change. If they could not');
  z.push('  edit one label six months from now with a browser and a text editor, simplify.');
  z.push('- NO `<script type="module">` and NO `import`. ES modules are blocked on `file://`');
  z.push('  (CORS against origin `null`) and the tool arrives dead. Use classic `<script>` tags');
  z.push('  and CDN libraries that expose a global (UMD).');
  z.push('- NO `fetch()` or XHR on a local file — also blocked. Ship data as a `.js` file that');
  z.push('  assigns a global (`window.DATEN = {...}`), loaded with a plain `<script src>`.');
  z.push('- Pin every CDN version. `@latest` breaks the tool on a random day.');
  z.push('- Link the design system: https://design-system.flomotlik.me/design-system.css');
  z.push('  It styles no HTML tags — you must set `body` margin/background/color/font-family from the `--fm-*` tokens.');
  z.push('  Its colours are named by ROLE (--fm-color-primary, -secondary, -accent), never by hue.');
  z.push('  For an organisation with its own colours do not fork or copy it: add a `local.css` AFTER it');
  z.push('  that overrides about eight role tokens in a plain `:root` block (see "Adapting the look").');
  z.push('  Ask before rebranding — never apply an organisation\'s colours unprompted. Never recolour');
  z.push('  --fm-web-status-* or the warn/error/success variants: green means ok everywhere.');
  z.push('- Write the interface in the language the tool will be USED in — derived from the organisation,');
  z.push('  institution or audience, NOT from the language the request was written in. A request in English');
  z.push('  about a Flemish town council means a Dutch interface. Ask once if the two genuinely conflict.');
  z.push('  Number/date format, the readme filename and export labels follow that same language.');
  z.push('  This guide and the rules file you leave behind stay English — they are not the interface.');
  z.push('- Process the user’s files locally. No analytics, no tracking, no remote call carrying their data.');
  z.push('- The page still makes network requests (CDN, design system — and a stylesheet `@import` can pull');
  z.push('  in fonts you never wrote). LOAD THE FINISHED PAGE AND CHECK the network requests before you');
  z.push('  write any privacy claim into the interface. Claim that the FILES stay local, which is true;');
  z.push('  do not claim that nothing is transmitted at all unless you verified exactly that.');
  z.push('- Scope by the question, not by screen count: build the smallest thing that actually answers it.');
  z.push('  Test each control with "can they answer their question without this?" — if yes, leave it out.');
  z.push('  A year selector in a year-comparison tool is required, not feature creep. No login, no');
  z.push('  onboarding, no second job. Ship it before adding anything else.');
  z.push('- Build a visible check into the tool: control total, row count in vs. shown, source for every derived claim.');
  z.push('- Document inside the tool first: a one-line purpose under the title, help at the field that');
  z.push('  needs it, the data-handling sentence, and a date in the footer. Then ONE short plain-text');
  z.push('  readme in the folder. No docs folder, no changelog.');
  z.push('- Never encourage pasting personal data or non-public documents into the chat. Offer sample data instead.');
  z.push('');
  z.push('Verified in Chromium on `file://` (`isSecureContext` is true). These work:');
  z.push('localStorage, IndexedDB, File System Access API, canvas `toBlob()`, clipboard, CDN resources,');
  z.push('and your own CSS/JS/images by relative path via classic tags, across subfolders.');
  z.push('These do NOT: ES modules, `fetch()`/XHR on a local file, service workers.');
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
  z.push('- [Design system](https://design-system.flomotlik.me/): tokens, components, live style guide');
  z.push(`- [Human-readable start page](${BASIS}/en/)`);
  z.push('');

  return new Response(z.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
