import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    pillar: z.string(),
    order: z.number(),
    summary: z.string(),
    employer: z.string(),
    period: z.string(),
    headlineClaim: z.string(),
    outcomes: z.array(z.string()).min(1),
    quote: z.string().optional(),
    doAgain: z.string(),
  }),
});

const thinking = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/thinking' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number(),
    draft: z.boolean().default(false),
  }),
});

const quote = z.object({
  text: z.string(),
  role: z.string(),
  company: z.string(),
  date: z.string(),
  capsule: z.string().optional(),
});

const record = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/record' }),
  schema: z.object({
    id: z.string(),
    date: z.string(),
    year: z.string(),
    month: z.string().nullable(),
    era: z.string(),
    company: z.string(),
    title: z.string(),
    type: z.string(),
    themes: z.array(z.string()),
    lane: z.enum(['work', 'beyond']),
    total: z.number(),
    tier: z.enum(['public', 'line']),
    summary: z.string().optional(),
    what_would_have_happened: z.string().optional(),
    the_call: z.string().optional(),
    what_i_did: z.string().optional(),
    what_changed: z.string().optional(),
    metrics: z.array(z.object({ value: z.string(), label: z.string(), context: z.string() })).optional(),
    quotes: z.array(quote).optional(),
    images: z
      .array(z.object({ src: z.string(), kind: z.string(), pending: z.boolean(), alt: z.string() }))
      .optional(),
  }),
});

const recordSummaries = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/record-summaries' }),
  schema: z.object({
    slug: z.string(),
    label: z.string(),
    employer: z.string(),
    years: z.string(),
    order: z.number(),
    lane: z.enum(['work', 'beyond']),
    events: z.number(),
    capsules: z.number(),
    public: z.number(),
    status: z.enum(['live', 'coming-soon']),
    headline: z.string(),
    headline_capsule: z.string().nullable(),
    year_layers: z.array(
      z.object({
        year: z.string(),
        narrative: z.string(),
        numbers: z.array(z.string()),
        top: z.array(z.string()),
        quote: quote.nullable(),
        months: z.array(z.string()),
        also: z.array(z.string()),
        count: z.number(),
      }),
    ),
    company: z
      .object({
        arc: z.array(z.object({ when: z.string(), what: z.string() })),
        scope: z.array(z.string()).default([]),
        signatures: z.array(z.object({ title: z.string(), body: z.string(), capsule: z.string().nullable() })),
        numbers: z.array(z.string()),
        quotes: z.array(quote),
        took: z.string(),
        took_draft: z.boolean(),
      })
      .nullable(),
  }),
});

export const collections = { work, thinking, record, 'record-summaries': recordSummaries };
