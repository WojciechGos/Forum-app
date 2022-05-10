const mongoose = require('mongoose');
const {Schema} = mongoose;

const entrySchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
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
    comment: [{type:Schema.ObjectId, ref:'Comment'} ]
});

module.exports = mongoose.model('Entry', entrySchema )