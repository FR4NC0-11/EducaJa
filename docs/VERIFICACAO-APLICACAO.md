# Verificação da primeira versão — 15/10/2026

## Validações locais

- Migração 001_learning.sql aplicada no PostgreSQL local.
- Três testes de regras: catálogo com dez questões, rejeição de entradas inválidas e contagem de respostas válidas.
- TypeScript e build de produção aprovados.
- Endpoint de saúde respondeu status ok.
- Teste de navegador: dez respostas, conclusão pendente de IA, recarga e recuperação, anotação e etapa concluída persistentes.
- Teste de API: isolamento entre visitantes, rejeição de origem externa, diagnóstico incompleto e índice fora do intervalo.
- Teste de celular: filtro de categorias e ausência de transbordamento horizontal a 390 px.
- Inspeção visual da visão geral em tela de computador.

Os testes usam visitantes separados, criados no banco local apenas para essas verificações. Não contêm dados reais de alunos.

## Limites

IA, autenticação por conta, Codespaces real e hospedagem de produção não foram executados. O fluxo de CI foi adicionado ao PR; seu resultado remoto deve ser conferido no GitHub. A aplicação local usa dados reais persistidos no PostgreSQL, não um banco simulado.
