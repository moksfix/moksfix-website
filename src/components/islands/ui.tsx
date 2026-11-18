import { motion, useMotionTemplate, useMotionValue, useSpring, useInView, animate } from 'framer-motion'
import type { ReactNode, MouseEvent } from 'react'
import { useEffect, useRef, useState } from 'react'

export const ease = [0.16, 1, 0.3, 1] as const

/** Fades and lifts its children into view, once. */
export function Reveal({ children, delay = 0, y = 28, className = '' }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

/** Splits a line into words that rise one after another. */
export function WordsReveal({ text, className = '', delay = 0, gold = false }: { text: string; className?: string; delay?: number; gold?: boolean }) {
  const words = text.split(' ')
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })
  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]" aria-hidden>
          <motion.span
            className={`inline-block ${gold ? 'text-gold-metal' : ''}`}
            initial={{ y: '110%' }}
            animate={inView ? { y: 0 } : { y: '110%' }}
            transition={{ duration: 1, ease, delay: delay + i * 0.07 }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/** A button that leans toward the cursor. */
export function Magnetic({ children, className = '', href, onClick, target }: { children: ReactNode; className?: string; href?: string; onClick?: () => void; target?: string }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 18 })
  const sy = useSpring(y, { stiffness: 260, damping: 18 })
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.25)
    y.set((e.clientY - r.top - r.height / 2) * 0.35)
  }
  const reset = () => { x.set(0); y.set(0) }
  const Comp = href ? motion.a : motion.button
  return (
    <Comp
      href={href}
      target={target}
      rel={target ? 'noopener noreferrer' : undefined}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className={className}
    >
      {children}
    </Comp>
  )
}

export const btnGold =
  'group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 h-14 font-semibold text-ongold shadow-[0_0_0_1px_rgba(232,184,60,.4),0_12px_40px_-12px_rgba(217,162,27,.7)] transition-colors hover:bg-gold-light cursor-pointer'
export const btnGhost =
  'group inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-ink/[0.03] px-7 h-14 font-semibold text-ivory backdrop-blur transition-colors hover:border-ink/30 hover:bg-ink/[0.07] cursor-pointer'

/** Card with a gold spotlight that follows the cursor (21st.dev-style). */
export function SpotlightCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const mx = useMotionValue(-400)
  const my = useMotionValue(-400)
  const bg = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, rgba(217,162,27,0.13), transparent 70%)`
  const border = useMotionTemplate`radial-gradient(260px circle at ${mx}px ${my}px, rgba(217,162,27,0.75), transparent 70%)`
  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set(e.clientX - r.left)
        my.set(e.clientY - r.top)
      }}
      onMouseLeave={() => { mx.set(-400); my.set(-400) }}
      className={`group relative overflow-hidden rounded-3xl border border-ink/[0.08] bg-onyx-2 ${className}`}
    >
      <motion.div className="pointer-events-none absolute inset-0 rounded-3xl" style={{ background: bg }} />
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: border, WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', padding: 1 }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  )
}

/** Counts up when it scrolls into view. */
export function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.8, ease, onUpdate: (n) => setV(Math.round(n)) })
    return () => c.stop()
  }, [inView, to])
  return <span ref={ref}>{v}{suffix}</span>
}

export function SectionTitle({ kicker, title, gold, sub, center = false }: { kicker?: string; title: string; gold?: string; sub?: string; center?: boolean }) {
  return (
    <div className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {kicker && (
        <Reveal>
          <p className={`mb-5 inline-flex items-center gap-2 text-sm font-medium text-accent ${center ? 'justify-center' : ''}`}>
            <span className="h-px w-8 bg-accent/60" /> {kicker}
          </p>
        </Reveal>
      )}
      <h2 className="font-display text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
        <WordsReveal text={title} />
        {gold && <> <WordsReveal text={gold} gold delay={0.15} /></>}
      </h2>
      {sub && (
        <Reveal delay={0.2}>
          <p className={`mt-6 text-lg leading-relaxed text-mist ${center ? 'mx-auto' : ''} max-w-2xl`}>{sub}</p>
        </Reveal>
      )}
    </div>
  )
}

/** Desktop browser window around a website or web-app screenshot. */
export function BrowserFrame({ src, alt, url, className = '' }: { src: string; alt: string; url?: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-ink/15 bg-white shadow-[0_30px_60px_-25px_rgba(58,14,22,.45)] ${className}`}>
      <div className="flex h-7 items-center gap-1.5 border-b border-black/[0.06] bg-[#f4f1ec] px-3">
        <span className="h-2 w-2 rounded-full bg-[#e5675c]" /><span className="h-2 w-2 rounded-full bg-[#e8b93c]" /><span className="h-2 w-2 rounded-full bg-[#5fbf62]" />
        {url && <span className="ml-2 h-4 flex-1 truncate rounded bg-black/[0.05] px-2 text-[9px] leading-4 text-black/50">{url}</span>}
      </div>
      <img src={src} alt={alt} loading="lazy" className="block aspect-[16/10] w-full object-cover object-left-top" />
    </div>
  )
}

/** Phone handset around a mobile-app screen. Without a screen it shows the app's splash. */
export function PhoneFrame({ src, alt, name, className = '' }: { src?: string; alt?: string; name: string; className?: string }) {
  return (
    <div className={`relative aspect-[9/19.5] overflow-hidden rounded-[1.9rem] border-[6px] border-[#1e1215] bg-black shadow-[0_30px_60px_-20px_rgba(20,6,9,.6)] ${className}`}>
      <span className="absolute left-1/2 top-1.5 z-10 h-[5%] w-[34%] -translate-x-1/2 rounded-full bg-black" aria-hidden />
      {src ? (
        <img src={src} alt={alt ?? `${name} app screen`} loading="lazy" className="h-full w-full object-cover object-top" />
      ) : (
        <div className="on-burgundy flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-crimson-light to-crimson p-4 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold font-display text-2xl font-bold text-ongold">{name.charAt(0)}</span>
          <span className="font-display text-sm font-bold leading-tight">{name}</span>
        </div>
      )}
    </div>
  )
}
