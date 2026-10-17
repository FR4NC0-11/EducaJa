import type { Lesson } from "./catalog";
import { lesson } from "./secondary-lesson";

/** Original lessons selected from the previously observed third-year topic map.
 * Append only: published lesson IDs and notebook keys must stay stable.
 */
export const secondaryNextLessons: Record<string, Lesson[]> = {
  "em3-matematica-contagem": [
    lesson(
      "em3-estatistica-medidas",
      "Estatística: média, mediana e leitura crítica",
      [
        "Calcular média, mediana, moda e amplitude.",
        "Escolher uma medida coerente com a pergunta.",
      ],
      "Uma medida resume dados, mas não conta toda a história. A média aritmética soma os valores e divide pela quantidade. A mediana é o valor central da lista ordenada; com quantidade par, usamos a média dos dois centrais. A moda é o valor mais frequente; pode haver mais de uma ou nenhuma moda.",
      [
        {
          title: "Exemplo resolvido: um valor distante",
          body: "Tempos fictícios de espera, em minutos: 2, 3, 3, 4 e 18. Soma 30; média 30/5 = 6. A mediana é 3 e a moda também é 3. A amplitude é máximo menos mínimo: 18 − 2 = 16 minutos. O tempo de 18 minutos eleva a média: informar só 6 esconde a diferença entre as esperas.",
        },
        {
          title: "Comparar exige olhar a distribuição",
          body: "Os conjuntos 4, 4, 4 e 1, 4, 7 têm a mesma média, 4, mas amplitudes 0 e 6. Mesma média não significa mesma regularidade. Amplitude usa só os extremos: também não descreve sozinha toda a distribuição.",
        },
        {
          title: "Antes de aceitar uma manchete",
          body: "Pergunte quem foi observado, quantos casos existem, qual período e unidade foram usados e se há dados ausentes. Para reunir grupos de tamanhos diferentes, não tire automaticamente a média de suas médias: considere a quantidade de observações em cada grupo.",
        },
      ],
      "Uma foto de grupo pode mostrar a altura média sem revelar quem é muito alto ou muito baixo. O resumo é útil, mas a lista revela diferenças.",
      "Os tempos fictícios de seis atendimentos foram 2, 3, 3, 4, 8 e 16 minutos. a) Calcule média, mediana, moda e amplitude. b) Se 16 for substituído por 4, recalcule média e mediana. c) Qual resumo comunicaria melhor o centro desses tempos em cada caso? Justifique sem dizer que uma medida é sempre superior.",
      "Ordene a lista. Com seis valores, a mediana depende da terceira e quarta posições. Na segunda situação, ordene de novo.",
      "a) Soma 36, média 6; mediana (3 + 4)/2 = 3,5; moda 3; amplitude 16 − 2 = 14. b) Lista 2, 3, 3, 4, 4, 8: soma 24, média 4; mediana 3,5. c) No primeiro caso, a mediana é menos afetada pela espera extrema. Também convém informar a dispersão e explicar o objetivo da comparação. No segundo, média e mediana se aproximam, mas o valor 8 ainda merece contexto. Não há escolha única sem especificar a pergunta.",
      [
        {
          title: "OBMEP/IMPA — Estatística Básica I",
          url: "https://portaldaobmep.impa.br/index.php/modulo/ver?modulo=99",
        },
      ],
    ),
    lesson(
      "em3-geometria-coordenadas",
      "Geometria analítica: distância e ponto médio",
      [
        "Ler pares ordenados no plano cartesiano.",
        "Aplicar Pitágoras à distância e calcular ponto médio.",
      ],
      "No plano cartesiano, um ponto (x, y) indica sua posição horizontal e vertical. A ordem importa: (2, 5) e (5, 2) são pontos diferentes. Para comparar dois pontos, calcule as diferenças de coordenadas; elas formam os catetos de um triângulo retângulo.",
      [
        {
          title: "Exemplo resolvido",
          body: "Para A(1, 2) e B(4, 6), a variação horizontal é 3 e a vertical é 4. Pelo teorema de Pitágoras, d² = 3² + 4² = 25, então a distância é 5 unidades. Em geral, d = √[(xB − xA)² + (yB − yA)²]. Trocar a ordem dos pontos muda os sinais das diferenças, mas não seus quadrados.",
        },
        {
          title: "Metade do segmento",
          body: "O ponto médio tem coordenadas M((xA + xB)/2, (yA + yB)/2). No exemplo, M(2,5; 4). O ponto e vírgula separa coordenadas quando usamos vírgula decimal. A média é feita em cada eixo, não entre x e y de um mesmo ponto.",
        },
        {
          title: "Distância direta não é percurso",
          body: "A soma |Δx| + |Δy| mede um percurso feito em duas direções perpendiculares, como ruas em grade; não é a distância em linha reta. As fórmulas pressupõem eixos perpendiculares com unidades compatíveis. Se as escalas forem diferentes, converta antes de comparar medidas.",
        },
      ],
      "Cruzar uma praça em diagonal costuma ser mais curto que seguir duas de suas bordas: são perguntas geométricas diferentes.",
      "Considere P(−2, 1) e Q(4, 9), em um plano cujos eixos usam metros. a) Determine as variações horizontal e vertical e a distância direta. b) Encontre o ponto médio. c) Calcule o percurso que anda somente na horizontal e depois na vertical. Explique por que ele difere da distância direta.",
      "Subtrair −2 equivale a somar 2. Confira se o ponto médio está entre os extremos em cada eixo.",
      "a) Δx = 6 e Δy = 8; d = √(36 + 64) = 10 m. b) M(1, 5). c) 6 + 8 = 14 m: esse caminho acompanha dois lados do triângulo, enquanto 10 m mede sua hipotenusa. Se encontrou √14, esqueceu de elevar as diferenças ao quadrado.",
      [
        {
          title: "OBMEP/IMPA — Geometria Analítica 1",
          url: "https://portaldaobmep.impa.br/index.php/modulo/ver?modulo=41",
        },
      ],
    ),
  ],
  "em3-linguagens-leitura": [
    lesson(
      "em3-lingua-variacao",
      "Variação linguística: contexto, registro e respeito",
      [
        "Relacionar escolhas linguísticas à situação de comunicação.",
        "Reescrever um texto considerando público e finalidade.",
      ],
      "A língua varia entre regiões, grupos e situações, e também muda ao longo do tempo. Uma mesma pessoa pode escolher registros diferentes em uma conversa e em um requerimento. Estudar a escrita formal amplia possibilidades de participação; não torna outras variedades sinal de menor inteligência.",
      [
        {
          title: "Leia a situação antes de julgar",
          body: "Em uma mensagem a um colega, 'Oi! Dá pra mandar o texto hoje?' pode cumprir bem a finalidade. Em um pedido à coordenação, 'Solicito o envio do texto até hoje, se possível' explicita outra relação entre interlocutores. São exemplos autorais: não existe um único jeito de ser cordial em cada contexto.",
        },
        {
          title: "Adequação não é caricatura",
          body: "Observe destinatário, objetivo, meio e grau de formalidade. Não atribua automaticamente uma fala a uma região, profissão ou capacidade intelectual. Um traço isolado não resume uma pessoa. O preconceito aparece quando a avaliação da linguagem serve para desqualificar seu falante.",
        },
        {
          title: "Reescrever preservando o sentido",
          body: "No aviso 'A gente vai discutir as propostas amanhã', uma versão formal possível é 'Discutiremos as propostas amanhã'. Mantêm-se ação e tempo, com mudança de registro. Na norma de referência, 'a gente' pede verbo na terceira pessoa do singular; não é preciso substituí-lo em toda situação.",
        },
      ],
      "Escolher registro é como escolher uma roupa para uma situação: a adequação depende do contexto e não mede o valor da pessoa.",
      "Texto autoral: 'Oi, pessoal! A gente vai se encontrar amanhã às 14h pra revisar o trabalho. Quem puder, leva as anotações.' a) Identifique destinatário provável, objetivo e duas marcas de registro. b) Reescreva como comunicado formal da escola, preservando horário e finalidade. c) Explique por que a versão inicial pode ser adequada ao grupo sem ser o melhor formato para um documento oficial.",
      "Troque as escolhas necessárias ao novo destinatário; não acrescente exigências nem invente local. Justifique pelo contexto, não por superioridade dos falantes.",
      "a) Um grupo de colegas; combinar revisão. 'Oi, pessoal', 'a gente' e 'pra' sinalizam proximidade. b) Possibilidade: 'O encontro para revisão do trabalho ocorrerá amanhã, às 14h. Solicita-se aos participantes que, se possível, levem suas anotações.' Outras versões coerentes valem. c) A mensagem direta favorece interação entre colegas; o comunicado pede outro registro. Não se conclui incapacidade do autor pelo uso informal.",
      [
        {
          title: "Museu da Língua Portuguesa — acervo e diversidade linguística",
          url: "https://acervo.museudalinguaportuguesa.org.br/",
        },
      ],
    ),
    lesson(
      "em3-ingles-condicionais",
      "Inglês: hipóteses com o second conditional",
      [
        "Reconhecer uma hipótese presente ou futura pouco provável ou imaginada.",
        "Interpretar if + passado e would + verbo.",
      ],
      "O second conditional costuma apresentar uma situação imaginada ou pouco provável no presente ou futuro e sua consequência. Um padrão comum é if + past simple, seguido de would + verbo na forma básica. Embora o verbo após if tenha forma de passado, a hipótese não precisa falar de um acontecimento passado.",
      [
        {
          title: "Texto autoral para leitura",
          body: "'If our school had a reading room, students would share more books. If I were the coordinator, I would ask students what they need.' A primeira frase imagina uma sala de leitura; a segunda imagina o falante como coordenador. Nenhuma delas comprova que a sala existe ou que o falante ocupa esse cargo.",
        },
        {
          title: "Como a estrutura constrói o sentido",
          body: "Em 'If I had more time, I would read every day', had apresenta a condição imaginada e would read apresenta a consequência. A ordem pode mudar: 'I would read every day if I had more time'. Were é uma forma usada para hipóteses com I/he/she/it, especialmente na escrita formal; você também pode encontrar was em usos menos formais.",
        },
        {
          title: "Compare com uma possibilidade aberta",
          body: "'If the library opens tomorrow, I will return the book' apresenta uma possibilidade futura, no padrão do first conditional: presente após if e will na consequência. O contraste depende do contexto e da perspectiva do falante; forma verbal não mede sozinha a probabilidade real. No padrão estudado, não se coloca would automaticamente depois de if.",
        },
      ],
      "Uma hipótese abre um cenário de 'e se...': você acompanha sua consequência sem afirmar que o cenário aconteceu.",
      "a) Complete: 'If I ___ (have) a quiet room, I ___ (study) there.' b) Interprete a frase em português e diga se ela informa uma situação passada real. c) Reescreva começando pela consequência. d) Compare com 'If I finish early tomorrow, I will study there': como muda a forma de apresentar a condição?",
      "Use passado simples na condição imaginada e would + verbo básico na consequência. Não traduza had isoladamente sem considerar o conjunto.",
      "a) 'If I had a quiet room, I would study there.' b) 'Se eu tivesse um lugar silencioso, estudaria lá': hipótese, não relato de um passado real. c) 'I would study there if I had a quiet room.' d) Finish/will study apresenta uma possibilidade futura aberta; had/would study constrói um cenário imaginado ou considerado menos provável. Não é possível inferir uma probabilidade numérica.",
      [
        {
          title: "British Council — zero, first and second conditionals",
          url: "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/conditionals-zero-first-second",
        },
      ],
    ),
  ],
  "em3-humanas-populacao": [
    lesson(
      "em3-geografia-regionalizacao",
      "Regionalização: comparar sem apagar diferenças",
      [
        "Identificar o critério usado para agrupar territórios.",
        "Distinguir característica de um recorte e generalização sobre seus habitantes.",
      ],
      "Regionalizar é dividir ou agrupar o espaço segundo critérios: aspectos naturais, atividades econômicas, redes de circulação ou outros. Um mesmo território admite recortes diferentes, porque perguntas diferentes exigem critérios diferentes. Região não significa que todos os lugares ou habitantes sejam iguais.",
      [
        {
          title: "Exemplo resolvido com territórios fictícios",
          body: "As cidades A e B têm clima semelhante; B e C mantêm o maior fluxo de viagens para trabalho. Pelo clima, o grupo seria A–B; pelos deslocamentos, B–C. Não há contradição: mudaram a pergunta e o critério. É preciso informar qual classificação foi usada.",
        },
        {
          title: "Aplicação aos estudos regionais",
          body: "Ao estudar América Latina, África, Europa ou Ásia, explicite o tema e a escala. Um indicador médio de uma região não descreve cada país, cidade ou grupo social. Busque diferenças internas e relações entre territórios; evite transformar um recorte amplo em estereótipo cultural ou econômico.",
        },
        {
          title: "Fonte, período e limites",
          body: "Uma comparação exige fontes, unidades, períodos e métodos compatíveis. Dados de anos diferentes podem não descrever o mesmo contexto. Relação entre dois indicadores não prova, por si, uma causa. Recortes estatísticos também podem ser revistos: confira a definição usada pela fonte.",
        },
      ],
      "Organizar uma biblioteca por autor ou por assunto cria grupos diferentes dos mesmos livros. O critério precisa acompanhar a classificação.",
      "Cenário fictício: A e B cultivam o mesmo produto; B e C usam diariamente um hospital localizado em C. Uma pesquisa agrícola agrupa A–B; outra sobre serviços agrupa B–C. a) Explique os critérios. b) Qual agrupamento ajudaria a planejar transporte para o hospital e por quê? c) Critique a frase 'Como A e B estão na mesma região agrícola, todos os seus moradores têm a mesma renda'.",
      "Ligue cada grupo à pergunta que orientou sua criação. Uma característica territorial não é uma informação individual sobre todos os habitantes.",
      "a) Atividade agrícola e acesso/fluxo de serviços de saúde, respectivamente. b) B–C ajuda a investigar o deslocamento descrito; ainda seria preciso medir demanda, trajetos e horários. c) Mesmo produto agrícola não implica renda individual igual, nem informa toda a economia. A afirmação extrapola os dados. Aceite outras análises que explicitem critério e limite.",
      [
        {
          title: "IBGE — Divisão Urbano-Regional e fluxos",
          url: "https://www.ibge.gov.br/geociencias/organizacao-do-territorio/divisao-regional/15777-divisao-urbano-regional.html",
        },
      ],
    ),
    lesson(
      "em3-geografia-mapas",
      "Mapas: escala, projeção e leitura crítica",
      [
        "Converter uma distância usando escala numérica.",
        "Reconhecer limites das projeções e das legendas.",
      ],
      "Mapa é uma representação construída para uma finalidade. Antes de interpretá-lo, confira título, legenda, orientação, escala, fonte e data. A escala numérica relaciona distâncias nas mesmas unidades: em 1:100.000, um centímetro no mapa corresponde a 100.000 centímetros no terreno, ou um quilômetro.",
      [
        {
          title: "Exemplo resolvido de escala",
          body: "Em um mapa local de escala 1:200.000, um segmento de 3 cm representa 600.000 cm, isto é, 6 km. Multiplique a distância pelo denominador e depois converta: 100.000 cm = 1 km. Isso mede a distância representada pelo segmento, não necessariamente o percurso real de uma estrada.",
        },
        {
          title: "Projetar implica escolhas",
          body: "Representar a superfície curva terrestre em um plano produz distorções. Projeções podem priorizar propriedades como áreas ou ângulos locais; nenhuma preserva tudo ao mesmo tempo no mapa do planeta inteiro. Não compare o tamanho de territórios apenas pela aparência em qualquer mapa-múndi.",
        },
        {
          title: "O que a cor representa?",
          body: "Uma legenda pode classificar população total ou habitantes por área: são medidas diferentes. Uma cor mais intensa só tem o significado definido na legenda. Ao ampliar uma imagem, a escala numérica impressa deixa de corresponder ao novo tamanho; uma escala gráfica ampliada junto com o mapa mantém sua proporção.",
        },
      ],
      "Um mapa é como um resumo visual: sua utilidade depende do que escolhe mostrar e do que simplifica.",
      "a) Em um mapa local 1:250.000, dois pontos estão a 4 cm. Qual a distância representada em km? b) Outro mapa usa cores para população total: é possível concluir qual lugar tem maior densidade sem conhecer as áreas? c) Uma projeção preserva áreas. Isso garante que formas e distâncias também estejam corretas em toda parte? Justifique.",
      "Primeiro mantenha as unidades iguais; depois converta. Densidade relaciona quantidade de habitantes e área.",
      "a) 4 × 250.000 = 1.000.000 cm = 10 km. b) Não: é preciso relacionar população e área em unidades compatíveis. c) Não: preservar áreas não garante preservar todas as outras propriedades. Se respondeu 1.000 km no item a, revise a conversão de centímetros para quilômetros.",
      [
        {
          title: "IBGE Atlas Escolar — projeções cartográficas",
          url: "https://atlasescolar.ibge.gov.br/cartografia/21733-as-projecoes-cartograficas",
        },
        {
          title: "IBGE Atlas Escolar — escala",
          url: "https://atlasescolar.ibge.gov.br/cartografia/21734-escala",
        },
      ],
    ),
  ],
  "em3-natureza-hereditariedade": [
    lesson(
      "em3-genetica-expressao",
      "DNA, RNA e expressão gênica",
      [
        "Distinguir armazenamento da informação e expressão de um gene.",
        "Relacionar regulação gênica à diversidade de funções celulares.",
      ],
      "DNA armazena informação genética. Expressar um gene envolve usar sua informação para produzir um RNA; em genes codificadores de proteínas, esse RNA participa da produção de uma proteína. Nem todo gene codifica proteína. Quantidade, momento e local de expressão também importam para o funcionamento celular.",
      [
        {
          title: "Do gene ao produto",
          body: "Na transcrição, uma sequência de DNA orienta a produção de RNA. Na tradução, a informação do RNA mensageiro orienta uma sequência de aminoácidos que forma uma proteína. Não são duas palavras para a mesma etapa. Proteínas podem ter funções estruturais, de transporte ou atuar como enzimas, entre outras.",
        },
        {
          title: "Mesma coleção, usos diferentes",
          body: "Muitas células de um organismo compartilham essencialmente o mesmo conjunto de genes, mas expressam conjuntos e quantidades diferentes. Isso ajuda a explicar funções celulares distintas. Ter um gene não significa expressá-lo intensamente em toda célula e a todo momento.",
        },
        {
          title: "Leia um experimento didático",
          body: "Em duas amostras celulares fictícias, a sequência de um gene é igual, mas a quantidade de seu RNA é diferente. Isso é compatível com diferença de expressão, não demonstra alteração da sequência do DNA. A medida de RNA, sozinha, não informa exatamente quanto de proteína ativa existe: outras etapas também influenciam o resultado.",
        },
      ],
      "Uma biblioteca guarda livros; diferentes equipes consultam instruções diferentes conforme a tarefa. A analogia ajuda a separar informação disponível de informação usada, mas não substitui os mecanismos moleculares.",
      "Em um modelo fictício, duas células têm a mesma sequência do gene G. A célula A apresenta 10 unidades relativas de seu RNA e B apresenta 40. a) Qual apresenta maior quantidade desse RNA e qual a razão B/A? b) Isso prova que B possui uma sequência diferente do gene? c) Distinga transcrição e tradução e explique por que não se conclui automaticamente que B tenha quatro vezes mais proteína ativa.",
      "Separe o que foi medido do que está sendo inferido. RNA, sequência de DNA e proteína não são a mesma medida.",
      "a) B; 40/10 = 4. b) Não; o enunciado informa sequências iguais. c) Transcrição produz RNA a partir da informação do DNA; tradução usa RNA mensageiro para produzir uma cadeia de aminoácidos. Produção, processamento e degradação dos produtos e sua atividade podem variar: a razão de RNA não determina sozinha a razão de proteína ativa. Dados e unidades são fictícios, sem aplicação diagnóstica individual.",
      [
        {
          title: "NHGRI — Gene Expression",
          url: "https://www.genome.gov/genetics-glossary/Gene-Expression",
        },
        {
          title: "NHGRI — Gene Regulation",
          url: "https://www.genome.gov/genetics-glossary/Gene-Regulation",
        },
      ],
    ),
    lesson(
      "em3-genetica-mutacoes",
      "Mutações, variação e evolução: evite conclusões rápidas",
      [
        "Reconhecer alteração de sequência sem presumir seu efeito.",
        "Distinguir origem de variação e seleção ao longo das gerações.",
      ],
      "Uma mutação é uma mudança na sequência do DNA. Seu efeito depende de onde ocorre e do contexto: não é correto dizer que toda mutação causa doença ou que toda mudança é vantajosa. Alterações podem afetar o produto de um gene, sua regulação ou não produzir efeito detectável na situação estudada.",
      [
        {
          title: "Exemplo com sequência fictícia",
          body: "Compare os trechos de DNA A–C–G–T e A–T–G–T: houve substituição na segunda posição. Só essa observação não permite concluir qual será o efeito sobre o organismo. É preciso conhecer a localização, a função do trecho e evidências do efeito. Não estamos prevendo uma característica humana real.",
        },
        {
          title: "Somática não é sinônimo de herdável",
          body: "Uma alteração em uma célula somática pode alcançar células que dela descendem por divisão, mas não é automaticamente transmitida aos filhos do organismo. Em organismos com reprodução sexuada, alterações na linhagem germinativa podem ser transmitidas por gametas. Herdabilidade e efeito são perguntas diferentes.",
        },
        {
          title: "Seleção não cria uma solução por necessidade",
          body: "A seleção natural pode modificar frequências de variantes herdáveis quando elas se relacionam a diferenças de sucesso reprodutivo no ambiente. Não significa que o organismo criou intencionalmente a mutação de que precisava. Uma vantagem depende do contexto; a evolução não tem uma meta predefinida. Mudanças de frequência também podem envolver outros processos, como deriva e migração.",
        },
      ],
      "Modificar uma letra de uma instrução pode mudar seu sentido, não mudar nada relevante ou impedir sua leitura; é necessário analisar a instrução inteira e seu uso.",
      "Uma população fictícia contém duas variantes herdáveis antes de uma mudança ambiental. Depois, uma delas se torna mais frequente. a) Esse resultado prova que o ambiente criou a variante porque ela era necessária? b) Quais informações ajudariam a investigar seleção? c) Uma mudança de DNA encontrada apenas em células da pele de um indivíduo é automaticamente herdada por seus filhos? Justifique.",
      "Diferencie a presença inicial da variante, a mudança de frequência e uma explicação causal. Uma observação isolada não identifica todos os mecanismos.",
      "a) Não: a variante já existia; a frequência posterior não prova origem dirigida pela necessidade. b) Dados de herança, sobrevivência/reprodução, ambiente e várias gerações, considerando também migração e deriva, ajudariam a avaliar a hipótese. c) Não: alteração somática não é automaticamente uma alteração dos gametas. Não use esse modelo para diagnosticar uma pessoa ou estimar seu risco de doença.",
      [
        { title: "NHGRI — Mutation", url: "https://www.genome.gov/genetics-glossary/Mutation" },
        { title: "NHGRI — Evolution", url: "https://www.genome.gov/genetics-glossary/Evolution" },
      ],
    ),
  ],
};
