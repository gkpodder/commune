import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth/';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMie754Xs-YgObqfcHRKF1XWzka-MaAhI",
  authDomain: "commune2-3c153.firebaseapp.com",
  projectId: "commune2-3c153",
  storageBucket: "commune2-3c153.appspot.com",
  messagingSenderId: "57527031295",
  appId: "1:57527031295:web:3d9bbbb0f2ac7d451743ca"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);