# Ampliação: cinco aulas por matéria

19/10/2026. Base main 91147be, após integração do PR #25. São vinte aulas autorais anexadas às quarenta existentes, totalizando quinze por área e sessenta no Ensino Médio. IDs e ordem anteriores permanecem; notas e conclusões continuam no mecanismo existente, sem migração.

## Consulta e seleção

Consulta autorizada pela interface de [Geekie One](https://one.geekie.com.br/), em Minhas matérias, nos quatro catálogos da 3ª série. Foram relidos os índices que identificam explicitamente o 3º trimestre, não os capítulos completos. Não houve reprodução de capítulos, imagens, vídeos ou exercícios; não foram enviadas atividades nem coletadas notas, respostas ou dados pessoais.

Os recortes são escolhas editoriais próprias, não uma correspondência aula a aula com a plataforma. Capítulos amplos foram subdivididos e temas regionais foram agrupados para respeitar o limite de cinco aulas por área.

| Área       | Temas do índice consultado                                                                                 | Novas aulas do EducaJá, na ordem                                                                                                   |
| ---------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Matemática | Esferas e partes; transformações; espaços amostrais discretos/contínuos; planejamento de pesquisa; cônicas | Esfera e escala; isometrias/homotetia; probabilidade contínua; amostragem e viés; introdução a cônicas                             |
| Linguagens | Coesão e coerência; gramática nos exames; análise crítica do discurso                                      | Coerência e progressão; pontuação e sentido; regência/crase; concordância; enquadramento e vozes                                   |
| Humanas    | Rússia/Ásia Central; Oriente Médio; Índia/Ásia Meridional; Japão/Tigres Asiáticos/China; Oceania/polos     | Território e redes; água e interdependência; monções e diferenças internas; cadeias produtivas; ilhas e gelo                       |
| Natureza   | Genoma humano; alterações genéticas/células cancerígenas; princípios de biotecnologia; DNA recombinante    | Controle celular; alterações somáticas/germinativas; fermentação e comparação controlada; PCR e controles; vetor/inserto/expressão |

Genoma humano já tinha uma aula e ela foi mantida. A nova sequência aprofunda outros recortes. A aula anterior de biotecnologia apresentava finalidade/evidência; as novas trabalham processos e distinções técnicas. PCR e fermentação são desdobramentos autorais de biotecnologia, não títulos cuja presença foi confirmada no índice da Geekie. Gramática foi dividida em três aplicações; coerência enfatiza contradição e progressão, além da coesão referencial e da redação já existentes.

## Estrutura e fontes

`lib/secondary-third-term.ts` usa a estrutura vigente: objetivos, explicação, três seções graduais, exemplo ou caso autoral, analogia, exercício, dica, conferência comentada e recursos. Fórmulas e contas são apresentadas em texto, compatíveis com computador e celular. Não há correção automática nem promessa de nota/domínio.

- [OBMEP/IMPA — Portal da Matemática](https://portaldaobmep.impa.br/): recurso público complementar; não representa leitura integral de todos os módulos.
- [IBGE — Atlas Geográfico Escolar](https://www.ibge.gov.br/geociencias/atlas/nacional/2402-np-atlas-geografico-escolar/16633-atlas-geografico-escolar.html): mapas e referência territorial. A página institucional foi consultada; o acesso direto a atlasescolar.ibge.gov.br falhou nesta sessão. Dados numéricos das novas aulas são cenários fictícios, sem estatísticas ou notícias geopolíticas atribuídas ao Atlas.
- [Senado — vírgula](https://www12.senado.leg.br/manualdecomunicacao/estilos/virgula), [crase](https://www12.senado.leg.br/manualdecomunicacao/estilos/crase) e [Manual de Comunicação](https://www12.senado.leg.br/manualdecomunicacao): consulta da escrita formal. Textos e exemplos não foram copiados.
- [NCI — What Is Cancer?](https://www.cancer.gov/about-cancer/understanding/what-is-cancer): controle celular, alterações adquiridas/herdadas e limites do determinismo. Conteúdo educacional, sem diagnóstico ou interpretação de testes pessoais.
- NHGRI: [PCR](https://www.genome.gov/genetics-glossary/Polymerase-Chain-Reaction-PCR), [DNA recombinante](https://www.genome.gov/genetics-glossary/Recombinant-DNA-Technology) e [glossário](https://www.genome.gov/genetics-glossary). Modelos próprios, sem protocolos de manipulação ou cultivo.

Links são recursos complementares; não implicam endosso das instituições. Fontes em inglês são identificadas. O catálogo ainda tem foco em Geografia e Biologia: não passa a cobrir integralmente História, Filosofia, Sociologia, Física ou Química.

## Integração e limites

- Vinte aulas anexadas, sem substituir IDs. Os quatro temas mantêm seus identificadores. Contagens são calculadas pela interface.
- Simulado mantém oitenta questões, duas para cada uma das quarenta aulas iniciais. Um aviso visível informa que as novas aulas ainda não entram no sorteio. Tentativas e IDs do banco são preservados. Expandir o banco exige entrega própria com revisão das questões.
- Sem alteração de banco, autenticação, cotas, Gemini ou dados de produção. Diagnóstico e professor escolares continuam indisponíveis e bloqueados na API.
- Testes unitários verificam integração, IDs, estrutura, isolamento e preservação de sequências. Testes de navegador exercitam persistência da nova aula final de cada área e preservação das notas anteriores. Regressões móveis usam quinze aulas por matéria.
- Revisão pedagógica humana recomendada: simplificações, linguagem, nível dos exercícios e acessibilidade em aparelhos reais. A sequência não equivale a cobertura integral dos trimestres nem a cronograma oficial de uma escola.
