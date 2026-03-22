// Deezer API - Versión Cliente
document.addEventListener('DOMContentLoaded', () => {
  initStreaming();
});

function initStreaming() {
  const input   = document.getElementById('stream-input');
  const btn     = document.getElementById('stream-btn');
  const grid    = document.getElementById('stream-grid');
  const errorEl = document.getElementById('stream-error');

  btn.addEventListener('click', async () => {
    const query = input.value.trim();
    if (!query) return;

    try {
      // Llamada directa a la API de Deezer
      const res = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(query)}&limit=8`);
      const data = await res.json();
      renderStreaming(data.data);
    } catch (err) {
      errorEl.style.display = 'block';
    }
  });
}
// ... (manten el resto de funciones de renderizado y reproducción igual)