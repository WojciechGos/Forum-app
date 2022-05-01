const mongoose = require('mongoose')

async function connection(){
    mongoose.connect(process.env.DB_URL)
    console.log("connected to db")
}

module.exports.connection = connection