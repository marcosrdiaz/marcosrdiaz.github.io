import { ArrowRight, Lock } from 'lucide-react'
import { lazy, Suspense, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react'
import { profile, projects, ui, type Project, type ProjectImage } from '../data'
import { useLang } from '../i18n'
import { Icon } from '../icons'
import { Section, Tag } from './ui'

// The detail dialog is only fetched the first time a card is opened
const ProjectModal = lazy(() => import('./ProjectModal'))

/** Space between the phone frame and its screen, as a fraction of the frame width. */
const BEZEL = 0.025

/**
 * Phone frame around a portrait screenshot. The frame ratio is derived from the image (screen + bezel), so the
 * screenshot is never cropped or stretched. Normal size on mobile; from `lg` it fills the card height (the
 * card padding stays as margin) and its width follows from the ratio.
 */
function PhoneMock({ img }: { img: ProjectImage }) {
  const { t } = useLang()
  const ratio = 1 / ((1 - 2 * BEZEL) * (img.height / img.width) + 2 * BEZEL)
  return (
    <div
      className="relative mx-auto w-36 shrink-0 rounded-[14%/6.5%] border border-white/15 bg-black shadow-2xl shadow-blue-500/20 [container-type:inline-size] lg:absolute lg:inset-y-0 lg:left-1/2 lg:mx-0 lg:w-auto lg:-translate-x-1/2"
      style={{ aspectRatio: String(ratio), padding: `${BEZEL * 100}%` }}
    >
      <img
        src={img.src}
        width={img.width}
        height={img.height}
        alt={t(img.alt)}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full rounded-[12.1%/5.45%]"
      />
      {/* notch / camera pill over the (empty) centre of the status bar */}
      <span aria-hidden className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10" style={{ top: '4.4%', width: '26%', height: '2.1%' }} />
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
  const isPhone = !!cover?.phone

  const iconBox = (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" style={{ background: `${p.accent}22`, boxShadow: `inset 0 0 0 1px ${p.accent}55` }}>
      <Icon name={p.icon} size={24} style={{ color: p.accent }} />
    </span>
  )
  const privateBadge = p.private && (
    <span className="flex shrink-0 items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-slate-300 ring-1 ring-white/10"><Lock size={12} aria-hidden /> {t(ui.projects.private)}</span>
  )
  /** icon and title on the same row, vertically centred; the Private badge stays at the right end */
  const headerRow = (titleClass: string) => (
    <div className="flex items-center gap-4">
      {iconBox}
      <h3 className={`min-w-0 flex-1 font-display leading-tight font-semibold break-words text-white ${titleClass}`}>{p.title}</h3>
      {privateBadge}
    </div>
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
    // All the text lives in the left column. The visual sits top-right: a screenshot takes ~5/12 of the card
    // (top-aligned), the phone placeholder 3/12 and stretches to the full card height. On mobile it goes last.
    body = (
      <div className={`grid gap-x-8 gap-y-6 ${isPhone ? 'lg:grid-cols-12' : cover ? 'lg:grid-cols-[minmax(0,1fr)_42%]' : ''}`}>
        <div className={`flex min-w-0 flex-col ${isPhone ? 'lg:col-span-9' : ''}`}>
          {headerRow('text-2xl sm:text-3xl')}
          <p className="mt-4 text-sm leading-relaxed text-slate-400">{t(p.desc)}</p>
          {highlights && <div className="mt-5">{highlights}</div>}
          <div className="mt-5">{tags}</div>
          <div className="mt-5">{more}</div>
        </div>
        {cover && (isPhone ? (
          <div className="relative order-last flex justify-center lg:order-none lg:col-span-3 lg:block lg:min-h-80"><PhoneMock img={cover} /></div>
        ) : (
          <div className="order-last mx-auto w-full max-w-sm lg:order-none lg:max-w-none lg:self-start"><Shot img={cover} className="shadow-2xl shadow-black/40" /></div>
        ))}
      </div>
    )
  } else if (p.layout === 'strip') {
    // compact full-width row: it only takes the height of its content. Header spans the card (badge at the far right).
    body = (
      <div className="flex flex-col gap-4">
        {headerRow('text-xl')}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-8">
          <div className="min-w-0 flex-1">
            <p className="text-sm leading-relaxed text-slate-400">{t(p.desc)}</p>
            <div className="mt-3">{more}</div>
          </div>
          <div className="lg:w-80 lg:shrink-0">{tags}</div>
        </div>
      </div>
    )
  } else {
    body = (
      <div className="flex h-full flex-col gap-6">
        {cover && <Shot img={cover} className="aspect-[16/10] object-cover object-top" />}
        <div className="flex flex-1 flex-col">
          {headerRow('text-xl')}
          <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-400">{t(p.desc)}</p>
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
