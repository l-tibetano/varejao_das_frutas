import { z } from "zod";
import { authConfig } from "@/config/auth";

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Informe seu e-mail.").email("Informe um e-mail válido.").max(255, "O e-mail deve ter até 255 caracteres."),
  password: z.string().min(1, "Informe sua senha.").max(1024, "A senha deve ter até 1024 caracteres."),
});

export type LoginInput = z.infer<typeof loginSchema>;
export const loginFailureMessage = "Não foi possível realizar o login no momento. Tente novamente mais tarde.";

/** This initial request deliberately never establishes an authenticated session. */
export async function requestLogin(input: LoginInput): Promise<never> {
  const credentials = loginSchema.parse(input);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    await fetch(authConfig.loginEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      credentials: "omit",
      cache: "no-store",
      redirect: "error",
      signal: controller.signal,
    });
    // A response from a placeholder endpoint is not proof of authentication.
    throw new Error(loginFailureMessage);
  } catch {
    throw new Error(loginFailureMessage);
  } finally {
    clearTimeout(timeout);
  }
}