// Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://abmgqikjootyrliijywq.supabase.co';
const SUPABASE_KEY = 'sb_publishable_H9uY2Wqy-3x7dgq6qXDgvw_K4oPtZ9w';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener('DOMContentLoaded', () => {
  initMensajeria();
});

function initMensajeria() {
  const form      = document.getElementById('msj-form');
  const nombreIn  = document.getElementById('msj-nombre');
  const carreraIn = document.getElementById('msj-carrera');
  const lista     = document.getElementById('msj-lista');
  const errorEl   = document.getElementById('msj-error');
  const successEl = document.getElementById('msj-success');

  cargarRegistros();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre  = nombreIn.value.trim();
    const carrera = carreraIn.value.trim();
    if (!nombre || !carrera) return;

    errorEl.style.display   = 'none';
    successEl.style.display = 'none';

    const { error } = await supabase.from('registros').insert([{ nombre, carrera }]);

    if (error) {
      errorEl.textContent   = 'Error al guardar. Intenta de nuevo.';
      errorEl.style.display = 'block';
      return;
    }

    successEl.style.display = 'block';
    nombreIn.value  = '';
    carreraIn.value = '';
    cargarRegistros();
  });

  async function cargarRegistros() {
    lista.innerHTML = '<p class="msj-cargando">CARGANDO REGISTROS...</p>';
    const { data, error } = await supabase
      .from('registros')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error || !data) {
      lista.innerHTML = '<p class="msj-error-txt">ERROR AL CARGAR.</p>';
      return;
    }

    if (data.length === 0) {
      lista.innerHTML = '<p class="msj-vacio">AÚN NO HAY REGISTROS.</p>';
      return;
    }

    lista.innerHTML = '';
    data.forEach(r => {
      const fecha = new Date(r.created_at).toLocaleDateString('es-MX', {
        day: '2-digit', month: 'short', year: 'numeric'
      });
      const item = document.createElement('div');
      item.className = 'msj-item';
      item.innerHTML = `
        <div class="msj-item-info">
          <span class="msj-item-nombre">${r.nombre}</span>
          <span class="msj-item-carrera">${r.carrera}</span>
        </div>
        <span class="msj-item-fecha">${fecha}</span>
      `;
      lista.appendChild(item);
    });
  }
}
