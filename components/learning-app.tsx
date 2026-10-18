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
  Code2,
  Compass,
  GraduationCap,
  LayoutDashboard,
  Lightbulb,
  LoaderCircle,
  NotebookPen,
  Route,
  Save,
  PanelLeftClose,
  PanelLeftOpen,
  HelpCircle,
  UserRound,
  X,
} from "lucide-react";
import { getTopic, orderedTopicLessons, type Topic } from "@/lib/catalog";
import { answerCount, type Action, type Workspace } from "@/lib/learning";

import CourseHome from "./course-home";
import StudyAreas, { StudyAreaEntry } from "./study-areas";
import AccountPanel from "./account-panel";
import TeacherChat from "./teacher-chat";
import EvaluationSummary from "./evaluation-summary";
import LessonDemo from "./lesson-demo";
import GitTerminal from "./git-terminal";
import { saepPractice } from "@/lib/saep-preparation";
import SecondaryExams from "./secondary-exams";
import LawArea from "./law-area";

type Screen = "areas" | "secondary" | "home" | "diagnostic" | "learn" | "exams" | "law";
type StudyArea = "programming" | "secondary" | "law";
const areaHome = (area: StudyArea): Screen =>
  area === "secondary" ? "secondary" : area === "law" ? "law" : "home";
type View = "teacher" | "trail";
type Drafts = Record<string, Record<string, string>>;

export default function LearningApp() {
  const [data, setData] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [screen, setScreen] = useState<Screen>("areas");
  const [studyArea, setStudyArea] = useState<StudyArea>("programming");
  const [view, setView] = useState<View>("teacher");
  const [category, setCategory] = useState("Todos");
  const [selectedLessonId, setSelectedLessonId] = useState<string | undefined>();
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
  const previousScreen = useRef(screen);
  const session = data?.session;
  const activeTopic = session ? getTopic(session.topic_id) : undefined;
  const topic =
    studyArea !== "law" && (activeTopic?.area === "secondary") === (studyArea === "secondary")
      ? activeTopic
      : undefined;
  const answered = session ? answerCount(session.answers) : 0;
  const completed = session?.completed_lessons.length ?? 0;
  const orderedLessons = topic ? orderedTopicLessons(topic, session?.evaluation?.lessonOrder) : [];
  const lesson = orderedLessons[lessonIndex] ?? orderedLessons[0];
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

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem("educaja.sidebar.collapsed") === "true");
    } catch {
      /* Storage can be unavailable in private browsers. */
    }
  }, []);
  function toggleSidebar() {
    setCollapsed((previous) => {
      const next = !previous;
      try {
        localStorage.setItem("educaja.sidebar.collapsed", String(next));
      } catch {
        /* Keep the choice for this visit. */
      }
      return next;
    });
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
    if (previousScreen.current !== screen) {
      document.getElementById("main-content")?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "instant" });
      previousScreen.current = screen;
    }
  }, [screen]);
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
          ? result.aiReady
            ? "Teste registrado. Você já pode pedir sua avaliação."
            : "Teste registrado. A avaliação ficará disponível quando a IA for conectada."
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

  function openAccount() {
    if (unsaved) {
      setError("Salve sua resposta ou anotação antes de acessar a conta.");
      return;
    }
    setAccountOpen(true);
  }
  async function accountChanged() {
    setData(null);
    setDrafts({});
    setSavedAnswers({});
    setSavedNotes({});
    setNoteDrafts({});
    setNotice("");
    setError("");
    setScreen((current) =>
      current === "areas" || current === "secondary" || current === "law"
        ? current
        : areaHome(studyArea),
    );
    await load();
  }
  function navigate(next: Screen) {
    if (busy) return;
    if (
      (next === "areas" || next === "secondary" || next === "law" || next === "exams") &&
      unsaved
    ) {
      setError("Salve sua resposta ou anotação antes de trocar de área.");
      return;
    }
    setError("");
    setNotice("");
    setScreen(next === "home" ? areaHome(studyArea) : next);
  }
  function goBack() {
    if (busy) return;
    if (unsaved) {
      setError("Salve sua resposta ou anotação antes de voltar.");
      return;
    }
    navigate(screen === "home" || screen === "secondary" || screen === "law" ? "areas" : "home");
  }
  function switchArea(area: StudyArea) {
    if (busy) return;
    if (unsaved) {
      setError("Salve sua resposta ou anotação antes de trocar de área.");
      return;
    }
    setError("");
    setNotice("");
    setStudyArea(area);
    setScreen(areaHome(area));
  }
  function choose(candidate: Topic, lessonId?: string) {
    if (topic && topic.id !== candidate.id && unsaved) {
      setError("Salve sua resposta ou anotação antes de mudar de tema.");
      return;
    }
    setSelectedLessonId(lessonId);
    setSelected(candidate);
    setGoal(candidate.id === topic?.id ? (session?.goal ?? "") : "");
  }
  async function start(destination: Screen) {
    if (!selected) return;
    if (
      await act({
        kind: "start",
        topicId: selected.id,
        goal: goal.trim() || selected.goalExamples[0],
      })
    ) {
      setSelected(null);
      setQuestion(0);
      setLessonIndex(
        selectedLessonId
          ? Math.max(
              0,
              selected.lessons.findIndex((item) => item.id === selectedLessonId),
            )
          : 0,
      );
      setTeacherTab("explanation");
      setView("teacher");
      setScreen(destination);
    }
  }
  async function requestEvaluation() {
    if (busy || !topic) return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch("/api/teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "grade", topicId: topic.id }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setData(result);
      rememberSaved(result);
      setLessonIndex(0);
      setNotice("Avaliação salva. Veja as justificativas e a ordem sugerida das aulas.");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Não foi possível avaliar agora.");
      try {
        const response = await fetch("/api/workspace", { cache: "no-store" });
        if (response.ok) {
          const current: Workspace = await response.json();
          setData((previous) =>
            previous ? { ...previous, teacherUsage: current.teacherUsage } : previous,
          );
        }
      } catch {}
    } finally {
      setBusy(false);
    }
  }
  async function saveAnswer(value?: string) {
    if (!topic) return;
    const text =
      value ?? currentDrafts[String(question)] ?? session?.answers[String(question)] ?? "";
    if (await act({ kind: "answer", topicId: topic.id, index: question, text })) {
      if (question < 9) setQuestion(question + 1);
    }
  }

  return (
    <div
      className={`app-shell ${collapsed ? "sidebar-collapsed" : ""} ${studyArea === "secondary" && screen !== "areas" ? "secondary-workspace" : ""} ${studyArea === "law" && screen !== "areas" ? "law-workspace" : ""}`}
    >
      <a className="skip-link" href="#main-content">
        Ir para o conteúdo
      </a>
      <aside className="sidebar" id="learning-sidebar" inert={!!selected || accountOpen}>
        <button
          className="brand"
          onClick={() => navigate("areas")}
          aria-label="EducaJá, início"
          title="EducaJá"
        >
          <span className="brand-mark">
            <BookOpen size={22} />
          </span>
          <span className="brand-name">EducaJá</span>
        </button>
        <button
          className="sidebar-help"
          aria-label="Trocar de área"
          title="Trocar de área"
          onClick={() => navigate("areas")}
          disabled={busy}
        >
          <GraduationCap size={19} />
          <span className="nav-label">Trocar de área</span>
        </button>
        {screen !== "areas" && (
          <>
            <div className="sidebar-label">
              {studyArea === "secondary"
                ? "ENSINO MÉDIO · 3ª SÉRIE"
                : studyArea === "law"
                  ? "DIREITO · BIBLIOTECA DE ESTUDO"
                  : "PROGRAMAÇÃO"}
            </div>
            <nav aria-label="Principal" className="main-nav">
              <button
                aria-label="Assuntos"
                title="Assuntos"
                aria-current={
                  screen === "home" || screen === "secondary" || screen === "law"
                    ? "page"
                    : undefined
                }
                className={
                  screen === "home" || screen === "secondary" || screen === "law" ? "active" : ""
                }
                onClick={() => navigate("home")}
              >
                <LayoutDashboard size={19} />
                <span className="nav-label">Assuntos</span>
              </button>
              {studyArea === "programming" && (
                <button
                  aria-label="Teste inicial"
                  title="Teste inicial — descubra o que já sabe"
                  aria-current={screen === "diagnostic" ? "page" : undefined}
                  className={screen === "diagnostic" ? "active" : ""}
                  onClick={() => navigate("diagnostic")}
                >
                  <Compass size={19} />
                  <span className="nav-label">Teste inicial</span>
                  {topic && <span className="nav-count">{answered}/10</span>}
                </button>
              )}
              {studyArea === "secondary" && (
                <button
                  aria-label="Simulados"
                  title="Simulados — pratique os assuntos das aulas"
                  aria-current={screen === "exams" ? "page" : undefined}
                  className={screen === "exams" ? "active" : ""}
                  onClick={() => navigate("exams")}
                >
                  <Compass size={19} />
                  <span className="nav-label">Simulados</span>
                </button>
              )}
              {studyArea !== "law" && (
                <>
                  <button
                    aria-label="Plano de estudo"
                    title="Plano de estudo — suas aulas e seu progresso"
                    aria-current={screen === "learn" && view === "trail" ? "page" : undefined}
                    className={screen === "learn" && view === "trail" ? "active" : ""}
                    onClick={() => {
                      navigate("learn");
                      setView("trail");
                    }}
                  >
                    <Route size={19} />
                    <span className="nav-label">Plano de estudo</span>
                  </button>
                  <button
                    aria-label="Aulas"
                    title="Aulas — explicações e exercícios"
                    aria-current={screen === "learn" && view === "teacher" ? "page" : undefined}
                    className={screen === "learn" && view === "teacher" ? "active" : ""}
                    onClick={() => {
                      navigate("learn");
                      setView("teacher");
                    }}
                  >
                    <BookOpen size={19} />
                    <span className="nav-label">Aulas</span>
                  </button>
                </>
              )}
            </nav>
          </>
        )}
        <div className="sidebar-bottom">
          <div className="sidebar-note">
            <GraduationCap size={20} />
            <div>
              <strong>Seu aprendizado</strong>
              <p>Escolha seu espaço de estudo.</p>
            </div>
          </div>
          <button
            className="sidebar-help"
            aria-label="Como usar o EducaJá"
            title="Como usar o EducaJá"
            onClick={() => setHelpOpen((value) => !value)}
          >
            <HelpCircle size={18} />
            <span className="nav-label">Como usar</span>
          </button>
        </div>
      </aside>
      <div className="workspace" inert={!!selected || accountOpen}>
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="sidebar-toggle"
              aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
              title={collapsed ? "Expandir menu" : "Recolher menu"}
              aria-expanded={!collapsed}
              aria-controls="learning-sidebar"
              onClick={toggleSidebar}
            >
              {collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
            </button>
            <div className="breadcrumb">
              EducaJá <ChevronRight size={14} />
              <strong>
                {screen === "areas"
                  ? "Áreas de estudo"
                  : screen === "secondary"
                    ? "Ensino Médio"
                    : screen === "law"
                      ? "Direito · Assuntos"
                      : screen === "exams"
                        ? "Ensino Médio · Simulados"
                        : screen === "home"
                          ? "Programação · Assuntos"
                          : screen === "diagnostic"
                            ? "Teste inicial"
                            : view === "teacher"
                              ? "Aulas"
                              : "Plano de estudo"}
              </strong>
            </div>
          </div>
          <button className="account-button" onClick={openAccount} disabled={loading || busy}>
            <UserRound size={17} />
            {data?.user ? "Sua conta" : "Entrar ou criar conta"}
          </button>
          <button
            className="help-button"
            aria-expanded={helpOpen}
            aria-controls="usage-help"
            onClick={() => setHelpOpen((value) => !value)}
          >
            <HelpCircle size={17} /> Como usar
          </button>
        </header>
        <main id="main-content" tabIndex={-1}>
          {screen !== "areas" && (
            <button className="back-navigation" onClick={goBack} disabled={busy}>
              <ArrowLeft size={17} aria-hidden="true" />
              {screen === "home" || screen === "secondary" || screen === "law"
                ? "Voltar às áreas"
                : "Voltar aos assuntos"}
            </button>
          )}
          {helpOpen && (
            <section className="usage-help" id="usage-help" aria-labelledby="help-title">
              <div>
                <h2 id="help-title">Como usar o EducaJá</h2>
                <button
                  className="close-button"
                  aria-label="Fechar ajuda"
                  onClick={() => setHelpOpen(false)}
                >
                  <X size={18} />
                </button>
              </div>
              <ol>
                <li>
                  <strong>Escolha uma área.</strong> Acesse Programação para estudar os assuntos
                  disponíveis. Ensino Médio já tem primeiras unidades da 3ª série. Depois, escolha
                  um assunto. Leia as descrições e clique no que quer aprender.
                </li>
                <li>
                  <strong>Comece a estudar.</strong> A primeira aula explica o básico. Veja o
                  exemplo do dia a dia e tente o exercício.
                </li>
                <li>
                  <strong>Anote e salve.</strong> Escreva suas dúvidas e marque a aula como
                  concluída quando estiver pronto.
                </li>
              </ol>
              <p>
                O teste inicial é opcional. Se não souber uma resposta, use “Ainda não sei”. Em
                “Plano de estudo”, você vê todas as aulas do assunto.
              </p>
            </section>
          )}
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
              {screen === "areas" && (
                <StudyAreaEntry
                  onProgramming={() => switchArea("programming")}
                  onSecondary={() => switchArea("secondary")}
                  onLaw={() => switchArea("law")}
                />
              )}
              {screen === "law" && <LawArea />}
              <div hidden={screen !== "exams"}>
                <SecondaryExams active={screen === "exams"} />
              </div>
              {screen === "secondary" && (
                <StudyAreas
                  secondary
                  choose={choose}
                  summaries={data?.summaries ?? []}
                  busy={busy || !data}
                  onProgramming={() => switchArea("programming")}
                />
              )}
              {screen === "home" && (
                <CourseHome
                  data={data}
                  topic={topic}
                  category={category}
                  setCategory={setCategory}
                  choose={choose}
                  busy={busy}
                  resume={() => {
                    navigate("learn");
                    setView("teacher");
                  }}
                />
              )}
              {(screen === "diagnostic" || screen === "learn") && !topic && (
                <section className="empty-state">
                  <Compass size={42} />
                  <h1>Primeiro, escolha um assunto.</h1>
                  <p>
                    Volte para Assuntos e escolha o que quer aprender. Depois, você pode estudar ou
                    fazer o teste inicial.
                  </p>
                  <button
                    className="button primary"
                    disabled={!data}
                    onClick={() => navigate("home")}
                  >
                    Escolher um assunto <ArrowRight size={18} />
                  </button>
                </section>
              )}
              {screen === "diagnostic" && topic && session && (
                <>
                  <button className="text-button" onClick={() => navigate("home")}>
                    <ArrowLeft size={16} /> Voltar para os assuntos
                  </button>
                  <div className="page-heading">
                    <div>
                      <div className="eyebrow">TESTE INICIAL · OPCIONAL</div>
                      <h1>Vamos ver o que você já sabe</h1>
                      <p>
                        {topic.title} · {session.goal}
                      </p>
                    </div>
                    <span className="quiet-badge">{answered} de 10 salvas</span>
                  </div>
                  {session.evaluation && <EvaluationSummary evaluation={session.evaluation} />}
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
                      <label htmlFor="answer">Sua resposta</label>
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
                      <p className="beginner-note">
                        Não é uma prova e você não precisa acertar. Se nunca viu esse assunto, pode
                        responder “Ainda não sei” e continuar.
                      </p>
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
                          onClick={() => saveAnswer()}
                        >
                          {busy ? <LoaderCircle size={17} className="spin" /> : <Save size={17} />}{" "}
                          {question < 9 ? "Salvar e continuar" : "Salvar resposta"}
                        </button>
                      </div>
                      <button
                        className="text-button skip-answer"
                        disabled={busy}
                        onClick={() => saveAnswer("Ainda não sei.")}
                      >
                        Ainda não sei — salvar e continuar <ArrowRight size={15} />
                      </button>
                    </section>
                    <aside className="diagnostic-aside">
                      <h3>Perguntas do teste</h3>
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
                          {session.evaluation
                            ? "Avaliação disponível acima"
                            : session.submitted_at
                              ? "Aguardando avaliação"
                              : "Sobre a avaliação"}
                        </strong>
                        <p>
                          {data?.aiReady
                            ? "Finalize o teste e peça sua avaliação. O professor usará suas respostas para explicar cada nota e sugerir uma ordem de estudo. As respostas serão enviadas ao Google Gemini."
                            : "A avaliação automática ainda não foi ativada neste EducaJá. Suas respostas ficam salvas, e você pode continuar estudando."}
                        </p>
                      </div>
                      <button
                        className="button primary full"
                        disabled={busy || answered < 10 || dirtyAnswer || !!session.submitted_at}
                        onClick={() => act({ kind: "submit", topicId: topic.id })}
                      >
                        {session.submitted_at ? <CheckCircle2 size={17} /> : <Check size={17} />}{" "}
                        {session.submitted_at ? "Teste registrado" : "Finalizar teste"}
                      </button>
                      {session.submitted_at && !session.evaluation && (
                        <button
                          className="button secondary full evaluate-button"
                          disabled={busy || dirtyAnswer || !data?.aiReady}
                          onClick={() => (data?.user ? requestEvaluation() : openAccount())}
                        >
                          {busy ? (
                            <LoaderCircle size={16} className="spin" />
                          ) : (
                            <CheckCircle2 size={16} />
                          )}{" "}
                          {data?.user
                            ? "Pedir avaliação ao professor"
                            : "Entrar para avaliar respostas"}
                        </button>
                      )}
                      <button className="text-button full" onClick={() => navigate("learn")}>
                        Ir para as aulas <ArrowRight size={15} />
                      </button>
                    </aside>
                  </div>
                </>
              )}
              {screen === "learn" && topic && session && lesson && (
                <>
                  <div className="page-heading">
                    <div>
                      <div className="eyebrow">AULAS</div>
                      <h1>{view === "teacher" ? topic.shortTitle : "Seu plano de estudo"}</h1>
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
                      <BookOpen size={17} /> Aula e exercícios
                    </button>
                    <button
                      aria-pressed={view === "trail"}
                      onClick={() => setView("trail")}
                      className={view === "trail" ? "selected" : ""}
                    >
                      <Route size={17} /> Todas as aulas
                    </button>
                  </div>
                  {view === "trail" ? (
                    <section className="trail-panel">
                      <div className="section-heading">
                        <div>
                          <h2>Aulas deste assunto</h2>
                          <p>
                            {session.evaluation
                              ? "A avaliação sugeriu esta ordem para suas aulas. Você pode revisar qualquer conteúdo ou escolher outra aula."
                              : "Comece pela aula 1 e avance na ordem. Você também pode voltar para revisar qualquer aula."}
                          </p>
                        </div>
                        <span className="quiet-badge">
                          {completed}/{topic.lessons.length} concluídas
                        </span>
                      </div>
                      {orderedLessons.map((item, index) => (
                        <div className="trail-step" key={item.id}>
                          <span
                            className={`step-number ${session.completed_lessons.includes(item.id) ? "done" : ""}`}
                          >
                            {session.completed_lessons.includes(item.id) ? (
                              <Check size={21} />
                            ) : (
                              String(index + 1).padStart(2, "0")
                            )}
                          </span>
                          <div>
                            <span className="eyebrow">
                              AULA {index + 1} · {item.level} · {item.minutes} MIN
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
                            {session.completed_lessons.includes(item.id)
                              ? "Revisar aula"
                              : "Abrir aula"}
                            <ArrowRight size={16} />
                          </button>
                        </div>
                      ))}
                    </section>
                  ) : (
                    <div className="study-layout">
                      <aside className="lesson-nav">
                        <span className="eyebrow">AULAS DO ASSUNTO</span>
                        {orderedLessons.map((item, index) => (
                          <button
                            key={item.id}
                            className={lessonIndex === index ? "selected" : ""}
                            onClick={() => {
                              if (dirtyNote) {
                                setError("Salve sua anotação antes de mudar de aula.");
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
                            Leia a explicação, veja um exemplo do dia a dia e tente o exercício. Use
                            suas anotações para registrar dúvidas.
                          </p>
                        </div>
                      </aside>
                      <section className="teacher-panel">
                        <div className="teacher-header">
                          <span className="teacher-avatar">
                            <GraduationCap size={23} />
                          </span>
                          <div>
                            <strong>Material de estudo</strong>
                            <span>Explicação, exemplos e exercício</span>
                          </div>
                          <span className="quiet-badge">Aula guiada</span>
                        </div>
                        <div className="teacher-body">
                          <span className="eyebrow">
                            AULA {lessonIndex + 1} DE {topic.lessons.length}
                          </span>
                          <h2>{lesson.title}</h2>
                          <p className="lesson-meta">
                            {lesson.level} · {lesson.minutes} minutos estimados, incluindo a prática
                          </p>
                          {lesson.objectives && (
                            <div className="lesson-objectives">
                              <h3>O que você vai aprender</h3>
                              <ul>
                                {lesson.objectives.map((objective) => (
                                  <li key={objective}>{objective}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {lessonIndex === 0 && (
                            <p className="lesson-orientation">{topic.introduction}</p>
                          )}
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
                              <Lightbulb size={15} /> Exemplo do dia a dia
                            </button>
                            <button
                              className={teacherTab === "exercise" ? "selected" : ""}
                              onClick={() => setTeacherTab("exercise")}
                            >
                              <Code2 size={15} /> Exercício
                            </button>
                          </div>
                          <div className="lesson-content">
                            <p>
                              {teacherTab === "explanation"
                                ? lesson.explanation
                                : teacherTab === "analogy"
                                  ? lesson.analogy
                                  : lesson.exercise}
                            </p>
                            {teacherTab === "explanation" && (
                              <>
                                {lesson.sections?.map((section) => (
                                  <section className="lesson-section" key={section.title}>
                                    <h3>{section.title}</h3>
                                    <p>{section.body}</p>
                                  </section>
                                ))}
                                {lesson.terminal && (
                                  <GitTerminal key={lesson.id} steps={lesson.terminal} />
                                )}
                                {lesson.images?.map((image) => (
                                  <figure className="lesson-screenshot" key={image.src}>
                                    {/* Local educational screenshots retain their source attribution. */}
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <a
                                      href={image.src}
                                      target="_blank"
                                      rel="noreferrer"
                                      aria-label={`Ampliar: ${image.alt}`}
                                    >
                                      <img src={image.src} alt={image.alt} loading="lazy" />
                                    </a>
                                    <figcaption>
                                      {image.caption}{" "}
                                      <a href={image.source} target="_blank" rel="noreferrer">
                                        Fonte: GitHub Docs
                                      </a>{" "}
                                      ·{" "}
                                      <a
                                        href="https://creativecommons.org/licenses/by/4.0/"
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        CC BY 4.0
                                      </a>{" "}
                                      · Sem alterações. Abra a imagem para ampliar.
                                    </figcaption>
                                  </figure>
                                ))}
                                {saepPractice[topic.id] && (
                                  <details className="lesson-lab">
                                    <summary>Aplicar esta trilha na preparação para o SAEP</summary>
                                    <p>
                                      {saepPractice[topic.id].focus}. Orientações de estudo sujeitas
                                      a mudanças; siga o enunciado da avaliação.
                                    </p>
                                    <ol>
                                      {saepPractice[topic.id].steps.map((step) => (
                                        <li key={step}>{step}</li>
                                      ))}
                                    </ol>
                                  </details>
                                )}
                                {lesson.code && (
                                  <details className="code-example">
                                    <summary>
                                      {topic.area === "secondary"
                                        ? "Ver exemplo"
                                        : "Ver exemplo em código"}{" "}
                                      <Code2 size={16} />
                                    </summary>
                                    <p>
                                      O código é uma forma de escrever instruções. Você pode ler
                                      primeiro a explicação e voltar a este exemplo depois.
                                    </p>
                                    <pre>
                                      <code>{lesson.code}</code>
                                    </pre>
                                  </details>
                                )}
                                {lesson.lab && (
                                  <details className="lesson-lab">
                                    <summary>Prática guiada: {lesson.lab.tool}</summary>
                                    <p>{lesson.lab.setup}</p>
                                    <ol>
                                      {lesson.lab.steps.map((step) => (
                                        <li key={step}>{step}</li>
                                      ))}
                                    </ol>
                                    <h3>Como conferir o resultado</h3>
                                    <p>{lesson.lab.expected}</p>
                                    <h3>Se não funcionar</h3>
                                    <p>{lesson.lab.troubleshooting}</p>
                                  </details>
                                )}
                                {lesson.demo && <LessonDemo key={lesson.id} kind={lesson.demo} />}
                                {lesson.resources && (
                                  <details className="lesson-resources">
                                    <summary>Consultar as fontes desta aula</summary>
                                    <ul>
                                      {lesson.resources.map((resource) => (
                                        <li key={resource.url}>
                                          <a href={resource.url} target="_blank" rel="noreferrer">
                                            {resource.title} ↗
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </details>
                                )}
                              </>
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
                          <details className="glossary">
                            <summary>
                              O que significam essas palavras? <BookOpen size={16} />
                            </summary>
                            <dl>
                              {topic.glossary.map((item) => (
                                <div key={item.term}>
                                  <dt>{item.term}</dt>
                                  <dd>{item.meaning}</dd>
                                </div>
                              ))}
                            </dl>
                          </details>
                          {data && topic.area !== "secondary" && (
                            <TeacherChat
                              key={topic.id}
                              data={data}
                              lessonId={lesson.id}
                              busy={busy}
                              setBusy={setBusy}
                              onUpdate={(result) => {
                                setData(result);
                                rememberSaved(result);
                              }}
                              onAccount={openAccount}
                            />
                          )}
                          <div className="notes-area">
                            <label htmlFor="study-note">
                              <NotebookPen size={16} /> Suas anotações
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
                                ? "Aula concluída. Você pode voltar a ela quando quiser."
                                : "Terminou de ler e praticar? Marque esta aula como concluída."}
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
                                ? "Marcar como não concluída"
                                : "Concluir aula"}
                            </button>
                          </div>
                          {session.completed_lessons.includes(lesson.id) &&
                            lessonIndex < topic.lessons.length - 1 && (
                              <button
                                className="button next-lesson"
                                disabled={busy || dirtyNote}
                                onClick={() => {
                                  setLessonIndex(lessonIndex + 1);
                                  setTeacherTab("explanation");
                                }}
                              >
                                Próxima aula: {orderedLessons[lessonIndex + 1].title}
                                <ArrowRight size={17} />
                              </button>
                            )}
                        </div>
                      </section>
                    </div>
                  )}
                </>
              )}
              <footer className="page-footer">
                <span>EducaJá · Seu espaço de estudo</span>
                <span>
                  {data?.user
                    ? "Progresso salvo na sua conta. Entre com a mesma conta para retomá-lo em outro navegador."
                    : "Você está como visitante. Crie uma conta para guardar seu progresso e acessá-lo em outros navegadores."}
                </span>
              </footer>
            </>
          )}
        </main>
      </div>
      {accountOpen && (
        <AccountPanel
          user={data?.user ?? null}
          emailReady={data?.emailReady ?? false}
          emailVerificationRequired={data?.emailVerificationRequired ?? true}
          onClose={() => setAccountOpen(false)}
          onChanged={accountChanged}
        />
      )}
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
            <span className="eyebrow">COMEÇAR UM ASSUNTO</span>
            <h2 id="goal-title">Como você quer começar?</h2>
            <p>
              Você escolheu <strong>{selected.shortTitle}</strong>. Pode começar pela primeira aula,
              mesmo sem experiência.
            </p>
            <div className="goal-presets" aria-label="Sugestões de objetivo">
              {selected.goalExamples.map((example) => (
                <button
                  key={example}
                  aria-pressed={goal === example}
                  onClick={() => setGoal(example)}
                  disabled={busy}
                >
                  {example}
                </button>
              ))}
            </div>
            <label htmlFor="goal">Quer nos contar seu objetivo? (opcional)</label>
            <textarea
              id="goal"
              maxLength={600}
              rows={4}
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
              placeholder="Ex.: estou começando do zero, tenho uma prova ou quero fazer um projeto."
              disabled={busy}
            />
            <div className="field-meta">
              <span>Pode deixar em branco e começar do básico.</span>
              <span>{goal.length}/600</span>
            </div>
            <div className="start-options">
              <button
                className="button primary full"
                disabled={busy}
                onClick={() => start("learn")}
              >
                {busy ? <LoaderCircle className="spin" size={17} /> : <BookOpen size={17} />}Começar
                a estudar <ArrowRight size={17} />
              </button>
              {selected.area !== "secondary" && (
                <button
                  className="button secondary full"
                  disabled={busy}
                  onClick={() => start("diagnostic")}
                >
                  <Compass size={17} />
                  Fazer teste inicial (opcional)
                </button>
              )}
            </div>
            <small>Seu progresso anterior neste tema será preservado.</small>
          </section>
        </div>
      )}
    </div>
  );
}
