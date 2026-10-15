# Docker para começar

## Para que ele serve no EducaJá

O PostgreSQL precisa de um programa em execução para armazenar e consultar dados. O Docker executa esse programa em um ambiente isolado chamado container. Assim, a configuração do banco fica descrita no projeto e pode ser reproduzida em outro ambiente, sem instalar o PostgreSQL manualmente no Windows.

- **Docker Desktop:** aplicativo que gerencia o Docker no computador.
- **Imagem:** pacote usado para criar o container; aqui usamos a imagem oficial do PostgreSQL 17.
- **Container:** instância do PostgreSQL em execução.
- **Volume:** armazenamento dos dados separado do container. O volume local deste projeto é `educaja-local_postgres_data`.
- **Compose:** ferramenta que lê `compose.yaml` e cria os serviços configurados.

Docker local não publica o site na internet e não sincroniza seus dados com outros computadores. O Codespaces fornece outro computador na nuvem; a publicação do site para usuários será feita em uma etapa própria.

## Rotina pelo Docker Desktop

1. Abra Docker Desktop e aguarde o mecanismo ficar pronto.
2. Na página Containers, procure o grupo `educaja-local`.
3. Dentro dele, o serviço `db` é o PostgreSQL do projeto. Use o botão de iniciar para ligá-lo e o de parar para desligá-lo.
4. Abra os logs do serviço para acompanhar a inicialização. O estado healthy indica que a verificação de prontidão passou.

A disponibilidade e os nomes dos controles podem variar entre versões. O grupo aparece depois da primeira criação pelo Compose.

## Comandos úteis

Execute no terminal do VS Code, aberto na pasta do projeto:

| Comando                                             | Para que serve                                                    |
| --------------------------------------------------- | ----------------------------------------------------------------- |
| `docker compose up -d --wait db`                    | Cria ou inicia o banco e aguarda sua prontidão                    |
| `docker compose ps`                                 | Mostra o estado do banco                                          |
| `docker compose logs --tail 50 db`                  | Mostra as últimas mensagens do banco                              |
| `docker compose stop db`                            | Para o banco e conserva o container e os dados                    |
| `docker compose start db`                           | Liga novamente o container existente                              |
| `docker compose exec db psql -U educaja -d educaja` | Abre o console do PostgreSQL                                      |
| `docker compose down`                               | Remove os containers e a rede deste projeto, conservando o volume |

No console do PostgreSQL, `SELECT current_database();` mostra o banco atual. Use `\q` para sair.

Não acrescente `--volumes` ou `-v` ao comando down se quiser manter os dados. O volume não substitui um backup. Não use operações globais de limpeza sem entender quais recursos serão removidos.

O arquivo `.env` contém a senha local. Ele é ignorado pelo Git e não deve ser compartilhado. Alterar a senha nesse arquivo não altera automaticamente a senha de um banco já inicializado.

## Referências oficiais

- https://docs.docker.com/get-started/docker-overview/
- https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-docker-compose/
