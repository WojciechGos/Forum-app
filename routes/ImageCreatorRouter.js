const express = require('express')
const router = express.Router()
const {ImageCreatorGet} = require('../controllers/ImageCreatorController')

router.get('/imageCreator/:seed', ImageCreatorGet)


module.exports = router