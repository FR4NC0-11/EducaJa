# Senha e confirmação de acesso por e-mail

## Como funciona

No cadastro e em cada novo login, o usuário informa e-mail e senha e recebe um código de seis dígitos. A sessão só é criada depois de confirmar esse código no mesmo navegador. A sessão confirmada continua válida por sete dias, até a saída ou revogação.

O botão de olho mostra ou oculta a senha no cadastro e no login. O valor não é alterado. A senha aceita de 8 a 255 caracteres, tanto na interface quanto no servidor, e continua armazenada apenas como hash scrypt com salt aleatório. Não há truncamento em 128 caracteres.

O formato do e-mail é validado no servidor e na interface. Um formato válido não prova que a caixa existe ou pertence à pessoa: a confirmação do código é essa prova. A aplicação não usa uma lista fechada de provedores, para aceitar também e-mails institucionais e domínios próprios.

## Ativar envio real

A integração inicial de e-mail usa Resend via API no servidor, sem dependência adicional. O provedor pode ser substituído em `lib/email.ts` sem mudar os contratos de confirmação.

1. Crie ou use uma conta em https://resend.com e gere uma chave com permissão de envio.
2. Para um teste privado com sua própria caixa, o Resend permite o remetente `onboarding@resend.dev`, com envio restrito ao endereço da conta Resend. Isso não libera cadastros de outros destinatários.
3. Para enviar a estudantes, adicione um domínio que você controla e configure os registros DNS solicitados pelo Resend. Após a verificação, use um remetente autorizado desse domínio.
4. Somente no arquivo `.env` local, configure `RESEND_API_KEY` e `EMAIL_FROM`. Exemplo de remetente de domínio próprio: `EMAIL_FROM="EducaJá <acesso@seu-dominio.com>"`. Não copie uma chave para `.env.example`, para o chat, para capturas de tela ou para o GitHub.
5. Reinicie o servidor. Em uma publicação na nuvem, configure esses segredos no painel da hospedagem e use HTTPS, `COOKIE_SECURE=true` e `APP_ORIGIN` com a origem exata do site.
6. Cadastre uma conta de teste com uma caixa autorizada, confirme o recebimento, digite o código e teste um novo login após sair. Confira também spam. A aceitação do pedido pelo provedor não garante entrega na caixa de entrada.

Sem configuração ou diante de falha no envio, o sistema informa o problema e não cria conta nem sessão. Não há código fixo, código no console, retorno do código na API ou opção para ignorar a confirmação na aplicação normal. A chave do Gemini não envia e-mails e não substitui a credencial do Resend.

## Proteções e limites

- Código aleatório, validade de dez minutos e uso único; novo envio invalida o código anterior.
- Cinco erros por desafio, persistidos mesmo que a requisição seja rejeitada; reenviar não zera esse contador.
- Intervalo de 60 segundos e até três envios por desafio. Após expiração ou esgotamento, iniciar o acesso novamente.
- Segredo aleatório de 256 bits em cookie HttpOnly/SameSite=Lax, ligado ao hash do código. O banco não contém o código nem o segredo do navegador em texto puro.
- Limites por e-mail e globais de início/reenvio, mais limite de verificações por desafio. Nenhuma confiança em IP fornecido pelo navegador.
- Consultas parametrizadas, confirmação em transação e bloqueio da linha: pedidos concorrentes não podem usar o mesmo código duas vezes.
- Cadastro pendente não reserva a conta nem vincula o progresso antes da confirmação. Confirmação mantém a vinculação do visitante e revoga o acesso pelo token anônimo antigo.
- Desafios expirados são removidos em novos inícios bem-sucedidos. Para operação pública de maior volume, programar limpeza periódica e monitorar abuso/entrega.

## Migração de contas existentes

`004_email_confirmation.sql` adiciona a data de verificação e a tabela de desafios. As sessões anteriores são revogadas porque foram criadas sem prova de acesso ao e-mail. As contas e seu progresso são preservados; o próximo login exige a senha existente e o código enviado ao endereço cadastrado. Ninguém é marcado automaticamente como verificado. Configure o remetente antes de aplicar essa mudança em um serviço já público.

## Verificação desta etapa

Em 15/10/2026: dez testes de regras, senhas e contratos, onze de navegador/API e três de integração da IA passaram com PostgreSQL real e envio de e-mail interceptado exclusivamente nos processos de teste. Compilação e verificação de tipos aprovadas; migração aplicada e reaplicada sem duplicação.

Os testes usam endereços `@example.test`, chave falsa e caixa de saída em `.cache/`, ignorada pelo Git. A interceptação só é carregada explicitamente pelos servidores de teste nas portas 3001/3002; não foi adicionada uma rota para ler códigos. Os testes não enviam e-mail externo nem comprovam entrega real. O envio real continua pendente da conta, credencial e remetente do responsável.

Recuperação/alteração de senha, encerramento de todas as sessões, política de exclusão, monitoramento de entrega e revisão operacional antes de uso público continuam pendentes.

## Referências

- https://resend.com/docs/api-reference/emails/send-email
- https://resend.com/docs/dashboard/domains/introduction
- https://resend.com/docs/knowledge-base/403-error-resend-dev-domain
- https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html
