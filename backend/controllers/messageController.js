const MessageService = require("../services/messageService");
const AccountService = require("../services/accountService");



getAllMessages = async(req, res) => {
    const { email, chatId } = req.query;
    console.log(req.query)
    const AllMessages = await MessageService.getAllMessages();
    const updateLastActive = await AccountService.updateLastActive(email, chatId);
    res.send(AllMessages);
}


sendMessage = async(req, res) => {
    try {
        const newMessageData = req.body; // Access the message data from the request body
        const result = await MessageService.sendMessage(newMessageData);
        res.status(201).json({ message: 'Message sent successfully', result });
      } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
   
}

module.exports = {
    getAllMessages,
    sendMessage
}