# MoksFix — Website

Marketing website for **MoksFix**, a web design & development studio in Coimbatore, Tamil Nadu, India.

Static site (vanilla HTML / CSS / JS) — no build step.

## Structure

- `index.html` — homepage (hero, services, process, work, testimonials, FAQ, contact)
- `web-design-coimbatore.html`, `website-development-coimbatore.html` — SEO service landing pages
- `projects/` — case-study pages (NCube Beacons, LaundroSpin, ACK Corp, WitZone HRMS)
- `blog/` — blog index + articles (`_topics.md` is the content backlog)
- `css/styles.css` — all styles (design tokens in `:root`)
- `js/main.js` — interactions (nav, reveal animations, project modal, contact form)
- `js/analytics-events.js` — GA4 lead/conversion events (call, email, form)
- `assets/` — images, icons, video, logos
- `sitemap.xml`, `robots.txt` — SEO

## Run locally

Any static server works, e.g.:

```bash
python3 -m http.server 4173
```

Then open http://localhost:4173

## Deploy

Rsync the folder contents to the web root on the server (see internal deployment notes).
