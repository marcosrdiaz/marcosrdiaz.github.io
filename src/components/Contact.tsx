import { ArrowUpRight, Copy, Download, FileText, Mail, MapPin } from 'lucide-react'
import type { ComponentType, ReactNode } from 'react'
import { motion } from 'motion/react'
import { profile, ui } from '../data'
import { useLang } from '../i18n'
import { GithubIcon, LinkedinIcon } from '../icons'
import { useToast } from '../toast'
import { Section, spotlightMove } from './ui'

export function useCopyEmail() {
  const { t } = useLang()
  const toast = useToast()
  return async () => {
    try { await navigator.clipboard.writeText(profile.email); toast(t(ui.contact.copied)) }
    catch { window.location.href = `mailto:${profile.email}` }
  }
}

type IconType = ComponentType<{ size?: number; className?: string }>

function Card({ href, icon: I, label, handle, external, download, trailing, action }: {
  href: string; icon: IconType; label: string; handle: string; external?: boolean; download?: boolean; trailing: ReactNode; action?: ReactNode
}) {
  return (
    <div onMouseMove={spotlightMove} className="spotlight group glass relative flex min-w-0 items-center gap-4 rounded-2xl p-4 transition-colors hover:border-blue-400/30">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-brand-2 ring-1 ring-blue-400/25">
        <I size={20} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-slate-400">{label}</p>
        {/* the link stretches over the whole card; the copy button sits above it */}
        <a
          href={href}
          download={download || undefined}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className="block truncate font-mono text-sm text-white after:absolute after:inset-0 after:rounded-2xl"
        >
          {handle}
        </a>
      </div>
      {action}
      <span className="text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-white">{trailing}</span>
    </div>
  )
}

export default function Contact() {
  const { t } = useLang()
  const copy = useCopyEmail()
  const linkedinHandle = profile.linkedin.replace(/^https?:\/\/(www\.)?/, '')

  return (
    <Section id="contact" kicker={t(ui.contact.kicker)}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-10"
      >
        <div aria-hidden className="absolute -top-24 left-0 h-64 w-[36rem] rounded-full bg-blue-600/20 blur-3xl" />
        <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div className="min-w-0">
            <h2 className="font-display text-5xl font-bold tracking-tight text-white sm:text-6xl">
              <span className="text-gradient">{t(ui.contact.title)}</span>
            </h2>
            <p className="mt-5 max-w-md text-slate-300">{t(ui.contact.text)}</p>
            <ul className="mt-6 space-y-2.5 text-sm text-slate-200">
              <li className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5 shrink-0"><span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" /><span className="relative h-2.5 w-2.5 rounded-full bg-emerald-400" /></span>
                {t(ui.about.available)}
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <MapPin size={14} aria-hidden className="-ml-0.5 shrink-0 text-brand-2" />
                {t(ui.about.locationValue)} · {t(ui.about.hybrid)}
              </li>
            </ul>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-3">
            <Card
              href={`mailto:${profile.email}`} icon={Mail} label="Email" handle={profile.email}
              trailing={<ArrowUpRight size={16} aria-hidden />}
              action={
                <button onClick={copy} aria-label={t(ui.contact.copy)} title={t(ui.contact.copy)} className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-300 ring-1 ring-white/15 transition hover:bg-brand hover:text-white hover:ring-brand">
                  <Copy size={15} aria-hidden />
                </button>
              }
            />
            <Card href={profile.linkedin} external icon={LinkedinIcon} label="LinkedIn" handle={linkedinHandle} trailing={<ArrowUpRight size={16} aria-hidden />} />
            <Card href={profile.github} external icon={GithubIcon} label="GitHub" handle={`github.com/${profile.githubUser}`} trailing={<ArrowUpRight size={16} aria-hidden />} />
            <Card href={profile.cv} download icon={FileText} label="CV" handle={t(ui.contact.cvHandle)} trailing={<Download size={16} aria-hidden />} />
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
