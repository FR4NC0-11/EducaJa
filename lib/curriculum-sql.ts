import type { Lesson } from "./catalog";
const resources = [
  { title: "Manual do PostgreSQL", url: "https://www.postgresql.org/docs/current/" },
];
export const sqlLessons: Lesson[] = [
  {
    id: "agregacoes",
    title: "GROUP BY, HAVING e contagens corretas",
    minutes: 25,
    level: "Intermediário",
    demo: "sql",
    resources,
    objectives: ["Diferenciar filtro de linhas e grupos", "Contar relações sem perder os vazios"],
    explanation:
      "GROUP BY reúne linhas para calcular um resultado por grupo. WHERE filtra antes do agrupamento; HAVING filtra os grupos. COUNT(*) conta linhas e COUNT(coluna) ignora valores nulos.",
    analogy: "Escolha as fichas, separe por turma e só depois compare os totais de cada turma.",
    sections: [
      {
        title: "Uma pergunta por resultado",
        body: "Agrupe pela identidade do curso, não apenas pelo título, que pode se repetir. Para incluir cursos sem matrícula, mantenha cursos à esquerda de um LEFT JOIN.",
      },
      {
        title: "Conte a correspondência",
        body: "Depois de LEFT JOIN, COUNT(*) pode contar a linha preservada sem matrícula. Conte m.id, que é não nulo numa matrícula real. Verifique o resultado com uma amostra pequena calculada à mão.",
      },
    ],
    code: "SELECT c.id, c.titulo, COUNT(m.id) AS total\nFROM cursos c\nLEFT JOIN matriculas m ON m.curso_id = c.id\nGROUP BY c.id, c.titulo\nHAVING COUNT(m.id) >= 2;",
    exercise:
      "Como listar cursos com zero matrículas? Qual parte da consulta os remove do resultado?",
    hint: "O LEFT JOIN preserva; HAVING >= 2 remove os grupos menores.",
    lab: {
      tool: "Rascunho SQL / PostgreSQL de teste",
      setup: "Use tabelas fictícias de cursos e matrículas, separadas do banco do EducaJá.",
      steps: [
        "Desenhe três cursos, incluindo um vazio.",
        "Calcule as contagens à mão.",
        "Compare COUNT(*) e COUNT(m.id).",
        "Aplique HAVING e registre os grupos que saíram.",
      ],
      expected: "O curso vazio tem zero ao contar a chave da matrícula.",
      troubleshooting:
        "Se aparecer um em vez de zero, confira a coluna contada e a posição do filtro.",
    },
  },
  {
    id: "null-joins",
    title: "NULL e filtros que mudam um LEFT JOIN",
    minutes: 30,
    level: "Intermediário",
    demo: "sql",
    resources,
    objectives: ["Usar IS NULL", "Distinguir condições em ON e WHERE"],
    explanation:
      "NULL representa ausência de valor conhecido. Comparações comuns com NULL não resultam em verdadeiro; use IS NULL. Um filtro da tabela direita em WHERE pode remover as linhas preservadas por LEFT JOIN.",
    analogy: "Uma ficha sem telefone não informa que o telefone é zero: ele não está registrado.",
    sections: [
      {
        title: "Encontre a ausência de relação",
        body: "Para listar alunos sem matrícula, preserve alunos à esquerda e teste a chave da matrícula com IS NULL. Uma chave não nula da tabela direita distingue a ausência de correspondência de um campo opcional vazio.",
      },
      {
        title: "ON combina; WHERE filtra",
        body: "Para preservar todos os alunos e relacionar apenas matrículas ativas, coloque a condição de atividade em ON. Em WHERE, ela filtraria o resultado já combinado, eliminando linhas sem correspondência.",
      },
    ],
    code: "SELECT a.nome, m.id\nFROM alunos a\nLEFT JOIN matriculas m\n  ON m.aluno_id = a.id AND m.ativa = true\nWHERE m.id IS NULL;\n-- Alunos sem matrícula ativa correspondente.",
    exercise:
      "Por que WHERE m.ativa = true remove alunos sem matrícula? O que significa a condição ser desconhecida?",
    hint: "WHERE mantém apenas verdadeiro; desconhecido não é verdadeiro.",
    lab: {
      tool: "Explorador de dados fictícios",
      setup: "O painel calcula apenas consultas predefinidas; não executa SQL no banco do EducaJá.",
      steps: [
        "Anote os alunos de entrada.",
        "Compare INNER JOIN e LEFT JOIN no painel.",
        "Localize o aluno com NULL.",
        "Proponha o filtro para listar apenas alunos sem matrícula.",
      ],
      expected: "O aluno sem relação permanece na junção que preserva alunos.",
      troubleshooting:
        "Se todos desaparecerem, investigue primeiro o filtro aplicado depois da junção.",
    },
  },
  {
    id: "modelagem",
    title: "Modelagem e restrições que protegem os dados",
    minutes: 35,
    level: "Intermediário",
    resources,
    objectives: ["Representar relações muitos-para-muitos", "Impedir duplicidades no banco"],
    explanation:
      "Uma matrícula liga aluno e curso e pode ter atributos próprios, como data e situação. Restrições no banco protegem as regras mesmo quando duas aplicações fazem pedidos ao mesmo tempo.",
    analogy:
      "Uma ficha de matrícula aponta para duas fichas existentes sem repetir todo o conteúdo delas.",
    sections: [
      {
        title: "Evite listas numa coluna",
        body: "Cursos separados por vírgulas dificultam consulta e validação. Uma tabela de matrículas representa cada relação por uma linha. Normalizar reduz redundância ao considerar dependências entre dados; não é dividir tabelas sem propósito.",
      },
      {
        title: "Escolha a restrição adequada",
        body: "NOT NULL exige informação; FOREIGN KEY protege referências; UNIQUE impede duplicidade; CHECK valida condições da linha. CHECK simples não garante regras entre várias linhas. Planeje a exclusão para não apagar histórico sem intenção.",
      },
    ],
    code: "CREATE TABLE matriculas (\n  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  aluno_id bigint NOT NULL REFERENCES alunos(id),\n  curso_id bigint NOT NULL REFERENCES cursos(id),\n  UNIQUE (aluno_id, curso_id)\n);",
    exercise:
      "Se alguém puder repetir o curso em semestres diferentes, como a regra de unicidade muda?",
    hint: "Considere uma oferta ou período em vez de tratar todas as edições como a mesma matrícula.",
    lab: {
      tool: "PostgreSQL em banco de testes",
      setup:
        "Crie antes alunos e cursos com chaves id. Não execute os exemplos no banco da aplicação.",
      steps: [
        "Crie a tabela de relação.",
        "Insira uma matrícula válida.",
        "Repita o mesmo par aluno/curso.",
        "Tente uma referência inexistente.",
      ],
      expected: "O banco aceita o válido e recusa duplicidade e referência inválida.",
      troubleshooting:
        "Se a duplicata é aceita, confira quais colunas estão realmente cobertas pelo UNIQUE.",
    },
  },
  {
    id: "indices-explain",
    title: "Índices e leitura de EXPLAIN",
    minutes: 40,
    level: "Avançado",
    resources: [
      {
        title: "PostgreSQL — Using EXPLAIN",
        url: "https://www.postgresql.org/docs/current/using-explain.html",
      },
    ],
    objectives: ["Escolher índice pela consulta", "Separar estimativas de medidas"],
    explanation:
      "Um índice pode reduzir a procura por linhas, mas ocupa espaço e precisa ser atualizado nas escritas. O planejador pode preferir uma varredura da tabela quando isso parece mais barato.",
    analogy:
      "Um índice de livro ajuda uma busca pontual; pode ser inútil quando você lerá quase todas as páginas.",
    sections: [
      {
        title: "Meça a pergunta real",
        body: "Observe filtros, junções, ordenação e volume retornado. EXPLAIN apresenta estimativas de custo e linhas; custo não é milissegundo. Uma tabela pequena pode não mostrar vantagem para o índice.",
      },
      {
        title: "ANALYZE executa",
        body: "EXPLAIN ANALYZE executa a operação para medir tempos e linhas. Em comandos de alteração, isso modifica dados: use apenas ambiente controlado. Compare estimado e real antes de acrescentar mais estruturas.",
      },
    ],
    code: "EXPLAIN SELECT * FROM matriculas WHERE aluno_id = 42;\nCREATE INDEX matriculas_aluno_idx ON matriculas (aluno_id);\nEXPLAIN SELECT * FROM matriculas WHERE aluno_id = 42;\n-- Compare planos; o índice não é obrigado a ser usado.",
    exercise:
      "Por que um índice em cada coluna pode piorar um sistema com muitas escritas? O que medir antes e depois?",
    hint: "Compare leitura, manutenção, espaço e distribuição dos dados.",
    lab: {
      tool: "PostgreSQL / EXPLAIN",
      setup:
        "Use uma base fictícia com tamanho conhecido e apenas consultas de leitura na comparação.",
      steps: [
        "Registre consulta e volume.",
        "Leia o plano original.",
        "Crie um índice apropriado num banco de teste.",
        "Compare e explique uma eventual varredura sequencial.",
      ],
      expected: "Uma conclusão fundamentada mesmo quando o índice não é escolhido.",
      troubleshooting: "Confira seletividade, estatísticas, tamanho e índices que já existiam.",
    },
  },
  {
    id: "parametros-permissoes",
    title: "Parâmetros, permissões e menor privilégio",
    minutes: 30,
    level: "Avançado",
    resources,
    objectives: ["Separar valores do SQL", "Definir permissões por responsabilidade"],
    explanation:
      "Consultas parametrizadas mantêm valores separados da estrutura SQL. A conta da aplicação também deve receber apenas as permissões necessárias, em vez de usar acesso administrativo para toda operação.",
    analogy: "Preencher um campo não pode redesenhar o formulário inteiro.",
    sections: [
      {
        title: "Parâmetros representam valores",
        body: "$1 recebe um valor pelo driver, não um nome de tabela ou cláusula inteira. Para escolher a ordenação, mapeie opções permitidas para identificadores fixos. Validar na interface não torna segura a concatenação no servidor.",
      },
      {
        title: "Separe responsabilidades",
        body: "Uma tela de leitura não precisa criar tabelas. Separe credenciais de migração das de execução quando possível. Não envie senha ou conexão ao navegador e não publique segredos em exemplos de código.",
      },
    ],
    code: '// Node.js com pg, não SQL puro.\nconst resultado = await client.query(\n  "SELECT nome FROM alunos WHERE id = $1",\n  [idRecebido]\n);',
    exercise:
      "Como permitir ordenar por nome ou data sem concatenar qualquer entrada? Que permissões uma consulta precisa?",
    hint: "Lista fechada para estrutura; parâmetros para valores.",
    lab: {
      tool: "Revisão de código",
      setup: "Não é necessário executar entradas maliciosas em um banco.",
      steps: [
        "Identifique dados recebidos numa busca.",
        "Troque concatenação por parâmetros.",
        "Mapeie duas ordenações para colunas conhecidas.",
        "Liste permissões usadas pela consulta.",
      ],
      expected: "A estrutura é controlada pelo programa e os valores são parametrizados.",
      troubleshooting:
        "Se usou $1 como tabela, separe identificadores permitidos dos valores recebidos.",
    },
  },
  {
    id: "concorrencia-reservas",
    title: "Projeto: reservar a última vaga",
    minutes: 50,
    level: "Avançado",
    resources: [
      {
        title: "PostgreSQL — isolamento de transações",
        url: "https://www.postgresql.org/docs/current/transaction-iso.html",
      },
    ],
    objectives: [
      "Evitar a sequência insegura de ler e gravar",
      "Verificar o resultado de uma atualização atômica",
    ],
    explanation:
      "Dois pedidos podem ler a mesma vaga disponível. Uma leitura isolada seguida de escrita não garante exclusividade. Atualização condicional decide e altera a linha numa operação; o retorno indica se houve reserva.",
    analogy:
      "A retirada do último ingresso precisa acontecer no mesmo ato que confirma sua disponibilidade.",
    sections: [
      {
        title: "Atualize sob condição",
        body: "UPDATE com vagas > 0 e RETURNING permite verificar se a linha foi alterada. Em Read Committed, atualizações concorrentes da mesma linha são coordenadas e a condição é reavaliada na versão atualizada. Confira sempre se houve retorno.",
      },
      {
        title: "A reserva inteira é uma transação",
        body: "Reduzir vaga e inserir matrícula precisam confirmar juntos. Use UNIQUE contra duplicidade e rollback na falha. Transações serializáveis podem abortar e exigir nova tentativa; um isolamento não elimina automaticamente todos os conflitos.",
      },
    ],
    code: "BEGIN;\nUPDATE ofertas SET vagas = vagas - 1\nWHERE id = $1 AND vagas > 0\nRETURNING id, vagas;\n-- Sem retorno: não inserir matrícula.\n-- Com retorno: inserir na mesma transação.\nCOMMIT;\n-- $1 é parâmetro do driver.",
    exercise:
      "Desenhe dois pedidos para a última vaga. Quando o perdedor descobre a recusa? O que ocorre se a matrícula falha?",
    hint: "Sucesso depende da transação inteira, não só do UPDATE.",
    lab: {
      tool: "Duas sessões PostgreSQL de teste",
      setup:
        "Prepare oferta fictícia com uma vaga e tabela de matrículas. Num cliente manual, use um id literal de teste no lugar de $1.",
      steps: [
        "Inicie duas transações.",
        "Atualize na primeira sem confirmar.",
        "Tente na segunda e confirme a primeira.",
        "Verifique a recusa na segunda e teste rollback para uma matrícula inválida.",
      ],
      expected:
        "A capacidade não fica negativa e matrícula recusada não consome a vaga definitivamente.",
      troubleshooting:
        "Espera indefinida pode indicar que a primeira sessão não terminou a transação.",
    },
  },
];
