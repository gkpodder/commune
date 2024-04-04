const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
require('dotenv').config();

const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT);

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function getMessages(db) {
    try {
      const messagesCol = db.collection('messages'); // Reference the 'messages' collection
      const messagesSnapshot = await messagesCol.get();
      const messageList = messagesSnapshot.docs.map(doc => doc.data());
      return messageList;
    } catch (error) {
      console.error('Error getting messages:', error);
      throw error;
    }
  }
  
  const getAllMessages = async () => {
    console.log("Get all messages call");
  
    try {
      const messageList = await getMessages(db);
      console.log(messageList)
      return messageList;
    } catch (error) {
      console.error('Error getting all messages:', error);
      throw error;
    }
  };



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

const sendMessage = async(body, password) => {
    
}

module.exports = {
    getAllMessages,
    sendMessage
}