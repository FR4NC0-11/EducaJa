# T.I., Git/GitHub e preparação prática para o SAEP

Orientação editorial de 17/10/2026, baseada no roteiro fornecido pelo responsável pelo projeto. Não é uma matriz oficial nem uma previsão de prova. Tópicos e condições podem mudar; prevalecem as instruções do avaliador. Nenhuma atividade foi enviada ao SENAI e nenhum material privado foi copiado.

## Unidade de T.I.

Quinta matéria de Programação, ID `ti-git-github`, com nove aulas autorais:

1. T.I.: leitura de um projeto existente, camadas, dependências e ambiente local.
2. Git versus GitHub, clone, status, histórico e página do repositório.
3. Diretório de trabalho, staging, diff, seleção de arquivos e segredos.
4. Commits com propósito e verificação local.
5. Branches, base e proteção de trabalho pendente.
6. Fetch, pull, push e tratamento de divergências sem força automática.
7. Conflitos com conciliação de regras e testes.
8. GitHub: proposta, revisão e atualização do mesmo PR.
9. Oficina em projeto recebido: estoque, plano de testes, documentação e entrega.

As dez questões têm referências formativas e associações com aulas próprias; o professor recebe as evidências por questão no mesmo contrato das outras trilhas. A demonstração de Git Bash é uma sequência fixa de comandos/saídas simuladas, sem execução e sem acesso a arquivos. Não é um terminal real. Notas e conclusões usam a persistência existente; nenhuma migração.

## Aplicação às demais trilhas

O roteiro aparece na página de assuntos e em cada trilha de Programação. Também é fornecido como contexto editorial ao professor. Aulas existentes e seus IDs permanecem, com nove aulas por matéria (45 no total).

| Competência indicada                | Prática sugerida                                                                                 |
| ----------------------------------- | ------------------------------------------------------------------------------------------------ |
| Git/GitHub                          | T.I.: clone, diff, staging, commit, branch, sincronização, conflito, push/PR                     |
| Análise de código e camadas         | T.I. e Java: seguir uma operação e separar interface, serviço e repositório                      |
| SQL, chaves e relacionamentos       | PostgreSQL: ler scripts, modelar produto/usuário/movimento, conferir PK/FK                       |
| CRUD                                | Web + PostgreSQL: criar/consultar/atualizar/excluir com persistência real em banco de treino     |
| Autenticação, usuários e permissões | Web + oficina T.I.: reutilizar mecanismo existente, validar sessão/token e autorizar no servidor |
| Segurança                           | Consultas parametrizadas, hash de senha apropriado, segredos fora do Git, logs sem tokens        |
| Busca, filtros e paginação          | Web: filtro preservado entre páginas, ordem estável, limites e estados de falha                  |
| Regras e estoque                    | Java + PostgreSQL + oficina: quantidade positiva, saldo suficiente, atomicidade e concorrência   |
| Rastreabilidade                     | PostgreSQL/IoT: data/hora, origem e usuário identificado por sessão validada                     |
| Algoritmos e lógica                 | Java: condicionais, repetição, métodos, ordenação, filtros e validações                          |
| Testes                              | Plano com preparação, ação, esperado, obtido e resultado; limites, permissão e concorrência      |
| Documentação e entrega              | T.I.: README, dependências, configuração sem segredos, scripts e resultados reais                |

IoT serve como aplicação adicional de lógica/registro; não é apresentada como exigência do roteiro recebido. A orientação conecta estudos, mas não equivale a um curso completo de autenticação, CRUD ou estoque. A oficina depende de um projeto de treino completo e de revisão pedagógica humana. O site não executa comandos, SQL ou testes do aluno e não certifica competência pela conclusão da aula.

## Treino sem internet

Disponibilizar previamente um projeto inicial, ferramentas, dependências e documentação técnica autorizadas. Treinar leitura e execução desse projeto, reproduzir uma falha, implementar uma alteração, testar e documentar sob limite de tempo. Não depender de criar o sistema do zero.

`status`, `diff`, `log`, `add`, `commit`, branches e merges locais não precisam de GitHub. Clone de URL HTTPS, fetch/pull/push para GitHub e PR na web exigem conectividade e autorização. Preparar commits e arquivos localmente; fazer o envio apenas no momento e pelo procedimento permitidos. O EducaJá continua sendo um site com persistência online; esta alteração **não cria modo offline**.

## Capturas reais do GitHub

Arquivos locais em `public/lessons/git/`, obtidos em 17/10/2026, sem alterações:

- `branch-dropdown.png`: menu de branches na página Code.
- `compare-pull-request.png`: botão Compare & pull request após envio de branch.

Autor/fonte: GitHub, [GitHub Docs — Creating a pull request](https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/creating-a-pull-request). Originais em [github/docs/assets/images/help/pull_requests](https://github.com/github/docs/tree/main/assets/images/help/pull_requests), licença [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) do repositório, incluída em `LICENSE.txt`. Capturas oficiais de exemplo, não de contas privadas nem da sessão autenticada do usuário. A interface pode mudar. Legendas, texto alternativo e links de ampliação acompanham as imagens; o tema do site permanece escuro, as capturas preservam suas cores originais.

Referências técnicas: documentação oficial de [Git](https://git-scm.com/docs) e [GitHub](https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/creating-a-pull-request), com páginas específicas nas aulas. Exemplos e exercícios são autorais.

## Verificação e próximos passos

Testes verificam catálogo, referências do diagnóstico, isolamento de IDs, arquivos PNG locais e cobertura das trilhas pelo roteiro. Testes de navegador cobrem filtro T.I., navegação de comandos, carregamento de imagem, reset por aula, persistência de anotações, largura móvel e diagnóstico de dez questões.

Revisão pedagógica com professor humano e Gemini real ainda necessária; não houve chamada paga para validar esta mudança. Próxima evolução: distribuir a oficina em exercícios executáveis de CRUD/autorização/estoque com ambiente local reproduzível e rubrica revisada, sem utilizar dados de produção.
