const express = require('express')
const router = express.Router()
const upload = require('../Utils/multer').upload
const threadGet = require('../controllers/ThreadController').threadGet
const threadPost = require('../controllers/ThreadController').threadPost

router.get('/thread', threadGet)
router.post('/thread', upload.none(), threadPost)


module.exports = router