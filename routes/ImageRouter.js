const express = require('express')
const router = express.Router()
const {imageCreatorGet} = require('../controllers/ImageController')
const {imageGet} = require('../controllers/ImageController')

router.get('/image/:folder/:name', imageGet)
router.get('/imageCreator/:seed', imageCreatorGet)


module.exports = router