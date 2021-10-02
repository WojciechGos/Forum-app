const User = require('../model/User');
const mongoose = require('mongoose');
const Data = require('../Utils/Data')

function loginGet(req, res){
    try{
        let data = Data.getMainUserData(req.user)
        res.render('login', {data: data});
    }catch(e){
        console.error(e)
    }
}




module.exports = {
    loginGet,
}