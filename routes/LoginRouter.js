const express = require('express');
const router = express.Router();
const {loginGet} = require('../controllers/LoginController')
const passport = require('passport')

router.get('/login', loginGet);

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

    
module.exports = router;