//Apis/config/db.js

// Importar el módulo mongoose para trabajar con MongoDB
const mongoose = require('mongoose');
// Importar dotenv para manejar variables de entorno
const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Definir una función asíncrona para conectar a la base de datos
const connectDB = async () => {
  try {
    // Intentar conectar a MongoDB utilizando la URI definida en las variables de entorno
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB'); // Mensaje de éxito al conectar
  } catch (error) {
    // Si hay un error, mostrarlo en la consola
    console.error('Error al conectar a MongoDB:', error);
    // Terminar el proceso si no se puede conectar a la base de datos
    process.exit(1);
  }
};

// Exportar la función para poder usarla en otros archivos
module.exports = connectDB;
