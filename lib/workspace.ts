import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import type { PoolClient } from "pg";
import { getDb } from "./db";
import { accountCookie, currentAccount } from "./session";
import { aiConfigured } from "./gemini-teacher";
import {
  type Action,
  type StudySession,
  type Workspace,
  answerCount,
  validateLesson,
} from "./learning";

const cookieName = "educaja_visitor";
export class UserError extends Error {
  constructor(
    message: string,
    public status = 400,
  ) {
    super(message);
  }
}

export async function visitor(client: PoolClient, rejectExpired = false) {
  const account = await currentAccount(client, true);
  if (account) return account.profile_id;
  const jar = await cookies();
  if (rejectExpired && jar.has(accountCookie))
    throw new UserError(
      "Sua sessão expirou. Copie o texto que ainda não salvou e recarregue a página para entrar novamente.",
      401,
    );
  if (jar.has(accountCookie)) jar.delete(accountCookie);
  const token = jar.get(cookieName)?.value;
  if (token && /^[a-f0-9]{64}$/.test(token)) {
    const hash = createHash("sha256").update(token).digest("hex");
    const existing = await client.query(
      "SELECT id FROM visitors WHERE token_hash = $1 AND expires_at > now() FOR UPDATE",
      [hash],
    );
    if (existing.rows[0]) return existing.rows[0].id as string;
  }
  const newToken = randomBytes(32).toString("hex");
  const hash = createHash("sha256").update(newToken).digest("hex");
  const result = await client.query("INSERT INTO visitors (token_hash) VALUES ($1) RETURNING id", [
    hash,
  ]);
  jar.set(cookieName, newToken, {
    httpOnly: true,
    sameSite: "lax",
    secure:
      process.env.COOKIE_SECURE === "true" ||
      process.env.APP_ORIGIN?.startsWith("https://") === true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return result.rows[0].id as string;
}

async function readWorkspace(client: PoolClient, visitorId: string): Promise<Workspace> {
  const current = await client.query<StudySession>(
    `SELECT s.topic_id, s.goal, s.answers, s.completed_lessons, s.notes, s.submitted_at, s.updated_at, s.evaluation, s.conversation
    FROM study_sessions s JOIN visitors v ON v.id = s.visitor_id
    WHERE s.visitor_id = $1 AND s.topic_id = v.active_topic`,
    [visitorId],
  );
  const all = await client.query<StudySession>(
    "SELECT topic_id, answers, completed_lessons FROM study_sessions WHERE visitor_id = $1",
    [visitorId],
  );
  return {
    user: await currentAccount(client).then((account) =>
      account ? { name: account.name, email: account.email } : null,
    ),
    session: current.rows[0] ?? null,
    summaries: all.rows.map((row) => ({
      topic_id: row.topic_id,
      answered: answerCount(row.answers),
      completed: row.completed_lessons.length,
    })),
    aiReady: aiConfigured(),
  };
}

export async function workspace(action?: Action) {
  const client = await getDb().connect();
  try {
    await client.query("BEGIN");
    const id = await visitor(client, !!action);
    if (action?.kind === "start") {
      await client.query(
        `INSERT INTO study_sessions (visitor_id, topic_id, goal) VALUES ($1, $2, $3)
        ON CONFLICT (visitor_id, topic_id) DO UPDATE SET goal = EXCLUDED.goal, updated_at = now()`,
        [id, action.topicId, action.goal],
      );
      await client.query("UPDATE visitors SET active_topic = $2 WHERE id = $1", [
        id,
        action.topicId,
      ]);
    } else if (action) {
      const result = await client.query<StudySession>(
        "SELECT * FROM study_sessions WHERE visitor_id = $1 AND topic_id = $2 FOR UPDATE",
        [id, action.topicId],
      );
      const session = result.rows[0];
      if (!session) throw new UserError("Escolha um tema para começar.", 409);
      if (action.kind === "answer") {
        session.answers[String(action.index)] = action.text;
        await client.query(
          "UPDATE study_sessions SET answers = $3, submitted_at = NULL, evaluation = NULL, updated_at = now() WHERE visitor_id = $1 AND topic_id = $2",
          [id, action.topicId, JSON.stringify(session.answers)],
        );
      } else if (action.kind === "submit") {
        if (answerCount(session.answers) !== 10)
          throw new UserError("Responda às dez questões antes de concluir.");
        await client.query(
          "UPDATE study_sessions SET submitted_at = now(), updated_at = now() WHERE visitor_id = $1 AND topic_id = $2",
          [id, action.topicId],
        );
      } else {
        if (!validateLesson(action.topicId, action.lessonId))
          throw new UserError("Etapa inválida.");
        if (action.kind === "lesson") {
          const done = new Set(session.completed_lessons);
          if (action.done) done.add(action.lessonId);
          else done.delete(action.lessonId);
          await client.query(
            "UPDATE study_sessions SET completed_lessons = $3, updated_at = now() WHERE visitor_id = $1 AND topic_id = $2",
            [id, action.topicId, JSON.stringify([...done])],
          );
        } else {
          session.notes[action.lessonId] = action.text;
          await client.query(
            "UPDATE study_sessions SET notes = $3, updated_at = now() WHERE visitor_id = $1 AND topic_id = $2",
            [id, action.topicId, JSON.stringify(session.notes)],
          );
        }
      }
    }
    const result = await readWorkspace(client, id);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
