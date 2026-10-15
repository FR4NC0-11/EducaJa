import test from "node:test";
import assert from "node:assert/strict";
import { topics } from "../lib/catalog";
import { actionSchema, answerCount, validateLesson } from "../lib/learning";
import { diagnosticReference } from "../lib/diagnostic-reference";

test("cada diagnóstico contém dez questões e etapas com identificadores únicos", () => {
  assert.equal(new Set(topics.map((t) => t.id)).size, topics.length);
  for (const topic of topics) {
    assert.equal(topic.questions.length, 10);
    assert.equal(diagnosticReference[topic.id].length, 10);
    assert.equal(new Set(topic.lessons.map((l) => l.id)).size, topic.lessons.length);
    assert.ok(topic.lessons.every((l) => l.explanation && l.exercise && l.hint));
    assert.ok(topic.shortTitle && topic.introduction);
    assert.ok(topic.goalExamples.length > 0 && topic.glossary.length > 0);
  }
});

test("rejeita tema desconhecido, respostas vazias e índices fora do diagnóstico", () => {
  for (const input of [
    { kind: "start", topicId: "inexistente", goal: "Aprender" },
    { kind: "answer", topicId: "java-poo", index: 0, text: "  " },
    { kind: "answer", topicId: "java-poo", index: 10, text: "Resposta" },
    { kind: "note", topicId: "postgresql", lessonId: "relacoes", text: "a".repeat(4001) },
  ])
    assert.equal(actionSchema.safeParse(input).success, false);
});

test("conta somente respostas válidas nas dez posições e valida a etapa dentro do tema", () => {
  assert.equal(answerCount({ "0": "Sim", "1": "   ", "10": "Fora do intervalo" }), 1);
  assert.equal(
    answerCount(Object.fromEntries(Array.from({ length: 10 }, (_, i) => [i, "Não sei ainda"]))),
    10,
  );
  assert.equal(validateLesson("java-poo", "objetos"), true);
  assert.equal(validateLesson("postgresql", "objetos"), false);
  assert.equal(validateLesson("iot-fundamentos", "objetos-conectados"), true);
  assert.equal(
    actionSchema.safeParse({ kind: "start", topicId: "iot-fundamentos", goal: "Aprender do zero" })
      .success,
    true,
  );
});
