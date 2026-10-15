# Publicação: Vercel e Neon

## Situação em 15/10/2026

O PostgreSQL de nuvem foi criado no Neon, no plano gratuito, região AWS US East 1, com as quatro migrações aplicadas e conexão TLS verificada. O banco é novo: os dados do Docker local não foram copiados. A aplicação ainda depende do acesso à conta Vercel e da implantação para ter um endereço público confirmado.

A preparação está na branch `deploy/vercel-neon`, para revisão por PR. Nenhuma integração à main deve ocorrer sem revisão do responsável.

## Acesso fora deste computador

O navegador acessa a aplicação Next.js na Vercel. Somente o servidor conecta ao PostgreSQL no Neon e aos serviços de e-mail e IA. O computador de quem estuda precisa apenas de navegador e internet. Docker e o servidor local podem ficar desligados depois que a implantação externa estiver verificada.

GitHub guarda o código e o histórico. GitHub Pages publica arquivos estáticos e não executa as rotas de autenticação, PostgreSQL e professor desta aplicação. Codespaces serve ao desenvolvimento e não substitui a hospedagem do site.

Os planos gratuitos possuem cotas e podem suspender ou limitar serviços. O banco pode precisar retomar atividade antes de responder. Não há promessa de disponibilidade contínua nem contratação de plano pago nesta preparação.

## Configuração privada

Use `.env.cloud.example` como referência. Não copie o `.env` local inteiro e nunca envie chaves ao GitHub ou pelo chat. Configure estas variáveis no ambiente do projeto Vercel:

| Variável                   | Valor ou finalidade                                               |
| -------------------------- | ----------------------------------------------------------------- |
| `APP_ORIGIN`               | Endereço público HTTPS definitivo, sem barra final                |
| `COOKIE_SECURE`            | `true`                                                            |
| `DATABASE_URL`             | URL Neon com host pooled, banco `educaja` e `sslmode=verify-full` |
| `DB_CONNECTION_TIMEOUT_MS` | `10000`, para tolerar a retomada do banco                         |
| `AI_ENABLED`               | `false` até concluir a configuração e validar contas/professor    |
| `GEMINI_API_KEY`           | Chave privada existente, quando a IA for ativada                  |
| `GEMINI_MODEL`             | `gemini-3.5-flash-lite`                                           |
| `AI_DAILY_LIMIT`           | `20` por conta                                                    |
| `AI_GLOBAL_DAILY_LIMIT`    | `200` no total                                                    |
| `RESEND_API_KEY`           | Credencial de envio transacional                                  |
| `EMAIL_FROM`               | Remetente autorizado no Resend                                    |

`MIGRATION_DATABASE_URL` usa o host direto do mesmo banco. Guarde-a no ambiente privado de quem executa migrações; o servidor da aplicação precisa apenas da conexão pooled. Não desative a validação de certificados TLS.

Sem serviço de e-mail configurado, o site oferece aulas e laboratórios como visitante, explica a indisponibilidade e bloqueia os formulários de entrada. Cadastro, login por código, histórico da conta entre dispositivos e professor autenticado dependem da entrega real de e-mail. Consulte [confirmação por e-mail](CONFIRMACAO-EMAIL.md).

## Implantação

1. Conectar a conta Vercel e importar `FR4NC0-11/EducaJa`, com Next.js e Node.js 24. Confirmar o projeto e o proprietário antes de alterar configurações.
2. Configurar as variáveis privadas para o ambiente escolhido. Previews que aceitam mutações precisam do próprio endereço HTTPS em `APP_ORIGIN`; não reutilizar a origem de produção nem compartilhar o banco de produção com testes de PR.
3. O `vercel.json` instala dependências pelo lockfile e executa `npm run build:cloud`. A verificação recusa origem insegura, cookies inseguros, banco local e TLS desativado. Avisos sobre e-mail não impedem um piloto de visitante.
4. Aplicar migrações de forma controlada antes de publicar mudanças que dependam de um novo esquema. O build não executa migrações automaticamente. A primeira aplicação já foi feita no banco vazio do Neon.
5. Publicar a revisão autorizada e confirmar que o endereço abre sem exigir login na Vercel. Manter o fluxo de PR e revisão antes de integrar mudanças à main.
6. Verificar páginas e APIs externamente, conexão com banco, gravação e retomada após recarregar, uso em celular e em outro navegador. Confirmar acesso com o computador local desligado. Somente então registrar o endereço como publicado.
7. Depois de configurar Resend/remetente, validar entrega real, cadastro, código expirado, login em outro dispositivo e professor com a chave real antes de convidar alunos para esses recursos.

Para futuras migrações, crie um arquivo privado `.env.cloud` a partir do exemplo, preencha origem e conexões e execute:

```text
npm run cloud:check
npm run db:migrate:cloud
```

O segundo comando exige conexões diretas/pooled do mesmo endpoint e banco e mantém o histórico com checksum e bloqueio de concorrência. Não altere migrações já aplicadas. Esses comandos não publicam a aplicação.

## Operação

- A conexão PostgreSQL limita o pool por instância e integra o encerramento de conexões à Vercel. A rota do professor reserva 90 segundos; a integração mantém seu próprio limite de 75 segundos.
- Manter os dados locais separados. Para uma futura importação, planejar cópia e validação explicitamente.
- Monitorar cotas da Vercel, Neon, Gemini e Resend; confirmar limites e uso permitido nos painéis antes de ampliar o público.
- Definir recuperação de senha, retenção de dados, backups e um teste de restauração antes de depender do site para dados importantes de estudantes.
- Nenhuma credencial deve usar prefixo `NEXT_PUBLIC_`.

Referências: [Vercel Next.js](https://vercel.com/docs/frameworks/full-stack/nextjs), [plano Hobby](https://vercel.com/docs/plans/hobby), [pool de conexões Neon](https://neon.com/docs/connect/connection-pooling), [retomada do Neon](https://neon.com/docs/introduction/scale-to-zero).
