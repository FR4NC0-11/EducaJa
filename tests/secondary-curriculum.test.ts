import test from "node:test";
import assert from "node:assert/strict";
import { topics, getTopic } from "../lib/catalog";
import { secondaryTopics } from "../lib/secondary-curriculum";
import { actionSchema, validateLesson } from "../lib/learning";
import { teacherAction } from "../lib/teacher-contract";
import { secondaryNextLessons } from "../lib/secondary-next-lessons";
import { secondaryCompletion } from "../lib/secondary-completion";

test("cada matéria tem dez aulas com as 26 anteriores preservadas e novos IDs isolados", () => {
  assert.deepEqual(
    Object.keys(secondaryCompletion).sort(),
    secondaryTopics.map((t) => t.id).sort(),
  );
  const earlierLengths = [6, 8, 6, 6];
  let count = 0;
  secondaryTopics.forEach((topic, index) => {
    const added = secondaryCompletion[topic.id];
    assert.equal(topic.lessons.length, 10);
    assert.equal(added.length, 10 - earlierLengths[index]);
    assert.deepEqual(
      topic.lessons.slice(earlierLengths[index] - 2, earlierLengths[index]).map((l) => l.id),
      secondaryNextLessons[topic.id].map((l) => l.id),
    );
    assert.deepEqual(
      topic.lessons.slice(earlierLengths[index]).map((l) => l.id),
      added.map((l) => l.id),
    );
    for (const item of added) {
      count++;
      assert.equal(validateLesson(topic.id, item.id), true);
      for (const other of [...topics, ...secondaryTopics].filter((t) => t.id !== topic.id))
        assert.equal(validateLesson(other.id, item.id), false);
      assert.ok(item.objectives!.length >= 2 && item.sections!.length >= 3);
      assert.ok(item.exercise && item.hint && item.lab!.expected && item.resources!.length);
      assert.equal(
        teacherAction.safeParse({
          kind: "chat",
          topicId: topic.id,
          lessonId: item.id,
          text: "Dúvida",
        }).success,
        false,
      );
    }
  });
  assert.equal(count, 14);
});

test("unidades da 3ª série têm IDs próprios e conteúdo completo sem entrar no catálogo de programação", () => {
  assert.equal(topics.length, 5);
  assert.equal(secondaryTopics.length, 4);
  const ids = new Set([...topics, ...secondaryTopics].map((t) => t.id));
  assert.equal(ids.size, 9);
  for (const topic of secondaryTopics) {
    assert.equal(getTopic(topic.id), topic);
    assert.equal(topic.area, "secondary");
    assert.equal(topic.questions.length, 0);
    for (const lesson of topic.lessons) {
      assert.ok(lesson.objectives?.length);
      assert.ok(lesson.sections?.length);
      assert.ok(lesson.exercise && lesson.hint && lesson.lab?.expected);
      assert.equal(validateLesson(topic.id, lesson.id), true);
      assert.equal(validateLesson(topics[0].id, lesson.id), false);
      assert.ok(
        actionSchema.safeParse({ kind: "start", topicId: topic.id, goal: "Revisar" }).success,
      );
      assert.ok(
        actionSchema.safeParse({
          kind: "note",
          topicId: topic.id,
          lessonId: lesson.id,
          text: "Tentativa",
        }).success,
      );
    }
  }
});

test("novos recortes integram a área correta sem substituir as 18 aulas publicadas", () => {
  assert.deepEqual(
    Object.keys(secondaryNextLessons).sort(),
    secondaryTopics.map((t) => t.id).sort(),
  );
  const previous = [
    [
      "em3-contagem-etapas",
      "em3-contagem-permutacoes",
      "em3-contagem-combinacoes",
      "em3-probabilidade-condicional",
    ],
    [
      "em3-leitura-evidencias",
      "em3-redacao-projeto",
      "em3-redacao-argumentacao",
      "em3-redacao-coesao",
      "em3-redacao-intervencao",
      "em3-redacao-oficina",
    ],
    [
      "em3-populacao-proporcoes",
      "em3-humanas-migracoes",
      "em3-humanas-globalizacao",
      "em3-humanas-consumo",
    ],
    [
      "em3-genetica-modelo",
      "em3-genetica-heredogramas",
      "em3-genetica-segregacao",
      "em3-genetica-biotecnologia",
    ],
  ];
  secondaryTopics.forEach((topic, index) => {
    assert.deepEqual(
      topic.lessons.slice(0, previous[index].length).map((item) => item.id),
      previous[index],
    );
    const added = secondaryNextLessons[topic.id];
    assert.equal(added.length, 2);
    assert.deepEqual(
      topic.lessons
        .slice(previous[index].length, previous[index].length + 2)
        .map((item) => item.id),
      added.map((item) => item.id),
    );
    for (const item of added) {
      assert.equal(validateLesson(topic.id, item.id), true);
      assert.equal(validateLesson(topics[0].id, item.id), false);
      assert.ok(item.objectives!.length >= 2 && item.sections!.length >= 3);
      assert.ok(item.lab!.expected && item.exercise && item.hint && item.resources!.length);
    }
  });
});

test("API não aceita diagnóstico ou professor de programação para unidades do Ensino Médio", () => {
  for (const topic of secondaryTopics) {
    assert.equal(
      actionSchema.safeParse({ kind: "answer", topicId: topic.id, index: 0, text: "Teste" })
        .success,
      false,
    );
    assert.equal(actionSchema.safeParse({ kind: "submit", topicId: topic.id }).success, false);
    assert.equal(teacherAction.safeParse({ kind: "grade", topicId: topic.id }).success, false);
    assert.equal(
      teacherAction.safeParse({
        kind: "chat",
        topicId: topic.id,
        lessonId: topic.lessons[0].id,
        text: "Dúvida",
      }).success,
      false,
    );
  }
  assert.ok(
    teacherAction.safeParse({
      kind: "chat",
      topicId: topics[0].id,
      lessonId: topics[0].lessons[0].id,
      text: "Dúvida",
    }).success,
  );
});

test("ampliação preserva primeiras aulas e redação em 40 aulas com prática", () => {
  assert.deepEqual(
    secondaryTopics.map((t) => t.lessons.length),
    [10, 10, 10, 10],
  );
  assert.deepEqual(
    secondaryTopics.map((t) => t.lessons[0].id),
    [
      "em3-contagem-etapas",
      "em3-leitura-evidencias",
      "em3-populacao-proporcoes",
      "em3-genetica-modelo",
    ],
  );
  const ids = secondaryTopics.flatMap((t) => t.lessons.map((l) => l.id));
  assert.equal(new Set(ids).size, 40);
  const writing = secondaryTopics[1].lessons.slice(1, 6);
  assert.equal(writing.length, 5);
  assert.equal(writing.at(-1)?.id, "em3-redacao-oficina");
  for (const item of writing) {
    assert.ok(item.resources?.some((r) => r.url.startsWith("https://www.gov.br/inep/")));
    assert.ok(item.lab?.expected);
  }
});
