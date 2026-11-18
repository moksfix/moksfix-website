import { AnimatePresence, LayoutGroup, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Check, ChevronRight, Clock, MessageCircle, Quote as QuoteIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { PRODUCTS, waLink } from './data'
import { BrowserFrame, Magnetic, PhoneFrame, Reveal, SectionTitle, SpotlightCard, WordsReveal, btnGhost, btnGold, ease } from './ui'
import { ProductVisual } from './Middle'

/* ---------------- PAGE HERO (inner pages) ---------------- */
type Crumb = { label: string; href?: string }
export function PageHero({
  kicker, title, gold, sub, crumbs = [], media, mediaAlt, video, tallMedia = false, actions = true, cta = 'Get a free quote', ctaHref = '/contact/', waText, small = false, phones, appName, browser = false, fan,
}: {
  kicker?: string; title: string; gold?: string; sub?: string; crumbs?: Crumb[]
  media?: string; mediaAlt?: string; video?: string; tallMedia?: boolean; actions?: boolean; cta?: string; ctaHref?: string; waText?: string; small?: boolean; phones?: (string | undefined)[]; appName?: string; browser?: boolean
  fan?: { src: string; name: string; href?: string }[]
}) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const hasMedia = !!(media || video || phones || fan)
  return (
    <section ref={ref} className="relative overflow-hidden pb-14 pt-32 sm:pt-36 lg:pb-20">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <motion.div className="pointer-events-none absolute -top-40 right-[5%] h-[480px] w-[480px] rounded-full bg-gold/25 blur-[140px]"
        animate={{ x: [0, -60, 20, 0], y: [0, 40, -20, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="pointer-events-none absolute top-40 -left-40 h-[420px] w-[420px] rounded-full bg-crimson/15 blur-[140px]"
        animate={{ x: [0, 60, -20, 0], y: [0, -30, 30, 0] }} transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }} />

      <div className={`relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 ${hasMedia ? 'items-center lg:grid-cols-12' : ''}`}>
        <div className={hasMedia ? 'lg:col-span-7' : 'max-w-4xl'}>
          {crumbs.length > 0 && (
            <motion.nav aria-label="Breadcrumb" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
              <ol className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-mist">
                {crumbs.map((c, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    {c.href ? <a href={c.href} className="hover:text-crimson">{c.label}</a> : <span aria-current="page" className="font-semibold text-crimson">{c.label}</span>}
                    {i < crumbs.length - 1 && <ChevronRight className="h-3.5 w-3.5" />}
                  </li>
                ))}
              </ol>
            </motion.nav>
          )}
          {kicker && (
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.1 }} className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
              <span className="h-px w-8 bg-accent/60" /> {kicker}
            </motion.p>
          )}
          <h1 className={`font-display font-bold leading-[1.04] tracking-[-0.02em] text-crimson ${small ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-4xl sm:text-5xl lg:text-6xl'}`}>
            <WordsReveal text={title} delay={0.15} />
            {gold && <> <WordsReveal text={gold} gold delay={0.3} /></>}
          </h1>
          {sub && (
            <Reveal delay={0.45} y={18}>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ivory/80">{sub}</p>
            </Reveal>
          )}
          {actions && (
            <Reveal delay={0.6} y={18}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Magnetic href={ctaHref} className={btnGold}>{cta} <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></Magnetic>
                <Magnetic href={waLink(waText ?? 'Hi MoksFix, I would like to discuss a project.')} target="_blank" className={btnGhost}>
                  <MessageCircle className="h-5 w-5 text-crimson" /> Chat on WhatsApp
                </Magnetic>
              </div>
            </Reveal>
          )}
        </div>
        {hasMedia && (
          <motion.div style={{ y }} className="lg:col-span-5">
            {fan ? (
              <PhoneFan items={fan} />
            ) : phones ? (
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease, delay: 0.3 }}
                className="relative flex items-end justify-center gap-4 overflow-hidden rounded-[2rem] bg-gradient-to-br from-crimson via-crimson-light to-crimson px-6 pt-10 shadow-[0_50px_100px_-30px_rgba(58,14,22,.45)]">
                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/30 blur-3xl" />
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="relative w-[44%] max-w-[230px] translate-y-6">
                  <PhoneFrame src={phones[0]} name={appName ?? ''} alt={mediaAlt} />
                </motion.div>
                {phones[1] && (
                  <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="relative w-[40%] max-w-[210px] translate-y-16">
                    <PhoneFrame src={phones[1]} name={appName ?? ''} alt={mediaAlt} />
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 40, rotate: -2, scale: 0.96 }} animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }} transition={{ duration: 1.2, ease, delay: 0.3 }}
                className={browser ? '' : `relative overflow-hidden rounded-[2rem] border border-ink/10 shadow-[0_50px_100px_-30px_rgba(58,14,22,.35)] ${tallMedia ? 'mx-auto max-w-[320px] bg-gradient-to-br from-crimson via-crimson-light to-crimson p-6' : 'bg-onyx-2'}`}
              >
                {browser && media ? (
                  <BrowserFrame src={media} alt={mediaAlt ?? ''} />
                ) : video ? (
                  <video src={video} poster={media} autoPlay muted loop playsInline className="aspect-[4/3] w-full object-cover" aria-label={mediaAlt} />
                ) : (
                  <img src={media} alt={mediaAlt ?? ''} className={tallMedia ? 'w-full rounded-[1.4rem]' : 'aspect-[4/3] w-full object-cover object-left-top'} />
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}

/* ---------------- PHONE FAN: several apps side by side ---------------- */
const FAN_POS = [
  { left: '22%', rot: -10, y: 50, z: 1, w: 'w-[28%]', float: 7 },
  { left: '40.5%', rot: -4, y: 6, z: 3, w: 'w-[34%]', float: 6 },
  { left: '59.5%', rot: 4, y: 6, z: 3, w: 'w-[34%]', float: 6.5 },
  { left: '78%', rot: 10, y: 50, z: 1, w: 'w-[28%]', float: 7.5 },
]
export const MOBILE_FAN = PRODUCTS.filter((p) => p.mobile && p.screens[0]).map((p) => ({ src: p.screens[0], name: p.name, href: `/products/${p.slug}/` }))

export function PhoneFan({ items, className = 'aspect-[1/1] max-w-[560px] rounded-[2rem] shadow-[0_50px_100px_-30px_rgba(58,14,22,.45)]' }: { items: { src: string; name: string; href?: string }[]; className?: string }) {
  return (
    <div className={`relative mx-auto w-full overflow-hidden bg-gradient-to-br from-crimson via-crimson-light to-crimson ${className}`}>
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-gold/20 blur-3xl" />
      {items.slice(0, 4).map((it, i) => {
        const p = FAN_POS[i]
        const Tag = it.href ? motion.a : motion.div
        return (
          <Tag
            key={it.src}
            {...(it.href ? { href: it.href, 'aria-label': `${it.name} app` } : {})}
            initial={{ opacity: 0, y: 120, rotate: 0, x: '-50%' }}
            whileInView={{ opacity: 1, y: p.y, rotate: p.rot, x: '-50%' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.1, ease, delay: 0.35 + [1, 0, 0, 1][i] * 0.15 + i * 0.05 }}
            whileHover={{ y: p.y - 18, rotate: p.rot / 2, zIndex: 10, transition: { duration: 0.35, ease } }}
            style={{ zIndex: p.z, left: p.left }}
            className={`group absolute top-[12%] block ${p.w}`}
          >
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: p.float, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}>
              <PhoneFrame src={it.src} name={it.name} alt={`${it.name} app screen`} />
              <span className="mt-3 block text-center text-[11px] font-semibold tracking-wide text-onyx/90 opacity-0 transition-opacity group-hover:opacity-100">{it.name}</span>
            </motion.div>
          </Tag>
        )
      })}
    </div>
  )
}

/* ---------------- FEATURE GRID ---------------- */
export function FeatureGrid({ kicker, title, gold, sub, items }: { kicker?: string; title: string; gold?: string; sub?: string; items: { title: string; copy: string }[] }) {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
      <SectionTitle kicker={kicker} title={title} gold={gold} sub={sub} />
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {items.map((f, i) => (
          <Reveal key={f.title} delay={(i % 2) * 0.1}>
            <SpotlightCard className="h-full p-8 sm:p-10">
              <span className="font-display text-sm font-bold text-accent">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 font-display text-2xl font-bold tracking-tight">{f.title}</h3>
              <p className="mt-3 leading-relaxed text-mist">{f.copy}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------------- OUTCOME / BENEFITS BAND (burgundy) ---------------- */
export function BenefitsBand({ title, gold, statement, items }: { title: string; gold?: string; statement?: string; items: { title: string; copy: string }[] }) {
  return (
    <section className="on-burgundy relative overflow-hidden py-16 lg:py-24">
      <div className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-gold/15 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle kicker="The outcome" title={title} gold={gold} />
        {statement && (
          <Reveal delay={0.15}><p className="mt-8 max-w-3xl font-display text-2xl leading-snug text-ivory/90 sm:text-3xl">“{statement}”</p></Reveal>
        )}
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {items.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.1}>
              <div className="border-t border-ink/20 pt-6">
                <h3 className="font-display text-2xl font-bold text-accent">{b.title}</h3>
                <p className="mt-3 leading-relaxed text-mist">{b.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- CHECKLIST + CHIPS ---------------- */
export function Deliverables({ title, gold, items, tech }: { title: string; gold?: string; items: string[]; tech?: string[] }) {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5"><SectionTitle kicker="What you get" title={title} gold={gold} /></div>
        <div className="lg:col-span-7">
          <ul className="grid gap-3 sm:grid-cols-2">
            {items.map((d, i) => (
              <Reveal key={d} delay={i * 0.05}>
                <li className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-onyx-2 px-5 py-4 font-semibold">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/20"><Check className="h-4 w-4 text-crimson" /></span>{d}
                </li>
              </Reveal>
            ))}
          </ul>
          {tech && tech.length > 0 && (
            <Reveal delay={0.2}>
              <p className="mb-3 mt-10 text-sm font-semibold text-mist">Built with</p>
              <ul className="flex flex-wrap gap-2">
                {tech.map((t) => <li key={t} className="rounded-full border border-crimson/25 px-4 py-2 text-sm font-semibold text-crimson">{t}</li>)}
              </ul>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}

/* ---------------- RELATED PRODUCT / SERVICE CARDS ---------------- */
export function RelatedProducts({ slugs, title = 'Products built', gold = 'with this service.' }: { slugs: string[]; title?: string; gold?: string }) {
  const list = PRODUCTS.filter((p) => slugs.includes(p.slug))
  if (!list.length) return null
  return (
    <section className="relative mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:pb-24">
      <SectionTitle kicker="See it in action" title={title} gold={gold} />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08}>
            <motion.a href={`/products/${p.slug}/`} whileHover={{ y: -6 }} className="group block overflow-hidden rounded-3xl border border-ink/10 bg-onyx-2 transition-colors hover:border-gold/60">
              <ProductVisual p={p} />
              <div className="flex items-start justify-between gap-3 p-6">
                <div>
                  <h3 className="font-display text-xl font-bold">{p.name}</h3>
                  <p className="mt-1 text-sm text-mist">{p.tagline}</p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/15 transition-all group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold"><ArrowUpRight className="h-4 w-4" /></span>
              </div>
            </motion.a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------------- SERVICES LIST (services index) ---------------- */
type Svc = { slug: string; name: string; short: string; intro: string; outcome: string; deliverables: string[]; image: string }
export function ServicesList({ services }: { services: Svc[] }) {
  return (
    <section className="relative mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:pb-24">
      <div className="grid gap-8">
        {services.map((s, i) => (
          <Reveal key={s.slug}>
            <SpotlightCard className="p-6 sm:p-10">
              <div className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                {s.slug === 'mobile-app-development' ? (
                  <PhoneFan items={MOBILE_FAN} className="aspect-[16/10] rounded-2xl" />
                ) : (
                  <div className="overflow-hidden rounded-2xl border border-ink/10">
                    <img src={s.image} alt={`${s.name} by MoksFix`} loading="lazy" className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
                  </div>
                )}
                <div>
                  <p className="font-display text-sm font-bold text-accent">{String(i + 1).padStart(2, '0')}</p>
                  <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">{s.name}</h2>
                  <p className="mt-4 text-lg leading-relaxed text-mist">{s.intro}</p>
                  <ul className="mt-6 grid grid-cols-2 gap-2 text-sm font-semibold">
                    {s.deliverables.slice(0, 6).map((d) => <li key={d} className="flex items-center gap-2"><Check className="h-4 w-4 text-crimson" />{d}</li>)}
                  </ul>
                  <a href={`/services/${s.slug}/`} className={`${btnGold} mt-8`}>Explore {s.name} <ArrowRight className="h-5 w-5" /></a>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------------- PRODUCT DETAIL FACTS ---------------- */
export function ProductFacts({ slug, audience, platform, price, status, points, related }: { slug: string; audience: string; platform: string; price?: string; status?: string; points: string[]; related?: { href: string; label: string } }) {
  const p = PRODUCTS.find((x) => x.slug === slug)!
  return (
    <section className="relative mx-auto max-w-7xl px-5 pb-8 sm:px-8">
      <div className="grid gap-5 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <div className="h-full rounded-3xl border border-ink/10 bg-onyx-2 p-8 sm:p-10">
            <h2 className="font-display text-2xl font-bold">At a glance</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {points.map((t) => (
                <li key={t} className="flex items-center gap-3 font-semibold"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/25"><Check className="h-4 w-4 text-crimson" /></span>{t}</li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal className="lg:col-span-5" delay={0.1}>
          <div className="on-burgundy h-full rounded-3xl p-8 sm:p-10">
            <dl className="grid gap-5">
              <div><dt className="text-sm text-mist">Made for</dt><dd className="mt-1 font-display text-xl font-bold">{audience}</dd></div>
              <div><dt className="text-sm text-mist">Runs on</dt><dd className="mt-1 font-display text-xl font-bold">{platform}</dd></div>
              {(price || status) && <div><dt className="text-sm text-mist">{price ? 'Price' : 'Status'}</dt><dd className="mt-1 font-display text-xl font-bold text-accent">{price ?? status}</dd></div>}
              {price && status && <div><dt className="text-sm text-mist">Status</dt><dd className="mt-1 font-display text-xl font-bold">{status}</dd></div>}
            </dl>
            <div className="mt-8 flex flex-col gap-3">
              <a href={waLink(`Hi MoksFix, I'm interested in ${p.name} for my business. Can we talk?`)} target="_blank" rel="noopener noreferrer" className={btnGold}><MessageCircle className="h-5 w-5" /> Get {p.name}</a>
              {related && <a href={related.href} className="text-center text-sm font-semibold underline-offset-4 hover:underline">{related.label}</a>}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- TESTIMONIALS ---------------- */
export function Testimonials({ items }: { items: { quote: string; name: string; role: string; initials: string }[] }) {
  const [i, setI] = useState(0)
  const t = items[i]
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
      <SectionTitle kicker="What clients say" title="Built with people" gold="who trust us." center />
      <div className="relative mx-auto mt-10 max-w-4xl">
        <QuoteIcon className="mx-auto h-12 w-12 text-gold" aria-hidden />
        <div className="relative mt-6 min-h-48 sm:min-h-40">
          <AnimatePresence mode="wait">
            <motion.figure key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6, ease }} className="text-center">
              <blockquote className="font-display text-2xl leading-snug text-crimson sm:text-3xl">“{t.quote}”</blockquote>
              <figcaption className="mt-8 flex items-center justify-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-crimson font-display font-bold text-onyx">{t.initials}</span>
                <span className="text-left"><span className="block font-bold">{t.name}</span><span className="text-sm text-mist">{t.role}</span></span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="mt-10 flex justify-center gap-2" role="tablist" aria-label="Choose a testimonial">
          {items.map((x, n) => (
            <button key={x.name} role="tab" aria-selected={n === i} aria-label={x.name} onClick={() => setI(n)} className={`h-2.5 rounded-full transition-all ${n === i ? 'w-10 bg-crimson' : 'w-2.5 bg-ink/20 hover:bg-ink/40'}`} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- CTA BAND ---------------- */
export function CtaBand({ title = 'Ready for more orders?', gold = 'Let’s build it.', sub = 'Tell us about your business. You get a clear plan and a fixed quote, in writing, before any work starts.' }: { title?: string; gold?: string; sub?: string }) {
  return (
    <section className="relative px-5 pb-16 sm:px-8 lg:pb-24">
      <div className="on-burgundy relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] px-6 py-16 sm:px-14 sm:py-20">
        <video src="/city-network.mp4" poster="/city-network.jpg" autoPlay muted loop playsInline aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-r from-crimson via-crimson/90 to-crimson/40" />
        <div className="relative max-w-2xl">
          <h2 className="font-display text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
            <WordsReveal text={title} /> <WordsReveal text={gold} gold delay={0.15} />
          </h2>
          <Reveal delay={0.2}><p className="mt-6 text-lg text-mist">{sub}</p></Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Magnetic href="/contact/" className={btnGold}>Get a free quote <ArrowRight className="h-5 w-5" /></Magnetic>
              <Magnetic href={waLink('Hi MoksFix, I would like to discuss a project.')} target="_blank" className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-ink/30 px-7 font-semibold hover:border-gold">
                <MessageCircle className="h-5 w-5 text-accent" /> Chat on WhatsApp
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------------- BLOG GRID ---------------- */
export type PostCard = { slug: string; title: string; excerpt: string; category: string; date: string; readingTime: string; featured?: boolean }
export function BlogGrid({ posts, categories }: { posts: PostCard[]; categories: string[] }) {
  const [cat, setCat] = useState('All')
  const list = posts.filter((p) => cat === 'All' || p.category === cat)
  const [first, ...rest] = list
  return (
    <section className="relative mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:pb-24">
      <LayoutGroup>
        <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]" role="tablist" aria-label="Filter articles">
          {['All', ...categories].map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${cat === c ? 'text-ongold' : 'text-ivory/70 hover:text-ivory'}`}>
              {cat === c && <motion.span layoutId="blog-pill" className="absolute inset-0 rounded-full bg-gold" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              <span className="relative">{c}</span>
            </button>
          ))}
        </div>
        {first && (
          <motion.a layout key={first.slug} href={`/blog/${first.slug}/`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}
            className="on-burgundy group relative mt-10 block overflow-hidden rounded-[2rem] p-8 sm:p-14">
            <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gold/20 blur-3xl transition-transform duration-700 group-hover:scale-125" />
            <p className="relative text-sm font-semibold text-accent">{first.category} · {first.date}</p>
            <h2 className="relative mt-4 max-w-3xl font-display text-3xl font-bold leading-tight sm:text-4xl">{first.title}</h2>
            <p className="relative mt-5 max-w-2xl text-lg text-mist">{first.excerpt}</p>
            <span className="relative mt-8 inline-flex items-center gap-2 font-semibold text-accent">Read article <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></span>
          </motion.a>
        )}
        <motion.div layout className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {rest.map((p, i) => (
              <motion.a layout key={p.slug} href={`/blog/${p.slug}/`}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.5, ease, delay: Math.min(i, 6) * 0.04 }}
                whileHover={{ y: -6 }}
                className="group flex flex-col rounded-3xl border border-ink/10 bg-onyx-2 p-7 transition-colors hover:border-gold/60">
                <p className="text-sm font-semibold text-accent">{p.category}</p>
                <h3 className="mt-3 font-display text-xl font-bold leading-snug">{p.title}</h3>
                <p className="mt-3 line-clamp-3 text-mist">{p.excerpt}</p>
                <p className="mt-auto flex items-center justify-between pt-6 text-sm text-mist">
                  <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{p.readingTime}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 transition-all group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold"><ArrowUpRight className="h-4 w-4" /></span>
                </p>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </section>
  )
}

/* ---------------- ABOUT: values + global reach ---------------- */
const VALUES = [
  { t: 'Senior talent, end to end', d: 'No hand-offs to juniors — the people who pitch are the people who build.' },
  { t: 'Speed without shortcuts', d: 'Short release rounds, clean code and careful testing on every project.' },
  { t: 'Built to scale', d: 'Architectures that grow with you, from your first hundred users onward.' },
  { t: 'Local roots, global standard', d: 'Proudly based in Coimbatore, delivering to founders and enterprises worldwide.' },
]
export function AboutValues() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionTitle kicker="Why MoksFix" title="Creative thinking," gold="corporate reliability." sub="We pair the boldness of a design studio with the discipline of an engineering team — the balance behind every product we ship." />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {VALUES.map((v, i) => (
            <Reveal key={v.t} delay={(i % 2) * 0.08 + Math.floor(i / 2) * 0.06}>
              <SpotlightCard className="h-full p-8">
                <span className="font-display text-sm font-bold text-accent">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 font-display text-xl font-bold">{v.t}</h3>
                <p className="mt-2 leading-relaxed text-mist">{v.d}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function WorldReach() {
  return (
    <section className="on-burgundy relative overflow-hidden">
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:py-24">
        <div>
          <SectionTitle kicker="Global reach" title="From Coimbatore," gold="to the world." sub="Proudly based in Coimbatore, India — delivering websites, apps and products to founders and enterprises across the globe. Remote-friendly, timezone-flexible, always on." />
        </div>
        <Reveal delay={0.15}>
          <div className="overflow-hidden rounded-[2rem] border border-ink/15">
            <video src="/assets/world-reach.mp4" autoPlay muted loop playsInline aria-label="Gold world map with connections from India" className="aspect-video w-full object-cover" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Section({ children }: { children: ReactNode }) {
  return <>{children}</>
}
