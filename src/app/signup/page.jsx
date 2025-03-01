"use client";

import Header from '../../components/Header';
import { useState } from "react";
import { useFormState } from 'react-dom';
import signUp from "@/firebase/auth/signup";
import Link from "next/link";

const initialState = {
  message: '',
}

export default function SignupPage() {
  const [state, formAction, pending] = useFormState(signUp, initialState)
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
    <Header />
   {/* <div className="flex items-center justify-center min-h-screen bg-gray-100"> */}
   <div
        className="flex flex-col bg-cover bg-center bg-no-repeat items-center justify-center min-h-screen bg-gray-100"
        style={{ backgroundImage: "url('/home_tree.jpg')" }}
      >
      <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-center mb-8 text-black">
          Sign Up
        </h1>
        <form action={formAction} className="space-y-4">
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
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-100 text-gray-700"
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
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-100 text-gray-700"
              required
            />
          </div>
          <p className="text-red-600" aria-live="polite">{state?.message}</p>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-900 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
            disabled={pending}
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/signin" className="text-indigo-600 font-bold">
            Log In
          </Link>
        </p>
      </div>
    </div>

    </>
  );
}
