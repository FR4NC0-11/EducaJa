import type { Lesson } from "./catalog";
import { lesson } from "./secondary-lesson";

// Append-only original material based on the observed third-year curriculum map.
export const secondaryCompletion: Record<string, Lesson[]> = {
  "em3-matematica-contagem": [
    lesson(
      "em3-complexos-operacoes",
      "Números complexos: operar e interpretar",
      ["Usar i² = −1 em operações.", "Representar a + bi como ponto e calcular seu módulo."],
      "Nos números reais, nenhum quadrado vale −1. Nos complexos, usamos a unidade imaginária i, definida por i² = −1. Escrevemos z = a + bi, com a e b reais. Parte real e coeficiente da parte imaginária precisam ser identificados separadamente; um número real também é complexo, com b = 0.",
      [
        {
          title: "Somar e multiplicar",
          body: "Se z = 2 + 3i e w = 1 − i, z + w = 3 + 2i. Na multiplicação, distribua: zw = 2 − 2i + 3i − 3i² = 5 + i. O passo decisivo é substituir i² por −1; não trate i como uma variável real desconhecida.",
        },
        {
          title: "Ponto e distância à origem",
          body: "O número 3 + 4i corresponde ao ponto (3, 4) no plano complexo. Seu módulo é |z| = √(3² + 4²) = 5. Em geral, |a + bi| = √(a² + b²). Módulo não é simplesmente a soma das partes e nunca é negativo.",
        },
        {
          title: "Dividir usando o conjugado",
          body: "O conjugado de a + bi é a − bi. Para calcular 1/(1 + i), multiplique numerador e denominador por 1 − i: o resultado é (1 − i)/2. Isso funciona porque (1 + i)(1 − i) = 2. O denominador original precisa ser diferente de zero.",
        },
      ],
      "O plano complexo dá dois eixos para localizar um número, como um endereço com duas coordenadas. O módulo mede a distância desse endereço à origem.",
      "Para z = 1 + 2i e w = 3 − i, calcule a) z + w; b) zw; c) |z|; d) 1/z. Mostre onde usou i² = −1 e confira a divisão multiplicando o resultado por z.",
      "Distribua todos os termos e agrupe os reais. Na divisão, use o conjugado 1 − 2i e mantenha o fator em todo o numerador.",
      "a) 4 + i. b) 3 − i + 6i − 2i² = 5 + 5i. c) √5. d) (1 − 2i)/5; ao multiplicar por 1 + 2i, o numerador vira 5 e o resultado é 1. Se encontrou 1 + 5i no produto, provavelmente substituiu −2i² por −2, em vez de +2.",
      [
        {
          title: "OBMEP/IMPA — complexos na forma algébrica",
          url: "https://portaldaobmep.impa.br/index.php/modulo/ver?modulo=83",
        },
      ],
    ),
    lesson(
      "em3-polinomios-raizes",
      "Polinômios: avaliar, fatorar e encontrar raízes",
      ["Relacionar raiz a valor zero do polinômio.", "Conferir uma fatoração pela multiplicação."],
      "Um polinômio em x combina potências inteiras não negativas de x com coeficientes. Avaliar P(2) é substituir x por 2, preservando parênteses e sinais. Uma raiz r satisfaz P(r) = 0. O grau de um polinômio não nulo é o maior expoente cujo coeficiente é diferente de zero.",
      [
        {
          title: "Exemplo resolvido",
          body: "Em P(x) = x² − 5x + 6, P(2) = 4 − 10 + 6 = 0. Logo, 2 é raiz. Como (x − 2)(x − 3) = x² − 5x + 6, a outra raiz é 3. A fatoração transforma a equação em um produto zero: pelo menos um dos fatores deve ser zero.",
        },
        {
          title: "Raiz não é coeficiente",
          body: "Em P(x) = (x + 1)(x − 4), as raízes são −1 e 4. O sinal da raiz vem da equação de cada fator: x + 1 = 0. Multiplicar fornece x² − 3x − 4, uma maneira independente de conferir a forma fatorada.",
        },
        {
          title: "Não divida por algo que pode ser zero",
          body: "Na equação x(x − 3) = 0, dividir os dois lados por x elimina a possibilidade x = 0. Resolva pelos fatores: x = 0 ou x = 3. Sempre volte à expressão inicial para conferir as soluções e não perder casos.",
        },
      ],
      "A forma expandida mostra os termos; a forma fatorada mostra peças cujo produto reconstrói a mesma expressão. Cada forma facilita uma pergunta diferente.",
      "Considere Q(x) = x² − x − 6. a) Calcule Q(−2). b) Fatore Q e determine suas raízes. c) Confira a fatoração multiplicando. d) Explique o erro de dividir x(x + 2) = 0 por x sem analisar casos.",
      "Busque dois números com produto −6 e soma −1. Use parênteses ao substituir um número negativo.",
      "a) 4 + 2 − 6 = 0. b) Q(x) = (x − 3)(x + 2); raízes 3 e −2. c) x² + 2x − 3x − 6 = x² − x − 6. d) Dividir por x pressupõe x diferente de zero e perde a solução x = 0; a outra é −2.",
      [
        {
          title: "OBMEP/IMPA — expressões algébricas e polinômios",
          url: "https://portaldaobmep.impa.br/index.php/modulo/ver?modulo=13",
        },
      ],
    ),
    lesson(
      "em3-probabilidade-binomial",
      "Probabilidade binomial: contar sucessos",
      [
        "Reconhecer as condições do modelo binomial.",
        "Combinar contagem e probabilidade em tentativas independentes.",
      ],
      "O modelo binomial conta sucessos em um número fixo n de tentativas independentes, cada uma classificada como sucesso ou fracasso, com a mesma probabilidade p de sucesso. Sucesso é apenas o nome do evento contado, não um julgamento de valor. Antes de usar a fórmula, confira essas condições.",
      [
        {
          title: "Uma ordem e todas as ordens",
          body: "Em três lançamentos independentes de moeda equilibrada, a sequência cara–cara–coroa tem probabilidade (1/2)³ = 1/8. Exatamente duas caras podem aparecer em três ordens: CCK, CKC e KCC, usando C para cara e K para coroa. São 3/8, não apenas 1/8.",
        },
        {
          title: "O papel da combinação",
          body: "A probabilidade de exatamente k sucessos é C(n,k) × p^k × (1 − p)^(n − k). A combinação escolhe quais posições são sucessos. Para quatro tentativas com p = 1/2 e dois sucessos, C(4,2) = 6 e cada ordem tem probabilidade 1/16: resultado 6/16 = 3/8.",
        },
        {
          title: "Quando o modelo não serve diretamente",
          body: "Retirar objetos sem reposição de uma caixa pequena muda a composição disponível e a chance nas próximas retiradas. Não aplique automaticamente o modelo com p constante. Para 'pelo menos um', pode ser mais simples calcular 1 menos a probabilidade de nenhum sucesso.",
        },
      ],
      "É como escolher em quais espaços de uma sequência haverá uma marca. Primeiro calcule a chance de uma ordem; depois conte quantas ordens atendem ao pedido.",
      "Uma moeda equilibrada é lançada quatro vezes, de modo independente. a) Qual a probabilidade de exatamente uma cara? b) De pelo menos uma cara? c) Uma caixa contém duas bolas claras e duas escuras. Quatro retiradas sem reposição têm o mesmo modelo com p = 1/2 em cada etapa? Explique.",
      "No item a, escolha a posição da única cara. No b, considere o evento complementar: quatro coroas.",
      "a) C(4,1) × (1/2)^4 = 4/16 = 1/4. b) 1 − 1/16 = 15/16. c) Não: sem reposição, a chance muda conforme as retiradas e elas não são independentes. Nas quatro retiradas dessa caixa haverá exatamente duas claras, diferentemente dos lançamentos de moeda.",
      [
        {
          title: "IMPA — material de combinatória e distribuição binomial",
          url: "https://portaldaobmep.impa.br/uploads/msg/5fpwf84eez8c0.pdf",
        },
      ],
    ),
    lesson(
      "em3-espacial-cone",
      "Geometria espacial: cone, área e volume",
      ["Distinguir altura, raio e geratriz de cone reto.", "Separar medidas de área e volume."],
      "Um cone circular reto tem base circular de raio r e vértice alinhado ao centro da base. Sua altura h é perpendicular ao plano da base. A geratriz g liga o vértice à borda da base; no cone reto, g² = r² + h². Não troque altura por geratriz nas fórmulas.",
      [
        {
          title: "Volume: espaço ocupado",
          body: "O volume é V = πr²h/3. Para r = 3 cm e h = 4 cm, V = 12π cm³. Um cilindro de mesma base e altura tem volume 36π cm³: o cone ocupa um terço desse valor. Área usa unidades quadradas; volume usa unidades cúbicas.",
        },
        {
          title: "Área lateral e área total",
          body: "A área lateral é πrg; com r = 3 e h = 4, g = 5 e a área lateral é 15π cm². Para fechar também a base, acrescente πr²: área total 24π cm². Um molde sem base e um recipiente fechado exigem superfícies diferentes.",
        },
        {
          title: "Escala altera as potências",
          body: "Se todas as medidas lineares dobrarem, as áreas ficam quatro vezes maiores e o volume, oito vezes maior. Se apenas o raio dobrar e a altura ficar fixa, o volume fica quatro vezes maior. Diga quais dimensões mudaram antes de concluir uma razão.",
        },
      ],
      "Papel para revestir a superfície mede área; material para preencher o interior mede volume. São compras diferentes, com unidades diferentes.",
      "Um cone reto tem r = 6 cm e h = 8 cm. a) Calcule g, volume, área lateral e área total. b) Compare seu volume com o exemplo de r = 3 e h = 4. c) Se apenas o raio do exemplo inicial dobrar, mantendo h = 4, qual será o volume? Use π sem aproximação.",
      "Aplique Pitágoras para a geratriz e confira se a base está incluída na área pedida.",
      "a) g = 10 cm; V = 96π cm³; área lateral 60π cm²; total 96π cm². Os números iguais de volume e área total neste exemplo não tornam as grandezas iguais: as unidades diferem. b) 96π/12π = 8. c) 48π cm³, quatro vezes o inicial, pois só r dobrou.",
      [
        {
          title: "OBMEP/IMPA — volumes e áreas de cilindros, cones e esferas",
          url: "https://portaldaobmep.impa.br/index.php/modulo/ver?modulo=45",
        },
      ],
    ),
  ],
  "em3-linguagens-leitura": [
    lesson(
      "em3-coesao-referentes",
      "Coesão referencial: quem ou o que o texto retoma?",
      [
        "Identificar referentes de pronomes e expressões.",
        "Reescrever ambiguidades preservando a informação disponível.",
      ],
      "A coesão referencial conecta partes do texto por retomadas ou antecipações. Pronomes, expressões nominais e omissões recuperáveis ajudam a acompanhar pessoas, objetos e ideias. O referente não é sempre a palavra mais próxima: sentido e contexto também importam. Se duas leituras continuam possíveis, reconheça a ambiguidade.",
      [
        {
          title: "Exemplo autoral",
          body: "'A escola abriu uma sala de leitura. O novo espaço recebeu livros doados. Isso ampliou as opções de estudo.' 'O novo espaço' retoma a sala de leitura. 'Isso' pode resumir a situação apresentada, não apenas o último substantivo. Explique a ligação em vez de apenas circular uma palavra.",
        },
        {
          title: "Duas leituras possíveis",
          body: "'Lia falou com Bia sobre sua apresentação.' Sem mais contexto, 'sua' pode remeter à apresentação de Lia ou de Bia. Reescrever como 'sobre a apresentação de Lia' resolve uma leitura; 'sobre a apresentação de Bia' resolve a outra. Escolher uma delas sem evidência acrescenta informação ao texto original.",
        },
        {
          title: "Repetir pode ajudar",
          body: "Evitar toda repetição pode tornar o texto menos preciso. Repetir um nome ou termo é útil quando um pronome deixaria dúvida. Uma substituição por sinônimo também precisa manter o sentido: chamar qualquer ação de 'solução' pode antecipar uma avaliação ainda não justificada.",
        },
      ],
      "Os referentes funcionam como fios entre partes do texto. Se o fio pode chegar a dois pontos, o leitor precisa de mais informação.",
      "Texto autoral: 'O grêmio apresentou uma proposta à direção. Ela sugeria ampliar a biblioteca. Essa medida seria discutida na reunião.' a) Identifique duas leituras de 'ela'. b) Reescreva deixando claro que a proposta contém a sugestão. c) Explique o que 'essa medida' retoma nessa reescrita. d) Diga por que a frase original não permite escolher uma leitura com certeza.",
      "Tanto 'proposta' quanto 'direção' são femininos singulares. Conferir concordância ajuda, mas não resolve sozinho a referência.",
      "a) Pode ser a proposta que sugeria a ampliação ou a direção que a sugeria. b) Uma opção: 'O grêmio apresentou à direção uma proposta de ampliação da biblioteca. Essa medida seria discutida na reunião.' c) A ampliação da biblioteca. d) Faltam informações que eliminem uma das leituras. Aceite reescritas que preservem o sentido escolhido sem inventar uma aprovação da proposta.",
      [
        {
          title: "eduCAPES — pesquisa sobre mecanismos de coesão referencial",
          url: "https://educapes.capes.gov.br/handle/capes/1152448",
        },
      ],
    ),
    lesson(
      "em3-ingles-third",
      "Inglês: imaginar outro passado com o third conditional",
      [
        "Interpretar uma condição passada não realizada.",
        "Distinguir hipóteses do presente e do passado.",
      ],
      "O third conditional imagina um passado diferente e uma consequência também passada. Um padrão comum é if + past perfect, seguido de would have + particípio passado. O texto constrói uma alternativa ao que ocorreu; não relata que essa alternativa realmente aconteceu.",
      [
        {
          title: "Exemplo autoral com contexto",
          body: "Contexto: a equipe não leu o aviso e chegou tarde. 'If we had read the notice, we would have arrived earlier.' A condição é had read; a consequência imaginada é would have arrived. A forma read no particípio é escrita como no presente, mas sua pronúncia corresponde a /red/.",
        },
        {
          title: "Construa cada parte",
          body: "Em 'If Ana had saved the file, she would have kept her notes', had saved indica a ação passada imaginada; would have kept, o resultado alternativo. Kept é particípio de keep. Na ordem invertida, 'She would have kept her notes if she had saved the file', a relação se mantém.",
        },
        {
          title: "Compare tempos e alcance",
          body: "'If I had more time, I would study' costuma imaginar uma condição presente/futura: second conditional. 'If I had had more time, I would have studied' imagina outra condição passada: o primeiro had é auxiliar e o segundo é particípio de have. Não interprete todos os had como a mesma estrutura. Há padrões mistos, mas esta aula pratica consequências passadas.",
        },
      ],
      "É uma revisão imaginária de uma decisão anterior: você altera uma condição no cenário, sem mudar o que efetivamente aconteceu.",
      "Contexto fictício: Ben não conferiu o horário e perdeu o ônibus. a) Complete: 'If Ben ___ (check) the timetable, he ___ (catch) the bus.' b) Traduza o sentido. c) Reescreva começando pela consequência. d) A frase prova que conferir o horário sempre garante pegar um ônibus na vida real?",
      "Use had + particípio na condição; would have + particípio na consequência. O particípio de catch é caught.",
      "a) 'If Ben had checked the timetable, he would have caught the bus.' b) 'Se Ben tivesse conferido o horário, teria pegado o ônibus', no cenário imaginado. c) 'Ben would have caught the bus if he had checked the timetable.' d) Não: a frase constrói uma hipótese contextual, não uma lei causal universal. Aceite traduções naturais que preservem condição e consequência passadas.",
      [
        {
          title: "British Council — third conditional",
          url: "https://learnenglishteens.britishcouncil.org/grammar/b1-b2-grammar/third-conditional",
        },
      ],
    ),
  ],
  "em3-humanas-populacao": [
    lesson(
      "em3-demografia-transicao",
      "Transição demográfica: taxas e estrutura etária",
      [
        "Distinguir crescimento natural e saldo migratório.",
        "Interpretar taxas sem transformar modelos em trajetórias obrigatórias.",
      ],
      "A dinâmica demográfica envolve nascimentos, mortes e migrações. Crescimento natural é a diferença entre nascimentos e mortes; a variação total também considera quem chega e quem sai. Transição demográfica é um modelo de mudanças nos padrões de natalidade e mortalidade, com ritmos e contextos históricos diversos.",
      [
        {
          title: "Taxas com a mesma base",
          body: "Em um território fictício, ocorrem 18 nascimentos e 7 mortes por mil habitantes em um ano. A diferença é 11 por mil, equivalente a 1,1% como aproximação anual do crescimento natural com a mesma população de referência. Não é 11%: por mil e por cento têm denominadores diferentes.",
        },
        {
          title: "A população ainda pode diminuir",
          body: "Se o saldo migratório no período for −15 por mil, a combinação didática das taxas resulta em −4 por mil. Crescimento natural positivo não garante aumento da população total. Para números absolutos, use a identidade: população final = inicial + nascimentos − mortes + entradas − saídas.",
        },
        {
          title: "Estrutura etária importa",
          body: "A queda da fecundidade pode alterar a proporção de crianças e, ao longo do tempo, contribuir para envelhecimento populacional. Essa interpretação depende também de mortalidade e migração. Um modelo de etapas não deve ser aplicado como calendário igual para todos os lugares nem como julgamento de superioridade.",
        },
      ],
      "O saldo de uma caixa depende de todas as entradas e saídas. Examinar só uma delas pode inverter sua conclusão sobre o total.",
      "Dados fictícios de um ano: população inicial 10.000, nascimentos 160, mortes 90, entradas 40 e saídas 130. a) Calcule crescimento natural, saldo migratório e população final. b) Expresse o crescimento natural por mil usando a população inicial como referência. c) Explique por que natalidade isolada não revela a demanda futura por escolas e serviços de saúde.",
      "Mantenha os componentes separados antes de somá-los. Informe a população de referência da taxa.",
      "a) Crescimento natural 70; saldo migratório −90; variação total −20; população final 9.980. b) 70/10.000 × 1.000 = 7 por mil, ou 0,7%. c) É necessário considerar estrutura etária, mortalidade, migração e acesso aos serviços. Uma taxa isolada não determina uma previsão completa.",
      [
        {
          title: "IBGE — componentes e estrutura da população",
          url: "https://www.ibge.gov.br/estatisticas/sociais/populacao.html",
        },
      ],
    ),
    lesson(
      "em3-urbanizacao-redes",
      "Urbanização e redes de cidades",
      [
        "Calcular taxa de urbanização.",
        "Relacionar fluxos entre cidades e planejamento de serviços.",
      ],
      "Urbanização pode ser analisada pelo aumento da participação da população urbana no total. Isso difere do crescimento absoluto de uma cidade: uma população urbana pode crescer e ainda representar uma proporção menor, se o total crescer mais. A definição de urbano e rural usada pela fonte também precisa ser conhecida.",
      [
        {
          title: "Exemplo resolvido",
          body: "Num território fictício com 80 mil moradores urbanos e 20 mil rurais, a taxa é 80/(80 + 20) = 80%. Em outro período, há 90 mil urbanos e 30 mil rurais: a taxa passa a 75%. O número urbano cresceu, mas sua participação caiu.",
        },
        {
          title: "Rede urbana não é só tamanho",
          body: "Cidades se conectam por deslocamentos para trabalho, estudo, saúde, compras e gestão. Uma cidade pode exercer influência sobre outras por serviços que concentra. População é relevante, mas não basta sozinha para descrever todas as funções e relações de uma rede.",
        },
        {
          title: "Planejar com os fluxos",
          body: "Se moradores de A estudam em B e trabalham em C, planejar transporte olhando apenas limites municipais ignora esses movimentos. Mapear origem, destino, horário, demanda e acessibilidade ajuda a avaliar soluções. Não conclua que crescer é sinônimo automático de melhorar condições de moradia ou saneamento.",
        },
      ],
      "Uma rede de cidades lembra uma rede de serviços: alguns pontos concentram funções, e os caminhos entre eles também precisam ser estudados.",
      "Dados fictícios: período 1, 30 mil urbanos e 10 mil rurais; período 2, 36 mil urbanos e 24 mil rurais. a) Calcule as duas taxas de urbanização. b) Houve aumento absoluto urbano? E aumento de participação urbana? c) Se a maioria das consultas especializadas ocorre em outra cidade, que informações você reuniria antes de propor uma linha de ônibus?",
      "O denominador é a população total de cada período. Para planejar transporte, pense em demanda e acesso, não só no número de veículos.",
      "a) 75% e 60%. b) Aumento absoluto de 6 mil, mas queda de 15 pontos percentuais de participação. c) Origens/destinos, horários de consultas, demanda, tempo/custo, acessibilidade e alternativas existentes. Propostas devem ser justificadas por dados, sem presumir que um único indicador resolve o planejamento.",
      [
        {
          title: "IBGE Educa — taxa de urbanização",
          url: "https://educa.ibge.gov.br/professores/educa-atividades/17692-taxa-de-urbanizacao-espacializando-informacoes.html",
        },
        {
          title: "IBGE Educa — arranjos populacionais",
          url: "https://educa.ibge.gov.br/jovens/materias-especiais/20583-ibge-explica-arranjos-populacionais.html",
        },
      ],
    ),
    lesson(
      "em3-blocos-integracao",
      "Blocos econômicos: formas e limites da integração",
      [
        "Distinguir livre comércio e união aduaneira em modelos didáticos.",
        "Analisar quem ganha ou perde com uma regra econômica.",
      ],
      "Acordos de integração definem regras entre participantes para facilitar certas relações econômicas. Não implicam automaticamente moeda única, livre circulação de pessoas ou políticas idênticas. Acordos reais precisam ser analisados pelo texto e pelo período de vigência, não apenas pelo nome do bloco.",
      [
        {
          title: "Dois modelos simplificados",
          body: "Numa área de livre comércio, participantes reduzem ou eliminam barreiras internas conforme o acordo, mantendo políticas comerciais próprias perante terceiros. Numa união aduaneira, há também uma política tarifária externa comum nos termos acordados. Exceções e regras de origem podem importar; não confunda esses modelos com ausência de toda regulação.",
        },
        {
          title: "Exemplo fictício",
          body: "A e B retiram tarifas de certos produtos entre si, mas A cobra 5% e B cobra 12% sobre o mesmo produto vindo de C. Nesse modelo, a diferença externa é compatível com uma área de livre comércio e não descreve uma tarifa externa comum para esse produto. Não se trata de um bloco real.",
        },
        {
          title: "Benefícios não são iguais para todos",
          body: "Uma regra pode reduzir custos de importação e ampliar mercados, mas afetar setores, empregos e territórios de formas distintas. Avalie preços, produção, trabalho, ambiente e distribuição dos resultados. Um aumento de comércio não comprova sozinho melhoria para toda a população.",
        },
      ],
      "Um acordo coletivo pode definir regras comuns para algumas atividades sem tornar todos os participantes uma única organização.",
      "No acordo fictício X, membros retiram tarifas internas previstas e mantêm tarifas externas diferentes. No Y, há também tarifa externa comum para os bens abrangidos. a) Qual se aproxima de livre comércio e qual de união aduaneira? b) Algum desses dados prova moeda única? c) Proponha duas perguntas para investigar efeitos do acordo sobre trabalhadores e consumidores.",
      "Classifique apenas com as características informadas. Efeitos sociais precisam de evidências próprias.",
      "a) X se aproxima de área de livre comércio; Y, de união aduaneira, na simplificação descrita. b) Não: moeda única exigiria informação adicional. c) Exemplos: como variaram preços e acesso a produtos? Como mudaram empregos, salários e condições de trabalho por setor? Aceite perguntas investigáveis que não suponham resultado uniforme.",
      [
        {
          title: "OMC — alcance dos acordos regionais de comércio",
          url: "https://www.wto.org/english/tratop_e/region_e/scope_rta_e.htm",
        },
        {
          title: "OMC — áreas de livre comércio e uniões aduaneiras",
          url: "https://www.wto.org/english/tratop_e/region_e/region_art24_e.htm",
        },
      ],
    ),
    lesson(
      "em3-desenvolvimento-indicadores",
      "Desenvolvimento: médias, desigualdade e indicadores",
      [
        "Distinguir renda média e distribuição.",
        "Explicar o alcance e os limites de um indicador composto.",
      ],
      "Comparar desenvolvimento exige explicitar o que está sendo medido. Uma média de renda não mostra como os recursos se distribuem. O Índice de Desenvolvimento Humano reúne dimensões de saúde, educação e padrão de vida; é um resumo útil, mas não mede sozinho todas as desigualdades nem todas as condições de bem-estar.",
      [
        {
          title: "Mesma média, distribuições diferentes",
          body: "Num grupo fictício, quatro pessoas recebem 10 unidades cada. Em outro, recebem 1, 1, 1 e 37. Ambos têm média 10, mas experiências muito diferentes. Não conclua que a renda da pessoa típica é 10 nos dois grupos; olhar a mediana e a distribuição acrescenta informação.",
        },
        {
          title: "Um índice não é um retrato completo",
          body: "Indicadores compostos combinam medidas segundo uma metodologia. Não calcule um IDH oficial tirando a média simples de renda, anos e percentuais: são unidades distintas e existem procedimentos específicos. Para comparar, confira fonte, período, método e escala territorial.",
        },
        {
          title: "Uma investigação responsável",
          body: "Para avaliar políticas, combine indicadores com dados de grupos e territórios: acesso a serviços, desigualdade, condições ambientais e participação social, conforme a pergunta. Um ranking não autoriza descrever toda uma população como homogênea nem estabelece sozinho a causa das diferenças.",
        },
      ],
      "Um painel de instrumentos mostra aspectos diferentes de uma viagem. Uma única leitura não informa simultaneamente velocidade, combustível e condição da estrada.",
      "Grupos fictícios A = [4, 4, 4, 4] e B = [1, 1, 1, 13]. a) Calcule média e mediana de cada grupo. b) O que a comparação só pela média esconde? c) Cite as três dimensões gerais do IDH e uma questão importante que exigiria dados adicionais.",
      "Com quatro valores ordenados, a mediana é a média dos dois centrais. Dimensão de um índice não é o mesmo que toda informação social relevante.",
      "a) A: média 4 e mediana 4; B: média 4 e mediana 1. b) Esconde a concentração dos valores e diferenças entre integrantes. c) Saúde/longevidade, educação/conhecimento e padrão de vida/renda. Distribuição de renda, desigualdade territorial ou acesso desigual a serviços são exemplos de perguntas que pedem medidas adicionais. Não se está calculando o IDH dos grupos.",
      [
        {
          title: "PNUD — Human Development Index",
          url: "https://hdr.undp.org/data-center/human-development-index",
        },
      ],
    ),
  ],
  "em3-natureza-hereditariedade": [
    lesson(
      "em3-genetica-abo",
      "Sistema ABO: alelos múltiplos e codominância",
      [
        "Relacionar genótipos e fenótipos no modelo ABO básico.",
        "Calcular possibilidades sem transformar probabilidade em certeza.",
      ],
      "No modelo didático usual do sistema ABO, usamos três alelos: Iᴬ, Iᴮ e i. Cada indivíduo diploide possui dois deles. Iᴬ e Iᴮ são codominantes entre si; ambos dominam i nesse modelo. Alelos múltiplos existem na população, não significa que cada indivíduo carregue os três ao mesmo tempo.",
      [
        {
          title: "Do genótipo ao grupo",
          body: "IᴬIᴬ e Iᴬi correspondem ao grupo A; IᴮIᴮ e Iᴮi, ao B; IᴬIᴮ, ao AB; ii, ao O. Codominância não é mistura em um terceiro alelo: no AB, expressam-se características associadas aos dois alelos.",
        },
        {
          title: "Exemplo resolvido",
          body: "No cruzamento didático Iᴬi × Iᴮi, os gametas possíveis são Iᴬ ou i e Iᴮ ou i. As quatro combinações equiprováveis são IᴬIᴮ, Iᴬi, Iᴮi e ii. Nesse modelo, A, B, AB e O têm probabilidade de 1/4 por descendente; quatro descendentes não precisam formar um de cada grupo.",
        },
        {
          title: "O alcance do exercício",
          body: "Usamos um modelo introdutório que não cobre variantes raras ou outros sistemas sanguíneos. Não use o quadro para decisões de transfusão, confirmação de parentesco ou diagnóstico. Tipagem e interpretação de casos reais exigem procedimentos e profissionais apropriados.",
        },
      ],
      "Uma população pode ter três versões disponíveis de uma instrução, enquanto cada indivíduo recebe apenas duas cópias no modelo estudado.",
      "No modelo ABO básico, considere Iᴬi × ii. a) Liste gametas e genótipos possíveis dos descendentes. b) Dê as probabilidades de A e O. c) Se nascer um descendente O, a próxima probabilidade muda? d) Por que conhecer apenas o fenótipo A nem sempre revela o genótipo?",
      "O progenitor ii fornece somente i. Um fenótipo pode corresponder a mais de um genótipo.",
      "a) Iᴬ ou i de um lado e i do outro; descendentes Iᴬi ou ii. b) 1/2 A e 1/2 O. c) Não no modelo de eventos independentes: cada descendente mantém essas probabilidades, sem garantia de proporção numa família pequena. d) A pode ser IᴬIᴬ ou Iᴬi. A resposta é educativa e não interpreta uma família real.",
      [
        {
          title: "NCBI/NIH — herança do grupo ABO",
          url: "https://www.ncbi.nlm.nih.gov/books/NBK2267/",
        },
      ],
    ),
    lesson(
      "em3-genetica-ligada-x",
      "Herança ligada ao X: ler o modelo com cuidado",
      [
        "Acompanhar a transmissão de um alelo em cromossomos X.",
        "Distinguir probabilidade conjunta e probabilidade condicionada.",
      ],
      "Herança ligada ao X envolve genes localizados nesse cromossomo. Para aprender a acompanhar alelos, usaremos um caráter fictício recessivo em um modelo XX/XY, sem equivalência com uma condição humana real. O modelo não descreve toda a diversidade cromossômica, sexual ou de expressão gênica.",
      [
        {
          title: "Representação",
          body: "Escrevemos Xᴬ e Xᵃ para versões do gene e Y sem um alelo correspondente no locus simplificado. XᴬXᵃ não expressa o caráter recessivo no modelo; XᵃY o expressa por ter apenas essa cópia. Isso depende das premissas didáticas, não autoriza generalização sobre toda característica ligada ao X.",
        },
        {
          title: "Quadro resolvido",
          body: "Em XᴬXᵃ × XᴬY, com gametas equiprováveis, aparecem XᴬXᴬ, XᴬXᵃ, XᴬY e XᵃY. Cada combinação tem probabilidade 1/4. Entre os descendentes XY do modelo, metade é XᵃY; no conjunto de todos os descendentes, XᵃY representa 1/4.",
        },
        {
          title: "Transmissão e pergunta",
          body: "No modelo, o progenitor XY fornece seu X aos descendentes XX e seu Y aos XY. Leia se a pergunta se refere a todos os descendentes ou apenas a um grupo: mudar o denominador muda a probabilidade. Não deduza diagnóstico individual por uma árvore simplificada.",
        },
      ],
      "Ao distribuir cópias marcadas, é preciso acompanhar tanto a marca quanto o pacote que a transporta. Contar só os pacotes de um tipo muda o universo da pergunta.",
      "No caráter fictício e com as mesmas premissas, analise XᵃXᵃ × XᴬY. a) Liste os genótipos dos descendentes XX e XY. b) Que fração dos XY expressa o caráter? c) Que fração do total o expressa, supondo XX e XY equiprováveis? d) Explique por que b e c diferem.",
      "O progenitor XᵃXᵃ fornece sempre Xᵃ. Separe o grupo XY do total de resultados.",
      "a) XX: XᴬXᵃ; XY: XᵃY. b) Todos os XY, ou 100%. c) Metade do total, ou 50%, sob as premissas dadas. d) b condiciona a contagem aos XY; c inclui também os XX. Nenhuma conclusão médica ou sobre identidade de pessoas decorre deste caráter fictício.",
      [
        {
          title: "NHGRI — X chromosome",
          url: "https://www.genome.gov/genetics-glossary/X-Chromosome",
        },
        { title: "NHGRI — X-linked", url: "https://www.genome.gov/genetics-glossary/X-Linked" },
      ],
    ),
    lesson(
      "em3-cromossomos-alteracoes",
      "Alterações cromossômicas: número e estrutura",
      [
        "Distinguir mudança no número e na estrutura dos cromossomos.",
        "Reconhecer limites de uma contagem ou imagem cromossômica.",
      ],
      "Cromossomos organizam DNA associado a proteínas. Uma alteração cromossômica pode envolver quantidade ou estrutura. Isso não é sinônimo de uma substituição de uma única base do DNA: são escalas de análise diferentes. A descrição de uma alteração também não determina sozinha todos os seus efeitos.",
      [
        {
          title: "Número",
          body: "Em um organismo fictício com três pares de cromossomos, o conjunto diploide usual tem seis. Uma célula com uma cópia extra de um desses cromossomos tem sete: exemplo didático de aneuploidia. Na não disjunção, cromossomos homólogos ou cromátides podem não se separar adequadamente durante uma divisão, gerando distribuição desigual.",
        },
        {
          title: "Estrutura",
          body: "Uma deleção remove um trecho; uma duplicação repete um trecho. Uma inversão muda a orientação de um segmento, enquanto uma translocação envolve mudança de localização de material cromossômico. Algumas alterações estruturais mantêm a contagem total de cromossomos: contar não basta para identificar sua estrutura.",
        },
        {
          title: "O que o cariótipo mostra",
          body: "Um cariótipo permite observar número e características dos cromossomos em uma preparação apropriada. Ele não lê cada base nem detecta toda variante genética. Interpretação clínica depende de exames, contexto e profissionais; aqui classificamos modelos fictícios, sem diagnosticar pessoas.",
        },
      ],
      "Uma coleção pode mudar por ganhar um volume ou por perder páginas de um volume existente. Contar livros e examinar páginas responde a perguntas diferentes.",
      "Uma espécie fictícia tem quatro pares de cromossomos. a) Quantos cromossomos há no conjunto diploide usual? b) Uma célula com uma cópia extra de um cromossomo terá quantos? c) Em outra célula, um trecho foi perdido, mas a contagem permaneceu igual. É uma alteração numérica ou estrutural? d) A contagem normal prova ausência de qualquer alteração no DNA?",
      "Par significa duas cópias no conjunto diploide. Uma perda de segmento não exige perder um cromossomo inteiro.",
      "a) Oito. b) Nove. c) Estrutural, uma deleção no cenário descrito. d) Não: a contagem pode permanecer igual apesar de alterações estruturais ou de sequência. Não atribua um quadro clínico aos números fictícios.",
      [
        {
          title: "NHGRI — aneuploidia",
          url: "https://www.genome.gov/genetics-glossary/Aneuploidy",
        },
        { title: "NHGRI — cariótipo", url: "https://www.genome.gov/genetics-glossary/Karyotype" },
        { title: "NHGRI — cromossomo", url: "https://www.genome.gov/genetics-glossary/Chromosome" },
      ],
    ),
    lesson(
      "em3-genoma-etica",
      "Genoma humano: informação, evidência e privacidade",
      [
        "Distinguir genoma, gene e resultado de um teste.",
        "Analisar finalidade e proteção de dados genéticos em cenário fictício.",
      ],
      "Genoma é o conjunto da informação genética de um organismo. Um gene é uma parte desse conjunto, não um sinônimo do genoma inteiro. Estudar sequências pode ajudar a investigar funções e variações, mas conhecer uma sequência não equivale a prever toda a vida ou a saúde de uma pessoa.",
      [
        {
          title: "Referência não é destino",
          body: "Um genoma de referência funciona como recurso para comparar sequências e organizar pesquisas; não descreve uma pessoa humana ideal. Variações entre indivíduos e relações com ambiente e regulação precisam ser consideradas. Nem toda diferença encontrada tem significado funcional conhecido.",
        },
        {
          title: "Resultado e interpretação",
          body: "Uma associação estatística entre variante e característica não significa que qualquer portador terá o mesmo resultado. Pergunte qual característica foi medida, em que população, com qual evidência e quais limitações. Informação genética não deve ser tratada como rótulo de capacidade, valor ou comportamento.",
        },
        {
          title: "Cenário de pesquisa e cuidado com dados",
          body: "Num projeto escolar fictício, a alternativa adequada é estudar sequências artificiais, sem coletar material ou testes reais de colegas. Em pesquisas reais, finalidade, consentimento, acesso, guarda e possibilidade de identificação são questões fundamentais. Não publique resultados identificáveis nem dados de familiares para ilustrar um exercício.",
        },
      ],
      "Um arquivo de instruções fornece informação, mas sua existência não explica sozinha todas as condições em que um sistema funciona. A analogia não torna pessoas máquinas previsíveis.",
      "Um anúncio fictício promete: 'Envie o teste genético da sua família e descubra exatamente sua profissão ideal'. a) Identifique duas conclusões sem apoio. b) Proponha três perguntas sobre o uso dos dados. c) Transforme a ideia em uma atividade escolar que não colete dados reais.",
      "Separe evidência científica, promessa determinista e proteção das pessoas. Não envie nem use documentos genéticos verdadeiros.",
      "a) Genética não determina uma profissão ideal nem permite previsão exata a partir da promessa descrita. b) Exemplos: qual a finalidade, quem acessa, como se protege/guarda a informação e como se trata o consentimento? c) Usar sequências artificiais e analisar criticamente afirmações e limites, sem testes ou informações de familiares. Critérios: rejeitar inferências deterministas e justificar a proteção dos dados.",
      [
        { title: "NHGRI — genome", url: "https://www.genome.gov/genetics-glossary/Genome" },
        {
          title: "NHGRI — ética, direito e implicações sociais",
          url: "https://www.genome.gov/about-genomics/policy-issues",
        },
      ],
    ),
  ],
};
