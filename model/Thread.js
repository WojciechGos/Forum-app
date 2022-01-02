const mongoose = require('mongoose')

const threadSchema = new mongoose.Schema({
    title:String,
    description: String,
})

module.exports = mongoose.model('Thread', threadSchema)