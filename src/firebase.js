import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { collection, addDoc, getDocs } from "@firebase/firestore"; // Perbarui ini


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgxd4_Zj6xAsTDfWd8y4WKb6c-En9S0wQ",
  authDomain: "biofour-36ea6.firebaseapp.com",
  projectId: "biofour-36ea6",
  storageBucket: "biofour-36ea6.firebasestorage.app",
  messagingSenderId: "549852419537",
  appId: "1:549852419537:web:612574335f640211f2fcf0",
  measurementId: "G-JYCBGBTWR1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };