// ---------- CONFIGURACIÓN ----------
const GITHUB_USERNAME = 'marcosrdiaz';
const FEATURED_REPOS = ['Web-de-apuestas-cifrada', 'Web-Interactiva-Navidad', 'AEKI-Prototipo-interactivo-para-tiendas-fisicas', 'Programacion-Concurrente-en-C'];
const LINKEDIN_URL = 'https://linkedin.com/in/marcos-rodrigo-diaz';
const EMAIL = 'marcosrodrigodiaz@gmail.com';
const CV_URL = '/sources/cv.pdf';
// -----------------------------------

document.getElementById('githubLink').href = `https://github.com/${GITHUB_USERNAME}`;
document.getElementById('githubLink').textContent = `GitHub — ${GITHUB_USERNAME}`;
document.getElementById('linkedinLink').href = LINKEDIN_URL;
document.getElementById('downloadCvBtn').href = CV_URL;
document.getElementById('emailLink').href = `mailto:${EMAIL}`;
document.getElementById('emailLink').textContent = EMAIL;
document.getElementById('updatedDate').textContent = new Date().toLocaleDateString('es-ES');

async function fetchRepos() {
  if (!GITHUB_USERNAME || GITHUB_USERNAME === 'marcosrdiaz') {
    showPlaceholderProjects();
    return;
  }

  try {
    const resp = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
    if (!resp.ok) throw new Error('No se pudo obtener repositorios');
    let repos = await resp.json();

    repos.sort((a, b) => b.stargazers_count - a.stargazers_count);

    const featured = [];
    const rest = [];
    repos.forEach(r => {
      if (FEATURED_REPOS.includes(r.name)) featured.push(r);
      else rest.push(r);
    });

    const toShow = [...featured, ...rest].slice(0, 6);
    renderProjects(toShow);
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

fetchRepos();