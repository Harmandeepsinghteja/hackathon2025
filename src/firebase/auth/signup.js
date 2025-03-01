import { redirect } from "next/navigation";
import firebase_app from "../config"; // Firebase app initialization
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

// Initialize Firebase Authentication
const auth = getAuth(firebase_app);

// Sign up function
export default async function signUp(_, formData) {
  try {
    const email = formData.get("email")
    const password = formData.get("password")

    await createUserWithEmailAndPassword(auth, email, password);
  }
  catch(error){
    return {message: error.message}
  }
  
  redirect('/admin')
}
