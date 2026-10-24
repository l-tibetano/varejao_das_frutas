import { Clock } from "lucide-react";
import { delivery } from "@/data/delivery";
import { cn } from "@/lib/utils";

export function DeliveryHours({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 rounded-2xl bg-card p-5 text-center shadow-card sm:flex-row sm:justify-center sm:text-left",
        className,
      )}
    >
      <span className="font-display text-lg font-bold text-foreground">Quando entregamos?</span>
      <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        {delivery.horarios.map((h) => (
          <li key={h.periodo} className="flex items-center gap-2 font-semibold text-primary-dark">
            <Clock aria-hidden="true" className="h-4 w-4 shrink-0 text-promo" />
            {h.periodo}: {h.das}.
          </li>
        ))}
      </ul>
    </div>
  );
}
