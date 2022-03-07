const express = require('express');
const router = express.Router();
const {loginGet} = require('../controllers/LoginController')
const passport = require('passport')
const upload = require('../config/multer').upload

router.get('/login', loginGet);

// router.post('/login', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/',
//     failureFlash: true
// }))

router.post('/login', upload.none(), (req, res)=>{
    console.log(req.body)
    res.json({succes: false})
})
    
module.exports = router;