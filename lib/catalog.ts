import { secondaryTopics } from "./secondary-curriculum";
import { additionalLessons } from "./curriculum";

export type Lesson = {
  id: string;
  title: string;
  minutes: number;
  explanation: string;
  analogy: string;
  code: string;
  exercise: string;
  hint: string;
  level?: "Fundamentos" | "Intermediário" | "Avançado";
  objectives?: string[];
  sections?: { title: string; body: string }[];
  lab?: { tool: string; setup: string; steps: string[]; expected: string; troubleshooting: string };
  demo?: "form" | "catalog" | "dashboard" | "responsive" | "objects" | "sql" | "iot";
  resources?: { title: string; url: string }[];
};
export type Topic = {
  area?: "secondary";
  id: string;
  category: string;
  title: string;
  description: string;
  symbol: string;
  color: string;
  shortTitle: string;
  introduction: string;
  goalExamples: string[];
  glossary: { term: string; meaning: string }[];
  questions: string[];
  lessons: Lesson[];
};

const coreTopics: Topic[] = [
  {
    id: "java-poo",
    category: "Back-end",
    title: "Java e orientação a objetos",
    symbol: "{ }",
    color: "orange",
    shortTitle: "Programação com Java",
    introduction:
      "Java é uma linguagem para escrever programas. Aqui, você vai aprender a organizar informações e ações usando objetos. Não precisa instalar nada para ler as aulas ou fazer os exercícios por escrito.",
    description: "Entenda como dar instruções ao computador e organizar um programa em partes.",
    goalExamples: [
      "Quero aprender Java do zero.",
      "Tenho uma prova de orientação a objetos.",
      "Quero organizar melhor meu programa.",
    ],
    glossary: [
      { term: "Programa", meaning: "Conjunto de instruções que o computador executa." },
      {
        term: "Classe",
        meaning: "Modelo que descreve as informações e ações de um tipo de objeto.",
      },
      {
        term: "Objeto",
        meaning: "Uma unidade criada a partir de uma classe, com seus próprios dados.",
      },
      { term: "Método", meaning: "Uma ação definida dentro de uma classe." },
    ],
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
    shortTitle: "Criação de sites",
    introduction:
      "Uma página é formada por conteúdo, aparência e comportamento. Você vai conhecer as linguagens que cuidam dessas partes: HTML, CSS e JavaScript. Comece pela explicação; o código é opcional na primeira leitura.",
    description: "Aprenda como montar uma página, mudar sua aparência e criar interações.",
    goalExamples: [
      "Quero criar meu primeiro site.",
      "Preciso entender HTML e CSS para uma prova.",
      "Quero fazer uma página funcionar no celular.",
    ],
    glossary: [
      {
        term: "HTML",
        meaning:
          "Linguagem que organiza os conteúdos de uma página, como títulos, textos e botões.",
      },
      { term: "CSS", meaning: "Regras que definem a aparência da página, como cores e espaços." },
      {
        term: "JavaScript",
        meaning: "Linguagem que adiciona comportamento à página, como reagir a um clique.",
      },
      {
        term: "Navegador",
        meaning: "Programa usado para abrir sites, como Firefox, Chrome ou Edge.",
      },
    ],
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
    shortTitle: "Banco de dados e SQL",
    introduction:
      "Um banco de dados guarda informações de forma organizada. SQL é a linguagem usada para consultar esses dados. As primeiras aulas explicam os conceitos; você não precisa ter um banco instalado para acompanhar.",
    description: "Descubra como guardar informações e encontrar os dados de que você precisa.",
    goalExamples: [
      "Quero entender bancos de dados do zero.",
      "Preciso aprender consultas SQL.",
      "Quero guardar dados de um projeto.",
    ],
    glossary: [
      {
        term: "Banco de dados",
        meaning: "Sistema que organiza e guarda informações para consultar e atualizar depois.",
      },
      {
        term: "Tabela",
        meaning: "Organização de dados em linhas e colunas, parecida com uma planilha.",
      },
      {
        term: "SQL",
        meaning: "Linguagem para pedir e modificar informações em bancos relacionais.",
      },
      { term: "PostgreSQL", meaning: "Um programa de banco de dados que entende SQL." },
    ],
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
  {
    id: "iot-fundamentos",
    category: "IoT",
    title: "IoT — Internet das Coisas",
    shortTitle: "IoT: objetos conectados",
    introduction:
      "IoT significa Internet das Coisas. Pense em uma lâmpada que você controla pelo celular ou em um sensor que avisa quando uma planta precisa de água. Vamos entender essas ideias sem precisar comprar placas ou sensores.",
    description:
      "Entenda como sensores e dispositivos trocam informações, como em uma casa inteligente.",
    symbol: "IoT",
    color: "cyan",
    goalExamples: [
      "Quero entender o que é Internet das Coisas.",
      "Quero conhecer sensores e automação.",
      "Tenho uma ideia de projeto com objetos conectados.",
    ],
    glossary: [
      {
        term: "IoT",
        meaning:
          "Sigla de Internet of Things, ou Internet das Coisas: objetos físicos que coletam ou trocam dados por uma rede.",
      },
      {
        term: "Sensor",
        meaning: "Componente que mede algo do ambiente, como temperatura, luz ou umidade.",
      },
      {
        term: "Atuador",
        meaning: "Componente que realiza uma ação física, como um motor que abre uma janela.",
      },
      {
        term: "Broker MQTT",
        meaning: "Servidor que recebe mensagens e as encaminha aos dispositivos interessados.",
      },
    ],
    questions: [
      "O que você entende por Internet das Coisas? Dê um exemplo de um objeto conectado.",
      "Um termômetro mede a temperatura e um ventilador movimenta o ar. Qual deles age como sensor e qual como atuador? Por quê?",
      "Uma planta recebe água automaticamente quando a terra seca. Que informação o sistema precisa medir?",
      "Qual é a função de uma placa de controle, como um ESP32, em um projeto com sensor e lâmpada?",
      "Por que um dispositivo conectado pode precisar continuar funcionando mesmo sem internet?",
      "Explique como uma medição de temperatura pode sair de um sensor e aparecer em uma página no celular.",
      "No MQTT, um dispositivo publica uma mensagem em um tópico e outro assina esse tópico. Como um broker participa dessa troca?",
      "Um sensor envia medições em Celsius, mas um programa interpreta os números como Fahrenheit. Como evitar essa confusão nos dados?",
      "Que cuidados você tomaria para impedir que pessoas não autorizadas controlassem uma fechadura conectada?",
      "Um sistema de irrigação recebe uma leitura errada de umidade. Como você evitaria que ele desperdiçasse água ou danificasse a planta?",
    ],
    lessons: [
      {
        id: "objetos-conectados",
        title: "O que é um objeto conectado?",
        minutes: 7,
        explanation:
          "Internet das Coisas, ou IoT, é o uso de objetos físicos capazes de coletar ou trocar dados por uma rede. Um sensor mede algo: por exemplo, a temperatura. Um programa recebe essa medida e decide o que fazer. Um atuador realiza uma ação física, como ligar um ventilador. Nem todo objeto precisa se comunicar pela internet o tempo todo; parte das decisões pode acontecer no próprio dispositivo.",
        analogy:
          "Pense em uma pessoa cuidando de uma planta. Ela sente a terra seca, decide regar e abre a torneira. Em um sistema automático, o sensor percebe a umidade, o programa toma uma decisão e a válvula ou bomba executa a ação.",
        code: '// Pseudocódigo: descreve a ideia, não roda em uma placa.\numidade = ler_sensor()\nse umidade estiver baixa:\n    avisar("A planta precisa de água")',
        exercise:
          "Escolha um objeto da sua casa que poderia ser automatizado. Descreva o que ele precisaria medir e que ação deveria realizar.",
        hint: "Comece com uma situação simples: acender uma luz quando escurece. A luz ambiente é a medida; ligar a lâmpada é a ação. Você não precisa ter os componentes para descrever o projeto.",
      },
      {
        id: "caminho-dos-dados",
        title: "Como os dados chegam até você",
        minutes: 9,
        explanation:
          "Uma placa de controle, como o ESP32, executa um programa e pode ler um sensor. Ela transforma a leitura em dados que outro programa consegue interpretar. Esses dados podem passar por uma rede local ou pela internet e chegar a um serviço que os guarda ou mostra em uma tela. Para interpretar a leitura, é importante informar o valor, a unidade e a origem. Uma rede é apenas o meio de comunicação: se ela falhar, o dispositivo precisa ter um comportamento definido.",
        analogy:
          "Imagine enviar um bilhete com uma medição. Escrever apenas 25 pode causar dúvida. Escrever quarto, 25 graus Celsius torna a mensagem mais clara. A rede é o caminho percorrido pelo bilhete; a tela é onde alguém lê a informação.",
        code: '// Exemplo de mensagem: um texto estruturado chamado JSON.\n{\n  "sensor": "quarto",\n  "temperatura": 25,\n  "unidade": "Celsius"\n}',
        exercise:
          "Descreva o caminho de uma leitura de temperatura até uma tela no celular. O que você mostraria se a última leitura fosse antiga porque a conexão caiu?",
        hint: "Organize em quatro partes: sensor, dispositivo, comunicação e tela. Mostrar quando a medição foi recebida ajuda a não confundir um dado antigo com a situação atual.",
      },
      {
        id: "mensagens-e-cuidados",
        title: "Troca de mensagens e cuidados básicos",
        minutes: 11,
        explanation:
          "MQTT é um protocolo, isto é, um conjunto de regras para trocar mensagens. Um dispositivo publica dados em um tópico, que funciona como o assunto da mensagem. Outros dispositivos assinam esse tópico para receber as mensagens. Um servidor chamado broker faz o encaminhamento. Em um projeto real, autenticação e permissões definem quem pode publicar e receber. Também é preciso proteger a conexão e planejar o que acontece quando a rede falha. MQTT por si só não resolve esses cuidados.",
        analogy:
          "Um broker funciona como uma central de avisos. O sensor envia notícias para o assunto casa/quarto/temperatura. A tela se inscreve nesse assunto e a central entrega os avisos a ela. Não é preciso enviar uma cópia diretamente para cada tela.",
        code: '// Exemplo conceitual, sem conexão com dispositivos reais.\nTópico: casa/quarto/temperatura\nMensagem: { "valor": 25, "unidade": "Celsius" }\n\nSensor → publica no broker → tela recebe o tópico',
        exercise:
          "Imagine uma janela automática. Que cuidados você tomaria para que ela não recebesse comandos de estranhos e não se movesse de forma perigosa ao perder a conexão?",
        hint: "Pense em três perguntas: quem pode dar o comando, como o dispositivo verifica esse comando e qual deve ser o estado seguro se algo falhar.",
      },
    ],
  },
];

export const topics: Topic[] = coreTopics.map((topic) => ({
  ...topic,
  lessons: [
    ...topic.lessons.map((lesson) => ({
      ...lesson,
      level: "Fundamentos" as const,
      ...(topic.id === "java-poo" && lesson.id === "encapsulamento"
        ? { demo: "objects" as const }
        : {}),
      ...(topic.id === "web-fundamentos"
        ? {
            demo: (lesson.id === "semantica"
              ? "form"
              : lesson.id === "layout"
                ? "responsive"
                : "dashboard") as Lesson["demo"],
          }
        : {}),
      ...(topic.id === "postgresql" && lesson.id === "consultas" ? { demo: "sql" as const } : {}),
      ...(topic.id === "iot-fundamentos" && lesson.id === "objetos-conectados"
        ? { demo: "iot" as const }
        : {}),
    })),
    ...(additionalLessons[topic.id] ?? []),
  ],
}));

export function orderedTopicLessons(topic: Topic, recommended: string[] = []): Lesson[] {
  const ids = [...new Set([...recommended, ...topic.lessons.map((lesson) => lesson.id)])];
  return ids.flatMap((id) => topic.lessons.find((lesson) => lesson.id === id) ?? []);
}

export function getTopic(id: string) {
  return [...topics, ...secondaryTopics].find((topic) => topic.id === id);
}
