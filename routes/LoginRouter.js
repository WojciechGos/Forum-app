const express = require('express');
const router = express.Router();
const {loginGet} = require('../controllers/LoginController')
const passport = require('passport')

router.get('/login', loginGet);

// router.post('/login', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/',
//     failureFlash: true
// }))

router.post('/login', (req, res)=>{
    console.log(req.body)
})
    
module.exports = router;