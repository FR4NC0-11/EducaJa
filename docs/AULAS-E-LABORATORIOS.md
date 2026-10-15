# Aulas ampliadas e experiências por categoria

## Conteúdo

O catálogo passa de 12 para 36 aulas: nove em cada categoria, mantendo as doze aulas originais e seus identificadores. As 24 novas aulas têm objetivos, nível, explicações por etapas, exemplo, exercício, dica, prática guiada, resultado esperado, diagnóstico de falha e fontes oficiais. Os tempos são estimativas de estudo e prática, não apenas de leitura.

| Categoria  | Aprofundamento acrescentado                                                                                                                            |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Java       | List/Set/Map e generics; exceções; identidade e igualdade; composição; testes de regras; projeto de matrículas.                                        |
| Web        | DOM e eventos; formulários; APIs e estados de carregamento; teclado e acessibilidade; estado e componentes; projeto de portal responsivo.              |
| PostgreSQL | Agregações; NULL e junções; modelagem e restrições; índices e EXPLAIN; parâmetros e permissões; projeto de reserva concorrente.                        |
| IoT        | IP/DHCP/gateway; rede mínima no Packet Tracer; casa conectada e registro IoT; condições e ações; telemetria MQTT; projeto de monitoramento com falhas. |

## Práticas dentro do site

As experiências são acessíveis como visitante, sem login, IA ou instalação adicional:

- Web: formulário com validação local e dados fictícios; vitrine com filtro e carrinho; painel com carregamento/falha/recuperação simulados; portal que se reorganiza em duas larguras.
- Java: dois objetos de conta com estado independente, depósito e recusa de saque inválido. A demonstração está escrita em JavaScript para ilustrar o conceito; não executa Java nem movimenta dinheiro.
- PostgreSQL: explorador de INNER JOIN, LEFT JOIN e contagem em uma amostra fixa. Não aceita SQL arbitrário nem consulta o banco da aplicação.
- IoT: temperatura, regra de atuação e perda de comunicação. A última leitura fica identificada como antiga. Não conecta hardware, broker MQTT ou Packet Tracer. O estado de falha escolhido é didático e não define uma política universal para equipamentos reais.

Os estados das demonstrações são temporários. Trocar de aula ou recarregar reinicia a experiência. Anotações e aulas concluídas continuam sendo persistidas pelo fluxo existente. Formulários demonstrativos não enviam dados pessoais a um servidor e não criam contas reais.

## Cisco Packet Tracer

Há três roteiros específicos: montar uma rede com dois PCs e switch; registrar uma Smart Thing no Home Gateway; configurar condições de presença e ações de uma lâmpada. Cada roteiro define montagem, testes, resultado e hipóteses para falhas. O material diferencia conexão IP de registro IoT e componentes sem rede de Smart Things.

Esses roteiros são para uso externo no Packet Tracer instalado, conforme acesso e condições da Cisco. O site não incorpora o programa, não fornece um instalador e não gera um arquivo .pkt supostamente validado. As atividades foram elaboradas com a ajuda oficial, mas não foram executadas no Packet Tracer nesta etapa. Interface e modelos podem variar por versão. As leituras, o planejamento e a simulação complementar no navegador continuam acessíveis em máquinas sem permissão para instalar ferramentas.

## Compatibilidade com progresso e avaliação

Não há migração de banco nem alteração dos IDs originais. Notas e conclusões existentes continuam válidas. Uma avaliação antiga que recomenda três aulas preserva essa ordem e recebe as novas aulas ao final. IDs desconhecidos são ignorados na apresentação e duplicatas não aparecem.

Novas avaliações exigem todos os IDs atuais da categoria uma única vez. O JSON Schema usa a quantidade real de aulas, e o servidor rejeita planos incompletos, duplicados ou de outra categoria. As dez questões e a rubrica do diagnóstico foram preservadas. O novo conteúdo é material fixo do catálogo, não gerado sob demanda pela IA.

## Verificação

- 14 testes de regras/segurança: incluem ordem antiga, inclusão de novas aulas e rejeição de recomendações incompletas/duplicadas.
- 15 testes de navegador/API: incluem validação do formulário, filtro/carrinho, falha e recuperação, largura responsiva, objetos independentes, SQL e simulação IoT, além das regressões de conta e progresso.
- Três testes do professor com envio e IA simulados, repetidos com sucesso num banco temporário isolado após o banco de desenvolvimento atingir a cota acumulada de testes. O banco temporário foi removido após a verificação, sem zerar limites do usuário.
- Avaliação real com dados fictícios no Gemini: dez respostas, nove aulas válidas e média zero para a opção “Ainda não sei”. Não substitui revisão pedagógica completa de todos os temas.
- Compilação e tipos aprovados; inspeção de capturas em computador e celular sem estouro horizontal.

Os exemplos Java e os laboratórios externos de PostgreSQL são referências para execução separada; não foi alegada compilação Java ou validação de cada exercício em ferramenta externa nesta etapa.

## Fontes

- https://dev.java/learn/
- https://developer.mozilla.org/pt-BR/docs/Learn_web_development
- https://www.postgresql.org/docs/current/
- https://www.postgresql.org/docs/current/using-explain.html
- https://www.postgresql.org/docs/current/transaction-iso.html
- https://tutorials.ptnetacad.net/help/default/iot_using_things.htm
- https://tutorials.ptnetacad.net/help/default/config_servers.htm
- https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html
