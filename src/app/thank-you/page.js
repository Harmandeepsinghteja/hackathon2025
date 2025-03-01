"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ThankYou() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 md:p-10 rounded-2xl shadow-xl max-w-lg w-full text-center"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">🎉 Thank You!</h1>
        <p className="text-lg text-gray-600 mb-6">
          Your answers have been submitted successfully. We appreciate your
          time!
        </p>
        <button
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg transition-all"
          onClick={() => router.push("/")}
        >
          Go to Home
        </button>
      </motion.div>
    </div>
  );
}
