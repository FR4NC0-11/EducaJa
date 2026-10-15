# Plano de publicação na nuvem

## Estado atual

Repositório de referência com base na branch main, com origin apontando para https://github.com/FR4NC0-11/EducaJa.git. Primeira aplicação Next.js/TypeScript com PostgreSQL preparada em feat/primeira-experiencia para revisão por PR. Nenhum serviço público criado.

## Etapas

1. Revisar os arquivos de ambiente e enviá-los ao GitHub. Nunca versionar `.env`.
2. Criar um Codespace para verificar o desenvolvimento pelo navegador e a inicialização do PostgreSQL. Os dados desse banco são de desenvolvimento; não são o banco de produção nem devem ser sua única cópia de dados importantes.
3. Consolidar a stack e criar a aplicação, com versões de dependências registradas em lockfile. Separar acesso ao banco e chamadas à IA no servidor.
4. Definir esquema, migrações e autenticação. Validar a aplicação e as migrações em ambiente de teste antes da primeira publicação.
5. Escolher hospedagem da aplicação e PostgreSQL gerenciado, sem Supabase. Comparar custo mensal, suspensão por inatividade, região, conexões, backups e recuperação. O usuário prefere evitar suspensão por inatividade; não presumir que planos gratuitos atendam a essa preferência.
6. Configurar banco de produção independente, conexão TLS, credenciais próprias e segredos no painel da hospedagem. Nenhuma senha de desenvolvimento deve ser reutilizada.
7. Configurar implantação a partir do GitHub, executar migrações como etapa controlada e verificar login, persistência e saúde da aplicação.
8. Ativar endereço HTTPS, registros de erro, limites de consumo da IA e backups. Validar restauração antes de armazenar dados importantes.

## Pendências para execução

- Docker Desktop iniciado em 15/10/2026; mecanismo 29.4.3.
- PostgreSQL local iniciado e saudável. Conexão TCP autenticada validada no banco educaja com usuário educaja.
- GitHub Codespaces ainda não foi criado.
- Preparação organizada na branch chore/ambiente-inicial para revisão por PR antes de integrar à main. Nenhuma contratação ou publicação do site foi realizada.
- Provedor e orçamento dependem de escolha do usuário; a execução não deve criar recursos pagos sem autorização.
