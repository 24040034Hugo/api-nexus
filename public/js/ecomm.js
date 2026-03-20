// Fake Store API
document.addEventListener('DOMContentLoaded', () => {
  initEcomm();
});

function initEcomm() {
  const input   = document.getElementById('ecomm-input');
  const btn     = document.getElementById('ecomm-btn');
  const grid    = document.getElementById('ecomm-grid');
  const errorEl = document.getElementById('ecomm-error');
  const loading = document.getElementById('ecomm-loading');

  cargarTodos();

  btn.addEventListener('click', () => buscar());
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') buscar();
  });

  async function cargarTodos() {
    mostrarLoading(true);
    grid.innerHTML        = '';
    errorEl.style.display = 'none';
    try {
      const res  = await fetch('https://fakestoreapi.com/products?limit=8');
      const data = await res.json();
      renderProductos(data);
    } catch {
      errorEl.style.display = 'block';
    } finally {
      mostrarLoading(false);
    }
  }

  async function buscar() {
    const query = input.value.trim().toLowerCase();
    if (!query) return cargarTodos();

    mostrarLoading(true);
    grid.innerHTML        = '';
    errorEl.style.display = 'none';
    btn.textContent       = 'BUSCANDO...';
    btn.disabled          = true;

    try {
      const res  = await fetch('https://fakestoreapi.com/products');
      const data = await res.json();
      const filtrados = data.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
      if (filtrados.length === 0) {
        errorEl.style.display = 'block';
      } else {
        renderProductos(filtrados.slice(0, 8));
      }
    } catch {
      errorEl.style.display = 'block';
    } finally {
      mostrarLoading(false);
      btn.textContent = 'BUSCAR';
      btn.disabled    = false;
    }
  }

  function renderProductos(productos) {
    grid.innerHTML = '';
    productos.forEach(p => {
      const precio   = p.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
      const estrellas = '★'.repeat(Math.round(p.rating.rate)) + '☆'.repeat(5 - Math.round(p.rating.rate));
      const card = document.createElement('article');
      card.className = 'ecomm-card';
      card.innerHTML = `
        <div class="ecomm-img">
          <img src="${p.image}" alt="${p.title}" loading="lazy"/>
        </div>
        <div class="ecomm-info">
          <p class="ecomm-titulo">${p.title}</p>
          <span class="ecomm-categoria">${p.category}</span>
          <p class="ecomm-precio">${precio}</p>
          <div class="ecomm-rating">
            <span class="estrellas">${estrellas}</span>
            <span class="rating-num">${p.rating.rate} (${p.rating.count})</span>
          </div>
          <a class="ecomm-link" href="https://listado.mercadolibre.com.mx/${encodeURIComponent(p.title)}" target="_blank" rel="noopener">
            VER EN MERCADOLIBRE →
          </a>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  function mostrarLoading(show) {
    loading.style.display = show ? 'block' : 'none';
  }
}
