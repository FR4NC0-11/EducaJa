"use client";
import { useEffect, useRef, useState } from "react";
import { Eye, EyeOff, LoaderCircle, LogIn, LogOut, UserRound, X } from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);
  const [requiresCode, setRequiresCode] = useState(false);
  const [code, setCode] = useState("");
  const [notice, setNotice] = useState("");
  const [resendIn, setResendIn] = useState(0);
  useEffect(() => {
    if (!resendIn) return;
    const timer = setTimeout(() => setResendIn(resendIn - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendIn]);
  useEffect(() => {
    if (requiresCode) dialog.current?.querySelector<HTMLInputElement>("#account-code")?.focus();
  }, [requiresCode]);
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
  async function submit(resend = false) {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const payload = user
        ? { kind: "logout" }
        : requiresCode
          ? resend
            ? { kind: "resend" }
            : { kind: "verify", code }
          : { kind: mode, name, email: email.trim(), password };
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setPassword("");
      setShowPassword(false);
      if (result.requiresCode) {
        setRequiresCode(true);
        setResendIn(60);
        setCode("");
        setNotice(
          resend
            ? "Novo código enviado. Use apenas o mais recente."
            : "Código enviado. Confira também a pasta de spam.",
        );
        return;
      }
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
            : requiresCode
              ? "Confira seu e-mail"
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
            {!requiresCode && (
              <div className="account-tabs">
                <button
                  aria-pressed={mode === "login"}
                  onClick={() => {
                    setMode("login");
                    setShowPassword(false);
                    setPassword("");
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
                    setShowPassword(false);
                    setPassword("");
                    setError("");
                  }}
                  disabled={busy}
                >
                  Criar conta
                </button>
              </div>
            )}
            <p className="account-note">
              {requiresCode
                ? `Enviamos um código de seis dígitos para ${email.trim()}. Ele vale por dez minutos. Sua conta só será acessada depois da confirmação.`
                : mode === "register"
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
        {notice && (
          <p className="account-note" role="status">
            {notice}
          </p>
        )}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void submit();
          }}
        >
          {!user && (
            <fieldset disabled={busy}>
              {requiresCode ? (
                <>
                  <label htmlFor="account-code">Código de confirmação</label>
                  <input
                    id="account-code"
                    name="code"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    value={code}
                    onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))}
                    required
                    aria-describedby="code-help"
                  />
                  <p id="code-help" className="password-help">
                    Digite o código no mesmo navegador em que iniciou o acesso.
                  </p>
                  <button
                    type="button"
                    className="button secondary full"
                    onClick={() => void submit(true)}
                    disabled={busy || resendIn > 0}
                  >
                    {resendIn > 0 ? `Reenviar em ${resendIn}s` : "Reenviar código"}
                  </button>
                  <button
                    type="button"
                    className="button secondary full"
                    onClick={() => {
                      setRequiresCode(false);
                      setCode("");
                      setPassword("");
                      setShowPassword(false);
                      setError("");
                      setNotice("");
                    }}
                  >
                    Voltar ao acesso
                  </button>
                </>
              ) : (
                <>
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
                  <div className="password-field">
                    <input
                      id="account-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete={mode === "register" ? "new-password" : "current-password"}
                      minLength={8}
                      maxLength={255}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                      aria-pressed={showPassword}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
                  </div>
                  {mode === "register" && (
                    <p className="password-help">
                      Use de 8 a 255 caracteres. Uma frase com várias palavras é uma opção.
                    </p>
                  )}
                </>
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
              : requiresCode
                ? "Confirmar e entrar"
                : mode === "register"
                  ? "Criar minha conta"
                  : "Entrar na minha conta"}
          </button>
        </form>
        {!user && (
          <small>
            O acesso exige a senha e o código enviado ao seu e-mail. Nunca compartilhe esse código.
            A recuperação de senha ainda não está disponível.
          </small>
        )}
      </section>
    </div>
  );
}
