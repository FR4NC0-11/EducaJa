# Arquitetura da primeira versão

Decisão registrada em 15/10/2026, após autorização para prosseguir com o projeto. Next.js com TypeScript foi escolhido como base proposta nesta conversa; não é apresentado como uma decisão recuperada da conversa anterior.

## Componentes

- Next.js App Router e React para interface e rotas HTTP no mesmo projeto.
- TypeScript para os contratos de dados e Zod para validação das requisições.
- PostgreSQL 17 e node-postgres, com pool limitado a cinco conexões por processo. Uso de SQL parametrizado, chaves primárias identity e unicidade por visitante/tema.
- Migrações SQL versionadas, transacionais e com checksum. Nenhuma dependência de Supabase.
- Conteúdo inicial em `lib/catalog.ts`: quatro assuntos (incluindo IoT), dez questões por assunto e três aulas por plano de estudo. Veja INTERFACE-E-PRIMEIRO-ACESSO.md para o fluxo simplificado e a revisão visual.

## Persistência e isolamento

Um token aleatório de 256 bits identifica o navegador em cookie HttpOnly e SameSite=Lax. Apenas o hash SHA-256 do token fica no banco. O token e o registro do visitante expiram após 30 dias da criação. Em HTTPS, configure COOKIE_SECURE=true; APP_ORIGIN pode fixar a origem exata autorizada para escrita.

Todas as consultas de progresso usam o visitante derivado do cookie. A API não aceita um identificador de outro visitante. Escritas exigem Origin correspondente ao Host ou à APP_ORIGIN configurada, JSON e campos validados. Tokens não são expostos em respostas JSON. Requisições inválidas recebem erros sem detalhes de conexão.

A API bloqueia a linha do visitante durante uma transação, serializando alterações de um mesmo navegador. Respostas, caderno e etapas ficam associados a uma sessão por tema. Alterar o objetivo ou retomar um tema preserva as respostas. Editar uma resposta após concluir o diagnóstico retira o estado de conclusão até um novo envio. Em duas abas editando a mesma resposta, prevalece a última gravação; não há edição colaborativa nesta versão.

O conteúdo é apresentado como texto e exemplos; nenhum código enviado pelo estudante é executado.

## Limites explícitos

O professor atual apresenta conteúdo editorial e não simula uma IA conectada. Não há provedor, chave, chamadas externas, notas por aproximação ou classificação automática de nível. As respostas ficam pendentes. A avaliação de 0 a 10 e a adaptação da trilha dependem de uma integração futura, com critérios explícitos e revisão das falhas do modelo.

Não há autenticação por conta, recuperação de acesso, compartilhamento entre dispositivos ou exportação de histórico. A expiração do visitante impede o acesso com o token, mas não remove automaticamente as linhas: uma política de retenção e exclusão deve ser implementada antes do uso real com alunos.

Não publicar esta versão como serviço aberto. O acesso por Codespaces deve permanecer privado. Antes de produção: autenticação, autorização vinculada à conta, limites de requisições, proteção contra abuso, TLS, backups/restauração, política de dados e observabilidade. O container local usa o usuário de desenvolvimento; em produção, separar o usuário de migrações do usuário da aplicação com privilégios mínimos.

## Próximos incrementos

1. Confirmar provedor de IA e configurar o segredo somente no servidor.
2. Definir rubrica por questão, avaliação estruturada validada, custos e revisão humana.
3. Conectar conversa contextual ao diagnóstico e à trilha, preservando o raciocínio do estudante.
4. Adicionar contas e progresso compartilhado entre dispositivos.
5. Escolher hospedagem sem suspensão por inatividade, validar restauração e publicar.
