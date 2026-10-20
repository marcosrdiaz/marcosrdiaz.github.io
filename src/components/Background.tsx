import { useEffect, useRef } from 'react'

/** Fixed background: grid, aurora blobs, connected particles that react to the cursor and a cursor glow. */
export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const mouse = { x: -9999, y: -9999 }
    type P = { x: number; y: number; vx: number; vy: number; r: number }
    let ps: P[] = []
    let w = 0, h = 0, raf = 0

    const resize = () => {
      w = window.innerWidth; h = window.innerHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(Math.min(80, (w * h) / 22000))
      ps = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.6 + 0.6,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const rgb = document.body.classList.contains('race-mode') ? '248,113,113' : '125,211,252'
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i]
        if (!reduced) {
          // gentle repulsion from the cursor
          const dx = p.x - mouse.x, dy = p.y - mouse.y
          const d = Math.hypot(dx, dy) || 1
          if (d < 140) {
            const f = (1 - d / 140) * 0.6
            p.x += (dx / d) * f
            p.y += (dy / d) * f
          }
          p.x += p.vx; p.y += p.vy
          if (p.x < 0 || p.x > w) p.vx *= -1
          if (p.y < 0 || p.y > h) p.vy *= -1
        }
        ctx.fillStyle = `rgba(${rgb},0.7)`
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill()
        for (let j = i + 1; j < ps.length; j++) {
          const q = ps[j]
          const d = Math.hypot(p.x - q.x, p.y - q.y)
          if (d < 120) {
            ctx.strokeStyle = `rgba(${rgb},${(1 - d / 120) * 0.35})`
            ctx.lineWidth = 0.6
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke()
          }
        }
        const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y)
        if (dm < 180) {
          ctx.strokeStyle = `rgba(${rgb},${(1 - dm / 180) * 0.5})`
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke()
        }
      }
      if (!reduced) raf = requestAnimationFrame(draw)
    }

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX; mouse.y = e.clientY
      if (glowRef.current) glowRef.current.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`
    }
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999 }

    resize(); draw()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove)
    document.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="grid-bg absolute inset-0" />
      <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute top-1/3 -left-40 h-[420px] w-[420px] rounded-full bg-indigo-600/15 blur-[120px]" />
      <div className="absolute -right-40 bottom-0 h-[480px] w-[480px] rounded-full bg-cyan-500/10 blur-[120px]" />
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div ref={glowRef} className="absolute top-0 left-0 hidden h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.12),transparent_60%)] md:block" />
    </div>
  )
}
