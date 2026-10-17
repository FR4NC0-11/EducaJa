import { secureCookies } from "./deployment-config.mjs";
import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { getDb } from "./db";
import { visitor, UserError } from "./workspace";
import { hashPassword, verifyPassword } from "./password";
import {
  accountCookie,
  currentAccount,
  issueSession,
  setSessionCookie,
  tokenHash,
} from "./session";
import { consumeLimit } from "./rate-limit";
import { type AuthAction } from "./auth-contract";
import { emailConfigured, sendAccessCode } from "./email";
import { accessCodeHash, matchesAccessCode, newAccessCode } from "./access-code";
import { emailVerificationRequired } from "./auth-policy";
export { authSchema } from "./auth-contract";

const challengeCookie = "educaja_access_challenge";
type Challenge = {
  token_hash: string;
  email: string;
  purpose: "register" | "login";
  account_id: string | null;
  profile_id: string | null;
  name: string | null;
  password_hash: string;
  code_hash: string;
  attempts: number;
  sends: number;
  active: boolean;
  can_resend: boolean;
};
const invalidCode = () =>
  new UserError(
    "Código inválido, expirado ou com tentativas esgotadas. Confira o e-mail ou inicie o acesso novamente.",
    401,
  );
async function limitEmail(email: string) {
  if (
    !(await consumeLimit("auth/global", 100, 600)) ||
    !(await consumeLimit(`auth/${tokenHash(email)}`, 8, 900))
  )
    throw new UserError(
      "Muitas tentativas. Aguarde alguns minutos antes de tentar novamente.",
      429,
    );
}
async function deliver(email: string, code: string, id: string) {
  try {
    await sendAccessCode(email, code, id);
  } catch {
    throw new UserError(
      "Não foi possível enviar o código. Tente novamente mais tarde. Se o problema continuar, o responsável pelo site precisa conferir o envio de e-mails.",
      503,
    );
  }
}

export async function authenticate(action: AuthAction) {
  const jar = await cookies();
  if (action.kind === "logout") {
    const token = jar.get(accountCookie)?.value;
    if (token)
      await getDb().query("DELETE FROM account_sessions WHERE token_hash=$1", [tokenHash(token)]);
    const challenge = jar.get(challengeCookie)?.value;
    if (challenge)
      await getDb().query("DELETE FROM auth_challenges WHERE token_hash=$1", [
        tokenHash(challenge),
      ]);
    jar.delete(accountCookie);
    jar.delete(challengeCookie);
    return { ok: true as const };
  }
  if (action.kind === "verify" || action.kind === "resend") {
    if (!emailVerificationRequired())
      throw new UserError(
        "Entre com seu e-mail e senha; a confirmação por código está desativada.",
        400,
      );
    return await confirmOrResend(action);
  }
  await limitEmail(action.email);
  if (!emailVerificationRequired()) return await passwordOnly(action);
  if (!emailConfigured())
    throw new UserError(
      "A confirmação por e-mail ainda não está configurada. O responsável pelo site precisa ativar o envio de códigos.",
      503,
    );
  const client = await getDb().connect();
  const secret = randomBytes(32).toString("hex");
  const code = newAccessCode();
  try {
    await client.query("BEGIN");
    if (await currentAccount(client))
      throw new UserError("Saia da conta atual antes de acessar outra.", 409);
    let accountId: string | null = null,
      profileId: string | null = null,
      name: string | null = null,
      hashed: string;
    if (action.kind === "register") {
      const existing = await client.query("SELECT id FROM accounts WHERE email=$1", [action.email]);
      if (existing.rows.length)
        throw new UserError(
          "Não foi possível criar a conta. Se você já se cadastrou, use Entrar.",
          409,
        );
      profileId = await visitor(client);
      const linked = await client.query("SELECT id FROM accounts WHERE profile_id=$1", [profileId]);
      if (linked.rows.length)
        throw new UserError(
          "Este progresso já está vinculado a uma conta. Recarregue e tente entrar.",
          409,
        );
      name = action.name;
      hashed = await hashPassword(action.password);
    } else {
      const result = await client.query("SELECT id, password_hash FROM accounts WHERE email=$1", [
        action.email,
      ]);
      const account = result.rows[0];
      if (!(await verifyPassword(action.password, account?.password_hash ?? "")))
        throw new UserError("E-mail ou senha incorretos.", 401);
      accountId = account.id;
      hashed = account.password_hash;
    }
    await client.query("DELETE FROM auth_challenges WHERE expires_at <= now()");
    await client.query(
      `INSERT INTO auth_challenges(token_hash,email,purpose,account_id,profile_id,name,password_hash,code_hash)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8)`,
      [
        tokenHash(secret),
        action.email,
        action.kind,
        accountId,
        profileId,
        name,
        hashed,
        accessCodeHash(secret, code),
      ],
    );
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
  try {
    await deliver(action.email, code, `access-${tokenHash(secret)}-1`);
  } catch (error) {
    await getDb().query("DELETE FROM auth_challenges WHERE token_hash=$1", [tokenHash(secret)]);
    throw error;
  }
  const previous = jar.get(challengeCookie)?.value;
  if (previous)
    await getDb().query("DELETE FROM auth_challenges WHERE token_hash=$1", [tokenHash(previous)]);
  jar.set(challengeCookie, secret, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 1800,
    secure: secureCookies(),
  });
  return { ok: true as const, requiresCode: true as const };
}

async function passwordOnly(action: Extract<AuthAction, { kind: "register" | "login" }>) {
  const client = await getDb().connect();
  let token: string;
  try {
    await client.query("BEGIN");
    if (await currentAccount(client))
      throw new UserError("Saia da conta atual antes de acessar outra.", 409);
    // Serialize competing registrations for the same normalized email.
    await client.query("SELECT pg_advisory_xact_lock(hashtextextended($1,0))", [action.email]);
    const result = await client.query("SELECT id,password_hash FROM accounts WHERE email=$1", [
      action.email,
    ]);
    let id: string;
    if (action.kind === "register") {
      if (result.rows.length) throw new UserError("Este e-mail já possui conta. Use Entrar.", 409);
      const profile = await visitor(client);
      const linked = await client.query("SELECT id FROM accounts WHERE profile_id=$1", [profile]);
      if (linked.rows.length)
        throw new UserError(
          "Este progresso já foi vinculado a uma conta. Recarregue e tente entrar.",
          409,
        );
      const created = await client.query(
        "INSERT INTO accounts(profile_id,name,email,password_hash) VALUES($1,$2,$3,$4) RETURNING id",
        [profile, action.name, action.email, await hashPassword(action.password)],
      );
      id = created.rows[0].id;
      // Preserve progress while invalidating the old anonymous token.
      await client.query("UPDATE visitors SET token_hash=$2, expires_at=now() WHERE id=$1", [
        profile,
        tokenHash(randomBytes(32).toString("hex")),
      ]);
    } else {
      const account = result.rows[0];
      if (!(await verifyPassword(action.password, account?.password_hash ?? "")))
        throw new UserError("E-mail ou senha incorretos.", 401);
      id = account.id;
    }
    token = await issueSession(client, id);
    const pending = (await cookies()).get(challengeCookie)?.value;
    if (pending)
      await client.query("DELETE FROM auth_challenges WHERE token_hash=$1", [tokenHash(pending)]);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
  await setSessionCookie(token);
  const jar = await cookies();
  jar.delete(challengeCookie);
  if (action.kind === "register") jar.delete("educaja_visitor");
  return { ok: true as const };
}

async function confirmOrResend(action: Extract<AuthAction, { kind: "verify" | "resend" }>) {
  const jar = await cookies();
  const secret = jar.get(challengeCookie)?.value;
  if (!secret || !/^[a-f0-9]{64}$/.test(secret)) throw invalidCode();
  if (!(await consumeLimit(`code/${tokenHash(secret)}`, 15, 900)))
    throw new UserError("Muitas tentativas. Inicie o acesso novamente mais tarde.", 429);
  // Consume shared limits before reserving a client for the confirmation transaction.
  if (action.kind === "resend") {
    const pending = await getDb().query("SELECT email FROM auth_challenges WHERE token_hash=$1", [
      tokenHash(secret),
    ]);
    if (pending.rows[0]) await limitEmail(pending.rows[0].email);
  }
  const client = await getDb().connect();
  let committed = false;
  let delivery: { email: string; code: string; id: string } | null = null;
  let token = "";
  let registering = false;
  try {
    await client.query("BEGIN");
    const result = await client.query<Challenge>(
      `SELECT *, expires_at > now() AS active, sent_at <= now()-interval '60 seconds' AS can_resend
      FROM auth_challenges WHERE token_hash=$1 FOR UPDATE`,
      [tokenHash(secret)],
    );
    const challenge = result.rows[0];
    if (!challenge || !challenge.active || challenge.attempts >= 5) throw invalidCode();
    if (action.kind === "resend") {
      if (!challenge.can_resend || challenge.sends >= 3)
        throw new UserError(
          "Aguarde 60 segundos entre envios. Após três envios, inicie o acesso novamente.",
          429,
        );
      let code = newAccessCode();
      while (matchesAccessCode(secret, code, challenge.code_hash)) code = newAccessCode();
      await client.query(
        "UPDATE auth_challenges SET code_hash=$2, sends=sends+1, sent_at=now(), expires_at=now()+interval '10 minutes' WHERE token_hash=$1",
        [challenge.token_hash, accessCodeHash(secret, code)],
      );
      delivery = {
        email: challenge.email,
        code,
        id: `access-${challenge.token_hash}-${challenge.sends + 1}`,
      };
    } else {
      if (!matchesAccessCode(secret, action.code, challenge.code_hash)) {
        await client.query("UPDATE auth_challenges SET attempts=attempts+1 WHERE token_hash=$1", [
          challenge.token_hash,
        ]);
        await client.query("COMMIT");
        committed = true;
        throw invalidCode();
      }
      let id: string;
      if (challenge.purpose === "register") {
        if (await currentAccount(client))
          throw new UserError("Saia da conta atual e inicie o cadastro novamente.", 409);
        await client.query("SELECT pg_advisory_xact_lock(hashtextextended($1,0))", [
          challenge.email,
        ]);
        const existing = await client.query("SELECT id FROM accounts WHERE email=$1", [
          challenge.email,
        ]);
        if (existing.rows.length)
          throw new UserError("Este e-mail já possui conta. Use Entrar.", 409);
        const profile = await visitor(client);
        if (profile !== challenge.profile_id)
          throw new UserError(
            "O navegador mudou desde o cadastro. Inicie novamente para preservar seu progresso.",
            409,
          );
        const linked = await client.query("SELECT id FROM accounts WHERE profile_id=$1", [profile]);
        if (linked.rows.length)
          throw new UserError("Este progresso já foi vinculado. Inicie o acesso novamente.", 409);
        const created = await client.query(
          "INSERT INTO accounts(profile_id,name,email,password_hash,email_verified_at) VALUES($1,$2,$3,$4,now()) RETURNING id",
          [profile, challenge.name, challenge.email, challenge.password_hash],
        );
        id = created.rows[0].id;
        await client.query("UPDATE visitors SET token_hash=$2, expires_at=now() WHERE id=$1", [
          profile,
          tokenHash(randomBytes(32).toString("hex")),
        ]);
        registering = true;
      } else {
        const account = await client.query(
          "UPDATE accounts SET email_verified_at=COALESCE(email_verified_at,now()) WHERE id=$1 AND password_hash=$2 RETURNING id",
          [challenge.account_id, challenge.password_hash],
        );
        if (!account.rows.length) throw invalidCode();
        id = account.rows[0].id;
      }
      token = await issueSession(client, id);
      await client.query("DELETE FROM auth_challenges WHERE token_hash=$1", [challenge.token_hash]);
    }
    await client.query("COMMIT");
    committed = true;
  } catch (error) {
    if (!committed) await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
  if (delivery) {
    await deliver(delivery.email, delivery.code, delivery.id);
    return { ok: true as const, requiresCode: true as const };
  }
  await setSessionCookie(token);
  jar.delete(challengeCookie);
  if (registering) jar.delete("educaja_visitor");
  return { ok: true as const };
}
