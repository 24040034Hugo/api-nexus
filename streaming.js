// Deezer API - Versión Cliente con Proxy
document.addEventListener('DOMContentLoaded', () => {
  initStreaming();
});

function initStreaming() {
  const input = document.getElementById('stream-input');
  const btn = document.getElementById('stream-btn');
  const grid = document.getElementById('stream-grid');
  const errorEl = document.getElementById('stream-error');
  const player = document.getElementById('stream-player');
  const audio = document.getElementById('player-audio');

  btn.addEventListener('click', async () => {
    const query = input.value.trim();
    if (!query) return;

    grid.innerHTML = '';
    errorEl.style.display = 'none';
    btn.textContent = 'BUSCANDO...';

    try {
      // Usamos un proxy para evitar el error de CORS
      const proxy = 'https://corsproxy.io/?';
      const target = `https://api.deezer.com/search?q=${encodeURIComponent(query)}&limit=8`;
      const res = await fetch(proxy + target);
      const data = await res.json();
      
      if (!data.data || data.data.length === 0) {
        errorEl.style.display = 'block';
      } else {
        renderStreaming(data.data);
      }
    } catch (err) {
      console.error(err);
      errorEl.style.display = 'block';
    } finally {
      btn.textContent = 'BUSCAR';
    }
  });

  function renderStreaming(canciones) {
    canciones.forEach(c => {
      const card = document.createElement('div');
      card.className = 'stream-card';
      card.innerHTML = `
        <img src="${c.album.cover_small}" alt="cover">
        <div class="stream-info">
          <p class="stream-title">${c.title}</p>
          <p class="stream-artist">${c.artist.name}</p>
        </div>
      `;
      card.onclick = () => {
        player.style.display = 'flex';
        document.getElementById('player-img').src = c.album.cover_medium;
        document.getElementById('player-title').textContent = c.title;
        document.getElementById('player-artist').textContent = c.artist.name;
        audio.src = c.preview;
        audio.play();
      };
      grid.appendChild(card);
    });
  }
}