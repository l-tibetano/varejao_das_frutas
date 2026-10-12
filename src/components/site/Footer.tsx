import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { contato, slogan } from "@/data/site";

const social = [
  { label: "Instagram", href: contato.instagram.url, Icon: Instagram },
  { label: "Facebook", href: contato.facebook.url, Icon: Facebook },
  { label: "WhatsApp", href: contato.whatsappUrl, Icon: MessageCircle },
];

const linkCls = "text-footer-foreground/85 transition-colors hover:text-footer-foreground hover:underline";

export function Footer() {
  return (
    <footer className="mt-20 border-t-4 border-promo bg-footer text-footer-foreground">
      <div className="container-site grid gap-10 py-12 md:grid-cols-3 md:items-start">
        <div className="space-y-3">
          <Logo inverted />
          <p className="max-w-xs text-sm text-footer-foreground/80">{slogan}</p>
        </div>
        <nav className="flex flex-col gap-2 md:items-center" aria-label="Rodapé">
          <span className="mb-1 font-display text-lg font-bold">Navegação</span>
          <Link to="/sobre" className={linkCls}>Sobre</Link>
          <Link to="/contato" className={linkCls}>Contato</Link>
          <Link to="/" hash="lojas" className={linkCls}>Lojas</Link>
        </nav>
        <div className="flex flex-col gap-3 md:items-end">
          <span className="font-display text-lg font-bold">Siga a gente</span>
          <div className="flex gap-3">
            {social.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-footer-foreground/10 transition-colors hover:bg-promo"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="container-site border-t border-footer-foreground/15 py-5 text-center text-sm text-footer-foreground/70">
        © 2026 Varejão das Frutas. Todos os direitos reservados.
      </div>
    </footer>
  );
}
