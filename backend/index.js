const express = require('express')
const app = express()

// routes
const AccountRouter = require('./routes/accountRouter.js')

app.use(express.json());
app.use("/account", AccountRouter)

app.listen(3000, () => {
    console.log('Listening on port 3000')
})
