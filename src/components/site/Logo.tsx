import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="Varejão das Frutas — página inicial">
      <span
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full",
          inverted ? "bg-footer-foreground text-footer" : "bg-primary text-primary-foreground",
        )}
      >
        <Leaf className="h-5 w-5" />
      </span>
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
