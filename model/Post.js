const mongoose = require('mongoose');
const {Schema} = mongoose;

const postSchema = new Schema({
    title: String,
    user: String,
    thread: String,
    date: Date,
    content: String
});