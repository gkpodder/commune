const express = require('express')
const router = express.Router()
const SummarizeController = require("../controllers/summarizeController.ts")

//post request to /summarize
router.post('/', SummarizeController.getSummary)

//export the router
module.exports = router