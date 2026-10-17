/** Editorial links describe related concepts, not prerequisites or proof of mastery.
 * Array positions match the ten diagnostic questions in catalog.ts (zero based).
 */
export const diagnosticSkills: Record<string, { concept: string; lessonIds: string[] }[]> = {
  "java-poo": [
    { concept: "Classe, instância e estado independente", lessonIds: ["objetos"] },
    { concept: "Atributos e métodos", lessonIds: ["objetos", "encapsulamento"] },
    { concept: "Inicialização por construtores", lessonIds: ["objetos", "encapsulamento"] },
    { concept: "Encapsulamento e invariantes", lessonIds: ["encapsulamento"] },
    { concept: "Composição e substituição na herança", lessonIds: ["composicao", "polimorfismo"] },
    { concept: "Interfaces e polimorfismo", lessonIds: ["polimorfismo", "composicao"] },
    { concept: "Sobrecarga e sobrescrita", lessonIds: ["polimorfismo"] },
    {
      concept: "Recusa de operações inválidas preservando estado",
      lessonIds: ["encapsulamento", "excecoes", "testes-java"],
    },
    {
      concept: "Igualdade e coleções baseadas em hash",
      lessonIds: ["igualdade", "colecoes-generics"],
    },
    {
      concept: "Separação de responsabilidades e dependências",
      lessonIds: ["composicao", "projeto-java"],
    },
  ],
  "web-fundamentos": [
    {
      concept: "Estrutura, apresentação e comportamento",
      lessonIds: ["semantica", "layout", "interacao"],
    },
    {
      concept: "Semântica e interação nativa por teclado",
      lessonIds: ["semantica", "acessibilidade"],
    },
    { concept: "Box model e espaçamento", lessonIds: ["layout"] },
    { concept: "Layout responsivo", lessonIds: ["layout", "projeto-web"] },
    {
      concept: "Reatribuição e mutabilidade em JavaScript",
      lessonIds: ["interacao", "estado-componentes"],
    },
    { concept: "Eventos e respostas à interação", lessonIds: ["interacao", "dom-eventos"] },
    { concept: "Assincronismo e falhas em requisições", lessonIds: ["api-estados"] },
    {
      concept: "Estados de envio e recuperação de formulário",
      lessonIds: ["formularios", "api-estados", "estado-componentes"],
    },
    { concept: "Limites da validação no navegador", lessonIds: ["formularios", "projeto-web"] },
    { concept: "Verificação de acessibilidade", lessonIds: ["acessibilidade", "projeto-web"] },
  ],
  postgresql: [
    { concept: "Tabela, linha e coluna", lessonIds: ["relacoes"] },
    { concept: "Identificação por chave primária", lessonIds: ["relacoes", "modelagem"] },
    { concept: "Seleção e filtro de registros", lessonIds: ["consultas"] },
    { concept: "Integridade referencial", lessonIds: ["relacoes", "modelagem"] },
    { concept: "Junções e preservação de linhas", lessonIds: ["consultas", "null-joins"] },
    { concept: "Agrupamentos e filtros de agregação", lessonIds: ["agregacoes"] },
    { concept: "Atomicidade de transações", lessonIds: ["transacoes", "concorrencia-reservas"] },
    { concept: "Benefícios e custos de índices", lessonIds: ["indices-explain"] },
    { concept: "SQL injection e parâmetros", lessonIds: ["parametros-permissoes"] },
    {
      concept: "Concorrência na reserva de recursos",
      lessonIds: ["concorrencia-reservas", "transacoes"],
    },
  ],
  "iot-fundamentos": [
    { concept: "Objeto conectado e finalidade", lessonIds: ["objetos-conectados"] },
    { concept: "Sensor e atuador", lessonIds: ["objetos-conectados", "packet-tracer-casa"] },
    {
      concept: "Escolha da grandeza medida",
      lessonIds: ["objetos-conectados", "packet-tracer-condicoes"],
    },
    {
      concept: "Papel do controlador",
      lessonIds: ["objetos-conectados", "packet-tracer-condicoes"],
    },
    {
      concept: "Operação local e perda de conexão",
      lessonIds: ["caminho-dos-dados", "redes-ip", "packet-tracer-rede", "projeto-iot"],
    },
    {
      concept: "Caminho da medição até a interface",
      lessonIds: ["caminho-dos-dados", "redes-ip", "packet-tracer-rede", "mqtt-telemetria"],
    },
    {
      concept: "Publicação, assinatura e broker MQTT",
      lessonIds: ["mensagens-e-cuidados", "mqtt-telemetria"],
    },
    {
      concept: "Unidades e interpretação da telemetria",
      lessonIds: ["caminho-dos-dados", "mqtt-telemetria"],
    },
    {
      concept: "Autorização e proteção de comandos",
      lessonIds: ["mensagens-e-cuidados", "packet-tracer-casa", "projeto-iot"],
    },
    {
      concept: "Validação de leituras e comportamento seguro",
      lessonIds: ["mensagens-e-cuidados", "packet-tracer-condicoes", "projeto-iot"],
    },
  ],
};
