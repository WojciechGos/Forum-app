const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    directoryId: {
        type: String,
    },
    content: {
        type: String,
    },
    comment: Array
});

module.exports = mongoose.model('Comment', commentSchema)