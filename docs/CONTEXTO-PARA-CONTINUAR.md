# EducaJá — contexto e continuidade para outra IA

> Retrato do estado conhecido em 15/10/2026. Documento solicitado pelo responsável para continuar o projeto sem acesso à conversa original. Confira o código e os serviços antes de agir: configurações externas podem mudar. Este arquivo não contém segredos e não autoriza contratação, exclusão de dados ou merge sem revisão.

## 1. Objetivo e preferências confirmadas

EducaJá é um site educacional para estudantes iniciantes em programação. Ensinar em português brasileiro com termos definidos, exemplos concretos, exercícios e progressão gradual. Não pressupor conhecimento de programação, Docker, GitHub, banco de dados ou hospedagem.

O responsável quer acessar e desenvolver o projeto de outros lugares, inclusive computadores da escola que não permitem iniciar Docker. O site publicado deve funcionar com navegador e internet, independentemente do computador de desenvolvimento estar ligado.

Decisões já confirmadas:

- Interface escura inspirada no tema Drácula, minimalista, com cantos próximos de quadrados e menos elementos arredondados. Evitar aparência genérica de interface gerada por IA.
- Menu lateral recolhível, com preferência persistida. Ordem: Assuntos, Teste inicial, Plano de estudo, Aulas. Aulas substitui o antigo nome Estudar.
- Começar pela aula 1 sem exigir objetivo ou diagnóstico. Teste inicial é opcional.
- Categorias: Java/POO, Web, PostgreSQL/SQL e IoT (Internet das Coisas).
- Conteúdo aprofundado e experiências específicas, incluindo exemplos Web funcionais e roteiros de Cisco Packet Tracer em IoT.
- PostgreSQL sem Supabase. Não substituir a stack por conveniência.
- Professor por IA deve ensinar com competência em todas as categorias. Marca não é requisito; Gemini é a integração existente. Não reescrever sem motivo concreto.
- Explicar ações e motivos em linguagem simples. Nas orientações de painéis, informar os botões, os ambientes e passos pequenos: o responsável está aprendendo essas ferramentas.
- Toda mudança deve passar por branch e PR. Não fazer push direto na main nem merge sem revisão/autorização. O responsável tem realizado os merges. Já foi explicado que um PR exige primeiro um commit diferente na branch de trabalho.

## 2. Localização e infraestrutura existente

| Recurso              | Identificação                                                             |
| -------------------- | ------------------------------------------------------------------------- |
| Repositório          | https://github.com/FR4NC0-11/EducaJa                                      |
| Pasta local original | `C:\Users\coron\OneDrive\Documentos\ProjetosVSCODE\Sites\EducaJa\EducaJa` |
| Produção             | https://educa-ja.vercel.app                                               |
| Vercel               | Projeto `educa-ja`, espaço nos links `jean-82db`                          |
| Neon                 | Projeto `EducaJa`, ID `curly-mouse-38979633`                              |
| Branch Neon          | `production`, ID `br-orange-glitter-b7kbu3xm`                             |
| Banco                | PostgreSQL 17, banco `educaja`, região AWS US East 1                      |

A branch `production` do Neon é uma branch de banco, não uma branch Git. IDs públicos não são credenciais. Não registrar URL PostgreSQL completa, senha, token ou chave neste arquivo.

O espelho ChatGPT em `.codex/.chatgpt-projects/` pode conter material sincronizado. Arquivos sob `sources/` nesse espelho são somente leitura; o código editável está no repositório acima.

## 3. Estado atual e evidências

### Confirmado

- PR #9 integrado à main pelo responsável, merge `880236f`; implementação `f4a0247`.
- Produção Vercel Ready na main e domínio definitivo associado.
- Um navegador sem sessão Vercel abriu o domínio definitivo e carregou os quatro assuntos, sem erro inicial de progresso.
- Banco Neon separado do banco local, migrações 001–004 aplicadas e conexão TLS verificada. Nenhum dado local foi copiado.
- No Preview do PR #9, o responsável abriu aula e confirmou que anotações permaneceram após atualizar a página.
- Aulas, laboratórios, contas, confirmação por código e integração Gemini implementados, com verificações descritas abaixo.

### Ainda não confirmado ou não concluído

- Repetir o teste de salvar anotação/recarregar no domínio definitivo. A confirmação anterior foi no Preview.
- Acesso pela rede da escola e teste com computador local fisicamente desligado ainda não realizados. A arquitetura hospedada não depende dele.
- Resend/remetente e entrega real de códigos ainda não configurados/validados. Cadastro/login dependem desses códigos; a interface explica a indisponibilidade.
- Professor exige usuário autenticado. A publicação inicial foi orientada com `AI_ENABLED=false`.
- Chave Gemini existe privadamente no ambiente local. Não foi confirmado que esteja na Vercel; não presumir transferência.
- Recuperação/alteração de senha, revogação de todas as sessões, política de dados, backups/restauração e avaliação pedagógica ampla pendentes.
- Planos iniciais: Vercel Hobby e Neon free. Não houve contratação paga. Não prometer disponibilidade ilimitada, ausência de suspensão ou gratuidade em qualquer escala.

## 4. Arquitetura e versões

Navegador → Next.js na Vercel → PostgreSQL no Neon. O servidor chama Resend e Gemini quando configurados. Segredos não são expostos ao navegador.

Versões fixadas na data deste registro: Node 24 (`>=24 <25`), Next 16.4.1, React/React DOM 19.3.1, TypeScript 7.0.2, pg 8.23.1, Zod 4.6.7, @vercel/functions 3.10.1 e Playwright 1.64.1. Conferir package.json/lockfile antes de assumir atualidade; usar `npm ci`, sem atualizar toda a stack incidentalmente.

Next usa App Router. Ler documentação correspondente ao pacote instalado, disponível em `node_modules/next/dist/docs/` quando presente. O Next gerou um AGENTS.md local com essa orientação, que estava não rastreado antes desta documentação. Não apagar ou incluir arquivos incidentais sem avaliar o contexto.

Não há ORM. SQL parametrizado com node-postgres. `lib/db.ts`: pool máximo 5 por instância, timeout ocioso de 30 s, timeout de conexão configurável1–30s, integração `attachDatabasePool` na Vercel.

GitHub guarda código e histórico. GitHub Pages não executa as rotas de autenticação/IA/banco desta aplicação; não substituí-la por exportação estática. Codespaces é desenvolvimento, não hospedagem permanente. Docker continua útil localmente; visitantes não precisam dele.

## 5. Mapa do código

| Arquivos                                                     | Função                                                |
| ------------------------------------------------------------ | ----------------------------------------------------- |
| `components/learning-app.tsx`                                | Interface e navegação principal                       |
| `components/account-panel.tsx`                               | Conta, senha visível/oculta e confirmação             |
| `components/course-home.tsx`                                 | Apresentação do estudo                                |
| `components/lesson-demo.tsx`                                 | Laboratórios interativos                              |
| `components/teacher-chat.tsx`, `evaluation-summary.tsx`      | Professor e avaliação                                 |
| `lib/catalog.ts`                                             | Catálogo e diagnóstico                                |
| `lib/curriculum.ts`, `lib/curriculum-*.ts`                   | Aulas detalhadas das quatro trilhas                   |
| `lib/learning.ts`, `lib/workspace.ts`                        | Contratos, regras e persistência                      |
| `lib/session.ts`, `lib/auth.ts`, `lib/password.ts`           | Visitante, conta, sessões e senha                     |
| `lib/access-code.ts`, `lib/auth-contract.ts`, `lib/email.ts` | Códigos e envio Resend                                |
| `lib/http.ts`, `lib/rate-limit.ts`                           | Origem, JSON, tamanho e limites                       |
| `lib/teacher.ts`, `lib/gemini-teacher.ts`                    | Professor e provedor                                  |
| `lib/teacher-contract.ts`, `lib/diagnostic-reference.ts`     | Contratos, rubrica e referências                      |
| `app/api/workspace/route.ts`                                 | Progresso                                             |
| `app/api/auth/route.ts`                                      | Autenticação                                          |
| `app/api/teacher/route.ts`                                   | IA, maxDuration de 90 s                               |
| `app/api/health/route.ts`                                    | Consulta banco, status ok ou503 sem detalhes secretos |
| `migrations/`, `scripts/migrate.mjs`                         | Migrações SQL                                         |
| `scripts/cloud-config.mjs`, `scripts/check-cloud.mjs`        | Validação de nuvem                                    |
| `scripts/migrate-cloud.mjs`                                  | Migração controlada por conexão direta                |
| `vercel.json`                                                | Instalação e build hospedado                          |
| `.github/workflows/ci.yml`, `.devcontainer/`                 | CI e desenvolvimento Codespaces                       |

## 6. Conteúdo e fluxo educacional

São 36 aulas, nove por categoria, com IDs antigos preservados. Dez questões de diagnóstico por categoria, quarenta no total.

- Java: fundamentos, objetos, encapsulamento, coleções, exceções, igualdade, composição, testes e projeto.
- Web: estrutura, estilos, DOM/eventos, formulários, API/carregamento/falha, acessibilidade, estado e projeto responsivo.
- SQL: consultas, relacionamentos, JOIN, agregações, NULL, modelagem, índices, permissões e concorrência.
- IoT: sensores/atuadores, conectividade, IP, três práticas Cisco Packet Tracer, MQTT e projeto.

Laboratórios: formulário, catálogo/carrinho, painel assíncrono, portal responsivo, demonstração de estado de objetos, JOIN didático e temperatura/perda de comunicação IoT.

São demonstrações no navegador, não executor real de Java/SQL nem controle de hardware. Cisco exige aplicativo externo; não foram criados arquivos .pkt nem executados testes no Packet Tracer. Não inventar execução.

Ordenação de aulas compatibiliza recomendações antigas com novas aulas por lógica como `orderedTopicLessons`. Avaliações novas exigem todos os IDs atuais da categoria sem duplicação. Documentos históricos com três aulas não descrevem o currículo atual.

## 7. Contas, progresso e proteções

- Senha de 8–255 caracteres validada no cliente/servidor, botão mostrar/ocultar. scrypt com salt aleatório, N=32768, r=8, p=3, derivação de 64 bytes. Não armazenar texto puro ou truncar silenciosamente.
- E-mail normalizado; validação de formato não comprova existência/posse. Código recebido faz essa confirmação; não restringir por lista fechada de provedores.
- Cadastro e cada novo login exigem código aleatório de seis dígitos no mesmo navegador, dez minutos, uso único, até cinco erros. Reenvio a cada 60 s, até três envios por desafio; erros persistem.
- Conta/sessão somente após confirmar. Cadastro preserva progresso visitante e revoga o token anônimo antigo. Login em conta existente não mistura outro progresso automaticamente.
- Sessão de conta: sete dias, token aleatório de 256 bits, só hash no banco, cookie HttpOnly/SameSite=Lax. Logout revoga apenas a sessão atual.
- Visitante: cookie com expiração de 30 dias, não sincroniza automaticamente outro navegador.
- Autenticação limitada no banco: oito tentativas/e-mail/15min e cem globais/10min, incluindo sucessos. Proteção inicial, não solução completa de abuso.
- Consultas vinculadas ao perfil resolvido no servidor; não aceitar ID de outro usuário. Escritas exigem Origin correta, JSON e campos validados.
- Expiração durante escrita não pode gravar silenciosamente em perfil diferente. Duas abas não são edição colaborativa; em conflitos de escrita simples pode prevalecer a última gravação.
- Recuperação de senha ainda não existe. Não criar sessão verificada manualmente nem bypass de código.

Migração 004 revogou sessões antigas sem confirmação de e-mail, preservando contas/progresso. Não repetir sua lógica manualmente em produção.

## 8. Professor Gemini e avaliação

Modelo padrão `gemini-3.5-flash-lite`, configurável. `gemini-3.8-flash` apresentou timeout/503; troca validada por conversa/avaliação reais sintéticas. Não garante qualidade universal ou validação pedagógica completa.

- Ativação: AI_ENABLED=true, chave somente no servidor, usuário autenticado e controles de consumo/gasto.
- Contexto: assunto, aula, objetivo e diagnóstico. Nome/e-mail/senha/tokens não são deliberadamente enviados, mas estudante pode inserir dados pessoais; rever política antes de alunos reais.
- Guarda até 60 mensagens/assunto, últimas 12 entram em novo contexto.
- Máximo duas tentativas em falha transitória de rede/408/500/502/503/504, intervalo de 1 s, 45 s/tentativa e 75 s total. Não repetir quota/chave/permissão ou trocar modelo silenciosamente.
- Reserva por perfil de 90 s evita concorrência; função Vercel de 90 s.
- Padrões de 20 pedidos/conta e 200 globais/24h; falhas podem consumir cota local. Isso não é teto financeiro externo. Saída de 1600 tokens em conversa e 6000 em avaliação, incluindo raciocínio.
- Rubrica: conceitos 0–4, aplicação 0–3, raciocínio 0–2, clareza 0–1. Soma 0–10, média das dez respostas no servidor.
- Ainda não sei explícito recebe zero por regra do servidor.
- Validar estrutura, dez índices sem repetição, feedback e todos os IDs de aulas. Falha/saída incompleta não vira nota fictícia.
- Avaliação atrasada não sobrescreve respostas editadas; controle por updated_at.
- Professor não executa código nem hardware. Revisão técnica/pedagógica necessária.

Verificar termos atuais e tratamento de dados do provedor antes de estudantes reais. Não foi assumida retenção zero ou aprovação para uso escolar.

## 9. Ambientes, variáveis e incidentes de publicação

Configuração de produção orientada:

| Variável                               | Valor/finalidade                                        |
| -------------------------------------- | ------------------------------------------------------- |
| APP_ORIGIN                             | `https://educa-ja.vercel.app`, sem barra final          |
| COOKIE_SECURE                          | `true`                                                  |
| DATABASE_URL                           | Segredo Neon pooled, banco educaja, sslmode=verify-full |
| DB_CONNECTION_TIMEOUT_MS               | `10000`                                                 |
| AI_ENABLED                             | `false` no piloto                                       |
| GEMINI_MODEL                           | `gemini-3.5-flash-lite` ao configurar IA                |
| GEMINI_API_KEY                         | Segredo a verificar/configurar privadamente             |
| AI_DAILY_LIMIT / AI_GLOBAL_DAILY_LIMIT | 20 /200 inicialmente                                    |
| RESEND_API_KEY / EMAIL_FROM            | Pendentes de ativação real                              |

Exemplos sem segredos: `.env.example`, `.env.cloud.example`. `.env`, `.env.cloud`, `.vercel/` e `.cache/` privados/ignorados. Nunca prefixar segredo com NEXT_PUBLIC_.

Preview e Production têm configurações independentes. Entrada específica de branch tem prioridade sobre padrão Preview; alterar o padrão não corrige sobreposição antiga.

Preview validado: branch Git `deploy/vercel-neon`, origem `https://educa-ja-git-deploy-vercel-neon-jean-82db.vercel.app`. Essa branch cumpriu a implementação, não deve receber todas as mudanças futuras. Criar branches novas da main.

O mesmo banco foi utilizado nas orientações manuais do piloto Preview/Production; não presumir isolamento pelos nomes dos ambientes Vercel. Antes de testes adicionais de PR/dados reais, separar banco/branch Neon de teste com migrações e credenciais próprias. Nunca rodar suíte automatizada em produção.

Runtime usa conexão pooled. Migração usa conexão direta `MIGRATION_DATABASE_URL`, guardada no ambiente privado de quem migra; runtime não precisa dela. O comando exige mesmo endpoint/banco nas duas conexões. Não confundir migração de esquema com cópia de dados locais.

`build:cloud` valida configurações e compila; não migra nem prova conectividade. Não remover checagens para forçar deploy. Falta de e-mail gera aviso e permite aulas de visitante.

Incidentes e soluções:

1. Build bloqueado por origem/cookie/banco ausentes. Corrigido configurando o ambiente correto; valores Preview não são automaticamente Production.
2. Ready não comprovava banco: versão antiga da main tinha falha de progresso. Testamos revisão do PR correta depois.
3. Origem não permitida: Visit abriu alias exclusivo diferente de APP_ORIGIN. Domínio canônico correto resolveu. Não aceitar qualquer Origin nem remover proteção. Se necessário, projetar lista explícita testada.
4. Preview pedia login Vercel. Produção no domínio definitivo abriu sem esse login. Conta Vercel é diferente de conta EducaJá.
5. Navegador interno travou no login Vercel; responsável usou navegador externo com orientação/capturas. Plugin instalado não provou autenticação/acesso. Conferir ferramentas reais antes de afirmar conexão.
6. Senha PostgreSQL foi exposta na conversa. Solicitada rotação Neon e atualização de todas as entradas Vercel. Confirmação explícita da rotação não registrada: verificar com responsável sem pedir chave pelo chat; não reutilizar credenciais de histórico/cache.

## 10. Desenvolvimento e testes

Node 24 e Docker local preparados. Em instalação nova, criar .env com senha própria a partir do exemplo. Preservar .env existente; não trocar banco local pelo Neon.

```text
npm ci
docker compose up -d --wait db
npm run db:migrate
npm run dev
```

Local: http://127.0.0.1:3000/. Processo dev precisa ficar executando para esse endereço, independentemente da produção hospedada.

Migrações: 001_learning.sql,002_accounts.sql,003_teacher.sql,004_email_confirmation.sql. schema_migrations registra checksum. Transação e advisory lock protegem aplicação concorrente. Criar migração nova; não alterar aplicada, apagar histórico ou recriar banco para contornar erro.

```text
npm test
npm run typecheck
npm run format:check
npm run build
npm run test:e2e
npm run test:ai-integration
```

Navegador exige build e PostgreSQL de testes migrado. Fora do CI usa Edge: porta 3002 para navegação/autenticação,3001 para IA simulada. Configuração carrega .env; confirmar DATABASE_URL efetiva de teste antes de rodar. Preferir banco temporário local por execução para não afetar dados/cotas existentes.

Fixtures de e-mail/Gemini são importadas explicitamente pelos processos de teste. Não habilitar em produção, expor códigos ou criar professor falso. IA simulada não faz chamada paga nem valida pedagogia.

Última verificação da implementação PR #9: build, tipos/formatação aprovados;16 testes unitários,16 de navegador/API e3 de IA simulada,35 no total. Banco temporário local foi removido ao fim. Esses números são histórico, não uma nova execução ao ler o arquivo.

Repetir integração no mesmo banco pode gerar 429 por limites globais persistidos. Não limpar contadores de produção. O helper de laboratórios foi corrigido para esperar GET inicial de workspace antes do POST de início, evitando corrida de cookies visitantes.

CI: Ubuntu,Node 24,PostgreSQL 17,Chromium; migrações duas vezes para idempotência, regras, tipos, build, navegador e IA simulada. Conferir status atual do PR.

## 11. Próximas tarefas, ordem e critérios de conclusão

### A. Encerrar verificação de produção

- Confirmar rotação da senha exposta e atualização das entradas de ambiente/branch, sem solicitar segredo em conversa.
- No domínio definitivo: escolher tema, abrir aula, salvar anotação, recarregar e retomar. Verificar saúde /api/health, ausência de erro de origem e banco.
- Testar acesso sem login Vercel, em outra rede/computador. Progresso visitante não é compartilhado automaticamente entre navegadores.
- Conferir main como branch produção e separar banco de testes dos dados de produção antes de testes de PR ou público real.
- Atualizar documentos de publicação, alguns ainda registram hospedagem pendente.

Concluído quando domínio público funciona, persistência no mesmo navegador foi verificada, credencial rotacionada confirmada e ambientes identificados.

### B. Configurar e-mail real — próxima integração principal

1. Ler CONFIRMACAO-EMAIL.md e lib/email.ts.
2. Verificar se responsável tem conta Resend/domínio próprio. Não presumir domínio disponível ou contratar.
3. Teste privado: conferir regras vigentes de remetente de teste e destinatário autorizado. Esse teste não libera envio geral a alunos.
4. Cadastro público: verificar domínio/remetente e registros DNS solicitados pelo provedor.
5. Configurar RESEND_API_KEY e EMAIL_FROM privadamente na Vercel, ambiente correto; redeploy.
6. Testar entrega real/spam, cadastro preservando progresso, código errado/expirado/reenvio, logout e login em outro navegador. Falha de envio nunca deve criar conta/sessão.

Concluído quando códigos chegam e o fluxo real funciona, com restrições de destinatários explícitas. Não contornar confirmação para acelerar demonstração.

### C. Ativar professor na nuvem

- Após contas funcionarem, configurar chave Gemini privada/modelo verificado e controles de consumo/gasto.
- AI_ENABLED=true somente no ambiente autorizado, redeploy e teste real com conta de teste/conteúdo sintético.
- Conferir conversa/avaliação persistidas, limites, dez questões/nove aulas e descarte de avaliação atrasada.
- Executar protocolo AVALIACAO-PEDAGOGICA.md nas quatro categorias; não prometer mestre infalível por uma chamada bem-sucedida.
- Rever condições e tratamento de dados antes de alunos reais. Não trocar provedor só por disponibilidade de outro plugin.

Concluído quando fluxo real validado, limites controlados e qualidade/limitações revisadas.

### D. Contas e operação para público real

Implementar por PRs pequenos: recuperação/alteração de senha com token seguro/uso único; revogação de todas as sessões; exclusão/retenção de dados; limpeza de desafios/visitantes expirados; monitoramento de abuso/entrega; usuário PostgreSQL de privilégio mínimo separado do migrador; backup e restauração testada. Definir público inicial e regras de dados de estudantes antes de tratar piloto como serviço escolar consolidado.

### E. Evolução educacional

Revisar compreensão dos iniciantes, conteúdos complexos e instruções Cisco; melhorar laboratórios e acessibilidade com testes reais. Preservar visual e fluxo aprovados. Confirmar prioridade com responsável após estabilizar operação, sem redesign ou reescrita ampla incidental.

## 12. Histórico e leitura complementar

- PRs iniciais: ambiente, aplicação, visual escuro, contas/IA, Gemini e confirmação de e-mail.
- [PR7](https://github.com/FR4NC0-11/EducaJa/pull/7): disponibilidade Gemini, retry limitado, zero em Ainda não sei e menu.
- [PR8](https://github.com/FR4NC0-11/EducaJa/pull/8):36 aulas e laboratórios; merge fb53c39.
- [PR #9](https://github.com/FR4NC0-11/EducaJa/pull/9): Vercel/Neon, validação nuvem, pool e indisponibilidade de e-mail; merge 880236f.

Documentos: [Publicação](PUBLICACAO.md), [E-mail](CONFIRMACAO-EMAIL.md), [Gemini](CONFIGURAR-GEMINI.md), [Contas/professor](CONTAS-E-PROFESSOR.md), [Avaliação pedagógica](AVALIACAO-PEDAGOGICA.md), [Aulas/laboratórios](AULAS-E-LABORATORIOS.md), [Interface](INTERFACE-E-PRIMEIRO-ACESSO.md), [Docker](DOCKER.md), [Arquitetura](ARQUITETURA.md), [Requisitos](REQUISITOS.md), [Contribuição](../CONTRIBUTING.md).

Há documentos históricos com três aulas, sem contas ou publicação pendente. Este guia consolida estado posterior; verificar código/datas/painéis em conflitos, sem apagar histórico.

## 13. Procedimento para a IA que retomar

1. Ler guia, CONTRIBUTING e instruções locais aplicáveis; conferir pasta/remoto/status/branch/main sem sobrescrever trabalho do responsável.
2. Resumir entendimento e próxima ação concreta, sem pedir repetição de toda a conversa.
3. Conferir autenticação real dos serviços. Se ação exigir painel manual, orientar passos específicos sem solicitar credenciais no chat.
4. Criar branch nova da main atual, implementar escopo autorizado, testar proporcionalmente e revisar diff. Não incluir .env, caches ou alterações incidentais.
5. Abrir PR descrevendo problema, resultado, verificações e limitações. Responsável revisa/faz merge; não forçar checagem com falha.
6. Deploy deve verificar revisão/ambiente/domínio canônico, saúde e persistência. Ready sozinho não comprova fluxo completo.
7. Atualizar este guia com data e evidência quando estado ou decisão mudar. Nunca inserir segredos, códigos ou dados pessoais de estudantes.

Primeiro concluir verificação de produção e envio real de e-mail. Não recriar aplicação ou banco: já existem e o site está publicado.

## 14. Redirecionamento canônico (16/10/2026)

Alteração proposta em branch: `proxy.ts` redireciona GET/HEAD de hosts alternativos `*.vercel.app` exclusivamente quando `VERCEL=1` e `VERCEL_ENV=production`, para `https://educa-ja.vercel.app`, preservando caminho e consulta. Destino fixo, status 307 e Cache-Control no-store evitam destino controlado pelo visitante e cache permanente. Não usa X-Forwarded-Host como destino. POST/PUT/PATCH/DELETE não são redirecionados; a validação de Origin/CSRF em lib/http.ts permanece intacta. Cookies/progresso de outro domínio não são transferidos.

Produção continua exigindo APP_ORIGIN=https://educa-ja.vercel.app. Preview mantém sua APP_ORIGIN específica, sem redirecionamento; desenvolvimento local também permanece independente. As variáveis de sistema Vercel precisam estar disponíveis. Domínios personalizados não são afetados. Testes em tests/canonical-domain.test.ts cobrem destino, ambientes, métodos e rejeição de origens. Deploy real e persistência dependem de verificação após revisão/merge pelo responsável; não foram realizados nesta alteração.

## 15. Contas sem código — decisão de 16/10/2026

O responsável solicitou suspender temporariamente a confirmação para permitir contas com e-mails de outros usuários enquanto o domínio de envio não está disponível. A proposta usa AUTH_EMAIL_VERIFICATION=false por padrão; detalhes, limites e reativação estão em CONFIRMACAO-EMAIL.md. Esta seção substitui a obrigatoriedade anterior de código para o modo temporário. Não marca e-mails como verificados nem altera migrações aplicadas. Mudança em branch/PR; verificar estado do merge e deploy antes de presumir ativação.

## 16. Adaptação do professor — 16/10/2026

Primeira correção incremental: contexto de conversa passa a informar estado do diagnóstico e aulas concluídas válidas da trilha. Orientação explícita usa feedback por questão nas explicações/exercícios pertinentes, pede tentativa curta e ajusta o próximo passo ao histórico, sem presumir domínio pela média ou conclusão. Não há novas notas, migrações ou mudanças em interface, autenticação/cotas e provedor. Protocolo e limitações em AVALIACAO-PEDAGOGICA.md; validação humana com Gemini nas quatro trilhas continua pendente.

## 17. Correção recorrente de Preview — 16/10/2026

Logs do deployment GXnun5HMMAw9o2RcHJFnHaUQWVuq do PR #14 mostraram ausência de APP_ORIGIN e COOKIE_SECURE nas novas branches. Correção no próprio PR: lib/deployment-config.mjs compartilha resolução de origens de Preview (VERCEL_BRANCH_URL/VERCEL_URL) entre validação do build e rotas; cookies sempre Secure na Vercel. Produção continua exigindo APP_ORIGIN. Rota workspace passa pela mesma validação JSON/origem usada em autenticação e professor, eliminando regra duplicada. Ver PUBLICACAO.md. Não alterar segredos ou banco para resolver esse erro.

## 18. Evidências do diagnóstico por aula — 17/10/2026

PR #14 integrado na main f37ff37. Próxima etapa associa editorialmente as quarenta questões a conceitos e aulas, fornecendo evidências específicas da aula ao professor. Notas localizadas por índice, sem classificação pela média, novos bloqueios, migrações ou alterações de cotas. Protocolo/limitações em AVALIACAO-PEDAGOGICA.md; Gemini real ainda depende de revisão humana.

## 19. Entrada por área de estudo — 17/10/2026

A entrada passa a oferecer Programação e Ensino Médio antes dos assuntos. Programação mantém as quatro trilhas, professor, conta e progresso existentes. Ensino Médio apresenta Matemática, Linguagens, Ciências Humanas e Ciências da Natureza como conteúdos em preparação; não há aulas, diagnósticos, novos IDs ou chamada de IA nessa área. A cada recarga a pessoa volta à escolha de áreas; Trocar de área preserva progresso e exige salvar rascunhos. Conteúdos do Ensino Médio serão definidos em etapa posterior com referências autorizadas pelo responsável. Nenhum site externo foi acessado nesta etapa.

## 20. Referência curricular do Ensino Médio — 17/10/2026

Levantamento autorizado no Geekie One, em Minhas matérias, com recorte visível de 3ª série. Mapa sintetizado e propostas autorais em ENSINO-MEDIO-MAPA-CURRICULAR.md. Catálogos: Matemática (43 capítulos), Linguagens (35), Humanas (21, foco em Geografia) e Natureza (12, foco em genética/Biologia). Índices dos três trimestres e dois sumários internos consultados; não houve leitura integral das 111 unidades. Física/Química e História/Filosofia/Sociologia não foram observadas como catálogos próprios neste acesso. Documento em rascunho local para revisão; não cria aulas, não ativa professor de Ensino Médio e não abre PR nesta etapa. Responsável mencionou PR posterior com squash; não implica autorização de merge.

## 21. Primeiras unidades da 3ª série — 17/10/2026

Recorte confirmado pelo responsável. Implementação em lib/secondary-curriculum.ts: quatro temas com uma aula autoral cada, sem reprodução de capítulos ou exercícios da referência. Matemática/contagem, Linguagens/interpretação, Humanas/dados populacionais e Natureza/hereditariedade. IDs em3- preservam as sessões de programação. Catálogo de programação permanece com quatro temas; getTopic também resolve os novos temas. Conclusão e notas usam a persistência existente, sem migração. Diagnóstico e IA de Ensino Médio ficam fora desta etapa, bloqueados no contrato da API e ausentes da interface. Planejamento e referências em ENSINO-MEDIO-MAPA-CURRICULAR.md. Merge só após revisão do responsável; squash pode reunir os commits deste PR.

## 22. Ampliação para 18 aulas e redação Enem — 17/10/2026

Ampliação autoral preservando os quatro IDs de tema e as quatro primeiras aulas: Matemática 4 aulas; Linguagens 6 (interpretação + 5 de redação); Humanas 4; Natureza 4. Conteúdo adicional em secondary-expansion.ts e secondary-essay.ts, com estrutura compartilhada em secondary-lesson.ts. Redação inclui projeto para buscar nota 1000, argumentação/repertório, coesão/escrita formal, intervenção e oficina de versão completa/revisão. Meta de alto desempenho não é promessa de nota; sem correção automática de redação. Rascunho usa anotações por aula, até 4.000 caracteres, sem histórico de versões ou simulação de folha oficial. IA/diagnóstico escolares continuam bloqueados.

Fontes: notícias e página da cartilha Enem 2026 do Inep, OBMEP/IMPA, IBGE Educa e NHGRI; URLs nas aulas e no mapa curricular. O PDF da cartilha e da matriz não carregou nesta sessão; critérios confirmados no texto oficial do portal, sem afirmar leitura integral do PDF. No Geekie One, revisados índice de Linguagens e sumário de projeto de texto; sem copiar aulas, baixar vídeos ou enviar atividades. Revisão humana pedagógica continua recomendada. Sem migração, alteração de segredos ou merge automático.

## 23. Voltar e apresentação escura do Ensino Médio — 17/10/2026

Botão explícito de navegação no conteúdo: Assuntos → áreas; aula/teste/plano → assuntos da área atual. Não usa histórico do navegador nem sai do site; bloqueia retorno com rascunhos não salvos e durante pedidos. Ensino Médio recebe cabeçalho editorial, identidade discreta por matéria, amostra de aulas e contagem de conclusões reais (não domínio). Destaque de redação abre diretamente em em3-redacao-projeto, preservando o diálogo de objetivo. Entrada de áreas e painéis escolares mantêm fundos escuros e responsividade. Sem alterações em conteúdo, IDs, banco, IA/cotas ou segredos. Testes de navegador cobrem destino de retorno, proteção de rascunhos, destaque de redação e tela estreita; inspeção visual local de computador/celular. Banco local não configurado; progresso validado no CI isolado. Integração somente após revisão do responsável.

## 24. T.I., Git/GitHub e orientação SAEP — 17/10/2026

Após PR #19 integrado (main 23cbc30), quinta matéria de Programação: ti-git-github, nove aulas, dez questões com referências e vínculos diagnósticos. Demonstrações guiadas de Git Bash são simulações sem execução; duas capturas reais oficiais GitHub Docs ficam locais com atribuição/licença. Roteiro SAEP por trilha visível nos assuntos/aulas e contexto do professor: projeto existente, camadas, CRUD, autenticação/autorização, SQL, filtros/paginação, estoque/transação/concorrência, rastreabilidade, testes, documentação e entrega. Orientações fornecidas pelo responsável, sujeitas a mudanças; não representam garantia de prova ou cobertura completa. Demais IDs e nove aulas por matéria preservados (45 aulas de Programação). Sem migração, segredos, dados de produção ou alteração de cotas. Preparação offline é orientação de treino, não modo offline do site. Detalhes, fontes e limitações em PREPARACAO-SAEP.md. Revisão humana pedagógica e Gemini real permanecem pendentes; não há merge automático.

## 25. Ampliação do Ensino Médio para 26 aulas — 17/10/2026

Após PR #20 integrado (main ed15fb9), oito novas aulas autorais em secondary-next-lessons.ts, duas por área: estatística/geometria analítica; variação linguística/inglês; regionalização/mapas; expressão gênica/mutações e evolução. Usa o mapa anterior do Geekie One e fontes públicas complementares, sem nova consulta integral ou cópia de aulas. Mantém os quatro IDs, as 18 aulas anteriores e a sequência de redação; contagens 6/8/6/6. Anotações/conclusão seguem a persistência existente, sem migração. Diagnóstico e professor escolares continuam bloqueados. Tema escuro, Programação, segurança e cotas preservados. Novos testes conferem IDs/ordem e persistência de uma aula nova por área. Revisão humana de conteúdo e novos recortes em ENSINO-MEDIO-MAPA-CURRICULAR.md. Não há merge automático.

## 26. Dez aulas em cada matéria do Ensino Médio — 17/10/2026

Base main 3347526 após PR #21. Pedido de no mínimo nove atendido com dez aulas por área (40 no total), acrescentando 14 aulas em secondary-completion.ts: Matemática +4 (complexos, polinômios, binomial, cone), Linguagens +2 (referentes, third conditional), Humanas +4 (demografia, urbanização, integração, indicadores), Natureza +4 (ABO, modelo ligado ao X, cromossomos, genoma/ética). Mantém as 26 anteriores, IDs, ordem, cinco aulas de redação e notas. Fontes e limitações em ENSINO-MEDIO-MAPA-CURRICULAR.md; usa levantamento anterior da Geekie, sem reprodução. Sem migração/segredos/produção ou ativação de IA escolar. Testes de conteúdo e navegador conferem mínimo solicitado, integração/isolamento e persistência da última aula de cada área. Não há merge automático; revisão pedagógica humana recomendada.

## 27. Simulados do Ensino Médio — 18/10/2026

Base main c9329d3 após PR #22. Nova aba escolar Simulados: 80 questões autorais, 20 por matéria/duas por aula, cinco alternativas, padrão 20 e quantidade de 1 ao banco selecionado. Sorteio equilibra áreas/níveis disponíveis sem repetir itens na tentativa e embaralha alternativas. Navegação, limpar/pular, confirmação, resultado objetivo e revisão comentada com referência à aula; não é diagnóstico pedagógico nem nota oficial. Uma tentativa local no navegador, sem sincronização com conta; restauração validada e aviso de falha. Rascunhos de aula protegidos ao trocar para a aba. Sem Gemini, migração, alteração de dados de produção/cotas ou do teste de Programação. Diagnóstico posterior explicitamente adiado conforme pedido. Arquitetura, testes, limites e próximos passos em SIMULADOS-ENSINO-MEDIO.md. Revisão humana do banco recomendada; merge depende do responsável.

## 28. Terceira área: Direito — 18/10/2026

Base main bdc3902 após PR #23. Nova entrada e tela de Direito brasileiro com identidade de biblioteca jurídica: verde/grafite escuro, dourado, serifas, balança e índice romano. Oito matérias exploráveis por prévias (Introdução, Constitucional, Civil, Penal, Administrativo, Processual, Trabalho, Consumidor), explicitamente com aulas em preparação. Sem aulas, progresso jurídico, IA ou simulados nesta etapa; dados de prévia ficam fora do catálogo. Navegação/voltar e isolamento do tema ativo preservam Programação/Ensino Médio, rascunhos e tentativa do simulado. Três testes de navegador cobrem exploração, teclado/celular/tema, posição abaixo do menu fixo e persistência anterior. Sem migração, segredos, cotas ou dados de produção. Detalhes e próximos passos em AREA-DIREITO.md; conteúdo jurídico e fontes oficiais serão tratados na etapa de aulas. Merge depende do responsável.

## 29. Navegação exclusiva de celular — 18/10/2026

Base main 171f840 após PR #24. Até 700 px, menu lateral vira navegação inferior com Áreas e destinos da área; cabeçalho compacto fixa contexto/conta/ajuda. Entrada compacta das três áreas, atalho para matérias escolares e menos blocos decorativos antes do conteúdo. Lista de aulas recolhida no celular; seleção e próxima aula focam o título. Computador mantém lista/menu lateral. Protege anotações pendentes e preserva progresso, simulados, temas escuros, conta e cotas. Sem mudanças de banco/IA/conteúdo. Três novos fluxos de navegador, adaptação dos acessos móveis de T.I. e referência do cabeçalho no teste de Direito. Detalhes/limitações em EXPERIENCIA-CELULAR.md. Merge depende de revisão do responsável.

## 30. Cinco aulas novas por matéria: 3º trimestre — 19/10/2026

Base main 91147be após PR #25. Nova consulta autorizada aos quatro índices da Geekie One, recorte de 3ª série/3º trimestre. Vinte aulas autorais em secondary-third-term.ts, cinco por área, anexadas às quarenta anteriores: esfera/transformações/probabilidade contínua/pesquisa/cônicas; coerência/pontuação/crase/concordância/discurso; estudos regionais da Ásia, Oceania e polos; controle celular/somáticas e germinativas/fermentação/PCR/DNA recombinante. Total 60, quinze por matéria; IDs e ordem anteriores preservados. Fontes, recorte, simplificações e próximos passos em ENSINO-MEDIO-TERCEIRO-TRIMESTRE.md. Não houve leitura integral ou cópia de capítulos. Simulado mantém 80 questões das 40 aulas iniciais e recebe aviso explícito de cobertura; expansão do banco fica para outra entrega. Sem migração, produção, segredos ou ativação de IA escolar. Merge depende do responsável; revisão pedagógica humana continua recomendada.
