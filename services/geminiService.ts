
import { GoogleGenAI, Type } from "@google/genai";
import { FoodPlace } from "../types";

export async function enrichPlaceData(placeName: string): Promise<Partial<FoodPlace> | null> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Search for a popular food place in Bangalore named "${placeName}". Provide its description, typical category, exact latitude, longitude, and a mock address.`,
      config: {
        tools: [{ googleMaps: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING },
            category: { type: Type.STRING },
            lat: { type: Type.NUMBER },
            lng: { type: Type.NUMBER },
            address: { type: Type.STRING }
          },
          required: ["description", "category", "lat", "lng", "address"]
        }
      }
    });

    const json = JSON.parse(response.text);
    return json;
  } catch (error) {
    console.error("Gemini enrichment failed:", error);
    return null;
  }
}

export async function generateAIdescription(placeName: string, category: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Write a short, appetizing, 2-sentence description for a food place in Bangalore called "${placeName}" which is a "${category}".`;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt
    });
    return response.text.trim();
  } catch (error) {
    return `A wonderful ${category} located in the heart of Bangalore.`;
  }
}
