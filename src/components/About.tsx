import { Cpu, Globe, Smartphone } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { motion } from 'motion/react'
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

function Clock() {
  const { lang } = useLang()
  const [now, setNow] = useState(() => new Date())
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id) }, [])
  return (
    <span className="font-mono text-3xl font-semibold text-white tabular-nums">
      {now.toLocaleTimeString(lang === 'es' ? 'es-ES' : 'en-GB', { timeZone: 'Europe/Madrid', hour: '2-digit', minute: '2-digit', second: '2-digit' })}
    </span>
  )
}

export default function About() {
  const { t } = useLang()
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
              <img src={profile.photo} alt="" className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-500/40" />
              <div>
                <p className="font-display font-semibold text-white">{profile.name}</p>
                <p className="text-sm text-slate-400">{t(ui.about.degree)} · UC3M · 2022 — 2026</p>
              </div>
            </div>
          </div>
        </Cell>

        <Cell className="md:col-span-2" delay={0.05}>
          <p className="font-mono text-xs tracking-widest text-slate-500 uppercase">{t(ui.about.focus)}</p>
          <p className="mt-3 font-display text-2xl leading-tight font-bold text-gradient">{t(ui.about.focusText)}</p>
          <div className="mt-4 flex gap-3 text-brand-2"><Globe size={24} strokeWidth={1.5} aria-hidden /><Smartphone size={24} strokeWidth={1.5} aria-hidden /><Cpu size={24} strokeWidth={1.5} aria-hidden /></div>
        </Cell>

        <Cell className="md:col-span-2" delay={0.1}>
          <p className="font-mono text-xs tracking-widest text-slate-500 uppercase">{t(ui.about.basedIn)}</p>
          <p className="mt-2 flex items-center gap-2 text-lg font-semibold text-white">
            <span className="relative flex h-2.5 w-2.5"><span className="absolute h-full w-full animate-ping rounded-full bg-brand-2 opacity-70" /><span className="relative h-2.5 w-2.5 rounded-full bg-brand-2" /></span>
            {profile.location}
          </p>
          <div className="mt-3"><Clock /></div>
          <p className="text-xs text-slate-500">CET · {t(ui.about.localTime)}</p>
        </Cell>

        <Cell className="md:col-span-3" delay={0.05}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs tracking-widest text-slate-500 uppercase">{t(ui.about.now)}</p>
              <p className="mt-3 font-display text-xl font-semibold text-white">SENSIA</p>
              <p className="mt-1 text-sm text-slate-400">{t(ui.about.nowText)}</p>
            </div>
            <img src="/sources/sensia.png" alt="SENSIA" className="h-14 w-14 rounded-2xl bg-white object-contain p-2" />
          </div>
        </Cell>

        <Cell className="md:col-span-3" delay={0.1}>
          <p className="font-mono text-xs tracking-widest text-slate-500 uppercase">{t(ui.about.languages)}</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-200">
            <li className="flex items-center gap-2"><span className="rounded bg-blue-500/15 px-1.5 py-0.5 font-mono text-[10px] text-blue-200 ring-1 ring-blue-400/30">ES</span>{t(ui.about.spanish)}</li>
            <li className="flex items-center gap-2"><span className="rounded bg-blue-500/15 px-1.5 py-0.5 font-mono text-[10px] text-blue-200 ring-1 ring-blue-400/30">EN</span>{t(ui.about.english)}</li>
          </ul>
        </Cell>

      </div>
    </Section>
  )
}
