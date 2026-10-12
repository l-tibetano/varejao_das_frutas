import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
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
        <Logo />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          <NavLinks />
        </nav>
        <button
          className="flex h-11 w-11 items-center justify-center rounded-md text-foreground hover:bg-muted md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-border bg-card px-4 py-3 md:hidden" aria-label="Menu móvel">
          <NavLinks onNavigate={() => setOpen(false)} />
        </nav>
      )}
    </header>
  );
}
