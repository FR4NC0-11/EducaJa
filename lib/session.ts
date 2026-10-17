import { secureCookies } from "./deployment-config.mjs";
import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import type { PoolClient } from "pg";
import { emailVerificationRequired } from "./auth-policy";

export const accountCookie = "educaja_account";
export const tokenHash = (token: string) => createHash("sha256").update(token).digest("hex");
export type Account = { id: string; profile_id: string; name: string; email: string };
export async function currentAccount(client: PoolClient, lock = false): Promise<Account | null> {
  const token = (await cookies()).get(accountCookie)?.value;
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
  const result = await client.query<Account>(
    `SELECT a.id, a.profile_id, a.name, a.email
    FROM account_sessions s JOIN accounts a ON a.id = s.account_id
    JOIN visitors v ON v.id = a.profile_id
    WHERE s.token_hash = $1 AND s.expires_at > now() AND (NOT $2::boolean OR a.email_verified_at IS NOT NULL) ${lock ? "FOR UPDATE OF v" : ""}`,
    [tokenHash(token), emailVerificationRequired()],
  );
  return result.rows[0] ?? null;
}
export async function issueSession(client: PoolClient, accountId: string) {
  const jar = await cookies();
  const old = jar.get(accountCookie)?.value;
  if (old && /^[a-f0-9]{64}$/.test(old))
    await client.query("DELETE FROM account_sessions WHERE token_hash = $1", [tokenHash(old)]);
  const token = randomBytes(32).toString("hex");
  await client.query("INSERT INTO account_sessions (token_hash, account_id) VALUES ($1, $2)", [
    tokenHash(token),
    accountId,
  ]);
  return token;
}
export async function setSessionCookie(token: string) {
  (await cookies()).set(accountCookie, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
    secure: secureCookies(),
  });
}
