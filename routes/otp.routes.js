const express = require('express')
const checkEmpty = require('../middlewares/checkEmptyFields')
const { generateOTP, verifyOTP,  } = require('../controllers/otp.contorller')

const route = express.Router()

route.post('/generate-otp', checkEmpty, generateOTP)

route.post('/verify-otp', checkEmpty, verifyOTP)

module.exports = route