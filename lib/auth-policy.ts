// Email ownership is only asserted by the code-confirmation flow.
export function emailVerificationRequired() {
  return process.env.AUTH_EMAIL_VERIFICATION === "true";
}
