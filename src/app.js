console.log("workout-tracker app");
const express = require("express"); // Import express
const app = express(); // Create an instance of express

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar rutas
const routes = require('./routes');
app.use('/api', routes); // Registrar el enrutador bajo el prefijo /api

const { port } = require('./config/env'); // Import the port from the env file

// Inicializacion del servidor y primera ruta
app.get("/", (req, res) => {
  res.send("Hola mi server en Express");
});

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
