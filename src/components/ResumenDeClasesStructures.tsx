export interface CourseData {
  transcription: string;
  topic: string;
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

export interface AISummaryResponse {
  summaryPoints: SummaryPoint[];
  recommendedBooks: BookRecommendation[];
}