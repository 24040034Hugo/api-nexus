// Navegación del dashboard (sidebar)
document.addEventListener('DOMContentLoaded', () => {
  const links     = document.querySelectorAll('.sb-link');
  const secciones = document.querySelectorAll('.sec');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.dataset.seccion;

      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      secciones.forEach(s => s.classList.remove('activa'));
      const sec = document.getElementById(target);
      if (sec) sec.classList.add('activa');
    });
  });
});
