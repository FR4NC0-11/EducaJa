import test from "node:test";
import assert from "node:assert/strict";
import { topics, getTopic } from "../lib/catalog";
import { secondaryTopics } from "../lib/secondary-curriculum";
import { actionSchema, validateLesson } from "../lib/learning";
import { teacherAction } from "../lib/teacher-contract";

test("unidades da 3ª série têm IDs próprios e conteúdo completo sem entrar no catálogo de programação", () => {
  assert.equal(topics.length, 4);
  assert.equal(secondaryTopics.length, 4);
  const ids = new Set([...topics, ...secondaryTopics].map((t) => t.id));
  assert.equal(ids.size, 8);
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
