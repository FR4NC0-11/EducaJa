"use client";
import { useEffect, useRef, useState } from "react";
import { LoaderCircle, MessageCircle, Send } from "lucide-react";
import type { Workspace } from "@/lib/learning";

export default function TeacherChat({
  data,
  lessonId,
  busy,
  setBusy,
  onUpdate,
  onAccount,
}: {
  data: Workspace;
  lessonId: string;
  busy: boolean;
  setBusy: (busy: boolean) => void;
  onUpdate: (data: Workspace) => void;
  onAccount: () => void;
}) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const history = useRef<HTMLDivElement>(null);
  const messages = data.session?.conversation ?? [];
  useEffect(() => {
    history.current?.scrollTo({ top: history.current.scrollHeight });
  }, [messages.length, pending]);
  async function send() {
    if (busy || !text.trim() || !data.session) return;
    setPending(true);
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "chat", topicId: data.session.topic_id, lessonId, text }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      onUpdate(result);
      setText("");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Não foi possível responder agora.");
      // Failed provider requests can also consume the daily allowance.
      try {
        const current = await fetch("/api/workspace", { cache: "no-store" });
        if (current.ok) onUpdate(await current.json());
      } catch {}
    } finally {
      setPending(false);
      setBusy(false);
    }
  }
  return (
    <section className="teacher-chat" aria-labelledby="chat-title">
      <h3 id="chat-title">
        <MessageCircle size={18} /> Conversar com o professor
      </h3>
      {!data.user ? (
        <div className="chat-unavailable">
          <p>Entre na sua conta para guardar suas conversas e pedir ajuda ao professor.</p>
          <button className="button secondary" onClick={onAccount}>
            Entrar ou criar conta
          </button>
        </div>
      ) : !data.aiReady ? (
        <p className="chat-unavailable">
          A conversa por IA ainda não foi ativada neste EducaJá. Enquanto isso, você pode usar as
          explicações, exemplos e exercícios desta aula.
        </p>
      ) : (
        <>
          <p className="chat-help">
            Conte onde ficou a dúvida. O professor usa a aula e seu teste como contexto. A IA pode
            errar: confira exemplos importantes e peça explicações.
          </p>
          <div
            className="chat-history"
            ref={history}
            role="log"
            aria-label="Conversa com o professor"
            aria-live="polite"
          >
            {messages.length === 0 && (
              <p className="chat-placeholder">
                Ex.: “Não entendi esse conceito. Pode explicar com outro exemplo?”
              </p>
            )}
            {messages.map((message, index) => (
              <article key={index} className={`chat-message ${message.role}`}>
                <strong>{message.role === "user" ? "Você" : "Professor"}</strong>
                <p>{message.text}</p>
              </article>
            ))}
            {pending && (
              <p className="chat-pending">
                <LoaderCircle size={16} className="spin" /> O professor está preparando uma
                resposta…
              </p>
            )}
          </div>
          {data.teacherUsage && (
            <div className="chat-help" role="status" aria-label="Uso diário do professor">
              <strong>
                Pedidos restantes hoje: {data.teacherUsage.remaining} de {data.teacherUsage.limit}
              </strong>
              <p>
                Inclui perguntas e avaliações em todos os assuntos. Pedidos que falham também podem
                consumir o limite. O serviço pode ter outros limites de disponibilidade.
              </p>
            </div>
          )}
          {error && (
            <div className="error-banner" role="alert">
              {error}
            </div>
          )}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void send();
            }}
          >
            <label htmlFor="teacher-question">Sua dúvida</label>
            <textarea
              id="teacher-question"
              rows={3}
              maxLength={2000}
              value={text}
              onChange={(event) => setText(event.target.value)}
              disabled={busy}
              placeholder="Explique o que você tentou e o que ainda não entendeu."
            />
            <div className="notes-actions">
              <span>{text.length}/2000</span>
              <button className="button primary" type="submit" disabled={busy || !text.trim()}>
                <Send size={15} /> Perguntar ao professor
              </button>
            </div>
            <small>
              Sua pergunta e o contexto de estudo serão enviados ao Google Gemini. Não inclua senhas
              ou outros dados sensíveis.
            </small>
          </form>
        </>
      )}
    </section>
  );
}
