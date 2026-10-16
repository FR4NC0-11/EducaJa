/** Validate deployment settings without returning credentials or URLs in messages. */
export function cloudConfiguration(env) {
  const errors = [];
  const warnings = [];
  try {
    const origin = new URL(env.APP_ORIGIN || "");
    if (
      origin.protocol !== "https:" ||
      origin.origin !== env.APP_ORIGIN ||
      /^(?:localhost|127\.|0\.|\[?::1\]?$)/i.test(origin.hostname) ||
      /SEU-PROJETO/i.test(origin.host)
    )
      throw new Error();
  } catch {
    errors.push("APP_ORIGIN deve ser a origem HTTPS definitiva, sem barra final.");
  }
  if (env.COOKIE_SECURE !== "true") errors.push("COOKIE_SECURE deve ser true na nuvem.");
  if (env.NODE_TLS_REJECT_UNAUTHORIZED === "0")
    errors.push("A verificação TLS não pode estar desativada na hospedagem.");
  for (const key of ["DATABASE_URL", "MIGRATION_DATABASE_URL"]) {
    if (!env[key] && key === "MIGRATION_DATABASE_URL") continue;
    try {
      const url = new URL(env[key] || "");
      if (
        !/^postgres(?:ql)?:$/.test(url.protocol) ||
        !url.username ||
        !url.password ||
        url.pathname.length <= 1 ||
        /^(?:localhost|127\.|0\.|\[?::1\]?$)/i.test(url.hostname) ||
        /^(?:HOST|HOST-POOLER)\./i.test(url.hostname) ||
        url.searchParams.get("sslmode") !== "verify-full"
      )
        throw new Error();
    } catch {
      errors.push(
        `${key} deve apontar para PostgreSQL remoto, com credenciais e sslmode=verify-full.`,
      );
    }
  }
  if (env.AI_ENABLED === "true" && !env.GEMINI_API_KEY?.trim())
    errors.push("GEMINI_API_KEY é obrigatória quando AI_ENABLED=true.");
  if (
    env.AUTH_EMAIL_VERIFICATION === "true" &&
    (!env.RESEND_API_KEY?.trim() || !env.EMAIL_FROM?.trim())
  )
    warnings.push(
      "Envio de e-mail pendente: aulas de visitante disponíveis; cadastro/login e professor autenticado indisponíveis.",
    );
  if (!env.MIGRATION_DATABASE_URL)
    warnings.push(
      "MIGRATION_DATABASE_URL ainda não foi configurada para as migrações controladas.",
    );
  return { errors, warnings };
}
