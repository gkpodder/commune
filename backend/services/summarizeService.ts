const { CohereClient } = require("cohere-ai");
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const db = getFirestore();

const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY,
});

// Concatenates the messages of each chat the user is in and returns them
async function getConcatenatedUserChatsById(email) {

    try {

        // For a user, gets all the chats they are in and the last active time
        const account = db.collection('users');
        const accountSnapshot = await account.get();
        const users = accountSnapshot.docs.map(doc => doc.data());
        const user = users.find(user => user.email === email);
        // Retrieves from db in this format {chatId: string, lastActive: Timestamp}
        const chats = user ? user.chats.map(chat => ({ chatId: chat.chatId, time: chat.lastActive ? chat.lastActive.toDate() : null })) : [];

        // Gets all the messages
        const msgs = db.collection('messages');
        const messagesSnapshot = await msgs.get();
        const messages = messagesSnapshot.docs.map(doc => doc.data());

        // Filters messages to only include messages after the last active time
        // const chatMessages = messages.filter(message => {
        //     const chat = chats.find(chat => chat.chatId === message.chatId);
        //     return chat && message.time.toDate() > chat.time;
        // });

        const chatMessages = messages.filter(message => {
            const chat = chats.find(chat => chat.chatId === message.chatId);
            let messageTime;
            if (typeof message.time === 'string') {
                messageTime = new Date(message.time);
            } else if (message.time && typeof message.time.toDate === 'function') {
                messageTime = message.time.toDate();
            }
            return chat && messageTime > chat.time;
        });

        // Groups messages by chatId and sorts them by time and concatenates them
        const chatBodies = {};
        // chats.forEach(chat => {
        //     const chatMsgs = chatMessages.filter(message => message.chatId === chat.chatId);
        //     chatMsgs.sort((a, b) => a.time.toDate() - b.time.toDate());
        //     chatBodies[chat.chatId] = {
        //         content: chatMsgs.map(message => message.sender + ": " + message.body).join(' ')
        //     };
        // });

        chats.forEach(chat => {
            const chatMsgs = chatMessages.filter(message => message.chatId === chat.chatId);
            chatMsgs.sort((a, b) => {
                let timeA, timeB;
                if (typeof a.time === 'string') {
                    timeA = new Date(a.time);
                } else if (a.time && typeof a.time.toDate === 'function') {
                    timeA = a.time.toDate();
                }
                if (typeof b.time === 'string') {
                    timeB = new Date(b.time);
                } else if (b.time && typeof b.time.toDate === 'function') {
                    timeB = b.time.toDate();
                }
                return timeA - timeB;
            });
            chatBodies[chat.chatId] = {
                content: chatMsgs.map(message => message.sender + ": " + message.body).join(' ')
            };
        });

        // Add some hardcoded chat bodies to the chatBodies object
        let contents2 = {

            "1": {
                "content": "Person 1: Hey, Emily, have you watched the latest episode of that new TV series everyone's talking about?\nPerson 2: No, I haven't had the chance to catch up yet. Is it good?\nPerson 1: It's amazing! The plot twists are mind-blowing, and the characters are so well-developed.\nPerson 2: Sounds intriguing! I'll definitely add it to my watchlist.\nPerson 1: You should! We can binge-watch it together sometime.\nPerson 2: That sounds like a plan. Thanks for the recommendation!\nPerson 1: No problem! Let me know when you're free, and we'll set up a viewing party.\nPerson 2: Will do!"
            },
            "11": {
                "content": "Person 1: Hey, Jason, did you hear about the new restaurant that opened up in the neighborhood?\nPerson 2: Yeah, I heard it's getting rave reviews. What kind of food do they serve?\nPerson 1: It's a fusion place, blending flavors from different cuisines. I've heard their sushi burritos are to die for.\nPerson 2: That sounds delicious! We should definitely check it out sometime.\nPerson 1: Absolutely! How about this Friday night?\nPerson 2: Sounds good to me. I'll clear my schedule.\nPerson 1: Great! I'll make a reservation.\nPerson 2: Looking forward to it!"
            },
            "8": {
                "content": "Person 1: Hi, Alex! Have you seen the latest movie that came out last week?\nPerson 2: No, I haven't had the chance yet. Was it any good?\nPerson 1: It was fantastic! The special effects were out of this world, and the storyline kept me on the edge of my seat.\nPerson 2: Sounds like a must-watch! I'll try to catch it this weekend.\nPerson 1: You won't regret it! We can even go together if you're up for it.\nPerson 2: That sounds like a plan. Thanks for the recommendation!\nPerson 1: Anytime! Let me know when you're free, and we'll make it happen.\nPerson 2: Sure thing!"
            },
            "9": {
                "content": "Person 1: Hey, Rachel, have you been following the latest news about space exploration?\nPerson 2: Not really. What's been happening?\nPerson 1: Scientists discovered a new exoplanet that could potentially support life!\nPerson 2: That's incredible! What do we know about it?\nPerson 1: It's in the habitable zone of its star and has similar characteristics to Earth.\nPerson 2: Wow, imagine if there are aliens living there!\nPerson 1: It's definitely an exciting prospect. Who knows what we might find out there.\nPerson 2: Indeed. The universe never ceases to amaze.\nPerson 1: Absolutely. It's a reminder of how much there is still to explore beyond our own planet.\nPerson 2: Makes you wonder what else is out there, doesn't it?\nPerson 1: Absolutely. The possibilities are endless."
            }
        }

        // append the contents2 to chatBodies
        for (const chatId in contents2) {
            chatBodies[chatId] = contents2[chatId];
        }

        return chats;

    } catch (error) {
        console.error(error);
        return { message: 'Error getting concatenated groups' };
    }
}

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
module.exports = { genSummary, getConcatenatedUserChatsById };

