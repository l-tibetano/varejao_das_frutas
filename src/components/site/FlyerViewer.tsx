import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import type { Folheto } from "@/data/folhetos";

const ctrl =
  "flex h-11 w-11 items-center justify-center rounded-full bg-card/15 text-primary-foreground transition hover:bg-card/30 disabled:opacity-40";

export function FlyerViewer({ folheto, onClose }: { folheto: Folheto | null; onClose: () => void }) {
  const [page, setPage] = useState(0);
  const [zoom, setZoom] = useState(1);

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
    <div className="fixed inset-0 z-50 flex flex-col bg-overlay/95" role="dialog" aria-modal="true" aria-label={folheto.nome}>
      <div className="flex items-center justify-between gap-2 px-3 py-3 text-primary-foreground sm:px-6">
        <div className="min-w-0">
          <p className="truncate font-display text-lg font-bold">{folheto.nome}</p>
          <p className="text-sm text-primary-foreground/70">
            Página {page + 1} de {total}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className={ctrl} onClick={() => setZoom((z) => Math.max(1, z - 0.5))} disabled={zoom <= 1} aria-label="Reduzir">
            <ZoomOut className="h-5 w-5" />
          </button>
          <button className={ctrl} onClick={() => setZoom((z) => Math.min(3, z + 0.5))} disabled={zoom >= 3} aria-label="Ampliar">
            <ZoomIn className="h-5 w-5" />
          </button>
          <button className={ctrl} onClick={onClose} aria-label="Fechar">
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="relative flex-1 overflow-auto" onClick={(e) => e.target === e.currentTarget && zoom === 1 && onClose()}>
        <div className="flex min-h-full items-center justify-center p-3" style={{ width: `${zoom * 100}%` }}>
          <img
            src={folheto.paginas[page]}
            alt={`${folheto.nome} — página ${page + 1}`}
            className="max-w-full rounded-lg shadow-card"
            style={{ maxHeight: zoom === 1 ? "calc(100vh - 6rem)" : "none" }}
            onDoubleClick={() => setZoom((z) => (z === 1 ? 2 : 1))}
          />
        </div>
      </div>

      {total > 1 && (
        <>
          <button
            className={`${ctrl} absolute left-3 top-1/2 -translate-y-1/2`}
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 0}
            aria-label="Página anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            className={`${ctrl} absolute right-3 top-1/2 -translate-y-1/2`}
            onClick={() => setPage((p) => p + 1)}
            disabled={page === total - 1}
            aria-label="Próxima página"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
    </div>
  );
}
