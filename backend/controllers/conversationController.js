const conversationService = require('../services/conversationService');

createConversationRequest = async(req, res) => {
    try {
        const { sender, recipient, chatName } = req.body;
        if (!sender || !recipient || !chatName) {
            return res.status(400).send("provide a valid sender and recipient");
        }

        const createSuccess = await conversationService.createConversationRequest(sender, recipient, chatName);
        
        res.send(createSuccess);
    } catch (error) {
        console.error("Error creating conversation request: ", error);
        res.status(500).send("Error creating conversation request");
    }
    
}

getConversationRequests = async(req, res) => {
    try {
        const {email} = req.body;
        if (!email) {
            return res.status(400).send("provide a valid email");
        }

        const conversationRequests = await conversationService.getConversationRequests(email);
        res.send(conversationRequests);
    } catch (error) {
        console.error("Error getting conversation requests: ", error);
        res.status(500).send("Error creating conversation request");
    }
}

acceptConversationRequest = async(req, res) => {
    try {
        const {sender, recipient} = req.body;
        if (!sender || !recipient ) {
            return res.status(400).send("provide a valid sender and recipient");
        }

        const acceptSuccess = await conversationService.acceptConversationRequest(sender, recipient);
        
        res.send(acceptSuccess);
    } catch (error) {
        console.error("Error creating conversation request: ", error);
        res.status(500).send("Error creating conversation request");
    }
}

module.exports = {
    createConversationRequest,
    getConversationRequests,
    acceptConversationRequest
}