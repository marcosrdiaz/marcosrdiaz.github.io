import type { IconKey } from './icons'

export type Lang = 'es' | 'en'
export type T = Record<Lang, string>

export const profile = {
  name: 'Marcos Rodrigo Díaz',
  email: 'marcosrodrigodiaz@gmail.com',
  github: 'https://github.com/marcosrdiaz',
  githubUser: 'marcosrdiaz',
  linkedin: 'https://linkedin.com/in/marcos-rodrigo-diaz',
  cv: '/sources/cv.pdf',
  photo: '/sources/foto.jpg',
  location: 'Ugena, Toledo',
}

export const ui = {
  nav: {
    about: { es: 'Sobre mí', en: 'About' },
    experience: { es: 'Experiencia', en: 'Experience' },
    projects: { es: 'Proyectos', en: 'Projects' },
    skills: { es: 'Stack', en: 'Stack' },
    fun: { es: 'Curiosidades', en: 'Fun' },
    contact: { es: 'Contacto', en: 'Contact' },
  },
  hero: {
    badge: { es: 'Software Developer en Sensia', en: 'Software Developer at Sensia' },
    hello: { es: 'Hola, soy', en: "Hi, I'm" },
    iBuild: { es: 'Construyo', en: 'I build' },
    roles: {
      es: ['experiencias web', 'apps móviles', 'paneles web para cámaras con IA', 'arquitectura de software', 'C++ de alto rendimiento'],
      en: ['web experiences', 'mobile apps', 'web panels for AI cameras', 'software architecture', 'high-performance C++'],
    },
    blurb: {
      es: 'Ingeniero Informático. Diseño, desarrollo e implanto software en los equipos de Web Panel, Arquitectura de Sistemas y Next-Design de Sensia.',
      en: "Computer Engineer. I design, build and ship software on Sensia's Web Panel, Systems Architecture and Next-Design teams.",
    },
    ctaProjects: { es: 'Ver proyectos', en: 'See projects' },
    ctaCv: { es: 'Descargar CV', en: 'Download CV' },
    scroll: { es: 'Desliza', en: 'Scroll' },
  },
  about: {
    kicker: { es: 'Sobre mí', en: 'About me' },
    title: { es: 'Código limpio, interfaces que se sienten vivas.', en: 'Clean code, interfaces that feel alive.' },
    p1: {
      es: 'Soy Marcos, Ingeniero Informático (2022 – 2026) y desarrollador de software en Sensia. Lo que más disfruto es el desarrollo web y de apps: llevar una idea desde la arquitectura hasta un producto rápido, cuidado y agradable de usar.',
      en: "I'm Marcos, a Computer Engineer (2022 – 2026) and software developer at Sensia. What I enjoy most is web and app development: taking an idea from architecture all the way to a fast, polished product people enjoy using.",
    },
    p2: {
      es: 'Me considero competitivo, ambicioso y trabajador, pero también empático y muy de equipo. Fuera del código: videojuegos y deportes de motor.',
      en: "I'm competitive, ambitious and hard-working, but also empathetic and a real team player. Away from code: video games and motorsport.",
    },
    focus: { es: 'Mi foco', en: 'My focus' },
    focusText: { es: 'Desarrollo web & apps', en: 'Web & app development' },
    basedIn: { es: 'Desde', en: 'Based in' },
    localTime: { es: 'hora local', en: 'local time' },
    now: { es: 'Ahora mismo', en: 'Right now' },
    nowText: { es: 'Software Developer · Web Panel, Arquitectura de Sistemas y Next-Design', en: 'Software Developer · Web Panel, Systems Architecture and Next-Design' },
    languages: { es: 'Idiomas', en: 'Languages' },
    spanish: { es: 'Español · Nativo', en: 'Spanish · Native' },
    english: { es: 'Inglés · B2 First (Cambridge)', en: 'English · B2 First (Cambridge)' },
    degree: { es: 'Grado en Ingeniería Informática', en: "Bachelor's in Computer Engineering" },
  },
  experience: {
    kicker: { es: 'Trayectoria', en: 'Journey' },
    title: { es: 'Experiencia y formación', en: 'Experience and education' },
  },
  projects: {
    kicker: { es: 'Trabajo seleccionado', en: 'Selected work' },
    title: { es: 'Proyectos destacados', en: 'Featured projects' },
    private: { es: 'Privado', en: 'Private' },
    code: { es: 'Código', en: 'Code' },
    more: { es: 'Más en GitHub', en: 'More on GitHub' },
  },
  skills: {
    kicker: { es: 'Herramientas', en: 'Toolbox' },
    title: { es: 'Mi stack', en: 'My stack' },
    soft: { es: 'Soft skills', en: 'Soft skills' },
  },
  fun: {
    kicker: { es: 'Más allá del código', en: 'Beyond code' },
    title: { es: 'Curiosidades', en: 'Fun facts' },
    flipHint: { es: 'Pasa el ratón o toca para girar', en: 'Hover or tap to flip' },
  },
  game: {
    title: { es: 'Test de reacción F1', en: 'F1 reaction test' },
    intro: { es: 'Espera a que se apaguen los semáforos y pulsa lo más rápido que puedas.', en: 'Wait for the lights to go out and click as fast as you can.' },
    start: { es: 'Empezar', en: 'Start' },
    wait: { es: 'Espera…', en: 'Wait…' },
    go: { es: '¡YA!', en: 'GO!' },
    jump: { es: '¡Salida en falso!', en: 'Jump start!' },
    again: { es: 'Otra vez', en: 'Try again' },
    best: { es: 'Mejor', en: 'Best' },
    verdictPro: { es: 'Nivel piloto de F1', en: 'F1 driver level' },
    verdictGood: { es: 'Muy buenos reflejos', en: 'Great reflexes' },
    verdictOk: { es: 'Nada mal, ¡sigue entrenando!', en: 'Not bad, keep training!' },
  },
  contact: {
    kicker: { es: 'Contacto', en: 'Contact' },
    title: { es: '¿Hablamos?', en: "Let's talk" },
    text: { es: 'Siempre abierto a conocer gente, ideas y proyectos interesantes. Escríbeme y te respondo.', en: "Always happy to meet people and hear about interesting ideas and projects. Drop me a line." },
    copy: { es: 'Copiar email', en: 'Copy email' },
    copied: { es: 'Email copiado', en: 'Email copied' },
  },
  footer: {
    made: { es: 'Hecho con React, Motion y anime.js', en: 'Built with React, Motion and anime.js' },
    secret: { es: 'Pista: prueba ↑↑↓↓←→←→BA o pulsa Ctrl + K', en: 'Hint: try ↑↑↓↓←→←→BA or press Ctrl + K' },
  },
  palette: {
    placeholder: { es: 'Escribe un comando o busca…', en: 'Type a command or search…' },
    empty: { es: 'Sin resultados', en: 'No results' },
    goTo: { es: 'Ir a', en: 'Go to' },
    lang: { es: 'Switch to English', en: 'Cambiar a español' },
    race: { es: 'Arrancar el test de reacción F1', en: 'Start the F1 reaction test' },
  },
  konami: { es: '¡Código Konami! Modo carrera activado', en: 'Konami code! Race mode on' },
} satisfies Record<string, unknown>

export type Experience = {
  role: T
  org: string | T
  period: T
  current?: boolean
  kind: 'work' | 'edu' | 'award'
  desc: T
  tags: string[]
}

export const experience: Experience[] = [
  {
    role: { es: 'Software Developer', en: 'Software Developer' },
    org: 'Sensia',
    period: { es: 'Sep 2026 — Actualidad', en: 'Sep 2026 — Present' },
    current: true,
    kind: 'work',
    desc: {
      es: 'Trabajo en tres equipos: Web Panel, Arquitectura de Sistemas y Next-Design. En Web Panel construyo el panel web para configurar y monitorizar cámaras térmicas con IA (edge computing), y trabajo en servirlo por HTTPS y en llevar el vídeo a WebRTC. En los otros dos defino patrones de arquitectura y optimizo el rendimiento de las aplicaciones con C++ y tecnologías web.',
      en: 'I work across three teams: Web Panel, Systems Architecture and Next-Design. On Web Panel I build the web panel to configure and monitor AI thermal cameras (edge computing), and work on serving it over HTTPS and moving video to WebRTC. On the other two I define architecture patterns and tune application performance with C++ and web technologies.',
    },
    tags: ['Web Panel', 'C++', 'JavaScript', 'HTML', 'CSS', 'HTTPS', 'Edge computing'],
  },
  {
    role: { es: 'Participante · Hack Finance 2026', en: 'Participant · Hack Finance 2026' },
    org: 'BEST UC3M',
    period: { es: '8 — 11 nov 2026', en: '8 — 11 Nov 2026' },
    kind: 'award',
    desc: {
      es: 'Hackathon de 72 horas en equipo de cinco. Desarrollamos KAIROS, un copiloto que traduce eventos financieros (BCE, petróleo, resultados, divisas) a su impacto en euros sobre la cartera de un inversor particular. Un motor determinista calcula las cifras y un guardián valida cada texto que redacta la IA.',
      en: "A 72-hour hackathon with a team of five. We built KAIROS, a copilot that translates financial events (ECB decisions, oil, earnings, currencies) into their euro impact on a retail investor's portfolio. A deterministic engine computes every figure and a guardian validates each sentence the AI writes.",
    },
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'React', 'TypeScript', 'Claude', 'ElevenLabs'],
  },
  {
    role: { es: 'Prácticas de desarrollo de software', en: 'Software Development Intern' },
    org: 'Sensia',
    period: { es: 'Feb 2026 — Jul 2026', en: 'Feb 2026 — Jul 2026' },
    kind: 'work',
    desc: {
      es: 'Implanté con Wiki.js la wiki corporativa del departamento de Software, el punto central de información sobre áreas, productos y proyectos. Desarrollé un servicio web que detecta enlaces rotos en la wiki (Node.js y Express sobre wikijs-cli, con un plan de 41 casos de prueba), base de mi TFG.',
      en: "I rolled out the Software department's corporate wiki on Wiki.js, the central hub for information on areas, products and projects. I built a web service that detects broken links in the wiki (Node.js and Express on top of wikijs-cli, with a 41-case test plan), which became the basis of my thesis.",
    },
    tags: ['Wiki.js', 'Node.js', 'Express', 'Documentación', 'Testing'],
  },
  {
    role: { es: 'Participante', en: 'Participant' },
    org: 'BE.HACKATHON',
    period: { es: 'Abr 2026', en: 'Apr 2026' },
    kind: 'award',
    desc: {
      es: 'Hackathon en el que desarrollé una solución en equipo y contrarreloj, desde la idea hasta un prototipo funcional.',
      en: 'A hackathon where I built a solution as a team against the clock, from idea to working prototype.',
    },
    tags: ['Teamwork', 'Prototyping'],
  },
  {
    role: { es: 'Grado en Ingeniería Informática', en: "Bachelor's in Computer Engineering" },
    org: 'Universidad Carlos III de Madrid',
    period: { es: '2022 — 2026', en: '2022 — 2026' },
    kind: 'edu',
    desc: {
      es: 'Formación en desarrollo de software, programación orientada a objetos, sistemas operativos y concurrencia, bases de datos, redes y criptografía. TFG: «Implantación de un sistema de gestión del conocimiento en el área de software de una scale-up tecnológica».',
      en: 'Training in software development, object-oriented programming, operating systems and concurrency, databases, networking and cryptography. Thesis: "Implementing a knowledge-management system in the software area of a tech scale-up".',
    },
    tags: ['C', 'C++', 'Python', 'SQL', 'OOP', 'Crypto'],
  },
  {
    role: { es: 'B2 First · Cambridge English', en: 'B2 First · Cambridge English' },
    org: 'Cambridge',
    period: { es: 'Jun 2023', en: 'Jun 2023' },
    kind: 'award',
    desc: {
      es: 'Certificado oficial de inglés de nivel B2.',
      en: 'Official B2-level English certificate.',
    },
    tags: ['English'],
  },
]

export type Project = {
  id: string
  title: string
  desc: T
  highlights?: T[]
  tags: string[]
  repo?: string
  private?: boolean
  featured?: boolean
  /** Real screenshot (webp in public/projects/<id>/). Without it, featured cards show the PhoneMock placeholder. */
  image?: { src: string; width: number; height: number; alt: T }
  icon: IconKey
  accent: string
}

export const projects: Project[] = [
  {
    id: 'kairos',
    title: 'KAIROS · Hack Finance 2026',
    desc: {
      es: 'Copiloto financiero que traduce eventos de mercado (BCE, petróleo, resultados, divisas) a su impacto en euros sobre la cartera de un inversor particular, con rango, nivel de confianza y la traza de cada cifra. Proyecto de equipo (5 personas, 72 h).',
      en: "Financial copilot that translates market events (ECB decisions, oil, earnings, currencies) into their euro impact on a retail investor's portfolio, with a range, a confidence level and the trace of every figure. Team project (5 people, 72 h).",
    },
    highlights: [
      { es: 'Las cifras las calcula un motor determinista; la IA solo redacta', en: 'A deterministic engine computes every figure; the AI only writes' },
      { es: 'Un guardián valida cada texto y bloquea recomendaciones', en: 'A guardian validates every text and blocks recommendations' },
      { es: 'FastAPI + PostgreSQL, React + TypeScript, voz con ElevenLabs', en: 'FastAPI + PostgreSQL, React + TypeScript, voice with ElevenLabs' },
    ],
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'React', 'TypeScript', 'Vite', 'Tailwind', 'Claude', 'Docker'],
    repo: 'https://github.com/marcosrdiaz/kairos',
    featured: true,
    image: {
      src: '/projects/kairos/home.webp', width: 1600, height: 900,
      alt: { es: 'Pantalla de inicio de KAIROS con la evolución de la cartera, el estado actual, las noticias que más la mueven y el asistente', en: 'KAIROS home screen with portfolio evolution, current status, the news that move it most and the assistant' },
    },
    icon: 'trending',
    accent: '#f5b82e',
  },
  {
    id: 'wiki',
    title: 'Wiki corporativa · Sensia',
    desc: {
      es: 'Implanté con Wiki.js la wiki del departamento de Software de Sensia, punto central de información sobre áreas, productos y proyectos. Desarrollé además un servicio web que detecta enlaces rotos en la wiki, base de mi TFG.',
      en: "Rolled out the Software department's wiki at Sensia on Wiki.js, the central hub for information on areas, products and projects. I also built a web service that detects broken links in the wiki, the basis of my thesis.",
    },
    tags: ['Wiki.js', 'Node.js', 'Express', 'Documentación', 'Testing'],
    private: true,
    icon: 'book',
    accent: '#22d3ee',
  },
  {
    id: 'training',
    title: 'Training Tracker App',
    desc: {
      es: 'App de entrenamiento para registrar cada serie a pantalla completa, con récords personales automáticos y sugerencia de peso según tu histórico. Incluye rutinas, calendario, estadísticas, logros y amigos.',
      en: 'Workout app that logs every set full-screen, with automatic personal records and weight suggestions based on your history. Includes routines, calendar, stats, achievements and friends.',
    },
    highlights: [
      { es: 'Funciona offline con SQLite: el entreno activo no depende de la red', en: 'Works offline with SQLite: an active workout never depends on the network' },
      { es: 'Rutinas compartidas con Row Level Security en Supabase', en: 'Shared routines with Row Level Security on Supabase' },
      { es: 'React Native + Expo (SDK 57)', en: 'React Native + Expo (SDK 57)' },
    ],
    tags: ['React Native', 'Expo', 'TypeScript', 'SQLite', 'Supabase', 'PostgreSQL', 'Offline-first'],
    private: true,
    featured: true,
    icon: 'dumbbell',
    accent: '#3b82f6',
  },
  {
    id: 'bets',
    title: 'Web de apuestas cifrada',
    desc: {
      es: 'Plataforma web de apuestas deportivas con criptografía aplicada: derivación de claves con Scrypt, cifrado AES-GCM de datos sensibles, firma digital RSA y certificados X.509 gestionados con OpenSSL. Backend en Flask.',
      en: 'Sports-betting web platform with applied cryptography: Scrypt key derivation, AES-GCM encryption of sensitive data, RSA digital signatures and X.509 certificates managed with OpenSSL. Flask backend.',
    },
    tags: ['Python', 'Flask', 'AES-GCM', 'RSA', 'Scrypt', 'OpenSSL'],
    repo: 'https://github.com/marcosrdiaz/Web-de-apuestas-cifrada',
    icon: 'lock',
    accent: '#6366f1',
  },
  {
    id: 'aeki',
    title: 'AEKI · Prototipo para tiendas',
    desc: {
      es: 'Prototipo para mejorar la compra en tienda física: catálogo y carrito controlables por voz, gestos con los sensores del móvil y NFC, más un mapa interactivo del almacén con rutas calculadas con A*. Tiempo real con Socket.IO sobre Node.js y Express.',
      en: 'Prototype to improve in-store shopping: catalogue and cart controlled by voice, phone-sensor gestures and NFC, plus an interactive warehouse map with A* routes. Real time with Socket.IO on Node.js and Express.',
    },
    tags: ['JavaScript', 'Node.js', 'Express', 'Socket.IO', 'Leaflet', 'Web NFC'],
    repo: 'https://github.com/marcosrdiaz/AEKI-Prototipo-interactivo-para-tiendas-fisicas',
    icon: 'shopping',
    accent: '#0ea5e9',
  },
  {
    id: 'xmas',
    title: 'Santa Tracker · Web de Navidad',
    desc: {
      es: 'Sitio navideño con registro de usuarios, cartas a Papá Noel, reserva de viajes, juegos, recetas, villancicos y un mapa con la ruta de Papá Noel (Leaflet). Prototipado en Figma, datos en LocalStorage y atención a contraste y usabilidad.',
      en: "Christmas site with user sign-up, letters to Santa, trip booking, games, recipes, carols and a map with Santa's route (Leaflet). Prototyped in Figma, data in LocalStorage, with attention to contrast and usability.",
    },
    tags: ['HTML', 'CSS', 'JavaScript', 'Leaflet', 'Figma', 'LocalStorage'],
    repo: 'https://github.com/marcosrdiaz/Web-Interactiva-Navidad',
    icon: 'snowflake',
    accent: '#60a5fa',
  },
]

export const skillGroups: { title: T; items: [string, string][] }[] = [
  {
    title: { es: 'Lenguajes', en: 'Languages' },
    items: [['c', 'C'], ['cpp', 'C++'], ['py', 'Python'], ['js', 'JavaScript'], ['ts', 'TypeScript'], ['bash', 'Bash / PowerShell'], ['postgres', 'SQL']],
  },
  {
    title: { es: 'Frontend y apps', en: 'Frontend & apps' },
    items: [['html', 'HTML5'], ['css', 'CSS3'], ['react', 'React / React Native'], ['vue', 'Vue'], ['vite', 'Vite'], ['tailwind', 'Tailwind CSS'], ['expo', 'Expo']],
  },
  {
    title: { es: 'Backend y datos', en: 'Backend & data' },
    items: [['nodejs', 'Node.js'], ['express', 'Express'], ['fastapi', 'FastAPI'], ['flask', 'Flask'], ['postgres', 'PostgreSQL'], ['sqlite', 'SQLite'], ['mongodb', 'MongoDB'], ['supabase', 'Supabase']],
  },
  {
    title: { es: 'Herramientas', en: 'Tooling' },
    items: [['git', 'Git'], ['github', 'GitHub'], ['docker', 'Docker'], ['figma', 'Figma'], ['vscode', 'VS Code'], ['clion', 'CLion'], ['cmake', 'CMake'], ['linux', 'Linux'], ['kali', 'Kali Linux'], ['wikijs', 'Wiki.js']],
  },
]

export const softSkills: { icon: IconKey; label: T }[] = [
  { icon: 'handshake', label: { es: 'Trabajo en equipo', en: 'Teamwork' } },
  { icon: 'message', label: { es: 'Comunicación empática', en: 'Empathetic communication' } },
  { icon: 'puzzle', label: { es: 'Resolución de problemas', en: 'Problem solving' } },
  { icon: 'swords', label: { es: 'Competitividad sana', en: 'Healthy competitiveness' } },
  { icon: 'rocket', label: { es: 'Ambición y ganas de aprender', en: 'Ambition and eagerness to learn' } },
  { icon: 'refresh', label: { es: 'Adaptabilidad', en: 'Adaptability' } },
]

export const funFacts: { icon: IconKey; front: T; back: T }[] = [
  {
    icon: 'code',
    front: { es: 'Programador', en: 'Developer' },
    back: { es: 'Me encanta experimentar con nuevos lenguajes y frameworks por pura diversión.', en: 'I love experimenting with new languages and frameworks just for fun.' },
  },
  {
    icon: 'gamepad',
    front: { es: 'Gamer', en: 'Gamer' },
    back: { es: 'Los juegos competitivos me enseñan lógica, estrategia y a decidir bajo presión.', en: 'Competitive games teach me logic, strategy and deciding under pressure.' },
  },
  {
    icon: 'engine',
    front: { es: 'Motor', en: 'Motorsport' },
    back: { es: 'Sigo la tecnología del motor; su obsesión por la precisión y el rendimiento me inspira al programar.', en: "I follow motorsport tech; its obsession with precision and performance inspires how I code." },
  },
]
