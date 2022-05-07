const express = require('express')
const router = express.Router()
const entryPost = require('../controllers/EntryController').entryPost
const upload = require('../Utils/multer').upload

router.post('/entry', upload.none(), entryPost)


module.exports = router