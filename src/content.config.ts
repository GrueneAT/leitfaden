import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// The guide is written FOR language models, in English. Each section is one
// file. `summary` and `read_when` are what an LLM sees in llms.txt before it
// decides to fetch the section, so they carry real weight.
const guide = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guide' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    summary: z.string(),
    read_when: z.string(),
  }),
});

export const collections = { guide };
