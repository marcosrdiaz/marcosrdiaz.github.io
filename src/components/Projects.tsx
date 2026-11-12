import { ArrowUpRight, Flame, Lock, Trophy, Users } from 'lucide-react'
import { useRef, type MouseEvent } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react'
import { profile, projects, ui, type Project } from '../data'
import { useLang } from '../i18n'
import { Icon } from '../icons'
import { Section, Tag } from './ui'

/** Mini animated "stats" visual for the featured app card. */
function PhoneMock() {
  const bars = [40, 65, 52, 80, 70, 95, 88]
  return (
    <div className="relative mx-auto w-36 shrink-0 rounded-[2rem] border border-white/15 bg-ink-2 p-3 pb-4 shadow-2xl shadow-blue-500/20">
      <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-white/15" />
      <p className="font-mono text-[9px] text-slate-500">PROGRESS</p>
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

function ProjectCard({ p, index, span }: { p: Project; index: number; span: string }) {
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

  const Wrapper = p.repo ? motion.a : motion.div
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`[perspective:1200px] ${span}`}
    >
      <Wrapper
        ref={ref as never}
        {...(p.repo ? { href: p.repo, target: '_blank', rel: 'noopener noreferrer' } : {})}
        onMouseMove={move}
        onMouseLeave={leave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="group glass relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-colors hover:border-blue-400/30"
      >
        <motion.div style={{ background: glow }} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className={`relative flex h-full gap-6 ${p.featured ? 'flex-col lg:flex-row lg:items-center' : 'flex-col'}`} style={{ transform: 'translateZ(30px)' }}>
          <div className="flex flex-1 flex-col">
            <div className="flex items-start justify-between gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl" style={{ background: `${p.accent}22`, boxShadow: `inset 0 0 0 1px ${p.accent}55` }}>
                <Icon name={p.icon} size={24} style={{ color: p.accent }} />
              </span>
              {p.private ? (
                <span className="flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-slate-400 ring-1 ring-white/10"><Lock size={12} aria-hidden /> {t(ui.projects.private)}</span>
              ) : (
                <span className="flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-slate-300 ring-1 ring-white/10 transition group-hover:bg-brand group-hover:text-white">
                  {t(ui.projects.code)} <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </span>
              )}
            </div>
            <h3 className={`mt-5 font-display font-semibold text-white ${p.featured ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>{p.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{t(p.desc)}</p>
            {p.highlights && (
              <ul className="mt-4 space-y-1.5">
                {p.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-300"><span className="text-brand-2">▹</span>{t(h)}</li>
                ))}
              </ul>
            )}
            <div className="mt-5 flex flex-wrap gap-1.5">{p.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}</div>
          </div>
          {p.featured && (p.image ? (
            <img
              src={p.image.src}
              width={p.image.width}
              height={p.image.height}
              alt={t(p.image.alt)}
              loading="lazy"
              decoding="async"
              className="w-full rounded-xl border border-white/10 shadow-2xl shadow-black/40 lg:w-[48%] lg:shrink-0"
            />
          ) : <PhoneMock />)}
        </div>
      </Wrapper>
    </motion.div>
  )
}

export default function Projects() {
  const { t } = useLang()
  return (
    <Section id="projects" kicker={t(ui.projects.kicker)} title={t(ui.projects.title)}>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-6">
        {projects.map((p, i) => {
          // featured cards take 4/6; the next two regular cards fill the row (2/6), the rest share rows in halves
          const regular = projects.slice(0, i).filter(x => !x.featured).length
          const span = p.featured ? 'md:col-span-4' : regular < 2 ? 'md:col-span-2' : 'md:col-span-3'
          return <ProjectCard key={p.id} p={p} index={i} span={span} />
        })}
      </div>
      <div className="mt-10 text-center">
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-mono text-sm text-slate-400 transition hover:text-white">
          {t(ui.projects.more)} → github.com/{profile.githubUser}
        </a>
      </div>
    </Section>
  )
}
