const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
require('dotenv').config();

const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT);

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function getUsers(db) {
    try {
      const usersCol = db.collection('users'); // Reference the 'users' collection
      const usersSnapshot = await usersCol.get();
      const userList = usersSnapshot.docs.map(doc => doc.data());
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
    console.log("Logging in call")

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

const signUp = async(email, password) => {
    console.log("Signing up call")

    const collectionName = 'users';
    const newUserData = {
        email: email,
        chats: []
    };

    createNewDocument(collectionName, newUserData)
    .then((documentId) => {
        return ('New document created with ID:' + documentId);
    })
    .catch((error) => {
        console.error('Error creating document:', error);
        return null;
    });
}

module.exports = {
    getAllUsers,
    signIn,
    signUp
}