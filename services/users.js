const UserModel = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class User {
    async register(data){
        const {name, email, password} = data

        try {
            const existingUser = await UserModel.findOne({email})
            if(existingUser){
                return {msg: "El usuario ya existe"}
            }
            const hashedPassword = await bcrypt.hash(password, 10)
            
            const newUser = new UserModel({name, email, password: hashedPassword})
            const response = await newUser.save()
            return response

        } catch (error) {
            console.log("error al crear el usuario", error)
        }
    }
    async login(data) {
        const { email, password } = data;
        try {
            const user = await UserModel.findOne({ email }); // Línea modificada: agregué `await` acá
            if (!user) {
                return { msg: "Usuario inexistente..." }; // manejar código de error
            }
            console.log("password", password);
            console.log("user password", user.password); // Cambié a user.password
    
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return { msg: "Credenciales inválidas..." }; // manejar código de error
            }
            const token = jwt.sign({ name: user.name, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d', algorithm: 'HS256' });
    
            return {
                status: "logeado con éxito",
                token: token
            };
        } catch (error) {
            console.log("Error al iniciar sesión", error);
        }
    }
    
}

module.exports = User