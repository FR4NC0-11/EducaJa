# EducaJá

Primeira versão do site educacional de programação, com Next.js, TypeScript e PostgreSQL, sem Supabase.

## O que já funciona

- Escolha entre programação com Java, criação de sites, banco de dados e IoT (Internet das Coisas).
- Início direto pela aula 1, com objetivo opcional ou sugestões prontas.
- Teste inicial opcional com dez questões por assunto e opção “Ainda não sei”.
- Gravação e retomada das respostas, anotações e etapas concluídas no PostgreSQL.
- Aulas guiadas com explicações, exemplos do dia a dia, glossários e exercícios preparados.
- 45 aulas em cinco trilhas, com aprofundamento, projetos e práticas guiadas; exemplos Web interativos e roteiros de Cisco Packet Tracer em IoT. T.I. inclui nove aulas de Git/GitHub, demonstrações de Git Bash e capturas oficiais do GitHub. Preparação prática por trilha em [PREPARACAO-SAEP.md](docs/PREPARACAO-SAEP.md).
- Alternância entre aulas e plano de estudo, mantendo o progresso.
- Aba Simulados no Ensino Médio: 80 questões autorais ligadas às aulas, 20 por padrão, escolha de matéria/quantidade, dificuldades misturadas, correção comentada e uma tentativa salva no navegador. Diagnóstico pedagógico será uma próxima etapa; detalhes em [SIMULADOS-ENSINO-MEDIO.md](docs/SIMULADOS-ENSINO-MEDIO.md).
- Ensino Médio da 3ª série com 40 aulas autorais, dez por matéria: Matemática, Linguagens (incluindo redação Enem e inglês), Ciências Humanas e Ciências da Natureza. Anotações e conclusão salvas; diagnóstico/IA escolares ainda não disponíveis. Recorte e fontes em [ENSINO-MEDIO-MAPA-CURRICULAR.md](docs/ENSINO-MEDIO-MAPA-CURRICULAR.md).
- Interface escura, menu lateral recolhível e preferência salva no navegador.

**Contas:** cadastro, login com código por e-mail e saída estão implementados. A senha aceita de 8 a 255 caracteres e pode ser mostrada/ocultada. O envio exige configuração privada de Resend e remetente autorizado; sem isso, cadastro e login permanecem bloqueados. Criar uma conta preserva o progresso de visitante. Ao entrar com a mesma conta em outros navegadores que acessam esta instalação, você recupera o mesmo histórico. Bancos locais independentes continuam separados.

**Professor por IA:** a integração de conversa e avaliação está implementada, mas começa desligada. Depende de uma chave configurada somente no servidor e de validação pedagógica com o modelo real. Com a IA ativa, as notas têm justificativas e o plano de estudo pode receber uma ordem sugerida. Uma amostra real de conversa e avaliação em IoT foi verificada; a validação pedagógica completa continua pendente.

## Executar neste computador

Para acesso pela internet sem depender de Docker no computador do estudante, veja [publicação com Vercel e Neon](docs/PUBLICACAO.md). O banco na nuvem já foi preparado; o endereço público da aplicação ainda depende da implantação. A configuração de nuvem tem exemplo separado em `.env.cloud.example` e preserva o banco local.

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

Código enviado ao GitHub pode ser retomado em outro computador. Os bancos local e do Codespaces são independentes. Acesso ao mesmo histórico de aprendizagem em diferentes navegadores depende das contas já implementadas e de um banco compartilhado ainda a publicar.

## Banco e migrações

As migrações SQL ficam em `migrations/`. O comando `npm run db:migrate` aplica apenas migrações novas, dentro de uma transação, com bloqueio para evitar execução concorrente. O histórico inclui um checksum: não altere uma migração já aplicada; crie outra.

`DATABASE_URL` é lida somente no servidor e nas ferramentas de banco. Não use prefixo NEXT_PUBLIC para senhas. Configure TLS pela URL de conexão conforme o provedor escolhido; não desabilite a verificação de certificado.

## Documentação

- [Contexto completo para continuar com outra IA e próximas tarefas](docs/CONTEXTO-PARA-CONTINUAR.md)
- [Aulas e laboratórios por categoria](docs/AULAS-E-LABORATORIOS.md)
- [Senha e confirmação por e-mail](docs/CONFIRMACAO-EMAIL.md)
- [Configurar o professor com Gemini](docs/CONFIGURAR-GEMINI.md)
- [Contas e professor por IA](docs/CONTAS-E-PROFESSOR.md)
- [Ativação e avaliação pedagógica](docs/AVALIACAO-PEDAGOGICA.md)
- [Interface e primeiro acesso](docs/INTERFACE-E-PRIMEIRO-ACESSO.md)
- [Arquitetura e limites da primeira versão](docs/ARQUITETURA.md)
- [Requisitos](docs/REQUISITOS.md)
- [Plano de publicação](docs/PUBLICACAO.md)
- [Docker para começar](docs/DOCKER.md)
- [Fluxo de contribuição e PRs](CONTRIBUTING.md)
- [Verificações da primeira versão](docs/VERIFICACAO-APLICACAO.md)

Esta versão destina-se a uso privado de desenvolvimento. Antes de publicar para alunos: ativação e validação da entrega real de códigos, recuperação de senha, política de retenção, revisão pedagógica da IA, limites financeiros, HTTPS, backups e revisão operacional. As chaves devem ficar no ambiente do servidor, nunca no código.

Para testes adicionais: `npm run test:ai-integration` usa um provedor simulado, sem chamadas reais ou custos de IA.
