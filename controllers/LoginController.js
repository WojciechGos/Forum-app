const User = require('../model/User');
const mongoose = require('mongoose');


function loginGet(req, res){
    res.render('login', {userPermission: req.user});
}




module.exports = {
    loginGet,
}