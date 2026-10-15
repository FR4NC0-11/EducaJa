"use client";
import { useEffect, useRef, useState } from "react";
import { LoaderCircle, LogIn, LogOut, UserRound, X } from "lucide-react";
import type { Workspace } from "@/lib/learning";

export default function AccountPanel({
  user,
  onClose,
  onChanged,
}: {
  user: Workspace["user"];
  onClose: () => void;
  onChanged: () => Promise<void>;
}) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const dialog = useRef<HTMLElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    dialog.current?.querySelector<HTMLElement>("input, button")?.focus();
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !busy) onClose();
      if (event.key !== "Tab") return;
      const items = dialog.current?.querySelectorAll<HTMLElement>(
        "button:not(:disabled),input:not(:disabled)",
      );
      if (!items?.length) return;
      if (event.shiftKey && document.activeElement === items[0]) {
        event.preventDefault();
        items[items.length - 1].focus();
      } else if (!event.shiftKey && document.activeElement === items[items.length - 1]) {
        event.preventDefault();
        items[0].focus();
      }
    };
    document.addEventListener("keydown", keyboard);
    return () => {
      document.removeEventListener("keydown", keyboard);
      previous?.focus();
    };
  }, [busy, onClose]);
  async function submit() {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const payload = user
        ? { kind: "logout" }
        : { kind: mode, name, email: email.trim(), password };
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setPassword("");
      await onChanged();
      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Não foi possível acessar a conta.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="modal-backdrop">
      <section
        className="goal-modal account-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="account-title"
        ref={dialog}
      >
        <button
          className="close-button"
          aria-label="Fechar conta"
          onClick={onClose}
          disabled={busy}
        >
          <X size={20} />
        </button>
        <UserRound className="account-symbol" size={27} />
        <div className="eyebrow">SUA CONTA</div>
        <h2 id="account-title">
          {user
            ? `Olá, ${user.name}.`
            : mode === "login"
              ? "Continue seu aprendizado"
              : "Guarde seu progresso"}
        </h2>
        {user ? (
          <>
            <p>
              Você entrou com <strong>{user.email}</strong>. O progresso fica associado à sua conta.
            </p>
            <p className="account-note">
              Você pode usar a mesma conta em outros navegadores que acessem este EducaJá.
            </p>
          </>
        ) : (
          <>
            <div className="account-tabs">
              <button
                aria-pressed={mode === "login"}
                onClick={() => {
                  setMode("login");
                  setError("");
                }}
                disabled={busy}
              >
                Entrar
              </button>
              <button
                aria-pressed={mode === "register"}
                onClick={() => {
                  setMode("register");
                  setError("");
                }}
                disabled={busy}
              >
                Criar conta
              </button>
            </div>
            <p className="account-note">
              {mode === "register"
                ? "O progresso que você já fez como visitante neste navegador será vinculado à nova conta."
                : "Entre para recuperar o progresso da sua conta. Se você estudou como visitante, esse progresso permanece separado ao entrar em uma conta existente."}
            </p>
          </>
        )}
        {error && (
          <div className="error-banner" role="alert">
            {error}
          </div>
        )}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void submit();
          }}
        >
          {!user && (
            <fieldset disabled={busy}>
              {mode === "register" && (
                <>
                  <label htmlFor="account-name">Como você quer ser chamado?</label>
                  <input
                    id="account-name"
                    name="name"
                    autoComplete="name"
                    maxLength={80}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </>
              )}
              <label htmlFor="account-email">E-mail</label>
              <input
                id="account-email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <label htmlFor="account-password">Senha</label>
              <input
                id="account-password"
                name="password"
                type="password"
                autoComplete={mode === "register" ? "new-password" : "current-password"}
                minLength={mode === "register" ? 12 : 1}
                maxLength={128}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              {mode === "register" && (
                <p className="password-help">
                  Use pelo menos 12 caracteres. Uma frase com várias palavras é uma opção.
                </p>
              )}
            </fieldset>
          )}
          <button className="button primary full" disabled={busy} type="submit">
            {busy ? (
              <LoaderCircle className="spin" size={17} />
            ) : user ? (
              <LogOut size={17} />
            ) : (
              <LogIn size={17} />
            )}{" "}
            {user
              ? "Sair da conta"
              : mode === "register"
                ? "Criar minha conta"
                : "Entrar na minha conta"}
          </button>
        </form>
        {!user && (
          <small>
            Recuperação e confirmação por e-mail ainda não estão disponíveis. Guarde sua senha em um
            local seguro.
          </small>
        )}
      </section>
    </div>
  );
}
