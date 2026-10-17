import { z } from "zod";
import { getTopic } from "./catalog";
import type { ChatMessage, Evaluation } from "./teacher-contract";

const topicId = z.string().refine((id) => !!getTopic(id), "Tema inválido");
export const actionSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("start"), topicId, goal: z.string().trim().min(1).max(600) }),
  z.object({
    kind: z.literal("answer"),
    topicId: topicId.refine(
      (id) => getTopic(id)?.area !== "secondary",
      "Diagnóstico indisponível nesta área",
    ),
    index: z.number().int().min(0).max(9),
    text: z.string().trim().min(1).max(4000),
  }),
  z.object({
    kind: z.literal("submit"),
    topicId: topicId.refine(
      (id) => getTopic(id)?.area !== "secondary",
      "Diagnóstico indisponível nesta área",
    ),
  }),
  z.object({ kind: z.literal("lesson"), topicId, lessonId: z.string().max(80), done: z.boolean() }),
  z.object({
    kind: z.literal("note"),
    topicId,
    lessonId: z.string().max(80),
    text: z.string().trim().max(4000),
  }),
]);
export type Action = z.infer<typeof actionSchema>;
export type StudySession = {
  topic_id: string;
  goal: string;
  answers: Record<string, string>;
  completed_lessons: string[];
  notes: Record<string, string>;
  submitted_at: string | null;
  updated_at: string;
  evaluation: Evaluation | null;
  conversation: ChatMessage[];
};
export type Workspace = {
  user: { name: string; email: string } | null;
  session: StudySession | null;
  summaries: { topic_id: string; answered: number; completed: number }[];
  aiReady: boolean;
  teacherUsage: { used: number; limit: number; remaining: number } | null;
  emailReady: boolean;
  emailVerificationRequired: boolean;
};

export function answerCount(answers: Record<string, string>) {
  return Array.from({ length: 10 }, (_, i) => answers[String(i)]?.trim()).filter(Boolean).length;
}
export function validateLesson(topicId: string, lessonId: string) {
  return !!getTopic(topicId)?.lessons.some((lesson) => lesson.id === lessonId);
}
