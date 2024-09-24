const { Schema, model } = require('mongoose')

const otpSchema = new Schema({

    email: String,
    otp: Number
})

const otpModel = model('otp', otpSchema)

module.exports = otpModel