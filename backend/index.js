const express = require('express')
const app = express()

// routes
const AccountRouter = require('./routes/accountRouter.js');
const ConversationRouter = require('./routes/conversationRouter.js');

app.use(express.json());
app.use("/account", AccountRouter)
app.use("/conversation", ConversationRouter)

app.listen(3000, () => {
    console.log('Listening on port 3000')
})
