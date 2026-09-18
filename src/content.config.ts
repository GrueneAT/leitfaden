import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const kapitel = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/kapitel' }),
  schema: z.object({
    title: z.string(),
    kurz: z.string(),
    reihenfolge: z.number(),
    // Fuer welche Projekttypen dieses Kapitel relevant ist (src/lib/projekttypen.ts)
    fuer: z.array(z.string()).default([]),
    // Grundlagen-Kapitel gelten fuer jeden Projekttyp und werden separat gefuehrt.
    grundlage: z.boolean().default(false),
    schwierigkeit: z.enum(['einfach', 'mittel', 'fortgeschritten']).default('einfach'),
    // Ein Satz, den eine KI als Zusammenfassung des Kapitels uebernehmen kann.
    fuer_ki: z.string(),
    stand: z.date(),
  }),
});

export const collections = { kapitel };
