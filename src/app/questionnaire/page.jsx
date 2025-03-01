"use client";
import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuthContext } from "@/context/AuthContext"; // ✅ Import AuthContext
import Header from "../../components/Header2";

const questions = [
  "What are the most important moments that shaped your life?",
  "What are some of your favorite memories that make you smile?",
  "Who are the people that meant the most to you, and why?",
  "What are you most proud of in your life?",
  "What life lessons or values do you want to pass down?",
];

export default function Questionnaire() {
  const { user, loading } = useAuthContext(); // ✅ Get user & loading state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [inputValue, setInputValue] = useState(""); // Store the input value for each question
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkIfUserSubmitted = async () => {
      if (user) {
        const q = query(
          collection(db, "questionnaires"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userAnswers = querySnapshot.docs[0].data().responses;
          setAnswers(Object.values(userAnswers));
          setInputValue(Object.values(userAnswers)[currentQuestion] || "");
        }
      }
    };
    checkIfUserSubmitted();
  }, [user, currentQuestion]);

  useEffect(() => {
    if (answers.length > 0) {
      // Set the current input value to the predefined answer when the current question changes
      setInputValue(answers[currentQuestion] || "");
    }
  }, [currentQuestion, answers]);

  if (loading) return <div>Loading...</div>; // Prevent rendering if auth state is not loaded

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-red-500">
          You must be logged in to answer the questionnaire.
        </p>
      </div>
    );
  }

  const handleNext = () => {
    if (!inputValue.trim()) return; // Prevent empty answers

    // Update the answers only if the inputValue is different
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestion] = inputValue; // Update the current answer
      return updatedAnswers;
    });

    setInputValue(""); // Clear input after saving

    if (currentQuestion === questions.length - 1) {
      submitAnswers([...answers, inputValue]); // Pass updated answers including last one
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const submitAnswers = async (finalAnswers) => {
    try {
      const q = query(
        collection(db, "questionnaires"),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);

      const responseObj = {};
      questions.forEach((q, index) => {
        responseObj[index] = finalAnswers[index];
      });

      if (querySnapshot.empty) {
        // No existing entry, create a new one
        await setDoc(doc(db, "questionnaires", user.uid), {
          userId: user.uid,
          userEmail: user.email,
          responses: responseObj,
          timestamp: new Date(),
        });
        alert("Answers submitted successfully!");
      } else {
        // Entry exists, update it
        await updateDoc(doc(db, "questionnaires", user.uid), {
          responses: responseObj,
          timestamp: new Date(),
        });
        alert("Your answers have been updated!");
      }

      router.push("/thank-you");
    } catch (error) {
      console.error("Error submitting/updating answers: ", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-600 to-green-400 p-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 md:p-8 rounded-2xl shadow-xl max-w-lg w-full text-center"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Question {currentQuestion + 1}
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            {questions[currentQuestion]}
          </p>
          <input
            type="text"
            className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            value={inputValue || ""} // Ensure it's properly bound to the state
            onChange={(e) => setInputValue(e.target.value)} // Update onChange
            placeholder="Type your answer here..."
          />
          <div className="flex justify-end mt-6">
            {currentQuestion < questions.length - 1 ? (
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg transition-all"
                onClick={handleNext}
              >
                Next
              </button>
            ) : (
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-all"
                onClick={handleNext}
              >
                Submit
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}
