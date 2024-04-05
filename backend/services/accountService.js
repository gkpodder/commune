const firebaseService = require('./firebaseService');
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

    try {
      const documentId = await createNewDocument(collectionName, newUserData);
      console.log('New document created with ID:', documentId);
      return true; // Return true if document creation succeeds
  } catch (error) {
      console.error('Error creating document:', error);
      return false; // Return false if there's an error creating the document
  }

}

module.exports = {
    getAllUsers,
    signIn,
    signUp
}