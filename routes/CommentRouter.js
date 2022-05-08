const upload = require('../Utils/multer').upload
const express = require('express')
const router = express.Router()
const commentPost = require('../controllers/CommentController').commentPost


router.post('/comment/:folder', upload.none(), commentPost)

module.exports = router