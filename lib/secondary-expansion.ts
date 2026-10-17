import type { Lesson } from "./catalog";
import { lesson } from "./secondary-lesson";
import { essayLessons } from "./secondary-essay";
const math = [
  {
    title: "OBMEP/IMPA — métodos de contagem e probabilidade",
    url: "https://portaldaobmep.impa.br/index.php/modulo/ver?modulo=69",
  },
];
const population = [
  {
    title: "IBGE Educa — migrações",
    url: "https://educa.ibge.gov.br/professores/educa-atividades/17681-origem-dos-emigrados.html",
  },
];
const genetics = [
  { title: "NHGRI — glossário de genética", url: "https://www.genome.gov/genetics-glossary" },
];

export const secondaryExtraLessons: Record<string, Lesson[]> = {
  "em3-matematica-contagem": [
    lesson(
      "em3-contagem-permutacoes",
      "Fatorial e permutações: quando a ordem importa",
      [
        "Contar ordenações sem repetição.",
        "Reconhecer quando objetos indistinguíveis causam contagem repetida.",
      ],
      "Se três pessoas diferentes ocupam três posições de uma fila, trocar duas delas muda o resultado. Para a primeira posição há três escolhas; depois restam duas e, por fim, uma: 3 × 2 × 1 = 6. Esse produto é escrito 3!, lido ‘três fatorial’.",
      [
        {
          title: "O produto diminui",
          body: "Para quatro cartões distintos, a contagem é 4! = 4 × 3 × 2 × 1 = 24. Não usamos 4 × 4 × 4 × 4 porque cada cartão é usado uma única vez. A restrição de não repetir muda a quantidade disponível a cada etapa.",
        },
        {
          title: "Quando há elementos indistinguíveis",
          body: "Nas letras A, A e B, trocar os dois A não cria uma escrita nova. As palavras distintas são AAB, ABA e BAA. Se marcássemos temporariamente A1 e A2, contaríamos cada escrita duas vezes. Por isso, 3!/2! = 3. Primeiro identifique o que conta como diferente.",
        },
        {
          title: "Uma restrição",
          body: "Se Ana deve ficar na primeira posição de uma fila de quatro pessoas, essa posição está fixada; só ordenamos as outras três. Há 3! = 6 filas. Não multiplique por quatro novamente: a primeira escolha não está livre.",
        },
      ],
      "Distribuir lugares numerados em uma foto muda a imagem quando duas pessoas trocam de posição. Separar as mesmas pessoas em um grupo, sem lugares, é outra pergunta.",
      "a) Quantas filas existem com cinco pessoas distintas? b) Quantas se uma pessoa específica deve ficar na primeira posição? c) Quantas escritas diferentes usam todas as letras de MALA? Explique a repetição no item c.",
      "Há dois A indistinguíveis em MALA. No item b, conte somente os lugares ainda livres.",
      "a) 5! = 120. b) 4! = 24. c) 4!/2! = 12. Se contou 24 no item c, distinguiu os dois A mesmo que a escrita final seja igual. Uma listagem parcial pode ajudar a enxergar os pares duplicados.",
      math,
    ),
    lesson(
      "em3-contagem-combinacoes",
      "Arranjo ou combinação: escolher cargos ou formar grupos",
      [
        "Distinguir seleção ordenada e não ordenada.",
        "Justificar a divisão que elimina repetições na formação de grupos.",
      ],
      "Entre cinco estudantes, escolher uma pessoa para representar a turma e outra para ser suplente produz um resultado diferente quando os cargos são trocados: são 5 × 4 = 20 possibilidades. Já escolher uma dupla sem cargos não distingue AB de BA.",
      [
        {
          title: "Seleção com papéis diferentes",
          body: "Para três cargos distintos entre cinco pessoas, sem acúmulo de cargos, há 5 × 4 × 3 = 60 seleções. Antes de aplicar uma fórmula, escreva quais posições existem e se uma pessoa pode aparecer mais de uma vez.",
        },
        {
          title: "Seleção sem ordem",
          body: "Uma dupla sem cargos foi contada duas vezes na lista ordenada: AB e BA. Portanto, 20/2! = 10 duplas. Para grupos de três, cada grupo aparece 3! vezes entre as 60 ordenações: 60/6 = 10. A divisão elimina maneiras diferentes de listar o mesmo grupo.",
        },
        {
          title: "Cheque com um caso pequeno",
          body: "Entre A, B e C, as duplas sem cargos são AB, AC e BC. Se sua regra produzir seis, está contando a ordem. Um caso pequeno ajuda a testar a interpretação antes de calcular um problema maior.",
        },
      ],
      "Escolher quem começa e quem termina uma apresentação define papéis diferentes. Escolher dois integrantes para uma conversa, sem papéis, define apenas quem participa.",
      "Uma comissão tem seis candidatos. a) Quantas formas de escolher presidente e vice, pessoas distintas? b) Quantos grupos de dois sem cargos? c) Quantos grupos de três? Explique por que os totais de a e b são diferentes.",
      "No item c, conte seleções ordenadas e divida pelas ordenações internas de cada trio.",
      "a) 6 × 5 = 30. b) 30/2 = 15. c) (6 × 5 × 4)/3! = 20. Em a, trocar os cargos muda o resultado; em b, não. A palavra ‘escolher’ sozinha não determina a operação: os papéis do enunciado determinam.",
      math,
    ),
    lesson(
      "em3-probabilidade-condicional",
      "Probabilidade: o que muda quando recebemos informação?",
      [
        "Construir espaço amostral e evento.",
        "Recalcular uma probabilidade após restringir os resultados possíveis.",
      ],
      "Em um sorteio com resultados igualmente prováveis, a probabilidade de um evento é a quantidade de resultados favoráveis dividida pelo total de resultados possíveis. A expressão exige essa hipótese: resultados listados não são automaticamente equiprováveis em qualquer situação.",
      [
        {
          title: "Um espaço simples",
          body: "Em um dado ideal de seis faces, o evento ‘resultado par’ contém 2, 4 e 6. A probabilidade é 3/6 = 1/2. O evento complementar, ‘resultado ímpar’, também tem probabilidade 1/2; as duas probabilidades somam 1.",
        },
        {
          title: "Informação muda o universo",
          body: "Se sabemos que o resultado foi maior que 3, restam 4, 5 e 6. Entre esses três, dois são pares. A probabilidade de ser par, dada essa informação, é 2/3. O resultado não mudou depois do lançamento; mudou o conjunto considerado diante da informação.",
        },
        {
          title: "Duas retiradas sem reposição",
          body: "Uma caixa tem três fichas azuis e duas verdes. A chance de tirar duas azuis sem devolver a primeira é (3/5) × (2/4) = 3/10. Na segunda retirada, tanto a quantidade favorável quanto o total mudaram. Com reposição, seria (3/5) × (3/5) = 9/25.",
        },
      ],
      "Saber que uma senha começa por A reduz a lista de senhas candidatas. Você não altera a senha existente; atualiza o que sabe sobre as possibilidades.",
      "Um dado ideal é lançado. a) Qual a chance de sair um número maior que 4? b) Sabendo que saiu um número par, qual a chance de ele ser maior que 4? c) Em uma caixa com duas fichas vermelhas e duas brancas, qual a chance de retirar duas vermelhas sem reposição?",
      "No item b, comece pelos pares possíveis. No item c, atualize a caixa após retirar a primeira vermelha.",
      "a) 2/6 = 1/3. b) Entre 2, 4 e 6, só 6 satisfaz a condição: 1/3. c) (2/4) × (1/3) = 1/6. As respostas iguais em a e b não significam espaços iguais: as justificativas usam conjuntos diferentes.",
      math,
    ),
  ],
  "em3-linguagens-leitura": essayLessons,
  "em3-humanas-populacao": [
    lesson(
      "em3-humanas-migracoes",
      "Migrações: fluxos, motivos e leitura de saldos",
      [
        "Distinguir entrada, saída e saldo migratório.",
        "Analisar deslocamentos sem generalizações sobre pessoas migrantes.",
      ],
      "Migração envolve mudança de residência. Uma mesma pessoa pode ser emigrante do lugar de saída e imigrante do lugar de chegada. Deslocar-se diariamente para estudar e voltar para casa não é o mesmo fenômeno que mudar de residência.",
      [
        {
          title: "Fluxo e saldo",
          body: "Em um exemplo fictício, um município recebe 120 moradores e registra 80 saídas no mesmo ano. O saldo migratório é 120 − 80 = +40. Isso não significa que somente 40 pessoas se deslocaram: entradas e saídas são fluxos diferentes e o saldo resume sua diferença.",
        },
        {
          title: "População não depende só da migração",
          body: "Para analisar a mudança total, considere também nascimentos e mortes. Se a população inicial era 1.000, houve 30 nascimentos, 10 mortes e saldo migratório +40, o total final é 1.060 nesse modelo simplificado. Registre período e território para não comparar números incompatíveis.",
        },
        {
          title: "Motivações e evidências",
          body: "Trabalho, estudo, redes familiares, conflitos e condições ambientais podem participar de deslocamentos, sem determinar a história de toda pessoa. Um saldo positivo, isolado, não revela o motivo das entradas. Procure pesquisas, relatos contextualizados e dados de origem e destino.",
        },
      ],
      "Um caixa pode receber 120 e pagar 80: o saldo aumenta 40, embora a movimentação tenha sido maior. A analogia ajuda na conta, mas pessoas não se reduzem a números; suas experiências exigem contexto.",
      "Uma cidade fictícia tinha 2.000 habitantes. No ano, registrou 50 nascimentos, 20 mortes, 90 entradas e 110 saídas. a) Calcule saldo natural e migratório. b) Estime a população final no modelo. c) O saldo permite afirmar que todas as saídas ocorreram por falta de trabalho? Justifique.",
      "Saldo natural é nascimentos menos mortes. Some os dois saldos à população inicial; depois, separe a conta da explicação causal.",
      "a) Saldo natural +30; migratório −20. b) 2.010 habitantes. c) Não: o número de saídas não informa sozinho suas causas. Seriam necessários dados ou investigação sobre motivos. Não confunda queda por migração com queda obrigatória da população total.",
      population,
    ),
    lesson(
      "em3-humanas-globalizacao",
      "Globalização: redes produtivas e desigualdades",
      [
        "Identificar conexões entre produção, transporte e consumo.",
        "Analisar oportunidades e dependências em uma rede, sem afirmar que seus efeitos são iguais para todos.",
      ],
      "Globalização ajuda a estudar a intensificação e a articulação de relações entre lugares. Mercadorias, informação, finanças e pessoas circulam por redes com regras e barreiras diferentes. Estar conectado não significa participar em condições iguais.",
      [
        {
          title: "Um produto como rede — exemplo fictício",
          body: "Imagine um equipamento projetado em um país, com peças feitas em outros dois, montado em um quarto e vendido em vários mercados. A produção depende de transporte, energia, trabalho e contratos. O rótulo do local de montagem não descreve toda a cadeia.",
        },
        {
          title: "Benefícios e vulnerabilidades",
          body: "Uma rede pode ampliar acesso a mercados e tecnologias, mas também criar dependência de poucos fornecedores. No cenário imaginário, interromper o transporte de uma peça atrasa a montagem. Isso não prova que toda rede global falha: identifica uma vulnerabilidade que pode ser investigada.",
        },
        {
          title: "Perguntas geográficas",
          body: "Quem decide onde produzir? Onde ficam empregos, infraestrutura e impactos ambientais? Quem recebe a maior parte do valor? Para responder, precisamos de dados e recorte, não de afirmar que globalização é sempre boa ou sempre ruim. Um exemplo explica mecanismos, mas não mede sozinho o mundo.",
        },
      ],
      "Uma atividade em grupo depende de tarefas distribuídas. Dividir pode ampliar capacidades, mas atrasos e diferenças de acesso afetam o conjunto. Na economia, esses vínculos envolvem também poder, regras e interesses.",
      "Crie uma cadeia fictícia com quatro etapas: matéria-prima, fabricação, montagem e venda. Indique um benefício da conexão, um ponto de dependência e duas informações que você buscaria para avaliar a distribuição dos ganhos.",
      "Separe o mecanismo que seu cenário ilustra de uma afirmação factual sobre empresas ou países reais.",
      "O esquema deve conectar as etapas de modo coerente. São respostas possíveis: acesso a fornecedor especializado como benefício; concentração de uma peça como dependência; dados sobre salários, preços, impostos ou margens para investigar ganhos. Evite concluir que todas as regiões ganham igualmente só porque participam da rede.",
      [],
    ),
    lesson(
      "em3-humanas-consumo",
      "Consumo e sustentabilidade: avaliar uma proposta",
      [
        "Distinguir reduzir, reutilizar e reciclar em um problema concreto.",
        "Avaliar uma intervenção ambiental com indicadores e limites.",
      ],
      "Uma decisão de consumo pode ser analisada pela necessidade atendida, pelos materiais, pela duração e pelo destino dos resíduos. Chamar um produto de ‘verde’ não explica seus impactos; é preciso perguntar quais efeitos foram medidos e o que a comparação considera.",
      [
        {
          title: "Antes do descarte",
          body: "Reduzir evita parte do consumo ou do desperdício; reutilizar prolonga o uso; reciclar transforma materiais. As alternativas não são idênticas nem substituem automaticamente uma à outra. Um objeto reutilizável também tem custos de produção, transporte, limpeza e fim de uso.",
        },
        {
          title: "Cenário escolar fictício",
          body: "Uma escola conta 500 copos descartados por semana e propõe recipientes reutilizáveis. Para acompanhar o projeto, pode contar descartáveis, uso dos recipientes, perdas e condições de higienização. A queda de copos descartados é um indicador útil, mas não calcula sozinha o impacto ambiental total.",
        },
        {
          title: "Responsabilidade compartilhada",
          body: "Examine infraestrutura e participação, não apenas escolhas individuais. Sem acesso a água e limpeza, uma campanha pode falhar. Um plano deve indicar responsáveis, recursos e como acolher quem ainda não consegue aderir, sem excluir pessoas do acesso a água.",
        },
      ],
      "Uma promessa de economizar dinheiro precisa explicar gastos e receitas considerados. Da mesma forma, uma promessa ambiental precisa indicar o que foi comparado e o que ficou fora da conta.",
      "Proponha uma ação para diminuir o desperdício de papel na escola. Registre situação inicial, ação, responsável, um indicador, uma possível dificuldade e uma consequência indesejada que você tentaria evitar.",
      "Reduzir impressões pode ser útil, mas trocar tudo por meios digitais sem verificar acesso pode excluir estudantes.",
      "Uma proposta consistente relaciona ação e desperdício observado, define indicador comparável e enfrenta barreiras. Exemplo: organizar impressão frente e verso quando adequada, acompanhar folhas usadas e preservar alternativas acessíveis. Não conclua sustentabilidade total apenas com um indicador ou com um selo não explicado.",
      [],
    ),
  ],
  "em3-natureza-hereditariedade": [
    lesson(
      "em3-genetica-heredogramas",
      "Heredogramas: possibilidades não são diagnósticos",
      [
        "Interpretar relações e gerações em uma genealogia simplificada.",
        "Distinguir inferência sob um modelo de uma conclusão sobre saúde real.",
      ],
      "Um heredograma representa relações entre indivíduos e a ocorrência de uma característica ao longo das gerações. Antes de interpretar, leia a legenda: símbolos e preenchimentos precisam ser definidos. Nesta aula, usaremos apenas uma característica fictícia e um modelo autossômico recessivo simplificado.",
      [
        {
          title: "Modelo assumido",
          body: "No exercício, indivíduos aa expressam a característica; AA e Aa não a expressam. Isso é uma hipótese didática. Não se deve deduzir que qualquer característica real funciona assim apenas porque aparece em uma família.",
        },
        {
          title: "Uma dedução possível",
          body: "Dois progenitores sem expressão têm um descendente aa. Nesse modelo e sem introduzir outras hipóteses, cada progenitor precisa ter contribuído com a e, como não é aa, ambos são Aa. Um descendente sem expressão desse casal pode ser AA ou Aa: a aparência não distingue os dois.",
        },
        {
          title: "Distinguir perguntas",
          body: "Antes de qualquer informação sobre o descendente, as possibilidades esperadas de Aa × Aa são AA, Aa, aA e aa. Se já sabemos que ele não expressa a característica, excluímos aa: entre os três resultados restantes, dois correspondem a Aa. A condição mudou a pergunta; não misture 1/2 antes da informação com 2/3 depois dela.",
        },
      ],
      "Uma árvore de relações organiza quem se conecta a quem. A informação observada em cada nó ajuda a testar hipóteses, mas uma lacuna na árvore não pode ser preenchida por certeza inventada.",
      "No modelo aa recessivo, dois progenitores sem expressão têm um descendente com expressão e outro sem expressão. a) Quais os genótipos dos progenitores? b) Quais genótipos são possíveis para o descendente sem expressão? c) Você pode escolher um deles com certeza? Explique.",
      "Trabalhe com possibilidades. Ter um irmão aa não transforma automaticamente o outro em Aa.",
      "a) Aa e Aa sob as hipóteses definidas. b) AA ou Aa. c) Não: ambas as possibilidades são compatíveis. O modelo não é instrumento para diagnosticar doenças ou fazer previsões clínicas sobre famílias reais.",
      genetics,
    ),
    lesson(
      "em3-genetica-segregacao",
      "Duas características: quando multiplicar probabilidades?",
      [
        "Construir gametas em um modelo de segregação independente.",
        "Reconhecer a hipótese necessária para multiplicar probabilidades.",
      ],
      "Considere dois pares de alelos A/a e B/b em um modelo didático com segregação independente. Um indivíduo AaBb pode produzir gametas AB, Ab, aB e ab. Sob essa hipótese simplificada, cada combinação tem probabilidade de 1/4.",
      [
        {
          title: "Separar as perguntas",
          body: "No cruzamento AaBb × aabb, o segundo progenitor contribui apenas com ab. Para o primeiro, liste as quatro contribuições. Os resultados possíveis são AaBb, Aabb, aaBb e aabb, cada um com probabilidade de 1/4 no modelo.",
        },
        {
          title: "Multiplicar com hipótese explícita",
          body: "A chance de transmitir a é 1/2 e a de transmitir b é 1/2. Com segregação independente, a chance de transmitir ambos é (1/2) × (1/2) = 1/4. Não é a presença de duas letras que autoriza a multiplicação; é a hipótese sobre a relação entre os eventos.",
        },
        {
          title: "Limite biológico",
          body: "Genes ligados podem não seguir esse padrão de combinações equiprováveis. Por isso, não aplique automaticamente a regra a todo par de genes. O modelo treina organização de possibilidades; observar dados diferentes exige investigar hipóteses e condições, não forçar os dados à regra.",
        },
      ],
      "Sortear uma carta em cada um de dois baralhos separados pode ser tratado de forma diferente de retirar duas cartas do mesmo baralho sem reposição. A relação entre os eventos importa.",
      "No modelo independente AaBb × aabb, a) liste gametas e descendentes possíveis; b) calcule a probabilidade de aabb; c) explique por que não se pode transportar esse resultado para qualquer par de genes sem conhecer as hipóteses.",
      "Monte uma tabela de quatro linhas. Depois escreva por extenso a condição que permitiu dar a mesma chance a cada gameta.",
      "a) AB, Ab, aB e ab do primeiro progenitor; ab do segundo. Descendentes AaBb, Aabb, aaBb e aabb. b) 1/4. c) O resultado depende de segregação independente; ligação gênica e outras condições podem alterar o modelo. A conclusão correta inclui a hipótese, não apenas a conta.",
      genetics,
    ),
    lesson(
      "em3-genetica-biotecnologia",
      "Biotecnologia: finalidade, evidência e limites",
      [
        "Distinguir aplicação de tecnologia genética de promessa sem evidência.",
        "Formular perguntas sobre benefícios, limites e avaliação de uma aplicação.",
      ],
      "Biotecnologia emprega processos e sistemas biológicos para finalidades específicas. Técnicas de DNA recombinante podem combinar segmentos de DNA para pesquisa ou produção. Um exemplo conhecido é a produção de proteínas como insulina por sistemas celulares preparados para essa finalidade. Entender a aplicação não equivale a executar um protocolo de laboratório.",
      [
        {
          title: "Do objetivo à avaliação",
          body: "Para analisar uma proposta, identifique o problema, o produto ou processo pretendido e a evidência apresentada. Dizer ‘usa genética’ não demonstra eficácia nem segurança. Essas perguntas são úteis também para comparar uma notícia com uma propaganda.",
        },
        {
          title: "Não confundir técnicas",
          body: "Copiar uma sequência, alterar DNA e observar uma característica não são descrições equivalentes. Ao ler uma notícia, registre qual ação foi realizada e em qual sistema, evitando transformar um resultado limitado em promessa universal.",
        },
        {
          title: "Caso autoral para discussão",
          body: "Uma empresa fictícia anuncia uma planta que ‘resolve a seca’ após um teste pequeno. Pergunte como o teste foi feito, quais condições foram comparadas, que resultados foram medidos e o que acontece em outros ambientes. Um resultado favorável em um cenário não prova solução para todos os contextos.",
        },
      ],
      "Avaliar uma ferramenta exige saber para que serve e em quais condições foi testada. Um utensílio funcionar em uma tarefa não demonstra que funcione para qualquer problema.",
      "Leia a promessa fictícia sobre a planta. Escreva uma pergunta sobre finalidade, duas sobre evidência e uma sobre possíveis limites ou impactos. Reescreva a manchete de maneira proporcional ao que um teste pequeno poderia demonstrar, sem inventar resultados.",
      "Você pode escrever ‘o anúncio não informa...’. Não preencha dados ausentes com números inventados.",
      "Perguntas adequadas delimitam objetivo, comparação, amostra, condições e resultados observados. Uma manchete prudente poderia dizer ‘teste inicial investiga desempenho de planta em condição específica’, se esse for de fato o conteúdo conhecido. A análise permanece conceitual: não fornece procedimento experimental, recomendação clínica ou garantia de segurança.",
      [
        {
          title: "NHGRI — tecnologia de DNA recombinante",
          url: "https://www.genome.gov/genetics-glossary/Recombinant-DNA-Technology",
        },
      ],
    ),
  ],
};
