const express = require('express')
const router = express.Router()
const entryPost = require('../controllers/EntryController').entryPost
const entryGet = require('../controllers/EntryController').entryGet
const upload = require('../config/multer').upload

router.post('/entry', upload.none(), entryPost)
router.get('/entry', entryGet)


module.exports = router