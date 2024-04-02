const express = require('express')
const router = express.Router()
const AccountController = require("../controllers/accountController.js")

router.get("/", AccountController.getAllUsers)

router.post("/signIn", AccountController.signInUser)

router.post("/signUp", AccountController.signUpUser)

router.get("/name", function (req, res) {
    res.send("Wiki home page")
})

module.exports = router