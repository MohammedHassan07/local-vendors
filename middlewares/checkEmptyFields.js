function checkEmpty(req, res, next) {

    const data = req.body

    if (Object.keys(data).length == 0) return res.status(400).json({

        error: "Bad Request",
        message: "Required values are empty."
    })

    for (let key in data) {

        if (data.hasOwnProperty(key)) {

            if (data[key] === null || data[key] === undefined || data[key] === '')

                return res.status(400).json({

                    error: "Bad Request",
                    message: "Required values are empty."
                })
        }
    }

    next()
}

module.exports = checkEmpty