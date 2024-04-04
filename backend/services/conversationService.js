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


const createConversationRequest = async (sender, recipient) => {
    console.log("creating conversation request");

    try {
        const [senderKey, recipientKey] = await getMasterKeys(sender, recipient);

        masterKey = generateKey();

        const collectionName = 'requests';
        const newRequestData = {
            sender: senderKey,
            recipient: recipientKey,
            master: masterKey
        }

        createNewDocument(collectionName, newRequestData)
        .then((documentId) => {
            return ('New document created with ID: ' + documentId);
        })
        .catch((error) => {
            console.error('Error creating request: ' + error);
            return null;
        })
        return true;
    } catch (error) {
        console.error('Error creating document:', error);
        return false; // Return false if there's an error creating the document
    }
}

const getConversationRequests = async () => {
    try {
        const collectionName = 'requests';
        const requestsCol = db.collection(collectionName);
        const snapshot = await requestsCol.get();

        const requests = [];
        snapshot.forEach((doc) => {
            const requestData = doc.data();
            requests.push({
                sender: requestData.sender,
                recipient: requestData.recipient,
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

module.exports = {
    createConversationRequest,
    getConversationRequests
}
