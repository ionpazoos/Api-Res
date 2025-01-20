const Workout = require('../models/workoutModel');

// Servicio para obtener todos los entrenamientos
const getAllWorkouts = async () => {
  return await Workout.find();
};

// Servicio para crear un nuevo entrenamiento
const createWorkout = async (workoutData) => {
  const workout = new Workout(workoutData);
  return await workout.save();
};

module.exports = { getAllWorkouts, createWorkout };