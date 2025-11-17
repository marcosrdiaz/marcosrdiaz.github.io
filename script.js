// ---------- CONFIGURACIÓN ----------
const GITHUB_USERNAME = 'marcosrdiaz';
const FEATURED_REPOS = [
  'Web-de-apuestas-cifrada',
  'Web-Interactiva-Navidad',
  'AEKI-Prototipo-interactivo-para-tiendas-fisicas',
  'Programacion-Concurrente-en-C'
];
const LINKEDIN_URL = 'https://linkedin.com/in/marcos-rodrigo-diaz';
const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`;
const EMAIL = 'marcosrodrigodiaz@gmail.com';
const CV_URL = '/sources/cv.pdf';
// -----------------------------------

// 🧩 Actualizamos solo los atributos href sin borrar iconos
document.getElementById('githubLink').setAttribute('href', GITHUB_URL);
document.getElementById('linkedinLink').setAttribute('href', LINKEDIN_URL);
document.getElementById('emailLink').setAttribute('href', `mailto:${EMAIL}`);
document.getElementById('phoneLink').setAttribute('href', 'tel:+34626912083');
document.getElementById('downloadCvBtn').setAttribute('href', CV_URL);

// 🧩 Actualizamos solo el texto después del icono
document.getElementById('githubLink').lastChild.textContent = ' ' + GITHUB_USERNAME;
document.getElementById('emailLink').lastChild.textContent = ' ' + EMAIL;

// 🗓️ Fecha de actualización (si existe el elemento)
const updated = document.getElementById('updatedDate');
if (updated) updated.textContent = new Date().toLocaleDateString('es-ES');

// ---------- GESTIÓN DE REPOSITORIOS ----------
async function fetchRepos() {
  try {
    const resp = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
    if (!resp.ok) throw new Error('No se pudo obtener repositorios');
    const repos = await resp.json();

    // Solo los que están en FEATURED_REPOS y en el mismo orden
    const featured = FEATURED_REPOS.map(name =>
      repos.find(r => r.name === name)
    ).filter(Boolean); // elimina los que no existan realmente

    // Si no hay resultados, mostramos placeholder
    if (featured.length === 0) {
      showPlaceholderProjects();
    } else {
      renderProjects(featured);
    }
  } catch (e) {
    console.error(e);
    showPlaceholderProjects();
  }
}

function showPlaceholderProjects() {
  const demo = [
    {
      name: 'proyecto-ejemplo',
      description: 'Descripción breve del proyecto y lo que aporta.',
      html_url: '#',
      language: 'JavaScript'
    }
  ];
  renderProjects(demo);
}

function renderProjects(list) {
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = '';
  list.forEach(p => {
    const el = document.createElement('article');
    el.className = 'proj';
    el.innerHTML = `
      <a class="proj-link" href="${p.html_url}" target="_blank" rel="noopener noreferrer">
        <h3>${escapeHtml(p.name)}</h3>
        <p>${escapeHtml(p.description || 'Sin descripción')}</p>
        <div class="meta">
          <span>${p.language || '—'}</span>
        </div>
      </a>
    `;
    grid.appendChild(el);
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"]/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'
  })[c]);
}

// Ejecutamos
fetchRepos();

const menuBtn = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

// Abrir/cerrar con el botón hamburguesa
menuBtn.addEventListener("click", () => {
  mobileMenu.style.display =
    mobileMenu.style.display === "flex" ? "none" : "flex";
});

// 🔥 Cerrar menú al pulsar cualquier enlace
const mobileLinks = mobileMenu.querySelectorAll("a");

mobileLinks.forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.style.display = "none";
  });
});

const canvas = document.getElementById("particles-bg");
const ctx = canvas.getContext("2d");

let w, h;
let particles = [];
const particleCount = 60; // cantidad de partículas
const maxDistance = 120;   // distancia máxima para conectar partículas

// Resize canvas
function resizeCanvas() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Partícula
class Particle {
  constructor() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 0.3; // velocidad suave
    this.vy = (Math.random() - 0.5) * 0.3;
    this.size = Math.random() * 2 + 1;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    // rebote en los bordes
    if(this.x < 0 || this.x > w) this.vx *= -1;
    if(this.y < 0 || this.y > h) this.vy *= -1;
  }

  draw() {
    ctx.fillStyle = "rgba(125,211,252,0.7)"; // azul tech suave
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fill();
  }
}

// inicializar partículas
for(let i=0; i<particleCount; i++){
  particles.push(new Particle());
}

// animación
function animate() {
  ctx.clearRect(0,0,w,h);

  // dibujar líneas
  for(let i=0; i<particles.length; i++){
    particles[i].move();
    particles[i].draw();

    for(let j=i+1; j<particles.length; j++){
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if(dist < maxDistance){
        ctx.strokeStyle = `rgba(125,211,252,${1-dist/maxDistance})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}
animate();

// opcional: que las partículas sigan el ratón
let mouse = {x: null, y: null};
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

const avatar1 = document.querySelector('.avatar');

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY;
  avatar1.style.setProperty('--scroll-y', `${scrollPos * 0.05}px`); // movimiento muy sutil
});

const slideElems = document.querySelectorAll('.slide-left, .slide-right');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.3 });

slideElems.forEach(el => observer.observe(el));


const konamiCode = [38,38,40,40,37,39,37,39,66,65];
let konamiIndex = 0;

window.addEventListener('keydown', e => {
  if(e.keyCode === konamiCode[konamiIndex]) {
    konamiIndex++;
    if(konamiIndex === konamiCode.length) {
      document.body.classList.toggle('konami-mode');
      konamiIndex = 0;
      alert('Modo Konami activado! 🎉');
    }
  } else {
    konamiIndex = 0;
  }
});


const konamiHint = document.getElementById('konamiHint');

konamiHint.addEventListener('click', () => {
  alert('🎮 Psst… Prueba introducir la Konami Code! ↑↑↓↓←→←→BA');
});
