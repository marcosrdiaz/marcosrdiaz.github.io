import { useState } from 'react'
import { funFacts, ui } from '../data'
import { useLang } from '../i18n'
import ReactionGame from './ReactionGame'
import { Reveal, Section } from './ui'

function FlipCard({ icon, front, back }: { icon: string; front: string; back: string }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <button onClick={() => setFlipped(f => !f)} className={`flip h-48 w-full text-left ${flipped ? 'flipped' : ''}`} aria-pressed={flipped}>
      <div className="flip-inner relative h-full w-full">
        <div className="flip-face glass absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-3xl">
          <span className="text-5xl">{icon}</span>
          <span className="font-display text-lg font-semibold text-white">{front}</span>
        </div>
        <div className="flip-face flip-back absolute inset-0 flex items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-center text-sm leading-relaxed text-white">
          {back}
        </div>
      </div>
    </button>
  )
}

export default function Fun() {
  const { t } = useLang()
  return (
    <Section id="fun" kicker={t(ui.fun.kicker)} title={t(ui.fun.title)}>
      <p className="-mt-8 mb-8 font-mono text-xs text-slate-500">↻ {t(ui.fun.flipHint)}</p>
      <div className="grid gap-4 sm:grid-cols-3">
        {funFacts.map((f, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <FlipCard icon={f.icon} front={t(f.front)} back={t(f.back)} />
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-4">
        <ReactionGame />
      </Reveal>
    </Section>
  )
}
