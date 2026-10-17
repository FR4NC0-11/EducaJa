import { secondaryTopics } from "@/lib/secondary-curriculum";
import type { Topic } from "@/lib/catalog";
import type { Workspace } from "@/lib/learning";
import {
  ArrowRight,
  BookOpen,
  Code2,
  GraduationCap,
  Sigma,
  Globe2,
  Dna,
  PenLine,
} from "lucide-react";

const subjectIcons = [Sigma, PenLine, Globe2, Dna];
const subjectNames = [
  "Raciocínio e possibilidades",
  "Leitura, voz e argumentação",
  "Pessoas e transformações",
  "Vida, ciência e evidência",
];

export default function StudyAreas({
  secondary = false,
  onProgramming,
  choose,
  busy,
  summaries = [],
}: {
  secondary?: boolean;
  choose: (topic: Topic, lessonId?: string) => void;
  busy: boolean;
  summaries?: Workspace["summaries"];
  onProgramming: () => void;
}) {
  if (!secondary) return null;
  const essayTopic = secondaryTopics.find((topic) => topic.id === "em3-linguagens-leitura")!;
  const count = secondaryTopics.reduce((sum, topic) => sum + topic.lessons.length, 0);
  return (
    <section className="school-home" aria-labelledby="secondary-title">
      <header className="school-hero">
        <div>
          <span className="eyebrow">SEU ESPAÇO DE ESTUDO · 3ª SÉRIE</span>
          <h1 id="secondary-title">Ensino Médio</h1>
          <p className="school-lead">
            Entenda as ideias.
            <br />
            Construa seu próximo passo.
          </p>
          <p>
            Da primeira tentativa à revisão: explicações, exemplos e prática para estudar com
            intenção.
          </p>
        </div>
        <div className="school-edition" aria-label={`${count} aulas em quatro áreas`}>
          <GraduationCap size={28} aria-hidden="true" />
          <strong>3ª</strong>
          <span>SÉRIE</span>
          <div>
            {count} aulas <span aria-hidden="true">/</span> 4 áreas
          </div>
        </div>
      </header>
      <section className="essay-feature" aria-labelledby="essay-feature-title">
        <div className="essay-feature-icon">
          <PenLine size={26} aria-hidden="true" />
        </div>
        <div>
          <span className="eyebrow">OFICINA DE ESCRITA</span>
          <h2 id="essay-feature-title">Redação Enem, uma etapa por vez.</h2>
          <p>
            Planeje. Argumente. Reescreva. Cinco aulas para trabalhar seu texto com foco em alto
            desempenho, sem promessa de nota.
          </p>
        </div>
        <button
          className="button primary"
          disabled={busy}
          onClick={() => choose(essayTopic, "em3-redacao-projeto")}
        >
          Estudar redação <ArrowRight size={17} aria-hidden="true" />
        </button>
      </section>
      <div className="school-section-heading">
        <div>
          <span className="eyebrow">QUATRO MANEIRAS DE EXPLORAR</span>
          <h2>Escolha sua área de estudo</h2>
        </div>
        <span className="quiet-badge">No seu ritmo</span>
      </div>
      <ul className="school-subjects" aria-label="Unidades disponíveis da 3ª série">
        {secondaryTopics.map((topic, index) => {
          const Icon = subjectIcons[index];
          const completed = Math.min(
            topic.lessons.length,
            summaries.find((item) => item.topic_id === topic.id)?.completed ?? 0,
          );
          return (
            <li className={`school-subject subject-${index}`} key={topic.id}>
              <div className="school-subject-top">
                <span className="school-subject-icon">
                  <Icon size={25} aria-hidden="true" />
                </span>
                <span className="school-subject-number" aria-hidden="true">
                  0{index + 1}
                </span>
              </div>
              <span className="school-subject-caption">{subjectNames[index]}</span>
              <h2>{topic.category}</h2>
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
              <ul className="school-preview" aria-label={`Amostra de aulas de ${topic.category}`}>
                {topic.lessons.slice(0, 3).map((item) => (
                  <li key={item.id}>
                    <span aria-hidden="true">↗</span>
                    {item.title}
                  </li>
                ))}
              </ul>
              <div className="school-subject-bottom">
                <span>
                  {topic.lessons.length} aulas · {completed} marcadas como concluídas
                </span>
                <button
                  className="button secondary"
                  disabled={busy}
                  onClick={() => choose(topic)}
                  aria-label={`Estudar ${topic.shortTitle}`}
                >
                  Explorar as aulas <ArrowRight size={17} aria-hidden="true" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="school-footnote">
        <BookOpen size={19} aria-hidden="true" />
        <p>
          O progresso registra as aulas que você marcou como concluídas. Diagnóstico e professor por
          IA desta área ainda estão em preparação.
        </p>
        <button className="text-button" onClick={onProgramming}>
          Acessar Programação <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
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
        <article className="study-area-card entry-programming">
          <Code2 size={32} aria-hidden="true" />
          <span className="eyebrow">IDEIAS QUE VIRAM PROJETOS</span>
          <h2>Programação</h2>
          <p>
            Aprenda com aulas, exemplos e exercícios de Java, Web, PostgreSQL, Internet das Coisas e
            T.I. com Git/GitHub.
          </p>
          <button className="button primary" onClick={onProgramming}>
            Acessar Programação <ArrowRight size={18} aria-hidden="true" />
          </button>
        </article>
        <article className="study-area-card entry-secondary">
          <GraduationCap size={32} aria-hidden="true" />
          <span className="eyebrow">CONHECIMENTO PARA IR ALÉM</span>
          <h2>Ensino Médio</h2>
          <p>Matemática, Linguagens, Ciências Humanas e Ciências da Natureza.</p>
          <span className="quiet-badge">3ª série · Redação Enem e mais</span>
          <button className="button secondary" onClick={onSecondary}>
            Acessar Ensino Médio <ArrowRight size={18} aria-hidden="true" />
          </button>
        </article>
      </div>
    </section>
  );
}
