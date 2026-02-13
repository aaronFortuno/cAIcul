
import { GoogleGenAI, Type } from "@google/genai";
import { ValidationResult, Problem, Language } from "../types";

export const validateSolution = async (
  problem: Problem,
  userDades: string,
  userOperacions: string,
  userResposta: string,
  lang: Language
): Promise<ValidationResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  
  const langNames = { ca: 'català', es: 'castellano', en: 'english' };

  const prompt = `
    Ets un mestre de matemàtiques expert que corregeix exercicis d'alumnes. 
    Analitza la resolució i retorna JSON.
    
    IDIOMA DE RESPOSTA: ${langNames[lang]}

    ENUNCIAT: "${problem.enunciat}"
    SOLUCIÓ IDEAL: "${problem.solucioIdeal}"

    ALUMNE:
    - Dades: "${userDades}"
    - Operacions: "${userOperacions}"
    - Resposta: "${userResposta}"

    CORRECCIÓ:
    1. Dades correctes?
    2. Operacions lògiques?
    3. Resultat correcte?
    Feedback amable en ${langNames[lang]}.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isCorrect: { type: Type.BOOLEAN },
            feedbackText: { type: Type.STRING },
            points: {
              type: Type.OBJECT,
              properties: {
                dades: { type: Type.STRING },
                operacions: { type: Type.STRING },
                resposta: { type: Type.STRING }
              },
              required: ["dades", "operacions", "resposta"]
            }
          },
          required: ["isCorrect", "feedbackText", "points"]
        }
      }
    });

    return JSON.parse(response.text || "{}") as ValidationResult;
  } catch (error) {
    return {
      isCorrect: false,
      feedbackText: "Error técnico / Technical error.",
      points: { dades: "-", operacions: "-", resposta: "-" }
    };
  }
};
