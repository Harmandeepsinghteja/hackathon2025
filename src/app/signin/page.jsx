"use client";

import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import signIn from "@/firebase/auth/signin";
import signOut from "@/firebase/auth/signout";
import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Handle Sign-in
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await signIn(email, password);
    if (error) {
      console.log(error);
    } else {
      router.push("/admin");
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    await signOut();
    setUser(null);
  };

  return (
    <>
      <Header />
      {/* <div className="flex items-center justify-center min-h-screen bg-gray-100"> */}
      <div
        className="flex flex-col bg-cover bg-center bg-no-repeat items-center justify-center min-h-screen bg-gray-100"
        style={{ backgroundImage: "url('/home_tree.jpg')" }}
      >
        <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-center mb-8 text-indigo-600">
            {user ? "Welcome" : "Sign In"}
          </h1>

          {user ? (
            <div className="text-center">
              <p className="text-gray-700 font-bold mb-4">
                Logged in as: {user.email}
              </p>
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-100 text-gray-700"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-100 text-gray-700"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              >
                Sign In
              </button>
            </form>
          )}

          {!user && (
            <p className="mt-4 text-center text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" className="text-indigo-600 font-bold">
                Sign Up
              </Link>
            </p>
          )}
        </div>
      </div>
    </>
  );
}
