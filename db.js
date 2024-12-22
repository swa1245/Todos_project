const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId

const User = new Schema({
    email:String,
    password:String,
    name:String
})

const Todo= new Schema({
    title:String,
    done:Boolean,
    userId : ObjectId
})

const userModel = mongoose.model('users',User)
const todoModel = mongoose.model('todos',Todo)

module.exports={
    userModel,
    todoModel
}