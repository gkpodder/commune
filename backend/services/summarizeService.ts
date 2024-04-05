const { CohereClient } = require("cohere-ai");


const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY,
});

// Function to generate a summary
async function genSummary(content) {
    const summary = await cohere.chat({
        message: content,
        preamble: "Summarize the following text",
    });
    console.log(summary.text)
    return summary.text;
}

// Export the function
module.exports = { genSummary };

