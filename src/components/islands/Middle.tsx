import { AnimatePresence, LayoutGroup, motion, useScroll, useSpring, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Check, ClipboardList, Hammer, MessageCircle, PenTool, Rocket, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { CATEGORIES, PRODUCTS, WEBSITES, waLink } from './data'
import type { Category, Product } from './data'
import { BrowserFrame, PhoneFrame, Reveal, SectionTitle, btnGhost, btnGold, ease } from './ui'

/* ---------------- PRODUCTS ---------------- */
/** Shared card picture: phones for mobile apps, a browser window for web apps. */
export function ProductVisual({ p, big = false }: { p: Product; big?: boolean }) {
  const box = big ? 'h-full min-h-80' : 'aspect-[16/11]'
  if (p.mobile) {
    const [one] = p.screens
    return (
      <div className={`relative flex items-end justify-center overflow-hidden bg-gradient-to-br from-crimson via-crimson-light to-crimson px-6 pt-6 ${box}`}>
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/30 blur-3xl transition-transform duration-700 group-hover:scale-150" />
        <PhoneFrame src={one} name={p.name} alt={`${p.name} app screen`} className={`relative w-[42%] translate-y-[10%] transition-transform duration-700 group-hover:translate-y-[3%] ${big ? 'max-w-[240px]' : 'max-w-[170px]'}`} />
      </div>
    )
  }
  if (p.shot && !p.art) {
    return (
      <div className={`relative flex items-end overflow-hidden bg-gradient-to-br from-onyx-3 to-onyx-2 px-6 pt-6 ${box}`}>
        <BrowserFrame src={p.shot} alt={`${p.name} screen`} className="relative w-full translate-y-[6%] transition-transform duration-700 group-hover:translate-y-[2%]" />
      </div>
    )
  }
  if (p.shot) {
    return (
      <div className={`relative overflow-hidden bg-onyx-3 ${box}`}>
        <img src={p.shot} alt={`${p.name} illustration`} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
      </div>
    )
  }
  return (
    <div className={`on-burgundy relative flex flex-col justify-end overflow-hidden bg-gradient-to-br from-onyx-3 via-onyx-2 to-onyx p-6 ${box}`}>
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/20 blur-3xl transition-transform duration-700 group-hover:scale-150" />
      <p className="relative font-display text-3xl font-semibold tracking-tight">{p.name}</p>
      <ul className="relative mt-4 grid gap-1.5 text-sm text-ivory/80">
        {p.features.slice(0, 3).map((f) => (
          <li key={f} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold" />{f}</li>
        ))}
      </ul>
    </div>
  )
}

function ProductModal({ p, onClose }: { p: Product; onClose: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [onClose])
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/40 p-0 backdrop-blur-md sm:items-center sm:p-6"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
      role="dialog" aria-modal="true" aria-label={p.name}
    >
      <motion.div
        layoutId={`card-${p.name}`}
        onClick={(e) => e.stopPropagation()}
        className="grid max-h-[92vh] w-full max-w-5xl overflow-auto rounded-t-3xl border border-ink/10 bg-onyx-2 sm:rounded-3xl md:grid-cols-2"
        transition={{ duration: 0.6, ease }}
      >
        <div className="group"><ProductVisual p={p} big /></div>
        <div className="relative p-8 sm:p-10">
          <button onClick={onClose} className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 hover:border-ink/40" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
          <p className="text-sm text-accent">{p.tagline}</p>
          <h3 className="mt-2 font-display text-4xl font-semibold tracking-tight">{p.name}</h3>
          <p className="mt-4 leading-relaxed text-mist">{p.description}</p>
          <ul className="mt-6 grid gap-3">
            {p.features.map((f, i) => (
              <motion.li key={f} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.06 }} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/15"><Check className="h-3.5 w-3.5 text-accent" /></span>{f}
              </motion.li>
            ))}
          </ul>
          <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
            <div><dt className="text-mist">For</dt><dd className="mt-1 font-medium">{p.who}</dd></div>
            <div><dt className="text-mist">Runs on</dt><dd className="mt-1 font-medium">{p.platform}</dd></div>
            <div><dt className="text-mist">Price</dt><dd className="mt-1 font-medium text-accent">{p.price ?? 'On request — call us'}</dd></div>
            {p.status && <div><dt className="text-mist">Status</dt><dd className="mt-1 font-medium">{p.status}</dd></div>}
          </dl>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={waLink(`Hi MoksFix, I'm interested in ${p.name} for my business. Can we talk?`)} target="_blank" rel="noopener noreferrer" className={btnGold}>
              <MessageCircle className="h-5 w-5" /> Get {p.name}
            </a>
            <a href={`/products/${p.slug}/`} className={btnGhost}>Full details <ArrowRight className="h-4 w-4" /></a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Products({ heading = true, only }: { heading?: boolean; only?: string[] }) {
  const [cat, setCat] = useState<'all' | Category>('all')
  const [open, setOpen] = useState<Product | null>(null)
  const pool = only ? PRODUCTS.filter((p) => only.includes(p.slug)) : PRODUCTS
  const list = pool.filter((p) => cat === 'all' || p.cat === cat)
  return (
    <section id="products" className={`relative mx-auto max-w-7xl px-5 sm:px-8 ${heading ? 'py-20 lg:py-24' : 'pb-20 lg:pb-24'}`}>
      {heading && (
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionTitle kicker="Our products" title="Ready-made software," gold="proven in real businesses." sub="Skip months of building. Each product below already runs a real business, and we can set one up under your brand." />
        </div>
      )}

      <LayoutGroup>
        {!only && <div className="mt-12 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]" role="tablist" aria-label="Filter products">
          {CATEGORIES.map((c) => (
            <button
              key={c.id} role="tab" aria-selected={cat === c.id} onClick={() => setCat(c.id)}
              className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${cat === c.id ? 'text-ongold' : 'text-ivory/70 hover:text-ivory'}`}
            >
              {cat === c.id && <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-gold" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              <span className="relative">{c.label}</span>
            </button>
          ))}
        </div>}

        <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.button
                layout layoutId={`card-${p.name}`} key={p.name}
                initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.55, ease, delay: Math.min(i, 6) * 0.04 }}
                whileHover={{ y: -6 }}
                onClick={() => setOpen(p)}
                className="group overflow-hidden rounded-3xl border border-ink/[0.08] bg-onyx-2 text-left transition-colors hover:border-gold/40"
              >
                <ProductVisual p={p} />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl font-semibold tracking-tight">{p.name}</h3>
                      <p className="mt-1 text-sm text-mist">{p.tagline}</p>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/10 transition-all group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold group-hover:text-ongold">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                  <p className="mt-5 text-xs text-ivory/60">{p.who} · {p.platform}</p>
                  {(p.price || p.status) && (
                    <p className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium ${p.status === 'In development' ? 'bg-ink/5 text-mist' : 'bg-gold/10 text-accent'}`}>{p.price ?? p.status}</p>
                  )}
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>{open && <ProductModal p={open} onClose={() => setOpen(null)} />}</AnimatePresence>
      </LayoutGroup>
    </section>
  )
}

/* ---------------- ZOOM STORY ---------------- */
function Caption({ p, range, children }: { p: MotionValue<number>; range: [number, number, number, number]; children: React.ReactNode }) {
  const opacity = useTransform(p, range, [0, 1, 1, 0])
  const y = useTransform(p, range, [24, 0, 0, -24])
  return <motion.p style={{ opacity, y }} className="absolute inset-x-0 top-0 text-lg leading-relaxed text-ivory/90">{children}</motion.p>
}

export function ZoomStory() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const scale = useTransform(p, [0, 0.28, 0.45, 0.62, 0.8, 1], [1, 1, 2, 2, 2.7, 2.7])
  const x = useTransform(p, [0, 0.28, 0.45, 0.62, 0.8, 1], ['0%', '0%', '8%', '8%', '-84%', '-84%'])
  const y = useTransform(p, [0, 0.28, 0.45, 0.62, 0.8, 1], ['0%', '0%', '12%', '12%', '27%', '27%'])
  const bar = useTransform(p, [0, 1], ['0%', '100%'])
  return (
    <section ref={ref} className="on-burgundy relative h-[230vh]" aria-label="Laundrix, in detail">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[70vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[160px]" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
              Built to the <span className="text-gold-metal">last rupee.</span>
            </h2>
            <div className="relative mt-8 h-32">
              <Caption p={p} range={[-0.1, 0, 0.3, 0.38]}>Laundrix at the counter: find the customer by phone number, tap the garments in, print the bill.</Caption>
              <Caption p={p} range={[0.36, 0.44, 0.62, 0.7]}>One tap per garment and service. Every piece gets its own numbered tag, so nothing leaves with the wrong family.</Caption>
              <Caption p={p} range={[0.68, 0.78, 1, 1.1]}>Money is stored in paise, so every store's totals add up to the last rupee. That is how we build.</Caption>
            </div>
            <div className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-ink/10"><motion.div style={{ width: bar }} className="h-full bg-gold" /></div>
          </div>
          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-2xl border border-ink/10 bg-onyx-3 shadow-[0_60px_120px_-30px_rgba(58,14,22,.22)]">
              <div className="flex h-9 items-center gap-1.5 border-b border-ink/[0.06] px-4">
                <span className="h-2.5 w-2.5 rounded-full bg-crimson-light/80" /><span className="h-2.5 w-2.5 rounded-full bg-gold/80" /><span className="h-2.5 w-2.5 rounded-full bg-ink/20" />
                <span className="ml-3 text-[11px] text-mist">Laundrix · New bill</span>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden">
                <motion.img loading="lazy" decoding="async" src="/img/new-bill.jpg" alt="Laundrix new bill screen with garments and a printed receipt" style={{ scale, x, y }} className="absolute inset-0 h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- PROCESS ---------------- */
const STEPS = [
  { icon: ClipboardList, t: 'We sit at your counter', d: 'We watch how bills, bookings or attendance happen today, on paper, WhatsApp or Excel, before suggesting anything.' },
  { icon: PenTool, t: 'We design every screen', d: 'You click through the real designs and change them while change is still cheap. Then you get a fixed quote in writing.' },
  { icon: Hammer, t: 'We build in short rounds', d: 'Each round ends with a working version on your own phone and computer, not a status report.' },
  { icon: Rocket, t: 'We launch and look after it', d: 'Live on your domain, on the Play Store and App Store. We host it, back it up and pick up the phone.' },
]

export function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const h = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return (
    <section id="process" className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
          <SectionTitle kicker="How we work" title="From first call" gold="to first order." sub="Four steps, no surprises. You see working software early and you always know what it costs." />
          <Reveal delay={0.3}>
            <a href="/contact/" className={`${btnGold} mt-10`}>Start with a free call <ArrowRight className="h-5 w-5" /></a>
          </Reveal>
        </div>
        <div ref={ref} className="relative lg:col-span-7">
          <div className="absolute left-6 top-2 bottom-2 w-px bg-ink/10" />
          <motion.div style={{ scaleY: h }} className="absolute left-6 top-2 bottom-2 w-px origin-top bg-gradient-to-b from-gold via-gold to-crimson-light" />
          <ol className="grid gap-14">
            {STEPS.map((s, i) => (
              <Reveal key={s.t} delay={0.05}>
                <li className="relative pl-20">
                  <span className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/30 bg-onyx-2">
                    <s.icon className="h-5 w-5 text-accent" />
                  </span>
                  <p className="text-sm text-accent">Step {i + 1}</p>
                  <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight sm:text-3xl">{s.t}</h3>
                  <p className="mt-3 max-w-lg leading-relaxed text-mist">{s.d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

/* ---------------- WORK (horizontal) ---------------- */
type Kind = 'web-design' | 'web-app' | 'mobile-app'
const KINDS: { id: Kind; label: string; href: string }[] = [
  { id: 'web-design', label: 'Web Design', href: '/services/web-designing/' },
  { id: 'web-app', label: 'Web Applications', href: '/services/web-application-development/' },
  { id: 'mobile-app', label: 'Mobile Apps', href: '/services/mobile-app-development/' },
]

/** Portfolio grouped by service: websites in browser windows, apps in their own frames. */
export function Work({ only, heading = true }: { only?: Kind; heading?: boolean }) {
  const [kind, setKind] = useState<Kind>(only ?? 'web-design')
  const products = PRODUCTS.filter((p) => (kind === 'mobile-app' ? p.mobile : !p.mobile))
  const title = only === 'web-design' ? ['Websites', 'we designed.'] : only === 'web-app' ? ['Web applications', 'we built.'] : only === 'mobile-app' ? ['Mobile apps', 'we shipped.'] : ['Real screens,', 'real businesses.']
  return (
    <section id={only ? `work-${only}` : 'work'} className="relative scroll-mt-24 bg-onyx-2/50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {heading && <SectionTitle kicker="Selected work" title={title[0]} gold={title[1]} />}
        {!only && (
          <LayoutGroup id="work-tabs">
            <div className="mt-10 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]" role="tablist" aria-label="Filter work by service">
              {KINDS.map((k) => (
                <button key={k.id} role="tab" aria-selected={kind === k.id} onClick={() => setKind(k.id)}
                  className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${kind === k.id ? 'text-ongold' : 'text-ivory/70 hover:text-ivory'}`}>
                  {kind === k.id && <motion.span layoutId="work-pill" className="absolute inset-0 rounded-full bg-gold" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                  <span className="relative">{k.label}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        )}

        <AnimatePresence mode="wait">
          <motion.div key={kind} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5, ease }}
            className={`mt-10 grid gap-6 ${kind === 'web-design' ? 'md:grid-cols-2' : kind === 'mobile-app' ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
            {kind === 'web-design'
              ? WEBSITES.map((w, i) => (
                  <motion.figure key={w.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: i * 0.08 }}
                    whileHover={{ y: -8 }} className={`group rounded-3xl border border-ink/10 bg-onyx p-5 sm:p-6 ${WEBSITES.length % 2 && i === WEBSITES.length - 1 ? 'md:col-span-2 md:mx-auto md:w-[calc(50%-0.75rem)]' : ''}`}>
                    <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-onyx-3 to-onyx-2 px-5 pt-5 sm:px-8 sm:pt-8">
                      <BrowserFrame src={w.image} alt={w.imageAlt} url={w.url?.replace('https://', '') ?? w.name.toLowerCase().replace(/[^a-z]+/g, '') + '.com'} className="translate-y-[4%] transition-transform duration-700 group-hover:translate-y-0" />
                    </div>
                    <figcaption className="px-1 pt-5">
                      <p className="flex items-baseline justify-between gap-3">
                        <span className="font-display text-xl font-bold">{w.name}</span>
                        <span className="text-sm text-mist">{w.place}</span>
                      </p>
                      <p className="mt-2 leading-relaxed text-mist">{w.summary}</p>
                    </figcaption>
                  </motion.figure>
                ))
              : products.map((p, i) => (
                  <motion.a key={p.slug} href={`/products/${p.slug}/`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: Math.min(i, 6) * 0.06 }}
                    whileHover={{ y: -8 }} className="group block overflow-hidden rounded-3xl border border-ink/10 bg-onyx transition-colors hover:border-gold/60">
                    <ProductVisual p={p} />
                    <div className="flex items-start justify-between gap-3 p-5">
                      <div>
                        <h3 className="font-display text-lg font-bold">{p.name}</h3>
                        <p className="mt-1 text-sm text-mist">{p.tagline}</p>
                      </div>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/15 transition-all group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold"><ArrowUpRight className="h-4 w-4" /></span>
                    </div>
                  </motion.a>
                ))}
          </motion.div>
        </AnimatePresence>

        {!only && (
          <Reveal delay={0.1}>
            <a href={KINDS.find((k) => k.id === kind)!.href} className="mt-8 inline-flex items-center gap-2 py-3 font-semibold text-crimson underline-offset-4 hover:underline">
              More about {KINDS.find((k) => k.id === kind)!.label.toLowerCase()} <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        )}
      </div>
    </section>
  )
}
