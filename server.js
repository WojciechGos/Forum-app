const express = require('express');
const app = express();
const loginRouter = require('./routes/LoginRouter');
const registerRouter = require('./routes/RegisterRouter');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/forum').then(()=>{
    console.log('connected');
    app.listen(5000);
    
}).catch((err)=>{
    console.error(err);
})

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use(express.static('views'));
app.use(express.static('views/Register'));

// routes
app.use(loginRouter);
app.use(registerRouter);


app.get('/', (req, res)=>{
    res.render('index');
});

