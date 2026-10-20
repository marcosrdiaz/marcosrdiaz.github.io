import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

/** Trailing ring that follows the native cursor and grows over interactive elements (fine pointers only). */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hover, setHover] = useState(false)
  const [down, setDown] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return
    setEnabled(true)
    const move = (e: PointerEvent) => {
      x.set(e.clientX); y.set(e.clientY)
      const el = e.target as Element | null
      setHover(!!el?.closest('a, button, [data-cursor]'))
    }
    const dn = () => setDown(true)
    const up = () => setDown(false)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerdown', dn)
    window.addEventListener('pointerup', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', dn)
      window.removeEventListener('pointerup', up)
    }
  }, [x, y])

  if (!enabled) return null
  const size = hover ? 52 : 30
  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{ width: size, height: size, scale: down ? 0.8 : 1, backgroundColor: hover ? 'rgba(59,130,246,0.12)' : 'rgba(59,130,246,0)' }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="pointer-events-none fixed top-0 left-0 z-[200] rounded-full border border-blue-400/60 mix-blend-screen"
    />
  )
}
