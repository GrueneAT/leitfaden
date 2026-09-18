import { defineConfig } from 'astro/config';

// Veroeffentlicht unter der Organisations-Adresse, ohne eigene gruene.at-Domain:
// https://grueneat.github.io/leitfaden/
// Daraus folgt base: '/leitfaden' — interne Links immer ueber src/lib/pfad.ts
// bauen, nie als nackter Root-Pfad ("/kapitel/...").
export default defineConfig({
  site: 'https://grueneat.github.io',
  base: '/leitfaden',
  trailingSlash: 'always',
  outDir: './dist',
  build: {
    inlineStylesheets: 'auto',
  },
});
