const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true }, // Duración en minutos
  date: { type: Date, default: Date.now },   // Fecha de creación
});

// Crear modelo Workout
const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;