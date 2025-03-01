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

const API_KEY =
  process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
  "AIzaSyDO_11wfMuwjnXabgLprujPI7K7Sb5YDKg";

async function summarizeQA(questionsAndAnswers) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Context: 
You are an AI assistant helping a palliative care patient create a legacy text summary to be 
left behind for their loved ones. The user has responded to a set of meaningful questions 
reflecting on their most defining moments, favorite memories, important relationships, 
proudest achievements, and values they wish to pass down. 

Task: 
Using the user’s responses, craft a first-person narrative that feels authentic, warm, and 
emotionally resonant—as if the user themselves wrote it. Your goal is to maintain their 
natural writing style, tone, and personality, whether that’s sentimental, humorous, reflective, 
or straightforward.

Here are the questions and answers:

${questionsAndAnswers
  .map((qa) => `Q: ${qa.question}\nA: ${qa.answer}`)
  .join("\n\n")}

Now, please write the legacy text summary in the first person, as if I were writing it myself. Capture the main points, themes, and emotions discussed in my responses.
nstructions: 
1. Write in the first person, using the user’s own words and expressions as much as 
possible. 
2. Preserve their natural writing style—if their responses are poetic, keep it poetic; if 
they are lighthearted, maintain a warm and humorous tone. 
3. Structure the narrative smoothly, ensuring it reads as a cohesive, heartfelt story. 
4. Make it emotionally engaging while keeping the user’s personality at the forefront. 
5. Avoid artificial-sounding phrasing or adding extra details—stick to what the user has 
shared. 
Legacy Summary Structure: 
Opening: A warm introduction, setting the tone in the user’s voice. 
Life’s Defining Moments: A natural flow of key life events that shaped them. 
Cherished Memories: A heartfelt recounting of their happiest times. 
Relationships & Love: Expressing appreciation for the important people in their life. 
Proud Achievements: What they are most proud of, in their own words. 
Lessons & Legacy: The values they wish to pass on and how they want to be remembered. 
Closing Reflection: A personal and meaningful farewell message to their loved ones. 
Example Output Format: 
“I have lived a life filled with love, laughter, and lessons. One of the most defining moments 
for me was [important moment]. It changed the way I saw the world and taught me [lesson]. 
Some of my happiest memories are [favorite memories]. Those were the moments that truly 
made me feel alive. I was blessed with incredible people in my life—[names or 
relationships]—who supported and loved me unconditionally. They made every challenge 
easier and every joy more meaningful. 
If there’s one thing I’m most proud of, it’s [proud achievement]. It gave my life 
purpose, and I hope it leaves a lasting impact. Through everything, I have always believed in 
[values]. If I could share one piece of wisdom, it would be this: [life lesson]. 
As I look back, I am most grateful for [gratitude statement]. My hope is that those I 
love will remember me for [legacy statement]. And above all, I want you to know—[personal 
closing message].”  
Final Notes for Gemini: 
● Ensure the voice and tone match the user’s style—this should feel deeply personal, 
not robotic. 
● Keep the storytelling authentic, warm, and true to the user’s character. 
● If the user’s answers are short, expand them gently without adding artificial details. 
Output Format: Return the final legacy summary as a beautifully structured, first-person 
narrative, written in the user’s own style.” 


`;

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-700 to-white p-4">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl max-w-2xl w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            My Life Review
          </h1>
          <div className="text-lg text-gray-600 mb-6 whitespace-pre-wrap">
            {summary}
          </div>
        </div>
      </div>
    </>
  );
}
