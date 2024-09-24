const otpModel = require("../models/otp.model")
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')

// generate OTP
async function generateOTP(req, res) {

    try {

        const { email } = req.body

        // generate OTP
        const OTP = Math.floor(Math.random() * 9000) + 1000

        const hashOTP = await bcrypt.hash(OTP.toString(), 10)
        const otp = new otpModel({ email, otp: hashOTP })

        await otp.save()

        // send email
        const transporter = nodemailer.createTransport({

            service: 'gmail',
            auth: {

                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASS
            }
        })

        const mailOption = {

            from: process.env.USER_EMAIL,
            to: email,
            subject: 'Street Bazaar OTP',
            text: `Your OTP for Street Bazaar is <b>${OTP}<\b>, expires in 10 minutes`
        }

        await transporter.sendMail(mailOption)

        res.status(200).json({ flag: true, message: 'OTP is sent to your email' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ flag: false, message: error.message })
    }
}

// verfiy OTP
async function verifyOTP(req, res) {

    try {

        const { email, otp } = req.body

        const OTP =  await otpModel.findOne({ email })

        const verified = await bcrypt.compare(otp, OTP.otp)

        if (!verified) return res.status(400).json({flag: false, message: 'OTP not matched'})

        res.status(200).json({flag: true, message: 'Email verified'})

        await otpModel.deleteOne({email})
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = {

    generateOTP,
    verifyOTP
}