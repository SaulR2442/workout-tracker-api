const express = require('express');
const router = express.Router();

// Middleware global: cabeceras de respuesta y control de version
router.use((req, res, next) => {
  res.set('Content-Type', 'application/json; charset=utf-8'); // Negociacion de contenido
  res.set('X-API-Version', '1'); // Cabecera personalizada de version
  res.set('X-Request-Id', Date.now().toString()); // Cabecera de seguimiento

  // Lectura de cabeceras entrantes (Content-Type, X-API-Key)
  const apiKey = req.get('X-API-Key');
  if (apiKey) {
    console.log(`[v1] Solicitud recibida de la clave API: ${apiKey}`);
  }

  next();
});

//Importar rutas especificas
const usersRoutes = require('./users.routes');

//Configurar las rutas
router.use('/users', usersRoutes);

module.exports = router;
