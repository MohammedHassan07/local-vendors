const { Schema, model } = require('mongoose')

const locationSchema = new Schema({

    lat: String,
    long: String
})

const productSchema = new Schema({

    productName: String,

    productCategory: String,

    productImgURL: String,

    productLocation: locationSchema

}, { timestamps: true })

const productModel = model('product', productSchema)

module.exports = productModel