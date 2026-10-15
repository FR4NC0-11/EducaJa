import { createHash, randomInt, timingSafeEqual } from "node:crypto";

export const newAccessCode = () => String(randomInt(0, 1000000)).padStart(6, "0");
// The browser secret is not stored in the database, preventing offline guessing of the six digits.
export const accessCodeHash = (browserSecret: string, code: string) =>
  createHash("sha256").update(`${browserSecret}/${code}`).digest("hex");
export function matchesAccessCode(browserSecret: string, code: string, expected: string) {
  if (!/^[a-f0-9]{64}$/.test(expected)) return false;
  return timingSafeEqual(
    Buffer.from(accessCodeHash(browserSecret, code), "hex"),
    Buffer.from(expected, "hex"),
  );
}
