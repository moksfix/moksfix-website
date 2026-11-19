import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUp, Check, Headphones, Layers, Mail, MapPin, MessageCircle, Phone, Plus, Send, ShieldCheck, Smartphone, Zap } from 'lucide-react'
import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { CONTACT, PRODUCTS, waLink } from './data'
import { Reveal, SectionTitle, WordsReveal, ease, SocialLinks } from './ui'

/* ---------------- WHY ---------------- */
const REASONS = [
  { icon: ShieldCheck, t: 'Fixed quote, in writing', d: 'You know the price before a single line of code is written.' },
  { icon: Layers, t: 'Proven, not experimental', d: 'We run ten products of our own. Yours is built on what already works.' },
  { icon: Smartphone, t: 'Web, Android & iOS', d: 'One team for the website, the web app and both app stores.' },
  { icon: Zap, t: 'WhatsApp, payments & QR', d: 'The things Indian customers expect, built in from day one.' },
  { icon: Headphones, t: 'A person to call', d: 'A team in Coimbatore that answers the phone after launch day.' },
  { icon: MapPin, t: 'Local, working worldwide', d: 'Clients across Tamil Nadu, India and overseas.' },
]

export function Why() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  return (
    <section ref={ref} className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionTitle kicker="Why MoksFix" title="Software from people" gold="who run software." />
          <Reveal delay={0.2}>
            <figure className="relative mt-10 overflow-hidden rounded-3xl border border-ink/10">
              <motion.img style={{ y: imgY, scale: 1.25 }} src="/img/town-network.jpg" alt="Illustrated town of shops, offices and homes linked by glowing roads" className="aspect-[4/3] w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/20 to-transparent" />
              <figcaption className="absolute bottom-5 left-6 right-6 text-sm text-ivory/85">Every shop, clinic and office in town, connected by software we build.</figcaption>
            </figure>
          </Reveal>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:pt-4">
          {REASONS.map((r, i) => (
            <Reveal key={r.t} delay={(i % 2) * 0.08 + Math.floor(i / 2) * 0.06}>
              <div className="group h-full rounded-3xl border border-ink/[0.08] bg-onyx-2 p-7 transition-colors hover:border-gold/35">
                <r.icon className="h-6 w-6 text-accent transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110" />
                <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">{r.t}</h3>
                <p className="mt-2 leading-relaxed text-mist">{r.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- FAQ ---------------- */
type QA = { q: string; a: string }
const FAQS: QA[] = [
  { q: 'How much will my website or app cost?', a: 'We quote after one short call, in rupees, for a fixed scope written down before work starts. A business website is the smallest job; billing, booking and HR systems are priced screen by screen.' },
  { q: 'Can I use one of your products instead of a custom build?', a: 'Yes, and it is usually faster and cheaper. Our products began as real client builds, so we set one up for your business and change only what needs changing.' },
  { q: 'Do you build both Android and iOS apps?', a: 'Yes. Tea Stall, Pakka Site and Biker’s Club CBE each run on both, and we publish to the Play Store and the App Store for you.' },
  { q: 'How long does a project take?', a: 'Marketing websites usually launch in 2–4 weeks. Web and mobile apps ship in short rounds so you see progress early, with first versions typically in 6–12 weeks.' },
  { q: 'Do you work outside Coimbatore?', a: 'Yes. Our office is in Ganesapuram, and we work with clients across Tamil Nadu, the rest of India and overseas, on calls and shared screens.' },
  { q: 'Do you provide support after launch?', a: 'Yes. We host, back up and update what we build, and add features on a retainer. We don’t disappear at launch.' },
]

export function Faq({ items = FAQS, title = 'Questions we', gold = 'hear first.' }: { items?: QA[]; title?: string; gold?: string }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4"><SectionTitle kicker="FAQ" title={title} gold={gold} /></div>
        <div className="lg:col-span-8">
          {items.map(({ q, a }, i) => {
            const isOpen = open === i
            return (
              <Reveal key={q} delay={i * 0.04}>
                <div className={`mb-3 rounded-2xl border transition-colors ${isOpen ? 'border-gold/40 bg-onyx-2' : 'border-ink/[0.1] hover:border-ink/25'}`}>
                  <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} aria-controls={`faq-a-${i}`} className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left">
                    <h3 className="font-display text-lg font-semibold sm:text-xl">{q}</h3>
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.4, ease }} className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${isOpen ? 'bg-gold text-ongold' : 'border border-ink/15'}`}>
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>
                  {/* Every answer stays in the HTML (for search and AI crawlers); closed ones collapse to zero height. */}
                  <motion.div
                    id={`faq-a-${i}`}
                    initial={false}
                    animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease }}
                    className="overflow-hidden"
                    style={isOpen ? undefined : { height: 0, opacity: 0 }}
                    inert={!isOpen}
                  >
                    <p className="max-w-2xl px-6 pb-6 leading-relaxed text-mist">{a}</p>
                  </motion.div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------------- QUOTE ---------------- */
const NEEDS = ['Website', 'Web application', 'Mobile app', 'One of your products', 'Google & AI visibility']
const BUDGETS = ['Under ₹50,000', '₹50,000 – ₹2 lakh', '₹2 – 5 lakh', 'Above ₹5 lakh', 'Not sure yet']
const WHEN = ['As soon as possible', 'This month', 'In 1–3 months', 'Just exploring']

function Chip({ on, children, onClick }: { on: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <motion.button
      type="button" whileTap={{ scale: 0.95 }} onClick={onClick} aria-pressed={on}
      className={`inline-flex min-h-11 items-center gap-1.5 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${on ? 'border-gold bg-gold text-ongold' : 'border-ink/15 bg-ink/[0.03] text-ivory/85 hover:border-ink/35'}`}
    >
      {on && <Check className="h-3.5 w-3.5" />}{children}
    </motion.button>
  )
}

export function Quote({ accessKey, headingTag = 'h2', preset }: { accessKey: string; headingTag?: 'h1' | 'h2'; preset?: string }) {
  const presetProduct = preset ? PRODUCTS.find((p) => p.slug === preset)?.name : undefined
  const [needs, setNeeds] = useState<string[]>(presetProduct ? ['One of your products'] : ['Website'])
  const [budget, setBudget] = useState('Not sure yet')
  const [when, setWhen] = useState('As soon as possible')
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [f, setF] = useState({ name: '', phone: '', email: '', business: '', details: presetProduct ? `Interested in ${presetProduct}.` : '' })
  const toggle = (n: string) => setNeeds((v) => (v.includes(n) ? v.filter((x) => x !== n) : [...v, n]))

  const message = () =>
    [
      'Hi MoksFix, I would like a quote.',
      `Name: ${f.name}`,
      `Phone: ${f.phone}`,
      f.email && `Email: ${f.email}`,
      f.business && `Business: ${f.business}`,
      `I need: ${needs.join(', ') || 'Not sure'}`,
      `Budget: ${budget}`,
      `Timeline: ${when}`,
      f.details && `Details: ${f.details}`,
    ].filter(Boolean).join('\n')

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const bot = (e.currentTarget.elements.namedItem('botcheck') as HTMLInputElement | null)?.checked
    if (bot) return
    setState('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New quote request — ${f.name}${f.business ? ' (' + f.business + ')' : ''}`,
          from_name: 'MoksFix Website',
          name: f.name, phone: f.phone, email: f.email || undefined, replyto: f.email || undefined, business: f.business,
          needs: needs.join(', '), budget, timeline: when, message: message(),
        }),
      })
      const data = await res.json().catch(() => ({}))
      setState(res.ok && data.success !== false ? 'sent' : 'error')
    } catch {
      setState('error')
    }
  }
  const input = 'w-full rounded-xl border border-ink/12 bg-onyx px-4 py-3.5 text-ivory placeholder:text-mist/70 outline-none transition-colors focus:border-gold'
  const Heading = headingTag

  return (
    <section id="quote" className="on-burgundy relative scroll-mt-24 overflow-hidden py-20 lg:py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gold/15 blur-[160px]" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-accent"><span className="h-px w-8 bg-accent/60" /> Get a free quote</p>
          </Reveal>
          <Heading className="font-display text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
            <WordsReveal text="Tell us what you need." /> <WordsReveal text="Get a plan back." gold delay={0.15} />
          </Heading>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist">Pick what fits and add a line about your business. It reaches our inbox straight away, and we reply within one business day.</p>
          </Reveal>
          <Reveal delay={0.3}>
            <ul className="mt-10 grid gap-4">
              <li><a href={waLink('Hi MoksFix, I would like to discuss a project.')} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4"><span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-ink/15 bg-onyx-2 group-hover:border-gold/60"><MessageCircle className="h-5 w-5 text-accent" /></span><span><span className="block text-sm text-mist">WhatsApp</span><span className="font-display text-lg font-semibold">Chat with us now</span></span></a></li>
              <li><a href={`tel:${CONTACT.tel}`} className="group flex items-center gap-4"><span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-ink/15 bg-onyx-2 group-hover:border-gold/60"><Phone className="h-5 w-5 text-accent" /></span><span><span className="block text-sm text-mist">Call us</span><span className="font-display text-lg font-semibold">{CONTACT.phone}</span></span></a></li>
              <li><a href={`mailto:${CONTACT.email}`} className="group flex items-center gap-4"><span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-ink/15 bg-onyx-2 group-hover:border-gold/60"><Mail className="h-5 w-5 text-accent" /></span><span><span className="block text-sm text-mist">Email</span><span className="font-display text-lg font-semibold">{CONTACT.email}</span></span></a></li>
              <li className="flex items-center gap-4"><span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-ink/15 bg-onyx-2"><MapPin className="h-5 w-5 text-accent" /></span><span><span className="block text-sm text-mist">Visit</span><span className="font-medium">{CONTACT.address}</span></span></li>
            </ul>
            <SocialLinks items={CONTACT.socials} className="mt-6" />
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7" delay={0.15}>
          <div className="border-beam rounded-[2rem] bg-onyx-2/90 p-6 shadow-[0_40px_120px_-40px_rgba(0,0,0,.45)] backdrop-blur-xl sm:p-10">
            <AnimatePresence mode="wait">
              {state !== 'sent' ? (
                <motion.form key="form" onSubmit={submit} exit={{ opacity: 0, y: -20 }} className="grid gap-8">
                  <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
                  <fieldset>
                    <legend className="mb-3 font-semibold">What do you need?</legend>
                    <div className="flex flex-wrap gap-2">{NEEDS.map((n) => <Chip key={n} on={needs.includes(n)} onClick={() => toggle(n)}>{n}</Chip>)}</div>
                  </fieldset>
                  <fieldset>
                    <legend className="mb-3 font-semibold">Budget</legend>
                    <div className="flex flex-wrap gap-2">{BUDGETS.map((n) => <Chip key={n} on={budget === n} onClick={() => setBudget(n)}>{n}</Chip>)}</div>
                  </fieldset>
                  <fieldset>
                    <legend className="mb-3 font-semibold">When do you want to start?</legend>
                    <div className="flex flex-wrap gap-2">{WHEN.map((n) => <Chip key={n} on={when === n} onClick={() => setWhen(n)}>{n}</Chip>)}</div>
                  </fieldset>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-2 text-sm font-semibold"><span>Your name</span><input required className={input} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Full name" autoComplete="name" /></label>
                    <label className="grid gap-2 text-sm font-semibold"><span>Phone / WhatsApp</span><input required type="tel" className={input} value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} placeholder="98xxx xxxxx" autoComplete="tel" /></label>
                    <label className="grid gap-2 text-sm font-semibold"><span>Email <span className="font-normal text-mist">(optional)</span></span><input type="email" className={input} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} placeholder="you@company.com" autoComplete="email" /></label>
                    <label className="grid gap-2 text-sm font-semibold"><span>Business name <span className="font-normal text-mist">(optional)</span></span><input className={input} value={f.business} onChange={(e) => setF({ ...f, business: e.target.value })} placeholder="e.g. Sri Murugan Builders" autoComplete="organization" /></label>
                    <label className="grid gap-2 text-sm font-semibold sm:col-span-2"><span>Anything we should know? <span className="font-normal text-mist">(optional)</span></span><textarea rows={3} className={`${input} resize-none`} value={f.details} onChange={(e) => setF({ ...f, details: e.target.value })} placeholder="What should the website or app do for you?" /></label>
                  </div>
                  {state === 'error' && (
                    <p role="alert" className="rounded-xl bg-gold/15 px-4 py-3 text-sm">Your request did not go through. Please send it on WhatsApp instead, or call {CONTACT.phone}.</p>
                  )}
                  <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                    <motion.button whileTap={{ scale: 0.97 }} type="submit" disabled={state === 'sending'} className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-gold px-8 font-bold text-ongold shadow-[0_12px_40px_-12px_rgba(217,162,27,.8)] transition-colors hover:bg-gold-light disabled:opacity-70">
                      <Send className="h-5 w-5" /> {state === 'sending' ? 'Sending…' : 'Send my request'}
                    </motion.button>
                    <a href={waLink(message())} target="_blank" rel="noopener noreferrer" className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-ink/20 px-6 text-sm font-semibold hover:border-gold">
                      <MessageCircle className="h-4 w-4 text-accent" /> Send on WhatsApp instead
                    </a>
                  </div>
                </motion.form>
              ) : (
                <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease }} className="py-10 text-center">
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.15 }} className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold text-ongold">
                    <Check className="h-9 w-9" />
                  </motion.span>
                  <h3 className="mt-7 font-display text-3xl font-bold">Thank you, {f.name.split(' ')[0] || 'we got it'}.</h3>
                  <p className="mx-auto mt-3 max-w-md text-mist">Your request is in our inbox. We reply within one business day. Want an answer sooner?</p>
                  <a href={waLink(message())} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-gold px-6 font-semibold text-ongold hover:bg-gold-light"><MessageCircle className="h-4 w-4" /> Continue on WhatsApp</a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- FOOTER ---------------- */
const SERVICE_LINKS = [
  ['Web Designing', '/services/web-designing/'],
  ['Web Application Development', '/services/web-application-development/'],
  ['Mobile App Development', '/services/mobile-app-development/'],
]

export function Footer() {
  return (
    <footer className="on-burgundy relative overflow-hidden pt-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <a href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="" loading="lazy" width={44} height={44} className="h-11 w-11" />
            <span className="font-display text-2xl font-bold">Moks<span className="text-accent">Fix</span></span>
          </a>
          <p className="mt-5 max-w-sm text-mist">A software studio in Coimbatore building websites, web apps and mobile apps that bring businesses more orders.</p>
          <a href="/contact/" className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-gold px-6 text-sm font-bold text-ongold hover:bg-gold-light">Get a free quote <ArrowRight className="h-4 w-4" /></a>
        </div>
        <nav className="md:col-span-3" aria-label="Services">
          <p className="mb-1 text-sm font-semibold text-accent">Services</p>
          <ul className="grid">
            {SERVICE_LINKS.map(([l, h]) => <li key={h}><a href={h} className="inline-block py-2.5 hover:text-accent">{l}</a></li>)}
            <li><a href="/services/" className="inline-block py-2.5 hover:text-accent">All services</a></li>
          </ul>
          <p className="mb-1 mt-6 text-sm font-semibold text-accent">Company</p>
          <ul className="grid">
            {[['About', '/about/'], ['Blog', '/blog/'], ['Our work', '/#work'], ['Contact', '/contact/']].map(([l, h]) => <li key={h}><a href={h} className="inline-block py-2.5 hover:text-accent">{l}</a></li>)}
          </ul>
        </nav>
        <nav className="md:col-span-2" aria-label="Products">
          <p className="mb-1 text-sm font-semibold text-accent">Products</p>
          <ul className="grid text-[15px]">
            {PRODUCTS.map((p) => <li key={p.slug}><a href={`/products/${p.slug}/`} className="inline-block py-2.5 hover:text-accent">{p.name}</a></li>)}
          </ul>
        </nav>
        <div className="md:col-span-3">
          <p className="mb-1 text-sm font-semibold text-accent">Contact</p>
          <ul className="grid">
            <li><a href={`tel:${CONTACT.tel}`} className="inline-block py-2.5 hover:text-accent">{CONTACT.phone}</a></li>
            <li><a href={`mailto:${CONTACT.email}`} className="inline-block py-2.5 hover:text-accent">{CONTACT.email}</a></li>
            <li><a href={waLink('Hi MoksFix')} target="_blank" rel="noopener noreferrer" className="inline-block py-2.5 hover:text-accent">WhatsApp</a></li>
            <li className="py-2.5 text-mist">{CONTACT.address}</li>
          </ul>
          <SocialLinks items={CONTACT.socials} className="mt-4" />
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl px-5 sm:px-8">
        <p className="select-none font-display text-[22vw] font-bold leading-[0.8] tracking-[-0.04em] lg:text-[17rem]" aria-hidden>
          <WordsReveal text="MoksFix" gold />
        </p>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-xs text-mist sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© 2026 MoksFix, Coimbatore. All rights reserved.</p>
        <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="inline-flex items-center gap-1 hover:text-accent">Back to top <ArrowUp className="h-3 w-3" /></a>
      </div>
    </footer>
  )
}

/* ---------------- FLOATING WHATSAPP ---------------- */
export function WhatsAppFab() {
  const { scrollY } = useScroll()
  const show = useTransform(scrollY, [300, 500], [0, 1])
  return (
    <motion.a
      style={{ opacity: show, scale: show }}
      href={waLink('Hi MoksFix, I would like to discuss a project.')} target="_blank" rel="noopener noreferrer"
      aria-label="Chat with MoksFix on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-gold text-ongold shadow-[0_16px_40px_-10px_rgba(217,162,27,.8)]"
      whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-gold/40 [animation-duration:2.4s]" />
      <MessageCircle className="relative h-7 w-7" />
    </motion.a>
  )
}
