import type { ComponentType } from 'react'
import { Briefcase, Copy, FileText, FolderGit2, Languages, Layers, Mail, Search, Sparkles, Timer, User, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { profile, ui } from '../data'
import { useLang } from '../i18n'
import { GithubIcon, LinkedinIcon } from '../icons'
import { useCopyEmail } from './Contact'
import { sections } from './Navbar'

type Group = keyof typeof ui.palette.groups
type Cmd = {
  id: string; group: Group; label: string; hint?: string
  /** Alt + key, active while the palette is open */
  key?: string
  icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>
  run: () => void
}
const groupOrder: Group[] = ['nav', 'actions', 'links']

/** Ctrl/Cmd+K palette. The global shortcut lives in App so this chunk can be lazy-loaded. */
export default function CommandPalette({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const { t, toggle } = useLang()
  const copy = useCopyEmail()
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => { if (open) { setQ(''); setSel(0); setTimeout(() => inputRef.current?.focus(), 30) } }, [open])

  const cmds = useMemo<Cmd[]>(() => {
    const go = (id: string) => () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    const icons: Record<string, Cmd['icon']> = { about: User, experience: Briefcase, projects: FolderGit2, skills: Layers, fun: Sparkles, contact: Mail }
    return [
      ...sections.map((id, i): Cmd => ({ id, group: 'nav', label: `${t(ui.palette.goTo)} ${t(ui.nav[id])}`, key: String(i + 1), icon: icons[id], run: go(id) })),
      { id: 'copy', group: 'actions', label: t(ui.contact.copy), hint: profile.email, key: 'C', icon: Copy, run: copy },
      { id: 'cv', group: 'actions', label: t(ui.hero.ctaCv), hint: 'PDF', key: 'D', icon: FileText, run: () => { const a = document.createElement('a'); a.href = profile.cv; a.download = ''; a.click() } },
      { id: 'lang', group: 'actions', label: t(ui.palette.lang), hint: 'ES / EN', key: 'L', icon: Languages, run: toggle },
      { id: 'race', group: 'actions', label: t(ui.palette.race), key: 'R', icon: Timer, run: () => window.dispatchEvent(new Event('start-race')) },
      { id: 'gh', group: 'links', label: 'GitHub', hint: profile.githubUser, key: 'G', icon: GithubIcon, run: () => window.open(profile.github, '_blank', 'noopener') },
      { id: 'li', group: 'links', label: 'LinkedIn', hint: 'marcos-rodrigo-diaz', key: 'I', icon: LinkedinIcon, run: () => window.open(profile.linkedin, '_blank', 'noopener') },
    ]
  }, [t, toggle, copy])

  // flat list in display order (grouped), so arrow keys follow what is on screen
  const filtered = groupOrder.flatMap(g => cmds.filter(c => c.group === g && (c.label + ' ' + (c.hint ?? '')).toLowerCase().includes(q.toLowerCase())))

  const exec = (c?: Cmd) => { if (!c) return; setOpen(false); setTimeout(c.run, 80) }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); return }
      if (!e.altKey || e.ctrlKey || e.metaKey) return
      const k = e.code.replace(/^(Key|Digit)/, '')
      const c = cmds.find(x => x.key === k)
      if (c) { e.preventDefault(); exec(c) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, cmds])

  useEffect(() => { listRef.current?.querySelector('[data-sel="true"]')?.scrollIntoView({ block: 'nearest' }) }, [sel])

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[150] flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm" onClick={() => setOpen(false)}>
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            onClick={e => e.stopPropagation()}
            className="glass w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl shadow-blue-900/40"
            role="dialog"
            aria-modal="true"
            aria-label={t(ui.palette.placeholder)}
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4">
              <Search size={16} className="text-slate-400" aria-hidden />
              <input
                ref={inputRef}
                value={q}
                onChange={e => { setQ(e.target.value); setSel(0) }}
                onKeyDown={e => {
                  if (e.key === 'ArrowDown') { e.preventDefault(); setSel(s => Math.min(s + 1, filtered.length - 1)) }
                  if (e.key === 'ArrowUp') { e.preventDefault(); setSel(s => Math.max(s - 1, 0)) }
                  if (e.key === 'Enter') exec(filtered[sel])
                }}
                placeholder={t(ui.palette.placeholder)}
                aria-label={t(ui.palette.placeholder)}
                className="h-14 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-400"
              />
              <kbd className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-slate-400">ESC</kbd>
              <button
                onClick={() => setOpen(false)}
                aria-label={t(ui.palette.close)}
                title={t(ui.palette.close)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                <X size={16} aria-hidden />
              </button>
            </div>
            <div ref={listRef} className="max-h-[60vh] overflow-y-auto p-2">
              {filtered.length === 0 && <p className="px-3 py-6 text-center text-sm text-slate-400">{t(ui.palette.empty)}</p>}
              {groupOrder.map(g => {
                const items = filtered.filter(c => c.group === g)
                if (!items.length) return null
                return (
                  <div key={g} role="group" aria-label={t(ui.palette.groups[g])}>
                    <p className="px-3 pt-3 pb-1 font-mono text-[10px] tracking-widest text-slate-400 uppercase">{t(ui.palette.groups[g])}</p>
                    <ul>
                      {items.map(c => {
                        const i = filtered.indexOf(c)
                        return (
                          <li key={c.id}>
                            <button
                              data-sel={i === sel}
                              onMouseEnter={() => setSel(i)}
                              onClick={() => exec(c)}
                              className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm ${i === sel ? 'text-white' : 'text-slate-300'}`}
                            >
                              {i === sel && <motion.span layoutId="cmd-sel" className="absolute inset-0 rounded-xl bg-blue-500/15 ring-1 ring-blue-400/25" transition={{ type: 'spring', stiffness: 500, damping: 35 }} />}
                              <c.icon size={16} strokeWidth={1.6} className="relative shrink-0 text-brand-2" />
                              <span className="relative flex-1">{c.label}</span>
                              {c.hint && <span className="relative hidden truncate font-mono text-[11px] text-slate-400 sm:block">{c.hint}</span>}
                              {c.key && (
                                <span className="relative hidden shrink-0 items-center gap-1 sm:flex" aria-hidden>
                                  <kbd className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-slate-300 ring-1 ring-white/10">Alt</kbd>
                                  <kbd className="min-w-5 rounded bg-white/5 px-1.5 py-0.5 text-center font-mono text-[10px] text-slate-300 ring-1 ring-white/10">{c.key}</kbd>
                                </span>
                              )}
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
