//Apis/index.js

// Importamos las dependencias necesarias
const express = require('express'); // Importa Express para crear el servidor
const connectDB = require('./config/db'); // Importa la función de conexión a la base de datos
const Comment = require('./models/Comment'); // Importa el modelo de Comment (no lo usaremos todavía aquí)
const cors = require("cors")

//importando rutas
const comments = require('./routes/comments')
const users = require('./routes/users')
// Creamos una instancia de la aplicación Express
const app = express();

// Middleware para parsear el cuerpo de las peticiones en formato JSON
app.use(express.json());
// Middleware para controlar el uso del backend
app.use(cors({
  origin: "http://localhost:5173"
}))

// Conectamos a la base de datos
connectDB();

comments(app)
users(app)

// Definimos el puerto en el que escuchará el servidor
const PORT = process.env.PORT; // Utiliza el puerto especificado en el .env o el 3000 por defecto

// Iniciamos el servidor y escuchamos en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`); // Mensaje de confirmación en la consola
});

// Aquí es donde podrías definir las rutas para manejar las peticiones (GET, POST, etc.)
// Por ejemplo, podrías tener algo como:
// app.get('/comments', async (req, res) => {
//     const comments = await Comment.find();
//     res.json(comments);
// });