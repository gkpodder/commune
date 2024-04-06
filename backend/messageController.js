const MessageService = require("../services/messageService");

getAllMessages = async(req, res) => {
    console.log("here1");
    const AllMessages = await MessageService.getAllMessages();
    res.send(AllMessages);
}


sendMessage = async(req, res) => {
   
}

module.exports = {
    getAllMessages,
    sendMessage
}