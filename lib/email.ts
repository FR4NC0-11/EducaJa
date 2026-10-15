export function emailConfigured() {
  return !!process.env.RESEND_API_KEY?.trim() && !!process.env.EMAIL_FROM?.trim();
}

export async function sendAccessCode(email: string, code: string, id: string) {
  if (!emailConfigured()) throw new Error("Envio de e-mail não configurado");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RESEND_API_KEY!.trim()}`,
      "Idempotency-Key": id,
    },
    signal: AbortSignal.timeout(15000),
    body: JSON.stringify({
      from: process.env.EMAIL_FROM!.trim(),
      to: [email],
      subject: "Seu código de acesso ao EducaJá",
      text: `Seu código de confirmação do EducaJá é: ${code}\n\nEle vale por 10 minutos e só pode ser usado uma vez, no navegador que iniciou o acesso. Não compartilhe este código. Se você não solicitou este acesso, ignore este e-mail.`,
    }),
  });
  if (!response.ok) throw new Error("Falha ao enviar código de acesso");
  const body = await response.json();
  if (typeof body.id !== "string" || !body.id) throw new Error("Envio não confirmado");
}
