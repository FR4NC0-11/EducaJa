"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock3,
  Code2,
  Compass,
  GraduationCap,
  LayoutDashboard,
  Lightbulb,
  LoaderCircle,
  MessageCircle,
  NotebookPen,
  Route,
  Save,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { topics, getTopic, type Topic } from "@/lib/catalog";
import { answerCount, type Action, type Workspace } from "@/lib/learning";

type Screen = "home" | "diagnostic" | "learn";
type View = "teacher" | "trail";
type Drafts = Record<string, Record<string, string>>;

export default function LearningApp() {
  const [data, setData] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [screen, setScreen] = useState<Screen>("home");
  const [view, setView] = useState<View>("teacher");
  const [category, setCategory] = useState("Todos");
  const [selected, setSelected] = useState<Topic | null>(null);
  const [goal, setGoal] = useState("");
  const [question, setQuestion] = useState(0);
  const [drafts, setDrafts] = useState<Drafts>({});
  const [savedAnswers, setSavedAnswers] = useState<Drafts>({});
  const [savedNotes, setSavedNotes] = useState<Record<string, string>>({});
  const modalRef = useRef<HTMLElement>(null);
  const [lessonIndex, setLessonIndex] = useState(0);
  const [teacherTab, setTeacherTab] = useState<"explanation" | "analogy" | "exercise">(
    "explanation",
  );
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});
  const session = data?.session;
  const topic = session ? getTopic(session.topic_id) : undefined;
  const answered = session ? answerCount(session.answers) : 0;
  const completed = session?.completed_lessons.length ?? 0;
  const lesson = topic?.lessons[lessonIndex] ?? topic?.lessons[0];
  const currentDrafts = topic ? (drafts[topic.id] ?? {}) : {};
  const dirtyAnswer =
    !!session &&
    Object.entries(currentDrafts).some(
      ([key, value]) => value.trim() !== (session.answers[key] ?? ""),
    );
  const noteKey = topic && lesson ? `${topic.id}/${lesson.id}` : "";
  const noteText = noteDrafts[noteKey] ?? session?.notes[lesson?.id ?? ""] ?? "";
  const dirtyNote = !!lesson && noteText.trim() !== (session?.notes[lesson.id] ?? "");
  const unsaved =
    Object.entries(drafts).some(([id, answers]) =>
      Object.entries(answers).some(
        ([key, text]) => text.trim() !== (savedAnswers[id]?.[key] ?? ""),
      ),
    ) || Object.entries(noteDrafts).some(([key, text]) => text.trim() !== (savedNotes[key] ?? ""));

  function rememberSaved(result: Workspace) {
    if (!result.session) return;
    const current = result.session;
    setSavedAnswers((previous) => ({ ...previous, [current.topic_id]: current.answers }));
    setSavedNotes((previous) => ({
      ...previous,
      ...Object.fromEntries(
        Object.entries(current.notes).map(([key, text]) => [`${current.topic_id}/${key}`, text]),
      ),
    }));
  }

  async function load() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/workspace", { cache: "no-store" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setData(result);
      rememberSaved(result);
      if (result.session) setDrafts({ [result.session.topic_id]: result.session.answers });
    } catch (error) {
      setError(error instanceof Error ? error.message : "Não foi possível carregar o progresso.");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    void load();
  }, []);
  useEffect(() => {
    if (!unsaved) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [unsaved]);
  useEffect(() => {
    if (!selected) return;
    const previous = document.activeElement as HTMLElement | null;
    modalRef.current?.querySelector<HTMLTextAreaElement>("textarea")?.focus();
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
        'button:not(:disabled), textarea:not(:disabled), [tabindex="0"]',
      );
      if (!focusable?.length) return;
      const first = focusable[0],
        last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", trapFocus);
    return () => {
      document.removeEventListener("keydown", trapFocus);
      previous?.focus();
    };
  }, [selected]);

  async function act(action: Action) {
    if (busy) return false;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch("/api/workspace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(action),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Não foi possível salvar.");
      setData(result);
      rememberSaved(result);
      if (action.kind === "start")
        setDrafts((previous) => ({
          ...previous,
          [action.topicId]: { ...result.session.answers, ...previous[action.topicId] },
        }));
      if (action.kind === "answer")
        setDrafts((previous) => ({
          ...previous,
          [action.topicId]: { ...previous[action.topicId], [action.index]: action.text.trim() },
        }));
      if (action.kind === "note")
        setNoteDrafts((previous) => ({
          ...previous,
          [`${action.topicId}/${action.lessonId}`]: action.text.trim(),
        }));
      setNotice(
        action.kind === "submit"
          ? "Diagnóstico registrado. A avaliação ficará disponível quando a IA for conectada."
          : "Progresso salvo.",
      );
      return true;
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Não foi possível salvar. Seu texto continua aqui.",
      );
      return false;
    } finally {
      setBusy(false);
    }
  }

  function navigate(next: Screen) {
    if (busy) return;
    setNotice("");
    setScreen(next);
  }
  function choose(candidate: Topic) {
    if (topic && topic.id !== candidate.id && unsaved) {
      setError("Salve sua resposta ou anotação antes de mudar de tema.");
      return;
    }
    setSelected(candidate);
    setGoal(candidate.id === topic?.id ? (session?.goal ?? "") : "");
  }
  async function start() {
    if (!selected) return;
    if (await act({ kind: "start", topicId: selected.id, goal })) {
      setSelected(null);
      setQuestion(0);
      setLessonIndex(0);
      setTeacherTab("explanation");
      setScreen("diagnostic");
    }
  }
  async function saveAnswer() {
    if (!topic) return;
    const text = currentDrafts[String(question)] ?? session?.answers[String(question)] ?? "";
    if (await act({ kind: "answer", topicId: topic.id, index: question, text })) {
      if (question < 9) setQuestion(question + 1);
    }
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Ir para o conteúdo
      </a>
      <aside className="sidebar" inert={!!selected}>
        <button className="brand" onClick={() => navigate("home")} aria-label="EducaJá, início">
          <span className="brand-mark">
            <BookOpen size={22} />
          </span>
          <span>
            Educa<span className="brand-accent">Já</span>
            <span className="brand-dot">.</span>
          </span>
        </button>
        <div className="sidebar-label">SEU ESPAÇO DE APRENDIZADO</div>
        <nav aria-label="Principal" className="main-nav">
          <button className={screen === "home" ? "active" : ""} onClick={() => navigate("home")}>
            <LayoutDashboard size={19} /> Visão geral
          </button>
          <button
            className={screen === "diagnostic" ? "active" : ""}
            onClick={() => navigate("diagnostic")}
          >
            <Compass size={19} /> Meu diagnóstico <span className="nav-count">{answered}/10</span>
          </button>
          <button
            className={screen === "learn" && view === "teacher" ? "active" : ""}
            onClick={() => {
              navigate("learn");
              setView("teacher");
            }}
          >
            <MessageCircle size={19} /> Professor virtual
          </button>
          <button
            className={screen === "learn" && view === "trail" ? "active" : ""}
            onClick={() => {
              navigate("learn");
              setView("trail");
            }}
          >
            <Route size={19} /> Minha trilha
          </button>
        </nav>
        <div className="sidebar-bottom">
          <div className="small-orbit">
            <Sparkles size={22} />
          </div>
          <h3>Aprender é construir.</h3>
          <p>Um conceito, uma dúvida e uma descoberta de cada vez.</p>
          <span className="sidebar-line" />
          <div className="profile">
            <span className="avatar">
              <GraduationCap size={20} />
            </span>
            <div>
              <strong>Seu espaço pessoal</strong>
              <small>Progresso neste navegador</small>
            </div>
            <span className="online-dot" />
          </div>
        </div>
      </aside>
      <div className="workspace" inert={!!selected}>
        <header className="topbar">
          <div className="breadcrumb">
            Meu aprendizado <ChevronRight size={14} />
            <strong>
              {screen === "home"
                ? "Visão geral"
                : screen === "diagnostic"
                  ? "Diagnóstico"
                  : view === "teacher"
                    ? "Professor virtual"
                    : "Minha trilha"}
            </strong>
          </div>
          <span className="preview-pill">
            <span /> Primeira versão
          </span>
        </header>
        <main id="main-content" tabIndex={-1}>
          <div className="feedback" aria-live="polite">
            {error && (
              <div className="error-banner" role="alert">
                <span>{error}</span>
                {!data && (
                  <button onClick={load} disabled={loading}>
                    Tentar novamente
                  </button>
                )}
              </div>
            )}
            {notice && (
              <div className="success-banner">
                <CheckCircle2 size={17} />
                {notice}
              </div>
            )}
          </div>
          {loading ? (
            <div className="loading">
              <LoaderCircle className="spin" /> Preparando seu espaço…
            </div>
          ) : (
            <>
              {screen === "home" && (
                <>
                  <div className="page-heading">
                    <div>
                      <div className="eyebrow">CURIOSIDADE É UM ÓTIMO COMEÇO</div>
                      <h1>
                        Seu próximo passo começa aqui<span>.</span>
                      </h1>
                      <p>O que você quer entender hoje? Vamos construir esse caminho juntos.</p>
                    </div>
                    <span className="heading-symbol">
                      <Code2 size={31} />
                    </span>
                  </div>
                  <section className="hero-card" aria-labelledby="hero-title">
                    <div className="hero-copy">
                      <span className="hero-eyebrow">
                        <span /> DO SEU JEITO. NO SEU RITMO.
                      </span>
                      <h2 id="hero-title">
                        Menos conteúdo perdido.
                        <br />
                        Mais aprendizado que faz sentido.
                      </h2>
                      <p>
                        Conte o que você precisa aprender, explore o que já sabe e avance com
                        explicações, exemplos e prática.
                      </p>
                      <button
                        className="button mint"
                        disabled={!data}
                        onClick={() =>
                          topic
                            ? navigate("diagnostic")
                            : document
                                .getElementById("explore")
                                ?.scrollIntoView({ behavior: "smooth" })
                        }
                      >
                        {topic ? "Continuar meu diagnóstico" : "Encontrar meu ponto de partida"}
                        <ArrowRight size={18} />
                      </button>
                    </div>
                    <div className="hero-art" aria-hidden="true">
                      <div className="orbit orbit-one" />
                      <div className="orbit orbit-two" />
                      <div className="floating-tag tag-top">
                        <span className="tag-dot" /> um passo de cada vez
                      </div>
                      <div className="code-card">
                        <div className="code-dots">
                          <i />
                          <i />
                          <i />
                          <span>seu-futuro.js</span>
                        </div>
                        <div className="code-lines">
                          <span className="muted-code">// aprender também é tentar</span>
                          <br />
                          <span className="purple-code">const</span> próximoPasso = {"{"}
                          <br />
                          &nbsp; curiosidade: <span className="mint-code">true</span>,<br />
                          &nbsp; ritmo: <span className="yellow-code">"o seu"</span>,<br />
                          &nbsp; possibilidades: <span className="mint-code">Infinity</span>
                          <br />
                          {"}"};
                        </div>
                      </div>
                      <div className="floating-tag tag-bottom">
                        <span className="tag-icon">
                          <Check size={15} />
                        </span>{" "}
                        Você não precisa saber tudo para começar.
                      </div>
                    </div>
                  </section>
                  <section className="stats-grid" aria-label="Seu progresso">
                    <div className="stat">
                      <span className="stat-icon green">
                        <Target size={22} />
                      </span>
                      <div>
                        <span>Seu ponto de partida</span>
                        <strong>
                          {answered}
                          <small> / 10 questões respondidas</small>
                        </strong>
                      </div>
                    </div>
                    <div className="stat">
                      <span className="stat-icon violet">
                        <Route size={22} />
                      </span>
                      <div>
                        <span>Passos na trilha atual</span>
                        <strong>
                          {completed}
                          <small> / {topic?.lessons.length ?? 3} etapas concluídas</small>
                        </strong>
                      </div>
                    </div>
                    <div className="stat">
                      <span className="stat-icon peach">
                        <BookOpen size={22} />
                      </span>
                      <div>
                        <span>Seu foco de agora</span>
                        <strong className="focus-stat">{topic?.category ?? "Você escolhe"}</strong>
                      </div>
                    </div>
                  </section>
                  <div className="home-columns">
                    <section id="explore" className="explore-section">
                      <div className="section-heading">
                        <div>
                          <h2>O que vamos aprender?</h2>
                          <p>Escolha uma área e transforme uma dúvida em descoberta.</p>
                        </div>
                        <span className="quiet-badge">3 temas iniciais</span>
                      </div>
                      <div className="filters" aria-label="Filtrar temas">
                        {["Todos", "Front-end", "Back-end", "Banco de dados"].map((value) => (
                          <button
                            key={value}
                            aria-pressed={category === value}
                            className={category === value ? "selected" : ""}
                            onClick={() => setCategory(value)}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                      <div className="topic-list">
                        {topics
                          .filter((item) => category === "Todos" || item.category === category)
                          .map((item) => {
                            const summary = data?.summaries.find(
                              (summary) => summary.topic_id === item.id,
                            );
                            return (
                              <button
                                key={item.id}
                                className="topic-card"
                                disabled={!data || busy}
                                onClick={() => choose(item)}
                              >
                                <span className={`topic-symbol ${item.color}`}>{item.symbol}</span>
                                <span className="topic-details">
                                  <span className="topic-category">{item.category}</span>
                                  <strong>{item.title}</strong>
                                  <span className="topic-description">{item.description}</span>
                                  <span className="topic-meta">
                                    <Clock3 size={13} />{" "}
                                    {item.lessons.reduce(
                                      (total, lesson) => total + lesson.minutes,
                                      0,
                                    )}{" "}
                                    min de conteúdo <span>·</span>{" "}
                                    {summary
                                      ? `${summary.completed}/${item.lessons.length} etapas concluídas`
                                      : "3 etapas para explorar"}
                                  </span>
                                </span>
                                <ArrowRight className="topic-arrow" size={20} />
                              </button>
                            );
                          })}
                      </div>
                    </section>
                    <aside className="how-card">
                      <span className="quiet-badge">
                        <Sparkles size={13} /> APRENDER COM DIREÇÃO
                      </span>
                      <h2>
                        Um caminho que
                        <br />
                        começa em você.
                      </h2>
                      <ol>
                        <li>
                          <span>01</span>
                          <div>
                            <strong>Defina seu objetivo</strong>
                            <p>Uma prova, um projeto ou aquela dúvida que não sai da cabeça.</p>
                          </div>
                        </li>
                        <li>
                          <span>02</span>
                          <div>
                            <strong>Explore o que já sabe</strong>
                            <p>Dez questões abertas para registrar seu raciocínio.</p>
                          </div>
                        </li>
                        <li>
                          <span>03</span>
                          <div>
                            <strong>Aprenda e experimente</strong>
                            <p>Alterne entre explicações guiadas e uma trilha de prática.</p>
                          </div>
                        </li>
                      </ol>
                      <div className="how-footer">
                        <Lightbulb size={18} />
                        <p>Não saber ainda também é um ponto de partida.</p>
                      </div>
                    </aside>
                  </div>
                  {topic && (
                    <section className="resume-card">
                      <span className="stat-icon green">
                        <NotebookPen size={22} />
                      </span>
                      <div>
                        <span className="eyebrow">CONTINUE DE ONDE PAROU</span>
                        <h3>{topic.title}</h3>
                        <p>{session?.goal}</p>
                      </div>
                      <button className="button secondary" onClick={() => navigate("learn")}>
                        Retomar estudo <ArrowRight size={17} />
                      </button>
                    </section>
                  )}
                </>
              )}
              {screen !== "home" && !topic && (
                <section className="empty-state">
                  <Compass size={42} />
                  <h1>Todo caminho tem um começo.</h1>
                  <p>
                    Escolha um tema e conte o que você quer aprender. Seu diagnóstico e sua trilha
                    vão aparecer aqui.
                  </p>
                  <button
                    className="button primary"
                    disabled={!data}
                    onClick={() => navigate("home")}
                  >
                    Explorar temas <ArrowRight size={18} />
                  </button>
                </section>
              )}
              {screen === "diagnostic" && topic && session && (
                <>
                  <button className="text-button" onClick={() => navigate("home")}>
                    <ArrowLeft size={16} /> Voltar para visão geral
                  </button>
                  <div className="page-heading">
                    <div>
                      <div className="eyebrow">SEU PONTO DE PARTIDA</div>
                      <h1>O que você já sabe?</h1>
                      <p>
                        {topic.title} · {session.goal}
                      </p>
                    </div>
                    <span className="quiet-badge">{answered} de 10 salvas</span>
                  </div>
                  <div className="diagnostic-layout">
                    <section className="question-card">
                      <div className="question-top">
                        <span className="eyebrow">
                          QUESTÃO {String(question + 1).padStart(2, "0")} / 10
                        </span>
                        <span className={`difficulty difficulty-${Math.floor(question / 4)}`}>
                          {question < 4
                            ? "Fundamentos"
                            : question < 8
                              ? "Aplicação"
                              : "Aprofundamento"}
                        </span>
                      </div>
                      <div className="progress-track">
                        <span style={{ width: `${answered * 10}%` }} />
                      </div>
                      <h2>{topic.questions[question]}</h2>
                      <p className="question-help">
                        Explique com suas palavras. Se ainda não souber, conte o que você entende ou
                        onde ficou a dúvida.
                      </p>
                      <label htmlFor="answer">Seu raciocínio</label>
                      <textarea
                        id="answer"
                        value={
                          currentDrafts[String(question)] ?? session.answers[String(question)] ?? ""
                        }
                        onChange={(event) =>
                          setDrafts((previous) => ({
                            ...previous,
                            [topic.id]: { ...previous[topic.id], [question]: event.target.value },
                          }))
                        }
                        maxLength={4000}
                        rows={8}
                        placeholder="Você pode escrever uma explicação, um exemplo ou um trecho de código…"
                        disabled={busy}
                      />
                      <div className="field-meta">
                        <span>
                          {
                            (
                              currentDrafts[String(question)] ??
                              session.answers[String(question)] ??
                              ""
                            ).length
                          }{" "}
                          / 4000 caracteres
                        </span>
                        <span>
                          {dirtyAnswer
                            ? "Há alterações não salvas"
                            : "Respostas salvas no seu espaço"}
                        </span>
                      </div>
                      <div className="question-actions">
                        <button
                          className="button secondary"
                          disabled={question === 0 || busy}
                          onClick={() => setQuestion(question - 1)}
                        >
                          <ArrowLeft size={16} /> Anterior
                        </button>
                        <button
                          className="button primary"
                          disabled={
                            busy ||
                            !(
                              currentDrafts[String(question)] ??
                              session.answers[String(question)] ??
                              ""
                            ).trim()
                          }
                          onClick={saveAnswer}
                        >
                          {busy ? <LoaderCircle size={17} className="spin" /> : <Save size={17} />}{" "}
                          {question < 9 ? "Salvar e continuar" : "Salvar resposta"}
                        </button>
                      </div>
                    </section>
                    <aside className="diagnostic-aside">
                      <h3>Seu mapa de questões</h3>
                      <div className="question-map">
                        {topic.questions.map((_, index) => (
                          <button
                            key={index}
                            aria-label={`Questão ${index + 1}${session.answers[String(index)] ? ", respondida" : ""}`}
                            aria-current={question === index ? "step" : undefined}
                            className={`${question === index ? "current" : ""} ${session.answers[String(index)] ? "answered" : ""}`}
                            onClick={() => setQuestion(index)}
                          >
                            {session.answers[String(index)] ? <Check size={16} /> : index + 1}
                          </button>
                        ))}
                      </div>
                      <div className="info-note">
                        <Lightbulb size={20} />
                        <p>
                          As questões têm dificuldades diferentes. O objetivo é entender seu
                          raciocínio, não acertar tudo.
                        </p>
                      </div>
                      <div className="evaluation-note">
                        <strong>
                          {session.submitted_at ? "Aguardando avaliação" : "Sobre a avaliação"}
                        </strong>
                        <p>
                          A IA ainda não está conectada nesta versão. Suas respostas serão
                          guardadas; as notas de 0 a 10 e a recomendação personalizada virão com a
                          integração.
                        </p>
                      </div>
                      <button
                        className="button primary full"
                        disabled={busy || answered < 10 || dirtyAnswer || !!session.submitted_at}
                        onClick={() => act({ kind: "submit", topicId: topic.id })}
                      >
                        {session.submitted_at ? <CheckCircle2 size={17} /> : <Check size={17} />}{" "}
                        {session.submitted_at ? "Diagnóstico registrado" : "Concluir diagnóstico"}
                      </button>
                      <button className="text-button full" onClick={() => navigate("learn")}>
                        Já quero começar a estudar <ArrowRight size={15} />
                      </button>
                    </aside>
                  </div>
                </>
              )}
              {screen === "learn" && topic && session && lesson && (
                <>
                  <div className="page-heading">
                    <div>
                      <div className="eyebrow">UM CONCEITO DE CADA VEZ</div>
                      <h1>
                        {view === "teacher"
                          ? "Vamos entender juntos."
                          : "Seu caminho de aprendizado."}
                      </h1>
                      <p>
                        {topic.title} · {session.goal}
                      </p>
                    </div>
                    <span className="quiet-badge">Conteúdo guiado</span>
                  </div>
                  <div className="study-switch" aria-label="Modo de aprendizado">
                    <button
                      aria-pressed={view === "teacher"}
                      onClick={() => setView("teacher")}
                      className={view === "teacher" ? "selected" : ""}
                    >
                      <MessageCircle size={17} /> Professor virtual
                    </button>
                    <button
                      aria-pressed={view === "trail"}
                      onClick={() => setView("trail")}
                      className={view === "trail" ? "selected" : ""}
                    >
                      <Route size={17} /> Minha trilha
                    </button>
                  </div>
                  {view === "trail" ? (
                    <section className="trail-panel">
                      <div className="section-heading">
                        <div>
                          <h2>Uma base para ir além</h2>
                          <p>
                            Esta trilha inicial é fixa. A personalização virá depois da avaliação
                            por IA.
                          </p>
                        </div>
                        <span className="quiet-badge">
                          {completed}/{topic.lessons.length} concluídas
                        </span>
                      </div>
                      {topic.lessons.map((item, index) => (
                        <div className="trail-step" key={item.id}>
                          <span
                            className={`step-number ${session.completed_lessons.includes(item.id) ? "done" : ""}`}
                          >
                            {session.completed_lessons.includes(item.id) ? (
                              <Check size={21} />
                            ) : (
                              `0${index + 1}`
                            )}
                          </span>
                          <div>
                            <span className="eyebrow">
                              ETAPA {index + 1} · {item.minutes} MIN
                            </span>
                            <h3>{item.title}</h3>
                            <p>{item.explanation.split(". ")[0]}.</p>
                          </div>
                          <button
                            className="button secondary"
                            onClick={() => {
                              setLessonIndex(index);
                              setTeacherTab("explanation");
                              setView("teacher");
                            }}
                          >
                            {session.completed_lessons.includes(item.id) ? "Revisar" : "Explorar"}
                            <ArrowRight size={16} />
                          </button>
                        </div>
                      ))}
                    </section>
                  ) : (
                    <div className="study-layout">
                      <aside className="lesson-nav">
                        <span className="eyebrow">SUA TRILHA</span>
                        {topic.lessons.map((item, index) => (
                          <button
                            key={item.id}
                            className={lessonIndex === index ? "selected" : ""}
                            onClick={() => {
                              if (dirtyNote) {
                                setError("Salve sua anotação antes de mudar de etapa.");
                                return;
                              }
                              setLessonIndex(index);
                              setTeacherTab("explanation");
                            }}
                          >
                            {session.completed_lessons.includes(item.id) ? (
                              <CheckCircle2 size={17} />
                            ) : (
                              <Circle size={17} />
                            )}
                            <span>
                              {item.title}
                              <small>{item.minutes} min de estudo</small>
                            </span>
                          </button>
                        ))}
                        <div className="info-note">
                          <BookOpen size={19} />
                          <p>
                            Por enquanto, as explicações são conteúdo preparado. A conversa livre
                            com IA será conectada em uma próxima etapa.
                          </p>
                        </div>
                      </aside>
                      <section className="teacher-panel">
                        <div className="teacher-header">
                          <span className="teacher-avatar">
                            <GraduationCap size={23} />
                          </span>
                          <div>
                            <strong>Professor EducaJá</strong>
                            <span>Explicação, analogia e prática</span>
                          </div>
                          <span className="quiet-badge">Modo guiado</span>
                        </div>
                        <div className="teacher-body">
                          <span className="eyebrow">ETAPA {lessonIndex + 1}</span>
                          <h2>{lesson.title}</h2>
                          <div className="teacher-tabs">
                            <button
                              className={teacherTab === "explanation" ? "selected" : ""}
                              onClick={() => setTeacherTab("explanation")}
                            >
                              <BookOpen size={15} /> Explicação
                            </button>
                            <button
                              className={teacherTab === "analogy" ? "selected" : ""}
                              onClick={() => setTeacherTab("analogy")}
                            >
                              <Lightbulb size={15} /> Uma analogia
                            </button>
                            <button
                              className={teacherTab === "exercise" ? "selected" : ""}
                              onClick={() => setTeacherTab("exercise")}
                            >
                              <Code2 size={15} /> Quero praticar
                            </button>
                          </div>
                          <div className="lesson-content" aria-live="polite">
                            <p>
                              {teacherTab === "explanation"
                                ? lesson.explanation
                                : teacherTab === "analogy"
                                  ? lesson.analogy
                                  : lesson.exercise}
                            </p>
                            {teacherTab === "explanation" && (
                              <pre>
                                <code>{lesson.code}</code>
                              </pre>
                            )}
                            {teacherTab === "exercise" && (
                              <details>
                                <summary>
                                  Preciso de uma dica <ArrowDown size={14} />
                                </summary>
                                <p>{lesson.hint}</p>
                              </details>
                            )}
                          </div>
                          <div className="notes-area">
                            <label htmlFor="study-note">
                              <NotebookPen size={16} /> Seu caderno de raciocínio
                            </label>
                            <p>
                              Escreva sua solução ou o que você entendeu. Suas anotações não recebem
                              correção automática nesta versão.
                            </p>
                            <textarea
                              id="study-note"
                              rows={4}
                              maxLength={4000}
                              value={noteText}
                              disabled={busy}
                              onChange={(event) =>
                                setNoteDrafts((previous) => ({
                                  ...previous,
                                  [noteKey]: event.target.value,
                                }))
                              }
                              placeholder="Uma ideia, uma tentativa, uma nova pergunta…"
                            />
                            <div className="notes-actions">
                              <span>{noteText.length}/4000</span>
                              <button
                                className="button secondary"
                                disabled={busy || !dirtyNote}
                                onClick={() =>
                                  act({
                                    kind: "note",
                                    topicId: topic.id,
                                    lessonId: lesson.id,
                                    text: noteText,
                                  })
                                }
                              >
                                <Save size={16} /> Salvar anotação
                              </button>
                            </div>
                          </div>
                          <div className="lesson-footer">
                            <span>
                              {session.completed_lessons.includes(lesson.id)
                                ? "Você concluiu esta etapa. Pode revisitar quando quiser."
                                : "Siga no seu ritmo. Você decide quando avançar."}
                            </span>
                            <button
                              className="button primary"
                              disabled={busy || dirtyNote}
                              onClick={() =>
                                act({
                                  kind: "lesson",
                                  topicId: topic.id,
                                  lessonId: lesson.id,
                                  done: !session.completed_lessons.includes(lesson.id),
                                })
                              }
                            >
                              <Check size={17} />
                              {session.completed_lessons.includes(lesson.id)
                                ? "Marcar para revisar"
                                : "Concluir etapa"}
                            </button>
                          </div>
                        </div>
                      </section>
                    </div>
                  )}
                </>
              )}
              <footer className="page-footer">
                <span>EducaJá · Aprender para ir além.</span>
                <span>
                  Seu progresso é associado a este navegador por 30 dias. Contas e sincronização
                  entre dispositivos virão depois.
                </span>
              </footer>
            </>
          )}
        </main>
      </div>
      {selected && (
        <div className="modal-backdrop">
          <section
            ref={modalRef}
            className="goal-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="goal-title"
            onKeyDown={(event) => {
              if (event.key === "Escape" && !busy) setSelected(null);
            }}
          >
            <button
              className="close-button"
              aria-label="Fechar"
              onClick={() => setSelected(null)}
              disabled={busy}
            >
              <X size={20} />
            </button>
            <span className={`topic-symbol ${selected.color}`}>{selected.symbol}</span>
            <span className="eyebrow">VAMOS DAR UM PRIMEIRO PASSO</span>
            <h2 id="goal-title">O que trouxe você até aqui?</h2>
            <p>
              Seu tema: <strong>{selected.title}</strong>. Conte uma necessidade real para dar
              sentido ao seu estudo.
            </p>
            <label htmlFor="goal">O que você quer aprender ou resolver?</label>
            <textarea
              id="goal"
              maxLength={600}
              rows={4}
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
              placeholder="Ex.: tenho uma prova de orientação a objetos e quero entender polimorfismo."
              disabled={busy}
            />
            <div className="field-meta">
              <span>Você pode mudar esse objetivo depois.</span>
              <span>{goal.length}/600</span>
            </div>
            <button className="button primary full" disabled={!goal.trim() || busy} onClick={start}>
              {busy ? <LoaderCircle className="spin" size={17} /> : <Compass size={17} />}Começar
              meu diagnóstico <ArrowRight size={17} />
            </button>
            <small>Seu progresso anterior neste tema será preservado.</small>
          </section>
        </div>
      )}
    </div>
  );
}
