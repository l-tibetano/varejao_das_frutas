import { CalendarDays, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FlyerOrderButton } from "@/components/site/FlyerOrderButton";
import { useOfferStatus } from "@/hooks/use-offer-status";
import type { Folheto } from "@/data/folhetos";
import { formatDate, type OfferStatus } from "@/lib/offer-status";
import { cn } from "@/lib/utils";

const toneCls: Record<OfferStatus["tone"], string> = {
  upcoming: "bg-primary-soft text-accent-foreground",
  active: "bg-promo-soft text-promo",
  urgent: "bg-promo text-promo-foreground",
  expired: "bg-muted text-muted-foreground line-through decoration-1",
};

export function OfferCard({ folheto, onOpen }: { folheto: Folheto; onOpen: () => void }) {
  // Calculado no navegador para usar sempre a data atual do visitante.
  const status = useOfferStatus(folheto.inicio, folheto.fim);
  const expired = status?.tone === "expired";

  return (
    <article className="group overflow-hidden rounded-2xl bg-card shadow-card transition-shadow hover:shadow-card-hover">
      <Button variant="ghost"
        onClick={onOpen}
        className="relative block h-auto w-full overflow-hidden rounded-none bg-muted p-0"
        aria-label={`Abrir folheto ${folheto.nome}`}
      >
        <img
          src={folheto.capa}
          alt={`Capa do folheto ${folheto.nome}`}
          loading="lazy"
          width={1024}
          height={1440}
          className={cn(
            "aspect-[4/5] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]",
            expired && "grayscale",
          )}
        />
        <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1.5 text-sm font-semibold text-foreground shadow-card">
          <ZoomIn className="h-4 w-4" /> Ampliar
        </span>
      </Button>
      <div className="flex flex-wrap items-center justify-between gap-3 p-5">
        <div>
          <h3 className="text-xl font-bold text-foreground">{folheto.nome}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            {formatDate(folheto.inicio)}{folheto.fim && ` a ${formatDate(folheto.fim)}`}
          </p>
        </div>
        {status && (
          <span className={cn("rounded-full px-3 py-1 text-sm font-bold", toneCls[status.tone])}>{status.label}</span>
        )}
      </div>
      {status && !expired && <div className="px-5 pb-5"><FlyerOrderButton className="w-full" /></div>}
    </article>
  );
}
