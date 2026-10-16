import { cloudConfiguration } from "./cloud-config.mjs";
const { errors, warnings } = cloudConfiguration(process.env);
for (const warning of warnings) console.log(`Pendente: ${warning}`);
for (const error of errors) console.error(`Configuração: ${error}`);
if (errors.length) process.exitCode = 1;
else
  console.log(
    "Configuração de nuvem conferida. Isso não confirma implantação, conexão ou entrega de e-mail.",
  );
