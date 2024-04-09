const { Timestamp, updateDoc, serverTimestamp } = require('firebase-admin/firestore');
const firebaseService = require('./firebaseService');
const { generateKey } = require('./keyHelper');
require('dotenv').config();

const db = firebaseService.initializeApp();

async function getUsers(db) {
    try {
      const usersCol = db.collection('users'); // Reference the 'users' collection
      const usersSnapshot = await usersCol.get();
      const userList = usersSnapshot.docs.map(doc => doc.data().email);
      return userList;
    } catch (error) {
      console.error('Error getting users:', error);
      throw error;
    }
  }
  
  const getAllUsers = async () => {
    console.log("Get all Users call");
  
    try {
      const userList = await getUsers(db);
      return userList;
    } catch (error) {
      console.error('Error getting all users:', error);
      throw error;
    }
  };
  const updateLastActive = async (email, chatID) => {
    try {
      const usersCol = db.collection('users'); // Reference the 'users' collection
      const querySnapshot = await usersCol.where('email', '==', email).get();
  
      if (querySnapshot.empty) {
        throw new Error('User not found');
      }
  
      const userDocRef = querySnapshot.docs[0].ref; // Get the reference to the user document
  
      // 2. Check if chatID exists in user's chats (if applicable):
      const userData = querySnapshot.docs[0].data(); // Get the user document data
      const userChats = userData.chats || []; // Handle potential absence of chats array
  
      // Find the chat with the specified chatID in user's chats
      const chatToUpdate = userChats.find(chat => chat.chatId === parseInt(chatID));
  
      // 3. Update user's lastActive:
      if (chatToUpdate) {
        // Update the lastActive field for the chat
        const currentTime = Timestamp.fromDate(new Date()).toDate();
        await userDocRef.update({
          'chats': userChats.map(chat => {
            if (chat.chatId === parseInt(chatID)) {
              return { ...chat, lastActive: currentTime };
            } else {
              return chat;
            }
          })
        });
  
        console.log('lastActive updated for chat:', chatID);
      } else {
        console.log('User is not part of the chat:', chatID);
      }
    } catch (error) {
      console.error('Error updating lastActive:', error);
      throw error;
    }
  }
  
const signIn = async(email) => {
    console.log("Logging in call");

    try {
        const usersCol = db.collection('users'); // Reference the 'users' collection
        const querySnapshot = await usersCol.where('email', '==', email).get();
    
        if (querySnapshot.empty) {
          throw new Error('User not found');
        }
    
        const userData = querySnapshot.docs[0].data();
    
        // Authentication successful, return user data without password
        return userData.chats;
      } catch (error) {
        console.error('Error signing in:', error);
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

const signUp = async(email) => {
    console.log("Signing up call")

    const collectionName = 'users';
    const newUserData = {
      email: email,
      chats: []
    };

    const keyCollectionName = 'keys';

    const newKey = generateKey();

    const newKeyData =  {
      email: email,
      key: newKey
    }

    try {
      const documentId = await createNewDocument(collectionName, newUserData);
      console.log('New document created with ID:', documentId);

      const keyId = await createNewDocument(keyCollectionName, newKeyData);
      console.log('New document created with ID:', keyId);
      return true; // Return true if document creation succeeds
  } catch (error) {
      console.error('Error creating document:', error);
      return false; // Return false if there's an error creating the document
  }

}

module.exports = {
    getAllUsers,
    signIn,
    signUp,
    updateLastActive
}