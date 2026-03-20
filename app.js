const express = require('express');
const path    = require('path');
const https   = require('https');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// PROXY: Resend — Envío de correos
app.post('/api/notis', (req, res) => {
  const { to, subject, message } = req.body;
  if (!to || !subject || !message) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  const payload = JSON.stringify({
    from:    'onboarding@resend.dev',
    to:      ['24040108@alumno.utc.edu.mx'],
    subject: subject,
    html:    `<p>${message.replace(/\n/g, '<br>')}</p>`
  });

  const options = {
    hostname: 'api.resend.com',
    path:     '/emails',
    method:   'POST',
    headers: {
      'Authorization':  'Bearer re_WCMCnrRj_h6qP4LdRsVGSU81zgFUQmChY',
      'Content-Type':   'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  const request = https.request(options, (apiRes) => {
    let data = '';
    apiRes.on('data', chunk => { data += chunk; });
    apiRes.on('end', () => {
      try {
        const json = JSON.parse(data);
        if (apiRes.statusCode >= 200 && apiRes.statusCode < 300) {
          res.json({ success: true, id: json.id });
        } else {
          res.status(apiRes.statusCode).json({ error: json.message || 'Error de Resend' });
        }
      } catch {
        res.status(500).json({ error: 'Error al parsear respuesta' });
      }
    });
  });

  request.on('error', () => res.status(500).json({ error: 'Error de conexión con Resend' }));
  request.write(payload);
  request.end();
});

// PROXY: Deezer — Búsqueda de canciones
app.get('/api/streaming', (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: 'Falta el parámetro q' });

  const url = `https://api.deezer.com/search?q=${encodeURIComponent(query)}&limit=8`;

  https.get(url, (apiRes) => {
    let data = '';
    apiRes.on('data', chunk => { data += chunk; });
    apiRes.on('end', () => {
      try {
        res.json(JSON.parse(data));
      } catch {
        res.status(500).json({ error: 'Error al parsear respuesta de Deezer' });
      }
    });
  }).on('error', () => res.status(500).json({ error: 'Error de conexión con Deezer' }));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
