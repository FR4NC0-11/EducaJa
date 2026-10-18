export type Difficulty = "easy" | "medium" | "hard";
export type ExamQuestion = {
  id: string;
  topicId: string;
  lessonId: string;
  difficulty: Difficulty;
  prompt: string;
  options: { id: string; text: string }[];
  correct: string;
  explanation: string;
};

/** Original five-option questions; option IDs stay stable when shuffled. */
export function question(
  topicId: string,
  lessonId: string,
  number: number,
  difficulty: Difficulty,
  prompt: string,
  options: [string, string, string, string, string],
  correct: number,
  explanation: string,
): ExamQuestion {
  return {
    id: `${lessonId}-q${number}`,
    topicId,
    lessonId,
    difficulty,
    prompt,
    options: options.map((text, i) => ({ id: String(i), text })),
    correct: String(correct),
    explanation,
  };
}
