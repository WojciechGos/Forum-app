const mongoose = require('mongoose')

const threadSchema = new mongoose.Schema({
    title: String,
    posts: Array, 
})

module.exports = mongoose.model('Thread', threadSchema)