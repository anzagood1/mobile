export interface CourseData {
  transcription: string;
  topic: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface BookRecommendation {
  title: string;
  author: string;
  reason: string;
  thumbnailUrl?: string;
}

export interface AISummaryResponse {
  summaryPoints: string[];
  recommendedBooks: BookRecommendation[];
}