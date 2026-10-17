import type { Lesson, Topic } from "./catalog";

const githubSource =
  "https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/creating-a-pull-request";
const lesson = (item: Lesson): Lesson => ({ level: "Fundamentos", ...item });

export const tiTopic: Topic = {
  id: "ti-git-github",
  category: "T.I.",
  title: "T.I.: projetos, Git e GitHub",
  shortTitle: "T.I. e versionamento",
  symbol: "git",
  color: "orange",
  description: "Receba um projeto, entenda sua estrutura e entregue alterações com Git e GitHub.",
  introduction:
    "Tecnologia da Informação envolve sistemas, dados, infraestrutura e pessoas. Esta primeira unidade de T.I. trabalha a organização de projetos e o versionamento, com foco em preparação prática para o SAEP. Os exemplos usam um sistema de estoque fictício, sem dados reais.",
  goalExamples: [
    "Quero aprender Git e GitHub do zero.",
    "Quero praticar uma entrega do SAEP.",
    "Quero entender um projeto recebido.",
  ],
  glossary: [
    { term: "Repositório", meaning: "Projeto acompanhado de seu histórico de versões." },
    { term: "Commit", meaning: "Registro local de uma versão preparada no Git." },
    { term: "Branch", meaning: "Linha de desenvolvimento identificada por um nome." },
    {
      term: "Pull request",
      meaning: "Proposta de integração entre branches no GitHub, com comparação e revisão.",
    },
  ],
  questions: [
    "Você recebeu um projeto desconhecido. O que verificaria antes de alterar o código?",
    "Qual a diferença entre Git e GitHub? Quais operações funcionam sem internet?",
    "Como clonar um repositório e conferir em qual pasta e branch você está?",
    "Explique a diferença entre arquivo alterado, staging e commit.",
    "Como revisar e registrar apenas a alteração de README.md sem incluir um arquivo .env?",
    "Para que criar uma branch antes de implementar uma funcionalidade?",
    "Qual a diferença entre fetch, pull e push? O que fazer se um push for rejeitado?",
    "Como resolver um conflito sem simplesmente apagar a alteração da outra pessoa?",
    "Em um pull request, o que representam base e compare e o que deve constar na descrição?",
    "Como testar, documentar e organizar a entrega de uma saída de estoque com saldo insuficiente?",
  ],
  lessons: [
    lesson({
      id: "ti-projeto",
      title: "T.I.: leia o projeto antes de programar",
      minutes: 14,
      explanation:
        "Antes de mudar um sistema recebido, descubra como ele funciona. Leia README, dependências e scripts, identifique a linguagem e execute a versão inicial no ambiente autorizado. Registre o comportamento observado: isso ajuda a distinguir um problema antigo de uma regressão causada por você.",
      analogy:
        "É como assumir uma oficina: primeiro você conhece as ferramentas e as ordens de serviço; depois começa o reparo.",
      objectives: [
        "Reconhecer responsabilidades e dependências",
        "Preparar uma referência inicial para testes",
      ],
      sections: [
        {
          title: "Siga uma operação de ponta a ponta",
          body: "No estoque, localize a tela ou rota de saída, a regra que confere o saldo e a função que grava no banco. Apresente a responsabilidade de cada parte. Separar apresentação, serviço de negócio e repositório de dados facilita alterações e testes; os nomes das pastas podem variar.",
        },
        {
          title: "Prepare a prática sem internet",
          body: "Use apenas ferramentas, dependências e documentação técnica disponibilizadas no ambiente. Confira previamente com o responsável o procedimento de execução, os scripts SQL e as configurações de exemplo. Um site de aulas aberto agora não garante acesso durante a avaliação. Não copie credenciais nem dados de produção.",
        },
      ],
      code: "projeto/\n  README.md           # executar e testar\n  src/interface/      # entrada e apresentação\n  src/servicos/       # regras de negócio\n  src/repositorios/   # acesso a dados\n  banco/              # scripts SQL\n  testes/             # casos e evidências\n  .env.example        # nomes de variáveis, sem segredos",
      exercise:
        "Em um projeto de treino já existente, desenhe o caminho de uma consulta ao estoque. Anote três comandos de execução encontrados no README e uma dúvida que precisa esclarecer. Não invente comandos se a documentação não os indicar.",
      hint: "Procure o ponto de entrada e siga uma chamada até o banco. Compare o que a documentação promete com o que você observou.",
      resources: [{ title: "Git: documentação para consulta", url: "https://git-scm.com/docs" }],
    }),
    lesson({
      id: "ti-clone",
      title: "Git, GitHub e sua primeira cópia do projeto",
      minutes: 14,
      explanation:
        "Git registra versões no seu computador. GitHub hospeda repositórios e permite colaboração pela web. Clone cria uma cópia local com histórico; baixar um ZIP não traz o histórico .git. Uma URL HTTPS remota exige rede e, em repositórios privados, permissão de acesso. Clone antes da etapa sem internet, se essa for a orientação recebida.",
      analogy:
        "Git é seu caderno de versões; GitHub é um local compartilhado onde a equipe publica e revisa esse caderno.",
      code: "# Troque a URL pela fornecida no exercício; não execute este marcador.\ngit clone <URL-DO-REPOSITORIO> estoque-treino\ncd estoque-treino\npwd\ngit status\ngit remote -v\ngit log --oneline -5",
      terminal: [
        { command: "pwd", output: "/c/estudos/estoque-treino" },
        { command: "git status", output: "On branch main\nnothing to commit, working tree clean" },
        {
          command: "git log --oneline -2",
          output: "a1b2c3d Projeto inicial\n98abc12 Documenta execução",
        },
      ],
      sections: [
        {
          title: "Leia a página do repositório",
          body: "Na aba Code do GitHub, observe a branch selecionada, a lista de arquivos e o README. O menu de branches troca a versão exibida no site; ele não troca automaticamente a branch da sua pasta local. Confira sempre com git status.",
        },
      ],
      images: [
        {
          src: "/lessons/git/branch-dropdown.png",
          alt: "Captura real da documentação do GitHub com o menu de branches na página de um repositório.",
          caption:
            "Menu de branches na aba Code. Captura oficial do GitHub Docs; o visual pode mudar.",
          source: githubSource,
        },
      ],
      exercise:
        "Diga quais comandos acima consultam apenas a cópia local. Explique por que um projeto baixado como ZIP pode falhar ao executar git status. Em uma cópia de treino, identifique README e pasta de testes.",
      hint: "Status e log consultam dados locais. Clone HTTPS precisa alcançar o servidor; remote -v apenas mostra endereços configurados.",
      resources: [{ title: "Git clone", url: "https://git-scm.com/docs/git-clone" }],
    }),
    lesson({
      id: "ti-staging",
      title: "Mudanças, staging e proteção de arquivos",
      minutes: 16,
      explanation:
        "O diretório de trabalho contém seus arquivos atuais. A área de preparação (staging ou index) guarda o conteúdo escolhido para o próximo commit. Git add prepara a versão do arquivo naquele instante: se você editar depois, será preciso revisar e preparar novamente. Use caminhos específicos para não incluir arquivos indevidos.",
      analogy:
        "Editar é preparar materiais; staging é colocar os escolhidos em uma caixa; commit é lacrar essa caixa com uma identificação.",
      code: "git status --short\ngit diff -- README.md\ngit add README.md\ngit diff --cached\n# Retirar da preparação sem apagar o arquivo (em repo com commit):\ngit restore --staged README.md",
      terminal: [
        { command: "git status --short", output: " M README.md\n?? .env" },
        { command: "git add README.md", output: "" },
        { command: "git status --short", output: "M  README.md\n?? .env" },
        {
          command: "git diff --cached",
          output: "diff --git a/README.md b/README.md\n+Como executar os testes locais",
        },
      ],
      sections: [
        {
          title: "Segredos não pertencem ao histórico",
          body: "Inclua .env e dependências locais no .gitignore antes de prepará-los. .gitignore não deixa de rastrear arquivos já versionados e não apaga segredos do histórico. Se uma credencial real vazou, interrompa sua divulgação e siga a resposta a incidentes do responsável, incluindo revogação; apagar a linha em um commit novo não basta.",
        },
      ],
      exercise:
        "Você alterou README.md e .env. Mostre como preparar só o README, conferir exatamente o conteúdo preparado e retirá-lo do staging mantendo sua edição. Explique os dois espaços em ' M' e 'M '.",
      hint: "No status curto, a primeira coluna indica o index e a segunda, o diretório de trabalho. Não use restore sem --staged neste exercício: ele pode descartar edições locais.",
      resources: [
        { title: "Git add", url: "https://git-scm.com/docs/git-add" },
        { title: "Git ignore", url: "https://git-scm.com/docs/gitignore" },
      ],
    }),
    lesson({
      id: "ti-commit",
      title: "Commits que explicam uma mudança",
      minutes: 13,
      explanation:
        "Commit registra localmente o conteúdo preparado, com autor e mensagem. Ele não envia arquivos ao GitHub e não comprova que o programa funciona. Antes de registrar, leia o diff, execute os testes adequados indicados pelo projeto e mantenha a mudança com um propósito claro.",
      analogy:
        "Uma entrada bem escrita no diário de manutenção informa qual problema foi corrigido e permite investigar depois.",
      code: 'git diff --cached\ngit commit -m "docs: explica execução dos testes de estoque"\ngit log --oneline -3\ngit show --stat HEAD\ngit status',
      terminal: [
        {
          command: 'git commit -m "docs: explica execução dos testes de estoque"',
          output:
            "[estudo/estoque d4e5f6a] docs: explica execução dos testes de estoque\n 1 file changed, 1 insertion(+)",
        },
        {
          command: "git status",
          output: "On branch estudo/estoque\nnothing to commit, working tree clean",
        },
      ],
      sections: [
        {
          title: "Se o commit não funcionar",
          body: "Nothing to commit pode significar que nada foi preparado ou alterado; consulte status. Se Git pedir identidade, configure nome e e-mail apropriados no repositório de treino conforme as orientações locais; identidade de commit não autentica sua conta no GitHub. Não exponha um e-mail que queira manter privado.",
        },
      ],
      exercise:
        "Compare as mensagens 'atualiza coisas' e 'fix: impede saída acima do saldo'. Escreva uma mensagem para uma correção e explique qual teste executaria antes do commit. Diga se esse commit já apareceu no GitHub.",
      hint: "A mensagem deve explicar o propósito; o envio só ocorre em outro passo, com push.",
      resources: [{ title: "Git commit", url: "https://git-scm.com/docs/git-commit" }],
    }),
    lesson({
      id: "ti-branches",
      title: "Branches para trabalhar sem misturar tarefas",
      minutes: 14,
      explanation:
        "Uma branch nomeia uma linha de desenvolvimento. Crie uma branch a partir da base indicada no exercício e faça nela a mudança. Branch não é uma cópia de banco, nem outro ambiente instalado: arquivos não rastreados e alterações sem commit podem continuar presentes ao trocar de branch. Confira status primeiro.",
      analogy:
        "É um rascunho separado de uma revisão: você compara a proposta com a versão de referência antes de integrar.",
      code: "git status\n# Com a base correta já selecionada e o trabalho limpo:\ngit switch -c estudo/estoque\ngit branch --show-current\ngit log --oneline -3",
      terminal: [
        {
          command: "git switch -c estudo/estoque",
          output: "Switched to a new branch 'estudo/estoque'",
        },
        { command: "git branch --show-current", output: "estudo/estoque" },
      ],
      sections: [
        {
          title: "Proteja trabalho em andamento",
          body: "Se houver alterações pendentes, revise-as e registre as que pertencem à tarefa antes de trocar de contexto. Se Git bloquear a troca por risco de sobrescrita, entenda o motivo. Não use opções de força nem apague arquivos para simplesmente remover a mensagem de erro.",
        },
      ],
      exercise:
        "Você recebeu uma correção de busca e uma melhoria de cadastro independentes. Proponha nomes de branches e diga como evitar que alterações das duas apareçam no mesmo PR. Explique por que precisa conferir a base.",
      hint: "Uma branch criada de outra que tem mudanças pendentes de revisão pode levar essas mudanças junto.",
      resources: [{ title: "Git switch", url: "https://git-scm.com/docs/git-switch" }],
    }),
    lesson({
      id: "ti-remotos",
      title: "Fetch, pull e push sem confusão",
      minutes: 16,
      explanation:
        "Fetch busca objetos e atualiza referências remotas, como origin/main, sem integrar a sua branch atual. Pull busca e integra conforme opções e configuração. Push envia commits e atualiza referências no remoto. Esses comandos precisam alcançar o remoto; para GitHub pela internet, não funcionam na etapa desconectada.",
      analogy:
        "Fetch traz as novidades para consulta; pull tenta incorporá-las ao seu trabalho; push publica sua contribuição.",
      code: "# Só com rede autorizada, remoto correto e trabalho limpo:\ngit remote -v\ngit fetch origin\ngit log --oneline HEAD..origin/main\n# Atualização da main local, se a orientação permitir:\ngit switch main\ngit pull --ff-only origin main\n# Retorne à sua branch antes de continuar:\ngit switch estudo/estoque\ngit push -u origin estudo/estoque",
      terminal: [
        {
          command: "git fetch origin",
          output: "From <remoto-de-treino>\n   a1b2c3d..b2c3d4e  main -> origin/main",
        },
        {
          command: "git log --oneline HEAD..origin/main",
          output: "b2c3d4e Documenta nova regra de saída",
        },
      ],
      sections: [
        {
          title: "Push rejeitado não pede força",
          body: "Pare, confira branch e remoto, busque as mudanças e examine o histórico. Um non-fast-forward pode indicar commits de outra pessoa na mesma branch. Combine a integração e resolva divergências de acordo com o fluxo adotado. Não use force push como solução automática. Pull --ff-only recusa histórias divergentes, permitindo investigar antes de integrar.",
        },
      ],
      exercise:
        "Explique o que continua disponível offline: ler histórico, editar, testar com recursos locais e criar commits. O push foi rejeitado: descreva três verificações antes de tentar novamente. Não confunda atualizar main com atualizar automaticamente sua branch de estudo.",
      hint: "Busca e integração são passos diferentes. Atualizar main não move a ponta da sua branch de funcionalidade.",
      resources: [
        { title: "Git fetch", url: "https://git-scm.com/docs/git-fetch" },
        { title: "Git pull", url: "https://git-scm.com/docs/git-pull" },
        { title: "Git push", url: "https://git-scm.com/docs/git-push" },
      ],
    }),
    lesson({
      id: "ti-conflitos",
      title: "Conflitos: interpretar, integrar e testar",
      minutes: 18,
      explanation:
        "Conflito ocorre quando Git não consegue conciliar certas alterações automaticamente. A escolha precisa respeitar o requisito do sistema, não apenas fazer os marcadores sumirem. Em uma cópia de treino limpa, integre a base indicada à branch de trabalho. Se houver conflito, leia os dois lados e a versão final pretendida.",
      analogy:
        "Dois revisores alteraram a mesma frase. A decisão exige entender a mensagem que ela precisa transmitir.",
      code: "# Exemplo de trecho em conflito, não é comando:\n<<<<<<< HEAD\nQuantidade deve ser positiva.\n=======\nQuantidade não pode ultrapassar o saldo.\n>>>>>>> main\n\n# Versão conciliada para o requisito do exercício:\nQuantidade deve ser positiva e não pode ultrapassar o saldo.",
      terminal: [
        {
          command: "git merge main",
          output:
            "CONFLICT (content): Merge conflict in README.md\nAutomatic merge failed; fix conflicts and then commit the result.",
        },
        { command: "git status --short", output: "UU README.md" },
        {
          command: "git add README.md",
          output:
            "Após editar o arquivo e conferir a versão conciliada, ele está preparado. Execute os testes e conclua o merge com git commit.",
        },
      ],
      sections: [
        {
          title: "Procedimento em uma cópia de treino",
          body: "Confirme que main contém a base desejada. Na sua branch limpa, git merge main tenta integrá-la. Abra o arquivo indicado, remova os marcadores e escreva a versão correta preservando as regras necessárias. Confira diff, prepare os arquivos resolvidos, execute os testes e conclua com git commit. Enquanto um merge estiver em andamento, git merge --abort tenta retornar ao estado anterior; iniciar limpo evita dificuldade de restaurar alterações prévias.",
        },
      ],
      exercise:
        "No conflito do exemplo, explique por que aceitar só um dos lados enfraquece a regra. Liste testes para zero, valor negativo, saldo exato e quantidade maior que o saldo.",
      hint: "Eliminar marcadores não garante que a regra foi mantida. A evidência está no comportamento testado.",
      resources: [{ title: "Git merge e conflitos", url: "https://git-scm.com/docs/git-merge" }],
    }),
    lesson({
      id: "ti-pull-request",
      title: "GitHub: proponha e revise um pull request",
      minutes: 17,
      explanation:
        "Após enviar sua branch, um pull request (PR) propõe integrá-la à base. Base é o destino; compare é a branch com sua proposta. Abrir PR não faz merge nem garante aprovação. Na revisão, confira arquivos alterados, testes e comentários. Novos commits enviados à mesma branch atualizam o PR aberto.",
      analogy:
        "O PR é um pedido de revisão com a diferença entre duas versões e uma justificativa para a mudança.",
      code: "Título: Impede saída acima do saldo\nProblema: era possível gerar saldo negativo.\nMudança: valida quantidade no serviço antes de persistir.\nTestes: saldo 5 / saída 6 → rejeita, saldo continua 5.\nTestes: saldo 5 / saída 5 → aceita, saldo final 0.\nLimitações: descreva o que não foi testado.\nEntrega: scripts e instruções de execução atualizados.",
      images: [
        {
          src: "/lessons/git/compare-pull-request.png",
          alt: "Captura real da documentação do GitHub mostrando o botão Compare & pull request acima dos arquivos.",
          caption:
            "Entrada para propor um PR após publicar uma branch. GitHub Docs, captura oficial; confira base e compare na tela seguinte.",
          source: githubSource,
        },
      ],
      sections: [
        {
          title: "Uma revisão verificável",
          body: "Em Files changed, procure alterações fora da tarefa, credenciais e arquivos gerados. Em Conversation, leia a descrição e as verificações; CI verde ajuda, mas não substitui conferir os requisitos. Não integre sem a autorização prevista no exercício. Se precisar corrigir o mesmo PR, faça outro commit na branch dele e envie com push quando houver rede autorizada.",
        },
        {
          title: "Entrega sem rede",
          body: "Prepare localmente commits, README, scripts e resultados de testes. Push e PR só devem ser feitos quando o ambiente e as orientações de entrega permitirem. Se o avaliador solicitar outra forma de entrega, siga aquela instrução; não dependa de abrir o GitHub durante o desenvolvimento desconectado.",
        },
      ],
      exercise:
        "Escreva a descrição de um PR para uma busca com filtros e paginação. Indique base e compare, um teste de resultado vazio e outro que confirme que o filtro continua ativo ao trocar de página.",
      hint: "Descreva o comportamento observado e esperado, não apenas os nomes dos arquivos.",
      resources: [{ title: "GitHub: criar um pull request", url: githubSource }],
    }),
    lesson({
      id: "ti-entrega",
      title: "Oficina SAEP: evolua e entregue um projeto existente",
      minutes: 30,
      explanation:
        "Use um projeto de treino recebido, não comece do zero. O desafio é corrigir uma saída de estoque e entregar evidências. As orientações fornecidas servem como norte de estudo e podem mudar; esta oficina não reproduz uma prova oficial nem garante seus tópicos. Reserve tempo para leitura, implementação, testes e entrega.",
      analogy:
        "Uma manutenção só está concluída quando outra pessoa consegue conferir o reparo e repetir a verificação.",
      code: "Caso | Preparação | Ação | Esperado | Obtido | Resultado\nT01 | saldo 5 | saída 6 | recusa; saldo 5; sem movimento | preencher | preencher\nT02 | saldo 5 | saída 5 | saldo 0; um movimento | preencher | preencher\nT03 | sem login | registrar saída | acesso negado; sem alteração | preencher | preencher\nT04 | perfil sem permissão | registrar saída | acesso negado; sem alteração | preencher | preencher\nT05 | saldo 5 | saída 0 ou -1 | recusa; saldo 5 | preencher | preencher",
      sections: [
        {
          title: "Leia e implemente",
          body: "Reproduza a falha inicial, localize interface, serviço e acesso a dados. Valide quantidade positiva e saldo disponível no servidor. Confira produto existente, usuário autenticado e permissão. Use transação para atualizar saldo e inserir movimento juntos; proteja contra duas saídas simultâneas, por exemplo com atualização condicional e verificação de linhas afetadas. Registre data/hora e usuário da sessão validada, não um identificador livre enviado pelo cliente.",
        },
        {
          title: "Conecte as competências",
          body: "Confira PK/FK entre produto, usuário e movimento; use consultas parametrizadas, não concatenação de entradas. Para autenticação, reutilize o mecanismo do projeto, valide a sessão ou assinatura/expiração do token e autorize cada operação no servidor. JWT assinado não é criptografia. Senhas exigem hash apropriado; nunca registre senhas ou tokens em logs. Em listagens, mantenha filtro, ordem estável e tamanho de página limitado.",
        },
        {
          title: "Teste e documente de verdade",
          body: "Planeje casos válidos, inválidos, acesso negado, relacionamento inexistente e concorrência. Para cada um, guarde preparação, esperado, obtido e resultado real; se não executou, escreva não executado. Teste também cadastro, consulta, atualização e exclusão de acordo com as regras. Descreva no README como executar localmente, aplicar scripts no banco de treino e repetir os testes. Faça commits e confira os arquivos exigidos antes da entrega.",
        },
      ],
      lab: {
        tool: "Projeto de treino e documentação local",
        setup:
          "Trabalhe em cópia isolada, sem dados reais. Use o ambiente e as dependências disponibilizados; combine um limite de tempo com seu professor.",
        steps: [
          "Leia o requisito e execute a versão recebida; registre uma falha reproduzível.",
          "Implemente a menor correção nas camadas corretas e revise o diff.",
          "Execute o plano de testes e registre os resultados, incluindo falhas e pendências.",
          "Revise README, scripts, configuração de exemplo e histórico; entregue pelo procedimento autorizado.",
        ],
        expected:
          "Outra pessoa consegue executar o projeto e repetir os casos. Saída inválida não muda saldo nem cria movimento; saída válida registra saldo e movimento de forma consistente.",
        troubleshooting:
          "Se não conseguir executar o ambiente, registre o bloqueio e os passos tentados. Não marque testes como aprovados por leitura do código.",
      },
      exercise:
        "Preencha o plano com resultados obtidos no seu projeto de treino. Acrescente casos para duas saídas concorrentes e para usuário sem permissão. Explique a mudança por camada, mostre o diff e liste os arquivos da entrega. Faça uma segunda rodada offline com a documentação local permitida.",
      hint: "Não basta a tela mostrar erro: confira no banco de treino que saldo e movimentos continuam consistentes. Não execute os exemplos em produção.",
      resources: [
        { title: "Git diff para revisar a entrega", url: "https://git-scm.com/docs/git-diff" },
      ],
    }),
  ],
};
