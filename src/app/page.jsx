'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


import Header from '../components/Header';

export default function Home() {
    const router = useRouter(); 
    return (
        <>
        <Header />
        {/* <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100"> */}
        <div
        className="flex flex-col bg-cover bg-center bg-no-repeat items-center justify-center min-h-screen bg-gray-100"
        style={{ backgroundImage: "url('/home_tree.jpg')" }}
      >
             
            <div className="items-center justify-start max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
                <h1 className="text-gray-900 text-3xl  font-bold text-center mb-6">What would you like to do?</h1>
                
                <ul className='flex space-x-4'>
                     <li>
                        <button onClick={()=> router.push("/ai-questionnaire")}
                             className="text-green-500 bg-transparent border-2 border-green-500 rounded-md px-4 py-2 hover:bg-green-500 hover:text-white transition-colors">
                                Talk With A Friend (AI)
                         </button>
                    </li>
                    <li>
                        <button onClick={() => router.push("/")}
                             className="text-green-500 bg-transparent border-2 border-green-500 rounded-md px-4 py-2 hover:bg-green-500 hover:text-white transition-colors">
                                Upload Images
                         </button>
                    </li>
                    <li>
                        <button onClick={() => router.push("/summary")}
                             className="text-green-500 bg-transparent border-2 border-green-500 rounded-md px-4 py-2 hover:bg-green-500 hover:text-white transition-colors">
                             Summmarize Your Life
                        </button>
                    </li>
                </ul>
            </div>
        </div>

        </>
    );
}