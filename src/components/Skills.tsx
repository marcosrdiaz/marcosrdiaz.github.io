import { motion } from 'motion/react'
import { skillGroups, softSkills, ui } from '../data'
import { useLang } from '../i18n'
import { Reveal, Section, spotlightMove } from './ui'

const icon = (id: string) => `https://skillicons.dev/icons?i=${id}`
const all = skillGroups.flatMap(g => g.items)

function Marquee({ items, reverse = false }: { items: [string, string][]; reverse?: boolean }) {
  const loop = [...items, ...items]
  return (
    <div className="marquee marquee-mask overflow-hidden py-2">
      <div className="marquee-track flex w-max gap-4" style={{ ['--dur' as string]: '45s', animationDirection: reverse ? 'reverse' : 'normal' }}>
        {loop.map(([id, name], i) => (
          <div key={i} className="glass flex shrink-0 items-center gap-3 rounded-2xl px-4 py-2.5">
            <img src={icon(id)} alt="" className="h-7 w-7" loading="lazy" />
            <span className="text-sm whitespace-nowrap text-slate-200">{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const { t } = useLang()
  const half = Math.ceil(all.length / 2)
  return (
    <Section id="skills" kicker={t(ui.skills.kicker)} title={t(ui.skills.title)}>
      <div className="-mx-4 mb-14 space-y-3 sm:-mx-6">
        <Marquee items={all.slice(0, half)} />
        <Marquee items={all.slice(half)} reverse />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {skillGroups.map((g, gi) => (
          <Reveal key={gi} delay={gi * 0.08}>
            <div onMouseMove={spotlightMove} className="spotlight glass h-full rounded-3xl p-6">
              <h3 className="font-display text-lg font-semibold text-white">{t(g.title)}</h3>
              <div className="mt-5 grid grid-cols-4 gap-3">
                {g.items.map(([id, name], i) => (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.04, type: 'spring', stiffness: 300, damping: 18 }}
                    whileHover={{ y: -6, rotate: -6, scale: 1.12 }}
                    className="group relative flex justify-center"
                    data-cursor
                  >
                    <img src={icon(id)} alt={name} title={name} className="h-12 w-12 drop-shadow-[0_6px_14px_rgba(59,130,246,0.25)]" loading="lazy" />
                    <span className="pointer-events-none absolute -bottom-7 z-10 rounded-md bg-ink-2 px-2 py-0.5 text-[10px] whitespace-nowrap text-slate-200 opacity-0 ring-1 ring-white/10 transition group-hover:opacity-100">
                      {name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10">
        <h3 className="mb-4 font-display text-lg font-semibold text-white">{t(ui.skills.soft)}</h3>
        <div className="flex flex-wrap gap-2.5">
          {softSkills.map((s, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.06, y: -2 }}
              className="glass cursor-default rounded-full px-4 py-2 text-sm text-slate-200 transition-colors hover:border-blue-400/40"
            >
              {t(s)}
            </motion.span>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
