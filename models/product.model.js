const { Schema, model } = require('mongoose')

const productSchema = new Schema({

    name: String,

    imgURL: String,

    location: {}

}, { timestamps: true })

const productModel = model('product', productSchema)

module.exports = productModel