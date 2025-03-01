import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

export async function generateQuestions(
  baseQuestions,
  existingAnswers,
  numNewQuestions
) {
  try {
    // Create the prompt using the base questions and existing answers
    const prompt = `Given these base questions and their answers:
${baseQuestions
  .map((q, i) => `Q: ${q}\nA: ${existingAnswers[i] || "No answer provided"}`)
  .join("\n\n")}

Generate ${numNewQuestions} new, unique questions that build upon or explore related topics to the existing questions and answers. Ensure the new questions are relevant and provide deeper insights into the subject matter. Please return the question in json format`;

    // Initialize the Google Generative AI instance with the API key
    const genAI = new GoogleGenerativeAI(API_KEY);

    // Get the model instance for the specific model you want to use (e.g., gemini-1.5-flash)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate content using the prompt
    const result = await model.generateContent(prompt);

    // Extract the text content from the response
    const generatedText = result.response.text();
    console.log("Generated text:", generatedText);
    // Clean the generated text to remove markdown formatting (i.e., remove the "```json" and "```" parts)
    const cleanedText = generatedText.replace(/```json|```/g, "").trim();
    // Parse the generated JSON string to an object
    const generatedJson = JSON.parse(cleanedText);
    // Extract the 'question' field from each object in the JSON array
    const newQuestions = generatedJson.map((item) => item.question);
    console.log("Extracted questions:", newQuestions);

    return newQuestions;
  } catch (error) {
    console.error("Error generating questions:", error);
    throw error;
  }
}
