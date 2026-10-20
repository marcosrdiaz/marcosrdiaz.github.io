import { useEffect, useRef } from 'react'
import { animate, stagger, utils } from 'animejs'
import { ui } from '../data'
import { useLang } from '../i18n'
import { useToast } from '../toast'

const CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

/** ↑↑↓↓←→←→BA toggles "race mode": red/yellow theme, a car crossing the screen and a burst of flags. */
export default function Konami() {
  const { t } = useLang()
  const toast = useToast()
  const layer = useRef<HTMLDivElement>(null)
  const idx = useRef(0)

  useEffect(() => {
    const celebrate = () => {
      const on = document.body.classList.toggle('race-mode')
      if (!on || !layer.current) return
      toast(t(ui.konami))
      const root = layer.current
      root.innerHTML = ''
      const car = document.createElement('div')
      car.textContent = '🏎️'
      car.style.cssText = 'position:absolute;top:55%;left:0;font-size:72px;transform:scaleX(-1)'
      root.appendChild(car)
      animate(car, { x: [-120, window.innerWidth + 120], duration: 1400, ease: 'inQuad', onComplete: () => car.remove() })

      const flags = Array.from({ length: 28 }, () => {
        const f = document.createElement('span')
        f.textContent = Math.random() > 0.5 ? '🏁' : '🏆'
        f.style.cssText = `position:absolute;left:50%;top:50%;font-size:${20 + Math.random() * 22}px`
        root.appendChild(f)
        return f
      })
      animate(flags, {
        x: () => utils.random(-window.innerWidth / 2, window.innerWidth / 2),
        y: () => utils.random(-window.innerHeight / 2, window.innerHeight / 2),
        rotate: () => utils.random(-360, 360),
        scale: [0, 1],
        opacity: [1, 0],
        duration: 1800,
        delay: stagger(15),
        ease: 'outExpo',
        onComplete: () => flags.forEach(f => f.remove()),
      })
    }

    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key
      idx.current = k === CODE[idx.current] ? idx.current + 1 : k === CODE[0] ? 1 : 0
      if (idx.current === CODE.length) { idx.current = 0; celebrate() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [t, toast])

  return <div ref={layer} aria-hidden className="pointer-events-none fixed inset-0 z-[120] overflow-hidden" />
}
