import { z } from "zod";
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

const email = z.string().trim().toLowerCase().max(254).pipe(z.email());
const password = z.string().min(12).max(128);
export const authSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("register"),
    name: z.string().trim().min(1).max(80),
    email,
    password,
  }),
  z.object({ kind: z.literal("login"), email, password: z.string().min(1).max(128) }),
  z.object({ kind: z.literal("logout") }),
]);

export async function authenticate(action: z.infer<typeof authSchema>) {
  if (action.kind !== "logout") {
    if (
      !(await consumeLimit("auth/global", 100, 600)) ||
      !(await consumeLimit(`auth/${tokenHash(action.email)}`, 8, 900))
    )
      throw new UserError(
        "Muitas tentativas. Aguarde alguns minutos antes de tentar novamente.",
        429,
      );
  }
  const client = await getDb().connect();
  try {
    await client.query("BEGIN");
    if (action.kind === "logout") {
      const jar = await cookies();
      const token = jar.get(accountCookie)?.value;
      if (token)
        await client.query("DELETE FROM account_sessions WHERE token_hash = $1", [
          tokenHash(token),
        ]);
      await client.query("COMMIT");
      jar.delete(accountCookie);
      return;
    }
    let id: string;
    if (action.kind === "register") {
      if (await currentAccount(client))
        throw new UserError("Saia da conta atual antes de criar outra.", 409);
      const profile = await visitor(client);
      const hashed = await hashPassword(action.password);
      // Advisory lock serializes registration attempts for the same email.
      await client.query("SELECT pg_advisory_xact_lock(hashtextextended($1, 0))", [action.email]);
      const existing = await client.query("SELECT id FROM accounts WHERE email = $1", [
        action.email,
      ]);
      if (existing.rows.length)
        throw new UserError(
          "Não foi possível criar a conta. Se você já se cadastrou, use Entrar.",
          409,
        );
      const result = await client.query(
        "INSERT INTO accounts (profile_id, name, email, password_hash) VALUES ($1,$2,$3,$4) RETURNING id",
        [profile, action.name, action.email, hashed],
      );
      id = result.rows[0].id;
      // Revoke the anonymous capability before attaching its progress to an account.
      await client.query("UPDATE visitors SET token_hash = $2, expires_at = now() WHERE id = $1", [
        profile,
        tokenHash(`${id}/${Date.now()}/${hashed}`),
      ]);
    } else {
      const result = await client.query("SELECT id, password_hash FROM accounts WHERE email = $1", [
        action.email,
      ]);
      const account = result.rows[0];
      if (!(await verifyPassword(action.password, account?.password_hash ?? "")))
        throw new UserError("E-mail ou senha incorretos.", 401);
      id = account.id;
    }
    const token = await issueSession(client, id);
    await client.query("COMMIT");
    await setSessionCookie(token);
    if (action.kind === "register") (await cookies()).delete("educaja_visitor");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
