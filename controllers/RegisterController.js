const User = require('../model/User')
const mongoose = require('mongoose')

function registerGet(req, res){
    res.render('register/register');
}

async function createUser(req, res){
    let user = new User({
        name : req.body.login,
        password : req.body.password,
        joiningDate: Date.now()
    });
    try{
        user = await user.save();
        res.redirect('/');
    }catch(err){
        console.log(err);
    }
} 


async function registerPost(req, res){
    try{
        const user = await User.findOne({name: req.body.login});

        if(user === null){
            console.log('creating user')
            // createUser(req, res);
        }else{
            console.log("User Exist");
        }
    }catch(err){
        console.error(err);
    }

   
}



module.exports = {
    registerGet,
    registerPost
}