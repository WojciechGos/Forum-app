const express = require('express');
const router = express.Router();
const {profileGet, profilePost, profilePut } = require('../controllers/ProfileController')
const upload = require('../config/multer').upload

router.get('/profil/:username',  profileGet)
router.post('/profil/:username',upload.single('avatar') ,  profilePost)
router.put('/profil/:username', profilePut)



module.exports = router