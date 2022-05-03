const mongoose = require('mongoose')

async function connection(){

    

    if (process.env.NODE_ENV !== 'production') {
        mongoose.connect(process.env.DB_URL_DEVELOPMENT)
    }
    else{
        mongoose.connect(process.env.DB_URL_PRODUCTION)
    }
    console.log("connected to db")
}

module.exports.connection = connection