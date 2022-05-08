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
        type: String,
    },
    date:{
        type: Date,
        default: Date.now()
    },
    directoryId:{
        type:String,
    }
    ,
    content: {
        type: String,
    },
    comment: Array
});

module.exports = mongoose.model('Entry', entrySchema )