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
import { useAuthContext } from "@/context/AuthContext";
import Header from "../../components/Header";
import { generateQuestions } from "../../utils/gemini";

const baseQuestions = [
  "What are the most important moments that shaped your life?",
  "What are some of your favorite memories that make you smile?",
  "Who are the people that meant the most to you, and why?",
  "What are you most proud of in your life?",
  "What life lessons or values do you want to pass down?",
];

export default function AiQuestionnaire() {
  const { user, loading } = useAuthContext();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        setIsLoading(true);
        try {
          // Fetch existing answers from the questionnaire database
          const q = query(
            collection(db, "questionnaires"),
            where("userId", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);
          let existingAnswers = {};
          if (!querySnapshot.empty) {
            existingAnswers = querySnapshot.docs[0].data().responses;
          }

          // Generate additional questions based on existing answers
          const newQuestions = await generateQuestions(
            baseQuestions,
            existingAnswers,
            5
          );
          console.log("New questions:", newQuestions);
          setQuestions([...baseQuestions, ...newQuestions]);

          // Fetch answers for the AI questionnaire if any
          const aiQ = query(
            collection(db, "ai_questionnaires"),
            where("userId", "==", user.uid)
          );
          const aiQuerySnapshot = await getDocs(aiQ);
          if (!aiQuerySnapshot.empty) {
            const userAnswers = aiQuerySnapshot.docs[0].data().responses;
            setAnswers(Object.values(userAnswers));
            setCurrentQuestion(Object.values(userAnswers).length); // Start from the first unanswered question
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    if (answers.length > 0) {
      setInputValue(answers[currentQuestion] || "");
    }
  }, [currentQuestion, answers]);

  if (loading || isLoading) return <div>Loading...</div>;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-red-500">
          You must be logged in to answer the AI questionnaire.
        </p>
      </div>
    );
  }

  const handleNext = async () => {
    if (!inputValue.trim()) return;

    const updatedAnswers = [...answers, inputValue];
    setAnswers(updatedAnswers);
    setInputValue("");

    if (currentQuestion === questions.length - 1) {
      submitAnswers(updatedAnswers, questions);
    } else {
      const nextQuestionIndex = currentQuestion + 1;
      setCurrentQuestion(nextQuestionIndex);

      // Generate new questions when we're close to running out
    }
  };

  const submitAnswers = async (finalAnswers, questions) => {
    try {
      const responseObj = {};
      questions.forEach((q, index) => {
        responseObj[index] = {
          question: q,
          answer: finalAnswers[index] || "",
        };
      });

      await setDoc(doc(db, "ai_questionnaires", user.uid), {
        userId: user.uid,
        userEmail: user.email,
        responses: responseObj,
        timestamp: new Date(),
      });

      alert("AI Questionnaire answers submitted successfully!");
      router.push("/thank-you");
    } catch (error) {
      console.error("Error submitting answers: ", error);
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
            AI Question {currentQuestion + 1}
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            {questions[currentQuestion]}
          </p>
          <input
            type="text"
            className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            value={inputValue || ""}
            onChange={(e) => setInputValue(e.target.value)}
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
