import { Copy, FileText } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../icons'
import { motion } from 'motion/react'
import { profile, ui } from '../data'
import { useLang } from '../i18n'
import { useToast } from '../toast'
import { Magnetic, Section } from './ui'

export function useCopyEmail() {
  const { t } = useLang()
  const toast = useToast()
  return async () => {
    try { await navigator.clipboard.writeText(profile.email); toast(t(ui.contact.copied)) }
    catch { window.location.href = `mailto:${profile.email}` }
  }
}

export default function Contact() {
  const { t } = useLang()
  const copy = useCopyEmail()

  return (
    <Section id="contact" kicker={t(ui.contact.kicker)}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="glass relative overflow-hidden rounded-[2rem] px-6 py-16 text-center sm:px-12"
      >
        <div className="absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-blue-600/25 blur-3xl" />
        <h2 className="relative font-display text-5xl font-bold tracking-tight text-white sm:text-7xl">
          <span className="text-gradient">{t(ui.contact.title)}</span>
        </h2>
        <p className="relative mx-auto mt-5 max-w-lg text-slate-400">{t(ui.contact.text)}</p>

        <a href={`mailto:${profile.email}`} className="relative mt-8 inline-block font-mono text-base break-all text-white underline decoration-blue-500/50 underline-offset-8 transition hover:decoration-brand-2 sm:text-xl">
          {profile.email}
        </a>

        <div className="relative mt-10 flex flex-wrap justify-center gap-3">
          <Magnetic onClick={copy} className="bg-brand text-white shadow-lg shadow-blue-500/30 hover:bg-blue-500"><Copy size={16} aria-hidden /> {t(ui.contact.copy)}</Magnetic>
          <Magnetic href={profile.linkedin} external className="glass text-white hover:border-blue-400/40"><LinkedinIcon size={16} /> LinkedIn</Magnetic>
          <Magnetic href={profile.github} external className="glass text-white hover:border-blue-400/40"><GithubIcon size={16} /> GitHub</Magnetic>
          <Magnetic href={profile.cv} download className="glass text-white hover:border-blue-400/40"><FileText size={16} aria-hidden /> CV</Magnetic>
        </div>
      </motion.div>
    </Section>
  )
}
