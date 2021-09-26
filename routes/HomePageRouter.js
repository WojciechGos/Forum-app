const express = require('express')
const router = express.Router()
const homePageGet = require('../controllers/HomePageController').homePageGet

router.get('/', homePageGet)


module.exports = router