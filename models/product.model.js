const { Schema, model } = require('mongoose')

const productSchema = new Schema({

    userId: {

        type: Schema.Types.ObjectId,
        ref: 'user'
    },

    productName: String,

    productCategory: String,

    productImgURL: String,

    productLocation: String

})

const productModel = model('product', productSchema)

module.exports = productModel