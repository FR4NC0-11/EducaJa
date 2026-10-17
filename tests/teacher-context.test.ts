import test from "node:test";
import assert from "node:assert/strict";
import { topics } from "../lib/catalog";
import type { StudySession } from "../lib/learning";
import { teachingContext } from "../lib/teacher-context";
import { validateEvaluation } from "../lib/teacher-contract";

function session(): StudySession {
  return {
    topic_id: topics[0].id,
    goal: "Aprender do zero",
    answers: {},
    completed_lessons: [],
    notes: {},
    submitted_at: null,
    updated_at: "fixture",
    evaluation: null,
    conversation: [],
  };
}

test("contexto distingue diagnóstico parcial, finalizado e avaliado nas quatro trilhas", () => {
  for (const topic of topics) {
    const study = session();
    study.topic_id = topic.id;
    study.answers = { "0": "Ainda não sei.", "1": "Resposta parcial sintética" };
    const partial = teachingContext(topic, study, topic.lessons[0]);
    assert.equal(partial.progress.diagnosticStatus, "in_progress");
    assert.equal(partial.evaluation, null);
    assert.equal(partial.diagnostic.length, 10);
    assert.equal(partial.diagnostic[0].answer, "Ainda não sei.");
    assert.equal(partial.diagnostic[1].answer, study.answers["1"]);
    assert.equal(partial.diagnostic[2].answer, "");
    assert.equal(partial.lesson?.id, topic.lessons[0].id);
    study.submitted_at = "fixture";
    assert.equal(teachingContext(topic, study).progress.diagnosticStatus, "awaiting_evaluation");
    study.evaluation = validateEvaluation(
      {
        grades: topic.questions.map((_, index) => ({
          index,
          concepts: index === 0 ? 0 : 4,
          application: 0,
          reasoning: 0,
          clarity: 0,
          feedback: `Lacuna sintética ${index}`,
        })),
        summary: "Resumo sintético de teste",
        lessonOrder: topic.lessons.map((l) => l.id),
      },
      topic,
      "fixture",
      study.answers,
    );
    const evaluated = teachingContext(topic, study);
    assert.equal(evaluated.progress.diagnosticStatus, "evaluated");
    assert.deepEqual(evaluated.evaluation, study.evaluation);
    assert.equal(evaluated.evaluation?.grades[0].feedback, "Lacuna sintética 0");
    // Editing an answer invalidates evaluation in workspace; the next context must reflect it.
    study.evaluation = null;
    study.submitted_at = null;
    study.answers["0"] = "Nova tentativa";
    assert.equal(teachingContext(topic, study).evaluation, null);
    assert.equal(teachingContext(topic, study).diagnostic[0].answer, "Nova tentativa");
  }
});

test("acompanhamento inclui só aulas da trilha e não transmite anotações pessoais", () => {
  const study = session();
  study.completed_lessons = [topics[0].lessons[1].id, "id-antigo", topics[0].lessons[1].id];
  study.notes = { [topics[0].lessons[1].id]: "anotação privada sintética" };
  const context = teachingContext(topics[0], study);
  assert.deepEqual(context.progress.completedLessons, [
    { id: topics[0].lessons[1].id, title: topics[0].lessons[1].title },
  ]);
  assert.equal(JSON.stringify(context).includes("anotação privada sintética"), false);
  assert.equal(context.lesson, null);
});
