export interface Service {
  slug: string;
  name: string;
  short: string;
  icon: string; // lucide path
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  outcome: string;
  features: { title: string; copy: string }[];
  tech: string[];
  faqs: { q: string; a: string }[];
  deliverables: string[];
  relatedProducts: string[]; // product slugs
  image: string;
  /** Starting price in rupees, shown on the page and in the Service schema. Matches the blog's cost guides. */
  fromPrice: number;
  /** What the starting price buys, in a few words. */
  fromNote: string;
}

export const services: Service[] = [
  {
    slug: 'web-designing',
    fromPrice: 15000,
    fromNote: 'One-page site. A 5–8 page business site is ₹40,000–₹1,20,000.',
    name: 'Web Designing',
    short: 'Conversion-focused websites, designed & built.',
    icon: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 0c2.5 2.6 4 6.1 4 10s-1.5 7.4-4 10m0-20c-2.5 2.6-4 6.1-4 10s1.5 7.4 4 10M2 12h20',
    metaTitle: 'Web Designing Company in Coimbatore | MoksFix',
    metaDescription:
      'Professional web designing company in Coimbatore. MoksFix designs and builds fast, conversion-focused, SEO-ready websites for founders and businesses. Get a free quote.',
    h1: 'Web design & development that converts',
    intro:
      'We design and build beautiful, blazing-fast websites — marketing sites, landing pages and corporate portals crafted pixel by pixel and engineered to rank on Google and turn visitors into customers.',
    outcome: 'A website that loads in a blink, looks premium and brings you leads.',
    features: [
      { title: 'Custom UI/UX design', copy: 'Research-led, on-brand interfaces designed from scratch — never a template.' },
      { title: 'Built for speed & SEO', copy: 'Static-fast Astro/Next.js builds, clean semantic markup and technical SEO baked in.' },
      { title: 'Responsive on every device', copy: 'Pixel-perfect from a 375px phone to an ultrawide monitor.' },
      { title: 'CMS you can edit', copy: 'Update content yourself with a friendly headless CMS — no developer needed.' },
    ],
    tech: ['Astro', 'Next.js', 'Tailwind CSS', 'Headless CMS', 'Figma'],
    faqs: [
      { q: 'How long does a website take?', a: 'Most marketing sites launch in 2–4 weeks depending on scope. We ship in weekly increments so you see progress fast.' },
      { q: 'Will my website rank on Google?', a: 'Every build ships SEO-ready — fast Core Web Vitals, semantic HTML, metadata, sitemaps and schema — the foundation Google rewards.' },
      { q: 'Do you redesign existing websites?', a: 'Yes. We regularly rebuild dated or slow sites into fast, modern, conversion-focused ones.' },
    ],
    deliverables: ['Custom design in Figma', 'Fully responsive build', 'On-page SEO setup', 'Editable CMS', 'Analytics & forms', 'Launch & handover'],
    relatedProducts: [],
    image: '/img/web-laundry.jpg',
  },
  {
    slug: 'web-application-development',
    fromPrice: 350000,
    fromNote: 'Custom web app with logins, dashboards and real business logic.',
    name: 'Web Application Development',
    short: 'Dashboards, SaaS & internal tools that scale.',
    icon: 'M4 4h6v8H4zM14 4h6v5h-6zM14 13h6v7h-6zM4 16h6v4H4z',
    metaTitle: 'Web Application Development Company in Coimbatore | MoksFix',
    metaDescription:
      'Custom web application development in Coimbatore. MoksFix builds dashboards, SaaS platforms and internal tools engineered for scale, security and speed. Talk to us.',
    h1: 'Web applications engineered to scale',
    intro:
      'From dashboards to full SaaS platforms and internal tools, we build secure, real-time web applications engineered for scale — clean architecture that grows from your first 100 users to your first million.',
    outcome: 'A robust platform your team and customers actually enjoy using.',
    features: [
      { title: 'SaaS & dashboards', copy: 'Multi-tenant platforms, admin panels and analytics dashboards built to spec.' },
      { title: 'Secure & real-time', copy: 'Role-based access, secure auth and live data with websockets where it counts.' },
      { title: 'Scalable architecture', copy: 'Clean, tested code and infrastructure that scales without rewrites.' },
      { title: 'API & integrations', copy: 'Payments, CRMs, third-party APIs — wired in cleanly and reliably.' },
    ],
    tech: ['React', 'Node.js', 'Laravel', 'PostgreSQL', 'AWS'],
    faqs: [
      { q: 'Can you build a SaaS product from scratch?', a: 'Yes — from MVP to scale. We handle design, engineering, payments, multi-tenancy and deployment.' },
      { q: 'Do you work with our existing team?', a: 'Absolutely. We can lead the build or augment your in-house team with senior engineers.' },
      { q: 'Is the code ours?', a: 'Fully. You own the codebase and IP, with clean documentation and handover.' },
    ],
    deliverables: ['UX & UI design', 'Secure auth & roles', 'API & integrations', 'Automated tests', 'CI/CD & deployment', 'Docs & handover'],
    relatedProducts: ['hr-workspace', 'rentflow', 'site-inventory', 'laundrix', 'leadmind', 'restaurant-bill'],
    image: '/img/rentflow-01-dashboard.jpg',
  },
  {
    slug: 'mobile-app-development',
    fromPrice: 150000,
    fromNote: 'Simple Android and iOS app. Apps with logins and a backend start at ₹4,00,000.',
    name: 'Mobile App Development',
    short: 'iOS & Android apps from one codebase.',
    icon: 'M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm4 16h.01',
    metaTitle: 'Mobile App Development Company in Coimbatore | MoksFix',
    metaDescription:
      'Mobile app development company in Coimbatore. MoksFix builds native-feeling iOS & Android apps from a single codebase — fast, offline-ready and built to delight. Get started.',
    h1: 'Mobile apps built to delight',
    intro:
      'We build native-feeling iOS and Android apps from a single codebase — fast, offline-ready and delightful on every screen, from first prototype to App Store and Play Store launch.',
    outcome: 'One polished app, both platforms, launched and maintained.',
    features: [
      { title: 'iOS & Android, one build', copy: 'Cross-platform with Flutter / React Native — native feel, half the cost.' },
      { title: 'Offline-ready', copy: 'Works on flaky networks with local caching and background sync.' },
      { title: 'App Store launch', copy: 'We handle store listings, review and release — not just the code.' },
      { title: 'Push & analytics', copy: 'Notifications, deep links and analytics wired in from day one.' },
    ],
    tech: ['Flutter', 'React Native', 'Firebase', 'App Store', 'Play Store'],
    faqs: [
      { q: 'Native or cross-platform?', a: 'We build cross-platform by default for speed and cost, with native modules where performance demands it.' },
      { q: 'Do you publish to the stores?', a: 'Yes — we manage App Store and Google Play submission, review and release end to end.' },
      { q: 'Can you maintain the app after launch?', a: 'We offer ongoing support, OS updates and feature iterations on a retainer.' },
    ],
    deliverables: ['UX & UI design', 'iOS & Android build', 'Offline & push', 'Store submission', 'Analytics', 'Support & updates'],
    relatedProducts: ['bikers-club-cbe', 'tea-stall', 'pakka-site', 'willstay'],
    image: '/img/trio-ride.jpg',
  },
];
