const express = require('express')
const router = express.Router()
const threadGet = require('../../controllers/API/ThreadController').threadGet

router.get('/thread', threadGet)

module.exports = router