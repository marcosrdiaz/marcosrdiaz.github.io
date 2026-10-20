import { useRef, type MouseEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

/** Updates --mx/--my CSS vars so `.spotlight` cards light up under the cursor. */
export function spotlightMove(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export function Section({ id, kicker, title, children, className = '' }: {
  id: string; kicker: string; title?: string; children: ReactNode; className?: string
}) {
  return (
    <section id={id} className={`relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12"
      >
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-brand-2">
          <span className="text-brand">//</span> {kicker}
        </p>
        {title && <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">{title}</h2>}
      </motion.div>
      {children}
    </section>
  )
}

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Link-button that is pulled towards the cursor. */
export function Magnetic({ children, className = '', href, download, onClick, external }: {
  children: ReactNode; className?: string; href?: string; download?: boolean; onClick?: () => void; external?: boolean
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 })
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 })

  const move = (e: MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.3)
    y.set((e.clientY - r.top - r.height / 2) * 0.3)
  }
  const reset = () => { x.set(0); y.set(0) }

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download || undefined}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onClick={onClick}
      onMouseMove={move}
      onMouseLeave={reset}
      style={{ x, y }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex cursor-pointer select-none items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${className}`}
    >
      {children}
    </motion.a>
  )
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-2.5 py-1 font-mono text-[11px] text-blue-200">
      {children}
    </span>
  )
}
