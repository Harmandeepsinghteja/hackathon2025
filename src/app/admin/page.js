"use client";
import { useAuthContext as useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { notFound, redirect } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";

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
      router.push("/"); // Redirect to home page after logout
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

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="bg-white shadow-md rounded-lg p-6 m-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          Homepage
        </h1>
        {user && (
          <div>
            <p className="text-gray-600 text-center mb-8">
              Hello, {user.email}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
            <button
              onClick={handleLogout}
              className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
