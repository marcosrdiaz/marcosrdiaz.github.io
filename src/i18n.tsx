import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Lang, T } from './data'

type Ctx = { lang: Lang; setLang: (l: Lang) => void; toggle: () => void; t: (v: T | string) => string }
const LangContext = createContext<Ctx | null>(null)

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem('lang')
    if (saved === 'es' || saved === 'en') return saved
  } catch { /* storage unavailable */ }
  return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try { localStorage.setItem('lang', l) } catch { /* ignore */ }
  }, [])

  useEffect(() => { document.documentElement.lang = lang }, [lang])

  const t = useCallback((v: T | string) => (typeof v === 'string' ? v : v[lang]), [lang])
  const toggle = useCallback(() => setLang(lang === 'es' ? 'en' : 'es'), [lang, setLang])

  return <LangContext.Provider value={{ lang, setLang, toggle, t }}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}
