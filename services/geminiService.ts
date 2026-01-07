import { GoogleGenAI, Type } from "@google/genai";
import { AIRecommendation } from "../types";

// Initialize using process.env.API_KEY directly as per strict guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIRecommendations = async (userQuery: string): Promise<AIRecommendation[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Recommend 5 movies or shows based on this request: "${userQuery}". 
      Return a creative and diverse list. For the image, I will handle it, just provide text details.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              year: { type: Type.STRING },
              genre: { type: Type.STRING },
              reason: { type: Type.STRING, description: "Why this fits the user request" }
            },
            required: ["title", "description", "year", "genre", "reason"],
          },
        },
      },
    });

    const jsonText = response.text;
    if (!jsonText) return [];
    
    return JSON.parse(jsonText) as AIRecommendation[];
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};