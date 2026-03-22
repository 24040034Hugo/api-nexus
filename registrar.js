import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://abmgqikjootyrliijywq.supabase.co';
// Usa tu clave pública (Anon Key) aquí:
const SUPABASE_KEY = 'TU_CLAVE_ANON_AQUI'; 

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function initMensajeria() {
  const form = document.getElementById('msj-form');
  const lista = document.getElementById('msj-lista');

  async function cargar() {
    const { data } = await supabase.from('registros').select('*').order('created_at', { ascending: false });
    lista.innerHTML = data.map(r => `
      <div class="msj-item">
        <strong>${r.nombre}</strong> - ${r.carrera}
      </div>
    `).join('');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('msj-nombre').value;
    const carrera = document.getElementById('msj-carrera').value;

    await supabase.from('registros').insert([{ nombre, carrera }]);
    form.reset();
    cargar();
  });

  cargar();
}

document.addEventListener('DOMContentLoaded', initMensajeria);