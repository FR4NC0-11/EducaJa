# EducaJá

Primeira versão do site educacional de programação, com Next.js, TypeScript e PostgreSQL, sem Supabase.

## O que já funciona

- Escolha entre programação com Java, criação de sites, banco de dados e IoT (Internet das Coisas).
- Início direto pela aula 1, com objetivo opcional ou sugestões prontas.
- Teste inicial opcional com dez questões por assunto e opção “Ainda não sei”.
- Gravação e retomada das respostas, anotações e etapas concluídas no PostgreSQL.
- Aulas guiadas com explicações, exemplos do dia a dia, glossários e exercícios preparados.
- Alternância entre aulas e plano de estudo, mantendo o progresso.
- Interface escura, menu lateral recolhível e preferência salva no navegador.

**IA ainda não conectada:** respostas ficam aguardando avaliação. Não há notas automáticas, diagnóstico adaptativo ou conversa livre nesta versão. A trilha é fixa. O progresso é associado a um cookie deste navegador por 30 dias; login e sincronização entre dispositivos ainda não estão implementados.

## Executar neste computador

Abra no VS Code a pasta `C:\Users\coron\OneDrive\Documentos\ProjetosVSCODE\Sites\EducaJa\EducaJa`.

1. Abra Docker Desktop e aguarde iniciar.
2. Na primeira instalação de outra máquina, copie `.env.example` para `.env`, configure uma senha em `POSTGRES_PASSWORD` e use a mesma senha na `DATABASE_URL`. Neste computador, o `.env` local já está configurado. Prefira senha aleatória com letras e números para evitar problemas de codificação na URL.
3. No terminal da pasta, execute:

```text
npm ci
docker compose up -d --wait db
npm run db:migrate
npm run dev
```

Abra http://localhost:3000. O comando dev permanece rodando enquanto você usa o site; Ctrl+C o encerra. O banco continua ligado até você pará-lo.

Para verificar: `npm test`, `npm run typecheck` e `npm run build`. Para testar a versão compilada, execute `npm run start`. `npm run test:e2e` usa Microsoft Edge instalado no Windows e inicia a versão compilada quando necessário; no CI, usa Chromium.

## Trabalhar em outro computador pelo navegador

No GitHub, abra **Code > Codespaces** e escolha a branch deste PR enquanto ela não estiver integrada à main. Crie um Codespace. A configuração instala as dependências e aplica as migrações ao banco próprio do ambiente.

Depois, execute `npm run dev:cloud`. Abra a porta 3000 encaminhada pelo Codespaces e mantenha sua visibilidade **privada**. Se o ambiente for exposto por HTTPS, configure `COOKIE_SECURE=true`. O Codespaces depende da cota e das condições da conta; sua criação não foi executada nesta tarefa.

Código enviado ao GitHub pode ser retomado em outro computador. Os bancos local e do Codespaces são independentes. Acesso ao mesmo histórico de aprendizagem em diferentes navegadores depende da futura implementação de contas e de um banco compartilhado.

## Banco e migrações

As migrações SQL ficam em `migrations/`. O comando `npm run db:migrate` aplica apenas migrações novas, dentro de uma transação, com bloqueio para evitar execução concorrente. O histórico inclui um checksum: não altere uma migração já aplicada; crie outra.

`DATABASE_URL` é lida somente no servidor e nas ferramentas de banco. Não use prefixo NEXT_PUBLIC para senhas. Configure TLS pela URL de conexão conforme o provedor escolhido; não desabilite a verificação de certificado.

## Documentação

- [Interface e primeiro acesso](docs/INTERFACE-E-PRIMEIRO-ACESSO.md)
- [Arquitetura e limites da primeira versão](docs/ARQUITETURA.md)
- [Requisitos](docs/REQUISITOS.md)
- [Plano de publicação](docs/PUBLICACAO.md)
- [Docker para começar](docs/DOCKER.md)
- [Fluxo de contribuição e PRs](CONTRIBUTING.md)
- [Verificações da primeira versão](docs/VERIFICACAO-APLICACAO.md)

A primeira versão destina-se a uso privado de desenvolvimento. Publicação para alunos depende de autenticação, política de retenção, controle de consumo da IA e revisão do ambiente de produção.
