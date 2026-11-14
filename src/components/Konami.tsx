import { useEffect, useRef } from 'react'
import { animate, stagger, utils } from 'animejs'
import { ui } from '../data'
import { useLang } from '../i18n'
import { useToast } from '../toast'

const CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

/** Simple single-seater silhouette, facing right. */
const CAR_SVG = `<svg viewBox="0 0 160 48" xmlns="http://www.w3.org/2000/svg" fill="none">
  <path d="M6 30h26l10-12h30l8 8h22l14-4 14 4v8H6z" fill="#ef4444"/>
  <path d="M60 18l8-6h14l6 6z" fill="#fecaca"/>
  <rect x="2" y="14" width="8" height="18" rx="1" fill="#facc15"/>
  <rect x="140" y="26" width="16" height="4" rx="1" fill="#facc15"/>
  <circle cx="38" cy="36" r="9" fill="#0a1128" stroke="#e2e8f0" stroke-width="2"/>
  <circle cx="122" cy="36" r="9" fill="#0a1128" stroke="#e2e8f0" stroke-width="2"/>
</svg>`

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
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const root = layer.current
      root.innerHTML = ''
      const car = document.createElement('div')
      car.innerHTML = CAR_SVG
      car.style.cssText = 'position:absolute;top:55%;left:0;width:150px'
      root.appendChild(car)
      animate(car, { x: [-200, window.innerWidth + 200], duration: 1400, ease: 'inQuad', onComplete: () => car.remove() })

      const flags = Array.from({ length: 28 }, () => {
        const f = document.createElement('span')
        const w = 22 + Math.random() * 22
        f.style.cssText = `position:absolute;left:50%;top:50%;width:${w}px;height:${w * 0.7}px;border:1px solid #fff`
        f.className = 'checkered'
        f.style.backgroundSize = `${w / 4}px ${w / 4}px`
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
