'use client';
import Link from 'next/link';

import Header from '../components/Header';

export default function Home() {
    return (
        <main>
        <Header />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            
            <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
                <h1 className="text-red-500 text-3xl  font-bold text-center mb-6">Welcome to My App</h1>
                <p className="text-gray-600 text-center mb-8">
                    This is a full-stack app built with Next.js 13 and Firebase.
                </p>
               
            </div>
        </div>

        </main>
    );
}