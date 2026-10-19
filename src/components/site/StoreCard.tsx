import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { mapsUrl, telLink, type Loja } from "@/data/lojas";
import { ImageGallery } from "./ImageGallery";

export function StoreCard({ loja }: { loja: Loja }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-card shadow-card">
      <ImageGallery images={loja.imagens} />
      <div className="space-y-3 p-6">
        <h3 className="text-2xl font-bold text-foreground">{loja.nome}</h3>
        <p className="flex gap-2.5 text-muted-foreground">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" /> {loja.endereco}
        </p>
        <p className="flex gap-2.5 text-muted-foreground">
          <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <a href={telLink(loja.telefone)} className="hover:text-primary-dark hover:underline">
            {loja.telefone}
          </a>
        </p>
        <ul className="space-y-1.5">
          {loja.horarios.map((h) => (
            <li key={h.dias} className="flex gap-2.5 text-muted-foreground">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span>
                {h.dias}: {h.das}.
              </span>
            </li>
          ))}
        </ul>
        <a
          href={mapsUrl(loja.localizacao)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 font-bold text-primary-foreground transition-colors hover:bg-primary-dark"
        >
          <Navigation className="h-4 w-4" /> Ver no Google Maps
        </a>
      </div>
    </article>
  );
}
