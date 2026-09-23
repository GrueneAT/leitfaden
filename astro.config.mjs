import { defineConfig } from 'astro/config';

// Veroeffentlicht unter der eigenen Domain:
// https://ai-build-guide.flomotlik.me/
// Die Site liegt damit im Wurzelverzeichnis (base: '/'). Interne Links
// trotzdem immer ueber src/lib/pfad.ts bauen — dann traegt ein spaeterer
// Umzug unter einen base-Pfad keine Aenderung in die Seiten.
export default defineConfig({
  site: 'https://ai-build-guide.flomotlik.me',
  base: '/',
  trailingSlash: 'always',
  outDir: './dist',
  build: {
    inlineStylesheets: 'auto',
  },
});
