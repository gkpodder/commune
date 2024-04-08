const express = require('express')
const router = express.Router()
const MessageController = require("../controllers/messageController.js")

router.get("/getAllMessages", MessageController.getAllMessages)
router.post("/sendMessage", MessageController.sendMessage)


module.exports = router  