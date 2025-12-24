import axios from 'axios';
import { CourseData, AISummaryResponse } from '../ResumenDeClases.types';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = import.meta.env.VITE_GEMINI_API_URL;

export const fetchClassSummary = async (data: CourseData): Promise<AISummaryResponse> => {
  try {
    const response = await axios.post(`${API_URL}?key=${API_KEY}`, {
      contents: [{
        parts: [{
          text: `Eres un asistente académico experto. Analiza: "${data.transcription}".
          Genera un JSON estrictamente con esta estructura:
          {
            "summaryPoints": ["punto 1", "punto 2", "punto 3"],
            "recommendedBooks": [
              {"title": "título", "author": "autor", "reason": "razón"}
            ]
          }
          No incluyas explicaciones, solo el objeto JSON.`
        }]
      }]
    });

    // 1. Extraer el texto bruto de la respuesta de Gemini
    let rawText = response.data.candidates[0].content.parts[0].text;

    // 2. Limpieza Pro: Eliminar bloques de código Markdown si existen (```json ... ```)
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      rawText = jsonMatch[0];
    }

    // 3. Parsear y validar
    const parsedData: AISummaryResponse = JSON.parse(rawText);
    
    // Verificación en consola para debugging
    console.log('Datos procesados con éxito:', parsedData);
    
    return parsedData;

  } catch (error) {
    console.error('Error detallado en el servicio de IA:', error);
    throw error; // Re-lanzar para que React Query lo detecte
  }
};