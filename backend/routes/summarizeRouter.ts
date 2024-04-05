const express = require('express')
const router = express.Router()
const SummarizeController = require("../controllers/summarizeController.ts")

//post request to /summarize
router.post('/', SummarizeController.getSummary)
router.post('/chats', SummarizeController.getConcatGroups)

//export the router
module.exports = router