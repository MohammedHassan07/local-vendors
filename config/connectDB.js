const mongoose = require('mongoose')

async function connectDB() {

    try {


        const DB_CONNNECTION_STRING = process.env.DB_CONNNECTION_STRING
        const connection = await mongoose.connect(DB_CONNNECTION_STRING)

        if (connection) console.log('connected')
    }catch(error) {

        console.log(error)
    }
}

module.exports = connectDB