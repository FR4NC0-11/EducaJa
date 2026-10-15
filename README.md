# EducaJá

Ambiente inicial do projeto educacional de programação. Aplicação ainda não implementada.

## Trabalhar neste computador

Pasta: `C:\Users\coron\OneDrive\Documentos\ProjetosVSCODE\Sites\EducaJa\EducaJa`.

1. Abra esta pasta no VS Code.
2. Inicie o Docker Desktop e aguarde o mecanismo Linux ficar pronto.
3. O arquivo `.env` local já foi criado com uma senha aleatória. Em outro computador, copie `.env.example` para `.env`, defina uma senha e atualize a mesma senha em `DATABASE_URL`.
4. Execute `docker compose up -d db`.
5. Verifique o banco com `docker compose exec db pg_isready -U educaja -d educaja`.
6. Para acessar o PostgreSQL: `docker compose exec db psql -U educaja -d educaja`.
7. Para parar: `docker compose down`. O volume conserva os dados. Não use a opção `-v` se quiser preservá-los.

Node.js 24 é a base disponível para uma futura aplicação JavaScript/TypeScript. Framework e dependências ainda não foram escolhidos.

## Trabalhar pelo navegador em outro computador

Após revisar e enviar estes arquivos ao GitHub:

1. Abra https://github.com/FR4NC0-11/EducaJa.
2. Selecione **Code > Codespaces > Create codespace on main** (ou a branch que recebeu os arquivos).
3. A configuração `.devcontainer` prepara Node.js 24 e PostgreSQL 17 em serviços separados.
4. A variável `DATABASE_URL` já aponta para o banco `db` dentro desse ambiente.

O Codespaces depende da disponibilidade e da cota da conta; confira eventuais custos antes de criá-lo. A senha fixa da configuração é exclusiva para esse banco descartável de desenvolvimento, que não publica a porta do PostgreSQL. Nunca reutilize essa senha em produção.

Os bancos local e do Codespaces são independentes. Git sincroniza código; não sincroniza dados, arquivos `.env` nem alterações ainda não enviadas. Faça commit e push ao encerrar o trabalho e atualize a cópia local antes de retomá-lo. Mantenha a porta da aplicação privada durante o desenvolvimento.

Não há servidor web neste estágio. A porta 3000 está reservada para a futura aplicação. O Codespaces é um ambiente de desenvolvimento; a publicação do site será uma etapa separada.

## Próximos passos

- [Requisitos recuperados](docs/REQUISITOS.md)
- [Plano de publicação](docs/PUBLICACAO.md)
- Confirmar o framework antes de criar o código da aplicação.

## Referências

- https://docs.github.com/en/codespaces/setting-up-your-project-for-codespaces/adding-a-dev-container-configuration/introduction-to-dev-containers
- https://hub.docker.com/_/postgres
- https://hub.docker.com/_/node

## Organização e aprendizado

- [Fluxo de branches e pull requests](CONTRIBUTING.md)
- [Docker para começar](docs/DOCKER.md)

As alterações entram na main por PR revisado. O primeiro commit da preparação fica em `chore/ambiente-inicial`.
