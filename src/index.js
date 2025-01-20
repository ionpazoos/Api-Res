const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const workoutRoutes = require('./routes/workoutRoutes');

// Configurar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para parsear JSON
app.use(bodyParser.json());

// Ruta principal
app.use('/api/workouts', workoutRoutes);

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});