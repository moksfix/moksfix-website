// Adapter: shapes the site data for the motion components.
import { site, waLink as wa, clients } from '../../data/site';
import { products, productCategories } from '../../data/products';
import type { ProductCat } from '../../data/products';
import { websites, webAppOrder, mobileAppOrder } from '../../data/work';

export const CONTACT = {
  phone: site.phone,
  tel: site.phoneHref.replace('tel:', ''),
  wa: site.whatsapp,
  email: site.email,
  address: site.address,
  socials: site.socials,
};
export const waLink = wa;
export type Category = ProductCat;
export const CATEGORIES = productCategories;

export type Product = {
  slug: string;
  name: string;
  cat: Category;
  category: string;
  tagline: string;
  description: string;
  who: string;
  platform: string;
  status?: string;
  price?: string;
  shot?: string;
  tall?: boolean;
  art?: boolean;
  mobile: boolean;
  screens: string[];
  features: string[];
};

const ORDER = [...webAppOrder, ...mobileAppOrder];
const EXTRA_SCREENS: Record<string, string[]> = {
  'bikers-club-cbe': ['/img/app-bikers-discover.jpg', '/img/app-bikers-pass.jpg'],
  'tea-stall': ['/img/app-tea-bill.jpg', '/img/app-tea-tables.jpg'],
  'pakka-site': ['/img/app-pakka-today.jpg', '/img/app-pakka-market.jpg'],
  'willstay': ['/img/app-willstay-home.jpg', '/img/app-willstay-hotel.jpg'],
};

export const PRODUCTS: Product[] = [...products].sort((a, b) => ORDER.indexOf(a.slug) - ORDER.indexOf(b.slug)).map((p) => ({
  slug: p.slug,
  name: p.name,
  cat: p.cat,
  category: p.category,
  tagline: p.short,
  description: p.intro,
  who: p.audience,
  platform: p.platform,
  status: p.status,
  price: p.price,
  shot: p.image,
  tall: p.screen === 'tall',
  art: !!p.image && !p.screen,
  mobile: p.cat === 'mobile-app',
  screens: EXTRA_SCREENS[p.slug] ?? (p.screen === 'tall' && p.image ? [p.image] : []),
  features: p.points,
}));

export const WEBSITES = websites;

export const CLIENTS = clients;
