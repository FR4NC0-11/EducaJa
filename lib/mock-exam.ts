import { mathQuestions } from "./exam-math";
import { languageQuestions } from "./exam-language";
import { humanitiesQuestions } from "./exam-humanities";
import { scienceQuestions } from "./exam-science";
import type { Difficulty } from "./exam-types";

export const examBank = [
  ...mathQuestions,
  ...languageQuestions,
  ...humanitiesQuestions,
  ...scienceQuestions,
];
export const difficulties: Difficulty[] = ["easy", "medium", "hard"];
export const difficultyLabels = { easy: "Fácil", medium: "Intermediária", hard: "Difícil" };
export const examStorageKey = "educaja-secondary-exam-v1";
export type Attempt = {
  version: 1;
  topicId: string;
  questions: { id: string; options: string[] }[];
  answers: Record<string, string>;
  index: number;
  finished: boolean;
};
export const questionById = new Map(examBank.map((q) => [q.id, q]));
export const availableQuestions = (topicId: string) =>
  examBank.filter((q) => topicId === "all" || q.topicId === topicId);

export function shuffled<T>(items: readonly T[], random = Math.random): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function createAttempt(topicId: string, count: number, random = Math.random): Attempt {
  const pool = availableQuestions(topicId);
  if (!Number.isInteger(count) || count < 1 || count > pool.length)
    throw new Error("Quantidade inválida para a seleção.");
  const remaining = [...pool];
  const selected: typeof pool = [];
  const subjectCounts: Record<string, number> = {};
  const levelCounts: Record<string, number> = {};
  while (selected.length < count) {
    const subjects = [...new Set(remaining.map((q) => q.topicId))];
    const minimum = Math.min(...subjects.map((id) => subjectCounts[id] ?? 0));
    const subject = shuffled(
      subjects.filter((id) => (subjectCounts[id] ?? 0) === minimum),
      random,
    )[0];
    const levels = difficulties.filter((d) =>
      remaining.some((q) => q.topicId === subject && q.difficulty === d),
    );
    const minimumLevel = Math.min(...levels.map((d) => levelCounts[d] ?? 0));
    const level = shuffled(
      levels.filter((d) => (levelCounts[d] ?? 0) === minimumLevel),
      random,
    )[0];
    const chosen = shuffled(
      remaining.filter((q) => q.topicId === subject && q.difficulty === level),
      random,
    )[0];
    selected.push(chosen);
    remaining.splice(remaining.indexOf(chosen), 1);
    subjectCounts[subject] = (subjectCounts[subject] ?? 0) + 1;
    levelCounts[level] = (levelCounts[level] ?? 0) + 1;
  }
  return {
    version: 1,
    topicId,
    questions: shuffled(selected, random).map((q) => ({
      id: q.id,
      options: shuffled(
        q.options.map((o) => o.id),
        random,
      ),
    })),
    answers: {},
    index: 0,
    finished: false,
  };
}

/** Treat browser storage as untrusted input, including stale banks and option orders. */
export function restoreAttempt(raw: string | null): Attempt | null {
  if (!raw || raw.length > 50000) return null;
  try {
    const a = JSON.parse(raw);
    if (
      !a ||
      a.version !== 1 ||
      typeof a.topicId !== "string" ||
      !Array.isArray(a.questions) ||
      a.questions.length < 1 ||
      a.questions.length > availableQuestions(a.topicId).length ||
      typeof a.finished !== "boolean" ||
      !Number.isInteger(a.index) ||
      a.index < 0 ||
      a.index >= a.questions.length ||
      !a.answers ||
      typeof a.answers !== "object" ||
      Array.isArray(a.answers)
    )
      return null;
    const ids = new Set<string>();
    for (const entry of a.questions) {
      const q = questionById.get(entry?.id);
      if (
        !q ||
        ids.has(q.id) ||
        (a.topicId !== "all" && q.topicId !== a.topicId) ||
        !Array.isArray(entry.options) ||
        entry.options.length !== q.options.length ||
        new Set(entry.options).size !== q.options.length ||
        entry.options.some((id: unknown) => !q.options.some((o) => o.id === id))
      )
        return null;
      ids.add(q.id);
    }
    for (const [id, option] of Object.entries(a.answers)) {
      if (!ids.has(id) || !questionById.get(id)?.options.some((o) => o.id === option)) return null;
    }
    // Keep only known fields instead of trusting an arbitrary storage object.
    return {
      version: 1,
      topicId: a.topicId,
      questions: a.questions.map((q: Attempt["questions"][number]) => ({
        id: q.id,
        options: [...q.options],
      })),
      answers: { ...a.answers },
      index: a.index,
      finished: a.finished,
    };
  } catch {
    return null;
  }
}

export function examResult(attempt: Attempt) {
  let correct = 0,
    blank = 0;
  for (const entry of attempt.questions) {
    const answer = attempt.answers[entry.id];
    if (answer === undefined) blank++;
    else if (questionById.get(entry.id)?.correct === answer) correct++;
  }
  const total = attempt.questions.length;
  return {
    total,
    correct,
    blank,
    incorrect: total - correct - blank,
    percentage: Math.round((correct / total) * 100),
  };
}
