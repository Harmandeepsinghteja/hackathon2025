import firebase_app from "../config"; // Firebase app initialization
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

// Initialize Firebase Authentication
const auth = getAuth(firebase_app);

// Sign up function
export default async function signUp(email, password) {
  let result = null;
  let error = null;
  console.log(email);
  try {
    // Attempt to create user with email and password
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e; // Capture any errors
  }

  // Return the result and error
  return { result, error };
}
