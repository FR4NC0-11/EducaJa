import { Pool } from "pg";
import { attachDatabasePool } from "@vercel/functions";

const globalDb = globalThis as unknown as { educajaPool?: Pool };
export function getDb() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL ausente");
  if (!globalDb.educajaPool) {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 5,
      connectionTimeoutMillis: Math.min(
        30000,
        Math.max(1000, Number(process.env.DB_CONNECTION_TIMEOUT_MS) || 5000),
      ),
      idleTimeoutMillis: 30000,
    });
    pool.on("error", () => console.error("PostgreSQL: conexão ociosa interrompida."));
    if (process.env.VERCEL === "1") attachDatabasePool(pool);
    globalDb.educajaPool = pool;
  }
  return globalDb.educajaPool;
}
