// Deezer API
document.addEventListener('DOMContentLoaded', () => {
  initStreaming();
});

function initStreaming() {
  const input   = document.getElementById('stream-input');
  const btn     = document.getElementById('stream-btn');
  const grid    = document.getElementById('stream-grid');
  const errorEl = document.getElementById('stream-error');
  const player  = document.getElementById('stream-player');
  const audio   = document.getElementById('player-audio');

  let cancionesActuales = [];
  let indexActual = 0;
  let intervalo   = null;

  document.getElementById('ctrl-play').addEventListener('click', () => {
    const playBtn = document.getElementById('ctrl-play');
    if (audio.paused) { audio.play(); playBtn.textContent = '⏸'; }
    else              { audio.pause(); playBtn.textContent = '▶'; }
  });

  document.getElementById('ctrl-next').addEventListener('click', () => {
    if (!cancionesActuales.length) return;
    indexActual = (indexActual + 1) % cancionesActuales.length;
    reproducir(cancionesActuales[indexActual]);
    document.getElementById('ctrl-play').textContent = '⏸';
  });

  document.getElementById('ctrl-prev').addEventListener('click', () => {
    if (!cancionesActuales.length) return;
    indexActual = (indexActual - 1 + cancionesActuales.length) % cancionesActuales.length;
    reproducir(cancionesActuales[indexActual]);
    document.getElementById('ctrl-play').textContent = '⏸';
  });

  buscar('the weeknd');

  btn.addEventListener('click', () => buscar(input.value.trim()));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') buscar(input.value.trim());
  });

  async function buscar(query) {
    if (!query) return;
    grid.innerHTML        = '';
    errorEl.style.display = 'none';
    btn.textContent       = 'BUSCANDO...';
    btn.disabled          = true;

    try {
      const res  = await fetch(`/api/streaming?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (!data.data || data.data.length === 0) {
        errorEl.style.display = 'block';
        return;
      }
      cancionesActuales = data.data.slice(0, 8).filter(c => c.preview);
      renderCanciones(cancionesActuales);
    } catch {
      errorEl.style.display = 'block';
    } finally {
      btn.textContent = 'BUSCAR';
      btn.disabled    = false;
    }
  }

  function renderCanciones(canciones) {
    grid.innerHTML = '';
    canciones.forEach((c, i) => {
      const dur  = formatTiempo(c.duration);
      const card = document.createElement('div');
      card.className = 'stream-card';
      card.innerHTML = `
        <img src="${c.album.cover_small}" alt="${c.title}"/>
        <div class="stream-info">
          <p class="stream-title">${c.title}</p>
          <p class="stream-artist">${c.artist.name}</p>
        </div>
        <span class="stream-dur">${dur}</span>
      `;
      card.addEventListener('click', () => {
        indexActual = i;
        reproducir(c);
        document.getElementById('ctrl-play').textContent = '⏸';
      });
      grid.appendChild(card);
    });
  }

  function reproducir(cancion) {
    audio.pause();
    clearInterval(intervalo);

    document.getElementById('player-img').src              = cancion.album.cover_medium;
    document.getElementById('player-title').textContent    = cancion.title;
    document.getElementById('player-artist').textContent   = cancion.artist.name;
    document.getElementById('player-current').textContent  = '0:00';
    document.getElementById('player-fill').style.width     = '0%';

    audio.src = cancion.preview;
    audio.play();
    player.style.display = 'flex';

    intervalo = setInterval(() => {
      if (audio.duration) {
        const pct = (audio.currentTime / audio.duration) * 100;
        document.getElementById('player-fill').style.width    = pct + '%';
        document.getElementById('player-current').textContent = formatTiempo(Math.floor(audio.currentTime));
      }
    }, 500);

    audio.addEventListener('ended', () => {
      clearInterval(intervalo);
      document.getElementById('player-fill').style.width = '100%';
    });
  }

  function formatTiempo(seg) {
    const m = Math.floor(seg / 60);
    const s = seg % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }
}
