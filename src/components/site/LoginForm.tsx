import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Eye, EyeOff, LoaderCircle, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginFailureMessage, loginSchema, requestLogin, type LoginInput } from "@/lib/login";

export function LoginForm() {
  const [visible, setVisible] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);
  const pending = useRef(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function submit(values: LoginInput) {
    if (pending.current) return;
    pending.current = true;
    setFailure(null);
    try {
      await requestLogin(values);
    } catch {
      setFailure(loginFailureMessage);
    } finally {
      pending.current = false;
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(submit)} className="mt-8 space-y-6" aria-busy={isSubmitting}>
      <div className="space-y-2">
        <Label htmlFor="login-email" className="font-bold">E-mail</Label>
        <Input id="login-email" type="email" autoComplete="username" inputMode="email" maxLength={255} required disabled={isSubmitting} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} className="h-12 bg-card" {...register("email")} />
        {errors.email && <p id="email-error" role="alert" className="text-sm text-destructive">{errors.email.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="login-password" className="font-bold">Senha</Label>
        <div className="relative">
          <Input id="login-password" type={visible ? "text" : "password"} autoComplete="current-password" maxLength={1024} required disabled={isSubmitting} aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? "password-error" : undefined} className="h-12 bg-card pr-12" {...register("password")} />
          <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1 h-10 w-10 text-muted-foreground" onClick={() => setVisible((value) => !value)} aria-label={visible ? "Ocultar senha" : "Mostrar senha"} title={visible ? "Ocultar senha" : "Mostrar senha"} aria-pressed={visible}>
            {visible ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
          </Button>
        </div>
        {errors.password && <p id="password-error" role="alert" className="text-sm text-destructive">{errors.password.message}</p>}
      </div>
      {failure && <p role="alert" className="rounded-md border border-destructive/20 bg-promo-soft p-4 text-sm text-destructive">{failure}</p>}
      <Button type="submit" disabled={isSubmitting} className="h-12 w-full text-base font-bold">
        {isSubmitting ? <LoaderCircle aria-hidden="true" className="motion-safe:animate-spin" /> : <LogIn aria-hidden="true" />}
        {isSubmitting ? "Entrando…" : "Entrar"}
      </Button>
      <Button asChild variant="link" className="h-auto w-full whitespace-normal text-center text-primary-dark">
        <Link to="/"><ArrowLeft aria-hidden="true" />Voltar para a página inicial</Link>
      </Button>
    </form>
  );
}