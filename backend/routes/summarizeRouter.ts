const express = require('express')
const router = express.Router()
const SummarizeController = require("../controllers/summarizeController.js")

router.get("/", SummarizeController.getSummary)

//export the router
module.exports = router