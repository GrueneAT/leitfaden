// Interne Links immer hierueber bauen. Die Site liegt unter einem base-Pfad
// (/leitfaden), nackte Root-Pfade wuerden auf GitHub Pages ins Leere zeigen.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function pfad(...teile: string[]): string {
  const rest = teile
    .map((t) => t.replace(/^\/|\/$/g, ''))
    .filter(Boolean)
    .join('/');
  return rest ? `${BASE}/${rest}/` : `${BASE}/`;
}

// Fuer Dateien (llms.txt, .md) — ohne abschliessenden Slash.
export function datei(...teile: string[]): string {
  const rest = teile.map((t) => t.replace(/^\/|\/$/g, '')).filter(Boolean).join('/');
  return `${BASE}/${rest}`;
}
