import { useEffect, useState } from "react";
import { CalendarDays, ZoomIn } from "lucide-react";
import type { Folheto } from "@/data/folhetos";
import { formatDate, getOfferStatus, type OfferStatus } from "@/lib/offer-status";
import { cn } from "@/lib/utils";

const toneCls: Record<OfferStatus["tone"], string> = {
  upcoming: "bg-primary-soft text-accent-foreground",
  active: "bg-promo-soft text-promo",
  urgent: "bg-promo text-promo-foreground",
  expired: "bg-muted text-muted-foreground line-through decoration-1",
};

export function OfferCard({ folheto, onOpen }: { folheto: Folheto; onOpen: () => void }) {
  // Calculado no navegador para usar sempre a data atual do visitante.
  const [status, setStatus] = useState<OfferStatus | null>(null);
  useEffect(() => setStatus(getOfferStatus(folheto.inicio, folheto.fim)), [folheto]);
  const expired = status?.tone === "expired";

  return (
    <article className="group overflow-hidden rounded-2xl bg-card shadow-card transition-shadow hover:shadow-card-hover">
      <button
        onClick={onOpen}
        className="relative block w-full overflow-hidden bg-muted"
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
      </button>
      <div className="flex flex-wrap items-center justify-between gap-3 p-5">
        <div>
          <h3 className="text-xl font-bold text-foreground">{folheto.nome}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            {formatDate(folheto.inicio)} a {formatDate(folheto.fim)}
          </p>
        </div>
        {status && (
          <span className={cn("rounded-full px-3 py-1 text-sm font-bold", toneCls[status.tone])}>{status.label}</span>
        )}
      </div>
    </article>
  );
}
