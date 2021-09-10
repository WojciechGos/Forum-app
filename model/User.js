const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name:{
        type : String,
        required : true
    }, 
    password: {
        type : String,
        required: true
    }, 
    joiningDate:{
        type : Date,
        default: Date.now()
    } 
});

module.exports = mongoose.model('User', userSchema);