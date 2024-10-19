const express = require("express")
const UserService = require("../services/users")
function users(app){
    const router = express.Router()
    const userService = new UserService()

    app.use('api/users', router)

    router.post('/' , async (req, res) => {
        const response = await userService.register(req.body)
        return res.json(response)
    })
}

module.exports = users