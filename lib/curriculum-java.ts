import type { Lesson } from "./catalog";
const resources = [
  { title: "Aprender Java — documentação oficial", url: "https://dev.java/learn/" },
];
export const javaLessons: Lesson[] = [
  {
    id: "colecoes-generics",
    title: "List, Set e Map: escolha pela pergunta",
    minutes: 25,
    level: "Intermediário",
    resources,
    objectives: [
      "Escolher entre sequência, conjunto e associação por chave",
      "Usar generics para verificar tipos",
    ],
    explanation:
      "Uma coleção guarda vários elementos. List preserva uma sequência e permite repetições; Set representa elementos distintos; Map associa uma chave a um valor. Escolha pelas operações necessárias, não apenas pelo tamanho dos dados.",
    analogy:
      "Uma chamada tem ordem; um conjunto de participantes elimina repetições; uma agenda encontra contatos por uma chave.",
    sections: [
      {
        title: "O tipo faz parte do contrato",
        body: "List<String> informa que os elementos são textos. Evite o tipo cru List, que perde verificações do compilador. Programe para a interface e escolha uma implementação, como ArrayList, ao construir a coleção.",
      },
      {
        title: "Modificação e identidade",
        body: "List.of cria uma lista não modificável, mas não torna imutáveis os objetos que ela contém. HashSet depende de equals e hashCode para reconhecer duplicatas. HashMap mantém um valor por chave: uma nova associação pode substituir a anterior.",
      },
    ],
    code: 'var nomes = new java.util.ArrayList<String>();\nnomes.add("Ana"); nomes.add("Ana");\nvar unicos = new java.util.HashSet<>(nomes);\nSystem.out.println(nomes.size()); // 2\nSystem.out.println(unicos.size()); // 1',
    exercise:
      "Escolha coleções para inscrições em ordem, temas sem repetição e notas por matrícula. Justifique as três escolhas.",
    hint: "Pergunte se a ordem importa, se duplicatas são válidas e como encontrará um elemento.",
    lab: {
      tool: "JShell do JDK 21+",
      setup:
        "Opcional: abra jshell com um JDK instalado. O exemplo usa apenas a biblioteca padrão.",
      steps: [
        "Preveja os tamanhos antes de executar.",
        "Troque o segundo nome e observe o conjunto.",
        "Crie um HashMap<String, Integer> com notas por matrícula.",
        "Atualize uma chave existente e explique o resultado.",
      ],
      expected: "Lista, conjunto e mapa respondem a perguntas diferentes sem conversões inseguras.",
      troubleshooting: "Se add falhar, confira se usou uma lista não modificável com List.of.",
    },
  },
  {
    id: "excecoes",
    title: "Exceções: recuse sem esconder o problema",
    minutes: 28,
    level: "Intermediário",
    resources,
    objectives: [
      "Distinguir entrada inválida de falha inesperada",
      "Preservar o estado após uma recusa",
    ],
    explanation:
      "Uma exceção interrompe o fluxo normal. Capture-a onde existe uma decisão de recuperação, em vez de continuar como se a operação tivesse funcionado. Valide as condições antes de modificar dados.",
    analogy: "Uma encomenda recusada precisa de um motivo, não de um recibo de sucesso.",
    sections: [
      {
        title: "Regras antes de mudanças",
        body: "Num saque, confira valor positivo e saldo suficiente antes de atualizar o campo. Uma falha não deve deixar o objeto parcialmente modificado. A interface traduz o motivo em uma orientação sem expor detalhes internos.",
      },
      {
        title: "Recursos também precisam terminar",
        body: "Não use catch amplo apenas para ignorar um erro. Para arquivos e outros recursos que implementam AutoCloseable, try-with-resources garante o fechamento ao sair do bloco. Indisponibilidade de um serviço é diferente de uma entrada que a pessoa pode corrigir.",
      },
    ],
    code: 'int sacar(int saldo, int valor) {\n  if (valor <= 0) throw new IllegalArgumentException("Valor deve ser positivo");\n  if (valor > saldo) throw new IllegalStateException("Saldo insuficiente");\n  return saldo - valor;\n}',
    exercise: "Defina retorno ou exceção para sacar 0, -10, 50 e 200 de um saldo de 100 centavos.",
    hint: "Registre também o estado final, inclusive nos caminhos de erro.",
    lab: {
      tool: "JShell ou rastreamento por escrito",
      setup: "O método trabalha com centavos inteiros e não acessa banco.",
      steps: [
        "Declare o método.",
        "Teste a operação válida.",
        "Capture uma exceção esperada para uma entrada negativa.",
        "Confirme que uma recusa não altera o saldo original.",
      ],
      expected: "Cada caso inválido tem motivo claro e não produz atualização parcial.",
      troubleshooting:
        "Se toda entrada parece funcionar, procure um catch que transforma falhas em sucesso.",
    },
  },
  {
    id: "igualdade",
    title: "Identidade, equals e hashCode",
    minutes: 30,
    level: "Intermediário",
    resources,
    objectives: ["Diferenciar referência de igualdade de valor", "Escolher chaves estáveis"],
    explanation:
      "Em objetos, == compara referências. equals pode representar igualdade de valor. Objetos iguais por equals precisam ter o mesmo hashCode, mas hashes iguais não provam igualdade.",
    analogy:
      "Duas cópias de um cartão podem representar a mesma matrícula sem serem o mesmo objeto físico.",
    sections: [
      {
        title: "Defina o que significa ser igual",
        body: "Uma matrícula estável é mais adequada para identificar um estudante que seu nome. Pessoas diferentes podem ter nomes iguais. Records oferecem igualdade baseada nos componentes, útil quando todos eles fazem parte do valor.",
      },
      {
        title: "Não mude uma chave durante a busca",
        body: "Alterar campos usados em equals e hashCode após inserir um objeto em HashSet pode impedir sua localização. Prefira valores estáveis e teste o comportamento da coleção. Não confunda igualdade com a impressão do conteúdo.",
      },
    ],
    code: 'record Matricula(String numero) {}\nvar a = new Matricula("A01");\nvar b = new Matricula("A01");\nSystem.out.println(a == b); // false\nSystem.out.println(a.equals(b)); // true\nvar conjunto = new java.util.HashSet<Matricula>();\nconjunto.add(a); conjunto.add(b);\nSystem.out.println(conjunto.size()); // 1',
    exercise:
      "Por que nome mutável seria uma chave arriscada? Proponha um teste com nomes iguais e matrículas diferentes.",
    hint: "Separe referência em memória, valor e identificador da entidade.",
    lab: {
      tool: "JShell do JDK 21+",
      setup:
        "O record é um exemplo de valor simples; não representa toda a modelagem de uma pessoa.",
      steps: [
        "Compare == e equals.",
        "Insira as duas matrículas A01 no conjunto.",
        "Acrescente A02 e preveja o tamanho.",
        "Explique por que uma colisão de hash ainda exige equals.",
      ],
      expected: "A01 aparece uma vez e A02 é um valor distinto.",
      troubleshooting: "Numa classe comum, confira a coerência entre equals e hashCode.",
    },
  },
  {
    id: "composicao",
    title: "Composição e dependências substituíveis",
    minutes: 30,
    level: "Avançado",
    resources,
    objectives: ["Distribuir responsabilidades", "Testar sem depender de transporte externo"],
    explanation:
      "Composição constrói um objeto com colaboradores. Um serviço de matrícula pode receber um notificador no construtor, mantendo a regra separada do transporte e das credenciais de e-mail.",
    analogy:
      "Uma escola contrata uma entrega; ela não precisa virar uma transportadora para enviar avisos.",
    sections: [
      {
        title: "Interfaces pequenas",
        body: "Exponha apenas o comportamento de que o serviço precisa. Passe a implementação pelo construtor, em vez de criá-la dentro de cada método. Um substituto de teste pode guardar mensagens numa lista sem usar rede.",
      },
      {
        title: "Herança exige substituição válida",
        body: "Herdar apenas para reaproveitar linhas pode impor comportamentos inadequados. A subclasse precisa respeitar as promessas do tipo-base. Prefira composição quando a relação é ter um colaborador, não ser uma especialização válida.",
      },
    ],
    code: 'interface Aviso { void enviar(String texto); }\nclass Matriculas {\n  private final Aviso aviso;\n  Matriculas(Aviso aviso) { this.aviso = aviso; }\n  void confirmar(String curso) { aviso.enviar("Matrícula em " + curso); }\n}\nnew Matriculas(System.out::println).confirmar("Java");',
    exercise:
      "Separe cadastro, cálculo de nota e aviso em responsabilidades. Qual contrato cada uma expõe?",
    hint: "O teste do cálculo não deveria precisar de uma credencial de e-mail.",
    lab: {
      tool: "JShell e diagrama de responsabilidades",
      setup: "O trecho imprime no console; não envia e-mail real.",
      steps: [
        "Execute com System.out::println.",
        "Crie uma lista de mensagens.",
        "Passe uma lambda que adiciona à lista.",
        "Verifique o aviso sem uma chamada externa.",
      ],
      expected: "O transporte muda e a regra continua usando o mesmo contrato.",
      troubleshooting:
        "Se o teste precisa da internet, procure a dependência ainda criada dentro do serviço.",
    },
  },
  {
    id: "testes-java",
    title: "Teste regras, limites e falhas",
    minutes: 35,
    level: "Avançado",
    resources,
    objectives: ["Construir casos de fronteira", "Verificar resultados observáveis"],
    explanation:
      "Um teste descreve uma regra e compara o resultado com uma expectativa. Executar sem erro não basta. Inclua limites e caminhos recusados, verificando também o estado depois da tentativa.",
    analogy: "Testar uma ponte sem carga não demonstra que ela suporta o limite prometido.",
    sections: [
      {
        title: "Preparar, agir e verificar",
        body: "Prepare dados mínimos, faça uma operação e confira seu efeito. Escreva a regra antes da implementação. A mensagem de falha deve explicar qual comportamento se perdeu, não apenas indicar um método chamado.",
      },
      {
        title: "Controle as dependências",
        body: "Tempo, aleatoriedade e rede podem tornar testes instáveis. Use colaboradores controláveis para testar sucesso e falha. Um teste unitário não prova a configuração de um banco ou serviço real; isso exige uma integração separada.",
      },
    ],
    code: 'int restante(int vagas, int pedidos) {\n  if (pedidos < 0 || pedidos > vagas) throw new IllegalArgumentException();\n  return vagas - pedidos;\n}\nif (restante(3, 3) != 0) throw new AssertionError("Última vaga");\nif (restante(3, 0) != 3) throw new AssertionError("Sem pedidos");',
    exercise:
      "Teste quantidade zero, igual ao limite, negativa e acima do limite. Declare quais casos são permitidos.",
    hint: "O exemplo permite zero; outra regra pode recusá-lo. Teste a regra escolhida.",
    lab: {
      tool: "JShell / biblioteca padrão",
      setup: "As verificações lançam AssertionError explicitamente e não dependem da opção -ea.",
      steps: [
        "Execute as verificações válidas.",
        "Teste a exceção para uma quantidade negativa.",
        "Introduza temporariamente um erro na regra.",
        "Confirme que o teste falha e restaure o código.",
      ],
      expected: "Os testes demonstram a regra e detectam uma alteração incorreta.",
      troubleshooting: "Um catch que ignora qualquer erro pode mascarar um teste defeituoso.",
    },
  },
  {
    id: "projeto-java",
    title: "Projeto: matrículas com regras e testes",
    minutes: 50,
    level: "Avançado",
    resources,
    objectives: ["Integrar objetos, coleções e contratos", "Definir critérios de aceite"],
    explanation:
      "Construa um sistema em memória para matricular estudantes em cursos com vagas. Separe modelo, regras e apresentação. Persistência e autenticação seriam outras camadas de uma aplicação publicada.",
    analogy: "Valide primeiro o funcionamento de uma secretaria com fichas e regras claras.",
    sections: [
      {
        title: "Comece pelos casos de uso",
        body: "Cadastre um curso, consulte vagas e confirme uma matrícula. Use identificadores estáveis e impeça duplicidade. Evite misturar mensagens para a tela com atualização de coleções.",
      },
      {
        title: "Entregue evidências",
        body: "Demonstre um caso aceito e três recusados: duplicidade, lotação e identificador inexistente. Confirme que as recusas não mudam o estado. Documente que os dados em memória são perdidos quando o processo termina.",
      },
    ],
    code: "record Aluno(String matricula, String nome) {}\ninterface CatalogoCursos {\n  int vagasDisponiveis(String curso);\n}\n// Implemente a matrícula verificando regras antes de alterar o estado.",
    exercise:
      "Entregue o código, os casos de teste e um README com instruções e limitações. Como concorrência mudaria o desenho?",
    hint: "Comece sem rede e só acrescente persistência depois de demonstrar as regras.",
    lab: {
      tool: "JDK 21+ e editor",
      setup: "Crie um projeto separado e use apenas dados fictícios.",
      steps: [
        "Defina objetos e três regras.",
        "Implemente o catálogo em memória.",
        "Escreva casos aceitos e recusados.",
        "Substitua o notificador nos testes e documente limitações.",
      ],
      expected: "Uma demonstração reproduzível preserva o estado em operações recusadas.",
      troubleshooting:
        "Se tudo está numa classe, separe a regra da impressão de mensagens antes de ampliar o projeto.",
    },
  },
];
