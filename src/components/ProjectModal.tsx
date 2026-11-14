import { ArrowUpRight, Lock, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { ui, type Project } from '../data'
import { useLang } from '../i18n'
import { GithubIcon, Icon } from '../icons'
import { Shot } from './Projects'
import { Tag } from './ui'

/** Detail dialog: problem, role, decisions, stack, gallery and links. Esc / backdrop close it and focus returns to the card. */
export default function ProjectModal({ p, onClose }: { p: Project; onClose: () => void }) {
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
