import { ArrowRight, BookOpen, Code2, GraduationCap } from "lucide-react";

export default function StudyAreas({
  secondary = false,
  onProgramming,
}: {
  secondary?: boolean;
  onProgramming: () => void;
}) {
  if (secondary)
    return (
      <section aria-labelledby="secondary-title">
        <div className="page-heading">
          <div>
            <div className="eyebrow">ÁREA DE ESTUDO</div>
            <h1 id="secondary-title">Ensino Médio</h1>
            <p>Um novo espaço para estudar as matérias da escola.</p>
          </div>
        </div>
        <div className="area-notice">
          <BookOpen size={24} aria-hidden="true" />
          <div>
            <h2>Conteúdos em preparação</h2>
            <p>As aulas, os exercícios e o professor desta área ainda não estão disponíveis.</p>
          </div>
        </div>
        <ul
          className="study-area-grid secondary-subjects"
          aria-label="Áreas previstas para o Ensino Médio"
        >
          {["Matemática", "Linguagens", "Ciências Humanas", "Ciências da Natureza"].map((name) => (
            <li key={name}>
              <h2>{name}</h2>
              <span>Em breve</span>
            </li>
          ))}
        </ul>
        <button className="button secondary" onClick={onProgramming}>
          Acessar Programação <ArrowRight size={18} aria-hidden="true" />
        </button>
      </section>
    );
  return null;
}

export function StudyAreaEntry({
  onProgramming,
  onSecondary,
}: {
  onProgramming: () => void;
  onSecondary: () => void;
}) {
  return (
    <section aria-labelledby="areas-title">
      <div className="page-heading">
        <div>
          <div className="eyebrow">BEM-VINDO AO EDUCAJÁ</div>
          <h1 id="areas-title">Qual área você quer acessar?</h1>
          <p>Escolha seu espaço de estudo. Você pode trocar de área pelo menu.</p>
        </div>
      </div>
      <div className="study-area-grid">
        <article className="study-area-card">
          <Code2 size={32} aria-hidden="true" />
          <h2>Programação</h2>
          <p>
            Aprenda com aulas, exemplos e exercícios de Java, Web, PostgreSQL e Internet das Coisas.
          </p>
          <button className="button primary" onClick={onProgramming}>
            Acessar Programação <ArrowRight size={18} aria-hidden="true" />
          </button>
        </article>
        <article className="study-area-card">
          <GraduationCap size={32} aria-hidden="true" />
          <h2>Ensino Médio</h2>
          <p>Matemática, Linguagens, Ciências Humanas e Ciências da Natureza.</p>
          <span className="quiet-badge">Conteúdos em breve</span>
          <button className="button secondary" onClick={onSecondary}>
            Acessar Ensino Médio <ArrowRight size={18} aria-hidden="true" />
          </button>
        </article>
      </div>
    </section>
  );
}
