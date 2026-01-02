
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generatePersonalizedWish = async (name: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Génère un message de vœux pour la nouvelle année 2026, imprégné de la magie de Noël, pour "${name}". 
      Le message est envoyé de la part de la "Famille DAVI". 
      Utilise un ton très chaleureux, festif, avec des références à la lumière, la chaleur du foyer et la joie des fêtes. 
      Inclus des thèmes comme la santé, l'amour et l'abondance. 
      Le message doit être poétique et ne pas dépasser 50 mots.`,
      config: {
        temperature: 0.9,
      }
    });

    return response.text || "La famille DAVI vous souhaite une étincelante année 2026, bercée par la magie des fêtes et remplie de bonheur.";
  } catch (error) {
    console.error("Error generating wish:", error);
    return "Que la magie des fêtes illumine votre chemin en 2026. Meilleurs vœux de bonheur et de santé de la part de la famille DAVI.";
  }
};
