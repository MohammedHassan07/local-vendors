const { Schema, model } = require('mongoose')

const userSchema = new Schema({

    name: String,
    password: String,
    email: String
    
}, {timestamps: true})

const userModel = model('user', userSchema)

module.exports = userModel