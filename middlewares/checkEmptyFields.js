function checkEmpty(req, res, next) {

    const data = req.body

    try {

        if (Object.keys(data).length == 0) return res.status(400).json({

            error: "Bad Request",
            message: "Required values are empty."
        })


        for (const key of Object.keys(data)) {

            if (data[key] === null || data[key] === undefined || data[key] === '')

                return res.status(400).json({

                    error: "Bad Request",
                    message: "Required values are empty."
                })
        }

        next()
    } catch (error) {

        console.log(error)
        return res.status(500).json({

            error: "Bad Request",
            message: error.message
        })
    }
}

module.exports = checkEmpty