// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTSx7IMETPOEedL0iudnItdXlXLZECxeg",
  authDomain: "hackathon2025-ea6a2.firebaseapp.com",
  projectId: "hackathon2025-ea6a2",
  storageBucket: "hackathon2025-ea6a2.firebasestorage.app",
  messagingSenderId: "374671026372",
  appId: "1:374671026372:web:85523a9995363313458191",
  measurementId: "G-4Z8ZPDHRS7",
};

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);
export default firebase_app;
