//APIS/rutes/comments.js

const express = require("express")
const CommentService = require('../services/comments')

function comments(app){
    const router = express.Router()
    const commentServ = new CommentService()

    app.use('/api/comments', router)

    router.post('/', async (req, res) => {
        const resp = await commentServ.create(req.body)
        return res.json(resp)
    })

    router.get('/', async (req, res) => {
        const response = await commentServ.getAll()
        console.log("response", response)
        return res.json(response)
    })

    // enhace -> meterle un middleware de auth
    // si el usuario es admin tenga permisos para editar/borrar
    router.put('/:id', async (req, res) => {
        const resp = await commentServ.update(req.params.id, req.body);
        return res.json(resp);
    });
    

    router.delete('/:id', async (req, res) => {
        const resp = commentServ.delete(req.params.id)
        return res.json(resp)
    })
}

module.exports = comments