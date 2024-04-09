const firebaseService = require('./firebaseService');
const { generateKey } = require('./keyHelper');
require('dotenv').config();

const db = firebaseService.initializeApp();

async function getMasterKeys(sender, recipient) {
    try {
        const keysCol = db.collection('keys');
        const senderSnapshot = await keysCol.where('email', '==', sender).get();
        const recipientSnapshot = await keysCol.where('email', '==', recipient).get();

        if (senderSnapshot.empty) {
            throw new Error('Sender not found');
        } else if (recipientSnapshot.empty) {
            throw new Error('Recipient not found');
        }

        const senderData = senderSnapshot.docs[0].data();
        const recipientData = recipientSnapshot.docs[0].data();

        return [senderData.key, recipientData.key];
    } catch (error) {
        console.error('Keys for sender and recipient not found:', error);
        throw error;
    }
}

const createNewDocument = async (collectionName, data) => {
    try {
      const docRef = await db.collection(collectionName).add(data);
      console.log('Document written with ID:', docRef.id);
      return docRef.id; // Return the ID of the newly created document
    } catch (error) {
      console.error('Error creating document:', error);
      throw error;
    }
  };


const createConversationRequest = async (sender, recipient, chatName) => {
    console.log("creating conversation request");

    try {
        const [senderKey, recipientKey] = await getMasterKeys(sender, recipient);

        sessionKey = generateKey();

        const collectionName = 'requests';
        const newRequestData = {
            sender: senderKey,
            recipient: recipientKey,
            senderEmail: sender,
            recipientEmail: recipient,
            master: sessionKey,
            chatName: chatName
        }

        createNewDocument(collectionName, newRequestData)
        .then((documentId) => {
            return ('New document created with ID: ' + documentId);
        })
        .catch((error) => {
            console.error('Error creating request: ' + error);
            return null;
        })

        const collectionRef = db.collection('chats'); // Replace 'your-collection-name' with your actual collection name
        const snapshot = await collectionRef.get();
        const count = snapshot.size;

        return {
            key: senderKey + "(" + sessionKey + ")",
            chatId: count
        };
    } catch (error) {
        console.error('Error creating document:', error);
        return false; // Return false if there's an error creating the document
    }
}

const getConversationRequests = async (email) => {
    console.log("get request call!")

    try {
        const collectionName = 'requests';
        const requestsCol = db.collection(collectionName);
        const snapshot = await requestsCol.where("recipientEmail", "==", email).get();

        const requests = [];
        snapshot.forEach((doc) => {
            const requestData = doc.data();
            requests.push({
                sender: requestData.sender,
                recipient: requestData.recipient,
                senderEmail: requestData.senderEmail,
                recipientEmail: requestData.recipientEmail,
                master: requestData.master,
                documentId: doc.id
            });
        });

        return requests;
    } catch (error) {
        console.error('Error getting conversation requests:', error);
        return []; // Return an empty array if there's an error
    }
}

const acceptConversationRequest = async (senderEmail, recipientEmail) => {
    console.log("accept request call")

    const currentTime = new Date();

    // get chatId by incrementing the Id
    const collectionRef = db.collection('chats'); // Replace 'your-collection-name' with your actual collection name
    const snapshot = await collectionRef.get();
    const count = snapshot.size;

    const requestsCol = db.collection('requests');
    const requestQuery = await requestsCol
    .where('senderEmail', '==', senderEmail)
    .where('recipientEmail', '==', recipientEmail)
    .limit(1)
    .get();
    const chatName = requestQuery.docs[0].data().chatName;
    const master = requestQuery.docs[0].data().master;
    const recipient = requestQuery.docs[0].data().recipient;

    const newChatData = {
        chatId: count,
        chatName: chatName,
        lastMessage: "This is a new chat",
        lastActive: currentTime,
        unreadCount: 0,
    }

    try {
        // add to chats of sender and recipient
        const collectionName = 'users';
        const usersCol = db.collection(collectionName);
        
        // find and update sender's chat
        const senderQuery = await usersCol.where('email', '==', senderEmail).get();
        if (!senderQuery.empty) {
            const senderDoc = senderQuery.docs[0];
            const senderData = senderDoc.data();
            const updatedSenderChats = [...senderData.chats, newChatData];
            await senderDoc.ref.update({ chats: updatedSenderChats });
        } else {
            throw new Error('Sender not found');
        }

        // find and update recipient's chat
        const recipientQuery = await usersCol.where('email', '==', recipientEmail).get();
        if (!recipientQuery.empty) {
            const recipientDoc = recipientQuery.docs[0];
            const recipientData = recipientDoc.data();
            const updatedRecipientChats = [...recipientData.chats, newChatData];
            await recipientDoc.ref.update({ chats: updatedRecipientChats });
        } else {
            throw new Error('Recipient not found');
        }

        console.log('Chats updated successfully');

        // insert into chats collection
        const chatData = {
            chatName: chatName,
            chatId: count
        }

        createNewDocument("chats", chatData)
        .then((documentId) => {
            return ('New document created with ID: ' + documentId);
        })
        .catch((error) => {
            console.error('Error creating request: ' + error);
            return null;
        })

        // insert into keys collection twice
        const keyDataSender = {
            email: senderEmail,
            chatId: count,
            key: master,
            type: "session"
        }

        createNewDocument("keys", keyDataSender)
        .then((documentId) => {
            return ('New document created with ID: ' + documentId);
        })
        .catch((error) => {
            console.error('Error creating request: ' + error);
            return null;
        })

        // insert into keys collection
        const keyDataRecipient = {
            email: recipientEmail,
            chatId: count,
            key: master,
            type: "session"
        }

        createNewDocument("keys", keyDataRecipient)
        .then((documentId) => {
            return ('New document created with ID: ' + documentId);
        })
        .catch((error) => {
            console.error('Error creating request: ' + error);
            return null;
        })

        // delete the request from requests
        const requestsCol = db.collection('requests');
        const requestQuery = await requestsCol
            .where('senderEmail', '==', senderEmail)
            .where('recipientEmail', '==', recipientEmail)
            .get();

        const batch = db.batch();
        requestQuery.forEach((doc) => {
            batch.delete(doc.ref);
        });

        await batch.commit();

        console.log('Request deleted successfully');
        return {
            key: recipient + "(" + sessionKey + ")",
            chatId: count
        };
    } catch (error) {
        console.error('Error accepting conversation request:', error);
        throw error;
    }
}

module.exports = {
    createConversationRequest,
    getConversationRequests,
    acceptConversationRequest
}
