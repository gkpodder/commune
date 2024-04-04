const express = require('express')
const router = express.Router()
const ConversationController = require("../controllers/conversationController.js")

router.post("/create", ConversationController.createConversationRequest)

router.get("/get", ConversationController.getConversationRequests)

module.exports = router