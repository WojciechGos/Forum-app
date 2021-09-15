const mongoose = require('mongoose');

const connection = mongoose.connect(process.env.DB_URL).then(()=>{
    console.log('connected');
    
}).catch((err)=>{
    console.error(err);
})

module.exports.connection = connection