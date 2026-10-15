import { readdir, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import pg from "pg";

if (!process.env.DATABASE_URL)
  throw new Error("Configure DATABASE_URL antes de executar as migrações.");
const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 5000,
});
try {
  await client.connect();
  await client.query("BEGIN");
  await client.query("SELECT pg_advisory_xact_lock(1702026)");
  await client.query(
    "CREATE TABLE IF NOT EXISTS schema_migrations (name text PRIMARY KEY, checksum text NOT NULL, applied_at timestamptz NOT NULL DEFAULT now())",
  );
  const dir = fileURLToPath(new URL("../migrations/", import.meta.url));
  for (const name of (await readdir(dir)).filter((name) => /^\d+_.+\.sql$/.test(name)).sort()) {
    const sql = await readFile(`${dir}/${name}`, "utf8");
    const checksum = createHash("sha256").update(sql).digest("hex");
    const previous = await client.query("SELECT checksum FROM schema_migrations WHERE name = $1", [
      name,
    ]);
    if (previous.rows.length) {
      if (previous.rows[0].checksum !== checksum)
        throw new Error(`Migração já aplicada foi alterada: ${name}`);
      console.log(`Já aplicada: ${name}`);
      continue;
    }
    await client.query(sql);
    await client.query("INSERT INTO schema_migrations (name, checksum) VALUES ($1, $2)", [
      name,
      checksum,
    ]);
    console.log(`Aplicada: ${name}`);
  }
  await client.query("COMMIT");
} catch (error) {
  await client.query("ROLLBACK").catch(() => {});
  console.error("Migração falhou. Nenhuma alteração desta execução foi confirmada.");
  // Do not print connection objects or URLs, which can contain credentials.
  if (error instanceof Error)
    console.error(error.message.replace(/postgres(?:ql)?:\/\/[^\s]+/g, "[conexão omitida]"));
  process.exitCode = 1;
} finally {
  await client.end();
}
