const express = require('express')
const { addProduct, getAllProduct, getProductByCategory } = require('../controllers/product.controller')
const verifyJWT = require('../middlewares/verifyJWT')
const checkEmpty = require('../middlewares/checkEmptyFields')
const upload = require('../middlewares/uploadImages')


const route = express.Router()

route.post('/add', verifyJWT, upload.single('image'), checkEmpty, addProduct)

route.get('/get-all-product', getAllProduct)

route.get('/get-product-by-category/:productCategory', getProductByCategory)

module.exports = route