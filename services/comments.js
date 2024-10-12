//APIS/services/comments.js

const CommentModel = require('../models/Comment')

class Comment {
    // recuperamos la lista de comentarios
    // CRUD 
    // READ -> READ all okey
    // (r)ead by name : devolver 1 comentario: de tarea
    // (u)pdate
    // (d)elete
    async getAll(){
        try {
            const response = await CommentModel.find()
            return response
        } catch(error){
            console.log("ha ocurrido un error...", error)
        }
    }
    // crear un nuevo comentario
    async create(data){
        try{
            const newComment = await CommentModel.create(data)
            return newComment
        } catch(error){
            console.log(error)
        }
    }

    async update(id, data){
        try{
            const updatedComment = await CommentModel.findByIdAndUpdate(id, data)
            return updatedComment
        }catch(error){
            console.log("error to update", error)
        }       
    }

    async delete(id){
        try{
            const comment = await CommentModel.findByIdAndDelete(id)
            return comment
        }catch(error){
            console.log("error al eliminar datos", error)
        }
    }
}

module.exports = Comment