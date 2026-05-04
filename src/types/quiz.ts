export type QuestionType = "mcq" | "true_false";
export type QuizDifficulty = "recall" | "application" | "analysis";
export type QuizState = "idle" | "in_progress" | "reviewing" | "complete";

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: boolean;
  explanation: string;
  difficulty: QuizDifficulty;
}

export interface QuizConfig {
  quizId: string;
  questions: QuizQuestion[];
  passingScore?: number;
}
