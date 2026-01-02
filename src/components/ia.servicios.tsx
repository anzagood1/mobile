import { GoogleGenAI } from '@google/genai';
import { CourseData, AISummaryResponse } from './ResumenDeClasesStructures';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;


export const fetchClassSummary = async (data: CourseData): Promise<AISummaryResponse> => {
  try {
    // Inicializar el cliente de Google Gen AI
    const genAI = new GoogleGenAI({apiKey: API_KEY});
    const model = 'gemini-2.5-flash';

    const prompt = `Eres un asistente académico experto. Analiza la siguiente transcripción de clase sobre "${data.topic}":

"${data.transcription}"

Genera un JSON estrictamente con esta estructura, donde seleccionas 5 puntos relevantes, y al menos 3 lecturas:
{
  "summaryPoints": [
  {
    title: "punto 1",
    detail: "punto 1 explicado a detalle"
  },
  {
    title: "punto 2",
    detail: "punto 2 explicado a detalle"
  },
  {
    title: "punto 3",
    detail: "punto 3 explicado a detalle"
  },
  {
    title: "punto 4",
    detail: "punto 4 explicado a detalle"
  },
  {
    title: "punto 5",
    detail: "punto 5 explicado a detalle"
  },
  ]
  "recommendedBooks": [
    {"title": "título", "author": "autor", "reason": "razón"}
  ]
}

No incluyas explicaciones, solo el objeto JSON.`;

    // Generar contenido usando el SDK
    const response = await genAI.models.generateContent({
      model: model,
      contents: prompt, 
    });
    let rawText = response.text;

    if (!rawText) {
      throw new Error('No se recibió respuesta del modelo de IA');
    }

    // Limpieza: Eliminar bloques de código Markdown si existen (```json ... ```)
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      rawText = jsonMatch[0];
    }

    // Parsear y validar
    const parsedData: AISummaryResponse = JSON.parse(rawText);
    
    console.log('Resumen generado con éxito:', parsedData);
    
    return parsedData;

  } catch (error) {
    console.error('Error en el servicio de IA:', error);
    throw error;
  }
};