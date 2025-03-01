'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthContext as useAuth } from '@/context/AuthContext';
import Sidebar from "../components/sidebar"
import { useEffect } from "react";


import Header from '../components/Header';

export default function Home() {
    const {user, loading} = useAuth();
    const router = useRouter(); 
    useEffect(() => {
        // Redirect to home page if not logged in and loading is finished
        if (!loading && !user) {
          router.push("/"); // Redirect if not logged in (optional if you want to redirect)
        }
      }, [user, loading, router]);
    
      // Show loading state while Firebase determines user's status
      if (loading) {
        return <div>Loading...</div>;
      }
    
      // If no user is logged in, we simply return the home page without the buttons div
      if (!user) {
        return (
            <>
            <Header />
            <div
        className="flex flex-col bg-cover bg-center bg-no-repeat items-center justify-center min-h-screen bg-gray-100"
        style={{ backgroundImage: "url('/home_tree.jpg')" }}
      >
            
            <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
                <h1 className="text-black text-3xl  font-bold text-center mb-6">Welcome to the Begining of the End</h1>
                <p className="text-gray-600 text-center mb-8">
                    Sign Up or Sign In To Get Started!
                </p>
               
            </div>
        </div>
            </>
            
        );
      }
    
    return (
        <>
        <Header />
        {/* <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100"> */}
        <Sidebar />

        </>
    );
}