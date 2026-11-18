// Every MoksFix product. The first five keep their original slugs (already indexed by Google).
export type ProductCat = 'web-app' | 'mobile-app';

export interface Product {
  slug: string;
  name: string;
  category: string; // human label
  cat: ProductCat; // filter group
  short: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  audience: string;
  platform: string;
  status?: string;
  price?: string;
  image?: string;
  imageAlt?: string;
  /** true when the image is a real product screen (phone screens use contain) */
  screen?: 'wide' | 'tall';
  points: string[];
  features: { title: string; copy: string }[];
  benefits: { title: string; copy: string }[];
  relatedService: string;
}

export const productCategories: { id: 'all' | ProductCat; label: string }[] = [
  { id: 'all', label: 'All products' },
  { id: 'web-app', label: 'Web Applications' },
  { id: 'mobile-app', label: 'Mobile Apps' },
];

export const products: Product[] = [
  {
    slug: 'hr-workspace',
    name: 'HR Workspace',
    category: 'HR Management Platform',
    cat: 'web-app',
    short: 'Your workforce, beautifully managed.',
    image: '/img/hr-workspace.jpg',
    imageAlt: 'HR Workspace dashboard: total employees, present and absent today, pending leaves and payroll alerts',
    screen: 'wide',
    status: 'Live at witzone.moksfix.com',
    metaTitle: 'HR Workspace — Attendance, Leave & HR Management Software | MoksFix',
    metaDescription:
      'HR Workspace by MoksFix: smart clock-in with idle detection, leave management, live workforce analytics and secure Microsoft sign-in — all from one intelligent dashboard.',
    h1: 'HR Workspace — your workforce, beautifully managed',
    intro:
      'Streamline attendance, manage leaves and monitor productivity — all from one intelligent dashboard. Staff clock in with idle detection, apply for leave, and managers see live workforce analytics, with secure sign-in through Microsoft or password.',
    audience: 'Growing teams, offices, BPOs and SMEs',
    platform: 'Web dashboard + desktop clock-in agent',
    points: ['Smart clock-in with idle detection', 'Leave apply, approve & track', 'Live workforce analytics', 'Sign in with Microsoft'],
    features: [
      { title: 'Smart clock-in', copy: 'Accurate attendance tracking with idle detection, from a small desktop agent.' },
      { title: 'Leave management', copy: 'Staff apply, managers approve, and everyone tracks it in real time.' },
      { title: 'Live analytics', copy: 'Workforce insights at your fingertips — who is in, who is idle, who is on leave.' },
      { title: 'Secure & private', copy: 'Enterprise-grade data protection, with Microsoft single sign-on.' },
    ],
    benefits: [
      { title: 'No more registers', copy: 'Attendance builds itself from clock-ins and idle time.' },
      { title: 'Leave without the chase', copy: 'Requests, approvals and balances in one place.' },
      { title: 'See your team live', copy: 'One dashboard for the whole workforce.' },
    ],
    relatedService: 'web-application-development',
  },
  {
    slug: 'rentflow',
    name: 'RentFlow',
    category: 'Property Management',
    cat: 'web-app',
    short: 'Rent & tenant management for landlords.',
    image: '/img/rentflow-01-dashboard.jpg',
    imageAlt: 'RentFlow dashboard showing occupancy, monthly revenue and pending rent',
    screen: 'wide',
    metaTitle: 'RentFlow — Rent Management Software for Landlords | MoksFix',
    metaDescription:
      'RentFlow by MoksFix helps landlords and building owners manage rent, tenants and dues — automated reminders, online collections and maintenance tracking. Try it.',
    h1: 'RentFlow — rent management made effortless',
    intro:
      'RentFlow gives landlords and building owners one place to manage rent, tenants and dues — with a rent ledger, a payment review queue, advances, expenses and maintenance tracking.',
    audience: 'Landlords, PG owners and property managers',
    platform: 'Web · owner and supervisor logins',
    points: ['Automated rent reminders', 'Rent ledger & dues', 'Tenant & lease records', 'Maintenance tickets'],
    features: [
      { title: 'Automated reminders', copy: 'Rent-due nudges by SMS, email and app — no more chasing.' },
      { title: 'Rent ledger & review queue', copy: 'Every payment recorded and checked before it lands in the books.' },
      { title: 'Tenant & lease records', copy: 'Every tenant, lease and document in one organised place.' },
      { title: 'Maintenance tracking', copy: 'Tenants raise tickets; you track resolution to close.' },
    ],
    benefits: [
      { title: 'Rent on time', copy: 'Reminders and a clear ledger mean fewer late dues.' },
      { title: 'Stop chasing tenants', copy: 'The system nudges, collects and records — you don’t have to.' },
      { title: 'Everything in one place', copy: 'Leases, dues, tickets and documents, always at hand.' },
    ],
    relatedService: 'web-application-development',
  },
  {
    slug: 'site-inventory',
    name: 'Site Inventory',
    category: 'Construction ERP',
    cat: 'web-app',
    short: 'Manage every rupee, every worker, every site.',
    image: '/img/site-inventory.jpg',
    imageAlt: 'Site Inventory owner dashboard: active sites, low-stock alert, vendor dues and today at a glance',
    screen: 'wide',
    status: 'Live at Sri Murugan Constructions',
    metaTitle: 'Site Inventory — Construction ERP & Site Inventory Software | MoksFix',
    metaDescription:
      'Site Inventory by MoksFix is a construction ERP: live dashboards for spend, stock and labour across every site, AI invoice scanning with GST auto-fill, and owner and supervisor roles.',
    h1: 'Site Inventory — every rupee, every worker, every site',
    intro:
      'The complete construction operations platform, from supervisor to boardroom. Live dashboards for spend, stock and labour across all sites, invoices scanned with AI to auto-fill vendor, items and GST, and owner oversight with supervisor field operations in one app.',
    audience: 'Builders, contractors and project stores',
    platform: 'Web and phone · owner and supervisor roles',
    points: ['Live spend, stock & labour dashboards', 'AI invoice scanning (OCR)', 'Vendor, items & GST auto-filled', 'Owner + supervisor roles'],
    features: [
      { title: 'Real-time analytics', copy: 'Live dashboards for spend, stock and labour across all sites.' },
      { title: 'AI-powered OCR', copy: 'Scan invoices instantly — vendor, items and GST are filled in for you.' },
      { title: 'Role-based access', copy: 'Owner oversight and supervisor field operations in one app.' },
      { title: 'Every site, one place', copy: 'Materials, money and workers for every project, on any device.' },
    ],
    benefits: [
      { title: 'Stop material leakage', copy: 'Every purchase and transfer is logged against its site.' },
      { title: 'No more manual entry', copy: 'Snap the invoice; the app does the typing.' },
      { title: 'Owner peace of mind', copy: 'See every site without ten calls to the supervisor.' },
    ],
    relatedService: 'web-application-development',
  },
  {
    slug: 'leadmind',
    name: 'LeadMind AI',
    category: 'B2B Sales Intelligence',
    cat: 'web-app',
    short: 'Turn any company into a pipeline of decision-makers.',
    image: '/img/leadmind.jpg',
    imageAlt: 'LeadMind AI dashboard: searches, lead lists, outreach, saved contacts and a search-activity chart',
    screen: 'wide',
    status: 'Live at leadmindai.moksfix.com',
    metaTitle: 'LeadMind AI — B2B Prospecting & Lead Generation Software | MoksFix',
    metaDescription:
      'LeadMind AI by MoksFix turns any company into a pipeline of real decision-makers — AI lead scoring, real-time company and people search, verified emails and outreach written for you.',
    h1: 'LeadMind AI — your B2B prospecting co-pilot',
    intro:
      'Turn any company into a pipeline of real decision-makers. LeadMind AI gives you AI-scored contacts, verified emails and outreach written for you, with real-time company and people search — and verified data, never fabricated.',
    audience: 'Sales teams, agencies and founders',
    platform: 'Web and mobile',
    points: ['AI lead scoring on every contact', 'Real-time company & people search', 'Verified emails', 'Outreach written for you'],
    features: [
      { title: 'AI lead scoring', copy: 'Every contact is scored so your team calls the right people first.' },
      { title: 'Company & people search', copy: 'Real-time search for companies and the decision-makers inside them.' },
      { title: 'Verified data', copy: 'Verified emails and contacts — never fabricated.' },
      { title: 'Outreach written for you', copy: 'AI drafts personal outreach, ready to send.' },
    ],
    benefits: [
      { title: 'A fuller pipeline', copy: 'Any target company becomes a list of real decision-makers.' },
      { title: 'Less bounce, more reply', copy: 'Verified emails reach real inboxes.' },
      { title: 'Hours back every week', copy: 'Research and first drafts are done for you.' },
    ],
    relatedService: 'web-application-development',
  },
  {
    slug: 'willstay',
    name: 'WillStay',
    image: '/img/app-willstay-home.jpg',
    imageAlt: 'WillStay app home screen to search stays across Tamil Nadu',
    screen: 'tall',
    category: 'Hospitality',
    cat: 'mobile-app',
    short: 'Hill-station hotels & checkpost passes.',
    metaTitle: 'WillStay — Hotel Booking App | MoksFix',
    metaDescription:
      'WillStay by MoksFix is a hotel booking app for the hill stations — live rooms, instant confirmations and online checkpost passes for Ooty and Kodaikanal. Explore WillStay.',
    h1: 'WillStay — book stays in seconds',
    intro:
      'WillStay is a hotel booking platform for the hill stations. Guests search, book and manage stays with instant confirmations, buy checkpost passes for Ooty and Kodaikanal online and show the QR at the gate.',
    audience: 'Hotels, guesthouses and travellers',
    platform: 'Web, app and admin console',
    points: ['Live room availability', 'Instant confirmations', 'Checkpost passes with QR', 'Front-desk console'],
    features: [
      { title: 'Live availability', copy: 'Real-time rooms and rates, no double-bookings.' },
      { title: 'Instant confirmation', copy: 'Guests book and get confirmed in seconds.' },
      { title: 'Checkpost passes', copy: 'Pay online for Ooty and Kodaikanal passes and show the QR code.' },
      { title: 'Front-desk tools', copy: 'Manage check-ins, guests and inventory in one place.' },
    ],
    benefits: [
      { title: 'Fill more rooms', copy: 'Instant booking and live availability capture every guest.' },
      { title: 'No double-bookings', copy: 'Real-time inventory keeps the front desk stress-free.' },
      { title: 'Happier guests', copy: 'Booking, passes and confirmation on one phone.' },
    ],
    relatedService: 'mobile-app-development',
  },
  {
    slug: 'laundrix',
    name: 'Laundrix',
    category: 'Laundry Billing',
    cat: 'web-app',
    short: 'Counter billing for laundry chains.',
    image: '/img/new-bill.jpg',
    imageAlt: 'Laundrix new bill screen with garments, rates and a printed receipt',
    screen: 'wide',
    status: 'Live at Insta White Laundry',
    metaTitle: 'Laundrix — Laundry Billing Software | MoksFix',
    metaDescription:
      'Laundrix by MoksFix is billing software for laundry and dry-cleaning chains — garment tags, WhatsApp order updates and one database for every store. Book a demo.',
    h1: 'Laundrix — laundry billing, counter to closet',
    intro:
      'Laundrix runs the laundry counter: find the customer by phone number, tap the garments in, print the bill with a numbered tag for every piece, and keep the customer posted on WhatsApp — across every store.',
    audience: 'Laundries and dry cleaners',
    platform: 'Windows desktop + cloud',
    points: ['Garment tags on every bill', 'WhatsApp order updates', 'One database for every store', 'Money stored to the paisa'],
    features: [
      { title: 'Fast counter billing', copy: 'Customer by phone number, garments by tap, bill printed in seconds.' },
      { title: 'Garment tags', copy: 'Each piece gets its own numbered tag so nothing leaves with the wrong family.' },
      { title: 'WhatsApp updates', copy: '“Order received” at the counter and the invoice PDF when work starts.' },
      { title: 'Multi-store', copy: 'Every store on one database, with daily takings per counter.' },
    ],
    benefits: [
      { title: 'Shorter queues', copy: 'A bill takes seconds, not minutes.' },
      { title: 'Fewer lost garments', copy: 'Numbered tags track every piece.' },
      { title: 'Totals that add up', copy: 'Money stored in paise — every store reconciles to the rupee.' },
    ],
    relatedService: 'web-application-development',
  },
  {
    slug: 'tea-stall',
    name: 'Tea Stall',
    image: '/img/app-tea-bill.jpg',
    imageAlt: 'Tea Stall app with a voice-built bill of tea, samosa and egg puff totalling ₹365',
    screen: 'tall',
    category: 'Shop Billing',
    cat: 'mobile-app',
    short: 'Phone billing for tea & snack shops.',
    price: '₹20 per billing day',
    metaTitle: 'Tea Stall — Billing App for Tea Shops | MoksFix',
    metaDescription:
      'Tea Stall by MoksFix is a billing app for tea and snack shops on Android and iOS — ₹20 only for the days you bill, nothing on a closed day.',
    h1: 'Tea Stall — billing for ₹20 a day',
    intro:
      'Tea Stall puts billing on the shop owner’s phone, sold as a day pass: ₹20 for each day the shop bills, and nothing on a day the shop is closed.',
    audience: 'Tea and snack shops',
    platform: 'Android and iOS',
    points: ['₹20 only on days you bill', 'Daily totals on your phone', 'Built for a busy counter', 'Android and iOS'],
    features: [
      { title: 'Day-pass pricing', copy: 'A pass is used only on a day the shop actually saves a bill.' },
      { title: 'Quick billing', copy: 'Big buttons made for a busy counter and wet hands.' },
      { title: 'Daily totals', copy: 'See the day’s sales the moment you close.' },
      { title: 'Owner admin', copy: 'Plans, passes and shops managed from one admin panel.' },
    ],
    benefits: [
      { title: 'Pay only when open', copy: 'A closed shop costs nothing that day.' },
      { title: 'No hardware', copy: 'Runs on the phone the owner already has.' },
      { title: 'Know your takings', copy: 'Every bill counted, every day.' },
    ],
    relatedService: 'mobile-app-development',
  },
  {
    slug: 'restaurant-bill',
    name: 'Restaurant Bill',
    category: 'Restaurant Billing',
    cat: 'web-app',
    short: 'One-keystroke billing for restaurants.',
    image: '/img/restaurant-bill.jpg',
    imageAlt: 'Restaurant Bill billing screen with menu tiles and a ₹900 bill',
    screen: 'wide',
    metaTitle: 'Restaurant Bill — Restaurant Billing Software | MoksFix',
    metaDescription:
      'Restaurant Bill by MoksFix is fast counter billing for restaurants, food stalls and caterers — type a dish number, print the slip and see what sold at closing time.',
    h1: 'Restaurant Bill — bill three dishes in one keystroke',
    intro:
      'Restaurant Bill is a fast point-of-sale for restaurants and food counters. Tap a tile or type the dish number — type 12*3 and press Enter to bill three at once — print the customer’s slip and see at the end of the day what sold.',
    audience: 'Restaurants, food stalls and caterers',
    platform: 'Runs on the counter PC',
    points: ['Type 12*3, press Enter', 'Prints the customer slip', 'Cashier and owner PINs', 'End-of-day sales report'],
    features: [
      { title: 'Keyboard-fast', copy: 'Every dish has a number; type it and Enter without looking at the screen.' },
      { title: 'Printed slips', copy: 'A clean slip for every customer.' },
      { title: 'Roles by PIN', copy: 'Cashiers take orders; owners see reports, menu and settings.' },
      { title: 'Daily report', copy: 'What sold, how much, at closing time.' },
    ],
    benefits: [
      { title: 'Faster queues', copy: 'Orders billed as fast as they are called.' },
      { title: 'No tax setup', copy: 'Items, quantity, price and total — exactly as asked.' },
      { title: 'Clear numbers', copy: 'Know your best sellers every day.' },
    ],
    relatedService: 'web-application-development',
  },
  {
    slug: 'pakka-site',
    name: 'Pakka Site',
    image: '/img/app-pakka-today.jpg',
    imageAlt: 'Pakka Site app showing a broker’s follow-ups for today',
    screen: 'tall',
    category: 'Real Estate',
    cat: 'mobile-app',
    short: 'Where brokers work with brokers.',
    price: '₹300/month after a free month',
    metaTitle: 'Pakka Site — Real Estate Broker App | MoksFix',
    metaDescription:
      'Pakka Site by MoksFix is the network where real-estate brokers work with brokers — share listings, agree the split, close deals, plus a client book and brokerage ledger.',
    h1: 'Pakka Site — brokers closing deals together',
    intro:
      'One broker posts a property, another has the buyer; they agree a split and close. Each broker also keeps a private client book with follow-ups and a brokerage ledger — in Tamil and English.',
    audience: 'Real-estate brokers',
    platform: 'Android and iOS · Tamil & English',
    points: ['Shared listings between brokers', 'Brokerage split agreed first', 'Follow-ups and client book', 'Tamil and English'],
    features: [
      { title: 'Broker network', copy: 'Post a property or find the buyer through another broker.' },
      { title: 'Split agreed up front', copy: 'Both brokers sign off the brokerage split before the deal.' },
      { title: 'Daily follow-ups', copy: 'Calls, WhatsApp and site visits due today, in one list.' },
      { title: 'Brokerage ledger', copy: 'Every deal and payout recorded.' },
    ],
    benefits: [
      { title: 'More deals closed', copy: 'Your listing meets someone else’s buyer.' },
      { title: 'No disputes', copy: 'The split is agreed before anyone meets the client.' },
      { title: 'Nothing forgotten', copy: 'Overdue follow-ups show first, every morning.' },
    ],
    relatedService: 'mobile-app-development',
  },
  {
    slug: 'bikers-club-cbe',
    name: 'Biker’s Club CBE',
    image: '/img/app-bikers-discover.jpg',
    imageAlt: 'Biker’s Club CBE app home screen with upcoming club rides from Coimbatore',
    screen: 'tall',
    category: 'Ride Club App',
    cat: 'mobile-app',
    short: 'Rides, payments and QR boarding passes.',
    status: 'Live on iOS and Android',
    metaTitle: 'Biker’s Club CBE — Ride Club Mobile App | MoksFix',
    metaDescription:
      'The Biker’s Club CBE app by MoksFix is a ride and event app for the Coimbatore club — registration, payment, QR boarding passes and host check-in, on iOS, Android and the web.',
    h1: 'Biker’s Club CBE — the club app riders love',
    intro:
      'The Biker’s Club CBE app replaces the club’s Google Form. Riders sign up, register for rides and pay; each gets a QR boarding pass; hosts verify payments and check riders in at the meeting point.',
    audience: 'Bike, running and trekking clubs',
    platform: 'iOS, Android + host console',
    points: ['Ride registration and payment', 'QR boarding passes', 'Host check-in', 'Club shop and profiles'],
    features: [
      { title: 'Rides & registration', copy: 'Upcoming rides with route, distance and fare.' },
      { title: 'Boarding passes', copy: 'A QR pass per rider, activated once payment is verified.' },
      { title: 'Host console', copy: 'Post rides, verify payments, check riders in, see reports.' },
      { title: 'Club shop', copy: 'Personalised jerseys and gear, ordered in the app.' },
    ],
    benefits: [
      { title: 'No more forms', copy: 'Registration, payment and pass in one flow.' },
      { title: 'Faster starts', copy: 'Scan and go at the meeting point.' },
      { title: 'A stronger club', copy: 'Profiles, stamps and stats riders come back for.' },
    ],
    relatedService: 'mobile-app-development',
  },
];
