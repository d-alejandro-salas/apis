const UserModel = require('../models/user')

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
}

module.exports = User