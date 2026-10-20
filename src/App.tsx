import { useState } from 'react'
import About from './components/About'
import Background from './components/Background'
import CommandPalette from './components/CommandPalette'
import Contact from './components/Contact'
import Cursor from './components/Cursor'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Fun from './components/Fun'
import Hero from './components/Hero'
import Konami from './components/Konami'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import Skills from './components/Skills'

export default function App() {
  const [palette, setPalette] = useState(false)
  return (
    <>
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
      <CommandPalette open={palette} setOpen={setPalette} />
      <Konami />
    </>
  )
}
