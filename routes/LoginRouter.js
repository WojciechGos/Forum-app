const express = require('express');
const router = express.Router();
const {loginGet} = require('../controllers/LoginController')
const passport = require('passport')
const upload = require('../config/multer').upload

router.get('/login', loginGet);

router.post('/login', upload.none(), (req, res, next) => {

    // console.log()
    if(req.body.username === '' && req.body.password ===''){
        res.json({ succes: false, error: 'Brak danych uwierzytelniających' })
        return
    }
    passport.authenticate('local', (err, user, info)=>{
        if(err){
            console.log(err)
            return next(err)
        }
        if(!user){

            res.json({succes: false, error: info.message})
        }else{
            console.log('succes login')

            res.render('index')
        }
    })(req, res, next)
})

// router.post('/login', upload.none(), (req, res)=>{
//     console.log(req.body)
//     res.json({succes: false})
// })
    
module.exports = router;