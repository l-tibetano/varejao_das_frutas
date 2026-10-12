import { Gift, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = { titulo: string; principal: string; texto: string; destaque?: boolean };

export function DeliveryConditionCard({ titulo, principal, texto, destaque }: Props) {
  const Icon = destaque ? Gift : Truck;
  return (
    <div
      className={cn(
        "relative rounded-2xl border bg-card p-6 shadow-card",
        destaque ? "border-2 border-primary" : "border-border",
      )}
    >
      {destaque && (
        <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-0.5 text-xs font-bold uppercase tracking-wide text-primary-foreground">
          Sem taxa
        </span>
      )}
      <span
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl",
          destaque ? "bg-primary text-primary-foreground" : "bg-primary-soft text-primary-dark",
        )}
      >
        <Icon className="h-6 w-6" />
      </span>
      <p className="mt-4 text-sm font-semibold text-muted-foreground">{titulo}</p>
      <p className={cn("font-display text-2xl font-extrabold", destaque ? "text-primary-dark" : "text-foreground")}>
        {principal}
      </p>
      <p className="mt-2 text-muted-foreground">{texto}</p>
    </div>
  );
}
