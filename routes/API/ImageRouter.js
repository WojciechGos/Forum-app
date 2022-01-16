const express = require('express')
const router = express.Router()
const imageApiGet = require('../../controllers/API/ImageController').imageApiGet

router.get('/image/:folder/:name', imageApiGet)

module.exports = router







