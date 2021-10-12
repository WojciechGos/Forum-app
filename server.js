if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const fs = require('fs')

const express = require('express');
const app = express();

const passport = require('passport');
const flash = require('express-flash')
const session = require('express-session');
const MongoStore = require('connect-mongo')
const methodOverride = require('method-override')

require('./config/database').connection

const sessionStore = MongoStore.create({
    mongoUrl: process.env.DB_URL
})


app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'))
app.use(session({
    secret: process.env.SECRET,
    store: sessionStore,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000*60*60*24 // 24h
    }   
}))
require('./config/passport')
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('views'));
app.use(express.static('views/Register'));

// routes
const loginRouter = require('./routes/LoginRouter');
const registerRouter = require('./routes/RegisterRouter');
const homePageRouter = require('./routes/HomePageRouter')
const profileRouter = require('./routes/ProfileRouter')
const imageCreatorRouter = require('./routes/ImageCreatorRouter');;

app.use(loginRouter)
app.use(registerRouter)
app.use(homePageRouter)
app.use(profileRouter)
app.use(imageCreatorRouter)

app.get('/logout', (req, res)=>{
    req.logOut()
    res.redirect('/')
});

app.listen(5000)