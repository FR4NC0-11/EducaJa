import type { Topic } from "./catalog";
import { lesson } from "./secondary-lesson";
import { secondaryExtraLessons } from "./secondary-expansion";
const initialSecondaryTopics: Topic[] = [
  {
    id: "em3-matematica-contagem",
    area: "secondary",
    category: "Matemática",
    title: "Contagem e probabilidade",
    shortTitle: "Matemática: contagem",
    description:
      "Contagem, permutações, combinações e probabilidade: avance com exemplos e exercícios.",
    symbol: "×",
    color: "orange",
    introduction:
      "3ª série · Primeira unidade de Matemática. Retomamos contagem antes de avançar para combinatória e probabilidade.",
    goalExamples: ["Quero entender problemas de contagem."],
    glossary: [
      { term: "Etapa", meaning: "Uma escolha que faz parte da construção de um resultado." },
      { term: "Casos disjuntos", meaning: "Grupos de resultados sem elementos em comum." },
    ],
    questions: [],
    lessons: [
      lesson(
        "em3-contagem-etapas",
        "Somar ou multiplicar possibilidades?",
        [
          "Distinguir escolhas sucessivas de casos alternativos.",
          "Conferir uma contagem por listagem e justificar a estratégia.",
        ],
        "Contar possibilidades é organizar resultados diferentes sem omitir nem repetir. Antes de escolher uma operação, descreva o que forma um resultado completo. Um lanche com uma bebida é diferente de escolher somente um lanche ou somente uma bebida.",
        [
          {
            title: "Primeiro, liste",
            body: "Uma cantina oferece sanduíches A, B e C e bebidas X e Y. Um combo contém exatamente um sanduíche e uma bebida. Os combos são AX, AY, BX, BY, CX e CY: seis resultados. A listagem mostra por que nenhuma escolha foi esquecida.",
          },
          {
            title: "Etapas: multiplicar",
            body: "Há três escolhas na primeira etapa e, para cada uma, duas na segunda. Portanto, 3 × 2 = 6 combos. A regra depende do enunciado: se a quantidade de opções da segunda etapa mudar conforme a primeira, separe os casos em vez de multiplicar números sem conferir.",
          },
          {
            title: "Alternativas: somar sem sobreposição",
            body: "Se o pedido for apenas um sanduíche OU apenas uma bebida, são 3 + 2 = 5 itens possíveis. Esses grupos não se sobrepõem. Se dois grupos compartilharem resultados, somar suas quantidades diretamente conta a parte comum duas vezes.",
          },
          {
            title: "Restrição muda a contagem",
            body: "Se o sanduíche C não puder acompanhar Y, A tem duas opções, B tem duas e C tem uma. Total: 2 + 2 + 1 = 5. Também podemos retirar o único combo proibido dos seis originais. A justificativa é mais importante que decorar uma palavra-chave.",
          },
        ],
        "Escolher uma camiseta e uma calça forma um conjunto em duas etapas. Escolher levar somente uma camiseta ou somente uma calça seleciona um item de grupos alternativos. O resultado que queremos contar mudou.",
        "Uma identificação usa uma letra de A, B ou C, seguida de um algarismo de 1 a 4. a) Quantas identificações existem? b) Se C não puder ser seguida de 4, quantas restam? c) Se for permitido escolher apenas uma letra OU apenas um desses algarismos, quantas escolhas existem? Justifique e liste as possibilidades de um dos casos.",
        "Descreva um resultado completo antes da operação. No item b, existe exatamente um par proibido.",
        "a) 3 × 4 = 12: A1 a A4, B1 a B4 e C1 a C4. b) 12 − 1 = 11, retirando C4. c) 3 + 4 = 7 itens. Se respondeu 12 no item c, tratou uma escolha única como duas etapas.",
        [
          {
            title: "OBMEP/IMPA — princípios de contagem",
            url: "https://portaldaobmep.impa.br/index.php/modulo/ver?a=1&modulo=15",
          },
        ],
      ),
    ],
  },
  {
    id: "em3-linguagens-leitura",
    area: "secondary",
    category: "Linguagens",
    title: "Leitura, interpretação e redação Enem",
    shortTitle: "Linguagens: interpretação",
    description:
      "Da interpretação à redação Enem: planeje, argumente e revise com prática autoral.",
    symbol: "Aa",
    color: "purple",
    introduction:
      "3ª série · Primeira unidade de Linguagens. Texto e exercícios autorais; não são questões oficiais de exame.",
    goalExamples: ["Quero justificar melhor minhas interpretações."],
    glossary: [
      {
        term: "Inferência",
        meaning: "Conclusão sustentada por pistas do texto, mesmo sem estar escrita diretamente.",
      },
      {
        term: "Evidência textual",
        meaning: "Trecho ou informação do texto que sustenta uma interpretação.",
      },
    ],
    questions: [],
    lessons: [
      lesson(
        "em3-leitura-evidencias",
        "O que o texto diz e o que podemos concluir?",
        [
          "Localizar informação explícita.",
          "Justificar uma inferência e reconhecer o que o texto não permite afirmar.",
        ],
        "Interpretar não é adivinhar a intenção de alguém. É construir uma leitura apoiada no que está escrito e no contexto disponível. Uma boa resposta apresenta uma conclusão e explica quais pistas a sustentam.",
        [
          {
            title: "Texto de trabalho — autoral",
            body: "Na terça-feira, a biblioteca da escola ficou aberta até as 19 horas para receber a feira de troca de livros. Às 18h30, Lara ainda organizava os exemplares devolvidos. Ao terminar, colocou na entrada um cartaz: ‘Traga uma história, leve outra’. No dia seguinte, três colegas perguntaram quando a feira voltaria.",
          },
          {
            title: "Informação explícita",
            body: "A feira aconteceu na terça-feira e a biblioteca ficou aberta até as 19 horas. Essas informações estão diretamente registradas. O texto também diz o que Lara fazia às 18h30; ele não diz que ela era a única responsável pelo evento.",
          },
          {
            title: "Inferência com justificativa",
            body: "Podemos inferir interesse de pelo menos três colegas em uma nova edição, porque eles perguntaram quando a feira voltaria. Isso não autoriza concluir que todos os estudantes participaram ou aprovaram o evento. A abrangência da conclusão deve respeitar a abrangência da evidência.",
          },
          {
            title: "Avaliação pessoal e ausência de informação",
            body: "Dizer que a feira foi a melhor atividade do ano é uma avaliação que exigiria critérios e comparação não fornecidos. Também não sabemos quantos livros foram trocados. Distinguir ‘não foi informado’ de ‘não aconteceu’ evita conclusões sem base.",
          },
        ],
        "Ao receber uma mensagem ‘o ônibus atrasou; chego depois das oito’, sabemos que há um atraso informado. Podemos esperar uma chegada mais tarde, mas não descobrir o horário exato sem outra informação.",
        "Com base no texto da biblioteca: a) Em que dia ocorreu a feira? b) Que pista sustenta interesse em sua repetição? c) É possível afirmar que toda a escola gostou? d) Explique por que ‘não sabemos o total de livros trocados’ difere de ‘nenhum livro foi trocado’.",
        "Para cada conclusão, procure uma informação que a sustente. Confira se palavras como ‘todos’ ampliam indevidamente o alcance do texto.",
        "a) Terça-feira. b) Três colegas perguntaram quando haveria outra feira. c) Não: a manifestação de três pessoas não representa necessariamente toda a escola. d) Ausência de um número no relato não prova quantidade zero. Aceite justificativas equivalentes apoiadas no texto.",
        [],
      ),
    ],
  },
  {
    id: "em3-humanas-populacao",
    area: "secondary",
    category: "Ciências Humanas",
    title: "População, redes e sustentabilidade",
    shortTitle: "Humanas: população",
    description:
      "Interprete dados e migrações, analise redes globais e avalie propostas de consumo.",
    symbol: "↗",
    color: "cyan",
    introduction:
      "3ª série · Geografia. Os números desta unidade são fictícios e servem apenas à prática de interpretação.",
    goalExamples: ["Quero entender dados populacionais."],
    glossary: [
      {
        term: "Demografia",
        meaning: "Estudo das populações, de sua composição e de suas mudanças.",
      },
      { term: "Proporção", meaning: "Relação entre uma parte e o total ao qual ela pertence." },
    ],
    questions: [],
    lessons: [
      lesson(
        "em3-populacao-proporcoes",
        "Uma quantidade maior significa uma proporção maior?",
        [
          "Comparar números absolutos e percentuais.",
          "Separar descrição de dados e hipóteses sobre suas causas.",
        ],
        "Uma população pode ser estudada por idade, distribuição territorial e mudanças ao longo do tempo. Antes de comparar números, confira local, período, grupos e unidade de medida. Uma quantidade absoluta conta pessoas; uma proporção relaciona essa quantidade ao total.",
        [
          {
            title: "Dados fictícios para comparar",
            body: "No ano imaginário de referência, o município A tem 1.000 habitantes, sendo 200 com 60 anos ou mais. O município B tem 2.000 habitantes, sendo 300 com 60 anos ou mais. O grupo e o período são os mesmos nos dois lugares.",
          },
          {
            title: "Calcule e interprete",
            body: "Em A, 200 ÷ 1.000 = 0,20, ou 20%. Em B, 300 ÷ 2.000 = 0,15, ou 15%. B tem mais pessoas desse grupo em quantidade absoluta, mas A tem uma proporção maior. A resposta depende de qual comparação foi pedida.",
          },
          {
            title: "Descrever não é explicar a causa",
            body: "Esses dados permitem descrever uma diferença, mas não demonstram por que ela existe. Migrações e mudanças em nascimentos e mortes podem afetar a estrutura populacional; para investigar uma hipótese, seriam necessários outros dados e períodos.",
          },
          {
            title: "Leitura responsável",
            body: "Não misture dados de grupos etários diferentes e não trate uma fotografia de um ano como tendência comprovada. Uma pirâmide etária organiza grupos de idade e ajuda a comparar a composição populacional; seu formato precisa ser lido com escala, legenda, fonte e data.",
          },
        ],
        "Uma turma com 10 participantes de um clube entre 20 estudantes tem 50% de participação. Outra com 12 entre 40 tem 30%. A segunda tem mais participantes, mas menor proporção.",
        "Dois municípios fictícios C e D têm, respectivamente, 800 e 1.200 habitantes. Em C, 160 pessoas têm 60 anos ou mais; em D, 180. a) Calcule as proporções. b) Quem tem maior quantidade e quem tem maior proporção desse grupo? c) Esses números provam que houve migração? Explique que informação adicional você buscaria.",
        "Divida o grupo pelo total do mesmo município e multiplique por 100. Uma hipótese sobre causa precisa de evidências adicionais.",
        "a) C: 20%; D: 15%. b) D tem maior quantidade, C maior proporção. c) Não provam migração. Dados de entradas e saídas, nascimentos, mortes e comparação temporal ajudariam a investigar explicações. Outras propostas justificadas de evidência são válidas.",
        [
          {
            title: "IBGE Educa — leitura de pirâmides etárias",
            url: "https://educa.ibge.gov.br/jovens/conheca-o-brasil/populacao/18318-piramide-etaria",
          },
        ],
      ),
    ],
  },
  {
    id: "em3-natureza-hereditariedade",
    area: "secondary",
    category: "Ciências da Natureza",
    title: "Genética e biotecnologia",
    shortTitle: "Natureza: genética",
    description:
      "Da hereditariedade aos heredogramas, segregação independente e análise de biotecnologia.",
    symbol: "Aa",
    color: "green",
    introduction:
      "3ª série · Biologia. Modelos de plantas fictícias ajudam a estudar herança sem fazer previsões sobre a saúde de pessoas.",
    goalExamples: ["Quero compreender os primeiros conceitos de genética."],
    glossary: [
      { term: "Alelo", meaning: "Uma versão de uma sequência de DNA em uma posição do genoma." },
      {
        term: "Genótipo",
        meaning: "Constituição genética considerada em uma posição ou conjunto de posições.",
      },
      {
        term: "Fenótipo",
        meaning:
          "Característica observável, influenciada pela constituição genética e pelo ambiente.",
      },
    ],
    questions: [],
    lessons: [
      lesson(
        "em3-genetica-modelo",
        "Dois alelos, um modelo de herança",
        [
          "Distinguir alelo, genótipo e fenótipo.",
          "Interpretar uma proporção esperada sem tratá-la como resultado garantido.",
        ],
        "Usaremos um modelo didático de uma planta diploide fictícia: para a característica estudada, ela tem dois alelos, um herdado de cada progenitor. Chamaremos essas versões de A e a. As letras são símbolos do modelo, não medidas de força ou de valor.",
        [
          {
            title: "O que estamos representando",
            body: "AA, Aa e aa representam genótipos nesse modelo. Suponha dominância completa: AA e Aa têm flores violetas, e aa tem flores claras. A cor observada é o fenótipo. Dominante não quer dizer mais comum, melhor ou mais forte.",
          },
          {
            title: "Uma combinação de cada progenitor",
            body: "No cruzamento didático Aa × Aa, cada progenitor pode contribuir com A ou a, com probabilidades iguais. As combinações são AA, Aa, aA e aa. Aa e aA representam o mesmo genótipo heterozigoto: dois dos quatro resultados possíveis.",
          },
          {
            title: "Probabilidade não é promessa",
            body: "Sob as hipóteses do modelo, a probabilidade de aa é 1/4 e a de flores violetas é 3/4. Isso não garante que um conjunto de quatro descendentes tenha exatamente um exemplar claro: o resultado de uma pequena amostra pode variar.",
          },
          {
            title: "Limites do modelo",
            body: "Nem toda característica segue dominância completa ou depende de uma única posição genética. Ambiente e vários genes podem influenciar o fenótipo. Este exercício simplificado não permite prever características complexas ou diagnosticar doenças humanas.",
          },
        ],
        "Podemos simular o modelo com dois saquinhos, cada um com cartões A e a. Sortear um cartão de cada saquinho representa uma combinação. É preciso devolver os cartões antes da rodada seguinte para manter as mesmas possibilidades.",
        "No mesmo modelo, considere Aa × aa. a) Liste as contribuições possíveis de cada progenitor. b) Quais genótipos podem resultar e em que proporções esperadas? c) Qual a probabilidade de flores claras? d) Quatro descendentes obrigatoriamente terão exatamente dois exemplares claros? Justifique.",
        "Um dos progenitores sempre contribui com a. O outro pode contribuir com A ou a. Diferencie expectativa e resultado observado.",
        "a) Aa contribui com A ou a; aa, somente com a. b) Aa e aa, cada um com probabilidade de 1/2. c) 1/2, ou 50%. d) Não: dois é uma expectativa para quatro resultados sob o modelo, não uma obrigação em cada amostra.",
        [
          { title: "NHGRI — alelos", url: "https://www.genome.gov/genetics-glossary/Allele" },
          { title: "NHGRI — genótipo", url: "https://www.genome.gov/genetics-glossary/genotype" },
          {
            title: "NHGRI — glossário de genética",
            url: "https://www.genome.gov/genetics-glossary",
          },
        ],
      ),
    ],
  },
];
export const secondaryTopics: Topic[] = initialSecondaryTopics.map((topic) => ({
  ...topic,
  lessons: [...topic.lessons, ...(secondaryExtraLessons[topic.id] ?? [])],
}));
