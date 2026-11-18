// Central business facts — used in nav, footer, contact, and JSON-LD schema.
export const site = {
  name: 'MoksFix',
  legalName: 'MoksFix',
  url: 'https://moksfix.com',
  tagline: 'We build digital products that just work.',
  description:
    'MoksFix is a web design & software development studio in Coimbatore building websites, web applications and mobile apps — fast to launch, built to convert.',
  email: 'support@moksfix.com',
  // Web3Forms public access key — safe in client HTML; only delivers to the
  // registered inbox (support@moksfix.com). Free tier. Manage at web3forms.com.
  web3formsKey: '9d24c284-3b81-4b84-b115-7e5234366dbf',
  phone: '+91 72005 54243',
  phoneHref: 'tel:+917200554243',
  phoneE164: '+917200554243',
  whatsapp: '917200554243',
  address: '1/639, Mahalakshmi Complex, Ganesapuram, Kunnathur Post, Coimbatore - 641107',
  streetAddress: '1/639, Mahalakshmi Complex, Ganesapuram, Kunnathur Post',
  city: 'Coimbatore',
  region: 'Tamil Nadu',
  country: 'India',
  countryCode: 'IN',
  postalCode: '641107',
  geo: { lat: 11.0168, lng: 76.9558 },
  ogImage: '/assets/og-image.png',
  // Add real, claimed profiles here (LinkedIn, Instagram, Google Business Profile…). They feed the
  // schema `sameAs`; placeholder URLs that 404 hurt trust, so keep this empty until then.
  socials: [] as { label: string; href: string }[],
};

export const nav = [
  { label: 'Services', href: '/services/' },
  { label: 'Products', href: '/products/' },
  { label: 'Work', href: '/#work' },
  { label: 'Blog', href: '/blog/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

export const waLink = (text: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const clients = [
  'Insta White Laundry', 'Biker’s Club CBE', 'Purple Bridal Studio', 'LaundroSpin', 'Pakka Site',
  'ACK Corp', 'Eternal Life Fellowship Church', 'Ramamurthy Nagar Christian Fellowship', 'NCube Beacons', 'A.M Foods & Caterings',
  'Witzone', 'RentFlow', 'WillStay',
];
