import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Check, ChevronDown, MessageCircle } from 'lucide-react'
import { useRef } from 'react'
import { waLink } from './data'
import { Magnetic, Reveal, SectionTitle, WordsReveal, btnGhost, btnGold, ease } from './ui'

/* ---------------- HERO: full-screen video ---------------- */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.18])
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -140])
  const textFade = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section id="top" ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden" aria-labelledby="hero-title">
      {/* the video */}
      <motion.div style={{ scale: videoScale, y: videoY }} className="absolute inset-x-0 bottom-0 top-[46%] sm:top-[34%]">
        <motion.video
          src="/hero-city.mp4" poster="/hero-city.jpg"
          autoPlay muted loop playsInline preload="auto"
          initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2.2, ease }}
          className="h-full w-full object-cover object-[50%_75%]"
          aria-hidden
        />
      </motion.div>
      {/* cream wash so the words read over the sky */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-onyx from-30% via-onyx/85 via-45% to-transparent to-70% sm:from-35% sm:via-55% sm:to-75%" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-onyx to-transparent" />

      <motion.div style={{ y: textY, opacity: textFade }} className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-5 pt-36 text-center sm:px-8 sm:pt-40">
        <motion.a
          href="/products/"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.3 }}
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-crimson/25 bg-onyx/70 py-1.5 pl-1.5 pr-4 text-sm backdrop-blur transition-colors hover:border-crimson/60"
        >
          <span className="flex h-7 shrink-0 items-center whitespace-nowrap rounded-full bg-crimson px-3 text-xs font-semibold text-onyx">10 products</span>
          <span className="pt-0.5">Built and running from Coimbatore</span> <ArrowRight className="h-3.5 w-3.5 text-crimson" />
        </motion.a>

        <h1 id="hero-title" className="font-display text-[2.5rem] font-bold leading-[1.02] tracking-[-0.02em] text-crimson sm:text-6xl lg:text-7xl">
          <WordsReveal text="We build the software" delay={0.35} />
          <br />
          <WordsReveal text="your business runs on." delay={0.55} gold />
        </h1>

        <Reveal delay={0.8} y={18}>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-ivory/85">
            Websites that bring in enquiries, billing and booking systems your staff love, and mobile apps your customers keep, from a Coimbatore studio already running ten products of its own.
          </p>
        </Reveal>

        <Reveal delay={0.95} y={18}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Magnetic href="#quote" className={btnGold}>
              Get a free quote <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Magnetic>
            <Magnetic href={waLink('Hi MoksFix, I would like a quote for my business.')} target="_blank" className={`${btnGhost} bg-onyx/70`}>
              <MessageCircle className="h-5 w-5 text-crimson" /> Chat on WhatsApp
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={1.1} y={10}>
          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-ivory/85">
            {['Fixed quote in writing', 'Web, Android & iOS', 'Local team you can call'].map((t) => (
              <li key={t} className="flex items-center gap-2 rounded-full bg-onyx/70 px-3 py-1.5 backdrop-blur">
                <Check className="h-4 w-4 text-crimson" /> <span className="pt-0.5">{t}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </motion.div>

      <motion.a
        href="#showreel" aria-label="Scroll to the showreel"
        initial={{ opacity: 0 }} animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.6 }, y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
        className="relative z-10 mx-auto mb-8 mt-auto flex h-12 w-12 items-center justify-center rounded-full border border-crimson/30 bg-onyx/80 backdrop-blur"
      >
        <ChevronDown className="h-5 w-5 text-crimson" />
      </motion.a>
    </section>
  )
}

/* ---------------- SHOWREEL: real screens with 3D tilt ---------------- */
function Phone({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[2rem] border-[6px] border-[#2a1418] bg-black shadow-[0_40px_80px_-20px_rgba(58,14,22,.35)] ${className}`}>
      <img src={src} alt={alt} className="block h-full w-full object-cover object-top" />
    </div>
  )
}

export function Showreel() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 90, damping: 20 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 90, damping: 20 })
  const px = useSpring(useTransform(mx, [-0.5, 0.5], [-28, 28]), { stiffness: 80, damping: 20 })
  const py = useSpring(useTransform(my, [-0.5, 0.5], [-20, 20]), { stiffness: 80, damping: 20 })
  const npx = useTransform(px, (v) => -v)
  const npy = useTransform(py, (v) => -v)

  return (
    <section
      id="showreel"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width - 0.5)
        my.set((e.clientY - r.top) / r.height - 0.5)
      }}
      className="relative overflow-hidden py-20 lg:py-24"
    >
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionTitle kicker="See it working" title="Real software," gold="already earning its keep." sub="This is not a mock-up. These are screens from products we built and run: a laundry counter, a broker's day, a landlord's rent book and a ride club's boarding pass." />
          <Reveal delay={0.25}>
            <a href="/products/" className={`${btnGold} mt-10`}>Explore the products <ArrowRight className="h-5 w-5" /></a>
          </Reveal>
        </div>

        <div className="relative lg:col-span-7 [perspective:1600px]">
          <motion.div
            initial={{ opacity: 0, y: 60, rotateX: 18 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.4, ease }}
            style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
            className="relative mx-auto w-full max-w-[680px]"
          >
            <div className="relative overflow-hidden rounded-2xl border border-ink/10 bg-onyx-2 shadow-[0_60px_120px_-30px_rgba(58,14,22,.35),0_0_80px_-20px_rgba(217,162,27,.35)]">
              <div className="flex h-9 items-center gap-1.5 border-b border-ink/[0.08] px-4">
                <span className="h-2.5 w-2.5 rounded-full bg-crimson" />
                <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                <span className="h-2.5 w-2.5 rounded-full bg-ink/20" />
                <span className="ml-3 h-5 flex-1 truncate rounded-md bg-ink/[0.05] px-2 text-[11px] leading-5 text-mist">moksfix.com/products</span>
              </div>
              <video src="/reel.mp4" poster="/reel-poster.jpg" autoPlay muted loop playsInline className="block aspect-video w-full object-cover" aria-label="Showreel of MoksFix product screens" />
            </div>

            <motion.div style={{ x: px, y: py, translateZ: 80 }} className="absolute -bottom-16 -left-4 w-[28%] sm:-left-10">
              <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
                <Phone src="/img/pakka-bright-today.jpg" alt="Pakka Site app: today's follow-ups" className="aspect-[9/19.5]" />
              </motion.div>
            </motion.div>
            <motion.div style={{ x: npx, y: npy, translateZ: 60 }} className="absolute -right-3 -top-14 w-[25%] sm:-right-8">
              <motion.div animate={{ y: [0, 14, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
                <Phone src="/img/ride-04-boarding-pass.jpg" alt="Biker’s Club CBE app: QR boarding pass" className="aspect-[9/19.5]" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.9, duration: 0.8, ease }}
              className="absolute -right-2 bottom-10 hidden items-center gap-3 rounded-2xl border border-ink/10 bg-onyx/90 px-4 py-3 shadow-xl backdrop-blur-xl sm:flex sm:-right-12"
              style={{ translateZ: 120 }}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600/15"><MessageCircle className="h-4 w-4 text-emerald-700" /></span>
              <div className="text-xs leading-tight"><p className="font-semibold">WhatsApp sent</p><p className="text-mist">Order received · Bill 1042</p></div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 1.1, duration: 0.8, ease }}
              className="absolute left-[24%] -top-6 hidden items-center gap-3 rounded-2xl border border-ink/10 bg-onyx/90 px-4 py-3 shadow-xl backdrop-blur-xl sm:flex"
              style={{ translateZ: 120 }}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/20 font-display text-sm font-bold text-crimson">₹</span>
              <div className="text-xs leading-tight"><p className="font-semibold">₹880 · 10 pieces</p><p className="text-mist">Bill printed at the counter</p></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
