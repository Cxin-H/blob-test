import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedPostResponse } from "../types";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBlogPost = async (topic: string): Promise<GeneratedPostResponse> => {
  const model = "gemini-2.5-flash";

  const systemInstruction = `
    You are an expert professional blog writer for a high-end tech and lifestyle publication. 
    Your writing style is engaging, informative, and well-structured using Markdown.
    You use headers, bullet points, and bold text to improve readability.
    Ensure the content is at least 600 words long.
  `;

  const prompt = `Write a comprehensive blog post about: "${topic}".`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "A catchy, SEO-friendly title." },
            excerpt: { type: Type.STRING, description: "A short summary (2-3 sentences) for the card preview." },
            content: { type: Type.STRING, description: "The full blog post body in Markdown format." },
            readTime: { type: Type.STRING, description: "Estimated read time, e.g., '5 min read'." },
            tags: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "3-5 relevant tags." 
            }
          },
          required: ["title", "excerpt", "content", "readTime", "tags"],
          propertyOrdering: ["title", "excerpt", "content", "readTime", "tags"]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("No response from Gemini");
    }

    const data = JSON.parse(jsonText) as GeneratedPostResponse;
    return data;
  } catch (error) {
    console.error("Error generating blog post:", error);
    throw error;
  }
};
