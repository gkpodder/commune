const SummaryService = require("../services/summarizeService.ts");

const getSummary = async (req, res) => {
    try {
        const chatContents = req.body;
        const summaries = {};

        // Generate summaries for each chat
        for (const chatId in chatContents) {
            const content = chatContents[chatId].content;
            const summary = await SummaryService.genSummary(content);
            summaries[chatId] = { content: summary };
        }
        res.send(summaries);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error generating summary' });
    }
}

//export the function
module.exports = { getSummary };
