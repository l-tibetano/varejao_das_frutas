import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import type { Folheto } from "@/data/folhetos";
import { Button } from "@/components/ui/button";
import { FlyerOrderButton } from "@/components/site/FlyerOrderButton";
import { BrandSymbol } from "@/components/site/BrandSymbol";
import { useOfferStatus } from "@/hooks/use-offer-status";
import { cn } from "@/lib/utils";

const ctrl =
  "flex h-11 w-11 items-center justify-center rounded-full bg-card/15 text-primary-foreground transition hover:bg-card/30 disabled:opacity-40";

export function FlyerViewer({ folheto, onClose }: { folheto: Folheto | null; onClose: () => void }) {
  const [page, setPage] = useState(0);
  const [zoom, setZoom] = useState(1);
  const status = useOfferStatus(folheto?.inicio ?? "", folheto?.fim);
  const expired = status?.tone === "expired";

  useEffect(() => {
    setPage(0);
    setZoom(1);
    if (!folheto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setPage((p) => Math.min(p + 1, folheto.paginas.length - 1));
      if (e.key === "ArrowLeft") setPage((p) => Math.max(p - 1, 0));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [folheto, onClose]);

  if (!folheto) return null;
  const total = folheto.paginas.length;

  return (
    <div className="fixed inset-0 z-50 flex h-dvh flex-col bg-overlay/95" role="dialog" aria-modal="true" aria-label={folheto.nome}>
      <div className="flex shrink-0 items-center justify-between gap-2 px-3 py-3 text-primary-foreground sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <BrandSymbol className="h-10" />
          <div className="min-w-0">
            <p className="truncate font-display text-lg font-bold">{folheto.nome}</p>
            <p className="text-sm text-primary-foreground/70">
              Página {page + 1} de {total}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className={ctrl} onClick={() => setZoom((z) => Math.max(1, z - 0.5))} disabled={zoom <= 1} aria-label="Reduzir" title="Reduzir">
            <ZoomOut className="h-5 w-5" />
          </Button>
          <Button variant="ghost" className={ctrl} onClick={() => setZoom((z) => Math.min(3, z + 0.5))} disabled={zoom >= 3} aria-label="Ampliar" title="Ampliar">
            <ZoomIn className="h-5 w-5" />
          </Button>
          <Button variant="ghost" className={ctrl} onClick={onClose} aria-label="Fechar" title="Fechar">
            <X className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="relative min-h-0 flex-1 overflow-auto" onClick={(e) => e.target === e.currentTarget && zoom === 1 && onClose()}>
        <div className={cn("flex items-center justify-center p-3", zoom === 1 ? "h-full" : "min-h-full")} style={{ width: `${zoom * 100}%` }}>
          <img
            src={folheto.paginas[page]}
            alt={`${folheto.nome} — página ${page + 1}`}
            className={cn("max-w-full rounded-lg object-contain shadow-card", expired && "grayscale")}
            style={{ maxHeight: zoom === 1 ? "100%" : "none" }}
            onDoubleClick={() => setZoom((z) => (z === 1 ? 2 : 1))}
          />
        </div>
      </div>

      {status && !expired && (
        <div className="shrink-0 border-t border-primary-foreground/15 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 text-center sm:px-6">
          <FlyerOrderButton className="w-full sm:w-auto sm:min-w-56" />
        </div>
      )}

      {total > 1 && (
        <>
          <Button variant="ghost"
            className={`${ctrl} absolute left-3 top-1/2 -translate-y-1/2`}
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 0}
            aria-label="Página anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button variant="ghost"
            className={`${ctrl} absolute right-3 top-1/2 -translate-y-1/2`}
            onClick={() => setPage((p) => p + 1)}
            disabled={page === total - 1}
            aria-label="Próxima página"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}
    </div>
  );
}
