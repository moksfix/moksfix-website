# MoksFix website

The source for [moksfix.com](https://moksfix.com): a web design and software studio in Coimbatore.

Built with [Astro](https://astro.build) 5, React islands, Tailwind CSS v4 and Framer Motion. The output is a fully static site.

## Run locally

```bash
npm install
npm run dev      # http://localhost:4323
```

## Build

```bash
npm run build    # writes the static site to dist/
npm run preview
```

## Where things live

- `src/data/` holds the business facts, products, services, portfolio and FAQs. Most content edits happen here.
- `src/content/blog/` has the blog posts, written in Markdown.
- `src/pages/` has one file per route. `src/components/islands/` has the animated React sections.
- `public/img/` holds the screenshots and images.

The quote form posts to Web3Forms. Its key is in `src/data/site.ts`, and requests are emailed to the inbox registered for that key.
