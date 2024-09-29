const productModel = require("../models/product.model")

// add prouct
async function addProduct(req, res) {

    try {

        const user = req.user

        const userId = user.id
        console.log(userId)

        // const { productName, productLocation, productCategory } = JSON.parse(req.body.json)


        const { productName, productLocation, productCategory } = req.body

        const productImgURL = req.file.path

        // console.log(req.file)

        const product = new productModel({ userId, productName, productImgURL, productLocation, productCategory })

        const savedProduct = await product.save()

        if (!savedProduct) return res.status(500).json({ flag: false, message: 'Something wnet wrong, Try after sometimes' })

        res.status(200).json({ flag: true, message: 'Product uploaded successfully' })

    } catch (error) {
        console.log(error)
    }
}
// get all prouct
async function getAllProduct(req, res) {

    try {

        const products = await productModel.find().populate({
            path: 'userId',
            select: '-password'
        })

        if (products.length == 0) return res.status(404).json({ flag: false, message: 'No product found' })

        res.status(200).json({ flag: true, products })

    } catch (error) {
        console.log(error)
    }
}

// add prouct
async function getProductByCategory(req, res) {

    try {

        const productCategory = req.params.productCategory

        const products = await productModel.find({ productCategory })

        if (products.length == 0) return res.status(404).json({ flag: false, message: 'No product found' })

        res.status(200).json({ flag: true, products })


    } catch (error) {
        console.log(error)
    }
}

module.exports = {

    addProduct,
    getAllProduct,
    getProductByCategory
}