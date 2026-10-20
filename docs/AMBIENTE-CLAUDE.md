# EducaJá no Claude Desktop e na nuvem

19/10/2026. Repositório: `FR4NC0-11/EducaJa`. Preparação baseada na main e nas regras de `CONTRIBUTING.md`; não modifica a aplicação ou dados de produção.

## Ambiente na nuvem

Na aba Code do Claude Desktop, selecione o ambiente de nuvem **EducaJá** e o repositório **FR4NC0-11/EducaJa**. O ambiente de nuvem também pode ser usado pelo navegador em claude.ai/code, conforme a conta e os recursos disponíveis. A autenticação e a autorização de acesso ao GitHub ficam na conta do usuário; este projeto não guarda tokens.

O script do campo de configuração deve ser o conteúdo integral de `scripts/claude-cloud-setup.sh`. Ele prepara Node.js 24.22.0 e npm na VM Linux do Claude, baixados do site oficial com conferência SHA-256. Não execute esse script no Windows. A preparação de ferramentas pode ocorrer antes do clone do repositório: por isso não depende de arquivos do EducaJá nem tenta executar `npm ci` nessa etapa.

Variáveis de desenvolvimento, sem segredos:

```dotenv
AI_ENABLED=false
AUTH_EMAIL_VERIFICATION=false
COOKIE_SECURE=false
NEXT_TELEMETRY_DISABLED=1
```

Esses valores são para desenvolvimento HTTP dentro da VM. Não são configuração de publicação. Não coloque `NODE_ENV=production` no ambiente de trabalho: a instalação precisa incluir as dependências de desenvolvimento. Não copie DATABASE_URL, chave Gemini ou credenciais de produção.

O acesso à rede é uma escolha do responsável na interface Claude. O formulário observado estava em **Completo**; essa opção não foi alterada automaticamente. O script precisa alcançar nodejs.org e a instalação do projeto precisa alcançar o registro npm. Para testes de navegador pode ser necessário baixar Chromium. Configuração de rede e autorização GitHub devem ser revisadas pelo usuário na interface, não são feitas por estes arquivos.

## Primeira sessão

Até o PR desta preparação ser integrado, selecione a branch `chore/claude-desktop-setup` para que `CLAUDE.md` esteja disponível. Após aprovação/merge, novas tarefas devem partir da main atual, em sua própria branch de sessão.

Mensagem inicial sugerida:

> Este é o projeto EducaJá, FR4NC0-11/EducaJa. Leia CLAUDE.md, CONTRIBUTING.md e o final de docs/CONTEXTO-PARA-CONTINUAR.md. Confira a branch e o estado do repositório. Execute node --version, npm --version, npm ci, npm test e npm run typecheck para validar o ambiente. Não altere código ou produção nesta primeira verificação. Relate os resultados e aguarde minha próxima tarefa. Nas tarefas seguintes, use branch e PR, sem merge automático.

O Claude executa esses comandos dentro da VM. O script de configuração deixa ferramentas disponíveis; não é evidência de que o clone, a instalação ou os testes já ocorreram. Um ambiente salvo e uma sessão executada são etapas distintas.

## Banco e verificações completas

Build e testes unitários não exigem acesso ao Neon de produção. Login, anotações e testes de navegador exigem um PostgreSQL de desenvolvimento. Use um banco descartável na VM, iniciado em cada sessão, ou os serviços temporários do CI. A configuração reproduzível está em `.github/workflows/ci.yml`: PostgreSQL, migrações, reaplicação segura, testes unitários, tipos, build, Chromium, contas e IA simulada.

Não há DATABASE_URL configurada por esta entrega. Isso evita apontar por engano para produção. Até existir banco de treino, a prévia pode mostrar indisponibilidade de progresso; não contorne essa falha removendo validações nem afirme que persistência foi testada. O cache da nuvem preserva arquivos, mas não mantém serviços ligados: um banco precisa ser iniciado novamente em uma nova VM/sessão.

## Prévia e alternativa local

`.claude/launch.json` configura a prévia local do Desktop com Node e Next na porta 3011, AI desativada e origem HTTP correspondente. Instale as dependências primeiro. Essa configuração não cria um ambiente de nuvem ou banco.

Para prévia dentro da nuvem, o comando do projeto é `npm run dev:cloud -- --port 3011`; use o recurso de prévia/encaminhamento da sessão, quando disponível. Não copie variáveis de publicação para a VM.

Uma cópia de trabalho local separada pode ser usada como alternativa. Ela compartilha o histórico Git, mas tem arquivos/branch próprios. Não compartilhe a mesma pasta editável entre dois agentes trabalhando simultaneamente. As preferências pessoais `.claude/settings.local.json` e worktrees internas são ignoradas pelo Git; instruções e configuração sem segredos podem ser versionadas.

## Trabalhar em paralelo

Codex e Claude podem atuar no mesmo repositório GitHub com branches distintas. Divida o escopo — por exemplo, conteúdo em uma tarefa e interface em outra — e atualize a main antes da próxima mudança. Dois PRs que mexem nas mesmas linhas ainda podem gerar conflito; isolamento de pasta não resolve conflito de requisitos. Cada entrega precisa de testes e revisão; não há merge automático.

## Verificação e fontes

Sintaxe Bash e JSON verificadas localmente; o script não foi executado na VM nesta etapa. O contexto e o fluxo de PR foram conferidos contra o código atual. A criação do ambiente, seleção do repositório, login e primeira sessão dependem de confirmação visual na conta Claude. Registre separadamente o que foi salvo e o que foi executado.

Documentação oficial consultada:

- [Ambientes de nuvem](https://code.claude.com/docs/en/cloud-environments)
- [Claude Code na nuvem](https://code.claude.com/docs/en/claude-code-on-the-web)
- [Aplicativo Desktop e prévias](https://code.claude.com/docs/en/desktop)
- [Contexto via CLAUDE.md](https://code.claude.com/docs/en/memory)
