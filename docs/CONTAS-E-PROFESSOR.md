# Contas e professor por IA — 15/10/2026

## Contas

Cadastro por nome, e-mail e senha de 8 a 255 caracteres. O e-mail é normalizado para minúsculas e só é confirmado após o código recebido na caixa. Cadastro e login exigem essa etapa antes de criar a sessão; veja CONFIRMACAO-EMAIL.md para a configuração do envio. As senhas usam scrypt com salt aleatório, N=32768, r=8, p=3 e chave derivada de 64 bytes. Nunca são guardadas em texto puro.

Uma conta aponta para um perfil de aprendizagem. Criar a conta vincula o progresso do visitante atual e revoga o token anônimo antigo, de modo que esse token não continue dando acesso ao perfil vinculado. Entrar em uma conta existente não mistura automaticamente o progresso de outro visitante.

Sessões de conta usam tokens aleatórios de 256 bits, somente o hash no PostgreSQL e cookie HttpOnly/SameSite=Lax. Expiram em sete dias. Logout revoga a sessão no banco; outras sessões da mesma conta continuam válidas. Em HTTPS, configure COOKIE_SECURE=true e APP_ORIGIN com a URL exata, sem barra final. As consultas de aprendizagem continuam filtradas pelo perfil resolvido no servidor, nunca por ID de conta recebido do navegador.

Tentativas de cadastro/login são limitadas no banco: oito por e-mail a cada janela de 15 minutos e cem globais por dez minutos, incluindo sucessos. O limite global é uma proteção inicial de piloto, não substitui proteção contra abuso no serviço publicado. Não depende de confiar em cabeçalhos de IP encaminhados.

Se a sessão expirar durante uma escrita, o servidor não grava silenciosamente em outro perfil de visitante. A interface orienta copiar o texto não salvo e recarregar para entrar novamente.

**Ainda pendentes antes de abrir cadastros ao público:** ativação e verificação da entrega real dos códigos, recuperação e alteração de senha, encerramento de todas as sessões pela conta, política de retenção/exclusão e revisão operacional de autenticação. Esta etapa permanece para uso privado de desenvolvimento.

## Professor

Integração inicial: Google Gemini API, com modelo configurável por GEMINI_MODEL. O modelo padrão atual é gemini-3.5-flash-lite, sem alegar que a escolha dispensa avaliação pedagógica ou que seja o melhor modelo em todos os casos. O adaptador pode ser substituído preservando os contratos de conversa e avaliação.

O professor recebe tema, aula, objetivo e respostas do diagnóstico. Não enviamos nome, e-mail, senha nem tokens da conta. O estudante deve evitar dados pessoais e segredos nas mensagens. A conversa conserva as últimas 60 mensagens por assunto; no contexto de uma nova resposta entram as últimas 12, além do contexto do estudo. O plano gratuito do Google pode usar conteúdo para melhorar seus produtos. Use dados sintéticos no piloto; revise os termos e o tratamento de dados antes de estudantes reais. Não há promessa de retenção zero.

As instruções pedagógicas pedem explicações em português, definição de termos, exemplos concretos, pequenas tentativas e adaptação ao raciocínio demonstrado. O professor não executa código nem controla equipamentos. Não deve inventar resultados de execução ou fontes. Incertezas devem ser explicitadas.

## Avaliação

Cada questão recebe quatro critérios inteiros: conceitos 0–4, aplicação 0–3, raciocínio 0–2 e clareza 0–1. A soma forma a nota de 0 a 10; o servidor calcula a média das dez respostas. Cada resposta exige feedback. Há pontos de referência específicos para as quarenta questões em lib/diagnostic-reference.ts, aceitando respostas equivalentes tecnicamente corretas.

A API recebe o esquema JSON da avaliação. O servidor também valida faixas, presença dos dez índices sem duplicação e IDs das três aulas sem repetição. O modelo, a versão da rubrica e o momento da avaliação ficam no registro. A ordem sugerida reorganiza as aulas, mas não é uma certificação nem altera as perguntas do teste atual.

Editar uma resposta invalida a avaliação e retira o estado de teste finalizado. Uma resposta recebida da IA não pode sobrescrever progresso que mudou durante a chamada: a atualização exige a mesma versão de updated_at. Falhas, recusas e saídas incompletas não viram notas ou mensagens fictícias.

## Consumo e disponibilidade

A IA começa desligada. São necessários AI_ENABLED=true e GEMINI_API_KEY no ambiente do servidor. Somente usuários autenticados podem enviar pedidos. Uma reserva por perfil evita pedidos simultâneos; ela expira após 90 segundos. Há no máximo duas tentativas para falhas temporárias de serviço/rede, com intervalo de um segundo, limite de 45 segundos por tentativa e teto total de 75 segundos. Erros de chave/permissão e cota não são repetidos automaticamente. A reserva de 90 segundos cobre o prazo do provedor. Cada pedido local pode gerar até duas chamadas externas, sujeitas à cota/cobrança do projeto do Google.

Padrões: 20 pedidos por conta/dia e 200 globais por janela de 24 horas. AI_DAILY_LIMIT e AI_GLOBAL_DAILY_LIMIT são limites de pedidos, não limites financeiros. Configure também os controles de gasto da conta do provedor antes de ativar. Pedidos iniciados que falham ainda podem consumir a cota local, para evitar repetição ilimitada. O limite de saída é de 1600 tokens para conversa e 6000 para avaliação, incluindo o orçamento de raciocínio do modelo.

## Verificação realizada

- PostgreSQL local: migrações 002 e 003 aplicadas; nova execução não reaplica nenhuma migração.
- Dez testes de regras/segurança: catálogo e referências, limites de entradas, senhas, rubrica e adaptador.
- Onze testes de navegador/API, incluindo confirmação por código: cadastro com preservação de progresso, acesso em segundo navegador, revogação de sessão, token anônimo antigo, entradas inválidas, limites de tentativas e regressões do estudo.
- Três testes de integração com provedor exclusivamente simulado: conversa/avaliação persistentes e ordem sugerida; limite diário; falha incompleta; descarte de avaliação atrasada.
- TypeScript e build aprovados.

Os testes simulados usam uma chave falsa e um modelo fixture-model. A interceptação só é carregada explicitamente pelo processo de testes na porta 3001; não existe opção de aplicação para ativar um professor falso. Esses testes comprovam o funcionamento da integração, não a correção pedagógica de respostas reais.

**Validação inicial real em 15/10/2026:** a chave configurada no arquivo local permitiu uma conversa sobre sensor/atuador e uma avaliação de dez respostas fictícias “Ainda não sei” com gemini-3.8-flash. A avaliação teve média zero, feedbacks e três aulas válidas. A primeira tentativa de avaliação falhou no serviço; uma segunda chamada foi concluída. Isso não substitui o protocolo completo em AVALIACAO-PEDAGOGICA.md. A chave não faz parte do repositório. Hospedagem e banco compartilhado de produção também continuam pendentes: login em navegadores diferentes foi testado contra a mesma instalação local, não contra bancos independentes de computadores diferentes.

## Correção de disponibilidade e navegação — 15/10/2026

Foram reproduzidos timeout e HTTP 503/UNAVAILABLE no modelo gemini-3.8-flash. O padrão passou para gemini-3.5-flash-lite após uma conversa real e uma avaliação real com contexto fictício. A configuração local foi atualizada; instalações existentes precisam ajustar GEMINI_MODEL para usar essa escolha. Não há mudança automática de modelo, habilitação de faturamento ou garantia de disponibilidade do serviço externo.

O adaptador passou a tentar uma segunda chamada apenas em falhas temporárias de serviço/rede, com o prazo total e os limites acima. Há mensagens específicas para indisponibilidade, demora, cota, configuração e saída incompleta. Nenhuma resposta parcial é apresentada como uma avaliação concluída.

A opção explícita “Ainda não sei” recebe zero nos quatro critérios por regra do servidor, mesmo quando o modelo atribui ponto indevido por clareza. Respostas parciais com conteúdo continuam avaliadas pela rubrica. Essa regra não substitui revisão pedagógica das demais notas e feedbacks.

O menu apresenta Assuntos, Teste inicial, Plano de estudo e Aulas, nessa ordem. Aulas substitui o rótulo Estudar também na orientação da página. Verificação: treze testes de regras/segurança, onze de navegador/API e três de integração simulada aprovados, além da compilação. O teste real final validou dez questões e três aulas com média zero para dez respostas “Ainda não sei”. O envio de e-mail para novos logins continua dependendo da configuração descrita em CONFIRMACAO-EMAIL.md.

## Referências da integração

- https://ai.google.dev/gemini-api/docs/models
- https://ai.google.dev/gemini-api/docs/structured-output
- https://ai.google.dev/gemini-api/docs/troubleshooting
- https://nextjs.org/docs/app/guides/authentication
- https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
