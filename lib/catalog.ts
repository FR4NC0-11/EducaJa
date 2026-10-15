export type Lesson = {
  id: string;
  title: string;
  minutes: number;
  explanation: string;
  analogy: string;
  code: string;
  exercise: string;
  hint: string;
};
export type Topic = {
  id: string;
  category: string;
  title: string;
  description: string;
  symbol: string;
  color: string;
  questions: string[];
  lessons: Lesson[];
};

export const topics: Topic[] = [
  {
    id: "java-poo",
    category: "Back-end",
    title: "Java e orientação a objetos",
    symbol: "{ }",
    color: "orange",
    description: "De classes e objetos a um código com responsabilidades bem definidas.",
    questions: [
      "Qual é a diferença entre uma classe e um objeto? Dê um exemplo do dia a dia.",
      "O que são atributos e métodos? Descreva os dois em uma classe Aluno.",
      "Para que serve um construtor em Java? Mostre um pequeno exemplo.",
      "O que é encapsulamento? Explique por que um saldo bancário não deveria ser alterado diretamente.",
      "Quando você usaria composição em vez de herança? Justifique com um exemplo.",
      "Explique polimorfismo usando uma interface e duas implementações diferentes.",
      "Qual é a diferença entre sobrecarga e sobrescrita de métodos em Java?",
      "Como você trataria uma tentativa de saque com saldo insuficiente? Explique sua decisão.",
      "Como equals e hashCode se relacionam ao colocar objetos em um HashSet?",
      "Uma classe faz cadastro, envia e-mails e calcula notas. Como você distribuiria essas responsabilidades e por quê?",
    ],
    lessons: [
      {
        id: "objetos",
        title: "Pense em objetos",
        minutes: 8,
        explanation:
          "Uma classe descreve dados e comportamentos. Um objeto é uma instância dessa classe, com seus próprios valores. Atributos representam estado; métodos representam ações. Comece pelo problema: o que precisa ser representado e o que essa coisa faz?",
        analogy:
          "A classe é como a planta de uma casa. Você pode construir várias casas com a mesma planta; cada uma tem seus moradores e sua cor. A planta é a classe, cada casa é um objeto.",
        code: 'class Aluno {\n  String nome;\n\n  Aluno(String nome) {\n    this.nome = nome;\n  }\n\n  String apresentar() {\n    return "Olá, sou " + nome;\n  }\n}\n\nAluno ana = new Aluno("Ana");',
        exercise:
          "Descreva uma classe Livro com dois atributos e um método. Depois explique quais valores dois objetos Livro poderiam ter.",
        hint: "Separe características (título, autor) de ações (emprestar). Dois livros compartilham a estrutura, mas podem ter títulos diferentes.",
      },
      {
        id: "encapsulamento",
        title: "Proteja o estado",
        minutes: 10,
        explanation:
          "Encapsular é controlar como o estado muda. Campos privados e métodos com regras ajudam a manter invariantes: condições que precisam continuar verdadeiras, como um saldo não ficar negativo. Criar setters para tudo não garante encapsulamento.",
        analogy:
          "Um caixa eletrônico oferece operações como sacar. Ele não entrega acesso livre ao cofre: confere as regras antes de fazer a operação.",
        code: 'class Conta {\n  private int saldoEmCentavos;\n\n  void depositar(int valor) {\n    if (valor <= 0) {\n      throw new IllegalArgumentException("Valor inválido");\n    }\n    saldoEmCentavos += valor;\n  }\n}',
        exercise:
          "Descreva um método sacar que impeça valores negativos e saques acima do saldo. O que deve acontecer em cada situação inválida?",
        hint: "Verifique as condições antes de alterar o saldo. Usar centavos inteiros também evita alguns problemas de arredondamento monetário.",
      },
      {
        id: "polimorfismo",
        title: "Programe para contratos",
        minutes: 12,
        explanation:
          "Uma interface define um contrato. Classes diferentes podem cumpri-lo de formas diferentes. O código que depende da interface usa o contrato sem precisar conhecer cada implementação. Isso é uma forma de polimorfismo.",
        analogy:
          "Uma tomada define um encaixe. Uma luminária e um carregador fazem coisas diferentes, mas podem usar o mesmo contrato de conexão.",
        code: "interface Notificador {\n  void enviar(String mensagem);\n}\n\nclass Console implements Notificador {\n  public void enviar(String mensagem) {\n    System.out.println(mensagem);\n  }\n}",
        exercise:
          "Imagine uma segunda implementação de Notificador para e-mail. Por que o serviço que usa Notificador não precisa mudar?",
        hint: "O serviço conhece enviar(String), não os detalhes de transporte. Pergunte a si mesmo onde deveria ficar a configuração de cada implementação.",
      },
    ],
  },
  {
    id: "web-fundamentos",
    category: "Front-end",
    title: "Fundamentos da web",
    symbol: "</>",
    color: "purple",
    description: "Entenda como HTML, CSS e JavaScript trabalham juntos no navegador.",
    questions: [
      "Qual é o papel de HTML, CSS e JavaScript em uma página web?",
      "Por que usar um button em vez de uma div clicável?",
      "Explique o box model e a diferença entre padding e margin.",
      "Como você faria um layout se adaptar a uma tela de celular?",
      "Qual é a diferença entre let e const? Uma const pode apontar para um objeto que muda?",
      "O que é um evento no navegador? Dê um exemplo de interação.",
      "Como funcionam Promise e async/await ao buscar dados de uma API?",
      "Como mostrar estados de carregamento, sucesso e erro em um formulário?",
      "Explique por que validar um formulário no navegador não substitui a validação no servidor.",
      "Quais verificações você faria para garantir que uma página funcione com teclado e leitor de tela?",
    ],
    lessons: [
      {
        id: "semantica",
        title: "Dê significado à página",
        minutes: 7,
        explanation:
          "HTML organiza o conteúdo por significado. Use títulos para a hierarquia, links para navegar e botões para ações. Elementos nativos já oferecem comportamento de teclado e informações úteis para tecnologias assistivas.",
        analogy:
          "HTML é a organização de uma biblioteca: títulos, seções e etiquetas ajudam as pessoas a encontrar o que precisam, mesmo sem ver a decoração.",
        code: '<main>\n  <h1>Minha trilha</h1>\n  <p>Aprenda um conceito por vez.</p>\n  <button type="button">Continuar</button>\n</main>',
        exercise:
          "Descreva o HTML de um formulário com nome, e-mail e um botão de envio. Como cada campo recebe um rótulo?",
        hint: "Use label associado ao id do campo. Placeholder não substitui um rótulo visível.",
      },
      {
        id: "layout",
        title: "Construa layouts flexíveis",
        minutes: 9,
        explanation:
          "CSS define a apresentação. Grid é útil para organizar linhas e colunas; Flexbox facilita distribuir itens em uma direção. Unidades relativas, larguras máximas e media queries ajudam o conteúdo a se adaptar.",
        analogy:
          "Um layout flexível se parece com prateleiras ajustáveis: os objetos são reorganizados quando o espaço diminui, sem cortar seu conteúdo.",
        code: ".cards {\n  display: grid;\n  grid-template-columns: repeat(\n    auto-fit, minmax(min(100%, 240px), 1fr)\n  );\n  gap: 1rem;\n}",
        exercise:
          "Imagine três cartões lado a lado no computador. Como você garantiria que eles continuem legíveis em uma tela estreita?",
        hint: "Evite larguras fixas que ultrapassem a tela. Verifique também quebra de palavras, espaços e tamanho dos controles.",
      },
      {
        id: "interacao",
        title: "Transforme ações em estados",
        minutes: 11,
        explanation:
          "Uma interação muda o estado da interface. Ao enviar dados, represente carregamento, sucesso e falha. Uma Promise pode resolver ou rejeitar; use tratamento de erro e dê uma forma de tentar novamente sem perder o texto digitado.",
        analogy:
          "Pedir comida envolve etapas: pedido enviado, preparação e entrega. Mostrar apenas o resultado final deixa a pessoa sem saber se o pedido chegou.",
        code: 'async function carregar() {\n  try {\n    const resposta = await fetch("/api/dados");\n    if (!resposta.ok) throw new Error("Falha");\n    return await resposta.json();\n  } catch {\n    throw new Error("Tente novamente em instantes.");\n  }\n}',
        exercise:
          "Quais estados um botão Salvar deveria ter durante uma requisição? O que deve acontecer se a conexão falhar?",
        hint: "Previna envios repetidos enquanto aguarda e preserve os dados do formulário quando houver erro.",
      },
    ],
  },
  {
    id: "postgresql",
    category: "Banco de dados",
    title: "SQL e PostgreSQL",
    symbol: "[ ]",
    color: "blue",
    description: "Organize informações, conecte tabelas e faça perguntas aos seus dados.",
    questions: [
      "O que representam uma tabela, uma linha e uma coluna em um banco relacional?",
      "Para que serve uma chave primária? Ela pode se repetir ou ser nula?",
      "Escreva um SELECT que busque o nome de alunos com idade acima de 18 anos.",
      "O que é uma chave estrangeira? Dê um exemplo com alunos e matrículas.",
      "Explique a diferença entre INNER JOIN e LEFT JOIN.",
      "Quando você usaria GROUP BY e HAVING? Dê um exemplo de consulta.",
      "O que é uma transação e por que uma transferência bancária precisa dela?",
      "Como um índice pode ajudar uma consulta e qual é o custo de mantê-lo?",
      "O que é SQL injection e como consultas parametrizadas ajudam a evitá-la?",
      "Dois usuários tentam reservar a última vaga ao mesmo tempo. Como você evitaria vender a mesma vaga duas vezes?",
    ],
    lessons: [
      {
        id: "relacoes",
        title: "Organize seus dados",
        minutes: 8,
        explanation:
          "Uma tabela representa um conjunto de registros com a mesma estrutura. A chave primária identifica cada linha. Chaves estrangeiras relacionam registros e ajudam o banco a impedir referências inválidas.",
        analogy:
          "Pense em fichas de uma biblioteca: cada livro recebe um identificador, e uma ficha de empréstimo aponta para esse identificador em vez de repetir todos os dados do livro.",
        code: "CREATE TABLE alunos (\n  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  nome text NOT NULL\n);\n\nINSERT INTO alunos (nome) VALUES ('Ana');",
        exercise:
          "Descreva as tabelas cursos e matrículas. Onde ficariam as chaves estrangeiras para ligar um aluno a um curso?",
        hint: "Uma matrícula pode apontar para um aluno e para um curso. Uma restrição UNIQUE pode impedir a mesma matrícula duplicada.",
      },
      {
        id: "consultas",
        title: "Faça perguntas com SQL",
        minutes: 10,
        explanation:
          "SELECT escolhe colunas, FROM indica a origem e WHERE filtra linhas. JOIN combina tabelas por uma condição. Use parâmetros para dados recebidos de usuários; não monte SQL concatenando texto digitado.",
        analogy:
          "Uma consulta é uma pergunta específica a um arquivo organizado: em qual gaveta procurar, quais fichas selecionar e quais informações mostrar.",
        code: "SELECT a.nome, c.titulo\nFROM matriculas m\nJOIN alunos a ON a.id = m.aluno_id\nJOIN cursos c ON c.id = m.curso_id\nWHERE a.id = $1;\n-- $1 é um parâmetro passado pelo programa.",
        exercise:
          "Qual JOIN você escolheria para listar todos os alunos, incluindo aqueles sem matrícula? Explique o que aparece nas colunas sem correspondência.",
        hint: "LEFT JOIN mantém as linhas da tabela à esquerda. Sem correspondência, as colunas da tabela à direita ficam nulas.",
      },
      {
        id: "transacoes",
        title: "Mantenha a consistência",
        minutes: 12,
        explanation:
          "Uma transação agrupa operações que devem confirmar juntas ou ser desfeitas. BEGIN inicia, COMMIT confirma e ROLLBACK desfaz. Sob concorrência, restrições e bloqueios podem ser necessários para proteger regras do negócio.",
        analogy:
          "Uma transferência precisa retirar de uma conta e acrescentar à outra. A operação não pode ficar pela metade se ocorrer uma falha.",
        code: "BEGIN;\n-- Operações relacionadas ficam na mesma transação.\nUPDATE contas SET saldo = saldo - 100 WHERE id = 1;\nUPDATE contas SET saldo = saldo + 100 WHERE id = 2;\nCOMMIT;\n-- Exemplo didático: regras de saldo e concorrência\n-- também precisam ser verificadas no sistema real.",
        exercise:
          "Se a segunda atualização falhar, por que a primeira não deveria ser confirmada? Como uma restrição do banco complementa a validação no código?",
        hint: "O banco deve preservar as regras mesmo quando dois pedidos chegam juntos. Considere uma restrição UNIQUE para uma reserva exclusiva.",
      },
    ],
  },
];

export function getTopic(id: string) {
  return topics.find((topic) => topic.id === id);
}
