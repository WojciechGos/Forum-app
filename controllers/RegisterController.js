const User = require('../model/User')
const bcrypt = require('bcrypt');
const createProfileImage = require('../Utils/DiceBear').createProfileImage
const fs = require('fs');
const e = require('express');

function registerGet(req, res){
    let svg = createProfileImage("seed")
    
    res.render('register/register', {image: svg});
}

/*
    todo: set avatar
**/
async function createUser(req, res){
    try{
        let path = `${__dirname}/../Data/Profiles/${req.body.username}-avatar.svg`
        let imageEndPoint = `/imageProfiles/${req.body.username}`
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        let user = new User({
            name : req.body.username,
            password : hashedPassword,
            joiningDate: Date.now(),
            profileImage: imageEndPoint
        });

        let svg = createProfileImage(req.body.avatar)
        fs.writeFile(path, svg, (e)=>{
            console.error(e)
        })
        user = await user.save();
        res.redirect('/');
    }catch(err){
        console.error(err);
    }
} 

async function registerPost(req, res){

    try{
        const user = User.findOne({name: req.body.name})
        if(user != null){
            createUser(req, res)
        }else{

        }
    }catch(e){
        console.error(e)
    }
    
    
   
}



module.exports = {
    registerGet,
    registerPost
}