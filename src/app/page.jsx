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
                <h1 className="text-black text-3xl  font-bold text-center mb-6">Welcome to Legacy</h1>
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
        {/* <Header /> */}
        <header className="bg-white text-gray-800 py-2 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4">


        {/* Left: Logo or Brand */}
        <div className="flex items-center space-x-2">
        {/* <div className="flex flex-col items-center justify-center"> */}
        <img src="/tree.jpg" className="" style={{ width: '50px' }} />
            {/* <a href="http://www.freepik.com">Designed by Freepik</a> */}
          <Link href="/" className="text-lg font-bold">
            Legacy
          </Link>
        </div>

        {/* Right: Navigation Links */}
        <nav className="ml-auto">
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-indigo-300 text-sm">Home</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-indigo-300 text-sm">About</Link>
            </li>
            <li>
              <Link href="/signin" className="hover:text-indigo-300 text-sm">My Account</Link>
            </li>
            
          </ul>
        </nav>

      </div>
    </header>
         
        {/* <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100"> */}
        <Sidebar />

        </>
    );
}