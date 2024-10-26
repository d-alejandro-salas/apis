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
        const { email, password } = data
        try {
            const user = UserModel.findOne({email}) //SOLUCIONAR: FALTA PASSWORD.
            if(!user){
                return {msg: "Usuario inexistente..."} // manejar codigo de error
            }
            console.log("password", password)
            console.log("user password", user)
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
                return {msg: "Credenciales invalidas..."} // manejar codigo de error
            }
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'} )
            
            return {
                status: "logeado con exito",
                token: token
            }
        } catch (error) {
            console.log("Error al iniciar sesion", error)
        }
    }
}

module.exports = User