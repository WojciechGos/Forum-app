const upload = require('../Utils/multer').upload
const express = require('express')
const router = express.Router()
const commentPost = require('../controllers/CommentController').commentPost
const commentGet = require('../controllers/CommentController').commentGet


router.post('/comment/:folder', upload.none(), commentPost)

router.get('/comment/:folder', commentGet)


module.exports = router