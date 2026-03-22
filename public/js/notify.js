function initNotis() {
  const form = document.getElementById('notis-form');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('notis-btn');
    btn.textContent = 'ENVIANDO...';

    const formData = new FormData(form);
    
    // Usando Formspree (crea una cuenta gratis y cambia el ID)
    const res = await fetch('https://formspree.io/f/TU_ID_AQUI', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      document.getElementById('notis-success').style.display = 'block';
      form.reset();
    }
    btn.textContent = 'ENVIAR CORREO';
  });
}