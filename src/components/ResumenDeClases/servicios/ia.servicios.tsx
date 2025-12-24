import { GoogleGenAI } from '@google/genai';
import { CourseData, AISummaryResponse } from '../ResumenDeClases.types';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const fetchClassSummary = async (data: CourseData): Promise<AISummaryResponse> => {
  try {
    // Inicializar el cliente de Google Gen AI
    const genAI = new GoogleGenAI(API_KEY);
    const model = 'gemini-2.5-flash';

    const prompt = `Eres un asistente académico experto. Analiza la siguiente transcripción de clase sobre "${data.topic}" (nivel: ${data.level}):

"${data.transcription}"

Genera un JSON estrictamente con esta estructura:
{
  "summaryPoints": ["punto 1", "punto 2", "punto 3"],
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
    
    console.log('✅ Resumen generado con éxito:', parsedData);
    
    return parsedData;

  } catch (error) {
    console.error('❌ Error en el servicio de IA:', error);
    throw error;
  }
};