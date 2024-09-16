const express = require('express')
const { registerUser, loginUser } = require('../controllers/user.controller')
const checkEmpty = require('../middlewares/checkEmptyFields')
const checkUniqueEmail = require('../middlewares/checkUniqueEmail')

const route = express.Router()

route.post('/register', checkEmpty, checkUniqueEmail, registerUser)

route.post('/login', checkEmpty, loginUser)

module.exports = route