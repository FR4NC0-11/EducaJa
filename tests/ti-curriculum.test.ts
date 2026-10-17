import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { topics, getTopic } from "../lib/catalog";
import { diagnosticReference } from "../lib/diagnostic-reference";
import { diagnosticSkills } from "../lib/diagnostic-skills";
import { saepPractice } from "../lib/saep-preparation";
import { validateLesson, actionSchema } from "../lib/learning";

test("T.I. integra catálogo, persistência e dez evidências pertinentes ao diagnóstico", () => {
  const ti = getTopic("ti-git-github")!;
  assert.equal(ti.category, "T.I.");
  assert.equal(ti.lessons.length, 9);
  assert.equal(ti.questions.length, 10);
  assert.equal(diagnosticReference[ti.id].length, 10);
  assert.equal(diagnosticSkills[ti.id].length, 10);
  assert.ok(actionSchema.safeParse({ kind: "start", topicId: ti.id, goal: "Estudar Git" }).success);
  for (const item of ti.lessons) {
    assert.ok(validateLesson(ti.id, item.id));
    assert.ok(item.explanation && item.exercise && item.hint && item.resources?.length);
    assert.ok(diagnosticSkills[ti.id].some((skill) => skill.lessonIds.includes(item.id)));
  }
  assert.equal(validateLesson("java-poo", "ti-commit"), false);
  for (const skill of diagnosticSkills[ti.id])
    for (const id of skill.lessonIds) assert.ok(ti.lessons.some((item) => item.id === id));
});

test("capturas oficiais são PNG locais com fonte e licença, disponíveis sem chamadas externas", () => {
  const images = getTopic("ti-git-github")!.lessons.flatMap((item) => item.images ?? []);
  assert.equal(images.length, 2);
  for (const img of images) {
    assert.ok(img.alt && img.caption && img.source.startsWith("https://docs.github.com/"));
    assert.match(img.src, /^\/lessons\/git\/[a-z-]+\.png$/);
    assert.equal(
      readFileSync(`public${img.src}`).subarray(0, 8).toString("hex"),
      "89504e470d0a1a0a",
    );
  }
  assert.match(
    readFileSync("public/lessons/git/LICENSE.txt", "utf8"),
    /Attribution 4.0 International/,
  );
});

test("preparação SAEP contempla todas as trilhas preservando nove aulas por matéria", () => {
  assert.deepEqual(Object.keys(saepPractice).sort(), topics.map((item) => item.id).sort());
  for (const topic of topics) {
    assert.equal(topic.lessons.length, 9);
    assert.ok(saepPractice[topic.id].steps.length >= 3);
  }
});
