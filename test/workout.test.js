const request = require('supertest'); // Supertest permite realizar solicitudes HTTP a la API de manera programática
const app = require('../src/index'); // Importa la aplicación Express configurada
const Workout = require('../src/models/workoutModel'); // Importa el modelo de MongoDB para interactuar con la colección de entrenamientos

// Test suite para el endpoint GET /api/workouts
describe('GET /api/workouts', () => {
  // beforeAll se ejecuta antes de todos los tests dentro de este describe
  beforeAll(async () => {
    // Inserta datos de prueba en la base de datos para probar la funcionalidad de obtener entrenamientos
    await Workout.create([
      { name: 'Correr', duration: 30 },
      { name: 'Nadar', duration: 60 },
    ]);
  });

  // afterAll se ejecuta después de todos los tests dentro de este describe
  afterAll(async () => {
    // Limpia los datos de prueba eliminándolos de la base de datos
    await Workout.deleteMany({});
  });

  // Test específico para verificar que el endpoint GET /api/workouts devuelve todos los entrenamientos
  it('should return all workouts', async () => {
    // Realiza una solicitud GET a la API
    const res = await request(app).get('/api/workouts');
    
    // Verifica que el código de respuesta sea 200 (OK)
    expect(res.statusCode).toBe(200);
    
    // Verifica que la respuesta sea un array que contenga objetos con las propiedades esperadas
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String), // Verifica que cada entrenamiento tenga una propiedad 'name' que sea un string
          duration: expect.any(Number), // Verifica que cada entrenamiento tenga una propiedad 'duration' que sea un número
        }),
      ])
    );
  });
});

// Test suite para el endpoint POST /api/workouts
describe('POST /api/workouts', () => {
  // Test específico para verificar que se puede crear un nuevo entrenamiento
  it('should create a new workout', async () => {
    // Define los datos del nuevo entrenamiento que se enviarán en la solicitud POST
    const newWorkout = { name: 'Yoga', duration: 45 };

    // Realiza una solicitud POST a la API con los datos del nuevo entrenamiento
    const res = await request(app).post('/api/workouts').send(newWorkout);

    // Verifica que el código de respuesta sea 201 (Creado)
    expect(res.statusCode).toBe(201);

    // Verifica que la respuesta contenga el objeto del nuevo entrenamiento creado
    expect(res.body).toMatchObject({
      name: 'Yoga', // Verifica que el nombre sea 'Yoga'
      duration: 45, // Verifica que la duración sea 45
    });

    // Busca en la base de datos el entrenamiento creado para asegurarse de que fue guardado correctamente
    const workout = await Workout.findOne({ name: 'Yoga' });
    expect(workout).not.toBeNull(); // Verifica que se encontró un entrenamiento con el nombre 'Yoga'
    expect(workout.duration).toBe(45); // Verifica que la duración guardada sea 45
  });
});