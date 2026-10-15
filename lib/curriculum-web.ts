import type { Lesson } from "./catalog";
const resources = [
  {
    title: "MDN — desenvolvimento Web",
    url: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development",
  },
];
export const webLessons: Lesson[] = [
  {
    id: "dom-eventos",
    title: "DOM e eventos: um catálogo que responde",
    minutes: 25,
    level: "Intermediário",
    demo: "catalog",
    resources,
    objectives: ["Relacionar dados e elementos visíveis", "Filtrar sem apagar os dados originais"],
    explanation:
      "DOM é a representação da página em elementos que o navegador pode atualizar. Eventos informam ações como digitar e clicar. Num catálogo, a busca é um estado e os cartões visíveis são derivados dela.",
    analogy: "Filtrar uma vitrine muda o que aparece, sem apagar os produtos do estoque.",
    sections: [
      {
        title: "Dados primeiro",
        body: "Guarde os itens numa estrutura separada e filtre por uma regra explícita. Evite reconstruir o estado lendo textos da tela. Nenhum resultado é um estado legítimo, diferente de uma falha de conexão.",
      },
      {
        title: "Ações previsíveis",
        body: "Adicionar ao carrinho deve atualizar o total sem perder o filtro. Quando a interface é produzida a partir de estado, evite modificar manualmente o mesmo elemento por outro caminho: duas fontes de verdade ficam inconsistentes.",
      },
    ],
    code: 'const consulta = "sensor";\nconst itens = [{ nome: "Sensor de luz" }, { nome: "Placa" }];\nconst visiveis = itens.filter(item =>\n  item.nome.toLowerCase().includes(consulta.toLowerCase())\n);',
    exercise:
      "Busque um termo inexistente, limpe a busca e adicione dois itens. Quais valores são guardados e quais podem ser calculados?",
    hint: "A lista filtrada pode ser calculada a partir dos itens e da consulta.",
    lab: {
      tool: "Catálogo funcional no navegador",
      setup: "Dados fictícios; não realiza compras nem pagamentos.",
      steps: [
        "Busque sensor.",
        "Teste um termo inexistente.",
        "Limpe e adicione dois itens.",
        "Reinicie a demonstração.",
      ],
      expected:
        "A busca altera os cartões e o carrinho acompanha as ações sem recarregar a página.",
      troubleshooting:
        "Lista vazia não significa que os dados foram apagados: confira primeiro o filtro.",
    },
  },
  {
    id: "formularios",
    title: "Formulários: erros que ajudam a corrigir",
    minutes: 30,
    level: "Intermediário",
    demo: "form",
    resources,
    objectives: [
      "Associar rótulos e mensagens aos campos",
      "Separar validação local e no servidor",
    ],
    explanation:
      "Um formulário explica o que espera e preserva o texto diante de um erro. Validação no navegador oferece resposta rápida, mas uma requisição pode ser criada fora dele. O servidor precisa validar tudo novamente.",
    analogy:
      "Uma ficha pode avisar que falta um campo; o atendente ainda precisa conferir o que recebeu.",
    sections: [
      {
        title: "Rótulo não é placeholder",
        body: "Associe label ao id do campo e indique o formato esperado. O erro precisa explicar o motivo e como corrigir, sem depender só de uma cor. Formato de e-mail válido não prova a existência da caixa.",
      },
      {
        title: "Sucesso deve ser verdadeiro",
        body: "Desabilite envios repetidos enquanto aguarda uma resposta. Anuncie sucesso somente após confirmação do serviço. Nesta tela, o envio é uma simulação local, claramente identificada, sem criação de conta real.",
      },
    ],
    code: '<label for="contato">E-mail de contato</label>\n<input id="contato" type="email" required\n  aria-describedby="ajuda-contato">\n<p id="ajuda-contato">Formato: nome@dominio.</p>',
    exercise:
      "Envie vazio, use um e-mail incompleto e corrija os campos. Quais verificações uma API repetiria?",
    hint: "Formato, tamanho e regra de negócio são verificações distintas.",
    lab: {
      tool: "Formulário demonstrativo",
      setup: "Use os dados fictícios fornecidos pelo próprio exemplo. Nada é enviado ao servidor.",
      steps: [
        "Envie sem preencher.",
        "Informe um endereço incompleto.",
        "Use Preencher exemplo e envie.",
        "Reinicie e observe o aviso de simulação.",
      ],
      expected: "Erros são legíveis e o sucesso não promete uma inscrição real.",
      troubleshooting:
        "Se o erro não for anunciado, confira a região de alerta e a associação ao campo.",
    },
  },
  {
    id: "api-estados",
    title: "API, carregamento e recuperação de falhas",
    minutes: 35,
    level: "Intermediário",
    demo: "dashboard",
    resources,
    objectives: ["Tratar status HTTP e falha de rede", "Evitar respostas antigas na tela"],
    explanation:
      "fetch pode resolver mesmo com um erro HTTP. Confira response.ok antes de interpretar os dados. Mostre a espera, preserve o contexto na falha e ofereça uma tentativa nova.",
    analogy: "Receber uma resposta da transportadora não significa que a entrega foi aceita.",
    sections: [
      {
        title: "Represente todos os caminhos",
        body: "Defina estados inicial, carregando, sucesso e erro. Uma lista vazia pode ser um sucesso sem registros. Não use um indicador infinito nem invente conteúdo como se fosse uma resposta real.",
      },
      {
        title: "A ordem de chegada varia",
        body: "Uma busca anterior pode terminar depois da atual. Cancele com AbortController ou confirme qual pedido ainda é relevante antes de atualizar o estado. Na demonstração, atraso e falha são produzidos localmente, sem API externa.",
      },
    ],
    code: 'const controle = new AbortController();\nconst r = await fetch("/api/cursos", { signal: controle.signal });\nif (!r.ok) throw new Error("Não foi possível carregar");\nconst cursos = await r.json();\n// Ao abandonar a busca: controle.abort();',
    exercise:
      "Simule uma falha no painel e tente novamente. Como impedir uma resposta antiga de sobrescrever o filtro atual?",
    hint: "Identifique a chamada relevante; cancelamento e descarte de respostas antigas se complementam.",
    lab: {
      tool: "Painel de dados fictícios",
      setup: "O ciclo de requisição é simulado; não há consumo de IA ou de serviço externo.",
      steps: [
        "Carregue os dados.",
        "Observe o estado de espera.",
        "Marque Simular falha e carregue outra vez.",
        "Desmarque e use Tentar novamente.",
      ],
      expected: "A tela diferencia espera, falha recuperável e sucesso.",
      troubleshooting:
        "Vários envios durante a espera indicam que o estado ocupado não controla o botão.",
    },
  },
  {
    id: "acessibilidade",
    title: "Teclado, foco e mensagens acessíveis",
    minutes: 30,
    level: "Avançado",
    demo: "form",
    resources,
    objectives: ["Auditar a navegação por teclado", "Anunciar mudanças sem depender da aparência"],
    explanation:
      "Uma tela funcional também deve funcionar sem mouse. Elementos nativos, foco visível, nomes acessíveis e mensagens compreensíveis permitem concluir uma ação por caminhos diferentes.",
    analogy: "Uma porta bonita continua inútil se a maçaneta não funciona para parte das pessoas.",
    sections: [
      {
        title: "Siga a ordem do documento",
        body: "Percorra a tela com Tab e Shift+Tab. Evite tabindex positivo para remendar a ordem visual. O foco não pode desaparecer ou ficar preso fora de um diálogo. Links navegam e botões executam ações.",
      },
      {
        title: "Dê nome às ações",
        body: "Um ícone precisa de um nome como Mostrar senha. Anuncie erros e conclusões com regiões apropriadas, sem fazer a página inteira falar a cada mudança. Teste zoom e textos longos, além do caminho ideal.",
      },
    ],
    code: '<button type="button" aria-label="Mostrar senha">\n  <svg aria-hidden="true"><!-- ícone --></svg>\n</button>\n<p role="status">Dados carregados.</p>',
    exercise:
      "Complete o exemplo só com teclado. Registre a ordem do foco e qualquer controle cujo propósito não esteja claro.",
    hint: "Teste Enter, Espaço e retorno do foco depois de fechar um diálogo.",
    lab: {
      tool: "Navegador e teclado",
      setup: "O formulário é fictício e não cria uma conta.",
      steps: [
        "Use apenas Tab e Shift+Tab.",
        "Acione botões pelo teclado.",
        "Provoque um erro e leia a orientação.",
        "Confira o formulário com zoom de 200%.",
      ],
      expected: "Toda ação é alcançável e o foco permanece identificável.",
      troubleshooting: "Se uma ação exigir clique, reveja o elemento e seu comportamento nativo.",
    },
  },
  {
    id: "estado-componentes",
    title: "Componentes e uma única fonte de estado",
    minutes: 35,
    level: "Avançado",
    demo: "catalog",
    resources,
    objectives: ["Distinguir estado de valores derivados", "Escolher onde compartilhar um estado"],
    explanation:
      "Componentes organizam partes da interface com propósito claro. Quando duas partes precisam do mesmo valor, compartilhe o estado no ancestral adequado em vez de criar cópias independentes que precisam ser sincronizadas.",
    analogy:
      "Duas pessoas consultam o mesmo placar, em vez de manter dois placares para uma partida.",
    sections: [
      {
        title: "Calcule o que puder",
        body: "Se já conhece os produtos e a busca, calcule os resultados filtrados. Guardar uma segunda lista independente pode deixá-la desatualizada. Identificadores estáveis evitam associar o estado ao cartão errado após reordenar.",
      },
      {
        title: "Eventos comunicam intenção",
        body: "O cartão avisa que alguém quer adicionar um produto; o dono do carrinho decide a atualização. Não modifique diretamente objetos compartilhados: produza o próximo estado a partir do anterior.",
      },
    ],
    code: "// Exemplo React\nsetCarrinho(anterior => [...anterior, produto]);\nconst visiveis = produtos.filter(p =>\n  p.nome.toLowerCase().includes(busca.toLowerCase())\n);",
    exercise:
      "Divida a vitrine em Busca, Lista e Resumo do carrinho. Que dados e ações cada parte recebe?",
    hint: "O total é derivado do carrinho e não precisa ser um segundo estado independente.",
    lab: {
      tool: "Vitrine demonstrativa",
      setup: "Alterações temporárias, apenas no navegador.",
      steps: [
        "Filtre e adicione um item.",
        "Troque o filtro.",
        "Observe que o total continua correto.",
        "Desenhe o fluxo de dados dos componentes.",
      ],
      expected: "Filtrar não apaga nem redefine o carrinho.",
      troubleshooting:
        "Se o filtro altera a quantidade comprada, duas responsabilidades foram misturadas.",
    },
  },
  {
    id: "projeto-web",
    title: "Projeto: portal de cursos responsivo",
    minutes: 55,
    level: "Avançado",
    demo: "responsive",
    resources,
    objectives: ["Integrar layout, estado e acessibilidade", "Definir uma entrega verificável"],
    explanation:
      "Construa um portal com busca de cursos, detalhes de aula e formulário de interesse. Comece pela estrutura semântica, adapte o conteúdo a telas estreitas e acrescente interações sem prometer uma matrícula real quando só há uma demonstração.",
    analogy: "Um mapa do campus precisa ser útil tanto no bolso quanto num mural.",
    sections: [
      {
        title: "Critérios antes da decoração",
        body: "Defina resultados para busca vazia, falha de dados e campos inválidos. Teste teclado, zoom e nomes longos. Uma largura estreita não deve cortar o conteúdo ou exigir rolagem lateral para ações simples.",
      },
      {
        title: "Apresentação e serviço são camadas",
        body: "Uma página estática pode demonstrar fluxos com dados fictícios. Cadastro, senhas e dados pessoais reais exigem servidor e proteção adicional. Documente quais ações são locais e quais dependem de uma API.",
      },
    ],
    code: ".cursos {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));\n  gap: 1rem;\n}\ninput, button { font: inherit; }",
    exercise:
      "Entregue uma tela estreita, uma larga e um roteiro de teste por teclado com os casos de falha.",
    hint: "Teste os estados vazios e textos longos antes de acrescentar efeitos.",
    lab: {
      tool: "Editor e navegador",
      setup: "O exemplo abaixo reorganiza uma estrutura de cartões dentro da própria página.",
      steps: [
        "Compare as duas larguras da demonstração.",
        "Monte título, navegação e cartões.",
        "Acrescente busca e estados vazios.",
        "Teste em 390 pixels e por teclado e registre o resultado.",
      ],
      expected: "Conteúdo legível sem rolagem horizontal e ações com estados claros.",
      troubleshooting:
        "Procure larguras mínimas fixas e palavras longas sem quebra se a tela ultrapassar a janela.",
    },
  },
];
