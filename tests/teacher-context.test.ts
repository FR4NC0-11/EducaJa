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

test("contexto distingue diagnóstico parcial, finalizado e avaliado nas trilhas de programação", () => {
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

// These semantic anchors deliberately catch accidental remapping, beyond checking IDs exist.
test("associações editoriais cobrem as questões de todas as trilhas e usam apenas aulas válidas", async () => {
  const { diagnosticSkills } = await import("../lib/diagnostic-skills");
  assert.deepEqual(Object.keys(diagnosticSkills).sort(), topics.map((t) => t.id).sort());
  for (const topic of topics) {
    const skills = diagnosticSkills[topic.id];
    assert.equal(skills.length, topic.questions.length);
    for (const skill of skills) {
      assert.ok(skill.concept.trim());
      assert.ok(skill.lessonIds.length);
      assert.equal(new Set(skill.lessonIds).size, skill.lessonIds.length);
      for (const id of skill.lessonIds)
        assert.ok(
          topic.lessons.some((l) => l.id === id),
          `${topic.id}: ${id}`,
        );
    }
  }
  assert.ok(diagnosticSkills["java-poo"][8].lessonIds.includes("igualdade"));
  assert.ok(diagnosticSkills["web-fundamentos"][9].lessonIds.includes("acessibilidade"));
  assert.ok(diagnosticSkills.postgresql[9].lessonIds.includes("concorrencia-reservas"));
  assert.ok(diagnosticSkills["iot-fundamentos"][6].lessonIds.includes("mqtt-telemetria"));
});

test("aula usa feedback por índice, não média ou posição das notas", () => {
  const topic = topics.find((t) => t.id === "postgresql")!;
  const study = session();
  study.answers = { "7": "Índice não tem custo", "9": "Resposta sobre concorrência" };
  study.evaluation = validateEvaluation(
    {
      grades: topic.questions.map((_, index) => ({
        index,
        concepts: index === 7 ? 0 : 4,
        application: index === 7 ? 0 : 3,
        reasoning: index === 7 ? 0 : 2,
        clarity: index === 7 ? 0 : 1,
        feedback: index === 7 ? "Rever custos de escrita" : "Resposta sintética correta",
      })),
      summary: "Média alta com lacuna em índices",
      lessonOrder: topic.lessons.map((l) => l.id),
    },
    topic,
    "fixture",
  );
  study.evaluation.grades.reverse();
  const context = teachingContext(
    topic,
    study,
    topic.lessons.find((l) => l.id === "indices-explain"),
  );
  assert.equal(context.evaluation?.average, 9);
  assert.deepEqual(
    context.currentLessonEvidence.map((e) => e.questionIndex),
    [7],
  );
  assert.equal(context.currentLessonEvidence[0].answer, "Índice não tem custo");
  assert.equal(context.currentLessonEvidence[0].grade?.concepts, 0);
  assert.equal(context.currentLessonEvidence[0].grade?.feedback, "Rever custos de escrita");
  assert.equal(context.diagnostic[7].concept, "Benefícios e custos de índices");
  assert.deepEqual(context.diagnostic[7].relatedLessonIds, ["indices-explain"]);
  study.evaluation = null;
  study.answers["7"] = "Nova tentativa sobre índices";
  const edited = teachingContext(
    topic,
    study,
    topic.lessons.find((l) => l.id === "indices-explain"),
  );
  assert.equal(edited.currentLessonEvidence[0].grade, null);
  assert.equal(edited.currentLessonEvidence[0].answer, study.answers["7"]);
});

test("diagnóstico vazio e aula sem medida específica não ganham domínio inventado", () => {
  const study = session();
  const context = teachingContext(topics[0], study, topics[0].lessons[0]);
  assert.ok(context.currentLessonEvidence.length);
  assert.ok(context.currentLessonEvidence.every((e) => e.answer === "" && e.grade === null));
  assert.deepEqual(teachingContext(topics[0], study).currentLessonEvidence, []);
  const topicWithoutLinks = { ...topics[0], id: "future-topic" };
  assert.deepEqual(
    teachingContext(topicWithoutLinks, study, topicWithoutLinks.lessons[0]).currentLessonEvidence,
    [],
  );
});
