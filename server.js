const express = require('express');
const app = express();
const loginRegisterRouter = require('./model/routes/LoginRegisterRoutes');


app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
// routes
app.use(loginRegisterRouter);
app.use(express.static('views'));

app.get('/', (req, res)=>{
    res.render('index');
});

app.listen(5000 ,() =>{
    console.log("listening")
});
