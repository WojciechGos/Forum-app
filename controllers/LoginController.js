const User = require('../model/User');
const mongoose = require('mongoose');
const UserPermisions = require('../UserPermissions')

function loginGet(req, res){
    res.render('login', {data: UserPermisions.getData(req)});
}




module.exports = {
    loginGet,
}