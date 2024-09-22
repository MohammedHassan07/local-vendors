const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        const imagePath = path.join(__dirname, '../images')
        cb(null, imagePath)
    },
    filename: (req, file, cb) => {

        const fileName = Math.random()
        return cb(null, file.originalname + '-' + fileName + '.jpg')
    }
})


const upload = multer({ storage })

module.exports = upload

