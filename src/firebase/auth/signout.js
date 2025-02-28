import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";

const handleSignOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log("Error signing out:", error.message);
  }
};

export default handleSignOut;
