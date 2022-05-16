const express = require('express')
const router = express.Router()
const { imageCreatorGet, imageGet, profileImageGet} = require('../controllers/ImageController')

router.get('/image/:folder/:name', imageGet)
router.get('/imageCreator/:seed', imageCreatorGet)
router.get('/imageProfiles/:name', profileImageGet)


module.exports = router