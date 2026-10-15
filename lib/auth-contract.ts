import { z } from "zod";

const email = z.string().trim().toLowerCase().max(254).pipe(z.email());
const password = z.string().min(8).max(255);
export const authSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("register"),
    name: z.string().trim().min(1).max(80),
    email,
    password,
  }),
  z.object({ kind: z.literal("login"), email, password }),
  z.object({ kind: z.literal("verify"), code: z.string().regex(/^\d{6}$/) }),
  z.object({ kind: z.literal("resend") }),
  z.object({ kind: z.literal("logout") }),
]);
export type AuthAction = z.infer<typeof authSchema>;
