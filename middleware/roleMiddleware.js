const roleMiddleware = ( requiredRole ) => {
    return ( req, res, next ) => {
        if(req.user.role !== requiredRole) {
            return res.status(403).json({msg: "No tienes permisos suficientes"})
        }
        next() // permite que la solicitud continue
    }
}

module.exports = roleMiddleware