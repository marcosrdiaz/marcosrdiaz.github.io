import { motion } from 'motion/react'
import { funFacts, ui } from '../data'
import { useLang } from '../i18n'
import { Icon } from '../icons'
import ReactionGame from './ReactionGame'
import { Reveal, Section } from './ui'

export default function Fun() {
  const { t } = useLang()
  return (
    <Section id="fun" kicker={t(ui.fun.kicker)} title={t(ui.fun.title)}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {funFacts.map((f, i) => (
          <Reveal key={f.title.en} delay={i * 0.08} className="h-full">
            <motion.article
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group glass relative h-full overflow-hidden rounded-3xl p-6"
            >
              <div aria-hidden className="absolute -top-10 -right-10 h-32 w-32 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40" style={{ background: f.accent }} />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: `${f.accent}22`, boxShadow: `inset 0 0 0 1px ${f.accent}55` }}>
                <Icon name={f.icon} size={24} style={{ color: f.accent }} className="transition-transform group-hover:-rotate-6 group-hover:scale-110" />
              </span>
              <h3 className="relative mt-4 font-display text-lg font-semibold text-white">{t(f.title)}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-slate-300">{t(f.text)}</p>
            </motion.article>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-4">
        <ReactionGame />
      </Reveal>
    </Section>
  )
}
