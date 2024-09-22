const productModel = require("../models/product.model")

// add prouct
async function addProduct(req, res) {

    try {

        const user = req.user

        const { productName, productLocation } = req.body

        const productImgURL = req.file.path
      
        const { lat, long } = productLocation

        // upload the image and get the imgURL

        const product = new productModel({ productName, productImgURL, productLocation: { lat, long } })

        const savedProduct = await product.save()

        if (!savedProduct) return res.status().json({ flag: false, message: 'Something wnet wrong, Try after sometimes' })

        res.status(200).json({ flag: true, message: 'Product uploaded successfully' })

    } catch (error) {
        console.log(error)
    }
}
// get all prouct
async function getAllProduct(req, res) {

    try {

        const products = await productModel.find()

        if (!products) return res.status(404).json({ flag: false, message: 'No product found' })

        res.status(200).json({ flag: true, products })

    } catch (error) {
        console.log(error)
    }
}

// add prouct
async function getProductByName(req, res) {

    try {

        const productName = req.params.productName

        const products = await productModel.find({ productName })

        if (!products) return res.status(404).json({ flag: false, message: 'No product found' })

        res.status(200).json({ flag: true, products })


    } catch (error) {
        console.log(error)
    }
}

module.exports = {

    addProduct,
    getAllProduct,
    getProductByName
}