import { Copy, Flag } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { animate } from 'animejs'
import { ui } from '../data'
import { useLang } from '../i18n'
import { useToast } from '../toast'

type State = 'idle' | 'lights' | 'go' | 'result' | 'jump'
type Tier = keyof typeof ui.game.tiers

/** Reference grid: indicative reaction times per grid level (no real drivers). */
const GRID: { tier: Tier; ms: number }[] = [
  { tier: 'pole', ms: 175 },
  { tier: 'podium', ms: 200 },
  { tier: 'podium', ms: 220 },
  { tier: 'points', ms: 245 },
  { tier: 'points', ms: 270 },
  { tier: 'midfield', ms: 300 },
  { tier: 'midfield', ms: 335 },
  { tier: 'back', ms: 400 },
  { tier: 'safety', ms: 600 },
]

const HISTORY_KEY = 'f1-history'
const BEST_KEY = 'f1-best'

function loadBest(): number | null {
  try { const v = Number(localStorage.getItem(BEST_KEY)); return v > 0 ? v : null } catch { return null }
}
function loadHistory(): number[] {
  try {
    const v = JSON.parse(localStorage.getItem(HISTORY_KEY) ?? '[]')
    return Array.isArray(v) ? v.filter(n => typeof n === 'number' && n > 0).slice(0, 5) : []
  } catch { return [] }
}

/** F1-style start lights: 5 reds come on one by one, go out after a random delay, click as fast as possible. */
export default function ReactionGame({ autoStart = false }: { autoStart?: boolean }) {
  const { t } = useLang()
  const toast = useToast()
  const [state, setState] = useState<State>('idle')
  const [lit, setLit] = useState(0)
  const [time, setTime] = useState<number | null>(null)
  const [best, setBest] = useState<number | null>(loadBest)
  const [history, setHistory] = useState<number[]>(loadHistory)
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
    if (autoStart) handler()
    return () => { window.removeEventListener('start-race', handler); clear() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      if (!best || ms < best) { setBest(ms); try { localStorage.setItem(BEST_KEY, String(ms)) } catch { /* ignore */ } }
      const next = [ms, ...history].slice(0, 5)
      setHistory(next)
      try { localStorage.setItem(HISTORY_KEY, JSON.stringify(next)) } catch { /* ignore */ }
      requestAnimationFrame(() => animate('.f1-time', { scale: [1.4, 1], opacity: [0, 1], duration: 700, ease: 'outElastic(1, .5)' }))
    }
  }

  const position = time == null ? 0 : GRID.filter(g => g.ms < time).length + 1
  const tier: Tier = time == null ? 'pole' : (GRID[position - 1] ?? GRID[GRID.length - 1]).tier
  const rows = time == null ? [] : [...GRID.map(g => ({ ...g, you: false })), { tier, ms: time, you: true }].sort((a, b) => a.ms - b.ms || (a.you ? 1 : -1))
  const average = history.length ? Math.round(history.reduce((a, b) => a + b, 0) / history.length) : null

  const share = async () => {
    if (time == null) return
    const text = t(ui.game.shareText).replace('{ms}', String(time)).replace('{pos}', `P${position}`).replace('{tier}', t(ui.game.tiers[tier]))
    try { await navigator.clipboard.writeText(`${text} ${window.location.origin}/#fun`); toast(t(ui.game.shared)) } catch { /* clipboard unavailable */ }
  }

  return (
    <div ref={rootRef} id="race" className="glass relative overflow-hidden rounded-3xl p-6">
      <div className="checkered absolute inset-x-0 top-0 h-2 opacity-60" />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-white"><Flag size={20} className="text-brand-2" aria-hidden /> {t(ui.game.title)}</h3>
        {best && (
          <span className="font-mono text-xs text-slate-400">
            {t(ui.game.best)}: <span className="text-brand-2">{best} ms</span>
            {average && <> · {t(ui.game.average)}: <span className="text-brand-2">{average} ms</span></>}
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-slate-400">{t(ui.game.intro)}</p>

      <button
        onPointerDown={press}
        onClick={e => { if (e.detail === 0) press() /* keyboard activation */ }}
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
            <div><p className="font-display text-xl font-bold text-red-400">{t(ui.game.jump)}</p><p className="mt-1 text-xs text-slate-400">{t(ui.game.again)}</p></div>
          )}
          {state === 'result' && time != null && (
            <div>
              <p className="f1-time font-mono text-3xl font-bold text-white">{time} ms</p>
              <p className="text-sm text-slate-300">{t(ui.game.startFrom)} <span className="font-semibold text-brand-2">P{position}</span> · {t(ui.game.tiers[tier])}</p>
              <p className="mt-1 text-xs text-slate-400">{t(ui.game.again)}</p>
            </div>
          )}
        </div>
      </button>

      {state === 'result' && time != null && (
        <div className="mt-5 grid gap-5 md:grid-cols-[1fr_auto]">
          <div>
            <p className="font-mono text-xs tracking-widest text-slate-400 uppercase">{t(ui.game.grid)}</p>
            <ol className="mt-2 space-y-1">
              {rows.map((r, i) => (
                <li
                  key={r.you ? 'you' : r.ms}
                  aria-current={r.you || undefined}
                  className={`flex items-center gap-3 rounded-lg px-3 py-1.5 text-sm ${r.you ? 'bg-blue-500/20 text-white ring-1 ring-blue-400/40' : 'bg-white/[0.03] text-slate-300'}`}
                >
                  <span className="w-8 font-mono text-xs text-slate-400">P{i + 1}</span>
                  <span className="flex-1">{r.you ? <span className="font-semibold">{t(ui.game.you)}</span> : t(ui.game.tiers[r.tier])}</span>
                  <span className="font-mono text-xs tabular-nums">{r.ms} ms</span>
                </li>
              ))}
            </ol>
            <p className="mt-2 text-xs text-slate-400">{t(ui.game.reference)}</p>
          </div>
          <div className="md:w-56">
            <p className="font-mono text-xs tracking-widest text-slate-400 uppercase">{t(ui.game.attempts)}</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {history.map((h, i) => (
                <li key={i} className={`rounded-full px-2.5 py-1 font-mono text-xs ring-1 ${h === best ? 'bg-emerald-400/10 text-emerald-300 ring-emerald-400/30' : 'bg-white/5 text-slate-300 ring-white/10'}`}>{h} ms</li>
              ))}
            </ul>
            <button onClick={share} className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-slate-200 ring-1 ring-white/15 transition hover:text-white hover:ring-blue-400/40">
              <Copy size={14} aria-hidden /> {t(ui.game.share)}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
