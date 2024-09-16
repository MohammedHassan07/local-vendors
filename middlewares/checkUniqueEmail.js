const userModel = require("../models/user.model")

async function checkUniqueEmail(req, res, next) {

    const email = req.body.email

    const user = await userModel.findOne({ email })

    if (user) return res.status(401).json({ flag: false, message: 'User already present with provided email' })

    next()
}

module.exports = checkUniqueEmail