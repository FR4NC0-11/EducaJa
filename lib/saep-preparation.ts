/** Editorial study suggestions based on the guidance supplied by the project owner.
 * They describe practice to attempt, not skills certified by existing lessons.
 */
export const saepPractice: Record<string, { focus: string; steps: string[] }> = {
  "java-poo": {
    focus: "Lógica, camadas e regras de negócio em um projeto recebido",
    steps: [
      "Localize interface, serviço e repositório. Siga uma saída de estoque até o banco; desenhe as dependências e reorganize uma responsabilidade misturada, preservando o comportamento.",
      "Implemente quantidade positiva e saldo suficiente no serviço. Pratique condicionais, funções, repetição, ordenação e filtros com dados fictícios; preserve o saldo quando uma operação falhar.",
      "Separe testes de regra e de persistência. Cubra limites, exceções e relacionamentos; registre preparação, esperado, obtido e resultado em um plano de testes.",
    ],
  },
  "web-fundamentos": {
    focus: "CRUD, usuários e listagens com requisitos verificáveis",
    steps: [
      "Em um projeto recebido com servidor e banco de treino, complete cadastro, consulta, atualização e exclusão. Confira persistência após recarregar; uma tela estática não demonstra CRUD completo.",
      "Preserve filtros ao paginar, use ordem estável e teste busca vazia, última página e falha de rede. Valide tipos, limites e regras também no servidor.",
      "Revise cadastro, login e perfis. O servidor deve validar sessão ou assinatura/expiração de token e autorizar cada operação. Teste acesso sem login e sem permissão, inclusive chamando a rota diretamente. JWT assinado não oculta seu conteúdo; proteja senhas com hash apropriado e não exponha tokens.",
    ],
  },
  postgresql: {
    focus: "Relacionamentos, persistência, estoque e rastreabilidade",
    steps: [
      "Leia os scripts SQL do projeto. Identifique produto, usuário e movimento, suas chaves primárias e estrangeiras; pratique CRUD e consultas parametrizadas em banco de treino.",
      "Implemente entrada/saída como operação consistente: validar quantidade positiva, atualizar saldo e inserir movimento na mesma transação. Proteja contra saídas concorrentes, por exemplo com atualização condicional e conferência de linhas afetadas.",
      "Registre data/hora e usuário autenticado pelo servidor. Teste produto inexistente, saldo exato, saída excessiva, falha no registro do movimento e concorrência; confira saldo e histórico após cada teste. A trilha introduz fundamentos; esta integração precisa de prática adicional em um projeto completo.",
    ],
  },
  "iot-fundamentos": {
    focus: "Leitura de código, validação e registro em sistemas conectados",
    steps: [
      "Separe leitura de sensor, decisão e persistência em um projeto recebido. Use dados simulados locais para praticar sem depender de hardware ou internet.",
      "Trate medidas inválidas e mensagens duplicadas. Registre instante e origem sem expor credenciais; descreva testes para falha e recuperação.",
      "IoT amplia a prática de lógica e rastreabilidade, mas não foi citada como tópico obrigatório nas orientações fornecidas. Priorize as competências solicitadas pelo avaliador.",
    ],
  },
  "ti-git-github": {
    focus: "Versionamento, documentação e organização da entrega",
    steps: [
      "Leia README, dependências, configuração de exemplo e scripts SQL. Execute o projeto inicial, crie branch da base indicada, revise diff e registre commits pequenos.",
      "Prepare plano e evidências reais de testes, scripts e documentação. Faça push e PR somente com rede autorizada e conforme o procedimento de entrega.",
      "Treine também offline com ferramentas, dependências e documentação técnica locais disponibilizadas. Git local continua disponível; GitHub e este site podem não estar acessíveis durante a avaliação.",
    ],
  },
};
