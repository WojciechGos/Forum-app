const express = require('express')
const router = express.Router()
const entryPost = require('../controllers/EntryController').entryPost
const entryGet = require('../controllers/EntryController').entryGet

const upload = require('../Utils/multer').upload

router.get('/entry/:date/:index/:thread', entryGet)


router.post('/entry', upload.none(), entryPost)


module.exports = router