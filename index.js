const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/connectDB')
dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT
app.listen(PORT, () => {

    console.log('Server is up at', PORT)
    connectDB()
})

const userRoutes = require('./routes/user.routes')
const productRoutes = require('./routes/product.routes')
const otpRoutes = require('./routes/otp.routes')

app.use('/user', userRoutes)
app.use('/product', productRoutes)
app.use('/otp', otpRoutes)