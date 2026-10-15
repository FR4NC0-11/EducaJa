# Contas e professor por IA — 15/10/2026

## Contas

Cadastro por nome, e-mail e senha de 12 a 128 caracteres. O e-mail é normalizado para minúsculas; não é tratado como verificado. As senhas usam scrypt com salt aleatório, N=32768, r=8, p=3 e chave derivada de 64 bytes. Nunca são guardadas em texto puro.

Uma conta aponta para um perfil de aprendizagem. Criar a conta vincula o progresso do visitante atual e revoga o token anônimo antigo, de modo que esse token não continue dando acesso ao perfil vinculado. Entrar em uma conta existente não mistura automaticamente o progresso de outro visitante.

Sessões de conta usam tokens aleatórios de 256 bits, somente o hash no PostgreSQL e cookie HttpOnly/SameSite=Lax. Expiram em sete dias. Logout revoga a sessão no banco; outras sessões da mesma conta continuam válidas. Em HTTPS, configure COOKIE_SECURE=true e APP_ORIGIN com a URL exata, sem barra final. As consultas de aprendizagem continuam filtradas pelo perfil resolvido no servidor, nunca por ID de conta recebido do navegador.

Tentativas de cadastro/login são limitadas no banco: oito por e-mail a cada janela de 15 minutos e cem globais por dez minutos, incluindo sucessos. O limite global é uma proteção inicial de piloto, não substitui proteção contra abuso no serviço publicado. Não depende de confiar em cabeçalhos de IP encaminhados.

Se a sessão expirar durante uma escrita, o servidor não grava silenciosamente em outro perfil de visitante. A interface orienta copiar o texto não salvo e recarregar para entrar novamente.

**Ainda pendentes antes de abrir cadastros ao público:** confirmação e recuperação por e-mail, alteração de senha, encerramento de todas as sessões pela conta, política de retenção/exclusão e revisão operacional de autenticação. Esta etapa permanece para uso privado de desenvolvimento.

## Professor

Integração inicial: OpenAI Responses API, com modelo configurável por OPENAI_MODEL. O ponto de partida é gpt-5.4, sem alegar que a escolha dispensa avaliação pedagógica ou que seja o melhor modelo em todos os casos. O adaptador pode ser substituído preservando os contratos de conversa e avaliação.

O professor recebe tema, aula, objetivo e respostas do diagnóstico. Não enviamos nome, e-mail, senha nem tokens da conta. O estudante deve evitar dados pessoais e segredos nas mensagens. A conversa conserva as últimas 60 mensagens por assunto; no contexto de uma nova resposta entram as últimas 12, além do contexto do estudo. A chamada usa store=false; isso não é uma promessa de ausência de toda retenção pelo provedor, cuja política precisa ser revisada antes de produção.

As instruções pedagógicas pedem explicações em português, definição de termos, exemplos concretos, pequenas tentativas e adaptação ao raciocínio demonstrado. O professor não executa código nem controla equipamentos. Não deve inventar resultados de execução ou fontes. Incertezas devem ser explicitadas.

## Avaliação

Cada questão recebe quatro critérios inteiros: conceitos 0–4, aplicação 0–3, raciocínio 0–2 e clareza 0–1. A soma forma a nota de 0 a 10; o servidor calcula a média das dez respostas. Cada resposta exige feedback. Há pontos de referência específicos para as quarenta questões em lib/diagnostic-reference.ts, aceitando respostas equivalentes tecnicamente corretas.

A API exige JSON estruturado estrito. O servidor também valida faixas, presença dos dez índices sem duplicação e IDs das três aulas sem repetição. O modelo, a versão da rubrica e o momento da avaliação ficam no registro. A ordem sugerida reorganiza as aulas, mas não é uma certificação nem altera as perguntas do teste atual.

Editar uma resposta invalida a avaliação e retira o estado de teste finalizado. Uma resposta recebida da IA não pode sobrescrever progresso que mudou durante a chamada: a atualização exige a mesma versão de updated_at. Falhas, recusas e saídas incompletas não viram notas ou mensagens fictícias.

## Consumo e disponibilidade

A IA começa desligada. São necessários AI_ENABLED=true e OPENAI_API_KEY no ambiente do servidor. Somente usuários autenticados podem enviar pedidos. Uma reserva por perfil evita pedidos simultâneos; ela expira após 90 segundos. O timeout externo é de 45 segundos e não há retry automático.

Padrões: 20 pedidos por conta/dia e 200 globais por janela de 24 horas. AI_DAILY_LIMIT e AI_GLOBAL_DAILY_LIMIT são limites de pedidos, não limites financeiros. Configure também os controles de gasto da conta do provedor antes de ativar. Pedidos iniciados que falham ainda podem consumir a cota local, para evitar repetição ilimitada. O limite de saída é de 1600 tokens para conversa e 6000 para avaliação, incluindo o orçamento de raciocínio do modelo.

## Verificação realizada

- PostgreSQL local: migrações 002 e 003 aplicadas; nova execução não reaplica nenhuma migração.
- Sete testes de regras/segurança: catálogo e referências, limites de entradas, senhas, rubrica e adaptador.
- Seis testes de navegador/API: cadastro com preservação de progresso, acesso em segundo navegador, revogação de sessão, token anônimo antigo, entradas inválidas, limites de tentativas e regressões do estudo.
- Três testes de integração com provedor exclusivamente simulado: conversa/avaliação persistentes e ordem sugerida; limite diário; falha incompleta; descarte de avaliação atrasada.
- TypeScript e build aprovados.

Os testes simulados usam uma chave falsa e um modelo fixture-model. A interceptação só é carregada explicitamente pelo processo de testes na porta 3001; não existe opção de aplicação para ativar um professor falso. Esses testes comprovam o funcionamento da integração, não a correção pedagógica de respostas reais.

**Nenhuma chamada real de IA foi executada, pois não há chave configurada.** O próximo passo para validar a qualidade é o protocolo em AVALIACAO-PEDAGOGICA.md. Hospedagem e banco compartilhado de produção também continuam pendentes: login em navegadores diferentes foi testado contra a mesma instalação local, não contra bancos independentes de computadores diferentes.

## Referências

- https://developers.openai.com/api/docs/models/gpt-5.4
- https://developers.openai.com/api/docs/guides/structured-outputs
- https://nextjs.org/docs/app/guides/authentication
- https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
