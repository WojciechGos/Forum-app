const express = require('express');
const router = express.Router();
const {registerGet, registerPost } = require('../controllers/RegisterController')
const upload = require('../Utils/multer').upload

router.get('/register', registerGet);

router.post('/register', upload.single('avatar'), registerPost);

    
module.exports = router;