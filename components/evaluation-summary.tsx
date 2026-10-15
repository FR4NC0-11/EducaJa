import type { Evaluation } from "@/lib/teacher-contract";
export default function EvaluationSummary({ evaluation }: { evaluation: Evaluation }) {
  return (
    <section className="evaluation-summary" aria-labelledby="evaluation-title">
      <div className="evaluation-heading">
        <div>
          <span className="eyebrow">AVALIAÇÃO FORMATIVA POR IA</span>
          <h2 id="evaluation-title">Seu ponto de partida</h2>
        </div>
        <strong>
          {evaluation.average.toFixed(1).replace(".", ",")}
          <small> / 10</small>
        </strong>
      </div>
      <p>{evaluation.summary}</p>
      <details>
        <summary>Ver as notas e justificativas das dez respostas</summary>
        <p className="rubric-note">
          Conceitos: até 4 pontos · Aplicação: até 3 · Raciocínio: até 2 · Clareza: até 1. A nota é
          a soma desses critérios. Esta avaliação pode conter erros e não é uma certificação.
        </p>
        <ol>
          {evaluation.grades.map((row) => (
            <li key={row.index}>
              <strong>
                Questão {row.index + 1}:{" "}
                {row.concepts + row.application + row.reasoning + row.clarity}/10
              </strong>
              <span>
                Conceitos {row.concepts}/4 · Aplicação {row.application}/3 · Raciocínio{" "}
                {row.reasoning}/2 · Clareza {row.clarity}/1
              </span>
              <p>{row.feedback}</p>
            </li>
          ))}
        </ol>
      </details>
    </section>
  );
}
