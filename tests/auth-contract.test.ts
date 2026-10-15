import test from "node:test";
import assert from "node:assert/strict";
import { authSchema } from "../lib/auth-contract";
import { newAccessCode, accessCodeHash, matchesAccessCode } from "../lib/access-code";
import { hashPassword, verifyPassword } from "../lib/password";

test("cadastro e login validam e-mail e aceitam somente senhas de 8 a 255 caracteres", () => {
  for (const kind of ["register", "login"]) {
    const action = { kind, name: "Teste", email: " TESTE@example.test ", password: "a".repeat(8) };
    assert.equal(authSchema.parse(action).kind, kind);
    assert.equal(authSchema.safeParse({ ...action, password: "a".repeat(255) }).success, true);
    assert.equal(authSchema.safeParse({ ...action, password: "a".repeat(256) }).success, false);
    assert.equal(authSchema.safeParse({ ...action, password: "a".repeat(7) }).success, false);
    for (const email of [
      "sem-arroba",
      "nome@",
      "nome@@example.test",
      "nome@dominio com espaço.test",
    ])
      assert.equal(authSchema.safeParse({ ...action, email }).success, false);
  }
});
test("senhas longas são verificadas integralmente, sem truncar após 128 caracteres", async () => {
  const password = "a".repeat(254) + "b";
  const hash = await hashPassword(password);
  assert.ok(await verifyPassword(password, hash));
  assert.equal(await verifyPassword("a".repeat(255), hash), false);
});
test("códigos preservam zeros e dependem do segredo do navegador", () => {
  assert.match(newAccessCode(), /^\d{6}$/);
  assert.ok(authSchema.safeParse({ kind: "verify", code: "000001" }).success);
  assert.equal(authSchema.safeParse({ kind: "verify", code: "12345" }).success, false);
  const hash = accessCodeHash("navegador-a", "000001");
  assert.equal(matchesAccessCode("navegador-a", "000001", hash), true);
  assert.equal(matchesAccessCode("navegador-b", "000001", hash), false);
  assert.equal(matchesAccessCode("navegador-a", "000002", hash), false);
});
