import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth/';
import { getFirestore } from 'firebase/firestore';
import 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCeHvO1IqooKGjMPnqs8pOk7VWmSlQtyew",
    authDomain: "commune-5a4a9.firebaseapp.com",
    projectId: "commune-5a4a9",
    storageBucket: "commune-5a4a9.appspot.com",
    messagingSenderId: "605382827409",
    appId: "1:605382827409:web:d3e0c880240488a6c04e30",
    measurementId: "G-Q3D6D8R7PT"
  };

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const db = FIREBASE_APP.firestore();
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);