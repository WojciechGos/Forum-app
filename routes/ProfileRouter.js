const express = require('express');
const router = express.Router();
const {profileGet, profilePost, profilePut } = require('../controllers/ProfileController')

router.get('/profil/:username',  profileGet)
router.post('/profil/:username',  profilePost)
router.put('/profil/:username', profilePut)



module.exports = router