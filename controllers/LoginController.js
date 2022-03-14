const User = require('../model/User');
const mongoose = require('mongoose');


function loginGet(req, res){
    try{

        res.render('login', {userPermission: req.user});
    }catch(e){
        console.error(e)
    }
}




module.exports = {
    loginGet,
}