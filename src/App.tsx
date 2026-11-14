import { lazy, Suspense, useEffect, useState } from 'react'
import About from './components/About'
import Background from './components/Background'
import Contact from './components/Contact'
import Cursor from './components/Cursor'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Fun from './components/Fun'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import Skills from './components/Skills'
import { ui } from './data'
import { useLang } from './i18n'

// Not needed for first paint: loaded on demand to keep the main bundle small
const CommandPalette = lazy(() => import('./components/CommandPalette'))
const Konami = lazy(() => import('./components/Konami'))

export default function App() {
  const { t } = useLang()
  const [palette, setPalette] = useState(false)
  const [paletteLoaded, setPaletteLoaded] = useState(false)
  const [idle, setIdle] = useState(false)

  // Ctrl/Cmd+K lives here so the palette chunk is only fetched the first time it is opened
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setPalette(p => !p) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  useEffect(() => { if (palette) setPaletteLoaded(true) }, [palette])

  // The Konami easter egg loads once the page is idle
  useEffect(() => {
    const id = window.setTimeout(() => setIdle(true), 2500)
    return () => clearTimeout(id)
  }, [])

  return (
    <>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[300] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white">
        {t(ui.skip)}
      </a>
      <Background />
      <Cursor />
      <Navbar onOpenPalette={() => setPalette(true)} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Fun />
        <Contact />
      </main>
      <Footer />
      <Suspense fallback={null}>
        {paletteLoaded && <CommandPalette open={palette} setOpen={setPalette} />}
        {idle && <Konami />}
      </Suspense>
    </>
  )
}
