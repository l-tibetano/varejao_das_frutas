import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import logoVarejao from "@/assets/logo-varejao.png";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="Varejão das Frutas — página inicial">
      <img
        src={logoVarejao}
        alt=""
        width={584}
        height={524}
        draggable={false}
        className="h-11 w-auto max-w-none shrink-0 object-contain"
      />
      <span className="flex flex-col leading-none font-display">
        <span className={cn("text-xl font-extrabold", inverted ? "text-footer-foreground" : "text-primary-dark")}>
          Varejão
        </span>
        <span className={cn("text-sm font-semibold", inverted ? "text-footer-foreground/80" : "text-promo")}>
          das Frutas
        </span>
      </span>
    </Link>
  );
}
