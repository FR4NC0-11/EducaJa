"use client";

import { useState } from "react";
import type { Lesson } from "@/lib/catalog";

export default function GitTerminal({ steps }: { steps: NonNullable<Lesson["terminal"]> }) {
  const [index, setIndex] = useState(0);
  return (
    <section className="git-terminal" aria-label="Demonstração de Git Bash">
      <h3>Git Bash · demonstração guiada</h3>
      <p>
        Exemplo simulado: não executa comandos nem altera seus arquivos. Saídas reais podem variar.
      </p>
      <pre aria-live="polite" aria-atomic="true">
        <code>
          <span className="terminal-prompt">aluno@TREINO MINGW64 ~/estoque-treino</span>
          {"\n$ "}
          {steps[index].command}
          {"\n"}
          {steps[index].output || "(sem saída; confira o próximo status)"}
        </code>
      </pre>
      <div className="terminal-controls">
        <button className="button" disabled={index === 0} onClick={() => setIndex(index - 1)}>
          Comando anterior
        </button>
        <span>
          Passo {index + 1} de {steps.length}
        </span>
        <button
          className="button"
          disabled={index === steps.length - 1}
          onClick={() => setIndex(index + 1)}
        >
          Próximo comando
        </button>
      </div>
    </section>
  );
}
