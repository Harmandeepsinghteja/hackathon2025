'use client';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center mb-6">Welcome to My App</h1>
                <p className="text-gray-600 text-center mb-8">
                    This is a full-stack app built with Next.js 13 and Firebase.
                </p>
                <div className="flex flex-col space-y-4">
                    <Link
                        href="/signup/"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                    >
                        Sign Up
                    </Link>
                    <Link
                        href="/signin/"
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}