import { defineCollection, z } from 'astro:content';

const audienceEnum = z.enum([
  'colegio',
  'familia',
  'organizacion',
  'individual',
  'mixto',
]);

const events = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      startsAt: z.coerce.date(),
      endsAt: z.coerce.date().optional(),
      location: z.string(),
      modality: z.enum(['presencial', 'virtual', 'hibrido']),
      audience: audienceEnum,
      coverImage: image(),
      coverAlt: z.string(),
      summary: z.string().max(220),
      gallery: z
        .array(z.object({ src: image(), alt: z.string() }))
        .optional(),
      // Phase 4 fields, present in schema now to avoid migrations later.
      capacity: z.number().int().optional(),
      priceCop: z.number().int().optional(),
      requiresRegistration: z.boolean().default(false),
      // Phase 2 fields.
      notifyOnPublish: z.boolean().default(false),
      notifySegments: z
        .array(z.enum(['eventos', 'colegios', 'familias', 'individual']))
        .default([]),
      // Status is auto-derived from `startsAt` at render time but can be
      // overridden explicitly when needed.
      statusOverride: z
        .enum(['borrador', 'proximo', 'pasado'])
        .optional(),
      order: z.number().optional(),
    }),
});

const services = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      audience: z.enum(['colegio', 'familia', 'organizacion', 'individual']),
      sectionTitle: z.string(),
      image: image(),
      imageAlt: z.string(),
      summary: z.string(),
      workBullets: z.array(z.string()),
      ctaLabel: z.string().default('Conversemos'),
      order: z.number(),
    }),
});

const pillars = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    icon: z.string(),
    shortDescription: z.string(),
    order: z.number(),
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = {
  events,
  services,
  pillars,
  pages,
};
