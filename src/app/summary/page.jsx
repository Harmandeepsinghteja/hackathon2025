"use client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "../../firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import Header from "../../components/Header";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "AIzaSyDO_11wfMuwjnXabgLprujPI7K7Sb5YDKg";

async function summarizeQA(questionsAndAnswers) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Summarize the following questions and answers for the family members:
${questionsAndAnswers
  .map((qa) => `Q: ${qa.question}\nA: ${qa.answer}`)
  .join("\n\n")}

Provide a concise summary that captures the main points and themes discussed in these responses.`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

export default function AiQuestionnaireSummary() {
  const { user, loading } = useAuthContext();
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndSummarize = async () => {
      if (user) {
        setIsLoading(true);
        try {
          // Fetch existing answers from the ai_questionnaires collection
          const q = query(
            collection(db, "ai_questionnaires"),
            where("userId", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userResponses = querySnapshot.docs[0].data().responses;
            const questionsAndAnswers = Object.values(userResponses).map(
              (qa) => ({
                question: qa.question,
                answer: qa.answer,
              })
            );

            // Generate summary using Gemini
            const generatedSummary = await summarizeQA(questionsAndAnswers);

            // Store the summary in Firestore
            await setDoc(doc(db, "ai_summaries", user.uid), {
              userId: user.uid,
              summary: generatedSummary,
              timestamp: new Date(),
            });

            setSummary(generatedSummary);
          }
        } catch (error) {
          console.error("Error fetching and summarizing data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchAndSummarize();
  }, [user]);

  if (loading || isLoading) return <div>Loading...</div>;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-red-500">
          You must be logged in to view the summary.
        </p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-300 to-blue-200 p-4">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl max-w-2xl w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Your AI Questionnaire Summary
          </h1>
          <div className="text-lg text-gray-600 mb-6 whitespace-pre-wrap">
            {summary}
          </div>
        </div>
      </div>
    </>
  );
}
