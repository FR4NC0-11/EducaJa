import { secondaryTopics } from "@/lib/secondary-curriculum";
import type { Topic } from "@/lib/catalog";
import { topics } from "@/lib/catalog";
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
  Scale,
  Compass,
  Sparkles,
  Layers3,
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
      <a className="mobile-only mobile-matter-link" href="#school-subjects-title">
        Escolher uma matéria <ArrowRight size={18} aria-hidden="true" />
      </a>
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
          <h2 id="school-subjects-title" tabIndex={-1}>
            Escolha sua área de estudo
          </h2>
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
  onLaw,
}: {
  onProgramming: () => void;
  onSecondary: () => void;
  onLaw: () => void;
}) {
  const programmingLessons = topics.reduce((sum, topic) => sum + topic.lessons.length, 0);
  const schoolLessons = secondaryTopics.reduce((sum, topic) => sum + topic.lessons.length, 0);
  return (
    <section className="entry-home" aria-labelledby="areas-title">
      <header className="entry-hero">
        <div className="entry-intro">
          <div className="eyebrow">BEM-VINDO AO EDUCAJÁ</div>
          <h1 id="areas-title">Qual área você quer acessar?</h1>
          <p>Escolha seu espaço de estudo. Você pode trocar de área pelo menu.</p>
        </div>
        <div className="entry-desktop-only entry-art" aria-hidden="true">
          <div className="entry-art-grid" />
          <span className="entry-art-caption">CADA DESCOBERTA ABRE UM CAMINHO</span>
          <div className="entry-orbit orbit-one" />
          <div className="entry-orbit orbit-two" />
          <div className="entry-book">
            <BookOpen size={86} strokeWidth={1} />
            <span>
              O próximo capítulo
              <br />
              <strong>é seu.</strong>
            </span>
          </div>
          <span className="entry-satellite satellite-code">
            <Code2 size={25} />
          </span>
          <span className="entry-satellite satellite-school">
            <GraduationCap size={27} />
          </span>
          <span className="entry-satellite satellite-law">
            <Scale size={25} strokeWidth={1.3} />
          </span>
          <Sparkles className="entry-spark" size={22} strokeWidth={1} />
        </div>
      </header>
      <div className="entry-desktop-only entry-section-label">
        <span>
          <Compass size={18} aria-hidden="true" /> Explore seus caminhos
        </span>
        <span>Três espaços. Novas possibilidades.</span>
      </div>
      <div className="study-area-grid">
        <article className="study-area-card entry-programming">
          <span className="entry-desktop-only entry-card-number" aria-hidden="true">
            01
          </span>
          <Code2 size={32} aria-hidden="true" />
          <span className="eyebrow">IDEIAS QUE VIRAM PROJETOS</span>
          <h2>Programação</h2>
          <p className="desktop-only">
            Aprenda com aulas, exemplos e exercícios de Java, Web, PostgreSQL, Internet das Coisas e
            T.I. com Git/GitHub.
          </p>
          <p className="mobile-only">Crie programas e sites. Aprenda Git e banco de dados.</p>
          <span className="entry-desktop-only entry-availability">
            {programmingLessons} aulas · {topics.length} matérias
          </span>
          <button className="button primary" onClick={onProgramming}>
            Acessar Programação <ArrowRight size={18} aria-hidden="true" />
          </button>
        </article>
        <article className="study-area-card entry-secondary">
          <span className="entry-desktop-only entry-card-number" aria-hidden="true">
            02
          </span>
          <GraduationCap size={32} aria-hidden="true" />
          <span className="eyebrow">CONHECIMENTO PARA IR ALÉM</span>
          <h2>Ensino Médio</h2>
          <p className="desktop-only">
            Matemática, Linguagens, Ciências Humanas e Ciências da Natureza. Redação Enem e
            simulados.
          </p>
          <p className="mobile-only">Quatro matérias da 3ª série, redação Enem e simulados.</p>
          <span className="quiet-badge">3ª série · Redação Enem e mais</span>
          <span className="entry-desktop-only entry-availability">
            {schoolLessons} aulas · {secondaryTopics.length} matérias
          </span>
          <button className="button secondary" onClick={onSecondary}>
            Acessar Ensino Médio <ArrowRight size={18} aria-hidden="true" />
          </button>
        </article>
        <article className="study-area-card entry-law">
          <span className="entry-desktop-only entry-card-number" aria-hidden="true">
            03
          </span>
          <Scale size={32} strokeWidth={1.3} aria-hidden="true" />
          <span className="eyebrow">LEITURA, CONTEXTO E ARGUMENTAÇÃO</span>
          <h2>Direito</h2>
          <p className="desktop-only">
            Conheça o novo espaço de Direito brasileiro e explore a organização das matérias.
          </p>
          <p className="mobile-only">Explore os temas de Direito brasileiro.</p>
          <span className="quiet-badge">Novo espaço · Aulas em preparação</span>
          <span className="entry-desktop-only entry-availability">
            Explore as prévias · aulas em preparação
          </span>
          <button className="button secondary" onClick={onLaw}>
            Acessar Direito <ArrowRight size={18} aria-hidden="true" />
          </button>
        </article>
      </div>
      <aside className="entry-desktop-only entry-guide" aria-label="Como começar a estudar">
        <div className="entry-guide-title">
          <Layers3 size={23} aria-hidden="true" />
          <strong>Um passo de cada vez.</strong>
        </div>
        <p>
          Entre em uma área, escolha um assunto e comece pela aula. Em Programação e Ensino Médio,
          use as anotações para organizar o que aprendeu.
        </p>
      </aside>
    </section>
  );
}
