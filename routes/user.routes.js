const express = require('express')
const { registerUser, loginUser, getUserProfile } = require('../controllers/user.controller')
const checkEmpty = require('../middlewares/checkEmptyFields')
const checkUniqueEmail = require('../middlewares/checkUniqueEmail')
const verifyJWT = require('../middlewares/verifyJWT')

const route = express.Router()

route.post('/register', checkEmpty, checkUniqueEmail, registerUser)

route.post('/login', checkEmpty, loginUser)

route.get('/getProfile', verifyJWT, getUserProfile)

module.exports = route