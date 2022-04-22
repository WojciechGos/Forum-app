const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../model/User')
const passport = require('passport')

async function authenticateUser(username, password, done){

    
    let user
    try{
        user = await User.findOne({name:username})
    }catch(e){
        console.error(e);
    }
    console.log(user)


    if(user == null){
        return done(null, false, {message: 'Nie ma użytkownika z taką nazwą'});
    }
    try{
        if(await bcrypt.compare(password, user.password)){
            return done(null, user);
        }else{
            return done(null, false, {message: 'Niepoprawne hasło'})
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

