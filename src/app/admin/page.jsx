"use client";
import { useAuthContext as useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { notFound, redirect } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import Link from 'next/link'

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      redirect("/");
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      // router.push("/"); // Redirect to home page after logout
      setTimeout(() => {
        router.push("/"); // Redirect to home page after logout
      }, 100); // 100ms delay
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    notFound();
  }

  function handleClick(){
    router.push("/questionnaire")
  }

  return (
    <>
     <header className="bg-white text-gray-800 py-2 shadow-md">
      
      <div className="max-w-7xl mx-auto flex items-center justify-between  px-4">
     


        {/* Left: Logo or Brand */}
        <div className="flex items-center space-x-2 ">
        
        <img src="/tree.jpg" className="" style={{ width: '50px' }} />
            {/* <a href="http://www.freepik.com">Designed by Freepik</a> */}
          <Link href="/" className="text-lg font-bold">
            Life Review
          </Link>
        </div>

        {/* Right: Navigation Links */}
        <nav className="ml-auto">
          <ul className="flex space-x-4">
            <li>
              <Link href="/" onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">Logout</Link>
            </li>
          </ul>
        </nav>

        <div>

        </div>
      </div>
    </header>
     
    {/* <div className="min-h-screen bg-gray-100 flex "> */}
    <div
        className="flex flex-col bg-cover bg-center bg-no-repeat items-center justify-center min-h-screen bg-gray-100"
        style={{ backgroundImage: "url('/home_tree.jpg')" }}
      >
    <div className="bg-white shadow-md rounded-lg p-6 m-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-black">
        Welcome!
      </h1>
      {user && (
        <div>
          <p className="text-gray-600 text-center mb-8">
           You are logged in as {user.email}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
          <button onClick={handleClick} className="mt-4 w-full bg-red-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
            Start Your Life Review
          </button>
         
        </div>
      )}
    </div>
  </div></>
   
  );
}
