import { ArrowRight, Download } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../icons'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { animate, stagger } from 'animejs'
import { profile, ui } from '../data'
import { useLang } from '../i18n'
import { Magnetic } from './ui'

const GLYPHS = '!<>-_\\/[]{}—=+*^?#01'

/** Cycles through words with a "decrypt" scramble effect. */
function useScramble(words: string[], interval = 2600) {
  const [text, setText] = useState(words[0])
  const current = useRef(words[0])
  useEffect(() => {
    setText(words[0]); current.current = words[0]
    let i = 0, frame = 0, raf = 0
    const run = (target: string) => {
      const from = current.current
      current.current = target
      const len = Math.max(from.length, target.length)
      const queue = Array.from({ length: len }, (_, k) => ({
        from: from[k] ?? '', to: target[k] ?? '',
        start: Math.floor(Math.random() * 12), end: Math.floor(Math.random() * 12) + 12,
      }))
      frame = 0
      const tick = () => {
        let out = '', done = 0
        for (const q of queue) {
          if (frame >= q.end) { out += q.to; done++ }
          else if (frame >= q.start) out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          else out += q.from
        }
        setText(out)
        if (done < queue.length) { frame++; raf = requestAnimationFrame(tick) }
      }
      tick()
    }
    const id = setInterval(() => { i = (i + 1) % words.length; run(words[i]) }, interval)
    return () => { clearInterval(id); cancelAnimationFrame(raf) }
  }, [words.join('|')])
  return text
}

export default function Hero() {
  const { t, lang } = useLang()
  const nameRef = useRef<HTMLHeadingElement>(null)
  const ref = useRef<HTMLElement>(null)
  const role = useScramble(ui.hero.roles[lang])
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 160])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const hintFade = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const letters = nameRef.current?.querySelectorAll('.letter')
    if (!letters) return
    const a = animate(letters, {
      y: ['110%', '0%'],
      rotate: [8, 0],
      opacity: [0, 1],
      delay: stagger(35, { start: 300 }),
      duration: 1100,
      ease: 'outExpo',
    })
    return () => { a.revert() }
  }, [])

  // Letters jump when hovered (anime.js)
  const bounce = (el: HTMLElement) => {
    animate(el, { y: [0, -14, 0], color: ['#fff', '#60a5fa', '#fff'], duration: 600, ease: 'outElastic(1, .6)' })
  }

  const words = profile.name.split(' ')

  return (
    <section id="top" ref={ref} className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 pt-24 pb-16 lg:pt-28 sm:px-6">
      <motion.div style={{ y, opacity: fade }} className="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 lg:flex-row lg:justify-between">
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-slate-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {t(ui.hero.badge)}
          </motion.div>

          <p className="mb-2 font-mono text-sm text-brand-2">{t(ui.hero.hello)}</p>
          <h1 ref={nameRef} aria-label={profile.name} className="font-display text-5xl leading-[0.95] font-bold tracking-tight text-white sm:text-7xl lg:text-8xl">
            {words.map((w, wi) => (
              <span key={wi} className="mr-[0.25em] inline-block overflow-hidden pb-2 align-bottom last:mr-0">
                {[...w].map((c, ci) => (
                  <span
                    key={ci}
                    aria-hidden
                    className={`letter inline-block ${wi === words.length - 1 ? 'text-gradient' : ''}`}
                    onMouseEnter={e => wi !== words.length - 1 && bounce(e.currentTarget)}
                  >
                    {c}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p className="mt-6 min-h-[2lh] font-mono text-base text-slate-300 sm:min-h-0 sm:text-2xl">
            <span className="text-slate-400">{t(ui.hero.iBuild)} </span>
            <span className="text-white">{role}</span>
            <span className="ml-1 inline-block h-6 w-[2px] translate-y-1 bg-brand-2 [animation:blink_1s_steps(1)_infinite]" />
          </p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400 lg:mx-0"
          >
            {t(ui.hero.blurb)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start"
          >
            <Magnetic href="#projects" className="bg-brand text-white shadow-lg shadow-blue-500/30 hover:bg-blue-500">
              {t(ui.hero.ctaProjects)} <ArrowRight size={16} aria-hidden />
            </Magnetic>
            <Magnetic href={profile.cv} download className="glass text-white hover:border-blue-400/40">
              {t(ui.hero.ctaCv)} <Download size={16} aria-hidden />
            </Magnetic>
            <Magnetic href={profile.github} external className="glass text-white hover:border-blue-400/40" >
              <GithubIcon size={16} /> GitHub
            </Magnetic>
            <Magnetic href={profile.linkedin} external className="glass text-white hover:border-blue-400/40">
              <LinkedinIcon size={16} /> LinkedIn
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-first h-36 w-36 shrink-0 sm:h-56 sm:w-56 lg:order-none lg:h-72 lg:w-72"
        >
          <div className="absolute -inset-1 rounded-full bg-[conic-gradient(from_0deg,#3b82f6,#22d3ee,#6366f1,#3b82f6)] [animation:spin-slow_8s_linear_infinite] blur-[2px]" />
          <div className="absolute -inset-6 rounded-full bg-blue-500/20 blur-3xl" />
          <img src="/sources/foto-640.webp" srcSet="/sources/foto-320.webp 320w, /sources/foto-640.webp 640w" sizes="(min-width: 1024px) 288px, (min-width: 640px) 224px, 144px" width={640} height={640} fetchPriority="high" alt={profile.name} className="relative h-full w-full rounded-full border-4 border-ink object-cover" />
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="glass absolute -right-6 bottom-2 sm:-right-4 sm:bottom-6 rounded-2xl px-3 py-2 font-mono text-xs text-white"
          >
            {'<dev />'}
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="glass absolute -top-8 left-2 hidden rounded-2xl px-3 py-2 text-xs whitespace-nowrap text-white sm:block"
          >
            <span className="font-mono">React · TypeScript · C++</span>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div style={{ opacity: hintFade }} className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block">
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="flex flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-slate-400 uppercase"
      >
        {t(ui.hero.scroll)}
        <span className="flex h-8 w-5 justify-center rounded-full border border-slate-600 pt-1.5">
          <motion.span animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }} transition={{ duration: 1.8, repeat: Infinity }} className="h-1.5 w-1 rounded-full bg-brand-2" />
        </span>
      </motion.a>
      </motion.div>
    </section>
  )
}
