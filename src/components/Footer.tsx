import { Eye } from 'lucide-react'
import { profile, ui } from '../data'
import { useLang } from '../i18n'
import { useToast } from '../toast'

export default function Footer() {
  const { t } = useLang()
  const toast = useToast()
  return (
    <footer className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/5 px-4 py-10 text-xs text-slate-500 sm:flex-row sm:px-6">
      <p>© {new Date().getFullYear()} {profile.name} · {t(ui.footer.made)}</p>
      <button onClick={() => toast(t(ui.footer.secret))} className="flex items-center gap-2 rounded-full px-3 py-1.5 ring-1 ring-white/10 transition hover:text-white hover:ring-blue-400/40" aria-label="Easter egg">
        <Eye size={14} aria-hidden /> <span className="font-mono">secret</span>
      </button>
    </footer>
  )
}
