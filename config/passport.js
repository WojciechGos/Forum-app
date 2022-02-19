const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../model/User')
const passport = require('passport')

/* TODO

TypeError: req.flash is not a function
    at allFailed (C:\xampp\htdocs\projekty\node\forum\node_modules\passport\lib\middleware\authenticate.js:131:15)
    at attempt (C:\xampp\htdocs\projekty\node\forum\node_modules\passport\lib\middleware\authenticate.js:180:28)
    at Strategy.strategy.fail (C:\xampp\htdocs\projekty\node\forum\node_modules\passport\lib\middleware\authentiddleware\authenticate.js:302:9)
    at verified (C:\xampp\htdocs\projekty\node\forum\node_modules\passport-local\lib\strategy.js:82:30)        js:82:30)                                                                                     port.js:17:16)   
    at Strategy.authenticateUser [as _verify] (C:\xampp\htdocs\projekty\node\forum\config\passport.js:17:16)


*/

async function authenticateUser(username, password, done){
    
    let user
    try{
        user = await User.findOne({name:username})
    }catch(e){
        console.error(e);
    }
    console.log(user)

    if(user == null){
        return done(null, false, {message: 'No user with that name'});
    }
    try{
        if(await bcrypt.compare(password, user.password)){
            console.log('user logged')
            return done(null, user);
        }else{
            return done(null, false, {message: 'Password incorrect'})
        }
    }catch(err){
         return done(err);
    }
}

const strategy = new localStrategy({usernameField: 'username', passwordField: 'password'}, authenticateUser)

passport.use(strategy)
    
passport.serializeUser((user, done)=>{
    done(null, user)
})

passport.deserializeUser((userId, done)=>{
    User.findById(userId)
        .then((user)=>{
            done(null, user)
        })
        .catch(e => done(err))
})

