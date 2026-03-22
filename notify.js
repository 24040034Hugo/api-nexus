function initNotis() {
  const form = document.getElementById('notis-form');
  const btn = document.getElementById('notis-btn');
  const successEl = document.getElementById('notis-success');
  const errorEl = document.getElementById('notis-error');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    btn.textContent = 'ENVIANDO...';
    btn.disabled = true;

    const data = {
      email: document.getElementById('notis-to').value,
      subject: document.getElementById('notis-subject').value,
      message: document.getElementById('notis-message').value
    };

    try {
      // REEMPLAZA "TU_ID_AQUÍ" con el ID de Formspree
      const res = await fetch('https://formspree.io/f/TU_ID_AQUI', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      });

      if (res.ok) {
        successEl.style.display = 'block';
        form.reset();
      } else {
        throw new Error();
      }
    } catch (err) {
      errorEl.style.display = 'block';
    } finally {
      btn.textContent = 'ENVIAR CORREO';
      btn.disabled = false;
    }
  });
}

document.addEventListener('DOMContentLoaded', initNotis);