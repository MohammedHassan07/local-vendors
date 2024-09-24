const bcrypt = require('bcryptjs')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const productModel = require('../models/product.model')

// register user
async function registerUser(req, res) {

    try {


        const { name, email, password } = req.body

        // check email and send OTP after varification save the data 


        const PASSWORD_SALT = Number(process.env.PASSWORD_SALT)
        const hashsedPassword = await bcrypt.hash(password, PASSWORD_SALT)

        if (!hashsedPassword) return res.status(500).json({ flag: false, message: 'Somthing went wrong, Try after sometime ' })

        const user = new userModel({ name, email, password: hashsedPassword })

        const saved = await user.save()

        if (!saved) return res.status(500).json({ flag: false, message: 'Somthing went wrong, Try after sometime ' })

        res.status(201).json({ flag: true, message: 'User registered successfully' })

    } catch (error) {
        console.log(error)
    }
}

// login user
async function loginUser(req, res) {

    try {

        const { email, password } = req.body

        const user = await userModel.findOne({ email })

        if (!user) return res.status(500).json({ flag: false, message: 'Invalid Credentials, Check email or password' })

        const valid = await bcrypt.compare(password, user.password)

        if (!valid) return res.status(500).json({ flag: false, message: 'Invalid Credentials, Check email or password' })

        const ACCESS_TOKEN = process.env.ACCESS_TOKEN
        const token = jwt.sign({ id: user._id }, ACCESS_TOKEN)

        if (!token) return res.status(500).json({ flag: false, message: 'Somthing went wrong, Try after sometime ' })

        res.status(200).json({ flag: true, message: 'Logging in...', data: { token } })


    } catch (error) {
        console.log(error)
    }
}


async function getUserProfile(req, res) {


    try {

        const userId = req.user.id

        const user = await userModel.findOne({ _id: userId }).select('-password')

        const userProducts = await productModel.find({ userId })

        if (!userProducts) return res.status(404).json({ flag: false, message: 'No products found' })

        res.status(200).json({ flag: true, user, userProducts })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {

    registerUser,
    loginUser,
    getUserProfile
}