// /llms.txt — a plain-text map of MoksFix for AI assistants, generated from the same data as the site.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site, inr } from '../data/site';
import { services } from '../data/services';
import { products } from '../data/products';

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog')).sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
  const u = (path: string) => `${site.url}${path}`;
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `${site.name} is based at ${site.address}, Tamil Nadu, India, and works with clients across India and worldwide. Founder: ${site.founder.name}.`,
    `Phone and WhatsApp: ${site.phone}. Email: ${site.email}.`,
    '',
    '## Services',
    ...services.map((s) => `- [${s.name}](${u(`/services/${s.slug}/`)}): ${s.short} Starts at ${inr(s.fromPrice)}.`),
    '',
    '## Products',
    ...products.map((p) => `- [${p.name}](${u(`/products/${p.slug}/`)}): ${p.short} ${p.price ? `Price: ${p.price}.` : 'Price on request.'}`),
    '',
    '## Guides',
    ...posts.map((p) => `- [${p.data.title}](${u(`/blog/${p.id}/`)}): ${p.data.excerpt ?? p.data.description}`),
    '',
    '## Company',
    `- [About ${site.name}](${u('/about/')})`,
    `- [Contact](${u('/contact/')})`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
