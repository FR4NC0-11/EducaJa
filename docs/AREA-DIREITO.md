# Área de Direito — entrada e identidade visual

18/10/2026. Terceira área do EducaJá, ao lado de Programação e Ensino Médio. Esta entrega cria acesso, navegação, identidade e organização inicial de matérias; não publica aulas jurídicas.

## Escopo

Entrada “Acessar Direito” na seleção de áreas. Referência editorial inicial: Direito brasileiro. Oito recortes de estudo com prévias de temas: Introdução ao Direito, Constitucional, Civil, Penal, Administrativo, Processual, Trabalho e Consumidor.

Cada matéria pode ser selecionada no índice. A prévia mostra descrição e temas previstos, move o foco para o título e permite voltar ao índice. Aulas e exercícios aparecem explicitamente como em preparação. Não há botões para iniciar aulas inexistentes, pontuações, conclusão, anotações, IA ou simulados jurídicos.

O pedido desta etapa se concentrou na nova área e sua estética. O currículo, as aulas e as fontes jurídicas serão definidos na próxima etapa. Os recortes são uma proposta de organização, não uma grade oficial, certificação ou cobertura integral do Direito. Não foram introduzidas interpretações de leis, instruções sobre casos reais ou reprodução de material jurídico externo.

## Apresentação

Paleta escura própria: grafite/verde profundo, dourado discreto e branco quente. Títulos serifados em fontes locais do sistema, numeração romana, índice em linhas e painel de prévia. Emblema vetorial de balança, sem imagens geradas, dependências ou fontes externas. Sidebar e cabeçalho acompanham o tom da área.

Layout adapta as três entradas de área e a biblioteca jurídica a computador e celular. Foco visível, rótulos acessíveis, seleção com aria-pressed, ícones decorativos ocultos à acessibilidade e posição de retorno ajustada para não ficar sob o menu fixo. Sem animações obrigatórias ou informação transmitida apenas por cor.

## Isolamento

Dados de prévia em lib/law-area.ts, fora do catálogo de aulas. Componente law-area.tsx não consulta banco, não grava progresso e não chama professor. A área tem sua própria tela; o assunto ativo de Programação/Ensino Médio não é exibido como assunto jurídico.

Voltar às áreas e Trocar de área preservam progresso existente. Rascunhos de aulas continuam protegidos antes de sair. Simulado escolar mantém sua tentativa; o menu Simulados permanece apenas no Ensino Médio. Direito oferece apenas a navegação Assuntos nesta etapa. Sair/entrar na conta mantém a tela de área correspondente conforme o fluxo existente, sem criar sessões jurídicas.

Sem migração, novos IDs de aulas, alteração de segredos, cotas, autenticação, Gemini ou dados de produção. Escolher matérias jurídicas é navegação local; ao reabrir a área, a prévia volta à introdução, sem salvar uma preferência na conta.

## Validação e continuação

Suíte unitária existente, tipos, formatação e build. Três novos fluxos de navegador: acesso/prévias e ausência de professor/progresso; teclado, tema escuro, celular e retorno visível ao índice; preservação de anotação de Programação e tentativa de simulado após visitar Direito.

Inspeção visual local em computador e 390 px, sem banco local configurado. Persistência das áreas existentes é verificada no CI com PostgreSQL temporário. Próximos passos: confirmar recorte pedagógico e preparar as primeiras aulas com fontes oficiais atualizadas, indicando jurisdição, data e limites. Definir contratos próprios antes de ativar avaliação ou IA jurídica; não reutilizar o professor de Programação.
