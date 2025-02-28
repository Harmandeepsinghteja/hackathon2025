// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "@/firebase/config"; // Ensure this is correctly initialized

// Initialize Firebase Authentication
const auth = getAuth(firebaseApp);

export const AuthContext = createContext(null);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          Loading...
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
