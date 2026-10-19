# Experiência de celular

18/10/2026. Variante de interface para telas de até 700 px. Compartilha conteúdos, rotas, sessões e controles com o computador; não cria outro site nem depende de detecção de navegador.

## Organização

- Menu lateral vira navegação inferior com rótulos e ícones: Áreas + destinos disponíveis na área atual. Direito mantém apenas seu índice, sem criar funções inexistentes.
- Entrada das três áreas usa cartões compactos com descrições próprias para celular e ação larga. Nesta tela não há barra inferior desnecessária.
- Cabeçalho fixo compacto mantém contexto, conta e ajuda. O menu inferior considera área segura do dispositivo e recebe espaço reservado no fim da página para não cobrir o conteúdo.
- Ensino Médio tem atalho direto “Escolher uma matéria”, cabeçalho mais curto e cartões sem a amostra repetida de aulas. Redação continua acessível pelo destaque. Conteúdo das aulas não foi removido.
- Programação dispensa o bloco repetitivo de três passos no celular; filtros e cartões têm alvos maiores. A ajuda continua disponível.
- Na leitura, a lista de aulas começa recolhida. O seletor informa posição e abre a lista quando necessário; escolher uma aula fecha a lista e foca o título. A ação de próxima aula também leva ao início da leitura. Lista completa permanece visível no computador.
- Controles duplicados de aula/plano não ocupam a leitura no celular: os mesmos destinos ficam na barra inferior.
- Direito mantém sua paleta e serifas, com apresentação menor e índices ancorados abaixo do cabeçalho. Simulados mantêm regras, respostas, sorteio e salvamento; apenas o espaçamento/controles de celular mudam.

## Preservação

Sem mudança em catálogo, banco, autenticação, cotas ou provedor. Não copia nem reinicia progresso. As proteções contra sair com anotações pendentes continuam; a seleção de aula usa a mesma proteção também ao partir do plano. A preferência de recolher o menu do computador é preservada e não oculta os rótulos da navegação de celular.

Elementos específicos de celular são ocultados por CSS no computador. A seleção usa os mesmos IDs e ações; não há duplicação de notas ou chamadas de API. O seletor começa fechado ao trocar de tela. Foco por teclado é mantido e botões principais têm pelo menos 44 px de altura. Inputs de celular usam fonte de 16 px para facilitar leitura/preenchimento.

## Verificação

Três novos fluxos de navegador cobrem entrada/conta/atalho/menu inferior, leitura antes da lista/seleção/foco/rascunho/conclusão/próxima aula, 320 px e retorno ao layout de computador. Os testes anteriores de T.I. e Direito seguem o novo acesso à lista e o cabeçalho fixo, preservando suas verificações funcionais.

Inspeção visual local em celular para entrada, Ensino Médio, índice e simulados; banco local não configurado. Persistência, leitura e rascunhos são verificados no CI com PostgreSQL temporário. Testes automatizados não substituem avaliação com usuários nem testes em aparelhos reais. Melhorias futuras podem se apoiar nesses testes de uso; esta entrega cobre os caminhos principais sem redesenhar conteúdos ou ativar recursos novos de IA.
