import { ArrowRight, ArrowUpRight, Flame, Lock, Trophy, Users, X } from 'lucide-react'
import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react'
import { profile, projects, ui, type Project, type ProjectImage } from '../data'
import { useLang } from '../i18n'
import { GithubIcon, Icon } from '../icons'
import { Section, Tag } from './ui'

/** Mini animated "stats" visual: placeholder for the featured app card until real screenshots exist. */
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

function Shot({ img, className = '' }: { img: ProjectImage; className?: string }) {
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
        className="group glass relative flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl p-6 transition-colors hover:border-blue-400/30"
      >
        <motion.div style={{ background: glow }} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className={`relative flex h-full gap-6 ${p.featured ? 'flex-col lg:flex-row lg:items-center' : 'flex-col'}`} style={{ transform: 'translateZ(30px)' }}>
          {!p.featured && cover && <Shot img={cover} className="aspect-[16/10] object-cover object-top" />}
          <div className="flex flex-1 flex-col">
            <div className="flex items-start justify-between gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: `${p.accent}22`, boxShadow: `inset 0 0 0 1px ${p.accent}55` }}>
                <Icon name={p.icon} size={24} style={{ color: p.accent }} />
              </span>
              {p.private && (
                <span className="flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-slate-300 ring-1 ring-white/10"><Lock size={12} aria-hidden /> {t(ui.projects.private)}</span>
              )}
            </div>
            <h3 className={`mt-5 font-display font-semibold text-white ${p.featured ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>{p.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{t(p.desc)}</p>
            {p.highlights && (
              <ul className="mt-4 space-y-1.5">
                {p.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300"><span aria-hidden className="text-brand-2">▹</span>{t(h)}</li>
                ))}
              </ul>
            )}
            <div className="mt-5 flex flex-wrap gap-1.5">{p.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}</div>
            <p className="mt-5 flex items-center gap-1.5 text-sm font-medium text-blue-300 transition-colors group-hover:text-white">
              {t(ui.projects.details)} <ArrowRight size={14} aria-hidden className="transition-transform group-hover:translate-x-1" />
            </p>
          </div>
          {p.featured && (cover ? <Shot img={cover} className="shadow-2xl shadow-black/40 lg:w-[48%] lg:shrink-0" /> : <PhoneMock />)}
        </div>
      </motion.div>
    </motion.div>
  )
}

/** Detail dialog: problem, role, decisions, stack, gallery and links. Esc / backdrop close it and focus returns to the card. */
function ProjectModal({ p, onClose }: { p: Project; onClose: () => void }) {
  const { t } = useLang()
  const panel = useRef<HTMLDivElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeBtn.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.stopPropagation(); onClose() }
      if (e.key !== 'Tab' || !panel.current) return
      // keep focus inside the dialog
      const items = panel.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      const first = items[0], last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [onClose])

  const h = 'font-mono text-xs tracking-widest text-brand-2 uppercase'
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[140] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
        onClick={e => e.stopPropagation()}
        className="relative max-h-[92svh] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-t-3xl border border-white/10 bg-ink-2 p-6 shadow-2xl shadow-black/60 sm:rounded-3xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" style={{ background: `${p.accent}22`, boxShadow: `inset 0 0 0 1px ${p.accent}55` }}>
              <Icon name={p.icon} size={24} style={{ color: p.accent }} />
            </span>
            <h3 id="project-modal-title" className="font-display text-2xl font-semibold text-white">{p.title}</h3>
          </div>
          <button ref={closeBtn} onClick={onClose} aria-label={t(ui.projects.close)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-300 ring-1 ring-white/15 transition hover:text-white hover:ring-blue-400/40">
            <X size={18} aria-hidden />
          </button>
        </div>

        <p className="mt-5 leading-relaxed text-slate-300">{t(p.desc)}</p>

        <div className="mt-7 space-y-7">
          <section>
            <h4 className={h}>{t(ui.projects.problem)}</h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{t(p.detail.problem)}</p>
          </section>
          {p.detail.role && (
            <section>
              <h4 className={h}>{t(ui.projects.role)}</h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{t(p.detail.role)}</p>
            </section>
          )}
          <section>
            <h4 className={h}>{t(ui.projects.decisions)}</h4>
            <ul className="mt-2 space-y-2">
              {p.detail.decisions.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-slate-300"><span aria-hidden className="text-brand-2">▹</span>{t(d)}</li>
              ))}
            </ul>
          </section>
          <section>
            <h4 className={h}>{t(ui.projects.stack)}</h4>
            <div className="mt-3 flex flex-wrap gap-1.5">{p.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}</div>
          </section>
          {p.images && (
            <section>
              <h4 className={h}>{t(ui.projects.gallery)}</h4>
              <div className="mt-3 space-y-3">{p.images.map(img => <Shot key={img.src} img={img} />)}</div>
            </section>
          )}
        </div>

        <div className="mt-8 border-t border-white/10 pt-5">
          {p.repo ? (
            <a href={p.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500">
              <GithubIcon size={16} /> {t(ui.projects.viewCode)} <ArrowUpRight size={14} aria-hidden />
            </a>
          ) : (
            <p className="flex items-center gap-2 text-sm text-slate-400"><Lock size={14} aria-hidden /> {t(ui.projects.privateRepo)}</p>
          )}
        </div>
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
      <div className="grid grid-cols-1 gap-5 md:grid-cols-6">
        {projects.map((p, i) => {
          // featured cards take 4/6; the next two regular cards fill the row (2/6), the rest share rows in halves
          const regular = projects.slice(0, i).filter(x => !x.featured).length
          const span = p.featured ? 'md:col-span-4' : regular < 2 ? 'md:col-span-2' : 'md:col-span-3'
          return <ProjectCard key={p.id} p={p} index={i} span={span} onOpen={el => { opener.current = el; setOpen(p) }} />
        })}
      </div>
      <div className="mt-10 text-center">
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-mono text-sm text-slate-400 transition hover:text-white">
          {t(ui.projects.more)} <ArrowRight size={14} aria-hidden /> github.com/{profile.githubUser}
        </a>
      </div>
      <AnimatePresence>{open && <ProjectModal key={open.id} p={open} onClose={close} />}</AnimatePresence>
    </Section>
  )
}
