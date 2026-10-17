import type { Lesson } from "./catalog";

export function lesson(
  id: string,
  title: string,
  objectives: string[],
  explanation: string,
  sections: { title: string; body: string }[],
  analogy: string,
  exercise: string,
  hint: string,
  expected: string,
  resources: { title: string; url: string }[],
): Lesson {
  return {
    id,
    title,
    minutes: 20,
    level: "Fundamentos",
    objectives,
    explanation,
    sections,
    analogy,
    exercise,
    hint,
    code: "",
    resources,
    lab: {
      tool: "Caderno de estudo",
      setup:
        "Resolva o exercício antes de abrir a conferência. Use suas anotações para explicar o raciocínio.",
      steps: [
        "Registre sua tentativa com os dados do enunciado.",
        "Explique como chegou à resposta.",
        "Compare com a conferência e reescreva o trecho que precisar de ajuste.",
      ],
      expected,
      troubleshooting:
        "Se sua resposta diferir, identifique em qual etapa mudou a interpretação. A conferência não atribui nota nem marca domínio automaticamente.",
    },
  };
}
