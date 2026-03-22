// GitHub API
document.addEventListener('DOMContentLoaded', () => {
  initRedes();
});

function initRedes() {
  const input    = document.getElementById('github-input');
  const btn      = document.getElementById('github-btn');
  const card     = document.getElementById('perfil-card');
  const errorMsg = document.getElementById('perfil-error');

  btn.addEventListener('click', () => buscarPerfil());
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') buscarPerfil();
  });

  async function buscarPerfil() {
    const username = input.value.trim();
    if (!username) return;

    card.style.display     = 'none';
    errorMsg.style.display = 'none';
    btn.textContent        = 'BUSCANDO...';
    btn.disabled           = true;

    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error('No encontrado');
      const data = await res.json();
      renderPerfil(data);
    } catch {
      errorMsg.style.display = 'block';
    } finally {
      btn.textContent = 'BUSCAR';
      btn.disabled    = false;
    }
  }

  function renderPerfil(data) {
    document.getElementById('perfil-avatar').src           = data.avatar_url;
    document.getElementById('perfil-nombre').textContent   = data.name || data.login;
    document.getElementById('perfil-username').textContent = `@${data.login}`;
    document.getElementById('perfil-bio').textContent      = data.bio || 'Sin bio disponible.';
    document.getElementById('stat-repos').textContent      = data.public_repos;
    document.getElementById('stat-followers').textContent  = data.followers;
    document.getElementById('stat-following').textContent  = data.following;
    document.getElementById('perfil-link').href            = data.html_url;
    card.style.display = 'block';
  }
}
