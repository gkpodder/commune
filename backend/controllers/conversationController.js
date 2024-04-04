const conversationService = require('../services/conversationService');

createConversationRequest = async(req, res) => {
    try {
        const { sender, recipient } = req.body;
        if (!sender || !recipient ) {
            return res.status(400).send("provide a valid sender and recipient");
        }

        const createSuccess = await conversationService.createConversationRequest(sender, recipient);
        
        res.send(createSuccess);
    } catch (error) {
        console.error("Error loggin in user:", error);
        res.status(500).send("Error creating conversation request");
    }
    
}

getConversationRequests = async(req, res) => {
    const conversationRequests = await conversationService.getConversationRequests();
    res.send(conversationRequests);
}

module.exports = {
    createConversationRequest,
    getConversationRequests
}