const express = require('express');
const router = express.Router();
const {profileGetLoggedUser, profileGetByUserName } = require('../controllers/ProfileController')

router.get('/profile', profileGetLoggedUser)

// look for how to find user by username
router.get('/profile/:id', profileGetByUserName)

module.exports = router