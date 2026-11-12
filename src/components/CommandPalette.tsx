import { Briefcase, Copy, FileText, FolderGit2, GitBranch, Languages, Layers, Contact, Mail, Search, Sparkles, Timer, User, type LucideIcon } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { profile, ui } from '../data'
import { useLang } from '../i18n'
import { useCopyEmail } from './Contact'
import { sections } from './Navbar'

type Cmd = { id: string; label: string; hint: string; icon: LucideIcon; run: () => void }

export default function CommandPalette({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const { t, toggle } = useLang()
  const copy = useCopyEmail()
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen(!open) }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, setOpen])

  useEffect(() => { if (open) { setQ(''); setSel(0); setTimeout(() => inputRef.current?.focus(), 30) } }, [open])

  const cmds = useMemo<Cmd[]>(() => {
    const go = (id: string) => () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    const icons: Record<string, LucideIcon> = { about: User, experience: Briefcase, projects: FolderGit2, skills: Layers, fun: Sparkles, contact: Mail }
    return [
      ...sections.map(id => ({ id, label: `${t(ui.palette.goTo)} ${t(ui.nav[id])}`, hint: '↵', icon: icons[id], run: go(id) })),
      { id: 'copy', label: t(ui.contact.copy), hint: profile.email, icon: Copy, run: copy },
      { id: 'cv', label: t(ui.hero.ctaCv), hint: 'PDF', icon: FileText, run: () => { const a = document.createElement('a'); a.href = profile.cv; a.download = ''; a.click() } },
      { id: 'gh', label: 'GitHub', hint: profile.githubUser, icon: GitBranch, run: () => window.open(profile.github, '_blank', 'noopener') },
      { id: 'li', label: 'LinkedIn', hint: '↗', icon: Contact, run: () => window.open(profile.linkedin, '_blank', 'noopener') },
      { id: 'lang', label: t(ui.palette.lang), hint: 'ES / EN', icon: Languages, run: toggle },
      { id: 'race', label: t(ui.palette.race), hint: 'F1', icon: Timer, run: () => window.dispatchEvent(new Event('start-race')) },
    ]
  }, [t, toggle, copy])

  const filtered = cmds.filter(c => (c.label + ' ' + c.hint).toLowerCase().includes(q.toLowerCase()))

  const exec = (c?: Cmd) => { if (!c) return; setOpen(false); setTimeout(c.run, 80) }

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[150] flex items-start justify-center bg-black/60 px-4 pt-[15vh] backdrop-blur-sm" onClick={() => setOpen(false)}>
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            onClick={e => e.stopPropagation()}
            className="glass w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl shadow-blue-900/40"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4">
              <Search size={16} className="text-slate-500" aria-hidden />
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
                className="h-14 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
              <kbd className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-slate-400">ESC</kbd>
            </div>
            <ul className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && <li className="px-3 py-6 text-center text-sm text-slate-500">{t(ui.palette.empty)}</li>}
              {filtered.map((c, i) => (
                <li key={c.id}>
                  <button
                    onMouseEnter={() => setSel(i)}
                    onClick={() => exec(c)}
                    className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm ${i === sel ? 'text-white' : 'text-slate-300'}`}
                  >
                    {i === sel && <motion.span layoutId="cmd-sel" className="absolute inset-0 rounded-xl bg-blue-500/15 ring-1 ring-blue-400/25" transition={{ type: 'spring', stiffness: 500, damping: 35 }} />}
                    <c.icon size={16} strokeWidth={1.6} className="relative text-brand-2" aria-hidden />
                    <span className="relative flex-1">{c.label}</span>
                    <span className="relative truncate font-mono text-[11px] text-slate-500">{c.hint}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
