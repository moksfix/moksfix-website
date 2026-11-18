import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog / insights articles — markdown files in src/content/blog/*.md
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    author: z.string().default('MoksFix Team'),
    category: z.enum([
      'Web Design',
      'Web Apps',
      'Mobile Apps',
      'Products',
      'Guides',
      'Business',
    ]),
    keywords: z.array(z.string()).default([]),
    readingTime: z.string().default('6 min read'),
    excerpt: z.string().optional(),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog };
