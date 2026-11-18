import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { ArrowRight, Code2, Globe, LayoutDashboard, Menu, MessageCircle, Search, Smartphone, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CLIENTS, PRODUCTS, WEBSITES, waLink } from './data'
import { Counter, PhoneFrame, Reveal, SectionTitle, SpotlightCard, ease } from './ui'

const WEB_APPS = PRODUCTS.filter((p) => !p.mobile && p.shot && !p.art).slice(0, 6)
const APPS = PRODUCTS.filter((p) => p.mobile && p.screens[0]).slice(0, 4)

/* ---------------- NAV ---------------- */
const LINKS = [
  ['Services', '/services/'],
  ['Products', '/products/'],
  ['Work', '/#work'],
  ['Blog', '/blog/'],
  ['About', '/about/'],
  ['Contact', '/contact/'],
] as const

export function Nav({ path = '/' }: { path?: string }) {
  const isActive = (h: string) => h !== '/#work' && path.startsWith(h.replace(/\/$/, ''))
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
    >
      <nav
        className={`mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl px-4 transition-all duration-500 sm:px-6 ${
          scrolled ? 'border border-ink/10 bg-onyx/75 shadow-2xl shadow-ink/10 backdrop-blur-xl' : 'border border-transparent'
        }`}
        aria-label="Main"
      >
        <a href="/" className="flex items-center gap-3" aria-label="MoksFix home">
          <img src="/logo.png" alt="" width={36} height={36} className="h-9 w-9 drop-shadow-[0_4px_14px_rgba(217,162,27,.35)]" />
          <span className="font-display text-xl font-semibold tracking-tight">
            Moks<span className="text-accent">Fix</span>
          </span>
        </a>
        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map(([l, h]) => (
            <a key={h} href={h} aria-current={isActive(h) ? 'page' : undefined} className={`rounded-full px-4 py-2 text-[15px] font-semibold transition-colors hover:bg-ink/5 hover:text-ivory ${isActive(h) ? 'bg-ink/5 text-crimson' : 'text-ivory/75'}`}>
              {l}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a
            href={waLink('Hi MoksFix, I would like to discuss a project.')}
            target="_blank" rel="noopener noreferrer"
            className="hidden h-11 items-center gap-2 rounded-full border border-ink/15 px-4 text-sm font-semibold transition-colors hover:border-gold/60 sm:inline-flex"
          >
            <MessageCircle className="h-4 w-4 text-accent" /> WhatsApp
          </a>
          <a href="/contact/" className="hidden h-11 items-center gap-2 rounded-full bg-gold px-5 text-sm font-semibold text-ongold transition-colors hover:bg-gold-light sm:inline-flex">
            Get a free quote <ArrowRight className="h-4 w-4" />
          </a>
          <button onClick={() => setOpen(true)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 lg:hidden" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-onyx/95 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div className="flex h-24 items-center justify-between px-8">
              <img src="/logo.png" alt="MoksFix" loading="lazy" className="h-9 w-9" />
              <button onClick={() => setOpen(false)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-col gap-2 px-8 pt-6">
              {[['Home', '/'] as const, ...LINKS, ['Get a free quote', '/contact/#quote'] as const].map(([l, h], i) => (
                <motion.a
                  key={h} href={h} onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.6, ease }}
                  className={`font-display text-4xl font-semibold py-2 ${h === '/contact/#quote' ? 'text-accent' : ''}`}
                >
                  {l}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

/* ---------------- MARQUEE ---------------- */
export function Marquee() {
  const row = [...CLIENTS, ...CLIENTS]
  return (
    <section aria-label="Businesses we have built for" className="pause-on-hover relative border-y border-ink/[0.06] bg-onyx-2/60 py-10">
      <p className="mb-7 text-center text-sm text-mist">Built for businesses across Tamil Nadu, India and overseas</p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="animate-marquee flex w-max items-center gap-12">
          {row.map((c, i) => (
            <span key={i} className="flex items-center gap-12 whitespace-nowrap font-display text-2xl font-semibold text-ivory/35 transition-colors hover:text-ivory sm:text-3xl">
              {c}
              <img src="/logo.png" alt="" loading="lazy" width={20} height={20} className="h-5 w-5 opacity-60" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- SERVICES (bento) ---------------- */
function CardHead({ icon: Icon, title, text, href }: { icon: typeof Globe; title: string; text: string; href?: string }) {
  return (
    <div>
      <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10">
        <Icon className="h-5 w-5 text-accent" />
      </span>
      <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h3>
      <p className="mt-3 max-w-md leading-relaxed text-mist">{text}</p>
      {href && <a href={href} className="mt-2 inline-flex items-center gap-1.5 py-3 text-sm font-semibold text-crimson underline-offset-4 hover:underline">Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a>}
    </div>
  )
}
function Tags({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-2">
      {items.map((t) => (
        <li key={t} className="rounded-full border border-ink/10 bg-ink/[0.03] px-3 py-1 text-xs text-ivory/80">{t}</li>
      ))}
    </ul>
  )
}

export function Services() {
  return (
    <section id="services" className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
      <SectionTitle
        kicker="What we build"
        title="Everything your business runs on,"
        gold="built by one team."
        sub="From the website that brings the enquiry to the app that bills it, we design, build, host and look after it."
      />

      <div className="mt-12 grid gap-5 lg:grid-cols-6">
        <Reveal className="lg:col-span-4 lg:row-span-2">
          <SpotlightCard className="h-full p-8 sm:p-10">
           <div className="flex h-full flex-col">
            <CardHead icon={Globe} href="/services/web-designing/" title="Websites that sell" text="Fast, search-ready business websites with clear calls to action, WhatsApp and call buttons, and pages written for the people you serve." />
            <Tags items={['Business websites', 'Landing pages', 'E-commerce', 'Google-ready SEO']} />
            <div className="relative mt-10 min-h-[20rem] flex-1 sm:min-h-[26rem]">
              {WEBSITES.slice(0, 5).map((w, i) => {
                const n = Math.min(WEBSITES.length, 5)
                                return (
                  <motion.img
                    key={w.name}
                    src={w.image} alt={`${w.name} website`} loading="lazy" decoding="async" 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8, ease, delay: 0.1 + i * 0.1 }}
                    whileHover={{ y: -14, rotate: 0, zIndex: 20, scale: 1.04 }}
                    style={{ rotate: i % 2 ? 2.5 : -2.5, left: i % 2 ? '42%' : '0%', top: `${(i / (n - 1)) * 64}%`, zIndex: 1 + i }}
                    className="absolute w-[58%] cursor-pointer rounded-lg border border-ink/10 shadow-[0_24px_50px_-18px_rgba(58,14,22,.45)]"
                  />
                )
              })}
            </div>
           </div>
          </SpotlightCard>
        </Reveal>

        <Reveal className="lg:col-span-2" delay={0.1}>
          <SpotlightCard className="h-full p-8">
            <CardHead icon={LayoutDashboard} href="/services/web-application-development/" title="Web applications" text="Billing, booking, inventory, payroll and CRM shaped around how your team already works." />
            <div className="relative mt-8 h-[17rem] overflow-hidden rounded-xl bg-gradient-to-br from-onyx-3 to-onyx-2">
              {WEB_APPS.map((p, i) => (
                <motion.a
                  key={p.slug} href={`/products/${p.slug}/`} aria-label={`${p.name} web app`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, ease, delay: 0.1 + i * 0.08 }}
                  whileHover={{ y: -10, rotate: 0, zIndex: 20, scale: 1.05 }}
                  style={{ rotate: i % 2 ? 2 : -2, left: i % 2 ? '30%' : '6%', top: `${4 + (i / Math.max(WEB_APPS.length - 1, 1)) * 50}%`, zIndex: 1 + i }}
                  className="absolute block w-[64%] overflow-hidden rounded-md border border-ink/10 bg-onyx shadow-[0_18px_40px_-14px_rgba(58,14,22,.45)]"
                >
                  <span className="flex h-3 items-center gap-1 border-b border-ink/[0.06] px-1.5" aria-hidden>
                    <span className="h-1 w-1 rounded-full bg-crimson" /><span className="h-1 w-1 rounded-full bg-gold" /><span className="h-1 w-1 rounded-full bg-ink/20" />
                  </span>
                  <img src={p.shot} alt={`${p.name} screen`} loading="lazy" decoding="async" className="block aspect-[16/9] w-full object-cover object-left-top" />
                </motion.a>
              ))}
            </div>
          </SpotlightCard>
        </Reveal>

        <Reveal className="lg:col-span-2" delay={0.2}>
          <SpotlightCard className="h-full p-8">
            <CardHead icon={Smartphone} href="/services/mobile-app-development/" title="Mobile apps" text="Android and iOS apps with payments, QR passes and offline billing, published under your name." />
            <div className="relative mt-8 h-[17rem] overflow-hidden rounded-xl bg-gradient-to-br from-crimson via-crimson-light to-crimson">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/30 blur-2xl" />
              {APPS.map((p, i) => (
                <motion.a
                  key={p.slug} href={`/products/${p.slug}/`} aria-label={`${p.name} app`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, ease, delay: 0.1 + i * 0.1 }}
                  whileHover={{ y: -12, rotate: 0, zIndex: 20, scale: 1.05 }}
                  style={{ rotate: i % 2 ? 3 : -3, left: `${4 + (i / Math.max(APPS.length - 1, 1)) * 62}%`, top: i % 2 ? '16%' : '7%', zIndex: 1 + i }}
                  className="absolute block w-[30%]"
                >
                  <PhoneFrame src={p.screens[0]} name={p.name} />
                </motion.a>
              ))}
            </div>
          </SpotlightCard>
        </Reveal>

        <Reveal className="lg:col-span-3" delay={0.1}>
          <SpotlightCard className="h-full p-8 sm:p-10">
            <CardHead icon={Search} href="/services/web-designing/" title="Found on Google & in AI answers" text="Google Business Profile, local SEO and visibility in ChatGPT-style answers, so customers who search find you first." />
            <Tags items={['Google Business Profile', 'Local SEO', 'AI search visibility', 'Analytics & leads']} />
          </SpotlightCard>
        </Reveal>

        <Reveal className="lg:col-span-3" delay={0.2}>
          <SpotlightCard className="h-full p-8 sm:p-10">
            <CardHead icon={Code2} href="/contact/" title="Hosting, support & growth" text="Your domain, SSL, backups and updates looked after on our servers, with a person in Coimbatore who picks up the phone." />
            <Tags items={['Domain & SSL', 'Backups', 'Updates', 'WhatsApp integrations']} />
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- STATS ---------------- */
export function Stats() {
  const items = [
    { n: 10, s: '', t: 'products built and running', d: 'From laundry billing to HR and construction software.' },
    { n: 11, s: '+', t: 'brands we have built for', d: 'Shops, studios, builders, clubs and churches.' },
    { n: 3, s: '', t: 'platforms from one team', d: 'Web, Android and iOS, plus Windows desktop.' },
    { n: 0, s: '', t: 'rupees to get a quote', d: 'A fixed price, in writing, before work starts.', pre: '₹' },
  ]
  return (
    <section className="on-burgundy relative">
      <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <Reveal key={it.t} delay={i * 0.08} className={`px-5 py-12 sm:px-8 lg:py-16 ${i > 0 ? 'lg:border-l border-ink/[0.06]' : ''} ${i % 2 ? 'border-l border-ink/[0.06] lg:border-l' : ''} ${i > 1 ? 'border-t border-ink/[0.06] lg:border-t-0' : ''}`}>
            <p className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              <span className="text-gold-metal">{it.pre}<Counter to={it.n} suffix={it.s} /></span>
            </p>
            <p className="mt-3 font-medium">{it.t}</p>
            <p className="mt-1 text-sm text-mist">{it.d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}



/* ---------------- SCROLL PROGRESS ---------------- */
export function ScrollBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-gold via-gold-light to-crimson" />
}
