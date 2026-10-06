import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const thinking = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/thinking' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number(),
    draft: z.boolean().default(false),
    /** The LinkedIn article this essay was adapted from, if any. */
    linkedin: z.string().url().optional(),
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
      .array(z.object({ src: z.string(), kind: z.string(), pending: z.boolean(), alt: z.string(), width: z.number(), height: z.number() }))
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

const talks = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/talks' }),
  schema: z.object({
    id: z.string(),
    session_no: z.number(),
    date: z.string(),
    date_label: z.string().nullable(),
    year: z.string(),
    month: z.string().nullable(),
    era: z.string(),
    company: z.string(),
    role: z.enum(['speaker', 'co-presenter', 'judge', 'organizer', 'program']),
    format: z.string(),
    confidence: z.string(),
    title: z.string(),
    audience: z.string(),
    summary: z.string(),
    attendees: z.string().nullable(),
    responses: z.number().nullable(),
    reach_note: z.string().nullable(),
    images: z.array(z.object({ src: z.string(), alt: z.string(), caption: z.string().optional() })).optional(),
    rating: z.object({ value: z.number(), scale: z.number() }).nullable(),
    feedback: z
      .object({
        responses: z.number(),
        ratings: z.array(
          z.object({
            label: z.string(),
            average: z.number(),
            scale: z.number(),
            low: z.number().nullable(),
            high: z.number().nullable(),
            count: z.number(),
          }),
        ),
        themes: z.string(),
        written_answers: z.number(),
        quotes: z.array(z.string()),
        shared_form: z.boolean(),
      })
      .nullable(),
    record_capsule: z.string().nullable(),
  }),
});

export const collections = { thinking, record, 'record-summaries': recordSummaries, talks };
