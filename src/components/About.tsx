import { Cpu, Globe, Smartphone } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useInView } from 'motion/react'
import { profile, ui } from '../data'
import { useLang } from '../i18n'
import { Section, spotlightMove } from './ui'

function Cell({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      onMouseMove={spotlightMove}
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`spotlight glass overflow-hidden rounded-3xl p-6 ${className}`}
    >
      {children}
    </motion.div>
  )
}

const TZ = 'Europe/Madrid'

/** Live clock in Madrid time; the zone label (CET/CEST) comes from Intl, so it follows daylight saving. */
function Clock() {
  const { lang, t } = useLang()
  const [now, setNow] = useState(() => new Date())
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id) }, [])
  const locale = lang === 'es' ? 'es-ES' : 'en-GB'
  const zone = new Intl.DateTimeFormat(locale, { timeZone: TZ, timeZoneName: 'short' }).formatToParts(now).find(p => p.type === 'timeZoneName')?.value ?? ''
  return (
    <>
      <span className="font-mono text-3xl font-semibold text-white tabular-nums">
        {now.toLocaleTimeString(locale, { timeZone: TZ, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </span>
      <p className="text-xs text-slate-400">{zone} · {t(ui.about.localTime)}</p>
    </>
  )
}

const BUILD_CMD = 'build({ web, apps, ui })'

/** Types the command once when the card enters the viewport (instant with reduced motion). */
function Terminal() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(BUILD_CMD.length); return }
    let i = 0
    const id = setInterval(() => { i++; setN(i); if (i >= BUILD_CMD.length) clearInterval(id) }, 70)
    return () => clearInterval(id)
  }, [inView])
  return (
    <div ref={ref} className="mt-3 flex items-center gap-2 rounded-lg bg-black/30 px-3 py-2 font-mono text-[12px] ring-1 ring-white/5" aria-label={BUILD_CMD}>
      <span aria-hidden className="text-brand-2">$</span>
      <span aria-hidden className="text-slate-200">{BUILD_CMD.slice(0, n)}</span>
      <span aria-hidden className="h-3.5 w-[2px] bg-brand-2 [animation:blink_1s_steps(1)_infinite]" />
    </div>
  )
}

export default function About() {
  const { t } = useLang()
  const chips = [
    { Icon: Globe, label: ui.about.focusWeb },
    { Icon: Smartphone, label: ui.about.focusApps },
    { Icon: Cpu, label: ui.about.focusSystems },
  ]
  return (
    <Section id="about" kicker={t(ui.about.kicker)} title={t(ui.about.title)}>
      <div className="grid auto-rows-[minmax(150px,auto)] grid-cols-1 gap-4 md:grid-cols-6">
        <Cell className="md:col-span-4 md:row-span-2">
          <div className="flex h-full flex-col justify-between gap-6">
            <div className="space-y-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              <p>{t(ui.about.p1)}</p>
              <p>{t(ui.about.p2)}</p>
            </div>
            <div className="flex items-center gap-4 border-t border-white/5 pt-5">
              <img src="/sources/foto-96.webp" width={96} height={96} loading="lazy" decoding="async" alt="" className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-blue-500/40" />
              <div>
                <p className="font-display font-semibold text-white">{profile.name}</p>
                <p className="text-sm text-slate-400">{t(ui.about.line)}</p>
              </div>
            </div>
          </div>
        </Cell>

        <Cell className="md:col-span-2" delay={0.05}>
          <p className="font-mono text-xs tracking-widest text-slate-400 uppercase">{t(ui.about.focus)}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {chips.map(({ Icon, label }) => (
              <motion.li
                key={label.en}
                whileHover={{ y: -2 }}
                className="group flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1.5 text-sm text-blue-100 ring-1 ring-blue-400/25 transition-colors hover:bg-blue-500/20"
              >
                <Icon size={16} strokeWidth={1.6} aria-hidden className="text-brand-2 transition-transform group-hover:scale-110" />
                {t(label)}
              </motion.li>
            ))}
          </ul>
          <Terminal />
        </Cell>

        <Cell className="md:col-span-2" delay={0.1}>
          <p className="font-mono text-xs tracking-widest text-slate-400 uppercase">{t(ui.about.location)}</p>
          <p className="mt-2 flex items-center gap-2 text-lg font-semibold text-white">
            <span className="relative flex h-2.5 w-2.5 shrink-0"><span className="absolute h-full w-full animate-ping rounded-full bg-brand-2 opacity-70" /><span className="relative h-2.5 w-2.5 rounded-full bg-brand-2" /></span>
            {t(ui.about.locationValue)}
          </p>
          <p className="mt-0.5 text-sm text-slate-400">{t(ui.about.hybrid)}</p>
          <div className="mt-3"><Clock /></div>
          <p className="mt-4 flex items-start gap-2 border-t border-white/5 pt-3 text-sm text-slate-300">
            <span aria-hidden className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
            {t(ui.about.available)}
          </p>
        </Cell>

        <Cell className="md:col-span-3" delay={0.05}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs tracking-widest text-slate-400 uppercase">{t(ui.about.now)}</p>
              <p className="mt-3 font-display text-xl font-semibold text-white">Sensia</p>
              <p className="mt-1 text-sm text-slate-400">{t(ui.about.nowText)}</p>
            </div>
            <img src="/sources/sensia.webp" width={224} height={224} loading="lazy" decoding="async" alt="Sensia" className="h-14 w-14 rounded-2xl bg-white object-contain p-2" />
          </div>
        </Cell>

        <Cell className="md:col-span-3" delay={0.1}>
          <p className="font-mono text-xs tracking-widest text-slate-400 uppercase">{t(ui.about.languages)}</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-200">
            <li className="flex items-center gap-2"><span className="rounded bg-blue-500/15 px-1.5 py-0.5 font-mono text-[10px] text-blue-200 ring-1 ring-blue-400/30">ES</span>{t(ui.about.spanish)}</li>
            <li className="flex items-center gap-2"><span className="rounded bg-blue-500/15 px-1.5 py-0.5 font-mono text-[10px] text-blue-200 ring-1 ring-blue-400/30">EN</span>{t(ui.about.english)}</li>
          </ul>
        </Cell>
      </div>
    </Section>
  )
}
