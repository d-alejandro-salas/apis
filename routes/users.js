const express = require("express")
const UserService = require("../services/users")
function users(app){
    const router = express.Router()
    const userService = new UserService()

    app.use('/api/users', router)

    router.post('/' , async (req, res) => { //www.mipagina.com/api/users/
        const response = await userService.register(req.body)
        return res.json(response)
    })

    router.post('/login', async (req, res) => { //www.mipagina.com/api/users/login
        const response = await userService.login(req.body)
        return res.json(response)
    })

}

module.exports = users