import { cloudConfiguration } from "./cloud-config.mjs";
const { errors } = cloudConfiguration(process.env);
if (!process.env.MIGRATION_DATABASE_URL)
  errors.push("Configure MIGRATION_DATABASE_URL antes de aplicar migrações na nuvem.");
if (!errors.length) {
  const runtime = new URL(process.env.DATABASE_URL);
  const migration = new URL(process.env.MIGRATION_DATABASE_URL);
  if (
    runtime.pathname !== migration.pathname ||
    runtime.hostname.replace("-pooler.", ".") !== migration.hostname.replace("-pooler.", ".")
  )
    errors.push("As conexões de execução e migração devem apontar para o mesmo endpoint/banco.");
}
if (errors.length) {
  for (const error of errors) console.error(`Configuração: ${error}`);
  process.exitCode = 1;
} else {
  process.env.DATABASE_URL = process.env.MIGRATION_DATABASE_URL;
  await import("./migrate.mjs");
}
