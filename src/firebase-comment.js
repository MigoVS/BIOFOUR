import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection, addDoc } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDgxd4_Zj6xAsTDfWd8y4WKb6c-En9S0wQ",
    authDomain: "biofour-36ea6.firebaseapp.com",
    projectId: "biofour-36ea6",
    storageBucket: "biofour-36ea6.firebasestorage.app",
    messagingSenderId: "549852419537",
    appId: "1:549852419537:web:612574335f640211f2fcf0",
    measurementId: "G-JYCBGBTWR1"
};

// Initialize with a unique name
const app = initializeApp(firebaseConfig, 'comments-app');
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, collection, addDoc };