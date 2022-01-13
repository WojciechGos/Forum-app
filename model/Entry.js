const mongoose = require('mongoose');
const {Schema} = mongoose;

const entrySchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        // required: true
    },
    title: {
        type: String,
        // required:true
    },
    thread: {
        type: mongoose.Types.ObjectId,
        // required: true
    },
    date:{
        type: Date,
        default: Date.now()
    },
    content_path: {
        type: String,
    },
    comment: Array

});

module.exports = mongoose.model('Entry', entrySchema )