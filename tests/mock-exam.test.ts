import test from "node:test";
import assert from "node:assert/strict";
import { secondaryTopics } from "../lib/secondary-curriculum";
import {
  examBank,
  createAttempt,
  restoreAttempt,
  examResult,
  shuffled,
  difficulties,
} from "../lib/mock-exam";

function rng(seed: number) {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

test("80 questões autorais ligam as 40 aulas a cinco alternativas e uma resposta válida", () => {
  assert.equal(examBank.length, 80);
  assert.equal(new Set(examBank.map((q) => q.id)).size, 80);
  assert.equal(new Set(examBank.map((q) => q.prompt)).size, 80);
  for (const topic of secondaryTopics) {
    const pool = examBank.filter((q) => q.topicId === topic.id);
    assert.equal(pool.length, 20);
    assert.deepEqual([...new Set(pool.map((q) => q.difficulty))].sort(), [...difficulties].sort());
    for (const lesson of topic.lessons)
      assert.equal(pool.filter((q) => q.lessonId === lesson.id).length, 2);
  }
  for (const q of examBank) {
    assert.ok(
      secondaryTopics.some((t) => t.id === q.topicId && t.lessons.some((l) => l.id === q.lessonId)),
    );
    assert.equal(q.options.length, 5);
    assert.equal(new Set(q.options.map((o) => o.text)).size, 5);
    assert.equal(q.options.filter((o) => o.id === q.correct).length, 1);
    assert.ok(q.explanation.trim());
  }
});

test("sorteio distribui matérias e níveis, aceita limites e não repete nem modifica o banco", () => {
  const snapshot = JSON.stringify(examBank);
  for (let seed = 1; seed <= 30; seed++) {
    const attempt = createAttempt("all", 20, rng(seed));
    const selected = attempt.questions.map((entry) => examBank.find((q) => q.id === entry.id)!);
    assert.equal(new Set(attempt.questions.map((q) => q.id)).size, 20);
    for (const topic of secondaryTopics)
      assert.equal(selected.filter((q) => q.topicId === topic.id).length, 5);
    for (const level of difficulties) assert.ok(selected.some((q) => q.difficulty === level));
    for (const entry of attempt.questions)
      assert.deepEqual([...entry.options].sort(), ["0", "1", "2", "3", "4"]);
  }
  for (const topic of secondaryTopics) {
    for (const count of [1, 3, 9, 20]) {
      const attempt = createAttempt(topic.id, count, rng(count));
      assert.equal(attempt.questions.length, count);
      assert.ok(
        attempt.questions.every(
          (entry) => examBank.find((q) => q.id === entry.id)!.topicId === topic.id,
        ),
      );
    }
  }
  assert.equal(createAttempt("all", 80).questions.length, 80);
  for (const n of [0, -1, 1.5, NaN, Infinity, 81]) assert.throws(() => createAttempt("all", n));
  assert.throws(() => createAttempt(secondaryTopics[0].id, 21));
  assert.throws(() => createAttempt("unknown", 1));
  assert.equal(JSON.stringify(examBank), snapshot);
  assert.deepEqual(createAttempt("all", 20, rng(1)), createAttempt("all", 20, rng(1)));
  assert.notDeepEqual(
    createAttempt("all", 20, rng(1)).questions,
    createAttempt("all", 20, rng(2)).questions,
  );
  assert.deepEqual(shuffled([], rng(1)), []);
});

test("resultado usa IDs de alternativas, conta erros/brancos e mantém denominador total", () => {
  const attempt = createAttempt("all", 3, rng(7));
  const first = examBank.find((q) => q.id === attempt.questions[0].id)!;
  const second = examBank.find((q) => q.id === attempt.questions[1].id)!;
  attempt.answers[first.id] = first.correct;
  attempt.answers[second.id] = second.options.find((o) => o.id !== second.correct)!.id;
  assert.deepEqual(examResult(attempt), {
    total: 3,
    correct: 1,
    blank: 1,
    incorrect: 1,
    percentage: 33,
  });
  assert.deepEqual(examResult({ ...attempt, answers: {} }), {
    total: 3,
    correct: 0,
    blank: 3,
    incorrect: 0,
    percentage: 0,
  });
  for (const entry of attempt.questions)
    attempt.answers[entry.id] = examBank.find((q) => q.id === entry.id)!.correct;
  assert.equal(examResult(attempt).percentage, 100);
});

test("restauração rejeita estado adulterado/antigo e preserva ordem, respostas e finalização", () => {
  const attempt = createAttempt(secondaryTopics[0].id, 20, rng(5));
  attempt.index = 7;
  attempt.answers[attempt.questions[0].id] = attempt.questions[0].options[0];
  attempt.finished = true;
  assert.deepEqual(restoreAttempt(JSON.stringify(attempt)), attempt);
  const invalid = [
    null,
    "{",
    "null",
    "[]",
    JSON.stringify({ ...attempt, version: 2 }),
    JSON.stringify({ ...attempt, topicId: "unknown" }),
    JSON.stringify({ ...attempt, questions: [] }),
    JSON.stringify({ ...attempt, index: 20 }),
    JSON.stringify({ ...attempt, finished: "yes" }),
    JSON.stringify({ ...attempt, answers: { unknown: "0" } }),
    JSON.stringify({ ...attempt, answers: { [attempt.questions[0].id]: "unknown" } }),
    JSON.stringify({ ...attempt, questions: [attempt.questions[0], attempt.questions[0]] }),
    JSON.stringify({
      ...attempt,
      questions: [{ id: attempt.questions[0].id, options: ["0", "0", "2", "3", "4"] }],
    }),
    JSON.stringify({ ...attempt, questions: [{ id: "stale", options: [] }] }),
  ];
  for (const raw of invalid) assert.equal(restoreAttempt(raw), null);
  assert.equal(restoreAttempt(" ".repeat(50001)), null);
});
