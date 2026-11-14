import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { ui } from '../data'
import { useLang } from '../i18n'

export const sections = ['about', 'experience', 'projects', 'skills', 'fun', 'contact'] as const

export default function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const { t, lang, toggle } = useLang()
  const [active, setActive] = useState<string>('')
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el) })
    const top = document.getElementById('top'); if (top) io.observe(top)
    return () => io.disconnect()
  }, [])

  const isMac = typeof navigator !== 'undefined' && /mac/i.test(navigator.platform)

  return (
    <>
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-brand via-brand-2 to-brand-3" />
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-4 z-40 flex justify-center px-4"
      >
        <nav className="glass flex w-full max-w-3xl items-center gap-1 rounded-full p-1.5 shadow-xl shadow-black/30">
          <a href="#top" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-3 font-display text-sm font-bold text-white">
            MR
          </a>
          <div className="hidden flex-1 items-center justify-center md:flex">
            {sections.map(id => (
              <a key={id} href={`#${id}`} className="relative rounded-full px-3 py-1.5 text-sm text-slate-300 transition-colors hover:text-white">
                {active === id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-blue-500/15 ring-1 ring-blue-400/30" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                )}
                <span className="relative">{t(ui.nav[id])}</span>
              </a>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-1 md:ml-0">
            <button
              onClick={onOpenPalette}
              className="hidden items-center gap-1 rounded-full px-3 py-1.5 font-mono text-xs text-slate-400 ring-1 ring-white/10 transition hover:text-white hover:ring-blue-400/40 sm:flex"
              aria-label="Command palette"
            >
              {isMac ? '⌘' : 'Ctrl'} K
            </button>
            <button
              onClick={toggle}
              className="relative flex h-9 items-center rounded-full px-1 font-mono text-xs ring-1 ring-white/10"
              aria-label="Change language"
            >
              {(['es', 'en'] as const).map(l => (
                <span key={l} className={`relative z-10 w-8 text-center uppercase transition-colors ${lang === l ? 'text-white' : 'text-slate-400'}`}>
                  {lang === l && <motion.span layoutId="lang-pill" className="absolute inset-0 -z-10 rounded-full bg-brand" transition={{ type: 'spring', stiffness: 500, damping: 35 }} />}
                  {l}
                </span>
              ))}
            </button>
            <button onClick={() => setOpen(o => !o)} className="flex h-9 w-9 items-center justify-center rounded-full text-white md:hidden" aria-label="Menu" aria-expanded={open}>
              <div className="relative h-3 w-4">
                <motion.span animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }} className="absolute top-0 left-0 h-0.5 w-4 rounded bg-current" />
                <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }} className="absolute top-[5px] left-0 h-0.5 w-4 rounded bg-current" />
                <motion.span animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }} className="absolute top-[10px] left-0 h-0.5 w-4 rounded bg-current" />
              </div>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            className="glass fixed inset-x-4 top-20 z-40 rounded-3xl p-3 md:hidden"
          >
            {sections.map((id, i) => (
              <motion.a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className={`block rounded-2xl px-4 py-3 text-base ${active === id ? 'bg-blue-500/15 text-white' : 'text-slate-300'}`}
              >
                {t(ui.nav[id])}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
