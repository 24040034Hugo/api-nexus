// Hover en cards del landing
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.api-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-4px)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
});
