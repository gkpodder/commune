const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
require('dotenv').config();

const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT);

class FirebaseService {
    constructor() {
        this.firestoreInstance = null;
    }

    initializeApp() {
        if (!this.firestoreInstance) {
            const app = initializeApp({
                credential: cert(serviceAccount)
            });
            this.firestoreInstance = getFirestore(app);
        }
        return this.firestoreInstance;
    }

    getFirestore() {
        if (!this.firestoreInstance) {
            throw new Error('Firebase app not initialized');
        }
        return this.firestoreInstance;
    }
}

module.exports = new FirebaseService();