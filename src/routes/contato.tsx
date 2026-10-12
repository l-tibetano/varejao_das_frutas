import { createFileRoute } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { contato } from "@/data/site";

const title = "Contato — Varejão das Frutas";
const description = "Fale com o Varejão das Frutas por telefone, e-mail ou redes sociais. Lojas em Janaúba e Nova Porteirinha.";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Contato,
});

function Item({ icon: Icon, label, children }: { icon: typeof Phone; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl bg-card p-5 shadow-card">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-dark">
        <Icon className="h-6 w-6" />
      </span>
      <div>
        <p className="text-sm font-semibold text-muted-foreground">{label}</p>
        <div className="text-lg font-bold text-foreground">{children}</div>
      </div>
    </div>
  );
}

const link = "transition-colors hover:text-primary-dark hover:underline";

function Contato() {
  return (
    <div className="container-site max-w-4xl py-12 sm:py-16">
      <h1 className="text-center text-4xl font-extrabold text-foreground sm:text-5xl">Entre em contato</h1>
      <span className="mx-auto mt-3 block h-1 w-16 rounded-full bg-promo" />
      <p className="mt-4 text-center text-muted-foreground">Estamos à disposição para atender você!</p>

      <h2 className="mt-10 mb-4 text-2xl font-bold text-foreground">Contato geral</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <Item icon={Phone} label="Telefone">
          <a href={contato.telefoneLink} className={link}>{contato.telefone}</a>
        </Item>
        <Item icon={Mail} label="E-mail">
          <a href={`mailto:${contato.email}`} className={`${link} break-all`}>{contato.email}</a>
        </Item>
      </div>

      <h2 className="mt-10 mb-4 text-2xl font-bold text-foreground">Redes sociais</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <Item icon={Instagram} label="Instagram">
          <a href={contato.instagram.url} target="_blank" rel="noopener noreferrer" className={link}>
            {contato.instagram.usuario}
          </a>
        </Item>
        <Item icon={Facebook} label="Facebook">
          <a href={contato.facebook.url} target="_blank" rel="noopener noreferrer" className={link}>
            {contato.facebook.nome}
          </a>
        </Item>
      </div>

      <h2 className="mt-10 mb-4 text-2xl font-bold text-foreground">Localização</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {contato.cidades.map((c) => (
          <Item key={c} icon={MapPin} label="Unidade">
            {c}
          </Item>
        ))}
      </div>
    </div>
  );
}
