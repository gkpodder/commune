const SummaryService = require("../services/summarizeService.ts");

const getSummary = async (req, res) => {
    console.log("get summary call")
    try {
        const chatContents = req.body;
        const summaries = {};

        // Generate summaries for each chat
        for (const chatId in chatContents) {
            const content = chatContents[chatId].content;
            if (content) {
                const summary = await SummaryService.genSummary(content);
                summaries[chatId] = { content: summary };
            } else {
                summaries[chatId] = { content: "User is up to date with this chat"};
            }
            
            
        }
        res.send(summaries);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error generating summary' });
    }
}

const getConcatGroups = async (req, res) => {
    try {
        //pass in the email of the user
        const chats = await SummaryService.getConcatenatedUserChatsById(req.body.user);
        res.send(chats);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error getting groups' });
    }
}

//export the function
module.exports = { getSummary, getConcatGroups };

