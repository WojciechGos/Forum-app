const User = require('../model/User')
const mongoose = require('mongoose')

function loginGet(req, res){
    res.render('login');
}

function loginPost(req, res){

}


module.exports = {
    loginGet,
    loginPost,
}