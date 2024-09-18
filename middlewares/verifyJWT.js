const jwt = require("jsonwebtoken")

async function verifyJWT(req, res, next) {

    const token = req.headers.token

    if (!token) return res.status().json({ flag: false, message: 'Something wnet wrong, You need to log in again' })

    const ACCESS_TOKEN = process.env.ACCESS_TOKEN
    const user = jwt.verify(token, ACCESS_TOKEN)

    if (!user) return res.status().json({ flag: false, message: 'Something wnet wrong, You need to log in again' })

    req.user = user
    next()
}

module.exports = verifyJWT