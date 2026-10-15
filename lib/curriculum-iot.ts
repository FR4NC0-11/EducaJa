import type { Lesson } from "./catalog";
const resources = [
  {
    title: "Cisco — dispositivos e automação IoT",
    url: "https://tutorials.ptnetacad.net/help/default/iot_using_things.htm",
  },
  {
    title: "Cisco — acesso ao Packet Tracer",
    url: "https://skillsforall.com/resources/lab-downloads",
  },
];
export const iotLessons: Lesson[] = [
  {
    id: "redes-ip",
    title: "IP, DHCP e gateway antes da automação",
    minutes: 25,
    level: "Intermediário",
    resources,
    objectives: [
      "Separar conexão Wi-Fi e configuração IP",
      "Explicar gateway e resolução de nomes",
    ],
    explanation:
      "Conectar ao Wi-Fi não garante endereço válido nem acesso a um serviço. DHCP pode fornecer IP, máscara e gateway. DNS traduz nomes. Um teste por IP ajuda a separar falha de nome de falha de caminho.",
    analogy: "Entrar num prédio não basta: você precisa do número da sala e do caminho até ela.",
    sections: [
      {
        title: "Comece pequeno",
        body: "Use dois computadores na mesma rede local e registre seus endereços e máscaras. Gateway é necessário para destinos fora da rede local; ele não corrige um registro IoT feito no serviço errado.",
      },
      {
        title: "Teste uma camada por vez",
        body: "Confira interface, associação sem fio, endereço, alcance do IP e então o serviço. Ping bem-sucedido verifica parte do caminho, mas não comprova que uma página HTTP ou regra de automação funciona.",
      },
    ],
    code: "Rede didática: 192.168.10.0/24\nGateway: 192.168.10.1\nPC: 192.168.10.10\nServidor: 192.168.10.20\nMáscara: 255.255.255.0",
    exercise:
      "Um PC alcança o servidor pelo IP, mas não pelo nome. O que investigar antes de trocar o sensor?",
    hint: "Separe DNS, conectividade e serviço.",
    lab: {
      tool: "Planejamento de rede / Packet Tracer opcional",
      setup:
        "A leitura não exige instalação. A prática externa exige Packet Tracer e acesso conforme as condições da Cisco.",
      steps: [
        "Desenhe a rede local.",
        "Atribua endereços distintos na mesma sub-rede.",
        "Teste o IP do destino.",
        "Explique a configuração para um destino em outra rede.",
      ],
      expected: "Você distingue endereço, máscara, gateway e nome.",
      troubleshooting:
        "Confira cabos, interfaces e IPs compatíveis antes de alterar o serviço IoT.",
    },
  },
  {
    id: "packet-tracer-rede",
    title: "Packet Tracer: primeira rede e pacotes",
    minutes: 40,
    level: "Intermediário",
    resources,
    objectives: ["Montar uma topologia mínima", "Investigar eventos no modo Simulation"],
    explanation:
      "Cisco Packet Tracer simula dispositivos e protocolos. Valide uma rede pequena antes de acrescentar objetos IoT. Um resultado na simulação não comprova compatibilidade nem comportamento de um equipamento físico.",
    analogy: "Uma maquete permite observar o trajeto antes de construir a instalação.",
    sections: [
      {
        title: "Faça o mínimo funcionar",
        body: "Adicione dois PCs e um switch na área lógica. Use conexões Ethernet compatíveis, IPs distintos e a mesma máscara. Aguarde interfaces operacionais e teste comunicação entre os PCs.",
      },
      {
        title: "Observe eventos, não só cores",
        body: "No modo Simulation, filtre protocolos relevantes e avance os eventos. A descoberta inicial de endereços pode ocorrer antes do primeiro sucesso. Compare o caso funcional com um destino de endereço incompatível e registre a única mudança.",
      },
    ],
    code: "PC-A: 192.168.10.10 / 255.255.255.0\nPC-B: 192.168.10.11 / 255.255.255.0\nPC-A → switch → PC-B\nTerminal do PC-A: ping 192.168.10.11",
    exercise:
      "Salve uma versão funcional e outra com IP incorreto. Registre sintoma, hipótese e correção.",
    hint: "Mude uma variável por vez para tornar o diagnóstico reproduzível.",
    lab: {
      tool: "Cisco Packet Tracer instalado",
      setup:
        "Abra um projeto vazio. Menus podem variar por versão e idioma; consulte a ajuda oficial.",
      steps: [
        "Adicione dois PCs e um switch com conexões Ethernet.",
        "Em Desktop > IP Configuration, configure os endereços do exemplo.",
        "Execute ping e repita após a descoberta inicial.",
        "Abra Simulation, examine eventos e salve seu arquivo .pkt.",
      ],
      expected: "Os PCs se comunicam e você relaciona os eventos à topologia.",
      troubleshooting:
        "Confira interfaces, cabos, IPs sem duplicidade e máscara antes de outros serviços.",
    },
  },
  {
    id: "packet-tracer-casa",
    title: "Packet Tracer: casa conectada e registro IoT",
    minutes: 45,
    level: "Intermediário",
    resources,
    objectives: [
      "Distinguir Smart Thing de componente de placa",
      "Registrar um dispositivo no Home Gateway",
    ],
    explanation:
      "Smart Things podem conectar-se à rede e ao serviço de registro. Componentes simples podem depender de uma placa MCU ou SBC e não ter interface de rede. Escolha dispositivos com as capacidades necessárias ao laboratório.",
    analogy: "Alguns aparelhos conversam pela rede; outros precisam de um intermediário.",
    sections: [
      {
        title: "Conexão e registro são distintos",
        body: "Adicione Home Gateway, PC e Smart Thing de interface compatível. Confira a conexão e depois selecione Home Gateway como destino IoT na configuração do dispositivo. Ter IP não significa estar registrado.",
      },
      {
        title: "Confirme no painel",
        body: "Abra o navegador do PC simulado no IP do gateway. Consulte a ajuda da versão para o acesso ao ambiente e verifique a presença do dispositivo. O registro do Home Gateway não deve ser tratado como equivalente a um broker MQTT real.",
      },
    ],
    code: "PC → rede local → Home Gateway\nSmart Thing → conexão + registro IoT → Home Gateway\nPainel Home → estado dos dispositivos registrados",
    exercise:
      "Um aparelho tem IP e não aparece no painel. Qual configuração separada do IP precisa ser conferida?",
    hint: "Confira destino do registro e se escolheu Smart Thing ou componente sem rede.",
    lab: {
      tool: "Cisco Packet Tracer — Home Gateway",
      setup:
        "Escolha uma Smart Thing de controle remoto em End Devices e confira Specifications e interfaces disponíveis.",
      steps: [
        "Adicione Home Gateway, PC e lâmpada inteligente compatível.",
        "Configure a conexão local e confira o IP do PC.",
        "Selecione Home Gateway como servidor IoT da lâmpada.",
        "No navegador do PC simulado, abra o IP do gateway e observe a página Home.",
      ],
      expected: "A lâmpada registrada aparece e permite as operações suportadas pelo modelo.",
      troubleshooting:
        "Se não aparece, revise registro, alcance e interface; não substitua por um componente sem rede.",
    },
  },
  {
    id: "packet-tracer-condicoes",
    title: "Packet Tracer: condições, ações e falhas",
    minutes: 45,
    level: "Avançado",
    demo: "iot",
    resources,
    objectives: ["Construir uma regra sensor–atuador", "Distinguir ação manual de automação"],
    explanation:
      "Uma regra relaciona condição medida e ação. No serviço IoT do Packet Tracer, a página Conditions configura regras dos aparelhos registrados. Demonstre controle manual antes de investigar a automação.",
    analogy: "O interruptor manual responde à mão; uma regra de presença decide quando acender.",
    sections: [
      {
        title: "Escreva os casos antes de clicar",
        body: "Use uma Smart Thing de presença e uma lâmpada compatíveis. Defina condição verdadeira e falsa e confira os estados disponíveis em Specifications. Cada modelo pode oferecer interações diferentes.",
      },
      {
        title: "Defina a saída da condição",
        body: "Ligar quando há presença não define quando desligar. Acrescente ausência, teste ambas e observe conflitos. A simulação de temperatura nesta página é independente: não controla o Packet Tracer nem hardware.",
      },
    ],
    code: "Regra didática:\nSE presença = detectada → lâmpada ligada\nSE presença = ausente → lâmpada desligada\nTeste adicional: rede indisponível ou dispositivo sem registro.",
    exercise:
      "Registre condição, resultado esperado e observado. Como comprovar que a lâmpada foi acionada pela regra e não manualmente?",
    hint: "Observe a transição e identifique a origem da ação.",
    lab: {
      tool: "Cisco Packet Tracer — Conditions",
      setup:
        "Use dispositivos registrados no mesmo serviço. A simulação de temperatura abaixo é uma atividade complementar.",
      steps: [
        "Confira sensor e lâmpada em Home.",
        "Em Conditions, crie a regra de presença com os estados disponíveis.",
        "Adicione ausência e provoque os casos conforme Specifications.",
        "Interrompa a comunicação e registre o comportamento.",
      ],
      expected:
        "As ações correspondem aos casos e as falhas de rede, registro e condição são diferenciadas.",
      troubleshooting:
        "Controle manual funcionando com regra inativa pede revisão de nomes, estados e comparações em Conditions.",
    },
  },
  {
    id: "mqtt-telemetria",
    title: "Telemetria MQTT: tópicos, tempo e repetição",
    minutes: 35,
    level: "Avançado",
    demo: "iot",
    resources: [
      {
        title: "OASIS — MQTT 5.0",
        url: "https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html",
      },
    ],
    objectives: [
      "Projetar uma mensagem interpretável",
      "Reconhecer leitura antiga e mensagem repetida",
    ],
    explanation:
      "Telemetria envia medições para acompanhamento. Identifique origem, valor, unidade e momento. MQTT organiza publicação e assinatura por tópicos, mas a aplicação ainda decide se o dado é atual e como tratar repetições.",
    analogy: "Uma notícia sem data pode estar correta sobre ontem e errada sobre agora.",
    sections: [
      {
        title: "Tópico não é contrato de dados",
        body: "Defina e valide o formato no consumidor. Limites e unidades ajudam a recusar leituras absurdas. Identificador e sequência permitem reconhecer repetições; timestamps precisam considerar relógios incorretos.",
      },
      {
        title: "Entrega e efeito são diferentes",
        body: "Qualidades de serviço MQTT têm garantias distintas e podem envolver duplicação. A garantia do protocolo não prova sozinha que um efeito de negócio ocorrerá exatamente uma vez. Considere idempotência, autenticação e permissão por tópico.",
      },
    ],
    code: '{\n  "dispositivo": "sala-01",\n  "sequencia": 42,\n  "valor": 28,\n  "unidade": "Celsius",\n  "medidoEm": "2026-10-15T12:00:00Z"\n}',
    exercise:
      "O que mostrar se a última leitura tem dez minutos e o dispositivo está offline? Como impedir uma ação repetida?",
    hint: "Separe último valor conhecido, atualidade e autorização para atuar.",
    lab: {
      tool: "Simulação didática no navegador",
      setup:
        "Não há conexão MQTT real. Não presuma que o serviço IoT do Packet Tracer implementa um broker específico.",
      steps: [
        "Altere a temperatura.",
        "Observe a decisão do ventilador.",
        "Desconecte e identifique o aviso de leitura antiga.",
        "Reconecte e proponha o contrato de uma mensagem real.",
      ],
      expected:
        "A tela distingue dado recebido de situação atual e representa falha explicitamente.",
      troubleshooting:
        "Se um valor antigo parece atual, falta informação sobre validade e comunicação.",
    },
  },
  {
    id: "projeto-iot",
    title: "Projeto: monitorar uma sala com plano de falhas",
    minutes: 60,
    level: "Avançado",
    demo: "iot",
    resources,
    objectives: ["Integrar rede, medição e painel", "Definir critérios de segurança e validação"],
    explanation:
      "Projete monitoramento de temperatura com alerta de leitura antiga e atuação conceitual de ventilador. Separe arquitetura proposta, simulação no Packet Tracer e evidências que exigiriam hardware real.",
    analogy: "Um piloto testa a rota e as falhas antes de transportar passageiros.",
    sections: [
      {
        title: "Uma arquitetura explicável",
        body: "Descreva sensor, controlador, comunicação, armazenamento e painel. Defina unidade, amostragem, validade e permissões. Se explorar uma placa como ESP32, consulte o fabricante e use apenas práticas de baixa tensão em ambiente orientado.",
      },
      {
        title: "Falha faz parte do projeto",
        body: "Inclua sensor ausente, mensagem inválida, rede interrompida e comando não autorizado. O estado seguro depende do contexto; desligar tudo não é regra universal. Desligar o ventilador na simulação é uma escolha didática, não recomendação para um sistema crítico.",
      },
    ],
    code: "Casos de teste:\n1. Medição válida abaixo do limite\n2. Medição acima do limite\n3. Sensor sem leitura\n4. Rede interrompida\n5. Mensagem repetida\n6. Comando sem permissão",
    exercise:
      "Entregue diagrama, topologia .pkt opcional e tabela de resultados. Declare o que foi simulado e o que não foi executado.",
    hint: "Cada evidência informa condição inicial, ação, esperado e observado.",
    lab: {
      tool: "Roteiro de projeto / Packet Tracer opcional",
      setup:
        "O planejamento pode ser concluído sem instalar ferramentas. O site não executa hardware nem publica mensagens MQTT.",
      steps: [
        "Desenhe o caminho da medição.",
        "Defina mensagem e regra de atuação.",
        "Teste no navegador os casos normal e desconectado.",
        "Se usar Packet Tracer, registre as diferenças entre os modelos disponíveis e a arquitetura proposta.",
      ],
      expected:
        "Uma entrega explica funcionamento, limites e cenários de falha sem prometer evidências não obtidas.",
      troubleshooting:
        "Se um recurso não existir no simulador, documente a limitação em vez de declarar que foi testado.",
    },
  },
];
