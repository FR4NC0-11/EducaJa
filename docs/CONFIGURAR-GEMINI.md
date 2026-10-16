# Configurar o professor com Gemini

O professor usa a API Gemini do Google. A conta Google que gera a chave é a conta do responsável pela integração; o estudante entra com sua própria conta do EducaJá.

## Preparar a chave

1. Acesse https://aistudio.google.com/apikey com a conta Google que conseguiu acessar o serviço.
2. Crie uma chave em um projeto do plano gratuito. Não é necessário habilitar faturamento para testar modelos disponíveis nessa modalidade.
3. Abra o arquivo `.env` na pasta do EducaJá. Cole a chave somente depois de `GEMINI_API_KEY=` e salve. Não envie a chave pelo chat nem a inclua em commits, capturas de tela ou `.env.example`.
4. Configure as outras opções:

```dotenv
AI_ENABLED=true
GEMINI_MODEL=gemini-3.5-flash-lite
AI_DAILY_LIMIT=20
AI_GLOBAL_DAILY_LIMIT=200
```

5. Reinicie o servidor (`npm run dev`), entre em uma conta do EducaJá, escolha um assunto e use “Conversar com o professor”.

O modelo padrão foi escolhido entre os modelos com modalidade gratuita na documentação consultada em 15/10/2026. O acesso e as cotas da sua conta precisam ser confirmados na prática. Não existe troca automática para um modelo pago nem ativação de faturamento pela aplicação. Se o projeto do Google já tiver faturamento ativo, o uso pode ser cobrado conforme esse projeto.

## Limites e dados

O limite local conta pedidos iniciados, inclusive os que falham. Ele não substitui as cotas do Google nem é um teto financeiro. Um pedido de avaliação pode consumir mais tokens que uma pergunta curta. Ao receber uma limitação do provedor, o professor informa o problema sem inventar uma resposta; aulas e progresso continuam disponíveis.

O conteúdo enviado no plano gratuito pode ser usado pelo Google para melhorar produtos. Faça o piloto com dados fictícios e sem informações pessoais de estudantes. A aplicação não acrescenta nome, e-mail, senha ou token ao contexto, mas o texto livre do aluno pode conter dados pessoais. Revise o tratamento de dados antes de abrir o serviço ao público.

A chave é lida somente pelo servidor, enviada no cabeçalho da chamada e não fica na URL nem na interface. Para desativar o professor, configure `AI_ENABLED=false` e reinicie. Se uma chave vazar, revogue-a no Google e gere outra.

## Verificar qualidade

Os testes automatizados usam um provedor simulado. Eles verificam integração, limites e persistência, sem provar a qualidade de uma aula ou nota. Siga [Avaliação pedagógica](AVALIACAO-PEDAGOGICA.md) antes de liberar para alunos reais.

## Referências

- https://ai.google.dev/gemini-api/docs/api-key
- https://ai.google.dev/gemini-api/docs/pricing
- https://ai.google.dev/gemini-api/docs/models
- https://ai.google.dev/api/generate-content

## Contador de uso

Abaixo da conversa, contas autenticadas com IA ativa veem os pedidos restantes no limite diário da conta. O valor vem de ai_usage, com a mesma configuração AI_DAILY_LIMIT aplicada pelo servidor, e soma perguntas e avaliações de todos os assuntos. Atualiza ao carregar os dados e após pedidos, inclusive falhas de conversa. Não representa tokens ou tamanho do histórico, nem garante disponibilidade do provedor ou da cota global. A virada do dia segue CURRENT_DATE do PostgreSQL, como a aplicação do limite existente.
