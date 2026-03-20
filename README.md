# API Nexus — Dashboard

Dashboard interactivo que consume múltiples APIs reales usando Node.js + Express como servidor proxy.

## Secciones

| Sección | API | Descripción |
|---------|-----|-------------|
| Geo | Leaflet + OpenStreetMap | Mapa interactivo de geolocalización |
| Redes | GitHub REST API | Búsqueda de perfiles de GitHub |
| E-commerce | Fake Store API | Catálogo de productos con búsqueda |
| Registros | Supabase | Base de datos en la nube (INSERT/SELECT) |
| Notificaciones | Resend API | Envío de correos reales |
| Streaming | Deezer API | Búsqueda y reproducción de música |

## Instalación

```bash
git clone https://github.com/TU_USUARIO/api-nexus.git
cd api-nexus
npm install
node app.js
```

Abre `http://localhost:3000` en tu navegador.

## Estructura

```
api-nexus/
├── app.js
├── package.json
├── .gitignore
└── public/
    ├── index.html
    ├── styles.css
    ├── main.js
    └── js/
        ├── geo.js
        ├── redes.js
        ├── ecomm.js
        ├── registrar.js
        ├── notify.js
        ├── streaming.js
        └── animaciones.js
```

## Tecnologías

- Node.js + Express
- Leaflet.js
- Supabase JS SDK
- HTML / CSS / JavaScript vanilla
