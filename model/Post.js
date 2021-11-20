const mongoose = require('mongoose');
const {Schema} = mongoose;

const postSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required:true
    },
    thread: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    },
    content: {
        type: String,
        required:true
    },
    comment: Array

});