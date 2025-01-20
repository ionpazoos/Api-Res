const express = require('express');
const router = express.Router();
const { getAllWorkouts, createWorkout } = require('../controllers/workoutController');

// Ruta para obtener todos los entrenamientos
router.get('/get', getAllWorkouts);

// Ruta para crear un nuevo entrenamiento
router.post('/create', createWorkout);

module.exports = router;