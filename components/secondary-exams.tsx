"use client";

import { useEffect, useRef, useState } from "react";
import { secondaryTopics } from "@/lib/secondary-curriculum";
import {
  availableQuestions,
  createAttempt,
  difficultyLabels,
  examResult,
  examStorageKey,
  questionById,
  restoreAttempt,
  type Attempt,
} from "@/lib/mock-exam";

export default function SecondaryExams({ active }: { active: boolean }) {
  const [topicId, setTopicId] = useState("all");
  const [quantity, setQuantity] = useState("20");
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [ready, setReady] = useState(false);
  const [storageOK, setStorageOK] = useState(true);
  const [notice, setNotice] = useState("");
  const [confirm, setConfirm] = useState<"finish" | "reset" | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const maximum = availableQuestions(topicId).length;
  const count = Number(quantity);
  const validCount =
    quantity.trim() !== "" && Number.isInteger(count) && count >= 1 && count <= maximum;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(examStorageKey);
      const restored = restoreAttempt(raw);
      setAttempt(restored);
      if (raw && !restored)
        setNotice("A tentativa anterior era incompatível. Você pode iniciar um novo simulado.");
    } catch {
      setStorageOK(false);
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      if (attempt) localStorage.setItem(examStorageKey, JSON.stringify(attempt));
      else localStorage.removeItem(examStorageKey);
      setStorageOK(true);
    } catch {
      setStorageOK(false);
    }
  }, [attempt, ready]);
  useEffect(() => {
    if (active && ready) heading.current?.focus();
  }, [active, ready, attempt?.index, attempt?.finished, !!attempt]);
  useEffect(() => {
    if (storageOK || !attempt || attempt.finished) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [storageOK, !!attempt, attempt?.finished]);

  const current = attempt ? questionById.get(attempt.questions[attempt.index].id)! : null;
  const result = attempt ? examResult(attempt) : null;
  function move(index: number) {
    setConfirm(null);
    setAttempt((previous) => (previous && !previous.finished ? { ...previous, index } : previous));
  }
  function finish() {
    setAttempt((previous) => (previous ? { ...previous, finished: true } : previous));
    setConfirm(null);
  }
  return (
    <section className="exam-page" aria-label="Simulados do Ensino Médio">
      <div className="eyebrow">PRÁTICA · 3ª SÉRIE</div>
      <h1>Simulados</h1>
      <p>
        Questões autorais de múltipla escolha, baseadas nas aulas do EducaJá. Não são questões
        oficiais de exame.
      </p>
      <p className="exam-storage">
        O banco atual cobre as dez primeiras aulas de cada matéria. As cinco novas aulas por
        matéria, com recortes do 3º trimestre, têm exercícios nas aulas e ainda não entram no
        sorteio do simulado.
      </p>
      <p className="exam-storage">
        {storageOK
          ? "Uma tentativa fica salva neste navegador, neste dispositivo. Não é sincronizada com a conta e não altera o progresso das aulas."
          : "Não foi possível salvar neste navegador. A tentativa continua nesta página, mas pode ser perdida ao fechar ou recarregar."}
      </p>
      {notice && <p role="status">{notice}</p>}
      {!ready ? (
        <p role="status">Preparando o simulado…</p>
      ) : !attempt ? (
        <form
          className="exam-setup"
          onSubmit={(event) => {
            event.preventDefault();
            if (!validCount) return;
            setAttempt(createAttempt(topicId, count));
            setNotice("");
          }}
        >
          <h2 ref={heading} tabIndex={-1}>
            Monte seu simulado
          </h2>
          <label htmlFor="exam-subject">Matéria</label>
          <select
            id="exam-subject"
            value={topicId}
            onChange={(event) => {
              const next = event.target.value;
              setTopicId(next);
              if (Number(quantity) > availableQuestions(next).length) setQuantity("20");
            }}
          >
            <option value="all">Todas as matérias</option>
            {secondaryTopics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.category}
              </option>
            ))}
          </select>
          <label htmlFor="exam-count">Quantidade de questões</label>
          <input
            id="exam-count"
            type="number"
            min={1}
            max={maximum}
            step={1}
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            aria-describedby="exam-count-help"
          />
          <p id="exam-count-help">
            Padrão: 20. Escolha de 1 a {maximum} questões disponíveis para esta seleção.
          </p>
          <p>
            Dificuldades fáceis, intermediárias e difíceis são combinadas conforme a quantidade
            permitir. Questões e alternativas são embaralhadas. Na opção com todas as matérias, a
            seleção distribui questões entre as quatro áreas.
          </p>
          <button className="button primary" type="submit" disabled={!validCount}>
            Iniciar simulado
          </button>
        </form>
      ) : attempt.finished && result ? (
        <div className="exam-results">
          <h2 ref={heading} tabIndex={-1}>
            Resultado do simulado
          </h2>
          <p>
            Você acertou{" "}
            <strong>
              {result.correct} de {result.total}
            </strong>{" "}
            questões ({result.percentage}%). Todas têm o mesmo peso; questões em branco entram no
            total.
          </p>
          <ul className="exam-totals" aria-label="Resumo do resultado">
            <li>Acertos: {result.correct}</li>
            <li>Erros: {result.incorrect}</li>
            <li>Em branco: {result.blank}</li>
          </ul>
          <p>
            Este é o resultado objetivo desta tentativa, não uma nota oficial nem um diagnóstico de
            domínio. O diagnóstico pedagógico será uma próxima etapa.
          </p>
          <h3>Confira as respostas e revise as aulas</h3>
          {attempt.questions.map((entry, index) => {
            const q = questionById.get(entry.id)!;
            const answer = attempt.answers[q.id];
            const topic = secondaryTopics.find((t) => t.id === q.topicId)!;
            const lesson = topic.lessons.find((l) => l.id === q.lessonId)!;
            return (
              <details className="exam-review" key={q.id}>
                <summary>
                  Questão {index + 1} ·{" "}
                  {answer === undefined ? "Em branco" : answer === q.correct ? "Certa" : "Errada"} ·{" "}
                  {topic.category}
                </summary>
                <p>{q.prompt}</p>
                <p>
                  Sua resposta: {q.options.find((o) => o.id === answer)?.text ?? "Não respondida"}
                </p>
                <p>
                  <strong>Resposta correta:</strong>{" "}
                  {q.options.find((o) => o.id === q.correct)!.text}
                </p>
                <p>{q.explanation}</p>
                <p>
                  Dificuldade: {difficultyLabels[q.difficulty]}. Aula para revisar:{" "}
                  <strong>{lesson.title}</strong>.
                </p>
              </details>
            );
          })}
          <button className="button primary" onClick={() => setConfirm("reset")}>
            Novo simulado
          </button>
        </div>
      ) : current && result ? (
        <div className="exam-attempt">
          <h2 ref={heading} tabIndex={-1}>
            Questão {attempt.index + 1} de {attempt.questions.length}
          </h2>
          <p className="exam-meta">
            {secondaryTopics.find((t) => t.id === current.topicId)!.category} ·{" "}
            {difficultyLabels[current.difficulty]} · {attempt.questions.length - result.blank}{" "}
            respondidas
          </p>
          <fieldset className="exam-options">
            <legend>{current.prompt}</legend>
            {attempt.questions[attempt.index].options.map((id, index) => {
              const option = current.options.find((o) => o.id === id)!;
              return (
                <label
                  key={id}
                  className={
                    attempt.answers[current.id] === id ? "exam-option selected" : "exam-option"
                  }
                >
                  <input
                    type="radio"
                    name={current.id}
                    value={id}
                    checked={attempt.answers[current.id] === id}
                    onChange={() =>
                      setAttempt((previous) =>
                        previous && !previous.finished
                          ? { ...previous, answers: { ...previous.answers, [current.id]: id } }
                          : previous,
                      )
                    }
                  />
                  <span>{String.fromCharCode(65 + index)}.</span>
                  <span>{option.text}</span>
                </label>
              );
            })}
          </fieldset>
          <button
            className="text-button"
            disabled={attempt.answers[current.id] === undefined}
            onClick={() =>
              setAttempt((previous) => {
                if (!previous || previous.finished) return previous;
                const answers = { ...previous.answers };
                delete answers[current.id];
                return { ...previous, answers };
              })
            }
          >
            Limpar resposta
          </button>
          <div className="exam-controls">
            <button
              className="button"
              disabled={attempt.index === 0}
              onClick={() => move(attempt.index - 1)}
            >
              Questão anterior
            </button>
            <button
              className="button"
              disabled={attempt.index === attempt.questions.length - 1}
              onClick={() => move(attempt.index + 1)}
            >
              Próxima questão
            </button>
          </div>
          <nav className="exam-map" aria-label="Navegar pelas questões">
            {attempt.questions.map((entry, index) => (
              <button
                key={entry.id}
                aria-label={`Ir para questão ${index + 1}${attempt.answers[entry.id] !== undefined ? ", respondida" : ", em branco"}`}
                aria-current={attempt.index === index ? "step" : undefined}
                className={attempt.answers[entry.id] !== undefined ? "answered" : ""}
                onClick={() => move(index)}
              >
                {index + 1}
                {attempt.answers[entry.id] !== undefined && <span aria-hidden="true"> ✓</span>}
              </button>
            ))}
          </nav>
          <div className="exam-controls">
            <button className="button primary" onClick={() => setConfirm("finish")}>
              Finalizar simulado
            </button>
            <button className="text-button" onClick={() => setConfirm("reset")}>
              Descartar tentativa
            </button>
          </div>
        </div>
      ) : null}
      {confirm && attempt && (
        <section className="exam-confirm" aria-label="Confirmar ação">
          <p>
            {confirm === "finish"
              ? `Finalizar com ${result!.blank} questão(ões) em branco? Depois de finalizar, as respostas ficam bloqueadas.`
              : "Descartar esta tentativa e seu resultado salvo neste navegador para configurar outra?"}
          </p>
          <button
            className="button primary"
            onClick={() => {
              if (confirm === "finish") finish();
              else {
                setAttempt(null);
                setConfirm(null);
              }
            }}
          >
            {confirm === "finish" ? "Confirmar finalização" : "Confirmar descarte"}
          </button>
          <button className="button" onClick={() => setConfirm(null)}>
            Continuar nesta tentativa
          </button>
        </section>
      )}
    </section>
  );
}
