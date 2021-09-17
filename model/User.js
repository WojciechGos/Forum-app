const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name:{
        type : String,
        required : true
    }, 
    profileImage:{
        data: Buffer,
        contentType: String
    },
    password: {
        type : String,
        required: true
    }, 
    joiningDate:{
        type : Date,
        default: Date.now()
    },
    description: String,
    profileImage: String, // path
    thread: Array
});

module.exports = mongoose.model('User', userSchema);