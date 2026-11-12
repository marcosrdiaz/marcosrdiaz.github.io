import { Award, Briefcase, GraduationCap } from 'lucide-react'
import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { experience, ui } from '../data'
import { useLang } from '../i18n'
import { Section, Tag, spotlightMove } from './ui'

const icons = { work: Briefcase, edu: GraduationCap, award: Award }

export default function Experience() {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 100, damping: 25 })

  return (
    <Section id="experience" kicker={t(ui.experience.kicker)} title={t(ui.experience.title)}>
      <div ref={ref} className="relative">
        {/* track + animated fill drawn as you scroll */}
        <div className="absolute top-0 bottom-0 left-5 w-px bg-white/10 md:left-1/2" />
        <motion.div style={{ scaleY: fill }} className="absolute top-0 bottom-0 left-5 w-px origin-top bg-gradient-to-b from-brand-2 via-brand to-brand-3 shadow-[0_0_12px_#3b82f6] md:left-1/2" />

        <ol className="space-y-10">
          {experience.map((e, i) => {
            const left = i % 2 === 0
            return (
              <li key={i} className="relative md:grid md:grid-cols-2 md:gap-12">
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-40% 0px -40% 0px' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  className="absolute top-5 left-5 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-blue-400/40 bg-ink-2 text-lg md:left-1/2"
                >
                  {(() => { const K = icons[e.kind]; return <K size={18} strokeWidth={1.6} className="text-blue-200" aria-hidden /> })()}
                  {e.current && <span className="absolute inset-0 animate-ping rounded-full border border-brand-2/60" />}
                </motion.span>

                <motion.div
                  initial={{ opacity: 0, x: left ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  onMouseMove={spotlightMove}
                  className={`spotlight glass ml-14 rounded-3xl p-6 md:ml-0 ${left ? 'md:col-start-1 md:mr-6' : 'md:col-start-2 md:ml-6'}`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs text-brand-2">{t(e.period)}</span>
                    {e.current && (
                      <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300 ring-1 ring-emerald-400/30">
                        {t(ui.experience.present)}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 font-display text-xl font-semibold text-white">{t(e.role)}</h3>
                  <p className="text-sm font-medium text-blue-300">{t(e.org)}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{t(e.desc)}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">{e.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}</div>
                </motion.div>
              </li>
            )
          })}
        </ol>
      </div>
    </Section>
  )
}
