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

            return res.json({succes: false, error: info.message})
        }
        req.login(user, err=>{
            if(err)
                return next(err)
        })
        return res.json({succes:true})
       
        
    })(req, res, next)
})

// router.post('/login', upload.none(), (req, res)=>{
//     console.log(req.body)
//     res.json({succes: false})
// })
    
module.exports = router;