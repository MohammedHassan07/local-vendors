const express = require('express')
const { addProduct, getAllProduct, getProductByName } = require('../controllers/product.controller')
const verifyJWT = require('../middlewares/verifyJWT')
const checkEmpty = require('../middlewares/checkEmptyFields')

const route = express.Router()

route.post('/add', verifyJWT, checkEmpty, addProduct)

route.get('/get-all', getAllProduct)

route.get('/get-by-name', getProductByName)

module.exports = route