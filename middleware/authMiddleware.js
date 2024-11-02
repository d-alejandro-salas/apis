const jwt = require('jsonwebtoken')

const authMiddleware = ( req, res, next ) => {
    const token = req.headers['Authorization']?.split(' ')[1] //REVISAR CÓOMO TRAERLO. POSIBLE FALLA DE CARGA DE TOKEN.
    console.log("token", token)
    if(!token) {
        return res.status(401).json({msg: "acceso denegado"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded; // aca se almacena la informacion del usuario, incluido el rol
        next()
    } catch (error) {
        return res.status(400).json({msg: "token invalido"})
    }

}

module.exports = authMiddleware;