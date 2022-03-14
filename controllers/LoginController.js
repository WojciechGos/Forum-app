const User = require('../model/User');
const mongoose = require('mongoose');


function loginGet(req, res){
    try{
        let userPermission = getUserPermission(req.user)
        res.render('login', {userPermission: userPermission});
    }catch(e){
        console.error(e)
    }
}




module.exports = {
    loginGet,
}