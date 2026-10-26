import { createFileRoute } from "@tanstack/react-router";
import logoVarejao from "@/assets/logo-varejao.jpg";
import { LoginForm } from "@/components/site/LoginForm";

const title = "Entrar na sua conta — Varejão das Frutas";
const description = "Acesse a página de login do Varejão das Frutas e entre na sua conta com e-mail e senha.";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Login,
});

function Login() {
  return (
    <section className="container-site py-12 sm:py-16">
      <div className="mx-auto max-w-sm">
        <img
          src={logoVarejao}
          alt=""
          aria-hidden="true"
          width={584}
          height={524}
          draggable={false}
          className="mx-auto h-20 w-auto max-w-none object-contain sm:h-24"
        />
        <h1 className="mt-4 text-center text-3xl font-extrabold tracking-normal text-foreground sm:text-4xl">Entre na sua conta</h1>
        <span className="mx-auto mt-3 block h-1 w-16 rounded-full bg-promo" />
        <LoginForm />
      </div>
    </section>
  );
}