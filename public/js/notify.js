// Resend API
document.addEventListener('DOMContentLoaded', () => {
  initNotis();
});

function initNotis() {
  const form      = document.getElementById('notis-form');
  const btn       = document.getElementById('notis-btn');
  const successEl = document.getElementById('notis-success');
  const errorEl   = document.getElementById('notis-error');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const to      = document.getElementById('notis-to').value.trim();
    const subject = document.getElementById('notis-subject').value.trim();
    const message = document.getElementById('notis-message').value.trim();
    if (!to || !subject || !message) return;

    successEl.style.display = 'none';
    errorEl.style.display   = 'none';
    btn.textContent         = 'ENVIANDO...';
    btn.disabled            = true;

    try {
      const res = await fetch('/api/notis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, subject, message })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al enviar');
      successEl.style.display = 'block';
      form.reset();
    } catch (err) {
      errorEl.style.display = 'block';
      console.error('Error:', err);
    } finally {
      btn.textContent = 'ENVIAR CORREO';
      btn.disabled    = false;
    }
  });
}
