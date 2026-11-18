import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { readdirSync, readFileSync } from 'node:fs';

// Real dates for blog posts, read from frontmatter (updatedDate wins over publishDate).
const postDates = Object.fromEntries(
  readdirSync('./src/content/blog')
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const fm = readFileSync(`./src/content/blog/${f}`, 'utf8').split('---')[1] ?? '';
      const pick = (k) => fm.match(new RegExp(`^${k}:\\s*["']?([0-9-]+)`, 'm'))?.[1];
      const date = pick('updatedDate') ?? pick('publishDate');
      return [`/blog/${f.replace(/\.md$/, '')}/`, date ? new Date(date).toISOString() : undefined];
    })
    .filter(([, d]) => d),
);

export default defineConfig({
  redirects: { '/products/norooms': '/products/willstay/' },
  site: 'https://moksfix.com',
  output: 'static',
  devToolbar: { enabled: false },
  trailingSlash: 'ignore',
  server: { port: 4323 },
  vite: { plugins: [tailwindcss()] },
  integrations: [
    react(),
    sitemap({
      // Only real dates: blog posts get their publish/update date; other pages omit lastmod
      // (a build timestamp on every URL teaches Google to ignore it).
      serialize(item) {
        const d = postDates[new URL(item.url).pathname];
        if (d) item.lastmod = d;
        else delete item.lastmod;
        return item;
      },
    }),
  ],
});
