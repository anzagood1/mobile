import { GoogleGenAI } from '@google/genai';
import { CourseData, AISummaryResponse } from './ResumenDeClasesStructures';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;


export const fetchClassSummary = async (data: CourseData): Promise<AISummaryResponse> => {
  try {
    // Inicializar el cliente de Google Gen AI
    const genAI = new GoogleGenAI({apiKey: API_KEY});
    const model = 'gemini-2.5-flash';

    const prompt = `Eres un asistente académico experto. Analiza la siguiente transcripción de clase sobre "${data.topic}":

"${data.transcription}" Considera estos aspectos: 
Resumen: 5 puntos relevantes, solo si "${data.resumen}" es true
Cuestionario: 5 preguntas sencillas con 3 opciones múltiples, solo si "${data.cuestionario}" es true
Lecturas: al menos 3 lecturas sugeridas, solo si "${data.lecturas}" es true
Resumen Completo: Resumen, Cuestionario y lecturas, solo si "${data.resumenCompleto}" es true

En los caso en los que no vas a generar algo, llena con '' todos los campos de esos datos.

Genera un JSON estrictamente con esta estructura:
{
  "summaryPoints": [
    {"title": "punto", "detail": "punto explicado a detalle"}
  ]
  "quiz": [
    {"question": "pregunta", 
      "answer1": {"answer": "respuesta 1", "isCorrect": "true si es correcta/false si no es correcta"}, 
      "answer2": {"answer": "respuesta 2", "isCorrect": "true si es correcta/false si no es correcta"}, 
      "answer3": {"answer": "respuesta 3", "isCorrect": "true si es correcta/false si no es correcta"}}
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