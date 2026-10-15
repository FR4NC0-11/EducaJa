import { ArrowRight, BookOpen, Check, Clock3 } from "lucide-react";
import { topics, type Topic } from "@/lib/catalog";
import type { Workspace } from "@/lib/learning";

const categories = [
  { value: "Todos", label: "Todos os assuntos" },
  { value: "Front-end", label: "Sites" },
  { value: "Back-end", label: "Programação" },
  { value: "Banco de dados", label: "Dados" },
  { value: "IoT", label: "IoT" },
];

export default function CourseHome({
  data,
  topic,
  category,
  setCategory,
  choose,
  busy,
  resume,
}: {
  data: Workspace | null;
  topic: Topic | undefined;
  category: string;
  setCategory: (category: string) => void;
  choose: (topic: Topic) => void;
  busy: boolean;
  resume: () => void;
}) {
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">ASSUNTOS</div>
          <h1>O que você quer aprender?</h1>
          <p>Escolha um assunto para começar. Você não precisa saber programar.</p>
        </div>
      </div>
      {topic && (
        <section className="resume-card">
          <BookOpen size={22} />
          <div>
            <span className="eyebrow">SEU ÚLTIMO ASSUNTO</span>
            <h2>{topic.shortTitle}</h2>
            <p>{data?.session?.goal}</p>
          </div>
          <button className="button primary" onClick={resume}>
            Continuar estudando <ArrowRight size={17} />
          </button>
        </section>
      )}
      <ol className="getting-started" aria-label="Como começar">
        <li>
          <span>1</span>
          <div>
            <strong>Escolha um assunto</strong>
            <p>Veja abaixo o que você pode aprender.</p>
          </div>
        </li>
        <li>
          <span>2</span>
          <div>
            <strong>Comece pela primeira aula</strong>
            <p>Leia a explicação e veja um exemplo.</p>
          </div>
        </li>
        <li>
          <span>3</span>
          <div>
            <strong>Pratique o que entendeu</strong>
            <p>Faça o exercício e anote suas dúvidas.</p>
          </div>
        </li>
      </ol>
      <section id="explore" className="explore-section" aria-label="Assuntos disponíveis">
        <div className="section-heading">
          <h2>Escolha por onde começar</h2>
          <span className="quiet-badge">{topics.length} assuntos disponíveis</span>
        </div>
        <div className="filters" aria-label="Filtrar assuntos">
          {categories.map((item) => (
            <button
              key={item.value}
              aria-pressed={category === item.value}
              className={category === item.value ? "selected" : ""}
              onClick={() => setCategory(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="topic-list">
          {topics
            .filter((item) => category === "Todos" || item.category === category)
            .map((item) => {
              const summary = data?.summaries.find((value) => value.topic_id === item.id);
              return (
                <button
                  key={item.id}
                  className="topic-card"
                  disabled={!data || busy}
                  onClick={() => choose(item)}
                  aria-label={`Escolher ${item.shortTitle}`}
                >
                  <div className="topic-card-top">
                    <span className={`topic-symbol ${item.color}`}>{item.symbol}</span>
                    <span className="quiet-badge">Comece do básico</span>
                  </div>
                  <span className="topic-details">
                    <strong>{item.shortTitle}</strong>
                    <span className="topic-description">{item.description}</span>
                  </span>
                  <span className="topic-meta">
                    <Clock3 size={14} />
                    {item.lessons.reduce((total, lesson) => total + lesson.minutes, 0)} min de
                    leitura <span>·</span> {item.lessons.length} aulas
                    {summary && summary.completed > 0 && (
                      <span className="saved-progress">
                        <Check size={13} />
                        {summary.completed} concluída{summary.completed > 1 ? "s" : ""}
                      </span>
                    )}
                  </span>
                  <span className="topic-card-action">
                    {summary ? "Continuar neste assunto" : "Escolher assunto"}
                    <ArrowRight size={17} />
                  </span>
                </button>
              );
            })}
        </div>
      </section>
      <details className="help-panel">
        <summary>Preciso fazer o teste inicial antes de estudar?</summary>
        <p>
          Não. Você pode ir direto para as aulas. O teste inicial tem dez perguntas para registrar o
          que você já sabe. Se não souber uma resposta, tudo bem: escreva “Ainda não sei”. Ele não
          bloqueia o estudo.
        </p>
        <p>
          Nesta versão, as aulas e os exercícios já estão preparados. A correção automática das
          respostas ainda não está disponível.
        </p>
      </details>
    </>
  );
}
