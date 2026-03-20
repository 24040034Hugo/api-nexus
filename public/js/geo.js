function initGeo() {
  const map = L.map('map').setView([25.6866, -100.3161], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  L.marker([25.389148, -101.009265])
    .addTo(map)
    .bindPopup('📍 Mi casa, México')
    .openPopup();
}
