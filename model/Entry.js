const mongoose = require('mongoose');
const {Schema} = mongoose;

const entrySchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
    },
    title: {
        type: String,
    },
    thread: {
        type: mongoose.Types.ObjectId,
    },
    date:{
        type: Date,
        default: Date.now()
    },
    content_path: {
        type: String,
    },
    file_name: String,
    comment: Array

});

module.exports = mongoose.model('Entry', entrySchema )