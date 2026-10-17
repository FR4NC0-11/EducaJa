import { secondaryTopics } from "@/lib/secondary-curriculum";
import type { Topic } from "@/lib/catalog";
import { ArrowRight, BookOpen, Code2, GraduationCap } from "lucide-react";

export default function StudyAreas({
  secondary = false,
  onProgramming,
  choose,
  busy,
}: {
  secondary?: boolean;
  choose: (topic: Topic) => void;
  busy: boolean;
  onProgramming: () => void;
}) {
  if (secondary)
    return (
      <section aria-labelledby="secondary-title">
        <div className="page-heading">
          <div>
            <div className="eyebrow">ÁREA DE ESTUDO</div>
            <h1 id="secondary-title">Ensino Médio</h1>
            <p>3ª série · Primeiras unidades de estudo, com explicações e exercícios autorais.</p>
          </div>
        </div>
        <div className="area-notice">
          <BookOpen size={24} aria-hidden="true" />
          <div>
            <h2>Comece pelas primeiras unidades</h2>
            <p>
              Uma unidade por área já está disponível. Outros assuntos, o diagnóstico e o professor
              por IA serão adicionados em próximas etapas.
            </p>
          </div>
        </div>
        <ul
          className="study-area-grid secondary-subjects"
          aria-label="Unidades disponíveis da 3ª série"
        >
          {secondaryTopics.map((topic) => (
            <li key={topic.id}>
              <h2>{topic.category}</h2>
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
              <button
                className="button primary"
                disabled={busy}
                onClick={() => choose(topic)}
                aria-label={`Estudar ${topic.shortTitle}`}
              >
                Estudar esta unidade <ArrowRight size={18} aria-hidden="true" />
              </button>
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
          <span className="quiet-badge">3ª série · Primeiras unidades</span>
          <button className="button secondary" onClick={onSecondary}>
            Acessar Ensino Médio <ArrowRight size={18} aria-hidden="true" />
          </button>
        </article>
      </div>
    </section>
  );
}
