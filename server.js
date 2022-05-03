

const fs = require('fs')

const express = require('express');
const app = express();



const passport = require('passport');
const flash = require('express-flash')
const session = require('express-session');
const MongoStore = require('connect-mongo')
const methodOverride = require('method-override')



let sessionStore

if (process.env.NODE_ENV === 'production') {
    require('./config/database').connection().catch(console.error)
    sessionStore = MongoStore.create({
        mongoUrl: process.env.DB_URL_PRODUCTION
    })
}
else{

    require('dotenv').config()
    require('./config/database').connection().catch(console.error)
    sessionStore = MongoStore.create({
        mongoUrl: process.env.DB_URL_DEVELOPMENT
    })
}




app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(flash())
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


// routes
const loginRouter = require('./routes/LoginRouter')
const registerRouter = require('./routes/RegisterRouter')
const homePageRouter = require('./routes/HomePageRouter')
const profileRouter = require('./routes/ProfileRouter')
const imageCreatorRouter = require('./routes/ImageCreatorRouter')
const entryRouter = require('./routes/EntryRouter')
const threadRouter = require('./routes/ThreadRouter')
const apiImageRouter = require('./routes/API/ImageRouter')
const apiEntryRouter = require('./routes/API/EntryRouter')
const apiThreadRouter = require('./routes/API/ThreadRouter')

app.use(apiImageRouter)
app.use(loginRouter)
app.use(registerRouter)
app.use(homePageRouter)
app.use(profileRouter)
app.use(imageCreatorRouter)
app.use(entryRouter)
app.use(threadRouter)
app.use(apiEntryRouter)
app.use(apiThreadRouter)

app.get('/logout', (req, res)=>{
    req.logOut()
    res.redirect('/')
});

app.listen(8080, ()=>{
    console.log('listening on port 8080')
})