import { Flag } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { animate } from 'animejs'
import { ui } from '../data'
import { useLang } from '../i18n'

type State = 'idle' | 'lights' | 'go' | 'result' | 'jump'

function loadBest(): number | null {
  try { const v = Number(localStorage.getItem('f1-best')); return v > 0 ? v : null } catch { return null }
}

/** F1-style start lights: 5 reds come on one by one, go out after a random delay, click as fast as possible. */
export default function ReactionGame() {
  const { t } = useLang()
  const [state, setState] = useState<State>('idle')
  const [lit, setLit] = useState(0)
  const [time, setTime] = useState<number | null>(null)
  const [best, setBest] = useState<number | null>(loadBest)
  const timers = useRef<number[]>([])
  const goAt = useRef(0)
  const rootRef = useRef<HTMLDivElement>(null)

  const clear = () => { timers.current.forEach(clearTimeout); timers.current = [] }

  const start = useCallback(() => {
    clear()
    setTime(null); setLit(0); setState('lights')
    for (let i = 1; i <= 5; i++) timers.current.push(window.setTimeout(() => setLit(i), i * 800))
    const hold = 5 * 800 + 400 + Math.random() * 2600
    timers.current.push(window.setTimeout(() => { setLit(0); setState('go'); goAt.current = performance.now() }, hold))
  }, [])

  // Lets the command palette / Konami code kick off a race
  useEffect(() => {
    const handler = () => { rootRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); setTimeout(start, 600) }
    window.addEventListener('start-race', handler)
    return () => { window.removeEventListener('start-race', handler); clear() }
  }, [start])

  // Pop the light that just turned on
  useEffect(() => {
    if (lit > 0) animate(`.f1-light-${lit}`, { scale: [0.6, 1], duration: 400, ease: 'outBack' })
  }, [lit])

  const press = () => {
    if (state === 'idle' || state === 'result' || state === 'jump') return start()
    if (state === 'lights') { clear(); setLit(0); setState('jump'); return }
    if (state === 'go') {
      const ms = Math.round(performance.now() - goAt.current)
      setTime(ms); setState('result')
      if (!best || ms < best) { setBest(ms); try { localStorage.setItem('f1-best', String(ms)) } catch { /* ignore */ } }
      animate('.f1-time', { scale: [1.4, 1], opacity: [0, 1], duration: 700, ease: 'outElastic(1, .5)' })
    }
  }

  const verdict = time == null ? '' : time < 220 ? t(ui.game.verdictPro) : time < 320 ? t(ui.game.verdictGood) : t(ui.game.verdictOk)

  return (
    <div ref={rootRef} id="race" className="glass relative overflow-hidden rounded-3xl p-6">
      <div className="checkered absolute inset-x-0 top-0 h-2 opacity-60" />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-white"><Flag size={20} className="text-brand-2" aria-hidden /> {t(ui.game.title)}</h3>
        {best && <span className="font-mono text-xs text-slate-400">{t(ui.game.best)}: <span className="text-brand-2">{best} ms</span></span>}
      </div>
      <p className="mt-1 text-sm text-slate-400">{t(ui.game.intro)}</p>

      <button
        onPointerDown={press}
        className={`mt-5 flex w-full flex-col items-center justify-center gap-5 rounded-2xl border p-6 transition-colors select-none ${state === 'go' ? 'border-emerald-400/50 bg-emerald-500/10' : 'border-white/10 bg-black/30'}`}
        aria-live="polite"
      >
        <div className="flex gap-2 sm:gap-3">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex flex-col gap-1.5 rounded-xl bg-neutral-900 p-1.5 ring-1 ring-white/10 sm:p-2">
              {[0, 1].map(r => (
                <span
                  key={r}
                  className={`f1-light-${i} block h-6 w-6 rounded-full transition-colors duration-100 sm:h-9 sm:w-9 ${lit >= i ? 'bg-red-500 shadow-[0_0_18px_#ef4444]' : 'bg-neutral-800'}`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="min-h-[3.5rem] text-center">
          {state === 'idle' && <span className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white">{t(ui.game.start)}</span>}
          {state === 'lights' && <span className="font-mono text-slate-400">{t(ui.game.wait)}</span>}
          {state === 'go' && <span className="font-display text-3xl font-bold text-emerald-300">{t(ui.game.go)}</span>}
          {state === 'jump' && (
            <div><p className="font-display text-xl font-bold text-red-400">{t(ui.game.jump)}</p><p className="mt-1 text-xs text-slate-500">{t(ui.game.again)}</p></div>
          )}
          {state === 'result' && time != null && (
            <div>
              <p className="f1-time font-mono text-3xl font-bold text-white">{time} ms</p>
              <p className="text-sm text-slate-300">{verdict}</p>
              <p className="mt-1 text-xs text-slate-500">{t(ui.game.again)}</p>
            </div>
          )}
        </div>
      </button>
    </div>
  )
}
