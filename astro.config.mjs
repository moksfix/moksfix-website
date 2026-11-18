import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  redirects: { '/products/norooms': '/products/willstay' },
  site: 'https://moksfix.com',
  output: 'static',
  devToolbar: { enabled: false },
  trailingSlash: 'ignore',
  server: { port: 4323 },
  vite: { plugins: [tailwindcss()] },
  integrations: [
    react(),
    sitemap({
      changefreq: 'weekly',
      lastmod: new Date(),
      serialize(item) {
        // Prioritise the pages that win leads.
        const url = item.url;
        if (url === 'https://moksfix.com/') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        } else if (url.endsWith('/contact/')) {
          item.priority = 0.9;
          item.changefreq = 'monthly';
        } else if (url.includes('/services/') || url.includes('/products/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else {
          item.priority = 0.6;
          item.changefreq = 'monthly';
        }
        return item;
      },
    }),
  ],
});
