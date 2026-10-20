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
    badge: { es: 'Software Developer en SENSIA', en: 'Software Developer at SENSIA' },
    hello: { es: 'Hola, soy', en: "Hi, I'm" },
    iBuild: { es: 'Construyo', en: 'I build' },
    roles: {
      es: ['experiencias web', 'apps móviles', 'arquitectura de software', 'C++ de alto rendimiento'],
      en: ['web experiences', 'mobile apps', 'software architecture', 'high-performance C++'],
    },
    blurb: {
      es: 'Ingeniero Informático. Diseño, desarrollo e implanto software en los equipos de Arquitectura de Sistemas y Next-Design de SENSIA.',
      en: "Computer Engineer. I design, build and ship software on SENSIA's Systems Architecture and Next-Design teams.",
    },
    ctaProjects: { es: 'Ver proyectos', en: 'See projects' },
    ctaCv: { es: 'Descargar CV', en: 'Download CV' },
    scroll: { es: 'Desliza', en: 'Scroll' },
  },
  about: {
    kicker: { es: 'Sobre mí', en: 'About me' },
    title: { es: 'Código limpio, interfaces que se sienten vivas.', en: 'Clean code, interfaces that feel alive.' },
    p1: {
      es: 'Soy Marcos, Ingeniero Informático (2022 – 2026) y desarrollador de software en SENSIA. Lo que más disfruto es el desarrollo web y de apps: llevar una idea desde la arquitectura hasta un producto rápido, cuidado y agradable de usar.',
      en: "I'm Marcos, a Computer Engineer (2022 – 2026) and software developer at SENSIA. What I enjoy most is web and app development: taking an idea from architecture all the way to a fast, polished product people enjoy using.",
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
    nowText: { es: 'Software Developer · Arquitectura de Sistemas & Next-Design', en: 'Software Developer · Systems Architecture & Next-Design' },
    languages: { es: 'Idiomas', en: 'Languages' },
    spanish: { es: 'Español · Nativo', en: 'Spanish · Native' },
    english: { es: 'Inglés · B2 First (Cambridge)', en: 'English · B2 First (Cambridge)' },
    hackathon: { es: 'Participante en', en: 'Participant at' },
    degree: { es: 'Grado en Ingeniería Informática', en: "Bachelor's in Computer Engineering" },
  },
  experience: {
    kicker: { es: 'Trayectoria', en: 'Journey' },
    title: { es: 'Experiencia & formación', en: 'Experience & education' },
    present: { es: 'Actualidad', en: 'Present' },
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
    jump: { es: '¡Salida en falso! 🚩', en: 'Jump start! 🚩' },
    again: { es: 'Otra vez', en: 'Try again' },
    best: { es: 'Mejor', en: 'Best' },
    verdictPro: { es: 'Nivel piloto de F1 🏆', en: 'F1 driver level 🏆' },
    verdictGood: { es: 'Muy buenos reflejos 🔥', en: 'Great reflexes 🔥' },
    verdictOk: { es: 'Nada mal, ¡sigue entrenando! 🏎️', en: 'Not bad, keep training! 🏎️' },
  },
  contact: {
    kicker: { es: 'Contacto', en: 'Contact' },
    title: { es: '¿Hablamos?', en: "Let's talk" },
    text: { es: 'Siempre abierto a conocer gente, ideas y proyectos interesantes. Escríbeme y te respondo.', en: "Always happy to meet people and hear about interesting ideas and projects. Drop me a line." },
    copy: { es: 'Copiar email', en: 'Copy email' },
    copied: { es: 'Email copiado 📋', en: 'Email copied 📋' },
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
  konami: { es: '🏁 ¡Código Konami! Modo carrera activado', en: '🏁 Konami code! Race mode on' },
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
    org: 'SENSIA',
    period: { es: 'Sep 2026 — Actualidad', en: 'Sep 2026 — Present' },
    current: true,
    kind: 'work',
    desc: {
      es: 'Equipos de Arquitectura de Sistemas y Next-Design. Diseño, desarrollo e implantación de soluciones software con C++ y tecnologías web. Defino patrones de arquitectura y trabajo en la optimización estructural y el rendimiento continuo de las aplicaciones de la empresa.',
      en: "Systems Architecture and Next-Design teams. I design, build and ship software solutions with C++ and web technologies, define architecture patterns and work on the structural optimisation and ongoing performance of the company's applications.",
    },
    tags: ['C++', 'HTML', 'CSS', 'JavaScript', 'Software architecture', 'Performance'],
  },
  {
    role: { es: 'Prácticas de desarrollo de software', en: 'Software Development Intern' },
    org: 'SENSIA',
    period: { es: 'Feb 2026 — Jul 2026', en: 'Feb 2026 — Jul 2026' },
    kind: 'work',
    desc: {
      es: 'Prácticas del segundo cuatrimestre. Perfeccioné e implanté la Wiki corporativa del departamento de Software, el punto central de información sobre todas las áreas, productos y proyectos de la empresa.',
      en: "Final-semester internship. I refined and rolled out the Software department's corporate wiki, the single source of truth for every area, product and project in the company.",
    },
    tags: ['Wiki', 'Documentation', 'Web'],
  },
  {
    role: { es: 'Grado en Ingeniería Informática', en: "Bachelor's in Computer Engineering" },
    org: 'Universidad Carlos III de Madrid',
    period: { es: '2022 — 2026', en: '2022 — 2026' },
    kind: 'edu',
    desc: {
      es: 'Desarrollo web y de software, programación orientada a objetos, sistemas operativos y concurrencia, bases de datos, redes y criptografía.',
      en: 'Web and software development, object-oriented programming, operating systems and concurrency, databases, networking and cryptography.',
    },
    tags: ['C', 'C++', 'Python', 'SQL', 'OOP', 'Crypto'],
  },
  {
    role: { es: 'B2 First · Cambridge English', en: 'B2 First · Cambridge English' },
    org: 'Cambridge',
    period: { es: 'Certificación', en: 'Certification' },
    kind: 'award',
    desc: {
      es: 'Certificado oficial de inglés de nivel B2.',
      en: 'Official B2-level English certificate.',
    },
    tags: ['English'],
  },
  {
    role: { es: 'Participante', en: 'Participant' },
    org: 'BE.HACKATHON',
    period: { es: 'Hackathon', en: 'Hackathon' },
    kind: 'award',
    desc: {
      es: 'Desarrollo de una solución en equipo y contrarreloj.',
      en: 'Building a solution as a team, against the clock.',
    },
    tags: ['Teamwork', 'Prototyping'],
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
  icon: string
  accent: string
}

export const projects: Project[] = [
  {
    id: 'training',
    title: 'Training Tracker App',
    desc: {
      es: 'App personal de seguimiento de entrenamientos: rutinas, calendario, progresión y estadísticas, logros y amigos.',
      en: 'Personal workout-tracking app: routines, calendar, progress and stats, achievements and friends.',
    },
    highlights: [
      { es: 'Modo offline real para el entreno activo', en: 'True offline mode for active workouts' },
      { es: 'Supabase: Postgres + Auth + Row Level Security', en: 'Supabase: Postgres + Auth + Row Level Security' },
      { es: 'React Native + Expo (SDK 57)', en: 'React Native + Expo (SDK 57)' },
    ],
    tags: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'Postgres', 'Offline-first'],
    private: true,
    featured: true,
    icon: '🏋️',
    accent: '#3b82f6',
  },
  {
    id: 'wiki',
    title: 'Wiki corporativa · SENSIA',
    desc: {
      es: 'Perfeccioné e implanté la Wiki del departamento de Software: el punto central de información sobre las áreas, productos y proyectos de SENSIA.',
      en: "Refined and rolled out the Software department's wiki: the central hub for information on SENSIA's areas, products and projects.",
    },
    tags: ['Web', 'Knowledge base', 'UX'],
    private: true,
    icon: '📚',
    accent: '#22d3ee',
  },
  {
    id: 'bets',
    title: 'Web de apuestas cifrada',
    desc: {
      es: 'Web de apuestas deportivas con varias capas de cifrado: SHA-256 y bcrypt para contraseñas, y AES y RSA para proteger datos y comunicaciones.',
      en: 'Sports-betting site with layered cryptography: SHA-256 and bcrypt for passwords, AES and RSA to protect data and communications.',
    },
    tags: ['JavaScript', 'AES', 'RSA', 'bcrypt', 'SHA-256'],
    repo: 'https://github.com/marcosrdiaz/Web-de-apuestas-cifrada',
    icon: '🔐',
    accent: '#6366f1',
  },
  {
    id: 'aeki',
    title: 'AEKI · Prototipo para tiendas',
    desc: {
      es: 'App web/móvil que mejora la experiencia de compra en tienda física con gestos, voz y NFC. Integración de APIs, rutas y arquitectura cliente-servidor.',
      en: 'Web/mobile app that improves the in-store shopping experience with gestures, voice and NFC. API integration, routing and client-server architecture.',
    },
    tags: ['JavaScript', 'NFC', 'Voice', 'Gestures', 'Node.js'],
    repo: 'https://github.com/marcosrdiaz/AEKI-Prototipo-interactivo-para-tiendas-fisicas',
    icon: '🛍️',
    accent: '#0ea5e9',
  },
  {
    id: 'xmas',
    title: 'Web interactiva de Navidad',
    desc: {
      es: 'Experiencia navideña con animaciones, música, efectos visuales y minijuegos, hecha con HTML, CSS y JavaScript.',
      en: 'Festive experience with animations, music, visual effects and mini-games, built with HTML, CSS and JavaScript.',
    },
    tags: ['HTML', 'CSS', 'JavaScript', 'Animations'],
    repo: 'https://github.com/marcosrdiaz/Web-Interactiva-Navidad',
    icon: '🎄',
    accent: '#60a5fa',
  },
]

export const skillGroups: { title: T; items: [string, string][] }[] = [
  {
    title: { es: 'Lenguajes', en: 'Languages' },
    items: [['c', 'C'], ['cpp', 'C++'], ['py', 'Python'], ['js', 'JavaScript'], ['ts', 'TypeScript'], ['postgres', 'SQL']],
  },
  {
    title: { es: 'Web & apps', en: 'Web & apps' },
    items: [['html', 'HTML5'], ['css', 'CSS3'], ['react', 'React / React Native'], ['nodejs', 'Node.js'], ['flask', 'Flask'], ['supabase', 'Supabase'], ['mongodb', 'MongoDB']],
  },
  {
    title: { es: 'Herramientas', en: 'Tooling' },
    items: [['git', 'Git'], ['github', 'GitHub'], ['docker', 'Docker'], ['figma', 'Figma'], ['vscode', 'VS Code'], ['clion', 'CLion'], ['cmake', 'CMake'], ['linux', 'Linux'], ['kali', 'Kali Linux']],
  },
]

export const softSkills: T[] = [
  { es: '🤝 Trabajo en equipo', en: '🤝 Teamwork' },
  { es: '🗣️ Comunicación empática', en: '🗣️ Empathetic communication' },
  { es: '🧩 Resolución de problemas', en: '🧩 Problem solving' },
  { es: '🏁 Competitividad sana', en: '🏁 Healthy competitiveness' },
  { es: '🚀 Ambición y ganas de aprender', en: '🚀 Ambition and eagerness to learn' },
  { es: '🔄 Adaptabilidad', en: '🔄 Adaptability' },
]

export const funFacts: { icon: string; front: T; back: T }[] = [
  {
    icon: '💻',
    front: { es: 'Programador', en: 'Developer' },
    back: { es: 'Me encanta experimentar con nuevos lenguajes y frameworks por pura diversión.', en: 'I love experimenting with new languages and frameworks just for fun.' },
  },
  {
    icon: '🎮',
    front: { es: 'Gamer', en: 'Gamer' },
    back: { es: 'Los juegos competitivos me enseñan lógica, estrategia y a decidir bajo presión.', en: 'Competitive games teach me logic, strategy and deciding under pressure.' },
  },
  {
    icon: '🏎️',
    front: { es: 'Motor', en: 'Motorsport' },
    back: { es: 'Sigo la tecnología del motor; su obsesión por la precisión y el rendimiento me inspira al programar.', en: "I follow motorsport tech; its obsession with precision and performance inspires how I code." },
  },
]
