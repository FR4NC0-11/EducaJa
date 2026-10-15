import { Pool } from "pg";

const globalDb = globalThis as unknown as { educajaPool?: Pool };
export function getDb() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL ausente");
  if (!globalDb.educajaPool) {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 5,
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
    });
    pool.on("error", () => console.error("PostgreSQL: conexão ociosa interrompida."));
    globalDb.educajaPool = pool;
  }
  return globalDb.educajaPool;
}
