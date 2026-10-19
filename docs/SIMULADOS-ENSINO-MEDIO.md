# Simulados do Ensino Médio — primeira etapa

Atualização de 19/10/2026: o catálogo passou a 60 aulas; o banco mantém 80 questões referentes às 40 aulas iniciais, duas por aula. As vinte aulas adicionais do recorte de 3º trimestre têm exercícios próprios, mas ainda não integram o sorteio. Esse limite também é informado na tela de Simulados. Tentativas existentes não são alteradas. As seções abaixo registram a entrega original.

18/10/2026. Aba disponível apenas no Ensino Médio, separada do teste inicial de Programação. Foco autorizado nesta entrega: realizar o simulado; diagnóstico pedagógico posterior fica para a próxima etapa.

## Conteúdo e configuração

Banco de 80 questões autorais: 20 por matéria, duas relacionadas a cada uma das 40 aulas atuais. Cada questão tem ID estável, matéria, aula, dificuldade editorial, cinco alternativas, uma resposta correta e explicação. Os recortes são os ensinados nas aulas do site; não são questões oficiais do Enem, SENAI ou Geekie One e não usam gabaritos copiados dessas plataformas.

- Padrão de 20 questões.
- Uma matéria: de 1 a 20 questões. Todas as matérias: de 1 a 80.
- Distribuição por matéria e dificuldade, com desempates aleatórios; em 20 questões mistas, cinco vêm de cada área.
- Questões sem repetição dentro da tentativa, apresentadas em ordem embaralhada. Alternativas também embaralhadas, mantendo IDs independentes das letras exibidas.
- Dificuldade fácil, intermediária ou difícil é classificação editorial, não calibração psicométrica. O sorteio tenta equilibrar os níveis disponíveis; quantidades pequenas não cobrem necessariamente todos os assuntos ou níveis.
- Novas tentativas podem repetir itens de tentativas anteriores: não há histórico de exposição nem geração infinita por IA.

Arquivos: exam-types.ts, exam-math.ts, exam-language.ts, exam-humanities.ts e exam-science.ts; seleção/correção/restauração em mock-exam.ts; interface em secondary-exams.tsx.

## Fluxo e resultado

Escolher matéria/quantidade → iniciar → marcar alternativas → navegar livremente, pular ou limpar respostas → confirmar finalização → conferir resultado e explicações.

As respostas podem ser alteradas antes da finalização. Gabarito e explicações aparecem após finalizar, quando a interface bloqueia alterações. A confirmação informa a quantidade em branco. Resultado: acertos, erros, brancos e percentual sobre o total, com peso igual para todas as questões. O arredondamento é para percentual inteiro. Cada item revisado informa a aula correspondente; não há atribuição automática de conclusão de aula.

É resultado objetivo da tentativa, não diagnóstico de domínio, aprovação oficial, nota de redação, TRI ou simulação da nota oficial do Enem. As questões sobre redação avaliam os conceitos ensinados, não corrigem uma redação escrita. Não há chamada a Gemini nem consumo de cota.

## Salvamento e limites

Uma tentativa é mantida na chave local `educaja-secondary-exam-v1`, incluindo ordem sorteada, alternativas, índice atual, respostas e finalização. É local ao navegador/origem/dispositivo, não vinculado à conta, não sincronizado entre dispositivos e não é histórico de simulados. Mudar de área e voltar preserva o estado em memória; recarregar recupera o estado local quando disponível. Novo simulado/descarte pede confirmação antes de remover a tentativa anterior.

Armazenamento é tratado como entrada não confiável: tamanho limitado, versão, IDs, pertencimento à matéria, duplicatas, opções, respostas e índice são validados; campos desconhecidos não são usados. Estado inválido/antigo volta à configuração com aviso. A nova versão deve mudar a chave/contrato ou usar novos IDs quando alterações editoriais tornarem a tentativa antiga incompatível. Não aceitar silenciosamente mudanças de significado de IDs já publicados.

Se armazenamento falhar, a interface informa que a tentativa continua temporária e poderá ser perdida ao fechar/recarregar; usa aviso de saída enquanto a tentativa não finalizada não puder ser salva. O componente mantém a tentativa durante navegação interna. Não depende do banco para resolver/corrigir questões, mas o site continua online; não é modo offline. Uma falha geral do workspace pode aparecer na entrada, sem bloquear o acesso à aba.

O banco e a correção são código de cliente: não é ambiente de prova supervisionada nem proteção contra inspeção/adulteração pelo próprio usuário. Não há promessa de segurança contra cola. Esta escolha evita novos dados de produção, rotas, migrações e integrações de conta antes de definir o diagnóstico.

## Verificação e evolução

Testes unitários: cobertura das 40 aulas/80 itens, cinco alternativas e gabarito válido, IDs, seleção válida/limites, ausência de repetição, distribuição por área/nível, alternativas embaralhadas, correção por ID, brancos, restauração e rejeição de dados inválidos.

Navegador: aba apenas escolar, padrão 20, seleção por matéria/quantidade, navegação e recarga sem novo sorteio, correção de resposta certa/errada/em branco, resultado persistente e bloqueado, descarte, proteção de anotações de aula, armazenamento inválido/indisponível e largura móvel. Inspeção visual local em computador/celular; sem banco local configurado, o próprio simulado foi exercitado, e persistência de aulas/contas fica para o CI com PostgreSQL temporário.

Próxima etapa: definir diagnóstico por habilidade/aula com limites de evidência, especialmente em tentativas curtas, e revisar o banco com professor humano. Não inferir domínio pela média ou por uma questão isolada. Sincronização com conta, histórico e rubricas de diagnóstico ainda não foram implementados. Segurança/cotas, IA, aulas e progresso existentes permanecem preservados.
