const commentGet = require('../../controllers/API/CommentController').commentGet
const express = require('express')
const router = express.Router()

router.get('/comment/:folder', commentGet)

module.exports = router