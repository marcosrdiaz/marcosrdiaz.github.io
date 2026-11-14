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
      es: 'Ingeniero Informático por la UC3M y desarrollador en Sensia. Trabajo en el panel web de nuestras cámaras térmicas con IA y en la arquitectura de los distintos sistemas desplegados. Fuera del trabajo: centrado en mis proyectos, apps y webs. De la arquitectura al producto.',
      en: 'Computer Engineer from UC3M and developer at Sensia. I work on the web panel for our AI thermal cameras and on the architecture of the different deployed systems. Outside work: focused on my own projects, apps and websites. From architecture to product.',
    },
    ctaProjects: { es: 'Ver proyectos', en: 'See projects' },
    ctaCv: { es: 'Descargar CV', en: 'Download CV' },
    scroll: { es: 'Desliza', en: 'Scroll' },
  },
  about: {
    kicker: { es: 'Sobre mí', en: 'About me' },
    title: { es: 'Código limpio, interfaces que se sienten vivas.', en: 'Clean code, interfaces that feel alive.' },
    p1: {
      es: 'Soy Marcos, Ingeniero Informático por la UC3M (2022–2026). Hice las prácticas en Sensia, una empresa que diseña y fabrica cámaras infrarrojas y de imagen térmica con IA, y desde septiembre de 2026 trabajo allí a jornada completa en los equipos de Web Panel, Arquitectura de Sistemas y Next-Design.',
      en: "I'm Marcos, a Computer Engineer from UC3M (2022–2026). I did my internship at Sensia, a company that designs and manufactures infrared and thermal-imaging cameras with AI, and since September 2026 I work there full time on the Web Panel, Systems Architecture and Next-Design teams.",
    },
    p2: {
      es: 'Fuera del trabajo construyo apps y webs propias, apoyándome en las herramientas que existen hoy en día. La más reciente es R17, una app de seguimiento de entrenamientos: rutinas, progreso y estadísticas. También me gustan los hackathons y, lejos del código, los videojuegos competitivos y el mundo del motor.',
      en: 'Outside work I build my own apps and websites, leaning on the tools available today. The latest is R17, a workout-tracking app: routines, progress and stats. I also enjoy hackathons and, away from code, competitive video games and motorsport.',
    },
    line: { es: 'Software Developer en Sensia · Ingeniero Informático (UC3M)', en: 'Software Developer at Sensia · Computer Engineer (UC3M)' },
    focus: { es: 'Mi foco', en: 'My focus' },
    focusWeb: { es: 'Web', en: 'Web' },
    focusApps: { es: 'Apps', en: 'Apps' },
    focusSystems: { es: 'Sistemas', en: 'Systems' },
    location: { es: 'Ubicación', en: 'Location' },
    locationValue: { es: 'Toledo · trabajo en Madrid', en: 'Toledo · working in Madrid' },
    hybrid: { es: 'Modalidad híbrida', en: 'Hybrid work' },
    available: { es: 'Abierto a proyectos freelance y colaboraciones', en: 'Open to freelance projects and collaborations' },
    localTime: { es: 'hora local', en: 'local time' },
    now: { es: 'Ahora mismo', en: 'Right now' },
    nowText: { es: 'Software Developer · Web Panel, Arquitectura de Sistemas y Next-Design', en: 'Software Developer · Web Panel, Systems Architecture and Next-Design' },
    languages: { es: 'Idiomas', en: 'Languages' },
    spanish: { es: 'Español · Nativo', en: 'Spanish · Native' },
    english: { es: 'Inglés · B2 First (Cambridge)', en: 'English · B2 First (Cambridge)' },
  },
  experience: {
    kicker: { es: 'Trayectoria', en: 'Journey' },
    title: { es: 'Experiencia y formación', en: 'Experience and education' },
    code: { es: 'Código', en: 'Code' },
    filtersLabel: { es: 'Filtrar la trayectoria', en: 'Filter the timeline' },
    filters: {
      all: { es: 'Todo', en: 'All' },
      work: { es: 'Trabajo', en: 'Work' },
      edu: { es: 'Formación', en: 'Education' },
      hackathon: { es: 'Hackathons', en: 'Hackathons' },
    },
  },
  projects: {
    kicker: { es: 'Trabajo seleccionado', en: 'Selected work' },
    title: { es: 'Proyectos destacados', en: 'Featured projects' },
    private: { es: 'Privado', en: 'Private' },
    code: { es: 'Código', en: 'Code' },
    more: { es: 'Más en GitHub', en: 'More on GitHub' },
    details: { es: 'Ver detalles', en: 'View details' },
    close: { es: 'Cerrar', en: 'Close' },
    problem: { es: 'El problema', en: 'The problem' },
    role: { es: 'Qué hice', en: 'What I did' },
    decisions: { es: 'Decisiones técnicas', en: 'Technical decisions' },
    stack: { es: 'Stack', en: 'Stack' },
    gallery: { es: 'Capturas', en: 'Screenshots' },
    viewCode: { es: 'Ver el código en GitHub', en: 'View the code on GitHub' },
    privateRepo: { es: 'Repositorio privado', en: 'Private repository' },
  },
  skills: {
    kicker: { es: 'Herramientas', en: 'Toolbox' },
    title: { es: 'Mi stack', en: 'My stack' },
    soft: { es: 'Soft skills', en: 'Soft skills' },
  },
  fun: {
    kicker: { es: 'Más allá del código', en: 'Beyond code' },
    title: { es: 'Curiosidades', en: 'Fun facts' },
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
    average: { es: 'Media', en: 'Average' },
    attempts: { es: 'Últimos intentos', en: 'Latest attempts' },
    grid: { es: 'Parrilla de salida', en: 'Starting grid' },
    you: { es: 'Tú', en: 'You' },
    startFrom: { es: 'Saldrías', en: "You'd start" },
    reference: { es: 'Tiempos de referencia orientativos, sin pilotos reales.', en: 'Indicative reference times, no real drivers.' },
    share: { es: 'Copiar resultado', en: 'Copy result' },
    shared: { es: 'Resultado copiado', en: 'Result copied' },
    shareText: { es: 'Mi reacción en el test F1: {ms} ms, saldría {pos} ({tier}). ¿Y la tuya?', en: 'My reaction in the F1 test: {ms} ms, I would start {pos} ({tier}). What about yours?' },
    tiers: {
      pole: { es: 'Pole', en: 'Pole' },
      podium: { es: 'Podio', en: 'Podium' },
      points: { es: 'Puntos', en: 'Points' },
      midfield: { es: 'Mitad de parrilla', en: 'Midfield' },
      back: { es: 'Fondo de parrilla', en: 'Back of the grid' },
      safety: { es: 'Te adelanta el safety car', en: 'The safety car passes you' },
    },
  },
  contact: {
    kicker: { es: 'Contacto', en: 'Contact' },
    title: { es: '¿Hablamos?', en: "Let's talk" },
    text: { es: 'Siempre abierto a conocer gente, ideas y proyectos interesantes. Escríbeme y te respondo.', en: 'Always happy to meet people and hear about interesting ideas and projects. Drop me a line.' },
    copy: { es: 'Copiar email', en: 'Copy email' },
    copied: { es: 'Email copiado', en: 'Email copied' },
    cvHandle: { es: 'Descargar PDF', en: 'Download PDF' },
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
    close: { es: 'Cerrar la paleta de comandos', en: 'Close the command palette' },
    groups: {
      nav: { es: 'Navegación', en: 'Navigation' },
      actions: { es: 'Acciones', en: 'Actions' },
      links: { es: 'Enlaces', en: 'Links' },
    },
  },
  skip: { es: 'Saltar al contenido', en: 'Skip to content' },
  konami: { es: '¡Código Konami! Modo carrera activado', en: 'Konami code! Race mode on' },
} satisfies Record<string, unknown>

export type Experience = {
  role: T
  org: string | T
  period: T
  current?: boolean
  kind: 'work' | 'edu' | 'hackathon'
  /** YYYY-MM of the start date, used for reverse-chronological order */
  date: string
  /** Public repository, shown as a "Code" link on the card */
  repo?: string
  desc: T
  tags: string[]
}

export const experience: Experience[] = [
  {
    role: { es: 'Software Developer', en: 'Software Developer' },
    org: 'Sensia',
    period: { es: 'Sep 2026 — Actualidad', en: 'Sep 2026 — Present' },
    current: true,
    date: '2026-09',
    kind: 'work',
    desc: {
      es: 'Trabajo en tres equipos: Web Panel, Arquitectura de Sistemas y Next-Design. En Web Panel trabajo en el panel web para configurar y monitorizar cámaras térmicas con IA (edge computing). En los otros dos defino patrones de arquitectura y optimizo el rendimiento de las aplicaciones con Python, C++ y tecnologías web.',
      en: 'I work across three teams: Web Panel, Systems Architecture and Next-Design. On Web Panel I work on the web panel to configure and monitor AI thermal cameras (edge computing). On the other two I define architecture patterns and tune application performance with Python, C++ and web technologies.',
    },
    tags: ['C++', 'JavaScript', 'HTML', 'CSS', 'Edge computing'],
  },
  {
    role: { es: 'Participante · Hack Finance 2026', en: 'Participant · Hack Finance 2026' },
    org: 'BEST UC3M',
    period: { es: '8 — 11 nov 2026', en: '8 — 11 Nov 2026' },
    date: '2026-11',
    kind: 'hackathon',
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
    date: '2026-02',
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
    date: '2026-04',
    kind: 'hackathon',
    desc: {
      es: 'Hackathon cuyo reto era desarrollar un plugin que ayudara a los desarrolladores a programar mejor. Hicimos GhostCommit, un plugin de IntelliJ IDEA (Kotlin) que muestra en el editor la actividad de los compañeros en tiempo real: ediciones «fantasma», solapamientos en las mismas líneas o archivos y un panel de colaboradores. Los eventos de edición pasan por un servidor WebSocket en Node.js, desplegado en Railway, que los redistribuye entre los clientes conectados. Reduce choques de trabajo y mejora la coordinación en sesiones de pair o mob programming.',
      en: 'A hackathon whose challenge was to build a plugin that helps developers code better. We made GhostCommit, an IntelliJ IDEA plugin (Kotlin) that shows teammates\' activity in the editor in real time: "ghost" edits, overlaps on the same lines or files and a collaborators panel. Edit events go through a Node.js WebSocket server, deployed on Railway, that redistributes them to the connected clients. It reduces clashing work and improves coordination in pair or mob programming sessions.',
    },
    tags: ['Kotlin', 'IntelliJ Platform', 'Node.js', 'WebSocket', 'Railway'],
    repo: 'https://github.com/mroldanmatea/GhostCommitPlugin',
  },
  {
    role: { es: 'Grado en Ingeniería Informática', en: "Bachelor's in Computer Engineering" },
    org: 'Universidad Carlos III de Madrid',
    period: { es: '2022 — 2026', en: '2022 — 2026' },
    date: '2022-09',
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
    date: '2023-06',
    kind: 'edu',
    desc: {
      es: 'Certificado oficial de inglés de nivel B2.',
      en: 'Official B2-level English certificate.',
    },
    tags: ['English'],
  },
]

// current position pinned on top, the rest in reverse-chronological order (filters keep this order)
experience.sort((a, b) => Number(!!b.current) - Number(!!a.current) || b.date.localeCompare(a.date))

export type ProjectImage = { src: string; width: number; height: number; alt: T }

export type Project = {
  id: string
  title: string
  desc: T
  highlights?: T[]
  tags: string[]
  repo?: string
  private?: boolean
  /** feature: full-width card with image/placeholder top-right; strip: compact full-width row; card: regular third-width card */
  layout: 'feature' | 'strip' | 'card'
  /** Real screenshots (webp in public/projects/<id>/); the first one is the card image. Without them, feature cards show the PhoneMock placeholder: to swap in real screenshots, drop the WebP files in public/projects/<id>/ and list them here. */
  images?: ProjectImage[]
  /** Content of the detail modal. `role` is omitted when it has not been confirmed. */
  detail: { problem: T; role?: T; decisions: T[] }
  icon: IconKey
  accent: string
}

export const projects: Project[] = [
  {
    id: 'kairos',
    layout: 'feature',
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
    images: [
      {
        src: '/projects/kairos/home.webp', width: 1600, height: 900,
        alt: { es: 'Pantalla de inicio de KAIROS con la evolución de la cartera, el estado actual, las noticias que más la mueven y el asistente', en: 'KAIROS home screen with portfolio evolution, current status, the news that move it most and the assistant' },
      },
    ],
    detail: {
      problem: {
        es: 'Un inversor particular lee que el BCE mueve los tipos o que el petróleo sube, pero no sabe qué significa eso para su cartera. KAIROS lo traduce a euros, con un rango, un nivel de confianza y la traza de cada cifra.',
        en: 'A retail investor reads that the ECB moves rates or that oil is up, but cannot tell what it means for their portfolio. KAIROS translates it into euros, with a range, a confidence level and the trace of every figure.',
      },
      role: {
        es: 'Lo desarrollamos los cinco miembros del equipo en conjunto durante las 72 horas del hackathon Hack Finance (BEST UC3M), sin partes asignadas a nadie.',
        en: 'The five of us built it together during the 72 hours of the Hack Finance hackathon (BEST UC3M), with no parts assigned to anyone.',
      },
      decisions: [
        { es: 'La IA nunca calcula cifras: todo número sale del gestor de cartera o del motor de impacto, que son deterministas. Claude solo redacta.', en: 'The AI never computes figures: every number comes from the portfolio manager or the impact engine, both deterministic. Claude only writes.' },
        { es: 'Un guardián revisa cada texto y bloquea las recomendaciones de compra o venta: contexto, no órdenes.', en: 'A guardian checks every text and blocks buy or sell recommendations: context, not orders.' },
        { es: 'Cada cifra enlaza a su traza, con sus entradas, su fórmula y sus fuentes.', en: 'Every figure links to its trace, with inputs, formula and sources.' },
        { es: 'Funciona sin claves de IA: en ese caso usa plantillas con los mismos datos del motor.', en: 'It works without AI keys: it then falls back to templates fed by the same engine data.' },
        { es: 'Todo el sistema (PostgreSQL, backend y frontend) arranca con Docker Compose.', en: 'The whole system (PostgreSQL, backend and frontend) starts with Docker Compose.' },
      ],
    },
    icon: 'trending',
    accent: '#f5b82e',
  },
  {
    id: 'training',
    layout: 'feature',
    title: 'R17',
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
    detail: {
      problem: {
        es: 'Quería una app para registrar mis entrenamientos serie a serie, rápida de usar en mitad del entreno y que funcionara sin conexión.',
        en: 'I wanted an app to log my workouts set by set, quick to use mid-session and working without a connection.',
      },
      role: {
        es: 'Proyecto personal: diseño y desarrollo completos.',
        en: 'Personal project: full design and development.',
      },
      decisions: [
        { es: 'Registro serie a serie a pantalla completa, pensado para usarse durante el entreno.', en: 'Full-screen set-by-set logging, designed to be used during the workout.' },
        { es: 'Offline-first: el entreno activo se guarda en SQLite y no depende de la red.', en: 'Offline-first: the active workout is stored in SQLite and never depends on the network.' },
        { es: 'Récords personales automáticos y sugerencia de peso a partir del histórico.', en: 'Automatic personal records and weight suggestions based on history.' },
        { es: 'Rutinas compartidas protegidas con Row Level Security en Supabase.', en: 'Shared routines protected with Row Level Security on Supabase.' },
      ],
    },
    icon: 'dumbbell',
    accent: '#3b82f6',
  },
  {
    id: 'wiki',
    layout: 'strip',
    title: 'Wiki corporativa · Sensia',
    desc: {
      es: 'Implanté con Wiki.js la wiki del departamento de Software de Sensia, punto central de información sobre áreas, productos y proyectos. Desarrollé además un servicio web que detecta enlaces rotos en la wiki, base de mi TFG.',
      en: "Rolled out the Software department's wiki at Sensia on Wiki.js, the central hub for information on areas, products and projects. I also built a web service that detects broken links in the wiki, the basis of my thesis.",
    },
    tags: ['Wiki.js', 'Node.js', 'Express', 'Documentación', 'Testing'],
    private: true,
    detail: {
      problem: {
        es: 'El departamento de Software necesitaba un punto central de información sobre sus áreas, productos y proyectos, y una forma de detectar los enlaces rotos que aparecen en una wiki con el tiempo.',
        en: 'The Software department needed a central hub for information on its areas, products and projects, and a way to detect the broken links that build up in a wiki over time.',
      },
      role: {
        es: 'Implanté la wiki con Wiki.js durante mis prácticas y desarrollé el servicio de detección de enlaces rotos. Fue la base de mi TFG: «Implantación de un sistema de gestión del conocimiento en el área de software de una scale-up tecnológica».',
        en: 'I rolled out the wiki on Wiki.js during my internship and built the broken-link detection service. It was the basis of my thesis: "Implementing a knowledge-management system in the software area of a tech scale-up".',
      },
      decisions: [
        { es: 'Servicio web en Node.js y Express construido sobre wikijs-cli.', en: 'Web service in Node.js and Express built on top of wikijs-cli.' },
        { es: 'wikijs-cli se ejecuta como proceso hijo con child_process.spawn.', en: 'wikijs-cli runs as a child process through child_process.spawn.' },
        { es: 'Plan de pruebas de 41 casos.', en: 'A 41-case test plan.' },
      ],
    },
    icon: 'book',
    accent: '#22d3ee',
  },
  {
    id: 'bets',
    layout: 'card',
    title: 'Web de apuestas cifrada',
    desc: {
      es: 'Plataforma web de apuestas deportivas con criptografía aplicada: derivación de claves con Scrypt, cifrado AES-GCM de datos sensibles, firma digital RSA y certificados X.509 gestionados con OpenSSL. Backend en Flask.',
      en: 'Sports-betting web platform with applied cryptography: Scrypt key derivation, AES-GCM encryption of sensitive data, RSA digital signatures and X.509 certificates managed with OpenSSL. Flask backend.',
    },
    tags: ['Python', 'Flask', 'AES-GCM', 'RSA', 'Scrypt', 'OpenSSL'],
    repo: 'https://github.com/marcosrdiaz/Web-de-apuestas-cifrada',
    images: [
      { src: '/projects/bets/futbol.webp', width: 1200, height: 750, alt: { es: 'Página de apuestas de fútbol con tres partidos y el panel de apuestas del usuario', en: 'Football betting page with three matches and the user bet panel' } },
      { src: '/projects/bets/home.webp', width: 1200, height: 750, alt: { es: 'Página de inicio con las secciones de fútbol, baloncesto, tenis e hípica', en: 'Home page with the football, basketball, tennis and horse-racing sections' } },
    ],
    detail: {
      problem: {
        es: 'Proyecto de criptografía: una plataforma de apuestas deportivas en la que el registro, los datos de los usuarios y las apuestas tienen que estar protegidos.',
        en: 'Cryptography project: a sports-betting platform where sign-up, user data and bets must be protected.',
      },
      role: {
        es: 'Práctica de la UC3M hecha en pareja.',
        en: 'UC3M coursework done in a pair.',
      },
      decisions: [
        { es: 'Las contraseñas no se guardan: se deriva una clave con Scrypt.', en: 'Passwords are never stored: a key is derived with Scrypt.' },
        { es: 'Los datos sensibles se cifran con AES en modo GCM, que además autentica el contenido.', en: 'Sensitive data is encrypted with AES in GCM mode, which also authenticates the content.' },
        { es: 'Firma digital RSA-PSS con SHA-256 para garantizar integridad y autoría.', en: 'RSA-PSS digital signatures with SHA-256 to guarantee integrity and authorship.' },
        { es: 'Certificados X.509 emitidos por una autoridad de certificación propia montada con OpenSSL.', en: 'X.509 certificates issued by a custom certificate authority set up with OpenSSL.' },
      ],
    },
    icon: 'lock',
    accent: '#6366f1',
  },
  {
    id: 'aeki',
    layout: 'card',
    title: 'AEKI · Prototipo para tiendas',
    desc: {
      es: 'Prototipo para mejorar la compra en tienda física: catálogo y carrito controlables por voz, gestos con los sensores del móvil y NFC, más un mapa interactivo del almacén con rutas calculadas con A*. Tiempo real con Socket.IO sobre Node.js y Express.',
      en: 'Prototype to improve in-store shopping: catalogue and cart controlled by voice, phone-sensor gestures and NFC, plus an interactive warehouse map with A* routes. Real time with Socket.IO on Node.js and Express.',
    },
    tags: ['JavaScript', 'Node.js', 'Express', 'Socket.IO', 'Leaflet', 'Web NFC'],
    repo: 'https://github.com/marcosrdiaz/AEKI-Prototipo-interactivo-para-tiendas-fisicas',
    images: [
      { src: '/projects/aeki/catalogo.webp', width: 1200, height: 750, alt: { es: 'Catálogo de productos con el modo de entrada por voz activo', en: 'Product catalogue with voice input mode active' } },
      { src: '/projects/aeki/mapa.webp', width: 1200, height: 750, alt: { es: 'Localizador de productos con el plano del almacén', en: 'Product locator with the warehouse floor plan' } },
    ],
    detail: {
      problem: {
        es: 'Mejorar la experiencia de compra en una tienda física: consultar el catálogo, gestionar el carrito y encontrar cada producto en el almacén.',
        en: 'Improving the shopping experience in a physical store: browsing the catalogue, managing the cart and finding each product in the warehouse.',
      },
      role: {
        es: 'Práctica de la UC3M hecha en equipo.',
        en: 'UC3M coursework done as a team.',
      },
      decisions: [
        { es: 'Tres modos de entrada: voz (SpeechRecognition), gestos con los sensores del móvil (DeviceMotion) y NFC (Web NFC).', en: 'Three input modes: voice (SpeechRecognition), gestures through phone sensors (DeviceMotion) and NFC (Web NFC).' },
        { es: 'Plano del almacén con Leaflet y rutas hasta los productos calculadas con A*.', en: 'Warehouse floor plan with Leaflet and routes to the products computed with A*.' },
        { es: 'Comunicación en tiempo real con Socket.IO sobre un servidor Node.js y Express.', en: 'Real-time communication with Socket.IO on a Node.js and Express server.' },
      ],
    },
    icon: 'shopping',
    accent: '#0ea5e9',
  },
  {
    id: 'xmas',
    layout: 'card',
    title: 'Santa Tracker · Web de Navidad',
    desc: {
      es: 'Sitio navideño con registro de usuarios, cartas a Papá Noel, reserva de viajes, galería, recetas, juegos, villancicos y un mapa interactivo con la ruta de Papá Noel (Leaflet). HTML, CSS y JavaScript sin frameworks, con los datos de usuario en LocalStorage.',
      en: "Christmas site with user sign-up, letters to Santa, trip booking, gallery, recipes, games, carols and an interactive map with Santa's route (Leaflet). Plain HTML, CSS and JavaScript, with user data in LocalStorage.",
    },
    tags: ['HTML', 'CSS', 'JavaScript', 'Leaflet', 'LocalStorage'],
    repo: 'https://github.com/marcosrdiaz/Web-Interactiva-Navidad',
    images: [
      { src: '/projects/xmas/home.webp', width: 1200, height: 750, alt: { es: 'Portada de la web con el menú de secciones y el titular Sigue a Papá Noel', en: 'Site home with the section menu and the headline Follow Santa' } },
      { src: '/projects/xmas/mapa.webp', width: 1200, height: 750, alt: { es: 'Mapa interactivo con el trineo de Papá Noel sobre el mapamundi', en: "Interactive map with Santa's sleigh over the world map" } },
      { src: '/projects/xmas/carta.webp', width: 1200, height: 750, alt: { es: 'Formulario para escribir la carta a Papá Noel', en: 'Form to write the letter to Santa' } },
    ],
    detail: {
      problem: {
        es: 'Una web navideña interactiva con muchas secciones distintas en una sola página: seguir a Papá Noel, escribirle, reservar un viaje, jugar o escuchar villancicos.',
        en: 'An interactive Christmas site with many different sections on a single page: follow Santa, write to him, book a trip, play or listen to carols.',
      },
      role: {
        es: 'Práctica de la UC3M hecha en equipo.',
        en: 'UC3M coursework done as a team.',
      },
      decisions: [
        { es: 'HTML, CSS y JavaScript sin frameworks, con un script por sección.', en: 'Plain HTML, CSS and JavaScript, with one script per section.' },
        { es: 'Mapa interactivo con Leaflet para la ruta de Papá Noel.', en: "Interactive map with Leaflet for Santa's route." },
        { es: 'Usuarios, cartas y reservas guardados en LocalStorage, sin backend.', en: 'Users, letters and bookings stored in LocalStorage, with no backend.' },
      ],
    },
    icon: 'snowflake',
    accent: '#60a5fa',
  },
]

export const skillGroups: { title: T; items: [string, string][] }[] = [
  {
    title: { es: 'Lenguajes', en: 'Languages' },
    items: [['c', 'C'], ['cpp', 'C++'], ['py', 'Python'], ['js', 'JavaScript'], ['ts', 'TypeScript'], ['bash', 'Bash / PowerShell'], ['sql', 'SQL']],
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

export const softSkills: { icon: IconKey; title: T; text: T }[] = [
  {
    icon: 'handshake',
    title: { es: 'Trabajo en equipo', en: 'Teamwork' },
    text: { es: 'Hack Finance 2026', en: 'Hack Finance 2026' },
  },
  {
    icon: 'message',
    title: { es: 'Comunicación', en: 'Communication' },
    text: { es: 'Wiki corporativa de Sensia', en: 'Sensia corporate wiki' },
  },
  {
    icon: 'puzzle',
    title: { es: 'Resolución de problemas', en: 'Problem solving' },
    text: { es: 'Detector de enlaces rotos', en: 'Broken-link detector' },
  },
  {
    icon: 'swords',
    title: { es: 'Competitividad sana', en: 'Healthy competitiveness' },
    text: { es: 'Videojuegos y hackathons', en: 'Video games and hackathons' },
  },
  {
    icon: 'rocket',
    title: { es: 'Ambición y ganas de aprender', en: 'Ambition and eagerness to learn' },
    text: { es: 'De prácticas a contrato en Sensia', en: 'From internship to contract at Sensia' },
  },
  {
    icon: 'refresh',
    title: { es: 'Adaptabilidad', en: 'Adaptability' },
    text: { es: 'Tres equipos en Sensia', en: 'Three teams at Sensia' },
  },
]

export const funFacts: { icon: IconKey; accent: string; title: T; text: T }[] = [
  {
    icon: 'engine',
    accent: '#ef4444',
    title: { es: 'Motor y F1', en: 'Motorsport and F1' },
    text: { es: 'Mi referente como piloto es Fernando Alonso y Suzuka es uno de los circuitos en los que me gustaría presenciar una carrera.', en: 'My role model as a driver is Fernando Alonso, and Suzuka is one of the circuits where I would like to watch a race.' },
  },
  {
    icon: 'gamepad',
    accent: '#a855f7',
    title: { es: 'Videojuegos competitivos', en: 'Competitive gaming' },
    text: { es: 'Los juegos competitivos me enseñan lógica, estrategia y a decidir bajo presión.', en: 'Competitive games teach me logic, strategy and deciding under pressure.' },
  },
  {
    icon: 'lightbulb',
    accent: '#22d3ee',
    title: { es: 'Proyectos con IA', en: 'Projects with AI' },
    text: { es: 'Hago apps y webs propias apoyándome en los avances de la IA. La última es R17.', en: 'I build my own apps and websites leaning on the advances in AI. The latest is R17.' },
  },
  {
    icon: 'globe',
    accent: '#f59e0b',
    title: { es: 'Brighton', en: 'Brighton' },
    text: { es: 'Dos semanas de homestay en Brighton, Inglaterra.', en: 'Two weeks of homestay in Brighton, England.' },
  },
]
