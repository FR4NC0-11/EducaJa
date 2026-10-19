import type { Lesson } from "./catalog";
import { lesson } from "./secondary-lesson";

const atlas = [
  {
    title: "IBGE — Atlas Geográfico Escolar",
    url: "https://www.ibge.gov.br/geociencias/atlas/nacional/2402-np-atlas-geografico-escolar/16633-atlas-geografico-escolar.html",
  },
];
const math = [
  { title: "OBMEP/IMPA — Portal da Matemática", url: "https://portaldaobmep.impa.br/" },
];
const grammar = [
  {
    title: "Senado — Manual de Comunicação",
    url: "https://www12.senado.leg.br/manualdecomunicacao",
  },
];
const cancer = [
  {
    title: "NCI — O que é câncer? (em inglês)",
    url: "https://www.cancer.gov/about-cancer/understanding/what-is-cancer",
  },
];
const genetics = [
  {
    title: "NHGRI — Glossário de genética (em inglês)",
    url: "https://www.genome.gov/genetics-glossary",
  },
];

// Recortes autorais a partir dos temas do índice do 3º trimestre; não reproduzem capítulos.
export const secondaryThirdTerm: Record<string, Lesson[]> = {
  "em3-matematica-contagem": [
    lesson(
      "em3-esfera-medidas",
      "Esfera: superfície, volume e mudança de escala",
      [
        "Distinguir área da superfície e volume da esfera.",
        "Prever o efeito de alterar o raio antes de calcular.",
      ],
      "Uma bola idealizada como esfera tem todos os pontos da superfície à mesma distância do centro: o raio r. Pintar a superfície e preencher o interior são problemas diferentes. Para r positivo, a área é A = 4πr² e o volume é V = 4πr³/3. As unidades também distinguem as medidas: cm² para área e cm³ para volume.",
      [
        {
          title: "Exemplo resolvido",
          body: "Uma esfera de raio 3 cm tem A = 4π × 9 = 36π cm² e V = 4π × 27/3 = 36π cm³. Os valores numéricos coincidem neste exemplo, mas as grandezas e unidades são diferentes. Não é correto dizer que área e volume são iguais.",
        },
        {
          title: "Dobrar o raio",
          body: "Passar de r para 2r multiplica a área por 2² = 4 e o volume por 2³ = 8. Isso vale para qualquer raio positivo. Oito esferas pequenas de mesmo raio têm juntas o mesmo volume de uma esfera com raio duas vezes maior, mas não a mesma área total.",
        },
        {
          title: "Corte central e limite do modelo",
          body: "Um plano passando pelo centro corta a esfera em um círculo de raio r, cuja área é πr². Essa seção não é toda a superfície 4πr². Um recipiente real também tem espessura: para capacidade interna, use o raio interno, quando fornecido.",
        },
      ],
      "O papel para embrulhar uma bola depende da superfície; o material de uma bola maciça depende do interior. Uma única medida linear não cresce na mesma proporção que essas duas quantidades.",
      "Duas esferas maciças têm raios 2 cm e 6 cm. Calcule a área e o volume da menor em função de π. Sem refazer todas as contas, encontre as razões área maior/menor e volume maior/menor. Qual é a área da seção central da menor?",
      "A razão dos raios é 3. Eleve essa razão ao quadrado ou ao cubo conforme a grandeza.",
      "Menor: A = 16π cm² e V = 32π/3 cm³. As razões são 9 e 27. A seção central mede 4π cm². Usar 3 como razão das áreas ou volumes ignora a potência do raio; usar 16π na seção confunde círculo com superfície esférica.",
      math,
    ),
    lesson(
      "em3-transformacoes-plano",
      "Transformações: isometrias, simetria e homotetia",
      [
        "Aplicar transformações simples a coordenadas.",
        "Distinguir conservação de comprimentos e semelhança.",
      ],
      "Uma transformação associa cada ponto do plano a outro ponto. Translação, rotação e reflexão são isometrias: preservam distâncias. Uma homotetia de centro O e razão k multiplica as distâncias a O por |k|; quando |k| é diferente de 1, muda o tamanho, preservando a forma de figuras semelhantes.",
      [
        {
          title: "Transladar e refletir",
          body: "Transladar P = (2, 1) pelo vetor (3, −2) produz P' = (5, −1): some coordenada a coordenada. Refletir P no eixo y produz (−2, 1). A reflexão troca a orientação, mas mantém comprimentos. O eixo escolhido precisa estar indicado.",
        },
        {
          title: "Rotação e centro",
          body: "Uma rotação de 90° no sentido anti-horário em torno da origem transforma (x, y) em (−y, x). Assim, (2, 1) vira (−1, 2). Girar em torno de outro centro exige considerar esse centro; a regra dada não vale diretamente para qualquer ponto de rotação.",
        },
        {
          title: "Ampliar sem confundir área",
          body: "Na homotetia de centro na origem e k = 2, (x, y) vira (2x, 2y). Um triângulo com lados 3, 4 e 5 passa a ter lados 6, 8 e 10. O perímetro dobra e a área quadruplica. As medidas angulares são preservadas, mas as distâncias entre pontos não.",
        },
      ],
      "Deslizar uma foto mantém seu tamanho; ampliá-la proporcionalmente mantém a forma. Esticar só a largura é outra transformação e pode deformar a figura.",
      "Para A = (1, 2) e B = (4, 2), encontre as imagens pela reflexão no eixo y e pela homotetia de centro na origem e razão 3. Compare o comprimento AB em cada caso. Uma figura com área 5 passa a ter qual área na homotetia?",
      "A distância inicial é 3. Na reflexão, negue apenas x; na homotetia, multiplique as duas coordenadas.",
      "Reflexão: A' = (−1, 2), B' = (−4, 2), distância 3. Homotetia: A'' = (3, 6), B'' = (12, 6), distância 9. A área passa a 5 × 3² = 45. A homotetia de razão 3 não é isometria, pois altera distâncias.",
      math,
    ),
    lesson(
      "em3-probabilidade-continua",
      "Probabilidade contínua: intervalos e complemento",
      [
        "Diferenciar modelo discreto e contínuo.",
        "Calcular probabilidades por comprimentos sob uniformidade.",
      ],
      "Sortear um número inteiro e escolher um instante em um intervalo são modelos diferentes. No discreto equiprovável, contamos resultados; no contínuo uniforme, comparamos comprimentos. A fórmula por comprimento exige uniformidade: ela não descreve automaticamente qualquer tempo de espera real.",
      [
        {
          title: "Intervalo uniforme — exemplo",
          body: "Um simulador escolhe uniformemente um instante T entre 0 e 10 minutos. A chance de 2 ≤ T ≤ 5 é (5 − 2)/(10 − 0) = 3/10. Não conte 2, 3, 4 e 5 como quatro resultados: existem infinitos valores possíveis entre eles.",
        },
        {
          title: "Um ponto e um evento impossível",
          body: "No modelo contínuo, P(T = 4) = 0 porque um ponto tem comprimento zero. Isso não significa que o valor 4 esteja fora do espaço amostral. Em contraste, T = 12 é impossível neste modelo. Incluir ou excluir as pontas de um intervalo não altera sua probabilidade aqui.",
        },
        {
          title: "Complemento sem dupla contagem",
          body: "Para o mesmo simulador, P(T > 7) = 3/10 e P(T ≤ 7) = 1 − 3/10 = 7/10. Eventos complementares cobrem o espaço todo e não se sobrepõem. Se a escolha favorecer alguns instantes, será necessário outro modelo de distribuição.",
        },
      ],
      "Escolher uma posição ao acaso em uma fita uniforme se relaciona ao comprimento do trecho. Escolher uma de dez marcas numeradas é um sorteio discreto: o mecanismo mudou.",
      "Um programa escolhe uniformemente X entre 0 e 12. Calcule P(3 ≤ X ≤ 9), P(X > 10) e seu complemento. Compare P(X = 3) com a chance de sortear o inteiro 3 entre os inteiros de 0 a 12, todos equiprováveis.",
      "O comprimento total é 12, mas há 13 inteiros de 0 a 12. Declare o modelo antes da conta.",
      "As probabilidades são 6/12 = 1/2, 2/12 = 1/6 e 5/6. No contínuo P(X = 3) = 0; no sorteio discreto, a chance é 1/13. Probabilidade zero no modelo contínuo não exclui o ponto do intervalo.",
      math,
    ),
    lesson(
      "em3-pesquisa-amostragem",
      "Pesquisa: amostragem, viés e pergunta bem feita",
      [
        "Distinguir população e amostra.",
        "Identificar viés de seleção e limites de uma conclusão.",
      ],
      "Planejar uma pesquisa começa pela pergunta e pela população sobre a qual se quer concluir. A amostra é o grupo efetivamente observado. Uma amostra grande pode continuar enviesada se certos grupos quase não tiverem chance de participar. Quantidade de respostas e qualidade da seleção são aspectos diferentes.",
      [
        {
          title: "Defina o que quer medir",
          body: "Para estudar o meio de transporte dos estudantes, defina quem conta como estudante e o período de referência. Perguntar ‘qual foi seu principal meio de transporte ontem?’ produz uma variável diferente de ‘qual meio você prefere?’. Uma pergunta sobre hábito não pode ser substituída por uma sobre preferência.",
        },
        {
          title: "Exemplo de viés",
          body: "Uma enquete voluntária no grupo do clube de ciclismo recebe 80 respostas, 60 delas indicando bicicleta. Os 75% descrevem os respondentes. Não estimam automaticamente o uso de bicicleta por toda a escola: a seleção favorece pessoas ligadas ao tema. Acrescentar mais respostas do mesmo clube não elimina esse problema.",
        },
        {
          title: "Plano melhor e registro",
          body: "Uma alternativa é sortear estudantes a partir de uma lista da população e acompanhar quem não respondeu. Se turnos forem relevantes, pode-se sortear dentro de cada turno. Registre período, pergunta, seleção, total convidado e total respondente. Mesmo uma amostra aleatória tem incerteza; nenhum desenho autoriza certezas ilimitadas.",
        },
      ],
      "Provar só a parte açucarada de uma mistura pode dar uma ideia errada do todo. Em pesquisa, mudar quem consegue entrar na amostra importa tanto quanto aumentar o tamanho da colher.",
      "Queremos conhecer o uso da biblioteca por 600 estudantes de três turnos. Uma enquete só na porta da biblioteca ouviu 50 pessoas e 45 disseram frequentá-la. a) Quem são população e amostra? b) Que viés existe? c) Proponha seleção melhor e uma pergunta neutra. d) O que os 90% descrevem?",
      "Pense nos estudantes que nunca passam pela porta. A pergunta deve estabelecer um período e não sugerir a resposta.",
      "População: os 600 estudantes; amostra: as 50 pessoas ouvidas, desde que pertençam a essa população. Há sobrerrepresentação de frequentadores. Sortear em uma lista dos três turnos e perguntar ‘Em quantos dias você usou a biblioteca na última semana letiva?’ é uma proposta possível. Os 90% descrevem os respondentes, não comprovam a proporção da escola.",
      math,
    ),
    lesson(
      "em3-conicas-modelos",
      "Cônicas: reconhecer circunferência, elipse e parábola",
      [
        "Ler parâmetros de equações simples de cônicas.",
        "Verificar se um ponto pertence a uma curva.",
      ],
      "Cônicas podem ser obtidas por cortes de uma superfície cônica e também descritas como conjuntos de pontos no plano. Nesta introdução, trabalharemos com circunferência, elipse e parábola em equações sem rotação. Reconhecer a estrutura ajuda a interpretar; substituir um ponto na equação permite conferir uma hipótese.",
      [
        {
          title: "Circunferência e elipse",
          body: "A equação (x − 1)² + (y + 2)² = 9 descreve uma circunferência de centro (1, −2) e raio 3. Já x²/9 + y²/4 = 1 descreve uma elipse centrada na origem, com semieixos 3 no eixo x e 2 no eixo y. Os denominadores são os quadrados dos semieixos, não suas medidas.",
        },
        {
          title: "Parábola como equidistância",
          body: "Uma parábola reúne pontos equidistantes de um foco e de uma reta diretriz. Na forma y = x²/4, o vértice é (0, 0), o foco (0, 1) e a diretriz y = −1. Por exemplo, (2, 1) está a distância 2 do foco e também a distância 2 da diretriz.",
        },
        {
          title: "Conferir sem adivinhar pelo desenho",
          body: "Na elipse x²/9 + y²/4 = 1, (3, 0) pertence à curva porque 9/9 + 0 = 1. O ponto (3, 2) não pertence, pois a soma é 2. Nem toda curva arredondada é circunferência; um esboço sem escala não substitui a equação. Hipérboles ficam para uma etapa posterior.",
        },
      ],
      "Uma descrição por distâncias é como uma regra de localização: o desenho mostra alguns endereços, mas a regra decide quais realmente pertencem ao conjunto.",
      "a) Encontre centro e raio de (x + 2)² + (y − 1)² = 16. b) Quais são os semieixos de x²/25 + y²/9 = 1? Verifique (5, 0) e (0, 4). c) Em y = x²/4, (4, 4) pertence? Justifique por substituição.",
      "Escreva x + 2 como x − (−2). Tire a raiz dos denominadores positivos para encontrar semieixos.",
      "a) Centro (−2, 1), raio 4. b) Semieixos 5 e 3; (5, 0) pertence, (0, 4) não, pois 16/9 ≠ 1. c) Sim: 4²/4 = 4. Responder raio 16 confunde r² com r.",
      math,
    ),
  ],
  "em3-linguagens-leitura": [
    lesson(
      "em3-coerencia-progressao",
      "Coerência: contradição, relevância e progressão de ideias",
      [
        "Detectar contradição mesmo com conectivos corretos.",
        "Revisar a progressão sem mudar a ideia defendida.",
      ],
      "Coesão liga partes do texto; coerência permite construir um sentido compatível com as informações e o contexto. Um parágrafo pode ter muitos conectivos e ainda se contradizer. Nesta aula, o foco é a lógica das afirmações e a progressão do raciocínio, além da retomada de palavras já estudada.",
      [
        {
          title: "Texto autoral para revisar",
          body: "Leia: ‘Nenhuma turma utilizou a horta neste mês. Além disso, a turma B colheu alface na horta neste mês.’ O conectivo soma frases, mas não resolve a incompatibilidade entre ‘nenhuma’ e o exemplo da turma B, no mesmo período. É preciso corrigir a informação ou delimitar seu alcance.",
        },
        {
          title: "Repetir não é progredir",
          body: "‘A biblioteca é importante porque tem importância para a escola’ apenas reformula a tese. Uma continuação como ‘Ela oferece empréstimos a quem não pode comprar livros’ acrescenta uma razão verificável. Progredir é adicionar explicação, evidência ou consequência pertinente, sem abandonar o assunto.",
        },
        {
          title: "Revisão controlada",
          body: "Uma versão possível é ‘Poucas turmas utilizaram a horta neste mês; a turma B foi uma delas’. A correção depende do que os registros confirmam. Revisar não autoriza inventar fatos para salvar o argumento. Se faltam dados, sinalize a lacuna e procure a informação necessária.",
        },
      ],
      "Conectivos são placas entre trechos de uma estrada. Placas organizadas não consertam uma estrada que termina em dois destinos incompatíveis.",
      "Revise: ‘Todos os estudantes preferem aulas pela manhã. Em nossa enquete, 12 dos 30 respondentes escolheram a tarde. Portanto, a manhã é o único horário desejado’. Identifique duas generalizações incompatíveis com os dados e escreva um parágrafo coerente sem inventar respostas dos outros 18.",
      "Não sabemos o que os outros 18 escolheram. ‘Todos’ e ‘único’ exigem uma evidência que não foi dada.",
      "Os 12 votos pela tarde contradizem ‘todos preferem a manhã’ e ‘único horário desejado’. Exemplo: ‘Na enquete, 12 dos 30 respondentes escolheram a tarde. O resultado mostra demanda por esse horário, mas o enunciado não informa a preferência dos demais nem representa necessariamente todos os estudantes’. Aceite versões que preservem esses limites.",
      grammar,
    ),
    lesson(
      "em3-pontuacao-sentido",
      "Pontuação: vírgula, explicação e mudança de sentido",
      [
        "Distinguir restrição e explicação em orações adjetivas.",
        "Evitar separar sujeito e verbo por vírgula.",
      ],
      "Pontuação organiza relações sintáticas e sentidos, não apenas pausas de respiração. Na escrita formal, uma vírgula pode alterar o alcance de uma informação. Identifique primeiro quem pratica a ação e quais termos pertencem ao mesmo grupo; depois examine o efeito produzido pela pontuação.",
      [
        {
          title: "Restrição e explicação — exemplo autoral",
          body: "‘Os estudantes que revisaram o texto entregaram a versão final’ seleciona o grupo que revisou, sem afirmar que todos revisaram. ‘Os estudantes, que revisaram o texto, entregaram a versão final’ apresenta a revisão como explicação referente ao conjunto mencionado. O contexto determina a qual conjunto se faz referência.",
        },
        {
          title: "Sujeito não se separa do verbo",
          body: "Em ‘A leitura dos dois relatórios revelou diferenças’, o sujeito completo é ‘A leitura dos dois relatórios’. Não coloque vírgula antes de ‘revelou’ só porque o sujeito ficou longo. Em ‘A leitura, segundo a equipe, revelou diferenças’, as duas vírgulas delimitam uma expressão intercalada.",
        },
        {
          title: "Uma revisão de cada vez",
          body: "Compare ‘Vamos estudar, colegas’ e ‘Vamos estudar colegas’. A vírgula marca o vocativo, isto é, quem está sendo chamado. Ao revisar, explique a função da marca e o sentido pretendido. Não aplique a regra falsa de inserir vírgula sempre antes de ‘que’.",
        },
      ],
      "Como parênteses em uma expressão, sinais de pontuação mostram agrupamentos. Mudar o agrupamento pode mudar a leitura mesmo com as mesmas palavras.",
      "a) Corrija ‘A análise das respostas dos estudantes, mostrou avanços’. b) Compare ‘As aulas que têm exercícios foram revisadas’ e ‘As aulas, que têm exercícios, foram revisadas’. c) Pontue uma chamada aos colegas em ‘Vamos revisar colegas’. Explique cada escolha.",
      "Localize o núcleo do sujeito no item a. No b, pergunte se a oração seleciona algumas aulas ou comenta o conjunto mencionado.",
      "a) Retire a vírgula entre sujeito e verbo. b) Sem vírgulas, selecionam-se as aulas com exercícios; com vírgulas, a característica é apresentada como explicação sobre as aulas mencionadas. c) ‘Vamos revisar, colegas’. A vírgula separa o vocativo. Explicações equivalentes são válidas; a leitura precisa respeitar o contexto.",
      [
        {
          title: "Senado — Vírgula",
          url: "https://www12.senado.leg.br/manualdecomunicacao/estilos/virgula",
        },
      ],
    ),
    lesson(
      "em3-regencia-crase",
      "Regência e crase: verificar as duas condições",
      [
        "Reconhecer a combinação de preposição a e artigo a.",
        "Justificar crase em casos básicos da escrita formal.",
      ],
      "A crase é uma fusão; o acento grave a sinaliza em casos como a preposição a seguida do artigo a. Para decidir, investigue o termo que exige a preposição e o termo seguinte que admite artigo. Não basta a próxima palavra ser feminina. Trabalharemos com casos básicos, sem tentar esgotar todas as expressões especiais.",
      [
        {
          title: "Duas perguntas",
          body: "Em ‘A estudante se referiu à pesquisa’, o verbo pronominal ‘referir-se’ exige preposição a e ‘a pesquisa’ admite artigo. A combinação resulta em à. No plural: ‘referiu-se às pesquisas’. Em ‘leu a pesquisa’, o verbo ler não exige essa preposição: fica apenas o artigo.",
        },
        {
          title: "Teste auxiliar e seus limites",
          body: "Trocar por uma expressão masculina equivalente pode ajudar: ‘referiu-se ao estudo’ corresponde a ‘à pesquisa’. O teste exige manter a mesma construção e não substitui a análise. Em ‘começou a estudar’, o termo seguinte é verbo no infinitivo e não vem com artigo feminino: não há crase.",
        },
        {
          title: "Aplicação na revisão",
          body: "‘Entregou o resumo à professora’ combina entrega a alguém com o artigo de professora. ‘Encontrou a professora’ tem objeto direto, sem preposição a exigida pelo verbo. Compare as relações, não a aparência isolada de ‘a’. O uso formal pode variar em construções não contempladas aqui; consulte a referência quando necessário.",
        },
      ],
      "O sinal marca o encontro de duas peças. Ver só uma palavra feminina é enxergar uma peça e presumir que a outra está presente.",
      "Complete e justifique: a) A turma se referiu __ atividade. b) A turma terminou __ atividade. c) O grupo começou __ revisar. d) A professora entregou orientações __ estudantes da turma, considerando um grupo feminino definido.",
      "Use ‘ao exercício’ como teste no item a e procure um infinitivo no c. No d, confira também o plural.",
      "a) à: referir-se a + a atividade. b) a: artigo, sem preposição exigida por terminar. c) a: antes de infinitivo, sem artigo feminino. d) às: entregar algo a alguém + as estudantes. A justificativa deve mostrar as duas condições, não apenas dizer ‘palavra feminina’.",
      [
        {
          title: "Senado — Crase",
          url: "https://www12.senado.leg.br/manualdecomunicacao/estilos/crase",
        },
      ],
    ),
    lesson(
      "em3-concordancia-nucleo",
      "Concordância: núcleo do sujeito e verbos impessoais",
      [
        "Localizar o núcleo do sujeito antes de flexionar o verbo.",
        "Distinguir haver impessoal e existir na norma formal.",
      ],
      "Na concordância verbal, a palavra mais próxima nem sempre determina a flexão. Comece pelo sujeito e seu núcleo. As escolhas abaixo se referem à escrita formal em situações de prova e revisão; não transformam diferenças de uso em julgamento sobre o valor de quem fala.",
      [
        {
          title: "Não siga apenas a proximidade",
          body: "Em ‘A análise dos gráficos revela diferenças’, o núcleo do sujeito é ‘análise’, no singular. ‘Dos gráficos’ especifica a análise e não determina a flexão. Em ‘Os resultados da análise revelam diferenças’, o núcleo é ‘resultados’, agora plural.",
        },
        {
          title: "Haver e existir",
          body: "Com sentido de existir, haver é impessoal na norma formal: ‘Há duas propostas’ e ‘Havia muitas dúvidas’. Não recebe um sujeito plural nesses casos. Existir tem sujeito e concorda: ‘Existem duas propostas’ e ‘Existiam muitas dúvidas’. Não estenda a impessoalidade a todo verbo de significado parecido.",
        },
        {
          title: "Tempo e revisão",
          body: "Fazer indicando tempo decorrido também fica no singular: ‘Faz dois meses que o projeto começou’. Já em ‘Os grupos fazem revisões’, há sujeito plural e outro sentido do verbo. Identifique o sentido no contexto antes de aplicar a regra. Casos de concordância facultativa exigem estudo específico.",
        },
      ],
      "O núcleo organiza seu grupo como uma referência principal. Uma palavra plural dentro do grupo pode acrescentar informação sem assumir o comando da concordância.",
      "Na norma formal, escolha e explique: a) A revisão dos parágrafos revelou/revelaram problemas. b) Havia/Haviam três versões. c) Existe/Existem três versões. d) Faz/Fazem duas semanas que revisamos. Depois reescreva o item a com ‘As revisões’.",
      "Separe sujeito de complemento. Em b e d, confira se o verbo está no sentido impessoal estudado.",
      "a) revelou, núcleo ‘revisão’. b) Havia, sentido de existir. c) Existem, sujeito ‘três versões’. d) Faz, tempo decorrido. Reescrita: ‘As revisões dos parágrafos revelaram problemas’. Usar o plural em b por causa de ‘versões’ aplica indevidamente a regra de existir a haver.",
      grammar,
    ),
    lesson(
      "em3-discurso-enquadramento",
      "Leitura crítica: enquadramento, vozes e generalizações",
      [
        "Comparar maneiras de apresentar o mesmo dado.",
        "Distinguir evidência, avaliação e voz omitida.",
      ],
      "Um discurso seleciona palavras, informações e pontos de vista. Analisá-lo criticamente não é adivinhar intenções ocultas: é mostrar como escolhas observáveis orientam a leitura. Pergunte quem fala, para quem, em qual contexto, com quais evidências e quais limites. Uma escolha persuasiva não torna automaticamente uma afirmação falsa.",
      [
        {
          title: "Dois títulos — situação autoral",
          body: "Uma enquete fictícia ouviu 100 participantes: 60 apoiaram uma mudança, 25 rejeitaram e 15 não opinaram. ‘Maioria apoia mudança’ e ‘Quatro em dez não declararam apoio’ destacam aspectos distintos dos mesmos dados. O segundo grupo reúne rejeição e ausência de opinião; tratá-lo todo como oposição seria um erro.",
        },
        {
          title: "Palavras avaliativas e vozes",
          body: "‘A medida finalmente resolveu o problema’ inclui avaliação e pressupõe resolução. Para sustentá-la, seriam necessários critérios e resultados, não apenas uma declaração de quem propôs a medida. Um relato pode ouvir organizadores e deixar usuários sem voz. Identificar a ausência é mais preciso que inventar o que os ausentes diriam.",
        },
        {
          title: "Checagem do alcance",
          body: "Se a enquete foi voluntária, ‘60% dos participantes apoiaram’ é mais preciso que ‘60% da cidade apoiou’. Na análise, cite o dado ou a escolha de palavras e explique o efeito. Discordância pessoal não substitui evidência textual; suspeita não é prova de manipulação deliberada.",
        },
      ],
      "Duas fotografias do mesmo lugar podem destacar partes diferentes. Comparar os enquadramentos ajuda a descobrir o que cada imagem permite ver e o que fica de fora.",
      "Uma pesquisa voluntária com 50 usuários de um aplicativo teve 30 avaliações positivas, 10 negativas e 10 sem opinião. Analise ‘Cidade inteira aprova aplicativo revolucionário’. Reescreva com precisão; identifique uma palavra avaliativa e uma voz que seria útil ouvir, sem atribuir fala a ela.",
      "O universo observado não é a cidade. Separe opinião ausente de rejeição e calcule a proporção dos respondentes.",
      "Exemplo: ‘Em pesquisa voluntária, 30 dos 50 usuários respondentes avaliaram o aplicativo positivamente’. São 60% dos respondentes. ‘Cidade inteira’ generaliza e ‘revolucionário’ avalia sem critério fornecido. Ouvir não usuários ou pessoas com dificuldade de acesso ampliaria a investigação; não sabemos o que diriam.",
      grammar,
    ),
  ],
  "em3-humanas-populacao": [
    lesson(
      "em3-russia-asia-central",
      "Rússia e Ásia Central: território, recursos e redes",
      [
        "Distinguir proximidade espacial e integração por redes.",
        "Explicar como infraestrutura e recursos participam da organização territorial.",
      ],
      "A Rússia se estende por partes da Europa e da Ásia. A Ásia Central inclui Cazaquistão, Quirguistão, Tajiquistão, Turcomenistão e Uzbequistão. A proximidade e a história não tornam esses países homogêneos. Estudar uma região exige localizar territórios, redes de transporte, população e recursos, evitando reduzir sociedades inteiras a uma única característica.",
      [
        {
          title: "Distância e conexão",
          body: "Um território extenso pode ter áreas pouco conectadas por estradas ou ferrovias. Distância em linha reta e tempo de transporte não são equivalentes. Infraestrutura, relevo, condições climáticas e fronteiras participam do custo de circular. Um mapa de recursos não basta para mostrar quem tem acesso a eles.",
        },
        {
          title: "Recursos e dependência",
          body: "Exportar um recurso pode gerar receitas e também dependência de preço, compradores e rotas. Países sem litoral oceânico dependem de corredores e acordos para parte de suas trocas. Essa condição não determina sozinha a renda ou o desenvolvimento: decisões políticas, diversificação e relações históricas também importam.",
        },
        {
          title: "Estudo de caso fictício",
          body: "Uma cidade A está a 200 km de um mercado, mas enfrenta uma rota montanhosa de 8 horas. B está a 400 km e usa uma ferrovia de 5 horas. B está mais distante e, nesse trajeto, melhor conectada em tempo. Para comparar custos, ainda faltam tarifas, capacidade, frequência e confiabilidade.",
        },
      ],
      "Estar perto de uma estação não garante um trajeto rápido se a linha não leva ao destino. Redes conectam lugares de formas que a distância isolada não revela.",
      "No caso fictício, explique por que B chega antes apesar de estar mais longe. Indique duas informações que faltam para escolher a rota economicamente mais vantajosa. Por que a presença de uma reserva mineral não prova bem-estar distribuído entre os moradores?",
      "Diferencie distância, tempo, custo e distribuição dos benefícios. Não transforme localização em destino inevitável.",
      "B dispõe de uma conexão ferroviária mais rápida no caso descrito. Faltam, por exemplo, tarifa, capacidade e frequência. Reserva não informa extração, emprego, tributação nem distribuição das receitas; esses dados precisam ser investigados. Não é possível concluir o custo final só pelos tempos fornecidos.",
      atlas,
    ),
    lesson(
      "em3-oriente-medio-agua",
      "Oriente Médio: diversidade, água e interdependência",
      [
        "Evitar equivalências entre região, religião e nacionalidade.",
        "Analisar uso de água por uma bacia compartilhada.",
      ],
      "Oriente Médio é um recorte regional de limites variáveis conforme o critério utilizado. Não é sinônimo de uma religião nem de um único povo. Há diversidade de línguas, nacionalidades, crenças, paisagens e economias. Uma análise geográfica precisa declarar seu recorte e não explicar conflitos ou desigualdades por estereótipos.",
      [
        {
          title: "Ambiente não explica tudo",
          body: "Partes da região apresentam aridez e disponibilidade desigual de água. Isso não significa ausência completa de rios ou uniformidade climática. Uso agrícola, consumo urbano, infraestrutura e cooperação influenciam o acesso. A presença de petróleo em alguns territórios não descreve todas as economias regionais.",
        },
        {
          title: "Montante e jusante",
          body: "Em uma bacia, montante é a direção das nascentes e jusante acompanha o fluxo para a foz. Uma intervenção a montante pode alterar a disponibilidade a jusante. Não basta analisar cada país isoladamente: rios atravessam limites políticos e conectam usos e decisões.",
        },
        {
          title: "Modelo fictício para raciocinar",
          body: "Dois territórios compartilham um rio com vazão didática de 100 unidades no período. Se A retira 30, restam 70 antes de outros usos e perdas. Se B retira 50, restam 20 sob as simplificações. A conta não define uma partilha justa: faltam população, necessidades, qualidade da água e vazão ecológica.",
        },
      ],
      "Uma torneira compartilhada liga decisões de várias pessoas. Saber quanto cada uma retira ajuda, mas não resolve sozinho critérios de necessidade, direito ou preservação.",
      "No modelo, A aumenta a retirada de 30 para 45 e B mantém 50. Quanto resta, ignorando perdas? Por que o saldo positivo não basta para afirmar sustentabilidade? Corrija a frase ‘Todos os habitantes do Oriente Médio têm a mesma religião e vivem do petróleo’.",
      "Calcule o saldo e depois examine o que o modelo não mediu. Uma região não é um indivíduo coletivo.",
      "Restam 100 − 45 − 50 = 5 unidades. Não foram avaliados qualidade, sazonalidade, necessidades dos ecossistemas ou outros usos. A frase generaliza: existem diferentes crenças, povos e economias; petróleo é relevante em alguns contextos e não resume toda a região. Os números são fictícios, não retratam uma bacia real.",
      atlas,
    ),
    lesson(
      "em3-india-moncoes",
      "Índia e Ásia Meridional: monções, população e território",
      [
        "Relacionar sazonalidade das chuvas e organização de atividades.",
        "Interpretar diferenças internas sem generalizações nacionais.",
      ],
      "A Ásia Meridional reúne países com histórias e condições territoriais diversas. A Índia é um deles, não um sinônimo da região. As monções envolvem mudanças sazonais na circulação dos ventos e influenciam a distribuição das chuvas em grande parte dessa área. A intensidade e os efeitos variam no espaço e no tempo.",
      [
        {
          title: "Sazonalidade e planejamento",
          body: "Chuvas concentradas em certos meses influenciam calendário agrícola, armazenamento de água e drenagem urbana. A mesma chuva pode abastecer reservatórios e causar danos onde há exposição e infraestrutura insuficiente. Não conclua que todo o território recebe o mesmo volume nem que toda monção é desastre.",
        },
        {
          title: "Números absolutos e condições de vida",
          body: "Uma grande população não determina por si só renda, escolarização ou acesso a serviços. Médias nacionais podem esconder desigualdades entre regiões e grupos. Ao comparar áreas urbanas e rurais, observe período, definição de cada grupo e indicador. A existência de um polo tecnológico não descreve a experiência de todos os trabalhadores.",
        },
        {
          title: "Dois distritos fictícios",
          body: "O distrito A recebe 800 mm anuais, sendo 600 em quatro meses; B recebe os mesmos 800 mm, distribuídos igualmente ao longo dos doze meses. O total anual é igual, mas A tem maior concentração sazonal. Para planejar reservatórios, também seriam necessários consumo, evaporação, armazenamento e variação entre anos.",
        },
      ],
      "Receber a mesma quantidade de água de uma vez ou em pequenas parcelas muda a necessidade de armazenamento. O total esconde o ritmo de chegada.",
      "No caso fictício, qual percentual da chuva anual de A cai nos quatro meses citados? Por que não basta comparar totais anuais para planejar o abastecimento? Formule uma pergunta de pesquisa sobre desigualdade interna na Índia que não trate toda sua população como igual.",
      "Relacione 600 com 800. Na pergunta, defina grupos, indicador e um período a pesquisar.",
      "600/800 = 75%. A concentração exige examinar armazenamento e demanda ao longo do ano, além de perdas e variabilidade. Exemplo de pergunta: ‘Como varia o acesso à água entre áreas rurais e urbanas em um período definido por fonte oficial?’. Nenhum dado real sobre acesso foi fornecido; não invente a resposta.",
      atlas,
    ),
    lesson(
      "em3-leste-asia-producao",
      "Leste Asiático: Japão, China e redes de produção",
      [
        "Distinguir país, região e conjunto histórico de economias.",
        "Analisar uma cadeia produtiva sem confundir valor e volume.",
      ],
      "Japão e China são países do Leste Asiático com trajetórias diferentes. A expressão histórica ‘Tigres Asiáticos’ costuma agrupar Coreia do Sul, Taiwan, Hong Kong e Singapura por processos de industrialização e inserção comercial; não é o nome de um país ou de um bloco uniforme. O agrupamento reúne economias com situações políticas e institucionais diferentes.",
      [
        {
          title: "Uma cadeia em vários lugares",
          body: "Um produto pode envolver projeto, componentes, montagem e distribuição em diferentes territórios. O país que monta não necessariamente realiza todas as etapas ou retém todo o valor. Redes dependem de portos, energia, tecnologia, trabalho e decisões de empresas e governos.",
        },
        {
          title: "Comparação fictícia",
          body: "Uma cadeia didática atribui 30 unidades de valor ao projeto, 40 aos componentes, 10 à montagem e 20 à distribuição. A soma é 100. A montagem pode concentrar muitas unidades físicas, mas corresponde a 10% do valor deste exemplo. Isso não estima uma cadeia real nem mede salário ou lucro de cada trabalhador.",
        },
        {
          title: "Evitar uma explicação única",
          body: "Dizer que a industrialização decorre apenas de mão de obra barata ignora formação, infraestrutura, políticas industriais e mercados. Uma explicação pode combinar fatores sem afirmar que eles atuaram igualmente em todos os lugares. Compare fontes, períodos e escalas em vez de apresentar uma receita universal.",
        },
      ],
      "Em uma peça teatral, escrever, produzir cenários, atuar e distribuir ingressos são tarefas diferentes. Localizar a apresentação não revela onde todo o trabalho ocorreu.",
      "No modelo fictício, se projeto e componentes ocorrem em A e montagem em B, que percentual do valor corresponde a cada território antes da distribuição? Por que isso não permite afirmar quem tem os maiores salários? Cite dois fatores além do custo do trabalho para investigar a organização da cadeia.",
      "Some 30 e 40. Valor atribuído à etapa não equivale à remuneração individual.",
      "A corresponde a 70% e B a 10% do total; a distribuição representa os outros 20%. Não há dados de salários, emprego, lucros ou impostos. Infraestrutura logística, qualificação, energia, políticas industriais e acesso a mercados são fatores investigáveis. O exemplo não é uma comparação estatística real entre países.",
      atlas,
    ),
    lesson(
      "em3-oceania-polares",
      "Oceania e regiões polares: ilhas, gelo e escala ambiental",
      [
        "Diferenciar Ártico e Antártida.",
        "Relacionar vulnerabilidade ambiental e condições territoriais.",
      ],
      "Oceania abrange territórios continentais e insulares do Pacífico com grande diversidade. Não se resume à Austrália. As regiões polares também não são equivalentes: o Ártico tem um oceano central cercado por terras; a Antártida é um continente cercado pelo oceano. Essas diferenças importam para estudar gelo, ocupação e mudanças ambientais.",
      [
        {
          title: "Gelo sobre água e sobre terra",
          body: "O gelo marinho flutua; mantos de gelo repousam sobre terra. No modelo elementar de flutuação, derreter gelo já flutuante não produz a mesma contribuição direta ao nível do mar que acrescentar água proveniente de gelo continental. A expansão térmica da água também participa da elevação do nível do mar; o processo não depende de um único fator.",
        },
        {
          title: "Ilhas não têm uma única vulnerabilidade",
          body: "Altitude, localização da infraestrutura, exposição a tempestades e capacidade de adaptação variam entre ilhas. Comparar somente a área total de um país pode esconder a concentração de moradias em faixas costeiras baixas. A análise deve considerar pessoas e serviços, sem apresentar populações como passivas ou homogêneas.",
        },
        {
          title: "Cenário didático",
          body: "Duas ilhas fictícias têm área igual. Em A, 70 de 100 moradias ficam em uma faixa costeira baixa; em B, 20 de 100. A tem maior proporção de moradias nessa faixa, mas o dado não calcula perdas futuras. Faltam relevo detalhado, exposição local, proteção e cenário temporal.",
        },
      ],
      "Dois bairros do mesmo tamanho podem ter quantidades muito diferentes de casas junto a um rio. A área, sozinha, não mede a exposição de quem mora ali.",
      "Explique duas diferenças entre Ártico e Antártida. No cenário, compare a proporção de moradias costeiras das ilhas. Por que 70% nessa faixa não significa que 70% das casas serão perdidas? Distinga gelo flutuante de gelo continental na discussão do nível do mar.",
      "Separe exposição e previsão de dano. Não transforme o cenário de moradias em projeção climática.",
      "Ártico: oceano central cercado por terras; Antártida: continente cercado por oceano. As proporções são 70% e 20%. Elas localizam moradias, mas não fornecem altura da água, prazo, proteção ou danos. Gelo continental derretido acrescenta água ao oceano; gelo já flutuante tem outro efeito direto no modelo de flutuação. A expansão térmica também importa.",
      atlas,
    ),
  ],
  "em3-natureza-hereditariedade": [
    lesson(
      "em3-cancer-ciclo",
      "Câncer: alterações genéticas e controle da divisão celular",
      [
        "Relacionar controle celular e multiplicação desregulada.",
        "Distinguir alteração genética e consequência inevitável.",
      ],
      "Células não se dividem sem regulação: sinais e mecanismos de controle participam de seu funcionamento. No estudo do câncer, investigam-se alterações que permitem crescimento desregulado e invasão de tecidos. Esta aula é conceitual e não serve para interpretar exames ou estabelecer diagnóstico individual.",
      [
        {
          title: "Um modelo de controle",
          body: "Podemos representar didaticamente funções que estimulam divisão, limitam crescimento e reparam danos no DNA. Alterações nessas funções podem contribuir para o câncer. A metáfora de acelerador, freio e reparo ajuda a organizar papéis, mas não corresponde a três peças isoladas nem resume toda a biologia celular.",
        },
        {
          title: "Mudança não é destino",
          body: "Encontrar uma alteração em uma célula não permite concluir sozinho que haverá câncer. O efeito depende da alteração, do contexto e de outros processos. Também não se deve equiparar toda multiplicação celular a câncer: crescimento e renovação normais envolvem divisão regulada.",
        },
        {
          title: "Classificação de afirmações",
          body: "Considere dois relatos fictícios: A informa renovação de células de um tecido; B informa falhas de regulação e invasão de tecido vizinho. B descreve propriedades relevantes ao estudo de câncer, mas relatos didáticos não substituem investigação clínica. O objetivo é reconhecer conceitos, não classificar pessoas.",
        },
      ],
      "Um sistema de circulação usa sinais para permitir ou interromper o movimento e manutenção para corrigir falhas. Essa comparação esclarece funções de controle, sem tornar uma célula equivalente a uma rua.",
      "Explique por que ‘Toda divisão celular é câncer’ e ‘Uma alteração de DNA garante câncer’ são conclusões inadequadas. No modelo de acelerador, freio e reparo, que diferença existe entre estimular divisão e perder a limitação da divisão?",
      "Compare funcionamento normal com desregulação. Uma possibilidade de contribuição não equivale a certeza de resultado.",
      "Divisão é parte de processos normais; câncer envolve desregulação e outras propriedades. Uma alteração isolada não garante um resultado. Estímulo excessivo à divisão e perda de limitação são mecanismos distintos que podem favorecer crescimento desregulado; reparo atua sobre danos. A analogia não permite prever risco individual.",
      cancer,
    ),
    lesson(
      "em3-somaticas-germinativas",
      "Alterações somáticas e germinativas: genético não é sempre hereditário",
      [
        "Distinguir linhagem somática e germinativa.",
        "Reconhecer a diferença entre predisposição e certeza.",
      ],
      "Genético se refere ao material genético; hereditário se refere à transmissão entre gerações. As palavras não são sinônimas. Alterações somáticas surgem em células do corpo; alterações na linhagem germinativa podem ser transmitidas por gametas. Essa distinção ajuda a interpretar afirmações sobre câncer sem concluir que todo caso foi herdado.",
      [
        {
          title: "Onde a alteração está",
          body: "No modelo didático, uma mudança restrita a células da pele de um indivíduo não passa automaticamente a seus gametas. Já uma variante presente em um gameta pode integrar o material genético do descendente. A origem e a distribuição celular precisam ser investigadas, não inferidas apenas pelo nome de uma doença.",
        },
        {
          title: "Predisposição não determina resultado",
          body: "Algumas variantes herdadas aumentam predisposição a certos cânceres. Isso não equivale a herdar um tumor nem garante desenvolvimento da doença. Alterações adquiridas também podem participar do processo. Histórico familiar e probabilidade individual exigem avaliação especializada, fora do escopo deste exercício.",
        },
        {
          title: "Dois cenários autorais",
          body: "A: uma alteração aparece só em um grupo de células do fígado. B: uma variante é transmitida por um gameta. A ilustra alteração somática; B ilustra transmissão germinativa. Os enunciados não informam o efeito funcional das variantes: não podemos classificá-las como causadoras de doença apenas pela localização.",
        },
      ],
      "Uma mudança em uma cópia de um documento não altera automaticamente a versão usada para produzir a próxima edição. A comparação ajuda a separar linhagens, mas células e herança são processos biológicos mais complexos.",
      "Classifique A e B e explique por que ‘Todo câncer é hereditário’ não decorre da frase ‘Câncer envolve alterações genéticas’. Se uma variante herdada aumenta predisposição, pode-se concluir que todos os portadores terão doença? Justifique sem calcular risco individual.",
      "Diferencie local da alteração, transmissão e efeito. Um desses dados não fornece automaticamente os outros.",
      "A é somática; B descreve transmissão por gameta. Alterações genéticas podem ser adquiridas, então genético não implica hereditário. Predisposição é aumento de possibilidade, não certeza. Os cenários não permitem diagnosticar nem estimar probabilidades clínicas.",
      cancer,
    ),
    lesson(
      "em3-biotecnologia-processos",
      "Biotecnologia: fermentação e transformação de processos",
      [
        "Reconhecer biotecnologia além da modificação genética.",
        "Interpretar variáveis e controles em um experimento didático.",
      ],
      "Biotecnologia utiliza organismos, células ou componentes biológicos em processos e produtos. Ela inclui práticas anteriores às técnicas modernas de engenharia genética. Estudar o processo exige relacionar organismo, condições, produto e finalidade. Nem todo uso biotecnológico altera diretamente o DNA.",
      [
        {
          title: "Fermentação como exemplo",
          body: "Em certas condições, leveduras transformam açúcares e liberam produtos como etanol e gás carbônico. Na produção de pão, o gás ajuda a expandir a massa. Esse exemplo mostra uma atividade biológica usada com uma finalidade, sem exigir a afirmação de que toda levedura foi geneticamente modificada.",
        },
        {
          title: "Comparação controlada — dados fictícios",
          body: "Um estudo didático compara a formação de gás em recipientes equivalentes: A contém levedura, água e açúcar; B contém levedura e água, sem açúcar adicionado. Se A libera mais gás no mesmo período, isso é compatível com efeito do açúcar nas condições testadas. Temperatura, quantidades e tempo devem ser controlados.",
        },
        {
          title: "O que o resultado não prova",
          body: "Um par de recipientes não demonstra que aumentar açúcar sempre aumenta a produção, em qualquer concentração. Repetições e outras concentrações seriam necessárias. Também não demonstra alteração de DNA. Aqui analisamos um cenário em papel: não é um protocolo para cultivar microrganismos ou ingerir preparações.",
        },
      ],
      "Uma receita depende de ingredientes e condições. Mudar apenas um fator por comparação ajuda a entender qual mudança pode ter influenciado o resultado.",
      "No cenário, identifique a variável modificada, dois fatores mantidos e a função de B. Por que produzir pão com levedura pode ser biotecnologia sem ser transgenia? O resultado autoriza dizer ‘quanto mais açúcar, melhor, sem limite’?",
      "Distingua usar metabolismo de alterar material genético. Uma comparação entre dois pontos não estabelece uma regra universal.",
      "A presença de açúcar adicionado é a variável; tempo e temperatura são controles possíveis, assim como quantidade de levedura. B é referência sem açúcar adicionado. Há uso de um processo biológico, mas não foi descrita inserção de DNA. Não se pode extrapolar para qualquer concentração. Os dados não são de um experimento realizado pelo estudante.",
      genetics,
    ),
    lesson(
      "em3-pcr-copias",
      "PCR: amplificar DNA e interpretar controles",
      [
        "Distinguir amplificação de DNA e sequenciamento.",
        "Aplicar um modelo ideal de duplicação com seus limites.",
      ],
      "PCR é uma técnica de amplificação de um trecho de DNA. Amplificar é aumentar o número de cópias; sequenciar é determinar a ordem das bases. Os iniciadores ajudam a delimitar o alvo. O fato de uma técnica produzir cópias não significa que ela crie um organismo ou informe, sozinha, todo o significado biológico da amostra.",
      [
        {
          title: "Modelo ideal de duplicação",
          body: "Se cada ciclo duplicasse todas as cópias do alvo, partir de uma cópia produziria 2, 4 e 8 após três ciclos. Em geral, N = N₀ × 2ⁿ nesse modelo. A eficiência real não é perfeita nem permanece constante indefinidamente; a expressão serve aqui para raciocinar, não para estimar um laudo.",
        },
        {
          title: "Alvo e controles",
          body: "Um controle negativo, sem DNA-alvo adicionado, ajuda a detectar contaminação. Um controle positivo com alvo conhecido ajuda a verificar se a amplificação pode funcionar. Se o negativo apresentar sinal, as amostras precisam ser reavaliadas: não basta ignorar o controle para preservar uma conclusão.",
        },
        {
          title: "Ler uma tabela fictícia",
          body: "Imagine sinais de amplificação em uma amostra e no controle negativo. O sinal da amostra não pode ser atribuído com segurança apenas à sua origem, porque a contaminação é uma hipótese. O estudo de controles não autoriza diagnóstico pessoal; uma interpretação clínica depende de validação e contexto especializado.",
        },
      ],
      "Fotocopiar uma página aumenta sua quantidade, mas não revela automaticamente o significado de cada frase. Uma folha indevida no processo pode comprometer a interpretação das cópias.",
      "Partindo de 3 cópias e supondo duplicação ideal, quantas haverá após quatro ciclos? Se o controle negativo apresentar amplificação, qual é o problema da frase ‘o sinal da amostra prova sozinho a origem do DNA’? Diferencie PCR de sequenciamento.",
      "Calcule 3 × 2⁴. O controle serve para testar uma explicação alternativa para o sinal.",
      "48 cópias no modelo ideal, sem promessa de eficiência real. Amplificação no negativo levanta hipótese de contaminação e compromete a atribuição do sinal; é preciso reavaliar o ensaio. PCR amplifica um alvo; sequenciamento determina a ordem das bases. Nenhuma conta deste exercício produz interpretação clínica.",
      [
        {
          title: "NHGRI — PCR (em inglês)",
          url: "https://www.genome.gov/genetics-glossary/Polymerase-Chain-Reaction-PCR",
        },
      ],
    ),
    lesson(
      "em3-dna-recombinante",
      "DNA recombinante: vetor, inserto e expressão",
      [
        "Distinguir transportar DNA, copiá-lo e expressá-lo.",
        "Analisar a função de controles em uma aplicação conceitual.",
      ],
      "Uma molécula de DNA recombinante reúne sequências por técnicas de laboratório. Um vetor pode transportar um fragmento, chamado inserto, para uma célula hospedeira. Inserir DNA, obter cópias e produzir uma proteína são resultados diferentes. Nesta aula usamos um esquema conceitual, sem procedimentos experimentais.",
      [
        {
          title: "Funções diferentes no esquema",
          body: "Um plasmídeo pode funcionar como vetor; o inserto é o trecho de interesse; a hospedeira recebe o material. Para produzir uma proteína, não basta o fragmento estar presente: são necessárias condições e sinais de expressão adequados. A técnica pode ser usada em pesquisa e produção de proteínas, mas seu êxito precisa ser verificado.",
        },
        {
          title: "Modelo fictício com comparação",
          body: "Imagine A com vetor sem o inserto e B com vetor contendo o inserto. Ambos recebem condições equivalentes. Se apenas B produz o sinal esperado, o resultado apoia a participação do inserto nessas condições. Ele não demonstra que toda célula recebeu o vetor nem que qualquer proteína será produzida pelo mesmo sistema.",
        },
        {
          title: "Não confundir conceitos",
          body: "PCR amplifica um alvo; DNA recombinante combina sequências; expressão usa informação genética para produzir moléculas como proteínas. Uma aplicação pode articular técnicas, mas os nomes não são intercambiáveis. Avaliar um produto requer evidências específicas de função e segurança, não apenas o rótulo de uma técnica.",
        },
      ],
      "Transportar um arquivo, fazer cópias e executá-lo são ações distintas. A comparação ajuda a separar etapas, embora uma célula não funcione como um computador literal.",
      "Em um esquema, o plasmídeo leva um fragmento à célula, mas a proteína esperada não aparece. Identifique vetor, inserto e hospedeira. Por que não se pode concluir que transportar DNA garante expressão? Qual seria a utilidade de comparar um vetor sem o inserto?",
      "Descreva a função de cada elemento e uma diferença entre presença de DNA e produto observável.",
      "Vetor: plasmídeo; inserto: fragmento; hospedeira: célula receptora. A ausência de proteína pode envolver expressão, funcionamento do sistema ou outras etapas; o enunciado não decide a causa. O vetor sem inserto ajuda a avaliar se o sinal depende do fragmento ou de outro componente. É um modelo, sem instruções de manipulação biológica.",
      [
        {
          title: "NHGRI — DNA recombinante (em inglês)",
          url: "https://www.genome.gov/genetics-glossary/Recombinant-DNA-Technology",
        },
      ],
    ),
  ],
};
