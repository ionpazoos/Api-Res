const WorkoutService = require('../services/workoutService');

// Obtener todos los entrenamientos
const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await WorkoutService.getAllWorkouts();
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo entrenamientos' });
  }
};

// Crear un nuevo entrenamiento
const createWorkout = async (req, res) => {
  try {
    const workout = await WorkoutService.createWorkout(req.body);
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Error creando entrenamiento' });
  }
};

module.exports = { getAllWorkouts, createWorkout };