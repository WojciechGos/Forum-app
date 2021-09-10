const express = require('express');
const router = express.Router();
const {loginGet,  loginPost} = require('../controllers/LoginController')

router.get('/login', loginGet);


    
module.exports = router;