console.log("workout-tracker app");

const express = require("express"); // Import express
const app = express(); // Create an instance of express
const port = 8000; // puerto de escucha

// Inicializacion del servidor y primera ruta
app.get("/", (req, res) => {
  res.send("Hola mi server en Express");
});

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
}); 