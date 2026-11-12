# Portfolio marcosrdiaz.github.io

React 19 + TypeScript + Vite 8 + Tailwind 4 (`@theme` en `src/index.css`), `motion` (framer-motion) y `animejs` v4.
Deploy a GitHub Pages con Actions al hacer push a `main` (`.github/workflows/deploy.yml`, `base: '/'`).
Comandos: `npm run dev`, `npm run build` (tsc -b + vite build).

## Mapa
- `src/data.ts`: perfil, textos de UI (`ui`), `experience`, `projects`, `skillGroups`, `softSkills`, `funFacts`. Tipo `T = { es, en }`.
- `src/i18n.tsx`: `useLang().t`. `src/toast.tsx`: toasts. `src/icons.tsx`: mapa clave -> icono lucide (`IconKey`, `<Icon name=... />`).
- `src/components/`: `Hero`, `About` (bento), `Experience` (timeline), `Projects` (tilt 3D + `PhoneMock`), `Skills` (marquee + cajas + soft skills), `Fun` (flip cards + `ReactionGame`), `Contact`, `CommandPalette` (Ctrl+K), `Navbar`, `Footer`, `Konami` (race mode), `Background` (canvas), `Cursor`, `ui.tsx` (`Section`, `Reveal`, `Magnetic`, `Tag`, `spotlightMove`).
- CSS propio en `index.css`: `glass`, `text-gradient`, `spotlight`, `flip`, `marquee`, `race-mode`, `checkered`.
- Estaticos en `public/`: `sources/` (cv, foto, sensia), `icons/` (SVG del stack, servidos en local).

## Convenciones
- Todo texto visible va en ES y EN en `data.ts`, nunca hardcodeado en componentes. Espanol de Espana.
- Cero emojis en toda la web. Iconos de UI solo con `lucide-react` (sin iconos de marca: usar iconos genericos o SVG local).
- Estetica: profesional, oscura, sobria, animacion cuidada. Respetar `prefers-reduced-motion`.
- No inventar datos sobre Marcos (fechas, cifras, tecnologias): preguntar.
- Escribir SENSIA/Sensia de forma consistente (pendiente de decidir).
- Un commit por fase; `npm run build` limpio antes de cada commit.
- El CV (`public/sources/cv.pdf`) lo actualiza Marcos a mano.
