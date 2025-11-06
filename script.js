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
    let repos = await resp.json();

    // Ordenamos por estrellas
    repos.sort((a, b) => b.stargazers_count - a.stargazers_count);

    // Filtramos destacados
    const featured = repos.filter(r => FEATURED_REPOS.includes(r.name));
    const others = repos.filter(r => !FEATURED_REPOS.includes(r.name));

    // Mostramos máximo 6
    renderProjects([...featured, ...others].slice(0, 6));
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
      language: 'JavaScript',
      stargazers_count: 12
    },
    {
      name: 'web-portfolio',
      description: 'Portfolio personal estático con animaciones suaves.',
      html_url: '#',
      language: 'HTML/CSS',
      stargazers_count: 8
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
      <h3><a href="${p.html_url}" target="_blank" style="color:inherit;text-decoration:none">${escapeHtml(p.name)}</a></h3>
      <p>${escapeHtml(p.description || 'Sin descripción')}</p>
      <div class="meta">
        <span>⭐ ${p.stargazers_count || 0}</span>
        <span>•</span>
        <span>${p.language || '—'}</span>
      </div>
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
