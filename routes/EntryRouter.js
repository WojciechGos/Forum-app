const express = require('express')
const router = express.Router()
const entryPost = require('../controllers/EntryController').entryPost

router.post('/post', entryPost)


module.exports = router