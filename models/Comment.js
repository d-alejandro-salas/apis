//APIS/models/Comment.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {type: String, required : true},
    text: {type: String, required : true},
})
module.exports = mongoose.model("Comment", userSchema)

