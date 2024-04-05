const express = require('express')
const app = express()

// routes
const AccountRouter = require('./routes/accountRouter.js')
const SummarizeRouter = require('./routes/summarizeRouter.ts')

app.use(express.json());
app.use("/account", AccountRouter)
app.use("/summarize", SummarizeRouter)

app.listen(3000, () => {
    console.log('Listening on port 3000')
})
