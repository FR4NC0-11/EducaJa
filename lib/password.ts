import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";

// OWASP scrypt profile: N=2^15, r=8, p=3; random salt for each password.
function derive(password: string, salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) =>
    scrypt(password, salt, 64, { N: 32768, r: 8, p: 3, maxmem: 64 * 1024 * 1024 }, (error, key) =>
      error ? reject(error) : resolve(key),
    ),
  );
}
export async function hashPassword(password: string) {
  const salt = randomBytes(16);
  return `scrypt-v1$${salt.toString("hex")}$${(await derive(password, salt)).toString("hex")}`;
}
export async function verifyPassword(password: string, hash: string) {
  const match = /^scrypt-v1\$([a-f0-9]{32})\$([a-f0-9]{128})$/.exec(hash);
  // Match the work done for an unknown email without using a real account hash.
  const key = await derive(password, Buffer.from(match?.[1] ?? "0".repeat(32), "hex"));
  const expected = Buffer.from(match?.[2] ?? "0".repeat(128), "hex");
  return timingSafeEqual(key, expected) && !!match;
}
