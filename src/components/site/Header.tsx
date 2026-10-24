import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

const linkCls =
  "rounded-md px-3 py-2 text-[15px] font-semibold text-foreground/80 transition-colors hover:bg-primary-soft hover:text-primary-dark";

export function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <Link to="/" hash="lojas" activeOptions={{ includeHash: true }} className={linkCls} onClick={onNavigate}>
        Lojas
      </Link>
      <Link to="/sobre" className={linkCls} activeProps={{ className: "text-primary-dark" }} onClick={onNavigate}>
        Sobre
      </Link>
      <Link to="/contato" className={linkCls} activeProps={{ className: "text-primary-dark" }} onClick={onNavigate}>
        Contato
      </Link>
    </>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
      <div className="container-site flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4">
          <Button asChild variant="outline" className="h-10 shrink-0 px-3 font-semibold text-primary-dark">
            <Link to="/login" onClick={() => setOpen(false)}><UserRound aria-hidden="true" />Entrar</Link>
          </Button>
          <Logo />
        </div>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          <NavLinks />
        </nav>
        <Button
          variant="ghost"
          size="icon"
          className="flex h-11 w-11 items-center justify-center rounded-md text-foreground hover:bg-muted md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-border bg-card px-4 py-3 md:hidden" aria-label="Menu móvel">
          <NavLinks onNavigate={() => setOpen(false)} />
        </nav>
      )}
    </header>
  );
}
