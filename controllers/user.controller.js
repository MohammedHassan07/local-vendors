const bcrypt = require('bcryptjs')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

// register user
async function registerUser() {

    try {


        const { name, email, passwrod } = req.body

        // check email and send OTP after varification save the data 


        const PASSWORD_SALT = process.env.PASSWORD_SALT
        const hashsedPassword = await bcrypt.hash(passwrod, PASSWORD_SALT)

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
async function loginUser() {

    try {

        const { email, password } = req.body

        const user = userModel.findOne({ email })

        if (!user) return res.status(500).json({ flag: false, message: 'Invalid Credentials, Check email or password' })

        const valid = await bcrypt.compare(password, user.password)

        if (!valid) return res.status(500).json({ flag: false, message: 'Invalid Credentials, Check email or password' })

        const ACCESS_TOKEN = process.env.ACCESS_TOKEN
        const token = jwt.sign(user, ACCESS_TOKEN)

        if (!token) return res.status(500).json({ flag: false, message: 'Somthing went wrong, Try after sometime ' })

        res.status(200).json({ flag: true, message: 'Logging...', data: { token } })


    } catch (error) {
        console.log(error)
    }
}

module.exports = {

    registerUser,
    loginUser
}