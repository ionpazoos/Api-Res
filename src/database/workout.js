const mongoose = require('mongoose');

// Conexión a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión a MongoDB establecida.');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1); // Finalizar proceso si hay error
  }
};

module.exports = connectDB;