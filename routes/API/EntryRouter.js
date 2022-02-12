const entryGet = require('../../controllers/API/EntryController').entryGet
const express = require('express')
const router = express.Router()

router.get('/entry/:date/:index/:thread', entryGet)

module.exports = router