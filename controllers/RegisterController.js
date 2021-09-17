const User = require('../model/User')
const bcrypt = require('bcrypt');

function registerGet(req, res){
    res.render('register/register');
}

async function createUser(req, res){
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        let user = new User({
            name : req.body.login,
            password : hashedPassword,
            joiningDate: Date.now()
        });
        console.log(user);
        user = await user.save();
        res.redirect('/');
    }catch(err){
        console.error(err);
    }
} 


async function registerPost(req, res){
    try{
        const user = await User.findOne({name: req.body.login});

        if(user === null){
            console.log('creating user')
            createUser(req, res);
            res.redirect('/')
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