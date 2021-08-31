const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('views'));

app.get('/', (req, res)=>{
    res.render('index');
});

app.get('/login', (req,res)=>{
    res.render('login');
});

app.listen(5000 ,() =>{
    console.log("listening")
});
