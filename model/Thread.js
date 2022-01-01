const mongoose = require('mongoose')

const threadSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true  
    },
    description: String,
})

module.exports = mongoose.model('Thread', threadSchema)