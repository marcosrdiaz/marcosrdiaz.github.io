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
