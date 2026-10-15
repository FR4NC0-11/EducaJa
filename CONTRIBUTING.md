# Como contribuir

## Fluxo de mudanças

Toda mudança deve partir de uma branch e passar por pull request antes de entrar na main. Não fazer push direto na main nem merge sem revisão e autorização do responsável.

1. Atualize a main com `git switch main` e `git pull --ff-only`, com a pasta de trabalho limpa.
2. Crie uma branch descritiva, como `chore/ambiente-inicial`, `feat/diagnostico` ou `fix/avaliacao`.
3. Faça mudanças pequenas, documente decisões relevantes e execute as verificações apropriadas.
4. Revise o diff e selecione somente os arquivos necessários para o commit. Nunca inclua `.env`.
5. Faça um commit com mensagem que descreva o propósito.
6. Envie a branch ao GitHub e abra um PR usando o modelo do repositório. Um PR precisa de pelo menos um commit diferente da branch de destino.
7. Revise o PR. Só integre à main após aprovação.

Este documento registra a convenção do projeto. Ele não ativa proteção de branch no GitHub; essa configuração pode ser feita posteriormente conforme as opções da conta.

## Documentação

- Atualize o README quando o modo de executar o projeto mudar.
- Registre requisitos confirmados em `docs/REQUISITOS.md`.
- Registre decisões de arquitetura quando forem confirmadas, com contexto, escolha e consequências.
- Use o PR para descrever o resultado final, as verificações e as pendências.

## Bancos e segredos

Os bancos de desenvolvimento local, Codespaces e produção são independentes. Git guarda o código e as migrações, não o conteúdo do banco. Nunca versionar credenciais reais.
