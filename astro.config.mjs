import { defineConfig } from 'astro/config';

// Veroeffentlicht unter der persoenlichen GitHub-Pages-Adresse:
// https://flomotlik.github.io/ai-build-guide/
// Daraus folgt base: '/ai-build-guide' — interne Links immer ueber src/lib/pfad.ts
// bauen, nie als nackter Root-Pfad ("/guide/...").
export default defineConfig({
  site: 'https://flomotlik.github.io',
  base: '/ai-build-guide',
  trailingSlash: 'always',
  outDir: './dist',
  build: {
    inlineStylesheets: 'auto',
  },
});
