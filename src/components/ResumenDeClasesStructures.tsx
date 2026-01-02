export interface CourseData {
  transcription: string;
  topic: string;
  resumenCompleto: boolean;
  resumen: boolean;
  cuestionario: boolean;
  lecturas: boolean;
}

export interface BookRecommendation {
  title: string;
  author: string;
  reason: string;
  thumbnailUrl?: string;
}

export interface SummaryPoint {
  title: string;
  detail: string;
}

export interface Answer{
  answer: string;
  isCorrect: boolean;
}

export interface Question{
  question: string;
  answer1: Answer;
  answer2: Answer;
  answer3: Answer;
}

export interface AISummaryResponse {
  summaryPoints: SummaryPoint[];
  quiz: Question[];
  recommendedBooks: BookRecommendation[];
}