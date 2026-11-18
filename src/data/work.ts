// Our portfolio, grouped by the three services.
export type WorkKind = 'web-design' | 'web-app' | 'mobile-app';

export interface WebsiteWork {
  name: string;
  image: string;
  imageAlt: string;
  place: string;
  summary: string;
  url?: string;
}

/** Web Design — websites we designed and built for clients. */
export const websites: WebsiteWork[] = [
  {
    name: 'Purple Bridal Studio',
    image: '/img/web-purple.jpg',
    imageAlt: 'Purple Bridal Studio website with a bridal portrait framed in gold',
    place: 'Coimbatore',
    summary: 'A rich, editorial website for a bridal hair and makeup studio — portfolio, services and enquiries in one scroll.',
  },
  {
    name: 'LaundroSpin',
    image: '/img/web-laundrospin.jpg',
    imageAlt: 'LaundroSpin website home page with a water-splash hero',
    place: 'laundrospin.com',
    summary: 'A conversion-first website for a premium laundry brand, with online ordering, pricing and free-pickup booking.',
    url: 'https://laundrospin.com/',
  },
  {
    name: 'Insta White Laundry',
    image: '/img/web-laundry.jpg',
    imageAlt: 'Insta White Laundry website home page with soap bubbles and a pickup button',
    place: 'Bengaluru',
    summary: 'Pickup, professional cleaning and delivery — scheduled around the customer’s day, with WhatsApp booking.',
  },
  {
    name: 'ACK Corp',
    image: '/img/web-ack.jpg',
    imageAlt: 'ACK Corp website hero: “Believes in giving you home” over an aerial view of a modern villa',
    place: 'Bengaluru',
    summary: 'A website for a Bengaluru construction and architecture firm — projects, services, gallery, careers and project enquiries.',
    url: 'https://ackcorp.moksfix.com/',
  },
  {
    name: 'Eternal Life Fellowship Church',
    image: '/img/web-elfc.jpg',
    imageAlt: 'Eternal Life Fellowship Church website: “Christ is the Head of our Church” with Sunday worship times',
    place: 'Bengaluru',
    summary: 'A church website in English, Tamil, Kannada and Hindi — worship times, meetings, ministries, sermons, articles and giving.',
    url: 'https://elfcglobal.com/',
  },
];

/** Order the products appear in, per category. */
export const webAppOrder = ['hr-workspace', 'rentflow', 'site-inventory', 'laundrix', 'leadmind', 'restaurant-bill'];
export const mobileAppOrder = ['bikers-club-cbe', 'tea-stall', 'pakka-site', 'willstay'];
