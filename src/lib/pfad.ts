// Interne Links immer hierueber bauen. Die Site liegt derzeit im Wurzel-
// verzeichnis der eigenen Domain, aber BASE_URL bleibt die einzige Quelle
// dafuer — nackte Root-Pfade waeren unter einem base-Pfad sofort kaputt.
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
