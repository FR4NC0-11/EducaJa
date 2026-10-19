# Entrada e acabamento no computador

19/10/2026. Base main 98a5031, após PR #26. A entrada ganha uma composição própria para larguras acima de 700 px: abertura com título claro, ilustração decorativa construída com CSS e ícones locais, três caminhos com identidades de cor e um guia curto para começar.

## O que muda

- Na escolha de áreas, o menu lateral e seu controle de recolhimento ficam ocultos. O espaço é usado pelos três destinos; conta e ajuda continuam no cabeçalho. Ao entrar em uma área, o menu de estudo volta com sua preferência de recolhimento preservada.
- Programação, Ensino Médio e Direito mantêm os mesmos botões e ações. Os cartões informam o conteúdo disponível e seu estado: contagens de aulas/matérias vêm dos catálogos, sem números de progresso inventados. Direito permanece com prévias e aulas em preparação.
- A abertura foi dimensionada para manter os três acessos visíveis na primeira tela em 1280 × 720, sem considerar mensagens excepcionais de erro. Em larguras intermediárias, os cartões passam a duas colunas; não se impõe a mesma altura ou quantidade de colunas a todas as telas.
- Acima de 1000 px, o menu de estudo recebe cantos suaves, seleção com contorno discreto e melhor acabamento no cabeçalho. Temas, posições, textos e operações continuam iguais. Direito mantém sua identidade verde/dourada.
- Até 700 px, continuam a entrada compacta, os cartões e a navegação inferior existentes. A ilustração, guia e detalhes extras ficam ocultos. Não há identificação de dispositivo nem outra versão de conteúdo.

## Acessibilidade e limites

A ilustração é decorativa, sem controles simulados, e fica fora da árvore acessível. Os três botões mantêm nomes e destinos, tamanho de toque, foco e uso por teclado. Não há animação contínua; as transições dos cartões respeitam preferência por movimento reduzido. Conta, ajuda, voltar, proteção de rascunhos e retorno às áreas permanecem.

Nenhuma mudança de conteúdo curricular, banco, autenticação, cotas ou Gemini. Não foram acrescentados dados pessoais, métricas fictícias, novos serviços, fontes remotas ou imagens externas.

## Verificação

Inspeção visual local em 1280 × 720 e 390 × 844, sem banco local configurado. Ações de entrada/retorno conferidas; persistência depende do ambiente de CI com banco temporário. Teste de navegador verifica botões acima da dobra em 1280 × 720, larguras intermediárias sem estouro, entrada por teclado, retorno do menu e preservação da sessão. A suíte anterior continua cobrindo conta, rascunhos, leitura, celular, simulados e Direito.

Revisão com usuários e aparelhos reais continua recomendada. Esta entrega redesenha a entrada e dá acabamento ao menu de computador; as telas internas de aulas e simulados não receberam uma reorganização completa.
