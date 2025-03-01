// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrf6oOYd61TxNEUGNOhS-fy5T_1Yicn3E",
  authDomain: "hackathon-b0456.firebaseapp.com",
  projectId: "hackathon-b0456",
  storageBucket: "hackathon-b0456.firebasestorage.app",
  messagingSenderId: "908266648875",
  appId: "1:908266648875:web:194ea511892b0980df016e"
};

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);
const db = getFirestore(firebase_app);
const auth = getAuth(firebase_app);
const storage = getStorage(firebase_app);
export { auth };
export default firebase_app;
export { db, storage };
