import { ArrowRight, Flame, Lock, Trophy, Users } from 'lucide-react'
import { lazy, Suspense, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react'
import { profile, projects, ui, type Project, type ProjectImage } from '../data'
import { useLang } from '../i18n'
import { Icon } from '../icons'
import { Section, Tag } from './ui'

// The detail dialog is only fetched the first time a card is opened
const ProjectModal = lazy(() => import('./ProjectModal'))

/** Mini animated "stats" visual: placeholder for a feature card until it has real screenshots (see `images` in data.ts). */
function PhoneMock() {
  const bars = [40, 65, 52, 80, 70, 95, 88]
  return (
    <div aria-hidden className="relative mx-auto w-36 shrink-0 rounded-[2rem] border border-white/15 bg-ink-2 p-3 pb-4 shadow-2xl shadow-blue-500/20">
      <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-white/15" />
      <p className="font-mono text-[9px] text-slate-400">PROGRESS</p>
      <p className="font-display text-lg font-bold text-white">+18%</p>
      <div className="mt-3 flex h-24 items-end gap-1.5">
        {bars.map((b, i) => (
          <motion.span
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${b}%` }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.07, type: 'spring', stiffness: 120, damping: 14 }}
            className="flex-1 rounded-t bg-gradient-to-t from-brand to-brand-2"
          />
        ))}
      </div>
      <div className="mt-3 space-y-1.5">
        {([[Flame, '7'], [Trophy, '12'], [Users, '5']] as const).map(([I, n]) => (
          <div key={n} className="flex items-center justify-between rounded-lg bg-white/5 px-2 py-1 text-[10px] text-slate-300">
            <I size={12} strokeWidth={1.6} aria-hidden /><span className="font-mono">{n}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Shot({ img, className = '' }: { img: ProjectImage; className?: string }) {
  const { t } = useLang()
  return (
    <img
      src={img.src}
      width={img.width}
      height={img.height}
      alt={t(img.alt)}
      loading="lazy"
      decoding="async"
      className={`h-auto w-full rounded-xl border border-white/10 ${className}`}
    />
  )
}

function ProjectCard({ p, index, span, onOpen }: { p: Project; index: number; span: string; onOpen: (el: HTMLElement) => void }) {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const glow = useMotionTemplate`radial-gradient(500px circle at ${mx}% ${my}%, ${p.accent}33, transparent 45%)`

  const move = (e: MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * 10)
    rx.set((0.5 - py) * 10)
    mx.set(px * 100); my.set(py * 100)
  }
  const leave = () => { rx.set(0); ry.set(0) }
  const cover = p.images?.[0]
  const visual = cover ? <Shot img={cover} className="shadow-2xl shadow-black/40" /> : <PhoneMock />

  const iconBox = (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" style={{ background: `${p.accent}22`, boxShadow: `inset 0 0 0 1px ${p.accent}55` }}>
      <Icon name={p.icon} size={24} style={{ color: p.accent }} />
    </span>
  )
  const privateBadge = p.private && (
    <span className="flex shrink-0 items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-slate-300 ring-1 ring-white/10"><Lock size={12} aria-hidden /> {t(ui.projects.private)}</span>
  )
  const highlights = p.highlights && (
    <ul className="space-y-1.5">
      {p.highlights.map((h, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-slate-300"><span aria-hidden className="text-brand-2">▹</span>{t(h)}</li>
      ))}
    </ul>
  )
  const tags = <div className="flex flex-wrap gap-1.5">{p.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}</div>
  const more = (
    <p className="flex items-center gap-1.5 text-sm font-medium text-blue-300 transition-colors group-hover:text-white">
      {t(ui.projects.details)} <ArrowRight size={14} aria-hidden className="transition-transform group-hover:translate-x-1" />
    </p>
  )

  let body: ReactNode
  if (p.layout === 'feature') {
    // text 3/4 + visual top-right 1/4; highlights, tags and "details" run full width underneath.
    // On mobile the visual goes last (order-last), as before.
    body = (
      <div className="grid gap-x-6 gap-y-5 lg:grid-cols-4">
        <div className="flex flex-col lg:col-span-3 lg:row-start-1">
          <div className="flex items-start justify-between gap-3">{iconBox}{privateBadge}</div>
          <h3 className="mt-5 font-display text-2xl font-semibold text-white sm:text-3xl">{p.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">{t(p.desc)}</p>
          {/* the phone placeholder is tall: the highlights fill the text column beside it instead of leaving a gap */}
          {!cover && <div className="mt-4">{highlights}</div>}
        </div>
        <div className="order-last mx-auto w-full max-w-sm lg:order-none lg:col-start-4 lg:row-start-1 lg:max-w-none lg:self-start">{visual}</div>
        <div className="space-y-5 lg:col-span-4 lg:row-start-2">
          {cover && highlights}
          {tags}
          {more}
        </div>
      </div>
    )
  } else if (p.layout === 'strip') {
    // compact full-width row: it only takes the height of its content
    body = (
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-6">
        <div className="flex items-start justify-between gap-3 lg:block">{iconBox}<span className="lg:hidden">{privateBadge}</span></div>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="font-display text-xl font-semibold text-white">{p.title}</h3>
            <span className="hidden lg:block">{privateBadge}</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">{t(p.desc)}</p>
          <div className="mt-3">{more}</div>
        </div>
        <div className="lg:w-72 lg:shrink-0">{tags}</div>
      </div>
    )
  } else {
    body = (
      <div className="flex h-full flex-col gap-6">
        {cover && <Shot img={cover} className="aspect-[16/10] object-cover object-top" />}
        <div className="flex flex-1 flex-col">
          <div className="flex items-start justify-between gap-3">{iconBox}{privateBadge}</div>
          <h3 className="mt-5 font-display text-xl font-semibold text-white">{p.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{t(p.desc)}</p>
          <div className="mt-5">{tags}</div>
          <div className="mt-5">{more}</div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`[perspective:1200px] ${span}`}
    >
      <motion.div
        ref={ref}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-label={`${p.title}: ${t(ui.projects.details)}`}
        onClick={e => onOpen(e.currentTarget)}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(e.currentTarget) } }}
        onMouseMove={move}
        onMouseLeave={leave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="group glass relative h-full cursor-pointer overflow-hidden rounded-3xl p-6 transition-colors hover:border-blue-400/30"
      >
        <motion.div style={{ background: glow }} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative h-full" style={{ transform: 'translateZ(30px)' }}>{body}</div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const { t } = useLang()
  const [open, setOpen] = useState<Project | null>(null)
  const opener = useRef<HTMLElement | null>(null)
  const close = () => { setOpen(null); opener.current?.focus() }

  return (
    <Section id="projects" kicker={t(ui.projects.kicker)} title={t(ui.projects.title)}>
      {/* feature and strip cards are full width; the regular ones share a row in thirds (similar heights) */}
      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-6">
        {projects.map((p, i) => {
          const span = p.layout === 'card' ? 'md:col-span-2 md:h-full' : 'md:col-span-6'
          return <ProjectCard key={p.id} p={p} index={i} span={span} onOpen={el => { opener.current = el; setOpen(p) }} />
        })}
      </div>
      <div className="mt-10 text-center">
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-mono text-sm text-slate-400 transition hover:text-white">
          {t(ui.projects.more)} <ArrowRight size={14} aria-hidden /> github.com/{profile.githubUser}
        </a>
      </div>
      <Suspense fallback={null}>
        <AnimatePresence>{open && <ProjectModal key={open.id} p={open} onClose={close} />}</AnimatePresence>
      </Suspense>
    </Section>
  )
}
