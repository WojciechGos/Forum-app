const express = require('express');
const router = express.Router();
const {registerGet, registerPost } = require('../controllers/RegisterController')



router.get('/register', registerGet);

router.post('/register', registerPost);

    
module.exports = router;