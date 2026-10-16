import type { Topic, Lesson } from "./catalog";
import type { StudySession } from "./learning";
import { diagnosticReference } from "./diagnostic-reference";

export function teachingContext(topic: Topic, session: StudySession, lesson?: Lesson) {
  return {
    topic: topic.title,
    goal: session.goal,
    lesson: lesson ?? null,
    availableLessons: topic.lessons.map((item) => ({
      id: item.id,
      title: item.title,
      explanation: item.explanation,
    })),
    diagnostic: topic.questions.map((question, index) => ({
      index,
      question,
      answer: session.answers[String(index)] ?? "",
      reference:
        diagnosticReference[topic.id]?.[index] ??
        "Use a pergunta e os critérios gerais; aceite respostas tecnicamente equivalentes.",
    })),
    evaluation: session.evaluation ?? null,
    progress: {
      diagnosticStatus: session.evaluation
        ? "evaluated"
        : session.submitted_at
          ? "awaiting_evaluation"
          : "in_progress",
      completedLessons: topic.lessons
        .filter((item) => session.completed_lessons.includes(item.id))
        .map((item) => ({ id: item.id, title: item.title })),
    },
  };
}

export const adaptiveTeachingRules = `Use o diagnóstico como evidência inicial, não como rótulo permanente de capacidade. Quando houver avaliação, relacione o feedback por questão às respostas e à dúvida da aula atual; a média geral sozinha não determina o nível em todos os conceitos. Priorize uma lacuna pertinente na explicação e proponha um exercício curto para praticá-la, sem desviar da pergunta do estudante. Sem avaliação, use respostas parciais apenas como indícios; ausência de resposta ou 'Ainda não sei' pede apoio, não prova incapacidade. Não invente notas nem exija concluir o diagnóstico para ensinar. Aulas em progress.completedLessons foram marcadas como concluídas pelo estudante: isso não comprova domínio. Use esse progresso para retomar conceitos pertinentes e evitar repetição desnecessária. Antes de aumentar a dificuldade, peça uma pequena aplicação ou explicação do conceito e aguarde a tentativa; use a resposta atual e o histórico para ajustar o próximo passo, mesmo quando diferirem do diagnóstico inicial. Não afirme que uma tentativa na conversa alterou notas ou progresso salvo.`;
