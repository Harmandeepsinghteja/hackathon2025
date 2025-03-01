import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY =
  process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
  "AIzaSyAfP5xsuRdbdEjWjPoUVJekrp8L6yEZke8";

export async function generateQuestions(
  baseQuestions,
  existingAnswers,
  numNewQuestions
) {
  try {
    // Create the prompt using the base questions and existing answers
    const prompt = `
    Context:
You are an AI assistant helping a palliative care patient create a legacy text summary. Based on their answers to initial questions, you need to generate new, insightful questions to further explore their life experiences and values.

Task:
Given the following base questions and their answers:

${baseQuestions
  .map((q, i) => `Q: ${q}\nA: ${existingAnswers[i] || "No answer provided"}`)
  .join("\n\n")}

Generate ${numNewQuestions} new, unique questions that:

1.  Build upon or explore related topics to the existing questions and answers.
2.  Provide deeper insights into the user's life, values, and experiences.
3.  Are relevant and directly related to the user's provided answers.
4.  Maintain a thoughtful, reflective, and empathetic tone.
5.  Avoid being redundant or too similar to the base questions.

Output Format:
Return the new questions in JSON format`;

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
