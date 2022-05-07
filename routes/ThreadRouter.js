const express = require('express')
const router = express.Router()
const upload = require('../Utils/multer').upload

const threadPost = require('../controllers/ThreadController').threadPost

router.post('/thread', upload.none(), threadPost)


module.exports = router