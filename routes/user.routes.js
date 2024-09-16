const express = require('express')
const { registerUser, loginUser } = require('../controllers/user.controller')
const checkEmpty = require('../middlewares/checkEmptyFields')
const checkUniqueEmail = require('../middlewares/checkUniqueEmail')

const route = express.Router()

route.post('/user/register', checkEmpty, checkUniqueEmail, registerUser)

route.post('/user/login', checkEmpty, loginUser)

module.exports = route