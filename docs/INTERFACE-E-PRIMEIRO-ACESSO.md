# Interface e primeiro acesso — 15/10/2026

## Decisões desta revisão

- Paleta escura inspirada no Dracula: fundo #282a36, texto #f8f8f2 e destaque roxo #bd93f9. Ciano identifica ajuda e exemplos; verde indica progresso salvo. Sem gradientes, cartões inclinados ou mensagens motivacionais decorativas.
- Cantos de 2 a 3 px, linhas simples e tipografia maior para o conteúdo de aula.
- Menu lateral recolhível de 236 px para 72 px no computador. A preferência fica no armazenamento local do navegador. Os botões continuam com nomes acessíveis e dicas ao passar o mouse. Em telas pequenas, o menu vira navegação horizontal e também pode ser compactado.
- Navegação com nomes diretos: Assuntos, Teste inicial, Aulas e Plano de estudo.

## Caminho para quem está começando

1. Escolher um assunto pela descrição em linguagem simples.
2. Opcionalmente informar o objetivo ou usar uma sugestão pronta.
3. Usar “Começar a estudar” para ir à aula 1, sem precisar responder ao teste antes.
4. Ler a explicação, abrir um exemplo do dia a dia e tentar o exercício.
5. Consultar o glossário, anotar dúvidas e marcar a aula como concluída. Um botão leva à próxima aula.

O teste inicial mantém dez questões com dificuldades variadas. A opção “Ainda não sei” registra essa resposta e avança, sem inventar uma nota. O teste continua disponível para todos os assuntos e não bloqueia as aulas. A correção automática continua pendente da conexão com IA.

Os exemplos de código começam fechados, para não apresentar código antes de uma explicação em linguagem comum. A preferência do menu é independente dos dados de aprendizagem: os dados continuam no PostgreSQL.

## IoT — Internet das Coisas

Adicionado como quarto assunto, com dez questões, três aulas e glossário: objetos conectados; caminho dos dados; troca de mensagens e cuidados básicos. O conteúdo usa situações como planta, temperatura e janela automática. Não exige compra de componentes. Os exemplos são conceituais e não acionam equipamentos reais.

Nenhuma migração de banco é necessária: a persistência já identifica os temas pelos IDs do catálogo. IDs das aulas e assuntos anteriores foram preservados.

## Verificações

- Três testes de regras e quatro testes de navegador/API aprovados localmente.
- Teste novo cobre recolhimento e persistência do menu, filtro de IoT, estudo sem objetivo preenchido e sem teste obrigatório, glossário, próxima aula, resposta “Ainda não sei” e progresso de IoT após recarga.
- Testes anteriores continuam cobrindo persistência das dez respostas, isolamento, concorrência, teclado e celular sem transbordamento horizontal.
- TypeScript, compilação de produção e inspeção visual em computador e celular.

## Referências

- Paleta: https://draculatheme.com/spec
- MQTT e arquitetura de publicação/assinatura: https://mqtt.org/
- Papel do broker: https://mqtt.org/faq/
